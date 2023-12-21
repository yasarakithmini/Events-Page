

import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EventRegistrationForm from './EventRegistrationForm';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = React.useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = React.useState(false);

  React.useEffect(() => {
    
    axios.get(`http://localhost:8000/api/events/${id}`)
      .then(response => {
        setEvent(response.data.event);
      })
      .catch(error => {
        console.error('Error fetching event details:', error);
      });
  }, [id]);

  const handleRegisterClick = () => {
    setShowRegistrationForm(true);
  };

  return (
    <div>
      {event ? (
        <div className="event-detail-container">
          <h1>{event.event_name}</h1>
          <img src={`images/events/${event.event_image}`} alt={event.event_info} />
          <p>Venue: {event.event_venue}</p>
          <p>Date: {event.event_datetime}</p>
          <p>Announced Date: {event.announced_datetime}</p>
          <p>Payment Deadline: {event.payment_deadline}</p>
          <p>Ticket Price: {event.ticket_price}</p>
          <p>{event.event_info}</p>
          <button onClick={handleRegisterClick}>Register</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}

     
      {showRegistrationForm && (
        <EventRegistrationForm
          event={event}
          onClose={() => setShowRegistrationForm(false)}
        />
      )}
    </div>
  );
};

export default EventDetail;
