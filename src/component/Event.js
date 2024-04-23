import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './style.css';
import { NavLink, useNavigate } from 'react-router-dom';

function EventManagement() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const dummyEvents = [
    {
      event_id: "event1",
      event_name: "Annual Tech Conference",
      event_description: "Join us for our annual deep dive into the latest in technology and innovation, featuring expert speakers from around the globe.",
      event_location: "Convention Center, Downtown",
      event_date: "2024-09-15T09:00:00",
      event_duration: "8 hours",
      is_private: false
    },
    {
      event_id: "event2",
      event_name: "Midnight Music Fest",
      event_description: "Experience the magic of music under the stars with leading artists and bands performing live at our outdoor stage.",
      event_location: "Riverbank Arena",
      event_date: "2024-09-20T18:00:00",
      event_duration: "6 hours",
      is_private: true
    },
    {
      event_id: "event3",
      event_name: "Local Food Carnival",
      event_description: "Taste the best of local cuisine at our annual food carnival. Enjoy dishes from top local chefs and popular food trucks.",
      event_location: "City Park",
      event_date: "2024-09-25T11:00:00",
      event_duration: "4 hours",
      is_private: false
    },
    {
      event_id: "event4",
      event_name: "Charity Run 5K",
      event_description: "Participate in our community charity run. All proceeds will go to local charities supporting health and education initiatives.",
      event_location: "Community Sports Complex",
      event_date: "2024-09-30T07:00:00",
      event_duration: "3 hours",
      is_private: true
    }
  ];
  

  useEffect(() => {
    setEvents(dummyEvents)
    localStorage.setItem('is_organizer', false)
    setIsLoading(true);
    axios.get('https://localhost:7015/api/events')
      .then(response => {
        setEvents(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        setIsLoading(false);
      });
  }, []);

  const handleRegister = async (event) => {
    try {
      await axios.post(`https://localhost:7015/api/joins`, {
        event_name: event.event_name,
        username: localStorage.getItem('username'),
        contact_number: localStorage.getItem('contact_number')
      });
      alert(`You are successfully registered for ${event.event_name}`);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed');
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const isOrganizer = localStorage.getItem('is_organizer') === 'true';

  const filteredEvents = events.filter(event => 
    event.event_name.toLowerCase().includes(searchQuery) && 
    (event.is_private ? isOrganizer : true)
  );

  return (
    <div style={{ backgroundColor: "rgb(220, 220, 220)" }}>
      <Navbar />
      <div className="centered">
        <h3>Welcome {localStorage.getItem('username')}</h3>
        <div className="input-group">
          <input
            type="search"
            className="form-control"
            placeholder="Search event"
            onChange={handleSearch}
            style={{ width: '500px', marginRight: '10px' }}
          />
          <button className="btn btn-primary" type="button">
            Search <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'space-around' }}>
        {localStorage.getItem('is_organizer') === 'true' && (
          <button className="btn btn-primary" onClick={() => navigate('/AddEvent')}>Add Event</button>
        )}
        <NavLink className="btn btn-secondary" to="/myevents">My Events</NavLink>
      </div>
      <ul>
        {isLoading ? (
          <p>Loading events...</p>
        ) : (
          filteredEvents.map(event => (
            <div className="card" key={event.event_id} onClick={() => navigate(`/event/${event.event_id}`)}>
              <div className="card-content">
                <h2 className="card-header">{event.event_name}</h2>
                <div className="card-details">
                  <span className="card-date">{new Date(event.event_date).toLocaleDateString()}</span>
                  <span className="card-duration">{event.event_duration}</span>
                </div>
                <p className="card-description">{event.event_description}</p>
                <button className="card-button" onClick={(e) => {
                  e.stopPropagation(); // Prevents navigating to event details when clicking on the button
                  handleRegister(event);
                }}>Register Now</button>
              </div>
            </div>
          ))
        )}
      </ul>
    </div>
  );
}

export default EventManagement;
