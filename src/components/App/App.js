import React from "react";
import ReactDOM from "react-dom";

import AppHeader from "../AppHeader";
import SearchPanel from "../SearchPanel";
import TodoList from "../TodoList";
import ItemStatusFilter from "../ItemStatusFilter";

import "./App.css";

const App = () => {
  const todoData = [
    { label: "Drink Coffee", important: false, id: 1 },
    { label: "Make Awesome Apps", important: true, id: 2 },
    { label: "Have Lunch", important: false, id: 3 }
  ];

  return (
    <div className="todo-app">
      <AppHeader toDo={1} done={3} />
      <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
      </div>

      <TodoList todos={todoData} />
    </div>
  );
};

export default App;
