import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput  from "../hooks/useInput";
import styled from "styled-components";
import { __addTodo } from "../redux/modules/TodosSlice";

const Wrapper = styled.div`
  padding: 20px;
  background-color: #ccc;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  margin-right: 10px;
`;

const InputWrapper = styled.div`
  float: left;
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  margin-right: 10px;
  text-indent: 10px;
`;

const Btn = styled.button`
  width: 300px;
  height: 30px;
  background-color: cornflowerblue;
`;

function TodoInput({ isToday }) {
  const id = Date.now();
  const todos = useSelector((store) => store.todos.todos);
  const todosID = useSelector((store) => store.todos.todosID);
  const [title, onChangeTitle, resetTitle] = useInput("", "title");
  const [content, onChangeContent, resetContent] = useInput("", "content");

  const ref = useRef();

  const dispatch = useDispatch();
  const addTodo = () => {
    try {
      if (title.length === 0 || content.length === 0) {
        alert("내용을 입력해주세요.");
        return;
      }

      dispatch(__addTodo({ todosID, todos, todo: {id, title, content, isDone: false, editHistory: 0}}));
    } finally {
      resetTitle();
      resetContent();

      ref.current.focus();
    }
  };

  return (
    <Wrapper>
      <div>
        <InputWrapper>
          <Label>제목</Label>
          <Input
            ref={ref}
            value={title}
            onChange={onChangeTitle}
            type="text"
            placeholder="내용을 입력해주세요."
            disabled={!isToday}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>내용</Label>
          <Input
            value={content}
            onChange={onChangeContent}
            type="text"
            placeholder="내용을 입력해주세요."
            disabled={!isToday}
          />
        </InputWrapper>
      </div>
      <Btn
        onClick={addTodo}
        disabled={title.length === 0 || content.length === 0}
      >
        추가하기
      </Btn>
    </Wrapper>
  );
}

export default TodoInput;
