import React from 'react';
import './App.css';
import Carousel from './components/carousel/carousel';

function App() {
  return (
    <div className="App">
      <Carousel
        title="THE"
        items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
      />
    </div>
  );
}

export default App;
