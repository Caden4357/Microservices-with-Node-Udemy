import React, {useState} from 'react';
import axios from 'axios';
const PostForm = (props) => {
    const [title, setTitle] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const newPost = {title};
            const response = await axios.post('http://localhost:4000/posts/', newPost);
            console.log(response.data);
            setTitle('');
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className='container mt-5 w-25 border'>
            <h1>Create Post</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
)}

export default PostForm;