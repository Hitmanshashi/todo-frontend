import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";
import { NotificationContainer } from 'react-notifications';

function App() {
  const [toDo, setToDo] = useState([])
  const [text, setText] = useState("")
  const [isEdit, setIsEditing] = useState(false)
  const [toDoId, setToDoId] = useState("")
  const [reminder, setReminder] = useState("") // Add a state for reminder time

  useEffect(() => {
    getAllToDo(setToDo)
  }, [])

  const updateMode = (_id, text, reminder) => {
    setIsEditing(true)
    setText(text)
    setToDoId(_id)
    setReminder(reminder) // Set the reminder time
  }

  const handleDelete = (_id) => {
    deleteToDo(_id, setToDo)
  }

  const handleAddToDo = () => {
    if (isEdit) {
      updateToDo(toDoId, text, reminder, setToDo, setText, setIsEditing)
    } else {
      addToDo(text, reminder, setText, setToDo)
    }
  }

  return (
    <div className="App">
      <NotificationContainer />
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input 
          type="text" 
          className="input-field"
          placeholder="Enter a task"
          value={text}
          onChange={(e) => setText(e.target.value)}
           />
          <input 
          type="datetime-local" 
          className="reminder-field"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
          placeholder="Enter reminder time"
           />
          <div className="add" 
          onClick={handleAddToDo}>
            {isEdit ? "Edit" : "Add"}
          </div>
        </div>
        <div className="list">
          {Array.isArray(toDo) && toDo.map((item) => <ToDo 
          key={item._id} 
          text={item.text} 
          reminder={item.reminder} // Pass the reminder time to the ToDo component
          updateMode={() => updateMode(item._id, item.text, item.reminder)}
          deleteToDo={() => handleDelete(item._id)}/>)}
        </div>
      </div>
    </div>
  );
}

export default App;