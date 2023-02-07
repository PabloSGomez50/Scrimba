import './App.css'
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios';
import { nanoid } from 'nanoid';

import Trivia from './components/Trivia';
import data from './data';

const TRIVIA_URL = 'https://opentdb.com/api.php?amount=5';

function App() {
  
  const [ trivia, setTrivia ] = useState(data);
  const [ play, setPlay ] = useState(false);

  const requestTrivia = async () => {

    try {
      const response = await axios.get(TRIVIA_URL);
      const data = response?.data?.results;

      
      const res_trivia = data.map(item => {
        const n = Math.floor(Math.random() * item.incorrect_answers.length);
        const options = [...item.incorrect_answers.slice(0,n), item.correct_answer, ...item.incorrect_answers.slice(n)];

        return {
          id: nanoid(),
          question: item.question,
          correct: item.correct_answer,
          options,

        }
      })

      setTrivia(res_trivia);
      console.log(res_trivia);
      
    } catch(err) {
      console.error(err?.response?.data);
    }
  }

  useEffect(() => {
    requestTrivia();

  }, [])

  return (
    <div className="App">
      {play ?
        <Trivia data={trivia} reset={requestTrivia} />
        :
        <div className='start-container'>
          <h1 className='start-title'>Quizzical</h1>
          <span className='start-desc'>You can answer 5 trivia questions</span>
          <button className='start-button' onClick={() => setPlay(true)}>
            Start quiz
          </button>
        </div>
      }
    </div>
  )
}

export default App
