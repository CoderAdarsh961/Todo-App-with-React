import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showCompleted, setShowCompleted] = useState(true)  // Toggle visibility of completed tasks

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)

    let newTodo = todos.filter(item => item.id !== id);
    settodos(newTodo)
    savetoLS();
  }

  const handleDelete = (e, id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this todo?");
    
    if (isConfirmed) {
      let newTodo = todos.filter(item => item.id !== id);
      settodos(newTodo);
    }
    savetoLS();
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    settodo("")
    savetoLS();
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => item.id === id);

    let newTodo = [...todos];
    newTodo[index].iscompleted = !newTodo[index].iscompleted;
    settodos(newTodo)
    savetoLS();
  }

  // Handler to toggle completed tasks visibility
  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  }

  // Handler to delete all todos
  const handleDeleteAll = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete all todos?");
    if (isConfirmed) {
      settodos([]);
      localStorage.removeItem("todos"); // Clear from local storage as well
    }
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 py-5 rounded-xl bg-violet-100 min-h-[85vh] md:w-1/2">
        <div className="mx-5">
          <h1 className='font-bold text-xl text-center'>TaskDash - Manage your todos at one Place</h1>
          <div className="addtodo my-5 flex flex-col gap-4">
            <h2 className='font-bold text-xl'>Add a Todo</h2>
            <input onChange={handleChange} className="w-full rounded-lg px-5 py-2" value={todo} type="text" />
            <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 text-white p-3 py-1 font-bold text-sm rounded-md'>Save</button>

            {/* Button to toggle visibility of completed tasks */}
            <button onClick={toggleShowCompleted} className='bg-violet-800 hover:bg-violet-950 text-white p-3 py-1 font-bold text-sm rounded-md '>
              {showCompleted ? 'Hide Completed Tasks' : 'Show Completed Tasks'}
            </button>

            {/* Button to delete all tasks */}
            <button onClick={handleDeleteAll} className='bg-red-600 hover:bg-red-700 text-white p-3 py-1 font-bold text-sm rounded-md '>
              Delete All
            </button>
          </div>

          <h1 className='font-bold text-xl'>Your Todos</h1>
          
          <div className="todos">
            {todos.length === 0 ? (
              <p className='m-5 text-gray-600'>No todos to show</p> 
            ) : (
              todos
                .filter(item => showCompleted || !item.iscompleted)  // Filter to show or hide completed tasks
                .map(item => {
                  return (
                    <div key={item.id} className="todo flex justify-between md:w-1/2 my-3">
                      <div className='flex gap-5'>
                        <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} />
                        <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
                      </div>
                      <div className="buttons flex h-full">
                        <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 text-white p-3 py-1 font-bold text-sm rounded-md mx-1'><FaEdit /></button>
                        <button onClick={(e) => handleDelete(e, item.id)} className='bg-violet-800 hover:bg-violet-950 text-white p-3 py-1 font-bold text-sm rounded-md mx-1'><AiFillDelete /></button>
                      </div>
                    </div>
                  )
                })
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
