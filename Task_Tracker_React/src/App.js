import Header from './component/Header'
import Footer from './component/Footer'
import About from './component/About'
import Tasks from './component/Tasks'
import { useState , useEffect } from 'react'
import AddTask from './component/AddTask'
import { BrowserRouter as Router, Route} from 'react-router-dom'

function App() {

  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, settasks] = useState([])

  useEffect(() => {
    const getTask = async () =>{
      const tasksFromServer = await fetchTasks();
      settasks(tasksFromServer)
    }
    getTask();
  },[])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await  res.json()
    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await  res.json()
    return data
  }

const deleteTask = async (id) =>{

  await fetch(`http://localhost:5000/tasks/${id}`,{
  method : 'DELETE'
  })
  settasks(tasks.filter((task) => task.id !== id))
}

const toggleReminder = async (id) => {

  const taskToToggle = await fetchTask(id)
  const updatedTask = {...taskToToggle, reminder: ! taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`,{
    method : 'PUT',
    headers: {
      'Content-type' : 'application/json'
    },
    body: JSON.stringify(updatedTask)
  })

  const data = await res.json()

  settasks(tasks.map((task) => task.id === id ? {
    ...task, reminder: data.reminder
  } : task))
}

const addTask = async (task) => {

  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST' ,
    headers: {
      'Content-type' : 'application/json',
    },
    body: JSON.stringify(task),
  })

  const data = await  res.json()

  settasks([...tasks, data])

}

  return (
    <Router>
      <div className='container'>

        <Header onAdd={ () => 
          setShowAddTask(!showAddTask)} 
          showAdd={showAddTask}/>
       
        <Route 
        path='/' 
        exact 
        render={(props) =>(
           <>
            {showAddTask &&  <AddTask 
            onAdd={addTask}/>}
            {tasks.length > 0 ?(
            <Tasks 
               Tasks={tasks}
               onDelete={deleteTask}
              toggleReminder={toggleReminder}
            />
            ) : ( 
              'No Tasks to Show'
              )}
           </>
          )} 
          />
        <Route path='/about' component={About} />
        <Footer/>
      </div>
    </Router>
  );
}

/*
class App extends React.Component{
  render(){
    return <h1>Hello from a class</h1>
  }
}*/

export default App;
