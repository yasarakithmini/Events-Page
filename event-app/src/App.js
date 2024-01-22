// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the use of Routes instead of Switch
import EventList from './EventList';
import EventDetail from './EventDetail';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for EventList */}
          <Route path="/" element={<EventList />} />

          {/* Route for EventDetail */}
          <Route path="/events/:id" element={<EventDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
