import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import './style.css';
import { NavLink, useNavigate } from 'react-router-dom';
import ChatbotPopup from './chatbot';

 function EventManagement() {
  const [events, setEvents] = useState([
    {
    eventId: "event1",
    eventName: "event1",
    eventDescription: "event description",
    eventLocation: "location",
    eventDate: "09/03/2024",
    eventDuration: "3 hours",
    isPrivate: false
  },{
    eventId: "event2",
    eventName: "event2",
    eventDescription: "event description",
    eventLocation: "location",
    eventDate: "09/03/2024", //You can test auto deletion of past event by changing date of event by putting it old date for auto deletion
    eventDuration: "3 hours",
    isPrivate: true
  }
  ]);
   const [user, setUser] = useState([
    {
      //for enabling isoragniser or not use this dumy data and the credentials provided below
      UserEmail: "email@gmail.com",
      password: "ajajajaj",
      userName: "username",
      contactNumber: 987654321,
      isOrganiser: true
    }
  ]);
   const [filteredevents, setFilteredEvents] = useState([   
    {
      eventId: "event1",
      eventName: "event1",
      eventDescription: "event description",
      eventLocation: "location",
      eventDate: "09/03/2024",
      eventDuration: "3 hours",
      isPrivate: false //this is to check for adding private event you can use this boolean on backend true for making it non private false is for private
    }, 
    {
      eventName: "event2",
      eventDescription: "event description",
      eventLocation: "location",
      eventDate: "09/03/2024",
      eventDuration: "3 hours",
      isPrivate: true
    }
    
]);
   const [searchQuery, setSearchQuery] = useState("");
   const [doubt, setDoubt] = useState([]);
   const [outputResult, setOutputResult] = useState([]);

  const getuser = async () => {
   
    try{
       // Replace This Api it will have the data convention similar to dummy data provided in user var 
      const response1 = await fetch("https://localhost:7015/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        },
      });
      const data = await response1.json();
      setUser(data);
    }
    catch(err){
      console.log(err);
    }

    
   
  }
  useEffect(() => {
    getuser();
  }, [])


  const fetchevent = async () => {
    // Replace This Api it will have the data convention similar to dummy data provided in events var
    const response = await fetch('https://localhost:7015/api/events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json()
    setEvents(data)
    setFilteredEvents(data)
  };

  useEffect(() => {
    fetchevent();
    deleteOldEvents();
  }, []);

  const deleteOldEvents = () => {
    let data = [];
    filteredevents.map(e=>{
      let parts = e.eventDate.split("/");
      let parsedDate = new Date(Number(parts[2]),Number(parts[0]) - 1,Number(parts[0]));
      let today = new Date();

      let parsedDateWithoutTime = new Date(parsedDate.getFullYear(),parsedDate.getMonth(),parsedDate.getDate())
      let todayDateWithoutTIme = new Date(today.getFullYear(),today.getMonth(),today.getDate());
      if(parsedDateWithoutTime.getTime() > todayDateWithoutTIme.getTime()) {
        data.push(e);
      } else {
        deleteEvent(e.eventId);
      }
      
    })
    setEvents(data);
    setFilteredEvents(data);
  }

  const deleteEvent = async (eventId) => {
    // Replace This Api
    await fetch(`https://localhost:7015/api/joins/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    window.location.reload();
  }

  // useEffect(() => {
  //   fetch('https://localhost:7015/api/events')
  //     .then(response => response.json())
  //     .then(data => setEvents(data));
  // }, []);

  const isOrganizer = user.find(
    (record) => record.userName === localStorage.getItem('username') && record.isOrganiser === true
  );

  // const response1 = await fetch(
  //   "https://localhost:7015/api/users",
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       'Access-Control-Allow-Origin': '*',
  //     },
  //   }
  // );
  // const data1 = await response1.json();
  // const username1 = localStorage.getItem('username');
  // const isOrganizer = data1.find(
  //   (record) => record.userName === username1 && record.isOrganizer === true
  // );
    

  const Register = async (eventName) => {
    const newevent={
      eventName,
      username,
      contactnumber
    }
    

    try {
      // Retrieve all join records
      const response = await fetch(
        "https://localhost:7015/api/joins",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
      // const response1 = await fetch(
      //   "https://localhost:7015/api/users",
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       'Access-Control-Allow-Origin': '*',
      //     },
      //   }
      // );
  
      const data = await response.json();
  
      // Check if user has already registered for the event
      const existingRecord = data.find(
        (record) => record.eventName === eventName && record.userName === username
      );
      // const data1 = await response1.json();
      // const isOrganizer = data1.find(
      //   (record) => record.userName === username && record.IsOrganiser
      // );
      // console.log(isOrganizer);
      
  
      if(existingRecord) {
        alert(`${username}, you have already registered for ${eventName} event`);
        return;
      }
  
      // Register user for the event
      const registerResponse = await fetch(
        "https://localhost:7015/api/joins",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(newevent),
        }
      );
  
      console.log(registerResponse);
      alert(`${username} you are successfully registered for ${eventName} event`);
    } catch (error) {
      console.log(error);
    }
   
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filteredData = events.filter((event)=>{
      return event.eventName.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredEvents(filteredData);
  };



  const username = localStorage.getItem('username');
  const contactnumber = localStorage.getItem('contactnumber');
 
  const handledoubtchange = (e) => { 
    setDoubt(e.target.value);
  };
  const handledoubt = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:7015/api/OpenAI/UseChatGPT?doubt=${doubt}`);
      const data =await response.text();
      console.log(data);
      setOutputResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleTogglePopup = () => {
    setIsOpen(!isOpen);
  };
  // const handleclosePopup = () => {
  //   setIsOpen(isOpen);
  // };


  return (
    <div style={{backgroundColor:"rgb(220, 220, 220)"}}>
    {/* <Navbar /> */}
    <div className="centered">
      <div className="d-flex align-items-center justify-content-between">
        <h3 className='headerclass'>Welcome {username}</h3>
        <div className='input-group ml-5'>
          <div className="form-outline">
            <input type="search" className='myclass form-control' style={{ width: 500 }} placeholder="search event" onChange={handleSearch} />
          </div>
          <button id="search-button" type="button" className="btn btn-primary my"> Search
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <br />
      {isOrganizer && (
        <button style={{marginBottom: "36px"}} className='card-button mybutton2' onClick={() => window.location.href='/addevent'}>Add Event</button>
      )}
      <br />
      <NavLink style={{marginBottom:"36px"}} className='card-button mx-3' to="/myevents">My Events</NavLink>
      

    </div>

    <ul>
      {filteredevents.map((event, index) => (
        event.isPrivate && <div className="card" key={event.eventId} onClick={()=>window.location.href=`/event/${event.eventId}`}>
          <div className="card-content">
            <h2 className="card-header">{event.eventName}</h2>
            <div className="card-details">
              <span className="card-date">{event.eventDate}</span>
              <span className="card-duration">{event.eventDuration}</span>
            </div>
            <p className="card-description">{event.eventDescription}</p>
            <button className="card-button" onClick={() => Register(event.eventName)}>Register Now</button>
          </div>
        </div>
      ))}
    </ul>
    {/* <form onSubmit={handledoubt}>
        <input type="text" value={doubt} placeholder="Enter your doubt" onChange={handledoubtchange} />
        <button type="submit">Submit</button>
      </form> */}
      {/* <div>{outputResult}</div> */}
      {/* <div dangerouslySetInnerHTML={{ __html: outputResult }}></div> */}
   
  </div>
  
  
  );
}
 
export default EventManagement;
