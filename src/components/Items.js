import React from "react";
import styled from "styled-components";

import Item from "./Item";

const InfoBox = styled.div`
  width: 100%;
  height: 180px;
  line-height: 180px;
  text-align: center;
  color: #ccc;
`;

function Items({ type, isLoading, todos, isToday }) {
  if (isLoading) return <InfoBox>데이터를 불러오는 중입니다.</InfoBox>;

  return todos.length !== 0 ? (
    todos.map((v) => <Item key={v.id} todo={v} isToday={isToday()} />)
  ) : (
    <InfoBox>
      {type === "workings"
        ? "추가된 할일이 없습니다."
        : "완료된 일이 없습니다."}
    </InfoBox>
  );
}

export default Items;
