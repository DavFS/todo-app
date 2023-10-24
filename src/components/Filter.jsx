function Filter(props) {
  const {handleFilter = (e)=>{}, defaultFilter} = props;
  
  return (
    <form className="flex gap-3" onChange={e => handleFilter(e)}>
      <div>
        <input type="radio" name="filter" id="all" className="hidden peer" defaultChecked={defaultFilter=="all"} value="all" />
        <label htmlFor="all" className="border border-blue-600 w-16 h-8 text-center rounded-full text-center flex justify-center items-center text-blue-600 peer-checked:bg-blue-600 peer-checked:text-white">All</label>
      </div>
      <div>
        <input type="radio" name="filter" id="active" className="hidden peer" value="active" defaultChecked={defaultFilter=="active"} />
        <label htmlFor="active" className="border border-blue-600 w-16 h-8 text-center rounded-full text-center flex justify-center items-center text-blue-600 peer-checked:bg-blue-600 peer-checked:text-white">Active</label>
      </div>
      <div>
        <input type="radio" name="filter" id="completed" className="hidden peer" value="completed" defaultChecked={defaultFilter=="completed"} />
        <label htmlFor="completed" className="border border-blue-600 w-24 h-8 text-center rounded-full text-center flex justify-center items-center text-blue-600 peer-checked:bg-blue-600 peer-checked:text-white">Completed</label>
      </div>
    </form>
  )
}

export default Filter;