import React, { useEffect, useState } from 'react'
import TaskForm from './TaskForm'
import SearchBar from './SearchBar'
import TaskFilter from './TaskFilter'
import api from '../services/api'
import TaskItem from './TaskItem'

import { toast } from 'react-toastify'



const TaskManagement = () => {

  // state for managing the tasks filters toggeling etc
  const [tasks,setTasks]=useState([]);
  const [filterTask,setFilterTask]=useState([]);
  const [filter,setFilter]=useState('All')
  const [highlightedTask,setHighlightedTask]=useState(null)
  const [theme, setTheme] = useState("light");
  
  // fetching the data from the servers
  useEffect(()=>{
    api
    .get('/tasks')
    .then(({data})=>{
      setTasks(data)
      setFilterTask(data);
      })
      .catch(() => toast.error('Error in fetching the data'));
  }, []);

  // Function to toggle the completion status of a task
  const toggleTaskCompletion = (id) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    api
      .put(`/tasks/${id}`, updatedTask)
      .then(({ data }) => {
        const updatedTasks = tasks.map((task) => (task.id === id ? data : task));
        setTasks(updatedTasks);

        // Reapply the filter after updating completion status
        if (filter === 'All') {
          setFilterTask(updatedTasks);
        } else if (filter === 'Completed') {
          setFilterTask(updatedTasks.filter((task) => task.completed));
        } else if (filter === 'Pending') {
          setFilterTask(updatedTasks.filter((task) => !task.completed));
        }

        toast.success('Task completion updated! 🎉');
      })
      .catch(() => toast.error('Failed to update task completion.'));
  };


  // function to create the task
  let addTask=(text,priority)=>{
    // console.log(text,priority)
    let newtask={text,completed:false,priority}
    api
    .post('/tasks',newtask)
    .then(({data})=>{
      const updatedTasks = [...tasks, data];
      setTasks(updatedTasks);

      // Reapply the filter after adding the new task
      if (filter === 'All') {
        setFilterTask(updatedTasks);
      } else if (filter === 'Completed') {
        setFilterTask(updatedTasks.filter((task) => task.completed));
      } else if (filter === 'Pending') {
        setFilterTask(updatedTasks.filter((task) => !task.completed));
      }
      
      toast.success("newTask added to your List😁")
    })
    .catch(()=>toast.error('Failed to add the New task! 😮'))
  }
  // function to edit the task
  let editTask=({id,text,priority})=>{
    // console.log(id,text,priority)
    const editedTask={text,completed:false,priority}
    api
    .put(`/tasks/${id}`,editedTask)
    .then(({data})=>{
      const updatedTasks = tasks.map((task) => (task.id === id ? data : task));
        setTasks(updatedTasks);

        // Reapply the filter after editing the task
        if (filter === 'All') {
          setFilterTask(updatedTasks);
        } else if (filter === 'Completed') {
          setFilterTask(updatedTasks.filter((task) => task.completed));
        } else if (filter === 'Pending') {
          setFilterTask(updatedTasks.filter((task) => !task.completed));
        }

      toast.success('Task edited successfully! 😀')
    })
    .catch(()=>toast.error('Failed to edit the New task! 😮'))
  }
  // function to delete the task
  let deleteTask=(id)=>{
    // console.log(id)
    api
    .delete(`/tasks/${id}`)
    .then(()=>{
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);

      // Reapply the filter after deleting the task
      if (filter === 'All') {
        setFilterTask(updatedTasks);
      } else if (filter === 'Completed') {
        setFilterTask(updatedTasks.filter((task) => task.completed));
      } else if (filter === 'Pending') {
        setFilterTask(updatedTasks.filter((task) => !task.completed));
      }

      toast.success('Deleted successfully! 🗑️')
    })
    .catch(()=>toast.error('Failed to delete the task! 😮'))
  }
  // function to filter the task
  function handleFilter(filterType){
    setFilter(filterType)
    if(filterType === 'All'){
      setFilterTask(tasks)
    }else if (filterType === 'Completed'){
      setFilterTask(tasks.filter((task)=>task.completed))
    } else if (filterType === "Pending"){
      setFilterTask(tasks.filter((task)=>!task.completed))
    }
  }

  // function to search the task
  function handleSearch(query){
    if(query.trim()===''){
      setFilterTask(tasks)
    }else{
      setFilterTask(
        tasks.filter((task)=>
          task.text.toLowerCase().includes(query.toLowerCase())
      ))
    }
   }

  return (
    <div className='container my-2 p-2'>
      {/* search functionality start */}
      <div className='search-sunctionality'>
        <div className='row'>
          <div className="col-12 col-sm-8 col-md-8 col-lg-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="col-12 col-sm-4 col-md-4 col-lg-4">
            <TaskFilter filter={filter} onsetFilter={handleFilter}/>
          </div>
        </div>
      </div>
      {/* Search Functionality end */}

      {/* task form */}
      <TaskForm onaddTask={addTask}/>

      {/* displaying the tasks fetched from database and tasks added or edited or filtered */}
      <ul className='list-group  '>
        {filterTask.map((task)=>(
          <TaskItem
          key={task.id}
          task={task}
          oneditTask={editTask}
          ondeleteTask={deleteTask}
          isHighlighted={highlightedTask === task.id} // pass highlight state
          onClick={()=> setHighlightedTask(task.id)} // set highlight
          onToggleComplete={toggleTaskCompletion} // Toggle task completion

          />
        ))}
      </ul>
    </div>
  )
}

export default TaskManagement
