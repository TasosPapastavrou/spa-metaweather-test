import React from 'react';
import axios from 'axios'; 
import { 
    Link
  } from "react-router-dom"; 
   
  import history from './history';
  export default class ShowWeatherLocation extends React.Component{

    constructor(props){
        super(props)  
        this.state = {
            havedata:false,
            results:[],
            woeid:props.match.params.woeid
        }
    }
    componentDidMount() { 
        const id=this.state.woeid;
        axios.get(`https://www.metaweather.com/api/location/${id}`).then(res=>{
               this.setState({results:res.data});
               this.setState({havedata:true});  
      });
    }

    seleckDay(date){
        const id=this.state.woeid; 
        const res = date.split("-"); 

        history.push(`/location/${id}/${res[0]}/${res[1]}/${res[2]}/${date}`)
        window.location.reload(); 
    }

   
      render(){

        const weather_state = this.state.results.consolidated_weather;
        const data = this.state.havedata;  
        const nametown = this.state.results.title; 
        return(
            <> 
            
<Link to="/" >search weather in other location</Link>
<hr></hr>
<div class="viewStyle">
{nametown}
<br></br>

{
            data ?    
            
            weather_state.map( weather => 
                <div class="pos"> 
                <table key={weather.id}>
            <tr>
            <th onClick={()=>this.seleckDay(weather.applicable_date)}><b>Day:{weather.applicable_date}</b></th> 
             
            </tr> 
                <tr>
                 <lu class="showSt"> 
                      
                     <li>applicable_date:{weather.weather_state_name} </li>
                     <li>max_temp:{weather.max_temp} </li>
                     <li>min_temp:{weather.min_temp} </li>
                     <li>humidity:{weather.humidity} </li> 
                     <li>visibility:{weather.visibility}</li>
                     <li>air_pressure:{weather.air_pressure} </li>
                     <li>wind_speed:{weather.wind_speed}</li>
                     <li>predictability:{weather.predictability} </li>
                    </lu>
                </tr>  
                </table></div>
    )
             
              
                : <p>.........</p> 
            }   

</div>
        </>
        )


      }

  }