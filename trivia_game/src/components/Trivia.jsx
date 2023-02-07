import { useState } from 'react';
import './Trivia.css';
import { decode } from 'html-entities';

const Trivia = ({ data, reset }) => {

    const [answers, setAnswers] = useState({});
    const [check, setCheck] = useState(false);
    const [correctQ, setCorrectQ] = useState(0);

    const again = () => {
        reset();
        setCheck(false);
        setAnswers({});
    }

    const handleClick = (id, option) => {

        setAnswers(prev => ({
            ...prev,
            [id]: option
        }))
    }

    const handleSend = () => {
        setCheck(true);
        const value = data.filter(q => answers[q.id] === q.correct).length;
        setCorrectQ(value);
        const local_correct = parseInt(localStorage.getItem('correct')) + value;
        const local_total = parseInt(localStorage.getItem('total')) + data.length;

        localStorage.setItem('correct', local_correct);
        localStorage.setItem('total', local_total);

    }

    return (
        <main className='trivia-container'>
            {data.map(q =>
                <article className='q-container' key={q.id}>
                    <h3>{decode(q.question)}</h3>
                    <div className='q-options'>
                        {q.options.map(option =>
                            <button
                                className={
                                    'q-button ' +
                                    (answers[q.id] === option  ?
                                        check ? 
                                            option !== q.correct ? 'incorrect' : '' 
                                            : 
                                            'selected'
                                        :
                                        ''
                                    )
                                    + (check && option === q.correct ? ' correct' : '')

                                }
                                key={option}
                                onClick={() => handleClick(q.id, option)}
                            >
                                {option}
                            </button>
                        )}
                    </div>
                </article>
            )
            }
            {check ?
                <div className='win-container'>
                    <span className='win-text'>
                        You scored {correctQ}/{data.length} correct answers
                    </span>
                    <button
                        onClick={again}
                        className='send-button'
                    >
                        Play again
                    </button>
                </div>
                :
                <button
                    onClick={handleSend}
                    className='send-button'
                    disabled={Object.keys(answers).length !== 5 && 'off'}
                >
                    Check answers
                </button>
            }
        </main>
    )
}

export default Trivia;