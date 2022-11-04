import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Map from './components/Map';

function App() {
  return (
    <div className="App">  
      <Router>
        <Route path="/" component={Map} exact></Route>
      </Router>
    </div>
  );
}

export default App;
