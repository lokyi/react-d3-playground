import React, { Component } from 'react';
import * as d3 from 'd3';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">D3 Playground</h1>
        </header>
        <div id="chart"></div>
      </div>
    );
  }
  componentDidMount() {
    const data = [90, 70, 50, 30, 10]
    this.setState({ data })
  }
  componentDidUpdate() {
    d3.select('#chart')
      .selectAll('div')
      .data(this.state.data) // pair each number in the array with an empty div 
      .enter()
      .append('div')
      .attr('class', 'bar') // color, height, and spacing via CSS 
      .style('width', function (d) {
        return d + 'px' // use the data items as pixel widths 
      })
  }
}

export default App;
