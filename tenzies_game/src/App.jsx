import React, { useState, useEffect } from 'react';
import Die from './components/Die';
import Confetti from 'react-confetti';
import { nanoid } from 'nanoid';

function App() {

  const [ dice, setDice ] = useState([]);
  const [ tenzies, setTenzies ] = useState(false);
  const [ rolls, setRolls ] = useState(0);

  const newDie = () => ({
    id: nanoid(), 
    value: Math.ceil(Math.random() * 6), 
    isHeld: false
  })

  const newDice = () => {
    const arr = [];
    for (let i = 0; i < 10; i++){
      arr.push(newDie());
    }
    return arr;
  }
  
  useEffect(() => {
    
    setDice(newDice());
  }, []);

  useEffect(() => {
    if (dice.length) {
      const allHeld = dice.every(die => die.isHeld);
      const value = dice[0].value;
      const allSame = dice.every(die => die.value === value);
  
      setTenzies(allHeld && allSame);
    }
  }, [dice]);

  const rollDice = () => {
    setDice(prev => prev.map(die =>
      die.isHeld ? die : newDie()
    ));
    setRolls(prev => prev + 1);
  }

  const holdDice = (id) => {
    setDice(prev => prev.map(die =>
      die.id === id ? {...die, isHeld: !die.isHeld} : die
    ));
  }
  
  const newGame = () => {
    setDice(newDice());
    const best = localStorage.getItem('best-score');
    if (!best || best > rolls) {
      localStorage.setItem('best-score', rolls);
    }
    setRolls(0);
  }

  return (
    <main className='container'>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='description'>
        Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.
      </p>
      <span className='rolls'>{rolls} Rolls</span>
      <div className='die-container'>
        {dice && dice.map(die => (
          <Die 
            key={die.id} 
            num={die.value} 
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
          />
        ))
        }
      </div>
      <button 
        className='roll-btn' 
        onClick={tenzies ? newGame : rollDice} 
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App
