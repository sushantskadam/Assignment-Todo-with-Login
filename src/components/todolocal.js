
import React,{useEffect, useState,useRef} from 'react'
import axios from 'axios'

function Todo() {

    const [todo, setTodo] =useState('') 
    const [todos, setTodos] = useState([])
    // let taskInput=useRef(null);
    // let priorityInput=useRef(null);

    useEffect(()=>{
        const getTodos = JSON.parse(localStorage.getItem('todos'))
        if(getTodos){
            setTodos(getTodos)
        }
    },[])
    
    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(todos))
    },[todos])

    
    

    const onChangehandler=(e)=>{
        setTodo(e.target.value)
    }

    const addData=(event)=>{
       event.preventDefault();
       setTodos([{ id:Date.now() ,title : todo , done:false } ,...todos])
       console.log(todos)

    }

    const todoDone=(id)=>{
        const index = todos.findIndex(item=> item.id===id)
        const duplicateTodos=[...todos]
        duplicateTodos[index]={
            id:todos[index].id,
            title:todos[index].title,
            done:!todos[index].done

        }
        setTodos(duplicateTodos)
        console.log(todos)
    }

    const todoDelete=(id)=>{
        const updatedTodos =todos.filter(item=>item.id !== id)
        setTodos(updatedTodos)

        }
    
    if(localStorage.getItem('login')!=undefined) {
      
    return (
        <>  
        <form className="container text-left" id="myForm" onSubmit={addData}  >
            <div className="form-row">
        <div className="form-group col-md-9" >
            <label ><b>Task</b></label>
            <input type="text" className="form-control" id="task"  name="task"  placeholder="Task"  onChange={(e)=>setTodo(e.target.value)} value={todo}/>
            
        </div>
        {/* <div className="form-group col-md-3">
                       
            <label><b>Priority</b></label>
            <select className="form-control" id="exampleFormControlSelect1" >
            <option>5 - Highest</option>
            <option>4 - High</option>
            <option>3 - Average</option>
            <option>2 - Low</option>
            <option>1 - Lowest</option>
            </select>
  
        </div> */}
        </div>
      
        
        <button type="submit" name="submit" className="btn btn-primary" >Add</button>
        
        </form>
            <hr/>
            <table className="table">
            <thead className="thead-dark ">
                <tr>
                    
                    <th>TASK</th>
                    {/* <th>PRIORITY</th> */}
                    <th>DONE</th>
                    <th>REMO VE</th>
                    
                    
                </tr>
            </thead>
            <tbody>
                {todos.map(todo=>
                <tr className={`${todo.done && 'bg-success'}`}   key={todo.id}>
                    <td>{todo.done? <del> {todo.title}</del> :todo.title}</td>
                    <td><button className="btn btn-success " onClick={()=>todoDone(todo.id)}>
                        {(!todo.done)?(
                        <i className="fa fa-check"></i>
                        )
                        :(<i className="fa fa-undo"></i>
                        )
                        }
                        
                        </button></td>
                    <td><button className="btn btn-danger fa fa-close" onClick={()=>todoDelete(todo.id)}></button></td>
                </tr>
                    )}
                
                {/* {
                task.length>0?
                task.map((data)=>
                <tr>
                    <td>{data}</td>
                    <td></td>
                    
                    <td><button className="btn btn-success fa fa-check" onClick={todoDone}></button></td>
                    <td><button className="btn btn-danger fa fa-close" onClick={todoDelete}></button></td>
                    
                    
                </tr>)
                
                : <h2>No data found</h2>} */}
            </tbody>
        </table>
        </>
    )}
    else{return <div><h1>Log In to see ToDo List</h1></div>}
}

export default Todo
