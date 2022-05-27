import path from 'path';
import cv from 'chapter-and-verse';
import { parse } from '@saibotsivad/blockdown';

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

  if (token === '<poem>') {
    return {
      type: 'poetry_start',
    };
  }

  if (token === '</poem>') {
    return {
      type: 'poetry_end',
    };
  }

  return {
    type: '_text', // will be cleaned up after intermediate
    content: token,
  };
};

const mergeText = (content) => {
  return content.reduce((acc, node, idx) => {
    if (node.type === '_text') {
      if (idx !== 0 && acc[acc.length - 1].type === 'char' && !acc[acc.length - 1].style) {
        acc[acc.length - 1].content += ` ${node.content}`;
      } else {
        acc.push({
          type: 'char',
          content: node.content,
        });
      }
      return acc;
    }

    return [...acc, node];
  }, []);
};

const getIndent = (line) => {
  if (!line.startsWith('\\indent')) return 1;
  const [, indent] = /^\\indent\((\d)\)/.exec(line);
  return parseInt(indent, 10);
};

// TODO: clean up the parser
const parseMarkdown = async (content, pathname) => {
  const ref = path.basename(pathname, '.md').replace(/(\d*)$/, ' $1');
  const chapterVerse = cv(ref);
  const value = content.trim();

  const items = parse(value).blocks.reduce((acc, block) => {
    const node = {
      type: block.name === 'p' ? 'paragraph' : 'poetry',
      children:
        block.name === 'q'
          ? block.content
              .trim()
              .split('\n')
              .map((line) => ({
                type: 'poetry_line',
                indent: getIndent(line),
                children: (() => {
                  const cleanedLine = line
                    .trim()
                    .replace(/^\\indent\((\d)\)/, '')
                    .trim();
                  const tokens = tokenize(cleanedLine);
                  return mergeText(tokens.map((token) => convertTokenToItem(token, chapterVerse)));
                })(),
              }))
          : mergeText(
              tokenize(block.content.trim()).map((token) =>
                convertTokenToItem(token, chapterVerse),
              ),
            ),
    };

    return [...acc, node];
  }, []);

  return JSON.stringify(items);
};

(async () => {
  await mapFiles('raw', 'md', 'final', 'json', parseMarkdown);
})();
