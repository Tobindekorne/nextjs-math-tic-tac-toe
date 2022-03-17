import React from 'react';
import styles from './gameButton.module.css';

const GameButton = ({ id, label, onClick, winCombo }) => {
    let classList = `btn ${styles.btnGame}`;
    classList += [0, 1, 2].includes(id) ? ' top' : '';
    classList += [2, 5, 8].includes(id) ? ' right' : '';
    classList += [6, 7, 8].includes(id) ? ' bottom' : '';
    classList += [0, 3, 6].includes(id) ? ' left' : '';
    let content = label;
    if (winCombo !== null) {
        classList += winCombo.includes(id)
            ? ` ${styles.win}`
            : ` ${styles.deadSquare}`;
        if (Number(content)) {
            content = '';
        }
    }

    return (
        <button
            disabled={label === 'X' || label === 'O' || winCombo !== null}
            onClick={() => onClick(label)}
            className={classList}
        >
            {content}
        </button>
    );
};

export default GameButton;
