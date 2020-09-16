import React, { Component } from 'react';
import ColorBox from './ColorBox';

import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { withStyles } from '@material-ui/styles';
import styles from './styles/paletteStyles';

class Pallete extends Component {
    constructor(props){
        super(props);
        this.state = { level : 500, format: 'hex' }
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeLevel(level){
        this.setState({ level })
    }
    changeFormat(val){
      this.setState({ format : val })
    }
    render(){
       
        const { colors, emoji, paletteName, id } = this.props.palette;
        const { classes } = this.props;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(bx => (
            <ColorBox 
                key={bx.id} 
                background={bx[format]} 
                id={bx.id} 
                name={bx.name} 
                paletteId={id}
                showLink={true}
            />
        ))
        return(
            <div className={classes.palette}>
                <Navbar 
                level={level} 
                changeLevel={this.changeLevel}
                handleChange={this.changeFormat}
                showingAllColors
                />
               <div className={classes.colors}>
                   {/* bunch of color boxes */}
                   {colorBoxes}
               </div>
                <PaletteFooter 
                  paletteName={paletteName}
                  emoji={emoji}
                />
            </div>
        )
    }
}

export default withStyles(styles)(Pallete);