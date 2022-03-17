import React, { useEffect } from 'react';
import styles from './Questions.module.css';
import { BsInfoCircleFill } from 'react-icons/bs';
import { BiSave } from 'react-icons/bi';
import MathInput from '../../../components/MathInput';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../atoms/modalAtom';
import Modal from '../../../components/Modal';

const loadLocalStorage = () => {
    const qs = localStorage.getItem('questions')?.split(',');
    const as = localStorage.getItem('answers')?.split(',');
    if (!qs || !as) return;
    const inputs = document.querySelectorAll('input');

    inputs.forEach((input) => {
        input.dataset.questionId &&
            (input.value = qs[input.dataset.questionId]);
        input.dataset.answerId && (input.value = as[input.dataset.answerId]);
    });

    for (const [key, input] of Object.entries(inputs)) {
        key % 2 === 0
            ? (input.value = qs[Math.floor(key / 2)])
            : (input.value = as[Math.floor(key / 2)]);
    }
};

const QuestionEditor = () => {
    const [open, setOpen] = useRecoilState(modalState);
    useEffect(loadLocalStorage, []);

    const handleSave = () => {
        const inputs = document.getElementsByTagName('input');
        const questions = [];
        const answers = [];
        for (const [key, value] of Object.entries(inputs)) {
            key % 2 === 0
                ? questions.push(value.value)
                : answers.push(value.value);
        }
        localStorage.setItem('questions', questions);
        localStorage.setItem('answers', answers);
    };

    return (
        <div className='container'>
            <div className={`${styles.questionTable}`}>
                <div className={`${styles.tr}`}>
                    <div className={`${styles.th}`}>Input</div>
                    <div className={`${styles.th}`}>Preview</div>
                </div>
                <MathInput placeholder='Question 1' />
                <MathInput placeholder='Answer 1' />
                <MathInput placeholder='Question 2' />
                <MathInput placeholder='Answer 2' />
                <MathInput placeholder='Question 3' />
                <MathInput placeholder='Answer 3' />
                <MathInput placeholder='Question 4' />
                <MathInput placeholder='Answer 4' />
                <MathInput placeholder='Question 5' />
                <MathInput placeholder='Answer 5' />
                <MathInput placeholder='Question 6' />
                <MathInput placeholder='Answer 6' />
                <MathInput placeholder='Question 7' />
                <MathInput placeholder='Answer 7' />
                <MathInput placeholder='Question 8' />
                <MathInput placeholder='Answer 8' />
                <MathInput placeholder='Question 9' />
                <MathInput placeholder='Answer 9' />
            </div>

            <div className={`${styles.btnRow} mt-10`}>
                <button
                    className={`btn ${styles.btn__icon}`}
                    title='Formatting info'
                    onClick={() => setOpen(true)}
                >
                    <BsInfoCircleFill />
                </button>
                <button
                    className={`btn ${styles.btn__icon}`}
                    title='Save to Browser'
                    onClick={handleSave}
                >
                    <BiSave />
                </button>
            </div>

            <Modal />
        </div>
    );
};

export default QuestionEditor;
