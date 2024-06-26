import React from "react";
import { useState, useEffect } from "react";
function Joined() {
    const [events, setEvents] = useState([]);


    useEffect(() => {
        fetch('https://localhost:7015/api/joins')
        
       .then(response => response.json())
           .then(data => setEvents(data));
       }, []);

       const DeleteEvent = async (eventId) => {
        await fetch(`https://localhost:7015/api/joins/${eventId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
        window.location.reload();

      };

  return (
    <div>
        
      <h1>Participants</h1>
      <table>
  <thead>
    <tr>
        <th>User id</th>
      <th>User Name</th>
      <th>Event Name</th>
      <th>Contact Number</th>
      <th>Delete</th>

    </tr>
  </thead>
  <tbody>
    {events.map((event) => (
      <tr>
        <td>{event.u_Id}</td>
        <td>{event.username}</td>
        <td>{event.eventName}</td>
        <td>{event.contactNumber}</td>
       <td><button className="card-button" onClick={() => DeleteEvent(event.u_Id)}>Delete</button></td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default Joined;