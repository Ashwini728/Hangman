import React, { useEffect } from 'react';
import { checkWin } from '../helpers/helpers';

const Popup = ({ correctLetters, wrongLetters, selectedWord, setPlayable, playAgain }) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;

  // Check the game status
  const gameStatus = checkWin(selectedWord, correctLetters, wrongLetters);
  if (gameStatus === 'win') {
    finalMessage = 'Congratulations! You won!😎';
    finalMessageRevealWord = '';
    playable = false;
  } else if (gameStatus === 'lose') {
    finalMessage = 'Unfortunately, you lost 😞';
    finalMessageRevealWord = `The word was: ${selectedWord}`;
    playable = false;
  }

  // Update playable state in parent
  useEffect(() => {
    setPlayable(playable);
  }, [playable, setPlayable]);

  return (
    <div
      className={`popup-container ${finalMessage !== '' ? 'show' : ''}`}
    >
      <div className="popup">
        <h2>{finalMessage}</h2>
        {finalMessageRevealWord && <h3>{finalMessageRevealWord}</h3>}
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;
