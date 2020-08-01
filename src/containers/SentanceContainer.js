import React, { useState, useEffect } from 'react';
import LocalisedButton from '../components/buttons/LocalisedButton';
import axios from 'axios';

export function SentanceContainer() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);


  useEffect(() => {
    axios.get(`https://desolate-forest-34729.herokuapp.com/api/`, {
        params: {
            lon: '174.764993',
            lat: '-36.899587',
        }}).then(function(response){
            setData(response.data)
            console.log(response)
        }
    );
  },[])
    
  var divStyles = {
    display: 'flex',
    flexwrap: 'wrap',
    margintop: '10px',
    backgroundcolor: 'inherit',
    marginright: '20px'
  }

  if(data && data.length > 0){
    return (
        <div style={divStyles}>
        {/* <p>Why not try {companyName} @ {address}</p>  */}
        <p>Why not try  </p>
        <br/>{data[count].name}
        <br/>{data[count].address}
         {/* Yes Button */}
         <LocalisedButton    
            LocalSlang={
                [
                    "Sweet as!",
                    "Lesh go!",
                    "ya yeet!"
                ]
            }

            onClick={
                () => setCount(count + 1)
            }
        />


        {/* No Button */}
        <LocalisedButton    
            LocalSlang={
                [
                    "Nah g",
                    "Not the play",
                    "ceebs"
                ]
            }

            onClick={
                () => setCount(count + 1)
            }
        />
    </div>
  );
  }else{
    return(
      <div>unluggy uce no locations near you <span role="img" aria-label="sad face">😭</span></div>
    )
  }
}