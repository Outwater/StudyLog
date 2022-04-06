import Header from "./Header.js";
import TodoForm from "./TodoForm.js";
import TodoList from "./TodoList.js";
import TodoComments from "./TodoComments.js";
import { getItem, setItem } from "./storage.js";
import { request } from "./api.js";

const storedData = getItem("todos", []);

export default function App({ $target }) {
  this.state = {
    todos: [],
    selectedTodo: null,
    comments: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    todoList.setState(this.state.todos);
    todoComments.setState({
      ...todoComments.state,
      comments: this.state.comments,
      selectedTodo: this.state.selectedTodo,
    });
  };
  new Header({
    $target,
    text: "Simple Todo List",
  });

  new TodoForm({
    $target,
    onSubmit: (text) => {
      const todos = [
        ...this.state.todos,
        { id: this.state.todos.length + 1, text },
      ];
      this.setState({
        ...this.state,
        todos,
      });
      setItem("todos", JSON.stringify(todos));
    },
  });

  const todoList = new TodoList({
    $target,
    initialState: this.state.todos,
    onClick: (id) => {
      const selectedTodo = this.state.todos.find((todo) => todo.id === id);
      request(`https://kdt.roto.codes/comments?todo.id=${id}`, (comments) => {
        this.setState({
          ...this.state,
          selectedTodo,
          comments,
        });
      });
    },
  });

  const todoComments = new TodoComments({
    $target,
    initialState: {
      selectedTodo: null,
      comments: [],
    },
  });

  this.init = () => {
    if (storedData.length > 0) {
      this.setState({
        ...this.state,
        todos: storedData,
      });
      return;
    }
    request("https://kdt.roto.codes/todos", (todos) => {
      this.setState({
        ...this.state,
        todos,
      });
      setItem("todos", JSON.stringify(todos));
    });
  };

  this.init();
}
