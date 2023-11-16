import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../stylesheet/PostList.module.css';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                setPosts(response.data);
                setLoading(false);

            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                setError('Error fetching posts. Please try again later.');

                setLoading(false);

            });
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div >
            <h1>Posts</h1>
            <div className={styles.postlist}>

                {posts.map(post => (
                    <Link to={`/post/${post.id}`} className={styles.linkClass}>
                        <div key={post.id} className={styles.postcard}>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    );
};

export default PostList;
