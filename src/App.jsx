import {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import AddTaskForm from "./components/AddTaskForm.jsx";
import TasksList from "./components/TasksList.jsx";
import Search from "./components/Search.jsx"
import Filter from "./components/Filter.jsx";

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  
  const [allTask, setAllTask] = useState(tasks);
  const [activeTask, setActiveTask] = useState(tasks.filter(i => !i.complete));
  const [completetedTask, setCompletedTask] = useState(tasks.filter(i => i.complete));
 
  function handleAddTask(taskName){
    const newTask = {
      id: uuid(),
      name: taskName,
      date: Date.now(),
      complete: false,
    }
    setTasks([newTask, ...tasks]);
  }
  function toggleCompleted(id){
    setTasks(tasks.map(i => {
      return i.id == id ? {...i, complete: !i.complete} : i;
    }));
    
  }
  function deleteTask(id) {
    setTasks(tasks.filter(i => {
      return i.id != id;
    }));
  }
  function editTask(id, value) {
    setTasks(tasks.map(i => {
      return i.id == id ? {...i, name: value} : i
    }));
  }
  function handleFilter(e){
    setFilter(e.target.value);
  }
  function changeSearch(e) {
    const value = e.target.value.trim();
    setSearch(value);
  }
  
  function refreshFilteredTasks() {
    if(!search) {
      setAllTask(tasks);
      setActiveTask(tasks.filter(i => !i.complete));
      setCompletedTask(tasks.filter(i => i.complete));
    } else{
      const data = search.toLocaleLowerCase();
      setAllTask(tasks.filter(i => i.name.toLocaleLowerCase().includes(data)));
      setActiveTask(tasks.filter(i => !i.complete && i.name.toLocaleLowerCase().includes(data)));
      setCompletedTask(tasks.filter(i => i.complete && i.name.toLocaleLowerCase().includes(data)));
      
    }
  }
  function clearCompleted() {
    setTasks(tasks.filter(i => !i.complete))
  }
  function deleteAll() {
    if(confirm("Delete all?")) setTasks([]);
  }
  useEffect(() => {
    refreshFilteredTasks();
  }, [search])
  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshFilteredTasks()
  }, [tasks])
  
  return (
    <div className="container mx-auto">
      <h1 className="w-full text-center text-4xl text-slate-600 mt-6 font-semibold">Todo App</h1>
      <AddTaskForm handleSubmit={handleAddTask}/>
      {
      <div className="my-8 mx-auto bg-white w-[90%] max-w-[460px] p-3 rounded-md shadow">
        <div className="flex flex-col w-full gap-3 py-2">
          <div className="w-full">
            <span className="text-slate-500 text-sm">{(tasks.filter(i => i.complete)).length}/{tasks.length} Completed</span>
          </div>
          <Search value={search} onChange={changeSearch}/>
          <Filter defaultFilter={filter} handleFilter={handleFilter}/>
        </div>
        {
          filter == "all" &&
          <TasksList 
            tasks={allTask}
            toggleCompleted={toggleCompleted}
            handleDelete={deleteTask}
            handleEdit={(id, value) => editTask(id, value)}
          />
        }
        {
          filter == "active" &&
          <TasksList 
            tasks={activeTask}
            toggleCompleted={toggleCompleted}
            handleDelete={deleteTask}
            handleEdit={(id, value) => editTask(id, value)}
          />
        }
        {
          filter == "completed" &&
          <TasksList 
            tasks={completetedTask}
            toggleCompleted={toggleCompleted}
            handleDelete={deleteTask}
            handleEdit={(id, value) => editTask(id, value)}
          />
        }
        <div className="w-full p-2 flex justify-between">
          <button className="text-red-500 font-semibold text-sm hover:bg-red-50 p-0.5 rounded" onClick={clearCompleted}>Clear completed</button>
          <button className="text-red-500 font-semibold text-sm hover:bg-red-50 p-0.5 rounded" onClick={deleteAll}>Delete all</button>
        </div>
      </div>
      }
    </div>
  )
}

export default App
