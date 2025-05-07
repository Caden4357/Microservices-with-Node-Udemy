import React, { useState } from 'react';
import axios from 'axios';
const PostForm = ({posts, setPosts}) => {
    const [title, setTitle] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('submitHandler');
        const newPost = { title };
        const response = await axios.post('http://posts.com/posts/create', newPost);
        console.log('RES . DATA: ', response.data);
        // setPosts([...posts, response.data]);
        setTitle('');
    }
    return (
        <div className='container mt-5 w-25 border'>
            <h1>Create Post!!!!!</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor='title'>Title</label>
                    <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <button type='submit' className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default PostForm;