import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 20px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const ContentTitle = styled.h2`
  font-weight: 800;
`;

const ProgressBarWrapper = styled.div`
  position: relative;
  width: 80%;
  height: 30px;
  border: 1px solid black;
`;

const ProgressBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: ${(props) => props.width};
  height: 30px;
  background-color: tomato;
  transition: width 1s;
`;

const ProgressBarIcon = styled.span`
  position: absolute;
  right: ${(props) => props.position};
  top: -15px;
  font-size: 40px;
  transform: rotateY(180deg);
`;

const StateWrapper = styled.div`
  width: 18%;
  font-size: 20px;
  font-weight: 800;
  padding-left: 2%;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StateIcon = styled.span`
  display: ${(props) => props.display};
  font-size: ${(props) => props.fontSize};
  transition: font-size 1s;
`;

function Progressbar({ todos, isSmallSize }) {
  const donesCount = todos?.filter((v) => v.isDone === true).length;
  const donesPercentage = (donesCount / todos.length) * 100;
  return (
    <Wrapper>
      <ContentTitle>progress bar</ContentTitle>
      <ContentWrapper>
        <ProgressBarWrapper>
          <ProgressBar width={`${donesPercentage}%`}>
            <ProgressBarIcon
              position={donesPercentage === 0 ? "-40px" : "-15px"}
            >
              🏃
            </ProgressBarIcon>
          </ProgressBar>
        </ProgressBarWrapper>
        <StateWrapper>
          <StateIcon
            display={isSmallSize ? "none" : ""}
            fontSize={
              donesPercentage > 50
                ? donesPercentage === 100
                  ? "40px"
                  : "20px"
                : "16px"
            }
          >
            🔥
          </StateIcon>
          <span>
            {donesCount}/{todos.length}
          </span>
        </StateWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

export default Progressbar;
