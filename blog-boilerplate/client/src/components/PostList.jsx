import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
const PostList = (props) => {
    const {posts, setPosts} = props;


    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get('http://posts.com/posts');
            console.log('POST LIST: ', response.data);
            setPosts(response.data);
        };
        fetchPosts();
    }, [setPosts]);

    // Object.values will return an array of objects
    const renderPosts = Object.values(posts).map(post => {
        return (
            <div className="card" style={{width: '30%', marginBottom: '20px'}} key={post.id}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentForm postId={post.id}/>
                    <CommentList comments={post.comments}/>
                </div>
            </div>
        )
    })

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderPosts}
        </div>
    
)}

export default PostList;