import React, { Component } from 'react';
import * as d3 from 'd3';

import './App.css';

const data = [
  { name: 'Alice', math: 93, science: 84 },
  { name: 'Bobby', math: 81, science: 97 },
  { name: 'Carol', math: 74, science: 88 },
  { name: 'David', math: 64, science: 76 },
  { name: 'Emily', math: 80, science: 94 }
]

class App extends Component {
  state = { subject: 'math' }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">D3 Playground</h1>
        </header>
        <div id="chart"></div>
        <button onClick={() => this.handleClick('math')}>Math</button>
        <button onClick={() => this.handleClick('science')}>Science</button>
      </div>
    );
  }
  componentDidMount() {
    this.draw()
  }
  componentDidUpdate() {
    // d3.select('#chart') // within the #chart container... 
    //   .selectAll('div') // select all the divs 
    //   .remove()         // and remove them, clearing the #chart div 
    this.draw()
  }
  handleClick = (subject) => {
    this.setState({ subject })
  }
  draw = () => {
    // d3.select('#chart')
    //   .selectAll('div')
    //   .data(data, d => d.name) // pair each number in the array with an empty div 
    //   .enter()
    //   .append('div')
    //   .attr('class', 'bar') // color, height, and spacing via CSS 
    //   .transition() // animate everything that comes after this line! 
    //   .style('width', d => {
    //     return d[this.state.subject] + 'px' // use the subject passed in to grab the correct property  
    //   })
    
    // store a reference to the bars already on the chart 
    const bars = d3.select('#chart')
      .selectAll('div') // this won't be empty after the first time this function runs 
      .data(data, d => {
        return d.name // use the name property to match across updates 
      })

    const newBars = bars.enter() // use the enter selection 
      .append('div') // to add new bars for any data items without an existing DOM element 
      .attr('class', 'bar')
      .style('width', 0) // set the initial width to 0 

    // combine the selections of new and existing bars 
    // so you can act on them together 
    newBars.merge(bars)
      .transition() // animate everything that comes after this line! 
      .style('width', d => {
        return d[this.state.subject] + 'px' // set the width like normal! 
      })
  }
}

export default App;
