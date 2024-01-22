

import React, { useState } from 'react';
import axios from 'axios';

const EventRegistrationForm = ({ event, onClose }) => {
  const [formData, setFormData] = useState({
    event_id: event.id,
    event_name: event.event_name,
    user_id: '',
    user_email: '',
    ticket_quantity: '',
    ticket_price: event.ticket_price,
    payment_invoice: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:8000/api/eventRegistrations', formData)
      .then(response => {
        console.log(response.data);
        
        onClose(); 
      })
      .catch(error => {
        console.error('Error registering event:', error);
        
      });
  };

  const handlePayNow = () => {
    // Implement your logic for handling payment
    console.log('Payment logic goes here');
  };

  return (
    <div>
      <h1>Event Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input type="text" name="user_id" value={formData.user_id} onChange={handleChange} />
        </label>
        <label>
          User Email:
          <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} />
        </label>
        <label>
          Ticket Quantity:
          <input type="text" name="ticket_quantity" value={formData.ticket_quantity} onChange={handleChange} />
        </label>
        <label>
          Ticket Price:
          <input type="text" name="ticket_price" value={formData.ticket_price} onChange={handleChange} />
        </label>
        <label>
          Payment Invoice:
          <input type="text" name="payment_invoice" value={formData.payment_invoice} onChange={handleChange} />
        </label>
        <button type="button" onClick={handlePayNow}>Pay Now</button>
        <button type="submit">Submit</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EventRegistrationForm;

