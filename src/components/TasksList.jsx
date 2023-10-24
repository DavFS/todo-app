import {useState, useEffect} from "react"
import Search from "./Search.jsx";
import Filter from "./Filter.jsx";
import Task from "./Task.jsx";

function TasksList(props) {
  const {tasks, toggleCompleted, handleDelete, handleEdit} = props;
  
  return(
    <div className="h-[440px] w-full flex items-start mt-2 overflow-y-auto border-y border-slate-400">
    {tasks.length ?
    <ul className="w-full list-none flex flex-col gap-[1px] p-0 bg-slate-400">
      {tasks.map(i => {
        return (
          <Task
            key={i.id}
            toggleCompleted={id => toggleCompleted(id)}
            deleteTask={handleDelete}
            editTask={(id, value) => handleEdit(id, value)}
            task={i}
          />
        )
      })}
    </ul> :
    <h1 className="text-5xl text-center m-auto text-slate-400">Empety</h1>
    }
    </div>
  )
}

export default TasksList;