import { React, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import TodoItem from "./TodoItem";
import newData from "../pages/api/newData";

function Todo() {
  const [newTodo, setNewTodo] = useState("");
  const [concertDate, setConcertDate] = useState("")
 
  const [inputData, setInputData] = useState({});
  const requestParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: inputData }),
  };

  const [data, setData] = useState([]);
  async function fetchData() {
    const res = await fetch("../api/getData");
    const newData = await res.json();
    setData(newData);
  }
  useEffect(() => {
    fetchData();
  }, [newTodo]);

  const handleInput = (e) => {
    setNewTodo(e.target.value);
    setInputData({
      ...inputData,
      newTodo: e.target.value,
      concertDate: e.target.value
    });
  };
  const HandleSubmit = (e) => {
    console.log(newTodo);
    addTodoItem();
    setNewTodo("");
  };
  async function addTodoItem() {
    await fetch("../api/newData", requestParams)
      .then(() => newData())
      .catch((e) => console.log(e));
  }

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <h3>Add new todo</h3>
        <div>
          <label htmlFor="bands">Bands</label>
          <input
          id="bands"
            type="text"
            value={newTodo}
            onChange={(e) => handleInput(e)}
          ></input>
          <button onClick={() => HandleSubmit()}>
            Add Todo
          </button>
        </div>
      </div>
      <div>
        {data && data.map(todo => (
          <TodoItem key={todo.ref["@ref"].id} todo={todo} />
        ))}
        <TodoItem />
      </div>
    </div>
  );
}
export default Todo;