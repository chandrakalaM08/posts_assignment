import React from 'react'

const CommentCard = ({ comment }) => {

    return (
        <div style={{ display: "flex", width: "90%", justifyContent: "flex-start", marginLeft: "100px" }}>
            <div style={{ display: "flex" }}>
                <img alt='user' src="https://cdn-icons-png.flaticon.com/512/10412/10412528.png"
                    style={{ width: "40px", height: "40px", paddingTop: "10px" }} />

                <h4 style={{ color: "blue" }}>
                    {comment.email.split("@")[0]}
                </h4>

            </div>

            <div style={{
                textAlign: "left", lineHeight: "5px", padding: "5px", border: "1px solid grey"
                , borderRadius: "3px", margin: "10px"
            }}>
                <h4>{comment.name}</h4>
                <p style={{ color: "grey", fontSize: "14px", lineHeight: "15px" }}>{comment.body}</p>
            </div>

        </div>

    )
}

export default CommentCard