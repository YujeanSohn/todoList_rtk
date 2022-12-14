import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Progressbar from "../components/Progressbar";

const Wrapper = styled.div`
  padding: 20px;
  position: relative;
`;

const Header = styled.h1`
  width: 100%;
  font-weight: 900;
`;

const Logo = styled.span`
  margin-left: 20px;
  color: cornflowerblue;
`;

const CardListWrapper = styled.div`
  margin-top: 50px;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const CardWrapper = styled.div`
  width: 18%;
  padding: 1%;
  float: left;
  position: relative;
  margin: 10px;
  border: 5px solid cornflowerblue;
  border-radius: 20px;
`;

const DateSt = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const CommentCount = styled.div`
  float: right;
  font-size: 20px;
  font-weight: 500;
  bottom: 20px;
  right: 30px;
`;

const ButtonSt = styled.button`
  position: absolute;
  right: 50px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50px;
  font-size: 40px;
  color: white;
  background-color: cornflowerblue;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Home() {
  const navigate = useNavigate();
  const id = Date.now();

  const [comments, setComments] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  const [todos, setTodos] = useState({
    id,
    items: [],
  });

  useEffect(() => {
    getAllTodos();
    getComments();
  }, []);

  const getAllTodos = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/todos`);
      setAllTodos(data);
    } catch (e) {
      alert(e);
    }
  };

  const getComments = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/Comments`);
      setComments(data);
    } catch (e) {
      alert(e);
    }
  };

  const isRegistered = (newTodos) => {
    const index = allTodos.findIndex((todos) => {
      const todosDate = new Date(todos.id);
      return (
        newTodos.getFullYear() === todosDate.getFullYear() &&
        newTodos.getMonth() === todosDate.getMonth() &&
        newTodos.getDate() === todosDate.getDate()
      );
    });
    return index < 0 ? false : true;
  };

  const addTodos = async (id) => {
    if (isRegistered(new Date(id))) {
      alert("이미 등록된 날짜입니다 !");
      return;
    }
    try {
      await axios.post(`http://localhost:3001/todos`, {
        ...todos,
        id,
      });
      setAllTodos([...allTodos, { ...todos, id }]);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Wrapper>
      <Header>
        <Logo>TODO LIST🎯</Logo>
      </Header>
      <ButtonSt onClick={() => addTodos(id)}>+</ButtonSt>
      <CardListWrapper>
        {allTodos.map((todos) => {
          const today = new Date(todos.id);
          const year = today.getFullYear();
          const month = today.getMonth() + 1;
          const day = today.getDate();

          const commentcount = comments.filter(
            (comment) => todos.id === comment.todosId
          ).length;

          return (
            <CardWrapper
              type="button"
              onClick={() => {
                navigate(`/todos/${todos.id}`);
              }}
              key={todos.id}
            >
              <DateSt>{year + "년" + month + "월" + day + "일"}</DateSt>
              <Progressbar todos={todos.items} />
              <CommentCount>💬{commentcount}</CommentCount>
            </CardWrapper>
          );
        })}
      </CardListWrapper>
    </Wrapper>
  );
}

export default Home;
