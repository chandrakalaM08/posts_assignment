import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader';
import styles from "../stylesheet/EditPost.module.css"
import { useParams } from 'react-router-dom';
const EditPost = ({ setPost, setBody, setTitle, handleUpdatePost, title, body }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);




    return (
        <div className={styles.modalOverlay}>

            {
                loading ? (
                    <Loader />
                ) : (
                    <>
                        {error && <p>Error: {error}</p>}
                        <div className={styles.modal}>
                            <h2>Edit Post</h2>
                            <form onSubmit={handleUpdatePost}>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter Title"
                                />
                                <textarea
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    placeholder="Enter Body"
                                ></textarea>
                                <button type="submit" >Update Post</button>

                            </form>
                        </div>

                    </>
                )
            }
        </div >
    );
};

export default EditPost;
