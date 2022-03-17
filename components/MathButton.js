import React from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import styles from './MathButton.module.css';

const MathButton = ({ math, onClick }) => {
    return (
        <div className={`btn ${styles.math} text-center`} onClick={onClick}>
            <Latex>{math}</Latex>
        </div>
    );
};

export default MathButton;
