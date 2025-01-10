const CommentList = ({comments}) => {
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