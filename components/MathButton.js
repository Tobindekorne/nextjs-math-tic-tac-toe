import React from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import styles from './MathButton.module.css';

const MathButton = ({ math, btnText, onClick }) => {
    return (
        <div
            className={`flex flex-col flex-1 justify-between  ${styles.prompt}`}
        >
            <p className={`shadow-lg text-center ${styles.math}`}>
                <Latex>{math}</Latex>
            </p>
            <button
                className={`btn text-lg btn-primary text-center ${styles.promptBtn}`}
                onClick={onClick}
            >
                {btnText}
            </button>
        </div>
    );
};

export default MathButton;
