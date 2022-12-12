import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const CommentWrapper = styled.div`
  margin: 10px;
  padding: 20px;
  border: 3px solid cornflowerblue;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  width: 50%;
  height: 30px;
  margin-right: 10px;
  text-indent: 10px;
`;

const ButtonWrapper = styled.div`
  width: 440px;
`;

const Button = styled.button`
  width: 200px;
  height: 30px;
  margin: 10px;
  background-color: cornflowerblue;
`;

const Comments = ({comment: {id, content}}) => {
    const [toggle, setToggle] = useState(false);
    const [newContent, setNewContent] = useState(content);

    const handleToggle = () => {
        setToggle((prev) => !prev);
    };

    const handleChangeContent = (e) => {
        setNewContent(e.target.value);
    };

    const editComment = (id, newContent) => {
        axios.patch(`http://localhost:3001/comments/${id}`, {content: newContent});
        handleToggle();
    };

    const deleteComment = (id) => {
        axios.delete(`http://localhost:3001/comments/${id}`);
        setToggle("deleted");
    };

    if (toggle === "deleted") return null;

    if (!toggle)
        return (
            <CommentWrapper><span>{newContent}</span>
                <ButtonWrapper>
                    <Button onClick={handleToggle}>수정하기</Button>
                    <Button onClick={() => deleteComment(id)}>삭제하기</Button>
                </ButtonWrapper>
            </CommentWrapper>
        )
    else return (
        <CommentWrapper>
            <Input type="text" placeholder={newContent} onChange={handleChangeContent}/>
            <ButtonWrapper>
                <Button onClick={() => editComment(id, newContent)}>수정완료</Button>
                <Button onClick={handleToggle}>취소하기</Button>
            </ButtonWrapper>
        </CommentWrapper>
    );
};

export default Comments;