import React, { useState, useEffect } from 'react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import styles from './MathInput.module.css';

const MathInput = ({ placeholder, id }) => {
    const [math, setMath] = useState('');
    const [hasFocus, setFocus] = useState(false);
    let textInput = null;

    const handleChange = (e) => {
        const el = document.querySelector(`#${id}`);
        const start = el.selectionStart;
        const end = el.selectionEnd;
        if (['(', '{', '[', '$'].includes(e.nativeEvent.data)) return;
        if (
            [')', '}', ']', '$'].includes(e.nativeEvent.data) &&
            math[start - 1] === e.nativeEvent.data &&
            start === end
        ) {
            return;
        }
        setMath(e.target.value);
    };

    const handleKeyDown = (e) => {
        const el = document.querySelector(`#${id}`);
        const start = el.selectionStart;
        const end = el.selectionEnd;
        let closer = '';
        switch (e.key) {
            case '(':
                closer = ')';
                break;
            case '{':
                closer = '}';
                break;
            case '[':
                closer = ']';
                break;
            case '$':
                closer = '$';
                break;
            default:
                break;
        }
        if (['(', '{', '[', '$'].includes(e.key)) {
            setMath(
                math.slice(0, el.selectionStart) +
                    e.key +
                    math.slice(el.selectionStart, el.selectionEnd) +
                    closer +
                    math.slice(el.selectionEnd, math.length)
            );
            window.setTimeout(function () {
                el.setSelectionRange(start + 1, end + 1);
            }, 0);
        }
        if (
            [')', '}', ']', '$'].includes(e.key) &&
            math[start] === e.key &&
            start === end
        ) {
            window.setTimeout(function () {
                el.setSelectionRange(start + 1, start + 1);
            }, 0);
        }
    };

    const insertMath = (e, symbol) => {
        e.preventDefault();
        const el = document.querySelector(`#${id}`);
        const start = el.selectionStart;
        const end = el.selectionEnd;
        setMath(
            math.slice(0, el.selectionStart) +
                symbol +
                math.slice(el.selectionStart, math.length)
        );
        el.focus();
        window.setTimeout(function () {
            el.setSelectionRange(start + symbol.length, end + symbol.length);
        }, 0);
    };

    const surroundWith = (e, openSymbol, closeSymbol = null) => {
        e.preventDefault();
        if (!closeSymbol) closeSymbol = openSymbol;
        const el = document.querySelector(`#${id}`);
        const start = el.selectionStart;
        const end = el.selectionEnd;
        setMath(
            math.slice(0, el.selectionStart) +
                openSymbol +
                math.slice(el.selectionStart, el.selectionEnd) +
                closeSymbol +
                math.slice(el.selectionEnd, math.length)
        );
        window.setTimeout(function () {
            el.setSelectionRange(
                start + openSymbol.length,
                end + openSymbol.length
            );
        }, 0);
        el.focus();
    };

    return (
        <>
            <div className={`${styles.tr}`}>
                <div className={`${styles.td}`}>
                    <input
                        id={id}
                        className={`${styles.input}`}
                        value={math}
                        onKeyDown={(e) => handleKeyDown(e)}
                        onChange={(e) => handleChange(e)}
                        onFocus={() => setFocus(true)}
                        onBlur={() => setFocus(false)}
                        type='text'
                        placeholder={placeholder}
                        ref={(button) => {
                            textInput = button;
                        }}
                    />
                </div>
                <div className={`${styles.td}`}>
                    <div className={styles.latex}>
                        <Latex>{math}</Latex>
                    </div>
                </div>
            </div>
            {hasFocus && (
                <div
                    className={`${styles.formatButtons}  invisible lg:visible w-screen  justify-center items-center`}
                >
                    <button
                        id='mathBtn'
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => surroundWith(e, '$')}
                    >
                        Math Format
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, 'f(x) = ')}
                    >
                        <Latex>{`$f(x) = $`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, `f'(x) = `)}
                    >
                        <Latex>{`$f'(x) = $`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\gt ')}
                    >
                        <Latex>{`$\\gt$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\lt ')}
                    >
                        <Latex>{`$\\lt$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\geq ')}
                    >
                        <Latex>{`$\\geq$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\leq ')}
                    >
                        <Latex>{`$\\leq$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\sqrt{x} ')}
                    >
                        <Latex>{`$\\sqrt{x}$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\frac{a}{b}')}
                    >
                        <Latex>{`$\\frac{a}{b}$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) =>
                            surroundWith(e, '\\left(', '\\right)')
                        }
                    >
                        <Latex>{`$(...)$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) =>
                            surroundWith(e, '\\left[', '\\right]')
                        }
                    >
                        <Latex>{`$[...]$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) =>
                            surroundWith(e, '\\left{', '\\right}')
                        }
                    >
                        <Latex>{`$\\{...\\}$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) =>
                            surroundWith(e, '\\left|', '\\right|')
                        }
                    >
                        <Latex>{`$|x|$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, 'x^2')}
                    >
                        <Latex>$x^2$</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\int_{a}^{b}')}
                    >
                        <Latex>{`$\\int_{a}^{b}$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) =>
                            insertMath(e, '\\sum_{n=1}^\\infty ')
                        }
                    >
                        <Latex>{`$\\sum_{n=1}^\\infty$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\infty ')}
                    >
                        <Latex>{`$\\infty$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\alpha ')}
                    >
                        <Latex>{`$\\alpha$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\beta ')}
                    >
                        <Latex>{`$\\beta$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\gamma ')}
                    >
                        <Latex>{`$\\gamma$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\rho ')}
                    >
                        <Latex>{`$\\rho$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\sigma ')}
                    >
                        <Latex>{`$\\sigma$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\delta ')}
                    >
                        <Latex>{`$\\delta$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\epsilon ')}
                    >
                        <Latex>{`$\\epsilon$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\phi ')}
                    >
                        <Latex>{`$\\phi$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\theta ')}
                    >
                        <Latex>{`$\\theta$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\subset ')}
                    >
                        <Latex>{`$\\subset$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\supset ')}
                    >
                        <Latex>{`$\\supset$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\subseteq ')}
                    >
                        <Latex>{`$\\subseteq$`}</Latex>
                    </button>
                    <button
                        className='btn btn-primary'
                        unselectable='on'
                        onMouseDown={(e) => insertMath(e, '\\supseteq ')}
                    >
                        <Latex>{`$\\supseteq$`}</Latex>
                    </button>
                </div>
            )}
        </>
    );
};

export default MathInput;
