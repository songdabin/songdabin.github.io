import React from "react";
import { useSetRecoilState } from "recoil";
import { categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== categories[0] && (
        <button name={categories[0]} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== categories[1] && (
        <button name={categories[1]} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== categories[2] && (
        <button name={categories[2]} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
