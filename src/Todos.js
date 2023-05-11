import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, removeTodo } from "./actions";
import store from "./store";

function Todos() {
  const [taskText, setTaskText] = useState("");
  const dispatch = useDispatch();
  const state = store.getState();
  //console.log(state);

  function handleAddTask() {
    if (taskText.trim() === "") {
      return;
    }
    dispatch(addTodo(taskText));
    setTaskText("");
  }

  function handleToggleTask(task) {
    dispatch(toggleTodo(task.id));
  }

  function handleRemoveTask(task){
    dispatch(removeTodo(task.id));
  }

  const incomplete = useSelector((state) => state.incomplete);
  const complete = useSelector((state) => state.complete);

  return (
    <div>
      <h1 className="heading">Todos App</h1>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        id="task-input-bar"
      />
      <button onClick={handleAddTask} id="addTask-button">
        Add Task
      </button>

      <h2>Incomplete Tasks</h2>
      <ul className="incomplete-taskList">
        {incomplete.map((task) => (
          <li key={task.id} className="taskList-element">
            {task.text}{" "}
            <button onClick={()=>handleRemoveTask(task)} className="Remove-btn">Remove</button>
            <button onClick={() => handleToggleTask(task)} className="Complete-btn">Complete</button>
          </li>
        ))}
      </ul>

      <h2>Complete Tasks</h2>
      <ul className="completed-taskList">
        {complete.map((task) => (
          <li key={task.id} className="taskList-element">
            {task.text}{" "}
            <button onClick={()=>handleRemoveTask(task)} className="Remove-btn">Remove</button>
            <button onClick={() => handleToggleTask(task)} className="Incomplete-btn">Incomplete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
