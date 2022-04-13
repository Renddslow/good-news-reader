const tokenize = (value) => {
  const tokens = [];

  let string = '';
  let inLink = false;
  let inItalic = false;
  let inBold = false;

  for (let i = 0; i < value.length; i++) {
    const char = value[i];

    if (/\[/.test(char) && /\[/.test(value[i + 1])) {
      i += 1;
      string = '[[';
      inLink = true;
      continue;
    }

    if (/\*/.test(char) && /\*/.test(value[i + 1])) {
      inBold = !inBold;
    }

    if (/_/.test(char)) {
      inItalic = !inItalic;
    }

    if (/]/.test(char) && /]/.test(value[i + 1])) {
      i += 1;
      string += ']]';
      inLink = false;
      tokens.push(string);
      string = '';
      continue;
    }

    if (/\s/.test(char) && !(inLink || inItalic || inBold)) {
      tokens.push(string);
      string = '';
      continue;
    }

    string += char;
  }
  return tokens;
};

export default tokenize;
