import Task from './Task'

const Tasks = ( {Tasks, onDelete, toggleReminder}) =>{
   
    return (
        <div>
            {Tasks.map((task, index) => (
            <Task key={index} 
            task={task}
            onDelete={onDelete} 
            toggleReminder={toggleReminder}
            />
            ))}
        </div>
    )
}

export default Tasks;
