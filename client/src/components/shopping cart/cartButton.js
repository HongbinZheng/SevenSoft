import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const styles = theme => ({
  badge: {
    top: 20,
    right: 0,
    height:20,
    width:20,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
});

function CustomizedBadge(props) {
  const { classes } = props;

  return (
    <IconButton aria-label="Cart" style={{left:-13,bottom:10}}>
      <Badge badgeContent={props.qty} color="primary" classes={{ badge: classes.badge }}>
        <ShoppingCartIcon style={{height:40,width:40}}/>
      </Badge>
    </IconButton>
  );
}

CustomizedBadge.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedBadge);