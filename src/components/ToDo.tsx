import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, categoriesState, toDoState } from "../atoms";
import styled from "styled-components";

const List = styled.li`
  padding: 10px;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 5px;
  width: 60px;
  height: 25px;
  border: 0;
  margin-left: 10px;
  font-family: "IBM Plex Sans KR";
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const changeCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
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
    <List>
      <span>{text}</span>
      {categories
        .filter((data) => data !== category)
        .map((data) => (
          <Button key={data} name={data} onClick={changeCategory}>
            {data}
          </Button>
        ))}
    </List>
  );
}

export default ToDo;
