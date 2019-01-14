var app = new Vue({
  el: "#app",
  data: {
    filters: ["All", "Todo", "Done"],
    activeFilter: "All",
    todos: [
      { id: 1, title: "Do this thing.", done: false },
      { id: 2, title: "Do another thing.", done: false },
      { id: 3, title: "Do many, many things!", done: false },
      { id: 4, title: "This thing is done.", done: true }
    ],
    nextId: 5,
    newTodoTitle: null
  },
  methods: {
    addTodo() {
      this.todos.push({
        id: this.nextId++,
        title: this.newTodoTitle,
        done: false
      });
    }
  },
  computed: {
    filteredTodos() {
      if (this.activeFilter === "All") {
        return this.todos;
      }

      if (this.activeFilter === "Todo") {
        return this.todos.filter(t => !t.done);
      }

      if (this.activeFilter === "Done") {
        return this.todos.filter(t => t.done);
      }
    }
  }
});
