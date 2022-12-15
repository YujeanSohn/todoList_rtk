import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { __getTodos } from "../redux/modules/TodosSlice";
import Progressbar from "../components/Progressbar";
import TodoInput from "../components/TodoInput";
import Items from "../components/Items";
import CommentList from "../components/comments/CommentList";

const Wrapper = styled.div`
  padding: 20px;
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
  height: 180px;
  line-height: 180px;
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

const CommentListWrapper = styled.div`
  padding-top: 20px;
`;

function TodoList() {
  const { id } = useParams();
  const isLoading = useSelector((store) => store.todos.isLoading);
  const todosID = useSelector((store) => store.todos.todosID);
  const todos = useSelector((store) => store.todos.todos);
  const workings = useSelector((store) =>
    store.todos.todos
      .filter((v) => !v.isDone)
      .sort((a, b) => {
        if (a.editHistory > b.editHistory) return 1;
        if (a.editHistory < b.editHistory) return -1;

        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;

        return 0;
      })
  );
  const dones = useSelector((store) =>
    store.todos.todos
      .filter((v) => v.isDone)
      .sort((a, b) => {
        if (a.editHistory > b.editHistory) return 1;
        if (a.editHistory < b.editHistory) return -1;

        if (a.id > b.id) return 1;
        if (a.id < b.id) return -1;

        return 0;
      })
  );
  const dispatch = useDispatch();
  const workingScrollRef = useRef(null);
  const doneScrollRef = useRef(null);

  const setWorkingsScroll = () => {
    if (!workingScrollRef?.current) return;
    workingScrollRef.current.scrollLeft += 300 * (workings.length - 1);
  };

  const setDonesScroll = () => {
    if (!doneScrollRef?.current) return;
    doneScrollRef.current.scrollLeft += 300 * (dones.length - 1);
  };

  useEffect(() => {
    setWorkingsScroll();
  }, [workings[workings.length - 1]]);

  useEffect(() => {
    setDonesScroll();
  }, [dones[dones.length - 1]]);

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
      <Progressbar todos={todos} isSmallSize={false}></Progressbar>
      <TodoInput isToday={isToday()}></TodoInput>
      <h1>Working</h1>
      {!isLoading && todos.length === 0 ? (
        <InfoBox>새로운 할일을 추가해보세요!</InfoBox>
      ) : (
        <TodoListBox ref={workingScrollRef}>
          <Items
            type="working"
            isLoading={isLoading}
            todos={workings}
            isToday={isToday}
          ></Items>
        </TodoListBox>
      )}
      <h1>Done</h1>
      {!isLoading && todos.length === 0 ? (
        <InfoBox>새로운 할일을 추가해보세요!</InfoBox>
      ) : (
        <TodoListBox ref={doneScrollRef}>
          <Items
            type="done"
            isLoading={isLoading}
            todos={dones}
            isToday={isToday}
          ></Items>
        </TodoListBox>
      )}
      <CommentListWrapper>
        <CommentList todosId={id} />
      </CommentListWrapper>
    </Wrapper>
  );
}

export default TodoList;
