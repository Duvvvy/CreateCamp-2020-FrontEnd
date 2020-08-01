import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function randomInt(length){
  var random = Math.random();
  var output = Math.floor(random * length);
  return output
}

export default function LocalisedButton({LocalSlang, onClick}) {
    const classes = useStyles();

    if(LocalSlang && LocalSlang.length > 0){
      return (
        <div className={classes.root}>
          <Button onClick={onClick}>{LocalSlang[randomInt(LocalSlang.length)]}</Button>
        </div>
    );
    }else{
      return(
        <div>unluggy uce no locations near you <span role="img" aria-label="sad face">😭</span></div>
      )
    }
    
}