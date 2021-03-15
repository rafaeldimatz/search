import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%'
  },
  cancel: {
    textAlign: 'end'
  }
});

export default function MediaCard(props) {
  const classes = useStyles();
  const time = props.time;
  const date = props.date;
  const name = props.name;

  const removeCountryId = (id) => {
    props.delete(id);
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>

        <div className={classes.cancel}><CancelIcon onClick={() => removeCountryId(props.id)} /></div>
        <Typography gutterBottom variant="subtitle1" component="p">
          {name}
        </Typography>
        <Typography gutterBottom variant="subtitle5" component="p">
          {date}
        </Typography>
        <Typography variant="subtitle5" color="textSecondary" component="p">
          {time}
        </Typography>

      </CardActionArea>
    </Card>
  );
}