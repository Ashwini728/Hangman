import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Figure from './components/Figure';
import Wrongletters from './components/Wrongletters';
import Word from './components/Word';
import Notification from './components/Notification';
import Popup from './components/Popup';
import { showNotification as show } from './helpers/helpers';

const words = [
  'application', 'programming', 'interface', 'wizard',
  'development', 'algorithm', 'database', 'function',
  'variable', 'object', 'syntax', 'compiler', 'iteration',
  'loop', 'framework', 'debugging', 'library', 'inheritance',
  'encapsulation', 'polymorphism', 'abstraction', 'frontend',
  'backend', 'middleware', 'cloud', 'container', 'deployment',
  'encryption', 'security', 'authentication', 'authorization',
  'protocol', 'network', 'socket', 'bandwidth', 'latency',
  'pixel', 'rendering', 'responsive', 'scalability', 'thread',
  'process', 'cache', 'buffer', 'pointer', 'stack', 'queue',
  'hash', 'binary', 'array', 'linkedlist', 'node', 'graph',
  'tree', 'recursion', 'module', 'package', 'integration',
  'testing', 'agile', 'scrum', 'kanban', 'version', 'repository',
  'commit', 'branch', 'merge', 'pull', 'push', 'fork', 'clone',
  'patch', 'rollback', 'monitoring', 'logging', 'analytics',
  'optimization', 'query', 'index', 'cursor', 'transaction',
  'rollback', 'schema', 'view', 'trigger', 'procedure', 'script',
  'execution', 'runtime', 'build', 'release', 'pipeline',
  'orchestration', 'virtualization', 'emulation', 'domain'
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setwrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;

      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
            setScore((prevScore) => prevScore + 10); // Increase score on correct guess
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setwrongLetters((wrongLetters) => [...wrongLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setwrongLetters([]);
    setScore(0); // Reset score
    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div className='game-container'>
        <Figure wrongLetters={wrongLetters} />
        <Wrongletters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
        score={score}
      />
      <Notification showNotification={showNotification} />
      </>
  );
}

export default App;
