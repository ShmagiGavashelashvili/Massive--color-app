import React, { Component } from 'react';
import classNames from "classnames";
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import {arrayMove} from 'react-sortable-hoc';
import seedColors from './seedColors';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import styles from './styles/newPaletteFormStyles';



class NewPaletteForm extends Component {
  static defaultProps = {
     maxPalette : 20
  }
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        colors : seedColors[0].colors,
        newPaletteName : ''
      };
      this.addNewColor = this.addNewColor.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.removeColor = this.removeColor.bind(this);
      this.clearPalette = this.clearPalette.bind(this);
      this.randomColor = this.randomColor.bind(this);
    };
   
    handleDrawerOpen = () => {
      this.setState({ open: true });
    };
  
    handleDrawerClose = () => {
      this.setState({ open: false });
    };
   
    clearPalette(){
      this.setState({
        colors : []
      })
    }
    randomColor(){
      const allColors = this.props.palettes.map(p => p.colors).flat();
      let isDuplicateColors = true;
      while(isDuplicateColors){
         isDuplicateColors = this.state.colors.some(color => color.name === allColors[ Math.floor(Math.random() * allColors.length)].name)
      }
      this.setState({
        colors : [...this.state.colors, allColors[ Math.floor(Math.random() * allColors.length)]]
      });
    }
    addNewColor(newColor){
        this.setState({ colors: [...this.state.colors, newColor], newColorName: ''})
    }

    handleChange(evt){
        this.setState({
            [evt.target.name] : evt.target.value
        })
    }
    handleSubmit(newPalette){
      newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g,'-');
      newPalette.colors = this.state.colors;
      this.props.savePalette(newPalette);
      this.props.history.push('/');
    }

    removeColor(name){
      this.setState({
        colors : this.state.colors.filter(color => color.name !== name)
      })
    }

    onSortEnd = ({oldIndex, newIndex}) => {
      this.setState(({colors}) => ({
        colors: arrayMove(colors, oldIndex, newIndex),
      }));
    }
  render(){
        const { classes, maxPalette, palettes } = this.props;
        const { open, colors } = this.state;
        const paletteIsFull = colors.length >= maxPalette;
     return (
            <div className={classes.root}>
              <PaletteFormNav 
                classes={classes}
                open={open}
                palettes={palettes}
                handleSubmit={this.handleSubmit}
                handleDrawerOpen={this.handleDrawerOpen}
              />
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                paper: classes.drawerPaper,
                }} >
                <div className={classes.drawerHeader}>
                <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon /> 
                </IconButton>
                </div>
                <Divider />
                <div className={classes.container}>
                <Typography variant='h4' gutterBottom>
                    Design Your Palette
                </Typography>
                <div classNames={classes.buttons}>
                 <Button variant="contained" color="secondary" onClick={this.clearPalette}>
                    clear Palette
                 </Button>
                 <Button variant="contained" color="primary" 
                    onClick={this.randomColor} 
                    disabled={paletteIsFull}>
                      {paletteIsFull ? 'palette is full' : 'random color'}
                 </Button>
                </div>
                  <ColorPickerForm 
                  paletteIsFull={paletteIsFull}
                  addNewColor={this.addNewColor}
                  colors={colors}
                  />
                  </div>
             </Drawer>
            <main
                className={classNames(classes.content, {
                [classes.contentShift]: open,
                })} >
                <div className={classes.drawerHeader} />
                    <DraggableColorList 
                     colors={colors} 
                     removeColor={this.removeColor}
                     axis='xy'
                     onSortEnd={this.onSortEnd}
                     distance={20}
                     />
            </main>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true })(NewPaletteForm);