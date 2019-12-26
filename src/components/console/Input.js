import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { printError } from '../../state/console/actions'
import { inputLine, inputField, inputFieldText, highlight } from './Console.module.css'

class ConsoleInput extends React.Component {
  state = {
    value: ''
  }

  handleKeyDown = (event) => {
    this.input.setSelectionRange(event.target.value.length, event.target.value.length)
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value.toLowerCase() })
  }

  handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      const input = this.state.value.trim().split(' ')
      switch (input[0]) {
        case 'cd':
          console.log('cd')
          break
        case 'ls':
          console.log('ls')
          break
        case 'open':
          console.log('open')
          break
        default:
          this.props.printError(`'${input[0]}': command not found`)
      }
      this.setState({ value: '' })
    }
  }

  render () {
    const { path } = this.props
    const { value } = this.state
    return [
      <input
        key='input'
        value={value}
        onChange={this.handleChange}
        className={inputField}
        ref={(ref) => { this.input = ref }}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleEnterPress}
      />,
      <div
        className={inputLine}
        key='output'
      >
        {'user@synus.arc:'}
        <span className={highlight}>
          {path}
        </span>
        {'$ '}
        <span className={inputFieldText}>{value}</span>
      </div>
    ]
  }
}

ConsoleInput.propTypes = {
  path: PropTypes.string.isRequired
}

const mapDispatchToProps = {
  printError
}

export default connect(null, mapDispatchToProps)(ConsoleInput)
