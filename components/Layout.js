import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Nav />
            <main className='flex flex-col flex-1'>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
