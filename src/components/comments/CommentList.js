import React, {useLayoutEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {__fetchComments, __addComment} from "../../redux/modules/CommentsSlice";
import Comments from "./Comment";

import styled from "styled-components";

const ListWrapper = styled.div`
  border: 3px solid cornflowerblue;
  border-radius: 10px;
  padding: 20px;
`;

const InputWrapper = styled.form`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  width: 97%;
  height: 30px;
  border: 2px solid cornflowerblue;
  border-radius: 10px;
  margin-right: 10px;
  text-indent: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: transparent;
  border: 2px solid cornflowerblue;
  border-radius: 50%;
  padding: 5px;
`;

const CommentList = ({todosId}) => {
    const dispatch = useDispatch();
    const {comments, isLoading, error} = useSelector((state) => state.comments);
    const [content, setContent] = useState("");

    useLayoutEffect(() => {
        dispatch(__fetchComments(todosId));
    }, [dispatch]);

    const handleChangeContent = (e) => {
        setContent(e.target.value);
    };

    if (isLoading) {
        return (
            <ListWrapper>
                <h2>Comments</h2>
                <div>로딩 중....</div>
            </ListWrapper>
        )
    }

    if (error) {
        return (
            <ListWrapper>
                <h2>Comments</h2>
                <h3>ERROR: {error.message}</h3>
            </ListWrapper>
        )
    }

    return (
        <ListWrapper>
            <h2>Comments</h2>
            <InputWrapper onSubmit={(e) => {e.preventDefault();
                dispatch(__addComment({id: Date.now(), todosId, content}));
                setContent("");
            }}>
                <Input type="text" placeholder="댓글을 입력해주세요" value={content} onChange={handleChangeContent} required/>
                <Button>➕</Button>
            </InputWrapper>
            {comments.map((comment) => {
                return <Comments key={comment.id} comment={comment} />
            })}
        </ListWrapper>
    );
};

export default CommentList;