import React from 'react';
import Button from '@material-ui/core/Button';

function randomInt(length){
  var random = Math.random();
  var output = Math.floor(random * length);
  return output
}

export default function LocalisedButton({LocalSlang, onClick}) {

    if(LocalSlang && LocalSlang.length > 0){
      return (
       
       <div>
          <Button 
            display="inline" 
            style={{
              backgroundColor: "darkgrey",
              color: "white",
              fontSize: "50px",
              textAlign: "center",
            }}
            className="mx-5 my-5"
            onClick={onClick}>{LocalSlang[randomInt(LocalSlang.length)]}</Button>
        </div>
    );
    }else{
      return(
        <p className="mediumSentenceText">unluggy uce no locations near you <span role="img" aria-label="sad face">😭</span></p>
      )
    }
    
}