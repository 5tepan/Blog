import React from 'react'
import MyButton from "./ui/button/MyButton"

const PostItem = (props) => {
    return (
        <div className={"postBody"}>
            <strong>{props.number}. {props.post.title}</strong>
            <div>
                {props.post.body}
            </div>
            <div className={"btnDelete"}>
                <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
            </div>
        </div>
    )
}

export default PostItem