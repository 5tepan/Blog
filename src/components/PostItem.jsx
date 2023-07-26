import React from 'react'
import MyButton from "./ui/button/MyButton"
import {useNavigate} from 'react-router-dom'

const PostItem = (props) => {
    const navigate = useNavigate()

    return (
        <div className={"postBody"}>
            <strong>{props.post.id}. {props.post.title}</strong>
            <div>
                {props.post.body}
            </div>
            <div className={"btnPost"}>
                <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>View</MyButton>
                <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
            </div>
        </div>
    )
}

export default PostItem