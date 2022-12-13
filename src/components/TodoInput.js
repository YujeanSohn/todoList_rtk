import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __addTodo } from "../redux/modules/TodosSlice";

const InputWrapper = styled.div`
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
  const [todo, setTodo] = useState({
    id,
    title: "",
    content: "",
    isDone: false,
  });
  const ref = useRef();

  const handleChangeTitle = ({ target: { value } }) => {
    setTodo({ ...todo, title: value });
  };

  const handleChangeContent = ({ target: { value } }) => {
    setTodo({ ...todo, content: value });
  };

  const dispatch = useDispatch();
  const addTodo = () => {
    try {
      if (todo.title.length === 0 || todo.content.length === 0) {
        alert("내용을 입력해주세요.");
        return;
      }

      dispatch(__addTodo({ todosID, todos, todo }));
    } finally {
      setTodo({
        id,
        title: "",
        content: "",
        isDone: false,
      });

      ref.current.focus();
    }
  };

  return (
    <InputWrapper>
      <div>
        <Label>제목</Label>
        <Input
          ref={ref}
          value={todo.title}
          onChange={handleChangeTitle}
          type="text"
          placeholder="내용을 입력해주세요."
          disabled={!isToday}
        />
        <Label>내용</Label>
        <Input
          value={todo.content}
          onChange={handleChangeContent}
          type="text"
          placeholder="내용을 입력해주세요."
          disabled={!isToday}
        />
      </div>
      <Btn onClick={addTodo}>추가하기</Btn>
    </InputWrapper>
  );
}

export default TodoInput;
