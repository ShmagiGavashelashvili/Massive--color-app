import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';


class PaletteMetaForm extends Component {
    constructor(props){
        super(props);
        this.state = { stage: 'form', newPaletteName: '', open: false }
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
    }
    componentDidMount(){
        ValidatorForm.addValidationRule('isPaletteNameUniq', value =>
            this.props.palettes.every(({ paletteName }) => 
            paletteName.toLowerCase() !== value.toLowerCase())
        );
    }
    
    handleChange(evt){
        this.setState({
            [evt.target.name] : evt.target.value
        })
    }

     handleClickOpen = () => {
        this.setState({ open: true })
      };
    
    handleClose = () => {
        this.setState({ open: false })
     };
    
     showEmojiPicker(){
         this.setState({ stage : 'emoji'})
     }

     savePalette(emoji){
         const newPalette = {
             paletteName : this.state.newPaletteName,
             emoji : emoji.native
         };
         this.props.handleSubmit(newPalette);
         this.setState({ stage : ''})
     }
 
    render(){
        const { stage, newPaletteName, open } = this.state;
        return (
            <div>
                 <Dialog open={stage === 'emoji'} onClose={this.handleClose}>
                 <DialogTitle id="form-dialog-title">Choose a Palette emoji</DialogTitle>
                   <Picker onSelect={this.savePalette} 
                    title='Pick your emoji…'
                   />
                 </Dialog>
               <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                      save palette
                </Button>
                <Dialog open={stage === 'form' && open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                 <ValidatorForm onSubmit={this.showEmojiPicker}>
                    <DialogTitle id="form-dialog-title">Choose a Palette name</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Please enter a name for your beautiful palette. make sure name is unique!
                    </DialogContentText>
                      <TextValidator 
                        label='palette name'
                        value={newPaletteName} 
                        onChange={this.handleChange}
                        name='newPaletteName'
                        validators={['required','isPaletteNameUniq']}
                        errorMessages={['enter a palette name', 'palette name already used']}
                      />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type='submit' variant="contained" color="primary">
                      save
                    </Button>
                    </DialogActions>
                    </ValidatorForm >
                </Dialog>
            </div>
        )
    }
}

export default PaletteMetaForm;