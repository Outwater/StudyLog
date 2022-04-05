function App({ $target, initialState }) {
  new Header({
    $target,
    text: "Simple Todo List",
  });
  new TodoForm({
    $target,
    onSubmit: (text) => {
      todoList.setState([...todoList.state, { text }]);
    },
  });

  const todoList = new TodoList({
    $target,
    initialState,
  });
}
