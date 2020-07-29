import React from 'react';
import 'antd/dist/antd.css';
import { isProduction } from './utils';
import ReactGA from 'react-ga';
import Itinerary from './components/Itinerary';
import SupportGuide from './components/SupportGuide';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

if (isProduction) {
  const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;
  ReactGA.initialize(GA_TRACKING_ID);
}

class App extends React.Component {

  render() {
    
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route 
              exact 
              path="/" 
              render={props => { 
                if (isProduction) {
                  ReactGA.pageview(props.location.pathname); 
                }
                return <Home />;
               }} 
            />
            <Route 
              exact 
              path="/guide" 
              render={props => {
                if (isProduction) {
                  ReactGA.pageview(props.location.pathname);
                }
                return <SupportGuide />; 
              }} 
            />
            <Route 
              path="/:boardShortLink" 
              render={props => {
                if (isProduction) {
                  ReactGA.pageview(props.location.pathname);
                }
                return <Itinerary props={props} />; 
              }} 
            />
          </Switch>
        </Router>
      </div>
    )
  }

}

export default App;
