
import React,{ useState,useRef} from 'react'
import axios from 'axios'
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = /^[a-zA-Z ]{2,100}$/;
const regForUsername = /^[a-zA-Z0-9]+$/;

export default function Signup() {
    
    const [state, setState] =useState({
        fname:null,
        lname:null,
        username:null,
        email:null,
        password:null,
        confirmpassword:null,
        
        
        // errors:{
        //     fname:'',
        //     lname:'',
        //     username:'',
        //     email:'',
        //     password:'',
        //     confirmpassword:''
        // },
        // fnames:[],
        // lnames:[],
        // usernames:[],
        // emails:[],
        // passwords:[],
        // confirmpasswords:[]
    }) 
    const [errors, setErrors] =useState({ 
    fname:'',
    lname:'',
    username:'',
    email:'',
    password:'',
    confirmpassword:''})
    

    // useEffect(()=>{
    //     const URL ="http://localhost:3001/todo/"
    //     axios.get(URL)
    //     .then(res=>{
    //         setState({todoData:res.data})
            
    //     })
    // },[])
    
    
   const handler=(event)=>{
   
        const {name,value}=event.target;
        // let errors=state.errors;
        switch(name){
            
            case 'fname':
                let efname=regForName.test(value)?'':'Enter valid Name';
                setErrors({...errors,fname:efname})
                break;
            case 'lname':
                let elname=regForName.test(value)?'':'Enter valid Name';
                setErrors({...errors,lname:elname})
                break;
            case 'username':
                let eusername=regForUsername.test(value)?'':'Enter valid Username';
                setErrors({...errors,username:eusername})
                break;
        
            case 'email':
                let eemail=regForEmail.test(value)?'':'Email is not valid';
                setErrors({...errors,email:eemail})
                break;
            case 'password':
                let epassword=value.length<8?'Password must be 8 characters':'';
                setErrors({...errors,password:epassword})
                // console.log(value)
                break;
            case 'confirmpassword':

                let econfirm=state.password !== value ?'Password Dont Match':'';  
                setErrors({...errors,confirmpassword:econfirm})
                break;
            default:
                
            
                
                
        }
        // setState(errors,{[name]:value},()=>{
        //     console.log(errors)
        // })
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        
    }
    
    let fname=useRef(null);
    let lname=useRef(null);
    let username=useRef(null);
    let email=useRef(null);
    let password=useRef(null);
    let confirmpassword=useRef(null);

    const formSubmit=(event)=>{
        event.preventDefault();
        
        if(validate(errors)&&(document.getElementById("fname").value!=='')&&(document.getElementById("email").value!=='')&&(document.getElementById("password").value!=='')&&(document.getElementById("confirmpassword").value!=='')&&(document.getElementById("lname").value!==''))
        {
            
            // var fnames = state.fnames;
            //  fnames.push(state.fname);
            //  var lnames = state.lnames;
            //  lnames.push(state.lname);
            //  var usernames = state.usernames;
            //  usernames.push(state.username);
            //  var emails = state.emails;
            //  emails.push(state.email)
            //  var passwords = state.passwords;
            //  passwords.push(state.password)
             
            //  setState({
            //  fnames: fnames,
            //  fname: "",
            //  lnames: lnames,
            //  lname: "",
            //  usernames:usernames,
            //  username:"",
            //  emails: emails,
            //  email: "",
            //  passwords: passwords,
            //  password:"",
             
            //  });
            
             try{
                event.preventDefault();
                let formData={"fname":fname.current.value,"lname":lname.current.value,"username":username.current.value,"email":email.current.value,"password":password.current.value}
                const URL = "http://localhost:3001/users/"
                axios.post(URL,formData)
               
                alert("Successfully Registered");
                document.getElementById("myForm").reset()
                }
                catch(err){
                    console.log(err)
                }
             

        }
        else {
            alert("Please Enter Valid Data");
        }
     }
     const validate=(errors)=>{
         let valid=true;
         Object.values(errors).forEach((val)=> val.length >0 && (valid=false));
         return valid;
     }
     
    //  const {errors}=state;
    return (
        <div className="back text-left">

        <div className="div-center2">
        <div className="content">
            <h3>Sign Up</h3>
            <hr />
            
            <form className="needs-validation" onSubmit={formSubmit} id="myForm">
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                    <label >First name</label>
                    <input type="text" className="form-control" id="fname" name="fname" placeholder="First name"  onChange={handler} ref={fname}/>
                    <small style={{
                    // position: 'absolute', 
                    // left: '46%', 
                    // transform: 'translate(-105%, -5%)',
                    color:'red'
                }}
                 id="component-error-text" >{errors.fname.length>0 && 
                    errors.fname}</small>
                    </div>
                    <div className="col-md-4 mb-3">
                    <label >Last name</label>
                    <input type="text" className="form-control" id="lname" name="lname" placeholder="Last name"  onChange={handler} ref={lname} />
                    <small style={{
                    // position: 'absolute', 
                    // left: '46%', 
                    // transform: 'translate(-105%, -5%)',
                    color:'red'
                }}
                 id="component-error-text" >{errors.lname.length>0 && 
                    errors.lname}</small>
                    </div>
                    <div className="col-md-4 mb-3">
                    <label >Username</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        </div>
                        <input type="text" className="form-control" id="username" name="username" placeholder="Username" aria-describedby="inputGroupPrepend"  onChange={handler} ref={username}/>
                        <small style={{
                    // position: 'relative', 
                    // left: '46%', 
                    // transform: 'translate(-85%, 200%)',
                    color:'red'
                }}
                 id="component-error-text" >{errors.username.length>0 && 
                    errors.username}</small>
                    </div>
                    </div>
                </div>
            
            <div className="form-group">
               
                <label >Email</label>
                <input type="email" className="form-control" id="email" name="email" placeholder="Email"  onChange={handler} ref={email}/>
                <small style={{
                    // position: 'absolute', 
                    // left: '46%', 
                    // transform: 'translate(-325%, -10%)',
                    color:'red'
                }}
                 id="component-error-text" >{errors.email.length>0 && 
                    errors.email}</small>
            </div>
            
            
            <div className="form-row">
            <div className="form-group col-md-6">
                <label >Password</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={handler} ref={password}/>
                <small style={{
                    // position: 'absolute', 
                    // left: '46%', 
                    // transform: 'translate(-90%, 10%)',
                    color:'red'
                }}
                 id="component-error-text" >{errors.password.length>0 && 
                    errors.password}</small>
                </div>
                <div className="form-group col-md-6">
                <label >Repeat Password</label>
                <input type="password" className="form-control" id="confirmpassword" name="confirmpassword" placeholder="Password" onChange={handler} ref={confirmpassword}/>
                <small style={{
                    // position: 'absolute', 
                    // left: '46%', 
                    // transform: 'translate(-125%, -5%)',
                    color:'red'
                }}
                 id="component-error-text" >{errors.confirmpassword.length>0 && 
                    errors.confirmpassword}</small>
                </div>
            </div>
           <br/>
            <button type="submit" className="btn btn-primary">Sign in</button>
            </form>

        </div>



        </div>
    </div>
    )
}
