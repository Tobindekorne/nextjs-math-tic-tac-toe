import React from 'react';
import styles from './HomePage.module.css';
import TTT from '../public/tic-tac-toe.png';
import PreviewCard from '../components/PreviewCard';

const Home = () => {
    return (
        <div className='container'>
            <h1 className='text-center'>Educational Games</h1>
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                <PreviewCard
                    title='Math Tic-Tac-Toe'
                    route='/tic-tac-toe'
                    image={TTT}
                    desc='A game of Tic-Tac-Toe with Math learning along the way!'
                />
            </div>
        </div>
    );
};

export default Home;
