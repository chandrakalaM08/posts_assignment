import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import CommentCard from '../components/CommentCard';

import poststyles from "../stylesheet/PostList.module.css"

const PostDetails = () => {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { id } = useParams();

    const getPost = () => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => {
                setPost(response.data);
                setLoading(false);

            })
            .catch(error => {
                console.error('Error fetching post details:', error);
                setError('Error fetching post details. Please try again later.');

                setLoading(false);

            });
    }


    const getComments = () => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then(response => {
                setComments(response.data);
                setLoading(false);

            })
            .catch(error => {
                console.error('Error fetching post details:', error);
                setError('Error fetching post details. Please try again later.');

                setLoading(false);

            });
    }

    console.log("comments are", comments)

    useEffect(() => {
        getPost()
        getComments()

    }, [id]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="post-details">
            <div>
                <Link to={"/"}>
                    <h1 style={{ textAlign: "left", marginLeft: "30px" }}>⬅️</h1>
                </Link>

                <h2>PostBook </h2>
            </div>

            {post ? (
                <>
                    <div className={poststyles.postcard} style={{ margin: "auto", width: "90%", height: "fit-content" }}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <hr />
                        <div style={{ textAlign: "left", marginLeft: "20px" }}>
                            <button style={{
                                width: "100px",
                                marginRight: "50px", borderStyle: "none",
                                background: "skyblue", padding: "10px", borderRadius: "5px"
                                , fontWeight: "600"
                            }}>✏️Edit</button>

                        </div>
                    </div>
                    <div>
                        <h4 style={{ textAlign: "left", marginLeft: "100px" }}>Comments:</h4>
                        {comments?.map((comment) => (
                            <CommentCard key={comment.id} comment={comment} />
                        ))}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{
                            position: "fixed",
                            bottom: 0,
                            right: 0
                        }}><path fill="#00aba5" fill-opacity="0.2" d="M0,128L48,112C96,96,192,64,288,85.3C384,107,480,181,576,176C672,171,768,85,864,80C960,75,1056,149,1152,176C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
                    </div>
                </>

            ) : (
                <Loader />
            )}


        </div>
    );
};

export default PostDetails;
