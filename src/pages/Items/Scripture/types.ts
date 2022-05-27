export type Char = {
  type: 'char';
  style?: 'bold' | 'italic';
  content: string;
};

export type Verse = {
  type: 'verse';
  reference: {
    id: string;
    chapter: number;
    book: string;
    verse: number;
    readable: string;
  };
};

export type Hyperlink = {
  type: 'hyperlink';
  link: string;
  content: string;
};

export type Inline = Char | Verse | Hyperlink;
