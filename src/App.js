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
    d3.select('#chart') // within the #chart container... 
      .selectAll('div') // select all the divs 
      .remove()         // and remove them, clearing the #chart div 
    this.draw()
  }
  handleClick = (subject) => {
    this.setState({ subject })
  }
  draw = () => {
    d3.select('#chart')
      .selectAll('div')
      .data(data) // pair each number in the array with an empty div 
      .enter()
      .append('div')
      .attr('class', 'bar') // color, height, and spacing via CSS 
      .style('width', d => {
        return d[this.state.subject] + 'px' // use the subject passed in to grab the correct property  
      })
  }
}

export default App;
