import React, { PureComponent }  from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/styles';
import styles from './styles/miniPaletteStyles';

class MiniPalette extends PureComponent {
    constructor(props){
        super(props);
        this.deletePalette = this.deletePalette.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    deletePalette(evt){
       evt.stopPropagation();
       this.props.openDialog(this.props.id);
    }
    handleClick(){
        this.props.goToPalette(this.props.id)
    }
    render(){
      const { classes, colors, paletteName, emoji } = this.props;
     return (
        <div className={classes.root} onClick={this.handleClick}>
             <DeleteIcon className={classes.deleteIcon} onClick={this.deletePalette}/>
            <div className={classes.colors}>
                {colors.map(color =>(
                   <div className={classes.miniColor} style={{backgroundColor: color.color}} key={color.name}></div> 
                ))}
            </div>
                <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
        </div>
    )
  }
}

export default withStyles(styles)(MiniPalette);


