// Dependencies
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { appUseSelector } from '../store';

// Index route
const Index = () => <Navigate replace to="/home" />;

// Protect routes
const ProtectedRoute = (props: any) => {
    // Get userInfo from the store state
    const userInfo = appUseSelector((state) => state.app.userInfo);

    return userInfo.isLoggedIn ? <>{props.element}</> : <Navigate replace to="/login" />;
};

// Routes
const Home = React.lazy(() => import(/* webpackChunkName: 'Home' */ '../views/Home'));
const Admin = React.lazy(() => import(/* webpackChunkName: 'Admin' */ '../views/Admin'));
const Login = React.lazy(() => import(/* webpackChunkName: 'Login' */ '../views/Login'));

// Navigation
export default (
    <Routes>
        {/* Index route */}
        <Route path="" element={<Index />}></Route>

        {/* Home route */}
        <Route path="/home" element={<Home />}></Route>

        {/* Admin route */}
        <Route path="admin" element={<ProtectedRoute element={<Admin />} />}></Route>

        {/* Admin route */}
        <Route path="/login" element={<Login />}></Route>
    </Routes>
);
