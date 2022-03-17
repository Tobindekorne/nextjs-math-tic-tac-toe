import React, { useState } from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import styles from './MathInput.module.css';

const MathInput = ({ placeholder }) => {
    const [math, setMath] = useState('');

    const handleChange = (e) => {
        setMath(e.target.value);
    };

    return (
        <div className={`${styles.tr}`}>
            <div className={`${styles.td}`}>
                <input
                    className={`${styles.input}`}
                    value={math}
                    onChange={handleChange}
                    data-question-id='0'
                    type='text'
                    placeholder={placeholder}
                />
            </div>
            <div className={`${styles.td}`}>
                <div className={styles.latex}>
                    <Latex>{math}</Latex>
                </div>
            </div>
        </div>
    );
};

export default MathInput;
