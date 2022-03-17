import React from 'react';
import Link from 'next/link';
import styles from './AskToStart.module.css';
// import QuestionEditor from './QuestionEditor';

const AskToStart = ({ onClick }) => {
    return (
        <div className={`container text-center`}>
            <h1>Who will start?</h1>
            <div className={`${styles.btnRow}`}>
                <button
                    onClick={() => onClick('X')}
                    className={`btn btn-primary ${styles.btnStart}`}
                >
                    X
                </button>
                <button
                    onClick={() => onClick('O')}
                    className={`btn btn-primary ${styles.btnStart}`}
                >
                    O
                </button>
            </div>
            <div className={`${styles.btnRow}`}>
                <Link href='/tic-tac-toe/questions'>
                    <a className={`btn btn-primary ${styles.editBtn}`}>
                        Edit Questions
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default AskToStart;
