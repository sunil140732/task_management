import {useState,useEffect} from 'react'

const TaskItem = ({task,oneditTask,ondeleteTask, isHighlighted, onClick,onToggleComplete}) => {
  const [isEditable,setIsEdiTable]=useState(false)
  let [oldTask,setOldTask]=useState(task.text)
  let [priority,setPriority]=useState(task.priority)


  function handlesave(){
    oneditTask({id:task.id,text:oldTask,priority:priority})
    setIsEdiTable(false)
  }

  

  return (
    <>
      <li 
        className={`list-group-item p-1  my-2 ${
        isHighlighted ? "bg-warning":''
        } `} 
        onClick={onClick}
      >
        {
          isEditable?(
          <>
            <div className='row'>
              {/* adding items */}
              <div className="col-sm-6 col-md-8 col-lg-8">
                  <input type="text" 
                  class="form-control" 
                  placeholder="add items" 
                  value={oldTask} // attaching the Form value
                  onChange={(e)=>setOldTask(e.target.value)}
                  />
              </div>
              {/* periority medium,high,low */}
              <div className="col-sm-3 col-md-2 col-lg-2">
                  <select class="form-select" 
                  value={priority} onChange={(e)=>setPriority(e.target.value)}>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                      <option value="High" selected>High</option>
                  </select>
              </div>
              {/* add button */}
              <div className="col-sm-3 col-md-2 col-lg-2">
                  <button className='btn btn-success mx-2' onClick={handlesave}>Save</button>
                  <button className='btn btn-danger' onClick={()=>setIsEdiTable(false)}>cancel</button>
              </div>
              {/* Task Form end */}
            </div>
          </>
          ):(
            <div className='d-flex justify-content-between align-items-center'>
              <p>{task.text}</p>
              
              {/* container for edit and delete functionalities */}
              <div className='edit-feature'>
                <span className='text-success'>{task.priority}</span>
                <button className='btn btn-outline-success mx-2' onClick={()=> setIsEdiTable(true)} disabled={task.completed}>✒</button>
                <button className='btn btn-outline-danger mx-2' onClick={()=>ondeleteTask(task.id)}>⛔</button>
                {/* Add a checkbox to mark as completed */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task.id)} // Call the function to mark as completed
                />
              </div>
            </div>
          )
        }
      </li>
    </>
  )
}

export default TaskItem
