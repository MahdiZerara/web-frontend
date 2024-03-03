// Dependencies
import React from 'react';
import NavBar from '../components/Navbar';

// TypeScript types
interface Props {
    children: React.ReactNode;
}

// Module
const Layout: React.FC<Props> = ({ children }) => (
    <>
        <NavBar />
        {children}
    </>
);

// Export module
export default Layout;
