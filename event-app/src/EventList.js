

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EventRegistrationForm from './EventRegistrationForm';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  useEffect(() => {
    
    axios.get('http://localhost:8000/api/events')
      .then(response => {
        setEvents(response.data.events);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleContainerClick = (event) => {
    
    console.log(`Redirecting to event detail for ${event.event_name}`);
  };

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setShowRegistrationForm(true);
  };

  return (
    <div>
      <h1>Events & Activities</h1>
      {events.map((event) => (
        <div key={event.id} className="event-container">
          <Link to={`/events/${event.id}`} onClick={() => handleContainerClick(event)}>
            <img src={`/images/events/${event.event_image}`} alt={event.event_info} />
            <div>
              <h2>{event.event_info}</h2>
              <p>Event Date: {event.event_datetime}</p>
              <p>Announced Date: {event.announced_datetime}</p>
              <p>Payment Deadline: {event.payment_deadline}</p>
              <p>Ticket Price: {event.ticket_price}</p>
            </div>
          </Link>
          <button onClick={() => handleRegisterClick(event)}>Register</button>
        </div>
      ))}

      
      {selectedEvent && showRegistrationForm && (
        <EventRegistrationForm
          event={selectedEvent}
          onClose={() => {
            setSelectedEvent(null);
            setShowRegistrationForm(false);
          }}
        />
      )}
    </div>
  );
};

export default EventList;

