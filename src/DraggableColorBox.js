import React from 'react';
import { withStyles } from '@material-ui/styles';
import {SortableElement} from 'react-sortable-hoc';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/DraggableColorBoxStyles';


const DraggableColorBox = SortableElement((props) =>{
    const { classes, color, name, removeColor } = props;
    return (
        <div className={classes.root} style={{backgroundColor: color}}>
            <div className={classes.boxName}>
               <span>{name}</span>
               <DeleteIcon className={classes.icon} onClick={removeColor}/>
            </div>
        </div>
    )
})

export default withStyles(styles)(DraggableColorBox);