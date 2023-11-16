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

    const handleLike = (postId) => {
        const updatedPosts = posts.map(post =>
            post.id === postId ? { ...post, liked: !post.liked } : post
        );

        setPosts(updatedPosts)

    };

    const likedPosts = posts.filter(post => post.liked);


    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }



    return (
        <div >
            <h1 onClick={() => {
                window.location.reload()
            }}>Posts</h1>
            <div style={{
                display: "flex",
                width: "600px",
                justifyContent: "space-around",
                margin: "auto"
            }}>
                <button style={{
                    borderStyle: "none",
                    background: "pink",
                    padding: "10px",
                    borderRadius: "5px"
                    , color: "white",
                    fontWeight: "600",
                    fontSize: "16px",
                    marginBottom: "15px"
                }}

                    onClick={() => {
                        setPosts(likedPosts)

                    }}

                >Filter Liked Posts</button>

                <button
                    style={{
                        borderStyle: "none",
                        background: "skyblue",
                        padding: "10px",
                        borderRadius: "5px"
                        , color: "white",
                        fontWeight: "600",
                        fontSize: "16px",
                        marginBottom: "15px"
                    }}>Add New</button>
            </div>
            <div className={styles.postlist}>

                {posts.map(post => (
                    <div key={post.id} className={styles.postcard}>
                    <Link to={`/post/${post.id}`} className={styles.linkClass}>
                            <>
                                <h2>{post.title}</h2>
                            <p>{post.body}</p>
                            </>

                        </Link>
                        <button onClick={() => handleLike(post.id)}
                            style={{
                                background: "skyblue", borderStyle: "none", padding: "10px", borderRadius: "5px",
                                fontSize: "14px"
                            }}>
                            {post.liked ? ' 👎🏻Unlike' : ' 👍🏻Like'}
                        </button>
                    </div>


                ))}

            </div>
        </div>

    );
};

export default PostList;
