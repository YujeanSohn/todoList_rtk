import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const [todo, setTodo] = useState({
    id,
    title: "",
    content: "",
    isDone: false,
  });
  const ref = useRef();

  const handleChangeTitle = ({ target: { value } }) => {
    if (value.length > 15) {
      alert("제목은 15자 이하로 작성해주세요");
      return;
    }

    setTodo({ ...todo, title: value });
  };

  const handleChangeContent = ({ target: { value } }) => {
    if (value.length > 20) {
      alert("내용은 20자 이하로 작성해주세요");
      return;
    }

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
    <Wrapper>
      <div>
        <InputWrapper>
          <Label>제목</Label>
          <Input
            ref={ref}
            value={todo.title}
            onChange={handleChangeTitle}
            type="text"
            placeholder="내용을 입력해주세요."
            disabled={!isToday}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>내용</Label>
          <Input
            value={todo.content}
            onChange={handleChangeContent}
            type="text"
            placeholder="내용을 입력해주세요."
            disabled={!isToday}
          />
        </InputWrapper>
      </div>
      <Btn
        onClick={addTodo}
        disabled={todo.title.length === 0 || todo.content.length === 0}
      >
        추가하기
      </Btn>
    </Wrapper>
  );
}

export default TodoInput;
