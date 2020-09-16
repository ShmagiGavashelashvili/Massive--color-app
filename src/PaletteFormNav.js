import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles'; 
import classNames from "classnames";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import PaletteMetaForm from './PaletteMetaForm';


const styles = theme => ({
   root : {
       display : 'flex'
   },
   navBtns : {
       display: 'flex'
   },
   button : {
       margin: '0 .5rem'
   },
   link : {
       textDecoration : 'none'
   },
   navbarName: {
       float : 'left'
   }
});

class PaletteFormNav extends Component {
    constructor(props){
        super(props);
        this.state = { newPaletteName : ''}
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(evt){
        this.setState({
            [evt.target.name] : evt.target.value
        })
    }
    render(){
         const { classes, open, handleSubmit, handleDrawerOpen, palettes } = this.props;
        return ( <div className={classes.root}>
             <CssBaseline />
              <AppBar
                position="fixed"
                color='default'
                className={classNames(classes.appBar, {
                [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={classNames(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                 </IconButton>
                 <Typography className={classes.navbarName} variant="h6" noWrap>
                    Create Palette
                  </Typography>
                 </Toolbar>
                <div className={classes.navBtns}>
                     <Link to='/' className={classes.link}>
                        <Button type='submit' variant="contained" color="secondary" className={classes.button}>
                          go back 
                       </Button>
                     </Link>
             <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit}/>
                    </div>
              </AppBar>
        </div>)
    }
}

export default withStyles(styles)(PaletteFormNav);