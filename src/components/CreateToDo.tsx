import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";

interface IForm {
  toDo: string;
}

const Input = styled.input`
  width: 250px;
  height: 35px;
  margin-right: 10px;
  padding-left: 10px;
`;

const AddBtn = styled.button`
  width: 40px;
  height: 35px;
  background-color: white;
  border: 0;
  border-radius: 2px;
  border: 1px solid lightslategrey;
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "10px" }}>
      <Input
        {...register("toDo", {
          required: "할 일 항목은 필수항목입니다",
        })}
        placeholder="할 일을 작성하세요"
      />
      <AddBtn>추가</AddBtn>
    </form>
  );
}

export default CreateToDo;
