import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput  from "../hooks/useInput";
import styled from "styled-components";
import { __deleteTodo, __updateTodo } from "../redux/modules/TodosSlice";

const ItemBox = styled.div`
  width: 16%;
  height: 180px;
  padding: 20px 1%;
  float: left;
  flex: 0 0 auto;
  border: 3px solid cornflowerblue;
  border-radius: 20px;
`;

const ItemContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
`;

const ItemTitle = styled.h2`
  margin: 0;
  padding-bottom: 10px;
  font-weight: 800;
`;

const ItemInputWrapper = styled.div`
  padding: 10px 0;
`;

const Label = styled.span`
  width: 5%;
  font-size: 16px;
  font-weight: 600;
`;

const ItemInput = styled.input`
  width: 85%;
  height: 20px;
  float: right;
`;

const BtnWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
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
  const [title, onChangeTitle, resetTitle] = useInput(todo.title, "title");
  const [content, onChangeContent, resetContent] = useInput(todo.content, "content");
  const handleModifyState = () => {
    setIsModify(!isModify);
    resetTitle();
    resetContent();
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

  const handleUpdateTodoState = () => {
    dispatch(
      __updateTodo({
        todosID,
        todos,
        todo: { ...todo, isDone: !todo.isDone, editHistory: Date.now() },
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
      <ItemContentWrapper>
        {isModify ? (
          <div>
            <ItemInputWrapper>
              <Label>제목</Label>
              <ItemInput
                value={title}
                onChange={onChangeTitle}
                type="text"
                placeholder={todo.title}
              />
            </ItemInputWrapper>
            <ItemInputWrapper>
              <Label>내용</Label>
              <ItemInput
                value={content}
                onChange={onChangeContent}
                type="text"
                placeholder={todo.content}
              />
            </ItemInputWrapper>
          </div>
        ) : (
          <div>
            <ItemTitle>{todo.title}</ItemTitle>
            {todo.content}
          </div>
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
      </ItemContentWrapper>
    </ItemBox>
  );
}

export default Item;
