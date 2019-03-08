import React, { Component } from "react";

import AppHeader from "../AppHeader";
import SearchPanel from "../SearchPanel";
import TodoList from "../TodoList";
import ItemStatusFilter from "../ItemStatusFilter";
import ItemAddForm from "../ItemAddForm";

import "./App.css";

class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome Apps"),
      this.createTodoItem("Have Lunch")
    ],
    term: "",
    filter: "all"
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex(el => el.id === id);

      const newArray = [
        ...todoData.slice(0, index),
        ...todoData.slice(index + 1)
      ];

      return {
        todoData: newArray
      };
    });
  };

  addItem = text => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex(el => el.id === id);

    const oldItem = arr[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  }

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  };

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  filter(items, filter) {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter(item => !item.done);
      case "done":
        return items.filter(item => item.done);
      default:
        return items;
    }
  }

  onSearchChange = term => {
    this.setState({
      term
    });
  };

  onFilterChange = filter => {
    this.setState({
      filter
    });
  };

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter(el => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}

export default App;
