
import { useState } from 'react'

const TaskForm = ({onaddTask}) => {
    let [newTask,setNewTask]=useState('')
    let [priority,setPriority]=useState('Medium')
    
    // function to handle the Task
    function handleTask(){
        if(newTask.trim()!==''){
            onaddTask(newTask,priority)
            setNewTask('')
            setPriority('Medium')
        }
    }
    // console.log(newTask)

  return (
    <div className='container Task-form-container my-2'>
        {/* Task Form start */}
        <div className='row'>
            {/* adding items */}
            <div className="col-sm-6 col-md-8 col-lg-8">
                <input type="text" 
                class="form-control" 
                placeholder="add items" 
                value={newTask} // attaching the Form value
                onChange={(e)=>setNewTask(e.target.value)}
                />
            </div>
            {/* periority medium,high,low */}
            <div className="col-sm-3 col-md-2 col-lg-2">
                <select class="form-select" aria-label="Default select example" 
                value={priority} onChange={(e)=>setPriority(e.target.value)}>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                    <option value="High" selected>High</option>
                </select>
            </div>
            {/* add button */}
            <div className="col-sm-3 col-md-2 col-lg-2">
                <button className='btn btn-success' onClick={()=>handleTask()}>Add Task</button>
            </div>
            {/* Task Form end */}
        </div>
    </div>
  )
}

export default TaskForm
