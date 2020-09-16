import React, { Component } from 'react';
import Slider from 'rc-slider';
import { Link } from 'react-router-dom';
import 'rc-slider/assets/index.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/styles';
import styles from './styles/navbarStyles';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = { format : 'hex', open: false }
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleChange(e){
        this.setState({ format : e.target.value, open: true})
        this.props.handleChange(e.target.value);
    }
    handleClose(){
        this.setState({ open: false })
    }
    render(){
        const { level, changeLevel, showingAllColors, classes } = this.props;
        const { format, open } = this.state;
        return(
            <header className={classes.Navbar}>
                 <div className={classes.NavbarLogo}>
                     <Link to="/">reactcolorpicker</Link>
                 </div>
                 {showingAllColors && <div>
                    <span>Level : {level}</span>
                   <div className={classes.slider}>
                   <Slider 
                        defaultValue={level} 
                        min={100} 
                        max={900}
                        step={100}
                        onAfterChange={changeLevel}
                    />
                   </div>
                 </div>}
                 <div className={classes.selectSlider}>
                     <Select onChange={this.handleChange} value={format}>
                         <MenuItem value='hex'>hex</MenuItem>
                         <MenuItem value='rgb'>rgb</MenuItem>
                         <MenuItem value='rgba'>rgba</MenuItem>
                     </Select>
                 </div>
                 <Snackbar 
                   anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                   open={open}
                   autoHideDuration={3000}
                   message={`format changed to: ${ format.toUpperCase() }`}
                   onClose={this.handleClose}
                   action={[
                       <IconButton size="small" aria-label="close" onClick={this.handleClose}>
                           <CloseIcon/>
                       </IconButton>
                   ]}
                 />
            </header>
        )
    }
}

export default withStyles(styles)(Navbar);



