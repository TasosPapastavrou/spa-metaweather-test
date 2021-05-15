import React from 'react';
import axios from 'axios';
import ShowLocation from './showResults';
import ShowWeatherLocation from './showWeatherLocation'; 
import './showData.css';
export default class SearchBar extends React.Component{

    constructor(props){

        super(props)
        this.state={
            nameLoc:"",
            results:[]
        }
        this.setloc = this.stateloc.bind(this);
    }

    stateloc(e){ 
        const locationname= e.target.value;
         this.setState({nameLoc:locationname});
        
    }

    onClick(locationname){         
        axios.get(`https://www.metaweather.com/api/location/search/?query=${locationname}`).then(res=>{
        this.setState({results:res.data});  
        });
         
   

    }



    render(){
         
      const locationname = this.state.nameLoc;
        const listLoc = this.state.results; 
        return(
            <>
            <div class="searchbarS"> 
          <input type="search" id="form1" class="form-control" placeholder="Search" onChange={(e)=>this.stateloc(e)}   />
          
       
        <button type="button" onClick={()=>this.onClick(locationname)} >
          <i class="fas fa-search">Search</i>
        </button>
      </div>

 {listLoc.length===1 ?<ShowWeatherLocation results={listLoc}/>:<ShowLocation results={listLoc}/>}
   
      </>
      );

        }



}