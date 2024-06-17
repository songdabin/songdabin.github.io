import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 30px;
`;

const Title = styled.h1`
  margin-right: auto;
`;

const CategoryAddBtn = styled(motion.div)`
  font-size: 30px;
  font-weight: bold;
  margin-left: 3px;
`;

const Input = styled(motion.input)`
  background-color: transparent;
  border: 1px solid white;
  border-radius: 3px;
  margin-right: 3px;
  padding: 7px;
  color: white;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [showInput, setShowInput] = useState(false);
  const inputAnimation = useAnimation();

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const onClick = () => {
    if (showInput) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setShowInput((prev) => !prev);
  };

  return (
    <div>
      <Header>
        <Title>To Dos</Title>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Input
            initial={{ scaleX: 0 }}
            animate={inputAnimation}
            transition={{ type: "linear" }}
            placeholder="Create a new category"
          />

          <CategoryAddBtn
            onClick={onClick}
            animate={{ scale: 1 }}
            initial={{ scale: 1 }}
            transition={{ type: "linear" }}
          >
            +
          </CategoryAddBtn>
        </div>
      </Header>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={"TO_DO"}>To Do</option>
        <option value={"DOING"}>Doing</option>
        <option value={"DONE"}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
