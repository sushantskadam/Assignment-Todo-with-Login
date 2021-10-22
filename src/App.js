import './App.css';
import Nav from './components/Nav';
import{BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Todo from './components/Todo';


function App() {
  return (
    <div className="App">
       <Router>
      <Nav/>
          <Switch>
          <Route path="/" exact component={Login}></Route>
          
          <Route path="/signup" exact component={Signup}></Route>
          <Route path="/dashboard" exact component={Todo}></Route>
        
          
          </Switch>
          </Router>
    </div>
  );
}

export default App;
