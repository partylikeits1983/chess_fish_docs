import { C } from 'nextra/dist/types-fa5ec8b0';
import React, { useState } from 'react';

const ChessBoard: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [board, setBoard] = useState('');

  const generateBoard = (input: string[]) => {

    let result = Object.values(input);
    let pieces = result.reverse();

    let boardString = "   +------------------------+\n ";
    for (let i = 0; i < 64; i++) {
      if (i % 8 === 0) {
        let row_num = 8 - i / 8;
        boardString += String(row_num) + "  ";
      }

      boardString += " " + pieces[i] + " ";

      if ((i + 1) % 8 === 0) {
        boardString += "\n ";
      }
    }

    boardString += "  +------------------------+\n";
    boardString += "     a  b  c  d  e  f  g  h";
    setBoard(boardString);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    generateBoard(e.target.value.split(","));
  };
  

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter pieces string"
      />
      <pre>{board}</pre>
    </div>
  );
};

export default ChessBoard;
