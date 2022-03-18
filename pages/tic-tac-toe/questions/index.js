import React, { useEffect } from 'react';
import styles from './Questions.module.css';
import { BsInfoCircleFill } from 'react-icons/bs';
import { BiSave } from 'react-icons/bi';
import MathInput from '../../../components/MathInput';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../atoms/modalAtom';
import Modal from '../../../components/Modal';

const loadLocalStorage = () => {
    const qs = localStorage.getItem('questions')?.split('✆');
    const as = localStorage.getItem('answers')?.split('✆');

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
        localStorage.setItem('questions', questions.join('✆'));
        localStorage.setItem('answers', answers.join('✆'));
    };

    return (
        <div className='container'>
            <div className={`${styles.questionTable}`}>
                <div className={`${styles.tr}`}>
                    <div className={`${styles.th}`}>Input</div>
                    <div className={`${styles.th}`}>Preview</div>
                </div>
                <MathInput id='q1' placeholder='Question 1' />
                <MathInput id='a1' placeholder='Answer 1' />
                <MathInput id='q2' placeholder='Question 2' />
                <MathInput id='a2' placeholder='Answer 2' />
                <MathInput id='q3' placeholder='Question 3' />
                <MathInput id='a3' placeholder='Answer 3' />
                <MathInput id='q4' placeholder='Question 4' />
                <MathInput id='a4' placeholder='Answer 4' />
                <MathInput id='q5' placeholder='Question 5' />
                <MathInput id='a5' placeholder='Answer 5' />
                <MathInput id='q6' placeholder='Question 6' />
                <MathInput id='a6' placeholder='Answer 6' />
                <MathInput id='q7' placeholder='Question 7' />
                <MathInput id='a7' placeholder='Answer 7' />
                <MathInput id='q8' placeholder='Question 8' />
                <MathInput id='a8' placeholder='Answer 8' />
                <MathInput id='q9' placeholder='Question 9' />
                <MathInput id='a9' placeholder='Answer 9' />
            </div>

            <button
                className={`btn fixed top-24 ${styles.btn__icon}`}
                title='Formatting info'
                onClick={() => setOpen(true)}
            >
                <BsInfoCircleFill />
            </button>
            <button
                className={`btn fixed top-48 ${styles.btn__icon} ${styles.save__btn}`}
                title='Save to Browser'
                onClick={handleSave}
            >
                <BiSave />
            </button>

            <Modal />
        </div>
    );
};

export default QuestionEditor;
