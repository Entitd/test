// src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState(1);
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Запрос к корневому endpoint
    fetch('/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  const fetchItem = () => {
    // Запрос к endpoint с параметрами
    fetch(`/items/${itemId}?q=${query}`)
      .then(response => response.json())
      .then(data => setItems([data]))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>FastAPI + React</h1>
      <p>Message from API: {message}</p>
      
      <div>
        <h2>Get Item</h2>
        <input
          type="number"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          placeholder="Item ID"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Query string"
        />
        <button onClick={fetchItem}>Get Item</button>
        
        {items.map((item, index) => (
          <div key={index}>
            <p>Item ID: {item.item_id}</p>
            <p>Query: {item.q || 'None'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;