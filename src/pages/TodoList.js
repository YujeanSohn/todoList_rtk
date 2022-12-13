import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { __getTodos } from "../redux/modules/TodosSlice";
import Progressbar from "../components/Progressbar";
import TodoInput from "../components/TodoInput";
import Item from "../components/Item";
import { useParams } from "react-router-dom";

import CommentList from "../components/comments/CommentList"

const Wrapper = styled.div`
  width: 100%;
`;

const Header = styled.h1`
  width: 100%;
  font-weight: 900;
`;

const Logo = styled.span`
  margin-left: 20px;
  color: cornflowerblue;
`;

const InfoBox = styled.div`
  width: 100%;
  height: 50vh;
  line-height: 50vh;
  text-align: center;
  color: #ccc;
`;

const TodoListBox = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1%;
  flex-wrap: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  ::after {
    display: block;
    content: "";
    clear: both;
  }
`;

function TodoList() {
  const { id } = useParams();
  const isLoading = useSelector((store) => store.todos.isLoading);
  const todos = useSelector((store) => store.todos.todos);
  const todosID = useSelector((store) => store.todos.todosID);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const setScroll = () => {
    // 조건문을 if(!scrollRef?.current) return으로 써주셔도 돼요
    // 수정할때 스크롤 값을 조정하려면 조건을 달아줘야 하는데 item component에 있는isModify
    // 같은 걸 조건문에 이용하면 좋을 것 같아요 상위컴포넌트로 이동시켜서 이용할 수 있을 것 같습니다.
    if (scrollRef.current !== null) {
      scrollRef.current.scrollLeft += 300 * (todos.length - 1);
    }
  };

  useEffect(() => {
    setScroll(); //setScroll함수 자체를 useEffect 안에 넣어주면 missing dependency가 안뜰거에요
  }, [todos]);

  useEffect(() => {
    dispatch(__getTodos(id));
  }, [dispatch, id]);

  const isToday = () => {
    const today = new Date(Date.now());
    const writtenDay = new Date(todosID);
    return (
      today.getFullYear() === writtenDay.getFullYear() &&
      today.getMonth() === writtenDay.getMonth() &&
      today.getDate() === writtenDay.getDate()
    );
  };

  const date = new Date(todosID);
  return (
    <Wrapper>
      <Header>
        {`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
        <Logo>TODO 🎯</Logo>
      </Header>
      <Progressbar></Progressbar>
      <TodoInput isToday={isToday()}></TodoInput>
      {isLoading ? ( //&&연산자를 사용하는건 어떨까요?
        <InfoBox>데이터를 불러오는 중입니다.</InfoBox>
      ) : todos.length === 0 ? (
        <InfoBox>새로운 할일을 추가해보세요!</InfoBox>
      ) : (
        <>
          <h1>Working</h1>
          <TodoListBox ref={scrollRef}>
            {todos.filter((v) => v.isDone === false).length !== 0 //!v.isDone으로 써주세요
              ? todos
                  .filter((v) => v.isDone === false)
                  .map((v) => <Item key={v.id} todo={v} isToday={isToday()} />)
              : "추가된 할일이 없습니다."}
          </TodoListBox>
          <h1>Done</h1>
          <TodoListBox>
            {todos.filter((v) => v.isDone === true).length !== 0
              ? todos
                  .filter((v) => v.isDone === true)
                  .map((v) => <Item key={v.id} todo={v} isToday={isToday()} />)
              : "완료된 일이 없습니다."}
          </TodoListBox>
          <CommentList date={id} />
        </>
      )}
    </Wrapper>
  );
}

export default TodoList;
