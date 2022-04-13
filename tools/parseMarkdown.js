import path from 'path';
import cv from 'chapter-and-verse';

import mapFiles from './mapFiles.js';
import tokenize from './tokenize.js';

const convertTokenToItem = (token, chapterVerse) => {
  if (/---!/.test(token)) {
    const [, block] = /---!(.*)/.exec(token);

    if (block === 'p') {
      return {
        type: 'paragraph_start',
      };
    }

    if (block.includes('q')) {
      return {
        type: 'poetic_line_start',
        indent: parseInt(block.replace(/(\D*)/, '') || '1', 10),
      };
    }
  }

  const verseRegexp = /{(\d*)}/;
  if (verseRegexp.test(token)) {
    const [, verse] = verseRegexp.exec(token);
    return {
      type: 'verse',
      reference: {
        id: `${chapterVerse.book.id.toUpperCase()}${chapterVerse.chapter}:${verse}`,
        chapter: chapterVerse.chapter,
        book: chapterVerse.book.id,
        verse: parseInt(verse, 10),
        readable: `${chapterVerse.book.name} ${chapterVerse.chapter}:${verse}`,
      },
    };
  }

  const italicsRegexp = /_(.*)_/;
  if (italicsRegexp.test(token)) {
    const [, text] = italicsRegexp.exec(token);
    return {
      type: 'char',
      style: 'italic',
      content: text,
    };
  }

  const boldRegexp = /\*\*(.*)\*\*/;
  if (boldRegexp.test(token)) {
    const [, text] = boldRegexp.exec(token);
    return {
      type: 'char',
      style: 'bold',
      content: text,
    };
  }

  const linkRegexp = /\[\[(.*)]]/;
  if (linkRegexp.test(token)) {
    const [, text] = linkRegexp.exec(token);
    const [link, label] = text.split('|').map((t) => t.trim());
    return {
      type: 'hyperlink',
      link,
      content: label ?? link,
    };
  }

  return {
    type: '_text', // will be cleaned up after intermediate
    content: token,
  };
};

const parseMarkdown = async (content, pathname) => {
  const ref = path.basename(pathname, '.md').replace(/(\d*)$/, ' $1');
  const chapterVerse = cv(ref);
  const value = content.trim();
  const tokens = tokenize(value);

  const items = tokens.reduce((acc, token, idx) => {
    const item = convertTokenToItem(token, chapterVerse);
    if (item) {
      if (idx > 0 && item.type.endsWith('_start')) {
        const lastBlockStart = [...acc].reverse().find(({ type }) => type.endsWith('_start'));
        acc.push({ type: lastBlockStart.type.replace('_start', '_end') });
      }
      acc.push(item);
    }
    if (idx === tokens.length - 1) {
      const lastBlockStart = [...acc].reverse().find(({ type }) => type.endsWith('_start'));
      acc.push({ type: lastBlockStart.type.replace('_start', '_end') });
    }
    return acc;
  }, []);

  return JSON.stringify(items);
};

(async () => {
  await mapFiles('raw', 'md', 'intermediate', 'json', parseMarkdown);
})();
