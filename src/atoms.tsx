import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export interface ICategory {
  name: string;
  id: number;
}

const { persistAtom } = recoilPersist({
  key: "toDoStorage",
  storage: localStorage,
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: ["TO DO", "DOING", "DONE"],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<string>({
  key: "category",
  default: "TO DO",
});

export interface ITrello {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITrello[];
}

export const trelloState = atom<IToDoState>({
  key: "trello",
  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
