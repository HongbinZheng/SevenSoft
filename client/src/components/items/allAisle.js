import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
const styles = theme => ({
  root: {
    height: 180,
  },
  container: {
    display: 'flex',
    textAlign:'center',
  },
  paper: {
    margin: theme.spacing.unit,
  },
  typography: {
    useNextVariants: true,
  },
});

const aisle =['Beverages','Dairy','Meats','Produce','Snacks']

class AllAisle extends React.Component {
  state = {
    checked: true,
  };

  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  render() {
    const { classes } = this.props;
    const { checked } = this.state;
    var count = 0;
    return (
      <div className={classes.root} >
      <div className="container-fluid" style={{minHeight:window.innerHeight-245, marginTop:'54px'}}>
        <div className={classes.container}>
          {aisle.map(items => {
            count = count + 200;
                    return (
                        <Grow
                            in={checked}
                            style={{ transformOrigin: "0 0 0" }}
                            {...(checked ? { timeout: 1000 + count } : {})}
                        >
                            <Paper elevation={4} className={classes.paper}>

                                <div key={items.key} className='rounded' style={{border: '1px solid #C2C2C2', display: "inline-block" }}>
                                <Link to={`/aisle/${items}`}>
                                    <div className='card' style={{ width: '15rem', height: '20rem' }} >
                                            <img className='card-img-top' style={{ width: '318px', height: '212.28px' }} src={`/images/aisle/${items}.png`} alt='Card cap'></img>
                                            <div className='card-body'>
                                                <h2 className='card-title' style={{ textAlign: 'center', height: '50px', color: '#708090', marginTop: '20px' }}>{items}</h2>
                                                </div>
                                        </div>
                                </Link>
                                </div>

                            </Paper>
                        </Grow>
                    );
          })}
        </div>
        </div>
      </div>
    );
  }
}

AllAisle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllAisle);