import React, { Component } from 'react';
import {  withStyles  } from '@material-ui/styles';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


const styles = {
   picker : {
       width : '270px !important',
       marginTop : '1rem'
   },
   addColor : {
       width: '100%',
       marginTop : '2.5rem',
       padding : '.7rem'
   },
   colorInput : {
     width: '100%',
     height: '30px'
   }
}

class ColorPickerForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentColor : 'teal',
            newColorName : '',
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        ValidatorForm.addValidationRule('isColorNameUniq', value =>
            this.props.colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
        );
        ValidatorForm.addValidationRule('isColorUniq', value =>
            this.props.colors.every(({ color }) => color !== this.state.currentColor )
        );
    };

    updateCurrentColor(newColor){
        this.setState({
            currentColor : newColor.hex
        })
    }
   
    handleChange(evt){
        this.setState({
            [evt.target.name] : evt.target.value
        })
    }

    handleSubmit(){
        const newColor = {
            color : this.state.currentColor,
            name : this.state.newColorName
        }
        this.props.addNewColor(newColor);
        this.setState({ newColorName : ''})
    }
    render(){
        const { paletteIsFull, classes } = this.props;
        const { currentColor, newColorName } = this.state;
        return ( 
            <div>
               <ChromePicker 
                color={currentColor} 
                onChangeComplete={this.updateCurrentColor}
                className={classes.picker}
                />
                  <ValidatorForm onSubmit={this.handleSubmit} ref='form' instantValidate={false}>
                     <TextValidator 
                      placeholder='Color Name'
                      value={newColorName} 
                      className={classes.colorInput}
                      name="newColorName"
                      margin='normal'
                      variant='filled'
                      onChange={this.handleChange}
                      validators={['required','isColorNameUniq', 'isColorUniq']}
                      errorMessages={['enter a color name','color name must be uniq', 'color already used!']}
                      />
                     <Button type='submit' 
                        variant='contained' 
                        color='primary' 
                        style={{backgroundColor : currentColor}}
                        disabled={paletteIsFull}
                        className={classes.addColor}
                        >
                        {paletteIsFull ? 'palette is full' : 'add color'}
                 </Button>
                  </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);