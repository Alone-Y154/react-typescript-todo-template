import { ReactNode, createContext, useContext, useState } from "react";

export type TodosProviderProps = {
  children: ReactNode; //so that it can be any type of JSX data
};

//created a type called Todo because inside an array I have all these different types
export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

//here is the TodoContext type with Todo[] as specified above
export type TodoContext = {
  todos: Todo[];
  handleAddTodo: (task: string) => void; // this fn will return nothing so void //call signature
  toggleTodoAsCompleted: (id: string) => void;
  handleDelete: (id: string) => void;
};

//createContext so that I can pass the data as a children to the components and also
export const todosContext = createContext<TodoContext | null>(null);

//TodoProvider the provider which provides the data so that the children can consumes the data and also it must be wrapped arround the App component in the main.tsx
export const TodoProvider = ({ children }: TodosProviderProps) => {
  const [todos, setTodo] = useState<Todo[]>(()=> {
    try{
        const newTodos = localStorage.getItem('todo') || "[]";
        return JSON.parse(newTodos) as Todo[]
    }catch {
        return []
    }
  });

  const handleAddTodo = (task: string) => {
    setTodo((prev) => {
      const newTodo: Todo[] = [
        {
          id: Math.random().toString(),
          task: task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];

      console.log("data: ", newTodo);
      return newTodo;
    });
  };

  const toggleTodoAsCompleted = (id: string) => {
    setTodo(prev => {
        const newTodos = prev.map(todo => {
            if(todo.id === id){
                return {...todo, completed: !todo.completed}
            } 
            return todo
        })
        localStorage.setItem('todo',JSON.stringify(newTodos))
        return newTodos
    })
  };

  const handleDelete = (id: string) => {
    setTodo(prev => {
        const newTodos = prev.filter(todo => {
            if(todo.id !== id){
                return todo
            } 
        })
        localStorage.setItem('todo',JSON.stringify(newTodos))
        return newTodos
    })
  };

  return (
    <todosContext.Provider
      value={{ todos, handleAddTodo, toggleTodoAsCompleted, handleDelete }}
    >
      {children}
    </todosContext.Provider>
  );
};

export const useTodos = () => {
  const todosConsumer = useContext(todosContext);
  if (!todosConsumer) {
    throw new Error("useTodos used outside of the provider");
  }
  return todosConsumer;
};
