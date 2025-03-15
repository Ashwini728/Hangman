import React from 'react';

function Word({ selectedWord, correctLetters }) {
  return (
    <div className="word">
      {selectedWord.split('').map((letter, i) => (
        <span className="letter" key={i}>
          {correctLetters.includes(letter) ? letter : ''}
        </span>
      ))}
    </div>
  );
}

export default Word;
