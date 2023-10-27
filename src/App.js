import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [active, setActive] = useState(0);

  const [todos, setTodos] = useState([]);

  const [details, setDetails] = useState("");

  useEffect(() => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      setTodos(JSON.parse(todos));
    }
  }, []);

  const handleActive = (index) => {
    setActive(index);
  };

  const handleAdd = () => {
    setTodos([
      ...todos,
      {
        active: false,
        details: details,
      },
    ]);
    saveTodos();
    setDetails("");
  };

  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const renderTodos = () => {
    const filteredTodos = todos.filter((todo) => {
      if (active === 0) {
        return true;
      } else if (active === 1) {
        return !todo.active;
      } else {
        return todo.active;
      }
    });

    return filteredTodos.map((todo, index) => {
      return (
        <div
          key={todo.details}
          className={"flex items-center w-full px-2 py-1"}
        >
          <input
            type={"checkbox"}
            checked={todo.active}
            className={
              "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600"
            }
            onChange={() => {
              const newTodos = [...todos];
              newTodos[index].active = !newTodos[index].active;
              setTodos(newTodos);
              saveTodos();
            }}
          />
          <p
            className={`"text-gray-800 mx-4 mr-2
            ${todo.active ? "line-through" : ""}`}
          >
            {todo.details}
          </p>
        </div>
      );
    });
  };

  return (
    <div className="App">
      <h1 className={"my-2 text-4xl text-center font-bold text-gray-800"}>
        &#35;todo
      </h1>
      <div className={"flex items-center w-full flex-col lg:p-0 p-8"}>
        <div className={"flex justify-center lg:w-1/2 w-full"}>
          <div
            className={` px-2 w-1/3 text-center transition duration-200 ease-in-out ${
              active === 0
                ? "border-b-2 border-blue-500"
                : "border-b-2 border-gray-300"
            }`}
            onClick={() => handleActive(0)}
          >
            <p>All</p>
          </div>
          <div
            className={` px-2 w-1/3 text-center transition duration-200 ease-in-out ${
              active === 1
                ? "border-b-2 border-blue-500"
                : "border-b-2 border-gray-300"
            }`}
            onClick={() => handleActive(1)}
          >
            <p>Active</p>
          </div>
          <div
            className={` px-2 w-1/3 text-center transition duration-200 ease-in-out ${
              active === 2
                ? "border-b-2 border-blue-500"
                : "border-b-2 border-gray-300"
            }`}
            onClick={() => handleActive(2)}
          >
            <p>Completed</p>
          </div>
        </div>
        <div className={"flex justify-center lg:w-1/2 w-full my-4"}>
          <div className={"flex flex-col w-2/3"}>
            <input
              className={
                "w-full px-2 py-1 border-2 border-gray-300 rounded-md "
              }
              placeholder={"Add details"}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div className={"flex flex-col w-1/3 px-4"}>
            <button
              className={
                "px-2 py-1 rounded-xl w-full bg-blue-500 text-white h-full hover:bg-blue-600 transition duration-200 ease-in-out"
              }
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>
        <div className={"flex flex-col lg:w-1/2 w-full "}>{renderTodos()}</div>
      </div>
    </div>
  );
}

export default App;
