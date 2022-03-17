import React from 'react';
import styles from './Board.module.css';
import GameButton from './GameButton';

const Board = ({ onClick, buttonLabels, winCombo }) => {
    let strikeClass = `${styles.strike}`;
    if (winCombo?.every((val) => [0, 1, 2].includes(val)))
        strikeClass += ` ${styles.strikeRow} ${styles.strikeRow1}`;
    if (winCombo?.every((val) => [0, 3, 6].includes(val)))
        strikeClass += ` ${styles.strikeCol} ${styles.strikeCol1}`;
    if (winCombo?.every((val) => [0, 4, 8].includes(val)))
        strikeClass += ` ${styles.strikeDiag} ${styles.strikeDiag1}`;
    if (winCombo?.every((val) => [2, 5, 8].includes(val)))
        strikeClass += ` ${styles.strikeCol} ${styles.strikeCol3}`;
    if (winCombo?.every((val) => [2, 4, 6].includes(val)))
        strikeClass += ` ${styles.strikeDiag} ${styles.strikeDiag2}`;
    if (winCombo?.every((val) => [3, 4, 5].includes(val)))
        strikeClass += ` ${styles.strikeRow} ${styles.strikeRow2}`;
    if (winCombo?.every((val) => [6, 7, 8].includes(val)))
        strikeClass += ` ${styles.strikeRow} ${styles.strikeRow3}`;
    if (winCombo?.every((val) => [1, 4, 7].includes(val)))
        strikeClass += ` ${styles.strikeCol} ${styles.strikeCol2}`;
    console.log(styles);
    return (
        <>
            <div className={`container ${styles.board__container}`}>
                {buttonLabels.map((label, index) => {
                    return (
                        <GameButton
                            key={index}
                            id={index}
                            label={label}
                            onClick={onClick}
                            winCombo={winCombo}
                        />
                    );
                })}
                <div className={`${strikeClass}`}></div>
            </div>
        </>
    );
};

export default Board;
