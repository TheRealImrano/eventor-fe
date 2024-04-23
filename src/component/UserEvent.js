import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export default function UserEvent(){
    const[Users,setUsers]=useState([
        // This data was added for testing.
    {   
        username: "Ali Imran",
        eventName: "event1",
        u_id: 1
    }
    ]);
    const username = localStorage.getItem('username');

    const fetchUser = async () => {
        const response = await fetch('https://localhost:7015/api/joins', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    });
    const data = await response.json();
    // setUsers(data);
    const registeredEvents= data.filter((Users) => Users.userName === username);
    console.log(registeredEvents);
    setUsers(registeredEvents);
    };

    useEffect(() => {
        fetchUser();
    }
    , []);

    const DeleteEvent = async (eventId) => {
        // Add Your Api.
        await fetch(`https://localhost:7015/api/joins/${eventId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
        window.location.reload();
    
      }
    return(
        <div style={{backgroundColor:"rgb(244, 244, 244)"}}>
            <h1 style={{textAlign:"center"}}>Events</h1>
        <table >
    <thead>
        <tr>
            <th>Event Name</th>
            <th>Delete</th>
        </tr>
    </thead>
    <tbody>
        {Users.map((event) => (
        <tr>
            <td>{event.eventName}</td>
            <td><button className="card-button" onClick={() => DeleteEvent(event.u_Id)}>Delete</button></td>
        </tr>
        ))}
    </tbody>

        </table>
        </div>
    )
    




}