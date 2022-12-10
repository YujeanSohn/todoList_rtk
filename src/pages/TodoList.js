import React, { useEffect, useState } from "react";
import styled from "styled-components";
import nextId from "react-id-generator";
import axios from "axios";

const Wrapper = styled.div`
  width: 100%;
`;

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

const TodoListWrapper = styled.div`
  ::after {
    display: block;
    content: "";
    clear: both;
  }
`;

const TodoListBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1%;
`;

const TodoBox = styled.div`
  width: 16%;
  padding: 1%;
  float: left;
  border: 3px solid cornflowerblue;
  border-radius: 20px;
`;

function TodoList() {
  const id = nextId();
  const [todo, setTodo] = useState({ id: 0, title: "", content: "" });
  const [todos, setTodos] = useState([]);
  const getTodos = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/todos?date=1670484601`
      );
      setTodos(data[0].items);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getTodos();
    setTodo({ ...todo, id });
  }, []);

  const addTodo = async () => {
    try {
      await axios.patch(`http://localhost:3001/todos/1`, {
        items: [...todos, todo],
      });
      setTodos([...todos, todo]);
    } catch (e) {
      alert(e);
    }
  };

  const handleChangeTitle = ({ target: { value } }) => {
    setTodo({ ...todo, title: value });
  };

  const handleChangeContent = ({ target: { value } }) => {
    setTodo({ ...todo, content: value });
  };

  return (
    <Wrapper>
      <InputWrapper>
        <div>
          <Label>제목</Label>
          <Input
            value={todo.title}
            onChange={handleChangeTitle}
            type="text"
            placeholder="내용을 입력해주세요."
          />
          <Label>내용</Label>
          <Input
            value={todo.content}
            onChange={handleChangeContent}
            type="text"
            placeholder="내용을 입력해주세요."
          />
        </div>
        <Btn onClick={addTodo}>추가하기</Btn>
      </InputWrapper>
      <TodoListWrapper>
        <h1>Working</h1>
        <TodoListBox>
          {todos.map((v) => (
            <TodoBox key={v.id}>{v.content}</TodoBox>
          ))}
        </TodoListBox>
      </TodoListWrapper>
      <TodoListWrapper>
        <h1>Done</h1>
        <TodoListBox>
          {todos.map((v) => (
            <TodoBox key={v.id}>{v.content}</TodoBox>
          ))}
        </TodoListBox>
      </TodoListWrapper>
    </Wrapper>
  );
}

export default TodoList;
