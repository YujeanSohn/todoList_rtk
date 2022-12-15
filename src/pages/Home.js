import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
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
  cursor: pointer;
  width: 18%;
  padding: 1%;
  float: left;
  position: relative;
  margin: 10px;
  border: 5px solid cornflowerblue;
  border-radius: 20px;
  &: hover {
    background-color: lightgray;
  }
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
  cursor: pointer;
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

  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  const todos = {
    id,
    items: [],
  };

  useEffect(() => {
    getAllTodos();
    getComments();
  }, []);

  const getAllTodos = async () => {
    setIsLoading(true)
    try {
      const { data } = await client.get(`/todos`);
      setAllTodos(data);
      setIsLoading(false)
    } catch (e) {
      alert(e);
    }
  };

  const getComments = async () => {
    try {
      const { data } = await client.get(`/comments`);
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
      await client.post(`/todos`, {
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
        {isLoading ?
            <h2 style={{
              marginLeft: "30px"
            }}>로딩 중....</h2>
            :
            allTodos.map((todos) => {
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
                    <Progressbar todos={todos.items} isSmallSize={true}/>
                    <CommentCount>💬{commentcount}</CommentCount>
                  </CardWrapper>
              );
            })}
      </CardListWrapper>
    </Wrapper>
  );
}

export default Home;
