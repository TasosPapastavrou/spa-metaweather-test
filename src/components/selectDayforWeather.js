import React,{Component} from 'react';
import axios from 'axios';
import {
    Link
  } from "react-router-dom";  
  import './showData.css';
export default class SelectDay extends React.Component{

    constructor(props){
        super(props)  
        this.state = {
            havedata1:false,
            havedata2:false,
            resultsa:[],
            resultsb:[],
            woeid:props.match.params.woeid,
            year:props.match.params.year,
            month:props.match.params.month,
            day:props.match.params.day,
            town:'',
            fulldate: props.match.params.date,
            sources:[]
        }
    } 
     
    componentDidMount() { 
        const id=this.state.woeid;
        const year =this.state.year;
        const month =this.state.month;
        const day   =this.state.day;
        
        axios.get(`https://www.metaweather.com/api/location/${id}`).then(res=>{ 
                const today =res.data.consolidated_weather;
                this.setState({town:res.data.title});
                this.setState({sources:res.data.sources});
               this.setState({resultsa:today});
               this.setState({havedata1:true});  
      });
      axios.get(`https://www.metaweather.com/api/location/${id}/${year}/${month}/${day}`).then(res=>{
        this.setState({resultsb:res.data});
        this.setState({havedata2:true});  
});
    
    
    
    }



    render(){
     
        const weather_state = this.state.resultsa;
        const data1 = this.state.havedata1; 
        const data2 = this.state.havedata2;   
          const date = this.state.fulldate;
        const townName = this.state.town;
         const sources =this.state.sources;
         const weather_state_in_day = this.state.resultsb; 
        return(
            <> 
            <Link to="/" >search weather in other location</Link>
<hr></hr>
{townName}
<br></br>
  
<div>
{
            data1===true && data2===true ?   
            

                weather_state.map( weather => 

                    date===weather.applicable_date?
                    
                    <div class="pos"> 
                    <table key={weather.id}>
                <tr>
                <th><b>Day:{weather.applicable_date}</b></th>   
                </tr> 
                <tr key={weather.id}>
                 <lu class="showSt" key={weather.id}> 
                      
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
                </table>
                 
                </div>: <p></p>
    )
             
              
            : <p>.........</p> 
            } 


</div>

<div class="sourcespos">

{
            data1===true && data2===true ? 
            <div>  
            <h3>sources</h3>
            <lu class="showSt"  > 
            {
            
            sources.map( source =>                
                  
                      
                     <li onClick={()=>window.location.assign(`${source.url}`)}>title:{source.title} </li>
                           
                   
    )   }</lu> </div>
             
              
            : <p>.........</p> 
            }  

</div> 















<div class="sourcespos">

{
            data1===true && data2===true ? 
            <div>  
            <h3>weather_state_in_day</h3> 
            <div class="container">
            {
            
            weather_state_in_day.map( source =>                
                <div class="row">
    <div class="col-sm">
                <lu class="pos" key={source.id}> 
                <li> weather_state_name:{source. weather_state_name} </li> 
                <li>max_temp:{source.max_temp} </li>
                <li>min_temp:{source.min_temp} </li> 
                <li>wind_speed:{source.wind_speed}</li>
                 
               </lu></div></div>
                           
                   
    )   } </div>
    </div>
             
              
            : <p>.........</p> 
            }  

</div> 








        
        </>);
    }

}