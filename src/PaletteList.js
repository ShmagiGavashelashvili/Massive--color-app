import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from './styles/paletteListStyles';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

class PaletteList extends Component {
    constructor(props){
        super(props);
        this.state = {
            open : false,
            deleteId : ''
        }
        this.openDialog = this.openDialog.bind(this);
        this.cancelDialog = this.cancelDialog.bind(this);
        this.deletePalette = this.deletePalette.bind(this);
        this.goToPalette = this.goToPalette.bind(this);
    }
    goToPalette(id){
        this.props.history.push(`/palette/${id}`)
    }
    openDialog(id){
        this.setState({
            open : true,
            deleteId : id
        })
    }
    cancelDialog(){
        this.setState({
            open: false,
            deleteId : ''
        })
    }
    deletePalette(){
        this.props.deletePalette(this.state.deleteId);
        this.cancelDialog();
    }
    render(){
        const { palettes, classes, deletePalette } = this.props;
        const { open } = this.state;
        return(
            <div className={classes.root}>
                <div className={classes.container}>
                     <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                     </nav>
                    
                      <TransitionGroup className={classes.palettes}>
                      {palettes.map(palette => (
                          <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                        <MiniPalette 
                          key={palette.id} {...palette} 
                          goToPalette={this.goToPalette} 
                          id={palette.id}
                          deletePalette={deletePalette}
                          openDialog={this.openDialog}
                          />
                          </CSSTransition>
                       ))}
                       </TransitionGroup>
                </div>
                <Dialog open={open} aria-labelledby='delete-palette' onClose={this.cancelDialog}>
                     <DialogTitle id='delete-palette'> Delete This Palette? </DialogTitle>
                     <List>
                         <ListItem button onClick={this.deletePalette}>
                             <ListItemAvatar>
                                 <Avatar style={{backgroundColor : blue[100], color: blue[600]}}>
                                   <CheckIcon />
                                 </Avatar>
                             </ListItemAvatar>
                             <ListItemText>Delete?</ListItemText>
                         </ListItem>
                         <ListItem button onClick={this.cancelDialog}>
                             <ListItemAvatar>
                                 <Avatar style={{backgroundColor : red[100], color: red[600]}}>
                                   <CloseIcon />
                                 </Avatar>
                             </ListItemAvatar>
                             <ListItemText>Cancel</ListItemText>
                         </ListItem>
                     </List>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);
