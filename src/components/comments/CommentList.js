import React, {useLayoutEffect, useState} from "react";
import styled from "styled-components";
import axios from "axios";
import Comments from "./Comment";

const InputWrapper = styled.div`
  padding: 20px;
  margin-top: 10px;
  background-color: #ccc;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  width: 80%;
  height: 30px;
  margin-right: 10px;
  text-indent: 10px;
`;

const Button = styled.button`
  width: 300px;
  height: 30px;
  background-color: cornflowerblue;
`;

const CommentList = ({date}) => {
    const [content, setContent] = useState("");
    const [comments, setComments] = useState([]);

    useLayoutEffect(() => {
        getComments();
    }, []);

    const getComments = async () => {
        try {
            const {data} = await axios.get(`http://localhost:3001/comments?date=${date}`);
            setComments(data);
        } catch (e) {
            alert(e);
        }
    };

    const handleChangeContent = (e) => {
        setContent(e.target.value);
    };

    const addComment = async (id) => {
        try {
            await axios.post(`http://localhost:3001/comments`, {id, date, content});
            setComments([...comments, {
                id,
                date,
                content
            }]);
            setContent("");
        } catch (e) {
            alert(e);
        }
    }

    return (
        <div>
            <InputWrapper>
                <Input type='text' placeholder='댓글을 입력해주세요' value={content} onChange={handleChangeContent}/>
                <Button onClick={() => addComment(Date.now())}>추가하기</Button>
            </InputWrapper>
            {comments.map((comment) => {
                return <Comments key={comment.id} comment={comment} />
            })}
        </div>
    );
};

export default CommentList;