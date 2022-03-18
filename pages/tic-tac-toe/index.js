import React, { useState, useEffect } from 'react';
import Board from '../../components/Board';
import MathButton from '../../components/MathButton';
import AskToStart from '../../components/AskToStart';
import styles from './tic-tac-toe.module.css';
import { useRouter } from 'next/router';

const data = [
    {
        label: 1,
        question: `Given $$ f(x) = x - \\frac{7}{5} $$, find $f'(x)$`,
        answer: `\\( f'(x) = 1 \\)`,
    },
    {
        label: 2,
        question: `Given $$ f(x) = x^2 $$, find $f'(x)$`,
        answer: `\\( f'(x) = 2x \\)`,
    },
    {
        label: 3,
        question: `Given $$ f(x) = 2x^2 - 3x $$, find $f'(x)$`,
        answer: `\\( f'(x) = 4x - 3 \\)`,
    },
    {
        label: 4,
        question: `Given $$ f(x) = 3x^2 - {3 \\over 2} $$, find $f'(x)$`,
        answer: `\\( f'(x) = 6x \\)`,
    },
    {
        label: 5,
        question: `Given $$ f(x) = {1 \\over \\sqrt{x}} $$, find $f'(x)$`,
        answer: `\\( f'(x) = {-1 \\over 2x \\sqrt{x}} \\)`,
    },
    {
        label: 6,
        question: `Given $$ f(x) = {1 \\over x} $$, find $f'(x)$`,
        answer: `\\( f'(x) = {-1 \\over x^2} \\)`,
    },
    {
        label: 7,
        question: `Given $$ f(x) = \\sqrt{2x - 3} $$, find $f'(x)$`,
        answer: `\\( f'(x) = {1 \\over \\sqrt{2x - 3}} \\)`,
    },
    {
        label: 8,
        question: `Given $$ f(x) = \\sqrt{x} $$, find $f'(x)$`,
        answer: `\\( f'(x) = {1 \\over 2 \\sqrt{x}} \\)`,
    },
    {
        label: 9,
        question: `Given $$ f(x) = x \\sqrt{139} $$, find $f'(x)$`,
        answer: `\\( f'(x) = \\sqrt{139} \\)`,
    },
];

const loadLocalStorage = () => {
    const qs = localStorage.getItem('questions')?.split('✆');
    const as = localStorage.getItem('answers')?.split('✆');
    if (!qs || !as) return;
    data.forEach((datum, index) => {
        datum.question =
            qs.length <= index || qs[index]?.trim() === ''
                ? datum.question
                : qs[index].trim();
        datum.answer =
            as.length <= index || as[index]?.trim() === ''
                ? datum.answer
                : as[index].trim();
    });
};

const Game = () => {
    useEffect(loadLocalStorage, []);
    const [currentTeam, setCurrentTeam] = useState('');
    const [showReset, setShowReset] = useState(false);
    const [cells, setCells] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [display, setDisplay] = useState('board');
    const [currentCell, setCurrentCell] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [win, setWin] = useState(null);
    const [tie, setTie] = useState(false);
    const router = useRouter();

    const changeTeam = (num) => {
        if (currentTeam === 'X') {
            setCurrentTeam('O');
        } else {
            setCurrentTeam('X');
        }
    };

    const changeDisplay = (num) => {
        switch (display) {
            case 'board':
                setDisplay('question');
                const datum = data.find((d) => d.label === num);
                setCurrentQuestion(datum.question);
                setCurrentAnswer(datum.answer);
                break;
            case 'question':
                setDisplay('answer');
                break;
            case 'answer':
                setDisplay('board');
                break;
            default:
        }
    };

    const checkGameWon = (squares) => {
        const winningCombos = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8],
            [1, 4, 7],
        ];

        let gameWon = false;

        winningCombos.forEach((combo) => {
            const first = squares[combo[0]];
            const second = squares[combo[1]];
            const third = squares[combo[2]];
            if (first === second && second === third) {
                setWin(combo);
                setShowReset(true);
                gameWon = true;
            }
        });
        return gameWon;
    };

    const checkTie = (squares) => {
        setTie(
            squares.every((square) => square === 'X' || square === 'O') &&
                win === null
        );
    };

    const handleClick = (num) => {
        Number(num) && setCurrentCell(num - 1);
        if (display === 'answer') {
            let squares = [...cells];
            squares[currentCell] = currentTeam;
            setCells(squares);
            const gameWon = checkGameWon(squares);
            !gameWon && checkTie(squares);
            changeTeam(num);
        }
        changeDisplay(num);
    };

    const handleStartGame = (choice) => {
        setCurrentTeam(choice);
    };

    const restartGame = () => {
        router.reload(window.location.pathname);
    };

    return (
        <>
            {currentTeam === '' && <AskToStart onClick={handleStartGame} />}
            {currentTeam !== '' && win === null && !tie && (
                <h1 className={`text-center ${styles.game__status}`}>
                    Current Team: {currentTeam}
                </h1>
            )}
            {win !== null && !tie && (
                <h1 className={`text-center ${styles.game__status}`}>
                    Team {currentTeam === 'X' ? 'O' : 'X'} won!
                </h1>
            )}
            {tie && (
                <h1 className={`text-center ${styles.game__status}`}>
                    Tie Game!
                </h1>
            )}
            {display === 'board' && currentTeam !== '' && (
                <Board
                    onClick={handleClick}
                    buttonLabels={[...cells]}
                    winCombo={win}
                />
            )}
            {display === 'question' && (
                <div className='flex flex-col flex-1'>
                    <h1 className={`text-center ${styles.header}`}>
                        Question:
                    </h1>
                    <div className='flex flex-col flex-1 justify-between items-center'>
                        <MathButton
                            onClick={handleClick}
                            math={currentQuestion}
                            btnText='Go to Answer'
                        />
                    </div>
                </div>
            )}
            {display === 'answer' && (
                <div className='flex flex-col flex-1'>
                    <h1 className={`text-center ${styles.header}`}>Answer:</h1>
                    <div className='flex flex-col flex-1 justify-center items-center'>
                        <MathButton
                            onClick={handleClick}
                            math={currentAnswer}
                            btnText='Go to Game'
                        />
                    </div>
                </div>
            )}
            {showReset && (
                <div>
                    <button
                        className={`btn btn-primary ${styles.restartBtn}`}
                        onClick={restartGame}
                    >
                        Restart
                    </button>
                </div>
            )}
        </>
    );
};

export default Game;
