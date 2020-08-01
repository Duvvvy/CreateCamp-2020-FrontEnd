import React, { useState, useEffect } from 'react';
import LocalisedButton from '../components/buttons/LocalisedButton';
import axios from 'axios';
import  "./SentenceContainers.css";

export function SentenceContainer() {
  const [suggestion, setSuggestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  function getData() {
    setSuggestion(null);
    setIsLoading(true)
    console.log('Getting data');
    axios.get(`https://desolate-forest-34729.herokuapp.com/api?`, {
      params: {
          lon: '174.764993',
          lat: '-36.899587',
      }}).then(function(response){
         setIsLoading(false);
         console.log(response)
         if(response.data.data.length > 0) {
           setSuggestion(response.data.data[0]);
         } 
         if(!Array.isArray(response.data.data)) { //api bug 
           setSuggestion(response.data.data);
         }
      }
  )
  }

  useEffect(() => {
    getData();
  },[])

  function randomInt(length){
    return Math.floor(Math.random() * length);
  }


  if(suggestion){
    return (
        <div className = "sentenceContainer">
          <div className = "wholeSentenceText">
            <span className = "sentenceText">Why not try </span>
            <span className = "sentenceText"><a href={suggestion.zenbulink}> {suggestion.name} </a> </span>
            </div>

            <div>
            {/* <p className = "sentenceText">{suggestion[count].address},</p> */}
            <p className = "sentenceText"><i>{suggestion.tags}</i></p> 
            <p className = "sentenceText">they are only {suggestion.distance} km away</p>
          </div>

        <div>
        <p className="">Price: {suggestion.price}</p>
    <p className="">Rating: {suggestion.rating}</p>
        </div>

          <div className = "yesNoButtons"> 

          {/* Yes Button */}
          <div className="row justify-content-center"><LocalisedButton className = "Yes"
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
          
          
          <LocalisedButton className = "No"
          LocalSlang={
          [
          "Nah g",
          "Not the play",
          "ceebs",
          "Gap it",
          "Not even"
          ]
          }
          onClick={() => getData()}
          
          /></div>
          </div>
    </div>

  );
  } else if( isLoading ) {
    return <p>Loading...</p>
  }
    else{
    return(
      <div>unluggy uce no locations near you. Don't pack a sad, try us out again when you are closer to town! <span role="img" aria-label="sad face">😭</span></div>
    )
  }
}