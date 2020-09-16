import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './newPaletteForm';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))
    this.state = { palettes:  savedPalettes || seedColors};
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  findPalette(id){
    return this.state.palettes.find(plt => plt.id === id);
  }
  deletePalette(id){
    this.setState(st => ({
      palettes: st.palettes.filter(plt => plt.id !== id)
    }), () => {
      window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
    })
  }
  savePalette(newPalette){
    this.setState({
      palettes : [...this.state.palettes, newPalette ]
    }, () => {
     window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
    })
  }

  render(){
    
    return (
      <Route render={({location}) => 
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='fade' timeout={500}>
              <Switch location={location}>
                <Route exact path='/palette/new' 
                  render={routeProps => 
                    <div className='page'>
                        <NewPaletteForm 
                        palettes={this.state.palettes} 
                        savePalette={this.savePalette} 
                        {...routeProps}/>
                    </div>}
                  />
                <Route exact path='/' render={routeProps => 
                  <div className='page'>
                    <PaletteList deletePalette={this.deletePalette} palettes={this.state.palettes} {...routeProps}/>
                  </div>}/>
                <Route exact path='/palette/:id' 
                  render={routeProps => (
                    <div className='page'>
                    <Palette  palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>
                    </div>
                    )}
                  />
                  <Route exact path='/palette/:paletteId/:colorId' 
                  render={routeProps =>  
                    <div className='page'>
                    <SingleColorPalette  
                      palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
                      colorId={routeProps.match.params.colorId}
                      />
                      </div> }/>
                      <Route render={routeProps => 
                        <div className='page'>
                          <PaletteList deletePalette={this.deletePalette} palettes={this.state.palettes} {...routeProps}/>
                       </div>}/>
              </Switch>
            </CSSTransition>
        </TransitionGroup>
      }/>
    );
  }
}

export default App;
