import TodoList from "./TodoList";
import {useState, useRef, useEffect} from "react";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([{id: 1, name: "Todo 1", complete: false}]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);
  
  function toggleTodo(id) {
    const newTodos = [...todos];

    const todo = newTodos.find(todo => todo.id===id);
    todo.complete = !todo.complete
    setTodos(newTodos);
  }

  function addTodo() {
    const name = todoNameRef.current.value
    if(name==="") return

    setTodos(prevTodos => {
      return [...prevTodos, {id: prevTodos.length+1, name:name, complete:false}]
    })

    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo=>!todo.complete);
    setTodos(newTodos);
  }

  return (
	<>
	  <TodoList todos={todos} toggleTodo={toggleTodo}/>
	  <input ref={todoNameRef} type="text"/>
	  <button onClick={addTodo}>Add</button>
	  <button onClick={handleClearTodos}>Clear</button>
	  <div>{todos.filter(todo=>!todo.complete).length} remaining</div>
	</>
  );
}

export default App;
