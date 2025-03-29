const CommentList = ({comments}) => {
    return (
        <div>
            <ul>
                {comments.map(comment => {
                    if(comment.status === 'pending'){
                        comment.content = 'This comment is awaiting moderation';
                    }
                    if(comment.status === 'rejected'){
                        comment.content = 'This comment has been rejected';
                    }
                    if(comment.status === 'approved'){
                        comment.content = comment.content;
                    }
                    return <li key={comment.id}>{comment.content}</li>
                })}
            </ul>
        </div>
)}
export default CommentList;