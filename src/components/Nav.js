import React,{useState} from 'react'

import{NavLink} from 'react-router-dom'



export default function Nav() {
    const [login,setLogin]=useState(false)
   
        setInterval(() => {
            if(localStorage.getItem('login')) {setLogin(true)} else {setLogin(false)}
        }, 100);
        
    
    
    return (
        <div>
             <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
            <a className="navbar-brand" href="/" >Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                <NavLink className="nav-link active "  to="/"  style={{ textDecoration: 'none',color:"white",fontWeight: "bold" }}  >Home</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link " to="signup"style={{ textDecoration: 'none',color:"white",fontWeight: "bold" }} activeStyle={{ color: 'yellow' }}>SignUp</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link " to="dashboard" style={{ textDecoration: 'none',color:"white",fontWeight: "bold" }} activeStyle={{ color: 'yellow' }}>ToDo</NavLink>
                    </li>
                    
                     
                <li className="nav-item">
                    <a className="nav-link" style={{ textDecoration: 'none',color:"white",fontWeight: "bold" }} href="/">Link</a>
                </li>
               
                <li className="nav-item">
                {(login) &&
                    <NavLink className="nav-link"  to="/" onClick={()=>localStorage.clear()}  activeStyle={{ color: '#33cc33',fontWeight: "bold"  }}>Log Out</NavLink>
                }
                    </li>
                     
               
                
                </ul>
                <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
            </nav>

        </div>
    )
}

