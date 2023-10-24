import {useState} from "react";



function AddTaskForm({handleSubmit}) {
  const [taskName, setTaskName] = useState("");
  
  function onSubmit(e) {
    e.preventDefault();
    if(taskName.trim()) handleSubmit(taskName.trim());
    setTaskName("");
  }
  
  return (
    <form className="bg-white shadow-md px-2.5 py-2 rounded-lg flex w-[90%] max-w-[460px] mx-auto mt-10 justify-between gap-2" onSubmit={e => onSubmit(e)}>
      <div className="flex items-center justify-center text-slate-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </div>
      <input type="text" placeholder="Add a new task" id="taskName" className="outline-none w-full pr-2 text-slate-700 text-sm font-semibold text-slate-600 placeholder:text-slate-300" value={taskName} onChange={e => setTaskName(e.target.value)}/>
      <button className="py-1.5 px-2.5 text-white text-sm rounded bg-red-500 hover:bg-red-700" type="submit">Add</button>
    </form>
  )
}

export default AddTaskForm;