export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export const tasks: Task[] = [
  { id: "1", title: "Redux Toolkit", completed: false },
  { id: "2", title: "Redux Toolkit Query", completed: true },
];
