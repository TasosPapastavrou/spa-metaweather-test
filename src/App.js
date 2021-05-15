import React from 'react';
import Searchbar from './components/searchbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import history from './components/history';
 import ShowWeatherLocation from './components/showtheloc';
 import SelectDay from './components/selectDayforWeather';
function App(){
    
  return (
    <Router>
      <Switch history={history}>
            <Route exact path="/" render={ (props)=> <Searchbar {...props}/> }/>
            <Route exact path="/location/:woeid" render={(props)=><ShowWeatherLocation {...props}/> }/>
            <Route exact path="/location/:woeid/:year/:month/:day/:date" render={(props)=><SelectDay {...props}/> }/>
      </Switch>
    </Router>

  );
 }
 

export default App;
