import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const baseUrl = "https://todo-app-backend-7muy.onrender.com"

const displayNotification = (message, type) => { 
  NotificationManager[type](message, '', 6000);
};

const getAllToDo = (setToDo) => {
  axios
  .get(`${baseUrl}/home`)
  .then(({ data }) => {
    console.log('data --->', data);
    setToDo(data);
  });
};

const addToDo = (text, reminder, setText, setToDo) => {
  axios
  .post(`${baseUrl}/save`, {text, reminder})
  .then((data) => {
    console.log('data --->', data);
    setText("")
    displayNotification('Task added successfully!', 'success');
    getAllToDo(setToDo)

    // Trigger the reminder at the specified time
    const reminderTime = new Date(reminder).getTime()
    const currentTime = new Date().getTime()
    const timeDiff = reminderTime - currentTime
    setTimeout(() => {
      displayNotification(`Reminder: ${text}`, 'info')
    }, timeDiff)
  })
  .catch((err) => {
    console.log(err);
    displayNotification('Error adding task!', 'error');
  })
}

const updateToDo = (toDoId, text, reminder, setToDo, setText, setIsEditing) => {
  axios
  .post(`${baseUrl}/update`, {_id:toDoId, text, reminder})
  .then((data) => {
    setText("")
    setIsEditing(false)
    displayNotification('Task updated successfully!', 'success');
    getAllToDo(setToDo)
  })
  .catch((err) => {
    console.log(err);
    displayNotification('Error updating task!', 'error');
  })
}

const deleteToDo = (_id, setToDo) => {
  axios
  .post(`${baseUrl}/delete`, {_id})
  .then((data) => {
    console.log('data --->', data);
    displayNotification('Task deleted successfully!', 'success');
    getAllToDo(setToDo)
  })
  .catch((err) => {
    console.log(err);
    displayNotification('Error deleting task!', 'error');
  })
}

export { getAllToDo, addToDo, updateToDo, deleteToDo };
