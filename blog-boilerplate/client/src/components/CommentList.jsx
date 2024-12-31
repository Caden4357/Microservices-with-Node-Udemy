import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CommentList = ({postId}) => {
    const [comments, setComments] = useState([]);
    const fetchComments = async () => {
        const response = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        setComments(response.data);
    }
    useEffect(() => {
        fetchComments();
    }, []);
    
    return (
        <div>
            <ul>
                {comments.map(comment => {
                    return <li key={comment.id}>{comment.content}</li>
                })}
            </ul>
        </div>
)}

export default CommentList;