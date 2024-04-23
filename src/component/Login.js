import React,{useEffect, useState} from "react";
import {useNavigate } from "react-router-dom";
import './style.css'
import { NavLink } from "react-router-dom";

function Login(){
    const[user,setuser]=useState([
      // This data was added for testing purpose
      {
        email: "AliImran@gmail.com",
        password: "ajajajaj",
        username: "Ali Imran",
        contact_number: 987654321,
        is_organizer: true
      }
    ]);
    const[credentials,setcredentials]=useState({username:"",password:""});
    const navigate=useNavigate();
   
    

  const getuser = async () => {
    // Add your api.
    await fetch("https://localhost:7015/api/users", {
      method: "GET"
    }).then(response => response.json()).then(data => {setuser(data); } )
    
   
  }

    const handlesubmit = async (e) => {
        e.preventDefault();
        var isuser=false;
        user.map((e) => {

           
             if (e.username=== credentials.username && e.password === credentials.password) {
                isuser=true;
                localStorage.setItem('username', e.username);

                navigate("/fetchEvent"); 
            }
           
        }) 
        // console.log(credentials.username);
        // console.log(credentials.password);
        if(credentials.username=== "admin" && credentials.password=== "admin")
            {
                navigate("/adminhome");
            }
        else if(!isuser){
            alert("Invalid Credentials");
        }
        
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    useEffect(() => {
      getuser();
    }, [])
    


    
    return(
        <div >
        <div >

            {/* <form onSubmit={handlesubmit} className="event-form">
                <div className="form-group">
                    <label htmlFor="username">User Name:</label>
                    <input
                        type="text"
                        name="username"
                       
                        onChange={onChange}
                    />


                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        
                        onChange={onChange}
                    />
                </div>
                <button type="submit">Login</button> */}

                {/* <input type="text" name="username"  onChange={onChange} placeholder="Enter Name" required/>
                <input type="password" name="password" onChange={onChange} placeholder="Enter Password" required/>
                <button type="submit">Login</button> */}
            {/* </form> */}

            <div style={{backgroundColor:"background-color: #e8eef3"}} className="bg-img">

<div className="content" style={{backgroundColor:"rgb(108, 92, 146)"}}>

  <header style={{ color: 'white' }}> Login</header>
  <form onSubmit={handlesubmit} method='post'>
    <div className="field">
      <span className="fa fa-user"></span>
      <input type="text" onChange={onChange} name='username' required placeholder="username" />
    </div>
    <div className="field space">
      <span className="fa fa-lock"></span>
      <input type="password" onChange={onChange} name='password' className="pass-key" required placeholder="Password" />
    </div>
    <div className="pass">
      {/* <p>Forgot Password?</p> */}
    </div>
    <div className="field my-2">
      <button type="submit"
        value="Login"  >Login </button>
        
    </div>
  </form>
  <div className="signup">Don't have account?
    <NavLink style={{color:"white"}} to="/register">Signup Now</NavLink>
  </div>
</div>
</div>
        </div>
        </div>
    )

}

export default Login;
