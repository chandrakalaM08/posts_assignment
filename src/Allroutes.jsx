import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PostList from './pages/PostList'
import PostDetails from './pages/PostDetails'


const Allroutes = () => {
    return (
        <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/:id" element={<PostDetails />} />
        </Routes>

    )
}

export default Allroutes