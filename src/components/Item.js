import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __deleteTodo, __updateTodo } from "../redux/modules/TodosSlice";

const ItemBox = styled.div`
  width: 16%;
  padding: 1%;
  float: left;
  flex: 0 0 auto;
  border: 3px solid cornflowerblue;
  border-radius: 20px;
`;

const ItemTitle = styled.h2`
  font-weight: 800;
`;

const BtnWrapper = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Btn = styled.button`
  width: 40%;
  height: 30px;
  display: ${(props) => (props.show ? "block" : "none")};
  background-color: ${(props) => props.bgColor};
  border: none;
  border-radius: 10px;
  :hover {
    cursor: pointer;
  }
`;

const DeleteBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
`;

const DeleteBtn = styled.span`
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: ${(props) => (props.show ? "block" : "none")};
  text-align: center;
  background-color: red;
  color: white;
  border-radius: 15px;
  :hover {
    cursor: pointer;
  }
`;

function Item({ todo, isToday }) {
  const todos = useSelector((store) => store.todos.todos);
  const todosID = useSelector((store) => store.todos.todosID);
  const dispatch = useDispatch();
  const [isModify, setIsModify] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [content, setContent] = useState(todo.content);
  const handleModifyState = () => {
    setIsModify(!isModify);
    setTitle(todo.title);
    setContent(todo.content);
  };

  const handleUpdateTodoContent = async () => {
    try {
      if (title === todo.title && content === todo.content) {
        return;
      }

      if (title.length === 0 || content.length === 0) {
        alert("내용을 입력해주세요.");
        return;
      }

      dispatch(
        __updateTodo({
          todosID,
          todos,
          todo: { ...todo, title, content },
        })
      );
    } finally {
      setIsModify(!isModify);
    }
  };

  const handleChangeTitle = ({ target: { value } }) => {
    setTitle(value);
  };
  const handleChangeContent = ({ target: { value } }) => {
    setContent(value);
  };

  const handleUpdateTodoState = () => {
    dispatch(
      __updateTodo({
        todosID,
        todos,
        todo: { ...todo, isDone: !todo.isDone },
      })
    );
  };

  const handleDeleteTodo = () => {
    dispatch(__deleteTodo({ todosID, todos, todoID: todo.id }));
  };
  return (
    <ItemBox>
      <DeleteBtnWrapper>
        <DeleteBtn onClick={handleDeleteTodo} show={isToday}>
          ✖
        </DeleteBtn>
      </DeleteBtnWrapper>
      {isModify ? (
        <>
          <div>제목</div>
          <input
            value={title}
            onChange={handleChangeTitle}
            type="text"
            placeholder={todo.title}
          />
          <div>내용</div>
          <input
            value={content}
            onChange={handleChangeContent}
            type="text"
            placeholder={todo.content}
          />
        </>
      ) : (
        <>
          <ItemTitle>{todo.title}</ItemTitle>
          {todo.content}
        </>
      )}
      <BtnWrapper>
        {isModify ? (
          <>
            <Btn
              onClick={handleUpdateTodoContent}
              show={isToday}
              bgColor="gray"
              disabled={title === todo.title && content === todo.content}
            >
              수정완료
            </Btn>
            <Btn onClick={handleModifyState} show={isToday} bgColor="tomato">
              수정취소
            </Btn>
          </>
        ) : (
          <>
            <Btn onClick={handleModifyState} show={isToday} bgColor="gray">
              수정하기
            </Btn>
            <Btn
              onClick={handleUpdateTodoState}
              show={isToday}
              bgColor={todo.isDone ? "tomato" : "cornflowerBlue"}
            >
              {todo.isDone ? "취소" : "완료"}
            </Btn>
          </>
        )}
      </BtnWrapper>
    </ItemBox>
  );
}

export default Item;
