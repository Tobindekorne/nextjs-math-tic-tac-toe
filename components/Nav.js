import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Nav.module.css';

const Nav = () => {
    const [activeNav, setActiveNav] = useState('#');
    const router = useRouter();

    return (
        <nav className={styles.navbar}>
            <div
                className={
                    'nav__link' +
                    (activeNav === 'home' ? ` ${styles.active}` : '')
                }
                onClick={() => setActiveNav('home')}
            >
                <Link href='/'>
                    <a>Home</a>
                </Link>
            </div>
            <div
                className={
                    'nav__link' +
                    (activeNav === 'tic-tac-toe' ? ` ${styles.active}` : '')
                }
                onClick={() => setActiveNav('tic-tac-toe')}
            >
                <Link href='/tic-tac-toe'>
                    <a>Math Tic-Tac-Toe</a>
                </Link>
            </div>
        </nav>
    );
};

export default Nav;
