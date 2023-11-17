import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../stylesheet/PostList.module.css';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import CreatePost from '../components/CreatePost';
const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showCreatePost, setShowCreatePost] = useState(false);


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


    const handleDelete = async (postId) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`).then((res) => {
                alert("Post Successfully Deleted!")
                setPosts(posts.filter(post => post.id !== postId));

            });
            console.log('Deleted post:', postId);

        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


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
                    width: "200px",
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
                    onClick={() => setShowCreatePost(true)}
                    style={{
                        marginLeft: "10px",
                        width: "200px",
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

            {showCreatePost && <CreatePost posts={posts} setPosts={setPosts} />}
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
                                background: "#7CB9E8", borderStyle: "none", padding: "10px", borderRadius: "5px",
                                fontSize: "14px", width: "90px", fontWeight: "600", marginRight: "10px"
                            }}>
                            {post.liked ? ' 👎🏻Unlike' : ' 👍🏻Like'}
                        </button>

                        <button
                            onClick={() => { handleDelete(post.id) }}
                            style={{
                                width: "90px",
                                borderStyle: "none", fontSize: "14px",
                                background: "rgb(255,160,122)", padding: "10px", borderRadius: "5px"
                                , fontWeight: "600"
                            }}>🗑️Delete</button>
                    </div>


                ))}

            </div>
        </div>

    );
};

export default PostList;
