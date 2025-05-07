import React, {useState} from 'react';
import axios from 'axios';
const CommentForm = ({postId}) => {
    const [comment, setComment] = useState('');


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const newComment = {content: comment};
            const response = await axios.post(`http://posts.com/posts/${postId}/comments`, newComment);
            console.log('NEW COMMENT: ', response);
            setComment('');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Comment</label>
                    <input type="text" className="form-control" value={comment} onChange={e => setComment(e.target.value)} />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>

        </div>
)}

export default CommentForm;