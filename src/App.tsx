import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
  axios({
    method: 'get',
    url: 'https://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=b9bf822643abfab53681f5b9aaa37937&units=metric',
  })
    .then(function (response) {
      console.log(response);
      
    });
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
