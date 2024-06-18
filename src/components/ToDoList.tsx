import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useForm } from "react-hook-form";
import { isDarkAtom } from "../atoms";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 30px;
  margin-top: 1vh;
`;

const Title = styled.h1`
  margin-right: auto;
  font-weight: 200;
  font-size: xx-large;
`;

const CategoryAddBtn = styled(motion.button)`
  font-size: 30px;
  font-weight: bold;
  margin-left: 3px;
  background-color: transparent;
  border: 0;
  color: ${(props) => props.theme.accentColor};
`;

const Input = styled(motion.input)`
  background-color: transparent;
  border: 1px solid white;
  border-radius: 3px;
  margin-right: 3px;
  padding: 7px;
  color: ${(props) => props.theme.textColor};
  width: 200px;
`;

const Select = styled.select`
  width: 150px;
  height: 35px;
  padding: 3px;
  margin: 15px 0;
  option {
    padding: 3px 0px;
    height: 30px;
  }
`;

const Content = styled.div`
  margin-left: 5vw;
`;

const ToggleDiv = styled(motion.div)`
  width: 65px;
  height: 35px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const ToggleBtn = styled(motion.div)`
  width: 25px;
  height: 25px;
  border-radius: 20px;
`;

interface IForm {
  name: string;
}

function ToDoList() {
  // dark mode toggle
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setDarkAtom((prev) => !prev);
    setToggle((toggle) => !toggle);
  };

  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [showInput, setShowInput] = useState(false);
  const inputAnimation = useAnimation();
  const { register, handleSubmit, setValue } = useForm<IForm>({
    defaultValues: {
      name: "",
    },
  });

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

  const onSubmit = (data: IForm) => {
    setCategories((oldCategories) => [...oldCategories, data.name]);
    setValue("name", "");
  };

  return (
    <div>
      <Header>
        <Title>To Dos</Title>
        <div>
          <form style={{ display: "flex" }} onSubmit={handleSubmit(onSubmit)}>
            <Input
              initial={{ scaleX: 0 }}
              animate={inputAnimation}
              transition={{ type: "linear" }}
              placeholder="추가할 카테고리 이름을 작성하세요"
              {...register("name", {
                required: "Enter a category name",
                maxLength: {
                  value: 50,
                  message: "Category name cannot exceed 50 characters.",
                },
                validate: {
                  noEmpty: (data) =>
                    data.trim() ? true : "Please enter a category name.",
                  duplicated: (data) =>
                    category.includes(data.trim())
                      ? "That category already exists."
                      : true,
                },
              })}
            />
            <CategoryAddBtn
              onClick={onClick}
              type="submit"
              animate={{ scale: 1 }}
              initial={{ scale: 1 }}
              transition={{ type: "linear" }}
            >
              +
            </CategoryAddBtn>
            {toggle ? (
              <ToggleDiv
                onClick={handleToggle}
                style={{
                  backgroundColor: "white",
                  border: "1px solid lightblue",
                }}
              >
                <ToggleBtn
                  layoutId="toggleBtn"
                  style={{ marginLeft: 35, backgroundColor: "lightblue" }}
                />
              </ToggleDiv>
            ) : (
              <ToggleDiv
                onClick={handleToggle}
                style={{ backgroundColor: "lightblue" }}
              >
                <ToggleBtn
                  layoutId="toggleBtn"
                  style={{ marginLeft: 5, backgroundColor: "white" }}
                />
              </ToggleDiv>
            )}
          </form>
        </div>
      </Header>
      <hr />
      <Content>
        <Select value={category} onInput={onInput}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <CreateToDo />
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Content>
    </div>
  );
}

export default ToDoList;
