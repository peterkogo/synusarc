import React from 'react'
import { connect } from 'react-redux'
import interact from 'interactjs'

import { resize } from './state/dimensions/actions'

import './App.css'

import Console from './components/console/Console'

class App extends React.Component {
  state = {
    level: 0
  }

  componentDidMount () {
    window.addEventListener('resize', this.props.resize)
    interact('#test').gesturable({
      onmove: (event) => {
        this.setState({
          level: this.state.level + event.da * 0.8
        })
      }
    })
  }

  render () {
    return (
      <div
        id='App'
        style={{
          touchAction: 'none',
          overflow: 'hidden',
          background: 'black'
        }}
        onClick={() => { this.setState({ level: this.state.level + 1 }) }}
      >
        <Console
          level={this.state.level}
          display
          transitioning
          dispatch={() => {}}
        />
      </div>
    )
  }
}

const mapDispatchToProps = {
  resize
}

export default connect(null, mapDispatchToProps)(App)
