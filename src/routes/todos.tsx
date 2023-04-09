import React from "react";

const Todo = ({ todo, index, completeTodo, removeTodo }) => (
  <div
    className={`flex justify-between items-center bg-gray-200 p-4 rounded-md my-2 cursor-pointer${
      todo.isCompleted ? " line-through text-gray-500" : ""
    }`}
    onClick={() => completeTodo(index)}
  >
    {todo.text}
    <button
      className="bg-transparent text-red-500 text-xl focus:outline-none"
      onClick={() => removeTodo(index)}
    >
      &times;
    </button>
  </div>
);

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-300"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add todo..."
      />
    </form>
  );
};

export function Component(){
  const [todos, setTodos] = React.useState([]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app min-h-screen bg-gray-100 flex flex-col items-center font-sans">
      <h1 className="text-4xl font-bold mt-16 mb-6">Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <div className="w-96">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
      </div>
    </div>
  );
};
