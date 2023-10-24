import {useState} from "react";

function Task(props){
  const {task, toggleCompleted, deleteTask, editTask} = props;
  //const {name, date, complete, id} = task;
  const datetime = new Date(task.date);
  const [editMode, setEditMode] = useState(false);
  
  function handleCompleted(){
    toggleCompleted(task.id)
  }
  function handleDelete(){
    deleteTask(task.id);
  }
  function toggleEditmode() {
    editMode == false ? setEditMode(true) : setEditMode(false);
  }
  function handleCancel(){
    setEditMode(false);
  }
  function handleDone(e) {
    e.preventDefault();
    const value = e.target[0].value.trim();
    if(value) editTask(task.id, value);
    handleCancel()
  }
  return (
    <li className="w-full flex items-center py-1 bg-white">
    {!editMode ?
     <>
      <div className="w-[15%] h-full flex items-center justify-center">
        <input type="checkbox" defaultChecked={task.complete} id={task.id} onChange={handleCompleted}/>
      </div>
      <div className="w-full h-full flex flex-col">
        <label htmlFor={task.id} className={`${task.complete ? "line-through text-slate-500" : ""}`}>{task.name}</label>
        <span className="text-xs text-slate-400">
            {datetime.toLocaleString("id-ID")}
          </span>
      </div>
      <div className="w-[35%] h-full flex justify-center items-center gap-2">
        <EditButton onClick={toggleEditmode} />
        <DeleteButton onClick={handleDelete} />
      </div>
      </> :
      <>
      <form className="w-full py-1 px-2 flex gap-1" onSubmit={e => handleDone(e)}>
        <input type="text" defaultValue={task.name} className="border-none outline-none w-full" autoFocus={true} placeholder="Input new task name" />
        <div className="w-[30%] flex gap-1">
          <button type="submit" className="text-slate-500 hover:bg-slate-200 rounded p-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
            </svg>
          </button>
          <button className="text-slate-500 hover:bg-slate-200 rounded p-1.5" onClick={handleCancel}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>
      </form>
      </>
    }
    </li>
  )
}

function EditButton({onClick=()=>{}}){
  return (
    <button onClick={e => onClick(e)} className="rounded p-1.5 text-sm shadow-sm text-white bg-green-500 hover:bg-green-600 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
      </svg>
    </button>
  )
}
function DeleteButton({onClick=()=>{}}) {
  return (
    <button onClick={e => onClick(e)} className="rounded p-1.5 text-sm shadow-sm text-white bg-red-500 hover:bg-red-600 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
      </svg>
    </button>
  )
}

export default Task;