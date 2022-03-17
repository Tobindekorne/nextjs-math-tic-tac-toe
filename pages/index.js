import Head from 'next/head';
import HomePage from '../components/HomePage';
import '../styles/Home.module.css';

export default function Home() {
    return (
        <div className={'container'}>
            <Head>
                <title>Educational Games</title>
                <meta
                    name='games used to promote learning'
                    content='Educational Games'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <HomePage />
        </div>
    );
}
