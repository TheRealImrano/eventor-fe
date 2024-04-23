import React,{useState} from "react";
import './style.css'    

function AddEvent() {
const [event_name, setevent_name] = useState("");
const [event_description, setevent_description] = useState("");
const [event_location, setevent_location] = useState("");
const [event_date, setevent_date] = useState("");
const [event_duration, setevent_duration] = useState("");
const [is_private, setis_private] = useState(false);

const handleChange = (event) => {
  setis_private(event);
}

const handleSubmit = async (e) => {
    e.preventDefault();
    const newevent = {
      event_name,
      event_description,
      event_location,
      event_date,
      event_duration,
      is_private
    };
    console.log(newevent);
    try {
      const response = await fetch(
        "https://localhost:7015/api/events",
        {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*',
            },
            
            body: JSON.stringify(newevent),
          });
          
      console.log(response);
      alert("Event Added Successfully");
      window.location.reload();

      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contentRS">
         <form onSubmit={handleSubmit} className="event-form" >
         <div  className="form-group">
         <label htmlFor="event_name">Event Name:</label>
       
        
        <input
          type="text"
          value={event_name}
          onChange={(e) => setevent_name(e.target.value)}
        /> </div>
         <div className="form-group">
      <label htmlFor="event_description"> 
        event Description:</label>
        <textarea
          value={event_description}
          onChange={(e) => setevent_description(e.target.value)}
        />
      </div>
      <div className="form-group">
      <label htmlFor="event_location">
        event Location: </label>
        <input
          type="text"
          value={event_location}
          onChange={(e) => setevent_location(e.target.value)}
        />
      
      </div>
      <div className="form-group">

      <label htmlFor="event_date">
        event Date: </label>
        <input
          type="date"
          value={event_date}
          onChange={(e) => setevent_date(e.target.value)}
        />
        </div>
        <div className="form-group">
      <label htmlFor="event_duration" >
        event Duration:</label>
        <input
          type="text"
          value={event_duration}
          onChange={(e) => setevent_duration(e.target.value)}
        />
        <div style={{display: 'flex',alignItems: 'center',justifyContent: 'center',gap: '2px'}}>
            <label > 

          
            <input type="radio" onChange={(e)=>handleChange(!is_private)} value={is_private} checked="">
              </input>           
              <text>Is Private   </text>
            </label>
        
        </div>
      </div>
      <button  type="submit">Create event</button>
    </form>
    </div>
  );
}

export default AddEvent;