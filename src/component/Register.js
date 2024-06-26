import React,{useState} from "react";
import { redirect,useNavigate } from "react-router-dom";
import './register.css'    
import { NavLink } from "react-router-dom";

function Register() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [contact_number,setcontact_number]=useState("");
    const [is_organizer,setis_organizer]=useState(false);
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const newuser = {
            email,
            password,
            username,
            contact_number,
            is_organizer
        };
        try {
            const response = fetch("https://localhost:7015/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(newuser),
            });
            console.log(response);
            alert("User Register Successfully");
                navigate("/fetchEvent");
            
            localStorage.setItem('username', username);
            localStorage.setItem('contact_number',contact_number);

            // navigate('/fetchevent');

            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    const handleOrganizer = (e) => {
        setis_organizer(e.target.value === 'true');
    }


    return (
        <div>
              
      {/* <h3> Register/Login </h3>
      </div>
            <form onSubmit={handleSubmit} className="event-form" >
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
       */}
       
       <div  className="bg-img">
        <div className="contentR">
          <header style={{ color: 'black' }}>Register</header>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <span className="fa fa-user"></span>
              <input type="text" name='name' value={username}
                onChange={(e) => setUsername(e.target.value)} required placeholder="Name" />
            </div>
            <div className="field space">
              <span className="fa fa-user"></span>
              <input type="email" name='email' value={email}
                onChange={(e) => setemail(e.target.value)} required placeholder="Email " />

            </div>
            <div className="field space">
              <span className="fa fa-lock"></span>
              <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)}
 className="pass-key" required placeholder="Password" />
            </div>
            <div className="field space">
                <span className="fa fa-phone"></span>
                <input type="number" name='number' value={contact_number} onChange={(e)=> setcontact_number(e.target.value)}
                  required placeholder="contact number" />
            </div>
            <div className="">

           <label>
            <input type="radio" name="organizer" value="true" checked={is_organizer} onChange={handleOrganizer} />
            Organizer
           </label>
           <label>
            <input type="radio" name="!organizer" value="false" checked={!is_organizer} onChange={handleOrganizer} />
            Attendee
           </label>
           </div>

            <div className="pass">
              {/* <a href='/'>Forgot Password?</a> */}
            </div>
            <div className="field">
              <button type="submit"
                value="Register"  >Register</button>
            </div>
            
          </form>
          <div className="signup">Already Have Acount?
            <NavLink style={{color:"white"}}  to="/">SigIn Now</NavLink>
          </div>
        </div>
      </div>

        </div> 
    );


}

export default Register;