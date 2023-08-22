import {React, useState} from 'react' // لاظهار البيانات 
import TodoForm from './Components/TodoForm'
import Todo from './Components/Todo'
import './App.css'


const App = () => {
  let [todos, setTodos]=useState([]) // step2) (let) cuz todos is an empty array (has object inside to passed from props) to know if it completes or not
 
  const [todoToShow, setTodoToShow]=useState("all")

  const [toggleAllComplete, setToggleAllComplete]=useState(true)


  const addTodo=(todo)=>{ // todoformاوبجكت بنضيفه بالكومبوننت 
    setTodos([todo, ...todos]); //added to state => todo from addTodo from onSubmit from TodoForm from input
  }

  const handleDelete=(id)=>{
    setTodos(todos.filter((todo)=>todo.id !== id))
  }

  const updateTodoToShow=(s)=>{
    setTodoToShow(s);
  }

  // delete complete and return not complete yet
  const removeAllTodosThatAreComplete=()=>{
    setTodos(todos.filter((todo)=> !todo.complete));
  }

  // toggle: true=> false, false=>true
  const toggleComplete=(id)=>{
    setTodos(todos.map((todo)=> {
      if(todo.id === id){
        return{
          ...todo , // ليحافظ على البيانات داخلها
          complete: !todo.complete
      }
      } else{
        return todo
      }
    })
    )}

  if(todoToShow === "active"){
    todos=todos.filter((todo)=> !todo.complete) // يرجع الغير مكتملة
  } else if(todoToShow === "complete"){
    todos= todos.filter((todo)=> todo.complete) // يرجع المكتملة
  }

  return (
    <div className='container'>
      <TodoForm onSubmit={addTodo} />
      {
        todos.map((todo)=>(
          <Todo
           key={todo.id} 
           todo={todo} 
           onDelete={()=> handleDelete(todo.id)}
           toggleComplete ={()=>toggleComplete(todo.id)} 
           />
        ))
      }

      <div>
        <button className='update-btn btn' onClick={()=> updateTodoToShow("all")}>All</button>
        <button className='update-btn btn' onClick={()=> updateTodoToShow("active")}>Active</button>
        <button className='update-btn btn' onClick={()=> updateTodoToShow("complete")}>Complete</button>
        {/* then handle using useState */}
      </div>

      {todos.some((todo)=>todo.complete)? ( <button className='all-btn btn' 
        onClick={removeAllTodosThatAreComplete}>
        Remove all complete todos</button>) : null}
     
      <button className='all-btn btn' onClick={()=>{
        setTodos(
          todos.map((todo)=>({
            ...todo,
            complete: toggleAllComplete
          }))
        );
        setToggleAllComplete(toggleAllComplete)
      }}
      >
        Toggle all complete: {`${toggleAllComplete}`} </button>
    </div>
  )
}

export default App
