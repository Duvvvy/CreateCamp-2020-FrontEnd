import React, { useState, useEffect } from 'react';
import LocalisedButton from '../components/buttons/LocalisedButton';
import axios from 'axios';

export function SentenceContainer() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);


  useEffect(() => {
    axios.get(`http://localhost:3000/api/`, {
        params: {
            lon: '174.764993',
            lat: '-36.899587',
        }}).then(function(response){
            setData(response.data)
            setCount(randomInt(response.data.length - 1))
        }
    );
  },[])

  function randomInt(length){
    return Math.floor(Math.random() * length);
  }

  if(data && data.length > 0){
    return (
        <div>
          <div>
            <big>Why not try</big> <br/>
            {data[count].name} at <br/>
            {data[count].address},<br/>
            <i>{data[count].tags}</i> <br/> 
            they are only {"minutes away"} <br/>
          </div>
        
        <div>
          
          {/* Yes Button */}
          <LocalisedButton    
            LocalSlang={
                [
                    "Sweet as!",
                    "Lesh go!",
                    "ya yeet!",
                    "Choice",
                    "Āe",
                    "Yea!",
                    "Keen as",
                    "Lets get it",
                    "Aight then",
                    "heck yea",
                    "I want it",
                    "Love it",
                    "Aye aye, captain!",
                    "Yes, yes, and yes!",
                    "Straight up g!",
                    "Deal!",
                    "Chur bro"
                ]
            }
            onClick={() => console.log("yes option not yet implemented")}
          />

          {/* No Button */}
          <LocalisedButton    
              LocalSlang={
                  [
                      "Nah g",
                      "Not the play",
                      "ceebs",
                      "Gap it",
                      "Not even"
                  ]
              }
              onClick={() => setCount(randomInt(data.length - 1))}
          />
        </div>
         
         
    </div>
  );
  }else{
    return(
      <div>unluggy uce no locations near you. Don't pack a sad, try us out again when you are closer to town! <span role="img" aria-label="sad face">😭</span></div>
    )
  }
}