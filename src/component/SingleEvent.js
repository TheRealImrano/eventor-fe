import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import {WhatsappShareButton} from 'react-share';


export default function SingleEvent() {
    const eventId = useParams().id;
    const [currEvent,setEvent] = useState({
      eventId: "event2",
      eventName: "event2",
      eventDescription: "event description",
      eventLocation: "location",
      eventDate: "03/03/2024",
      eventDuration: "3 hours",
    });
    const username = localStorage.getItem('username');
    const contactnumber = localStorage.getItem('contactnumber');
    
    const fetchevent = async () => {
      // Add api here.
      const response = await fetch('https://localhost:7015/api/events', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setEvent(data.find(item=>item.eventId==eventId.id));
    };
    useEffect(() => {
      fetchevent();
    }, []);
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
        // const is_organizer = data1.find(
        //   (record) => record.userName === username && record.is_organizer
        // );
        // console.log(is_organizer);
        
    
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

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Upcoming Events</h1>
    <div className='card'>
          <div className="card-content">
            <h2 className="card-header">{currEvent.eventName}</h2>
            <div className="card-details">
              <span className="card-date">{currEvent.eventDate}</span>
              <span className="card-duration">{currEvent.eventDuration}</span>
            </div>
            <p className="card-description">{currEvent.eventDescription}</p>
            <button className="card-button" onClick={() => Register(currEvent.eventName)}>Register Now</button>
            <WhatsappShareButton url={window.location.href} title={currEvent.eventName}>
              <button style={{marginLeft: "2px"}} className="card-button">Share On Whatsapp</button>
            </WhatsappShareButton>
          </div>
    </div>
    </div>
  )
}