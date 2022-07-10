import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  width: 100%;
  background: #0004;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  --shadow-color: 0deg 0% 53%;
  width: 300px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 0.7px 0.6px hsl(var(--shadow-color) / 0.57),
    0 1.4px 1.3px -1px hsl(var(--shadow-color) / 0.49),
    0px 3.3px 3px -1.9px hsl(var(--shadow-color) / 0.41),
    0px 7.7px 7px -2.9px hsl(var(--shadow-color) / 0.33),
    0.1px 16.1px 14.7px -3.9px hsl(var(--shadow-color) / 0.24);
  padding: 12px;
  margin: 12px auto;

  h1 {
    font-size: 36px;
    text-align: center;
    margin: 4px 0;
  }
`;

const Announcement = styled.p`
  font-size: 14px;
  color: #555;
  font-weight: 600;
  text-align: center;
`;

const Def = styled.p`
  font-size: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid #efefef;
  margin-bottom: 12px;
`;

const Explainer = styled.p`
  font-size: 14px;
  color: #666;
  padding-bottom: 12px;
  border-bottom: 1px solid #efefef;
  margin-bottom: 12px;
`;

const Collect = styled.button`
  font-size: 14px;
  padding: 12px 16px;
  font-weight: 600;
  font-family: var(--sans-serif);
  text-decoration: none;
  background: var(--green);
  color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 0;
  appearance: none;
  cursor: pointer;
  width: max-content;
  margin-left: auto;
`;

type Props = {
  lang: 'Hebrew' | 'Greek';
  definition: string;
  word: string;
  collected: boolean;
  onClick: () => void;
  onClose: () => void;
};

const WordModal = ({ lang, definition, word, onClick, collected, onClose }: Props) => (
  <Overlay>
    <Card>
      <Announcement>You unlocked a new {lang} word!</Announcement>
      <h1>{word}</h1>
      <Def>
        <strong>noun</strong> - {definition}
      </Def>
      <Explainer>
        You will now see repeated uses of <em>{word}</em> appear transliterated and highlighted in
        blue.
      </Explainer>
      <div className="button-tray">
        <Collect onClick={collected ? onClose : onClick}>{collected ? 'Close' : 'Collect'}</Collect>
      </div>
    </Card>
  </Overlay>
);

export default WordModal;
