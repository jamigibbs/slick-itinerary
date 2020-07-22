import React from 'react';
import 'antd/dist/antd.css';
import { isLocalHost } from './utils';
import Itinerary from './Itinerary';
import SupportGuide from './SupportGuide';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ReactGA from 'react-ga';

if (!isLocalHost()) {
  ReactGA.initialize('UA-3363703-56');
}

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
