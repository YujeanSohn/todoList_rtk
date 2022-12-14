import React, {memo, useState} from "react";
import {useDispatch} from "react-redux";
import {__editComment, __deleteComment} from "../../redux/modules/CommentsSlice";

import useInput from "../../hooks/useInput";

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

const DateSpan = styled.span`
  font-size: small;
  font-style: italic;
  color: gray;
  margin-right: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: none;
`;

const Comments = memo(({comment: {id, content, editHistory}}) => {
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);
    const [newContent, onChange, reset] = useInput(content, "comment");

    let date = String(new Date(id)).replace("GMT+0900 (한국 표준시)", "");

    if (editHistory) {date = String(new Date(editHistory)).replace("GMT+0900 (한국 표준시)", "(수정)")}

    const handleToggle = () => {
        setToggle((prev) => !prev);
    };

    const editComment = (e) => {
        e.preventDefault();
        if (newContent === content) {
            return alert("변경된 내용이 없습니다.");
        }
        dispatch(__editComment({id, newContent, editHistory: Date.now()}));
        handleToggle();
    };

    const deleteComment = (e) => {
        e.preventDefault();
        if(window.confirm("정말 삭제하시겠습니까?")) {
            dispatch(__deleteComment(id));
        }
    };

    if (!toggle)
        return (
            <CommentWrapper><span>{newContent}</span>
                <div>
                    <DateSpan>{date}</DateSpan>
                    <Button type="button" onClick={(e) => {e.preventDefault(); handleToggle();}}>✏</Button>
                    <Button type="button" onClick={deleteComment}>🗑️</Button>
                </div>
            </CommentWrapper>
        )
    else return (
        <CommentWrapper onSubmit={editComment}>
            <Input id="editInput" type="text" value={newContent} onChange={onChange} autoFocus required/>
            <div>
                <Button>✔</Button>
                <Button type="button" onClick={(e)=>{e.preventDefault(); handleToggle(); reset();}}>❌</Button>
            </div>
        </CommentWrapper>
    );
});

export default Comments;