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
const margin = { top: 10, right: 10, bottom: 20, left: 50 }
// specify chart dimensions 
const width = 600 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

// create a scale to map scores to bar widths 
// test scores are stored as percentages 
// a score of 100 should create a full-width bar 
const xScale = d3.scaleLinear()
  .domain([0, 100])
  .range([0, width])
const yScale = d3.scaleBand()
  .domain(data.map(function (d) { return d.name }))
  .range([0, height])

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
    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .style('position', 'absolute')
      .style('top', 115)
      .style('left', 0)
    
    const axisContainer = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    axisContainer.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))

    axisContainer.append('g')
      .call(d3.axisLeft(yScale))
  }
  componentDidUpdate() {
    this.draw()
  }
  handleClick = (subject) => {
    this.setState({ subject })
  }
  draw = () => {
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
      .style('width', d => {
        // pass the score through the linear scale function 
        return xScale(d[this.state.subject]) + 'px'
      })
      .style('height', d => yScale.bandwidth() - 2 + 'px')
  }
}

export default App;
