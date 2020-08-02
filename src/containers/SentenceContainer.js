import React, { useState, useEffect, Fragment } from 'react';
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

  // function randomInt(length){
  //   return Math.floor(Math.random() * length);
  // }

  function getMapToDestination(){
    return "https://www.google.com/maps/search/?api=1&query=" + suggestion.latitude + "," + suggestion.longitude
  }

  return (
      <div className = "sentenceContainer">
        {(suggestion && !isLoading) && 
          <Fragment>
        <div className = "wholeSentenceText">
          <span className = "niceSentenceText">Why not try </span> <br></br>
          <span className = "angrySentenceText"><a style={{color: "black"}} href={suggestion.zenbulink} styles="color: inherit"> {suggestion.name} </a> </span>
          </div>

          <div>
          {/* <p className = "sentenceText">{suggestion[count].address},</p> */}
          {/* <p className = "sentenceText"><i>{suggestion.tags}</i></p>  */}
          <p className = "niceSentenceText">they are only {suggestion.distance} km away</p>
        </div>

      <div>
      <div className="mediumSentenceText">Price: <span className="smallerSentenceText">{`${'$ '.repeat(parseInt(suggestion.price))}`}</span></div>
      <div className="mediumSentenceText">Rating: <span className="smallerSentenceText">{`${'⭐️ '.repeat(parseInt(suggestion.rating))}`}</span></div>
      </div>

        <div className = "yesNoButtons"> 

        {/* Yes Button */}
        <div className="row justify-content-center">
          <LocalisedButton 
          href={getMapToDestination()}
          className = "Yes"
        LocalSlang={
        [
        "Sweet as!",
        "Lesh go!",
        "ya yeet!",
        "Choice",
        "Āe   ",
        "Yea!",
        "Keen as",
        "Get it",
        "Aight",
        "heck yea",
        "I want it",
        "Love it",
        "Straight up",
        "Deal!",
        "Chur bro"
        ]
        }
        onClick={() => window.open(getMapToDestination())}
        />
        
        {/* No Button */}
        
        
        <LocalisedButton className = "No"
        LocalSlang={
        [
        "Nah g",
        "Not the play",
        "ceebs",
        "Gap it",
        "Not even",
        "Nah cuz",
        "not swag",
        "not a fan"
        ]
        }
        onClick={() => getData()}
        
        /></div>
        </div>
        </Fragment>
        } 
        {(suggestion == null && isLoading)&&
        <>
          <p className="mediumSentenceText">Finding local businesses</p>
            <div size="lg" class="spinner-border" role="status">
              <span animation="grow" size="lg" class="sr-only">Loading...</span>
            </div>
        
        </>
          
        }
        {(suggestion == null && !isLoading) && 
          <p className="mediumSentenceText">unluggy uce no locations near you. Don't pack a sad, try us out again when you are closer to town! <span role="img" aria-label="sad face">😭</span></p>
        }
      </div>
  );

}