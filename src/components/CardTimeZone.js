import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    background: '#bbe6f4',
    borderRadius: '20px',
  },
  cancel: {
    paddingLeft: '340px'
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
      <CardActions>
        <CancelIcon onClick={() => removeCountryId(props.id)} className={classes.cancel} />
      </CardActions>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {date}
        </Typography>
        <Typography variant="body2" component="p">
          {time}
        </Typography>
      </CardContent>
    </Card>
  );
}
