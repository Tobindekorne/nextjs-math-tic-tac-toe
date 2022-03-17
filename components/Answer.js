import React from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

const Answer = ({ answer }) => {
    return <Latex>{answer}</Latex>;
};

export default Answer;
