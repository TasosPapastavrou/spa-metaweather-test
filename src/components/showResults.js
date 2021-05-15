 
import history from './history';

import React from 'react';

 

export default class ShowLocation extends React.Component{

  constructor(props){
    super(props) 
     
  }

onClickF(woeid){   
     history.push(`/location/${woeid}`)
    window.location.reload();     
}
 
  render(){
  const  results = this.props.results;
  
    return(

      <> 
      <div class="viewStyle">
       <h3>Results</h3>
      <lu> 
       {
       results.map(result => 
           
          <li><button onClick={()=>this.onClickF(result.woeid)}>{result.title}</button></li>
          
         )
         }
         </lu>
          
         </div>         
      </>

);
  }


}