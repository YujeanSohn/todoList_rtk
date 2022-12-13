import React, { useState } from "react";
import {useDispatch} from "react-redux";
import {__editComment, __deleteComment} from "../../redux/modules/CommentsSlice";

import styled from "styled-components";

const CommentWrapper = styled.form`
  width: 95%;
  margin: 10px 0px 0px 0px;
  padding: 10px;
  border: 1px solid cornflowerblue;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  width: 93%;
  height: 30px;
  margin-right: 10px;
  text-indent: 10px;
  border: none;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

const Comments = ({comment: {id, content}}) => {
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const [newContent, setNewContent] = useState(content);

    const handleToggle = () => {
        setToggle((prev) => !prev);
    };

    const handleChangeContent = (e) => {
        setNewContent(e.target.value);
    };

    if (!toggle)
        return (
            <CommentWrapper><span>{newContent}</span>
                <div>
                    <Button onClick={handleToggle}>✏</Button>
                    <Button onClick={() => dispatch(__deleteComment(id))}>🗑️</Button>
                </div>
            </CommentWrapper>
        )
    else return (
        <CommentWrapper onSubmit={(e) => {
            e.preventDefault();
            dispatch(__editComment({id, newContent}));
        }}>
            <Input type="text" placeholder={newContent} onChange={handleChangeContent} required/>
            <div>
                <Button>✔</Button>
                <Button type="button" onClick={(e)=>{e.preventDefault(); handleToggle();}}>❌</Button>
            </div>
        </CommentWrapper>
    );
};

export default Comments;