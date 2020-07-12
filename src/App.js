import React from 'react';
import 'antd/dist/antd.css';
import Itinerary from './Itinerary';
import SupportGuide from './SupportGuide';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

  render() {
    
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/guide" component={SupportGuide} />
            <Route path="/:boardShortLink" component={Itinerary} />
          </Switch>
        </Router>
      </div>
    )
  }

}

export default App;
