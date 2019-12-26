import React from 'react'
import PropTypes from 'prop-types'

import { line } from './Console.module.css'

class ConsoleLine extends React.Component {
  constructor (props) {
    super(props)
    this.state = (!props.typed && props.delay === 0)
      ? { print: props.text }
      : { print: '', toPrint: props.text }
  }

  componentDidMount () {
    const { delay, typed } = this.props

    if (delay > 0 || typed) {
      const executePrinting = (typed)
        ? () => {
          const timer = setInterval(() => {
            if (this.state.toPrint.length > 0) {
              this.printCharacter()
            } else {
              clearInterval(timer)
            }
          }, 50)
        }
        : () => {
          this.setState({
            print: this.state.toPrint,
            toPrint: ''
          })
        }

      setTimeout(executePrinting, delay)
    }
  }

  printCharacter = () => {
    const { print, toPrint } = this.state

    const printNext = `${print}${toPrint.slice(0, 1)}`
    const toPrintNext = toPrint.slice(1, toPrint.length)

    this.setState({
      print: printNext,
      toPrint: toPrintNext
    })
  }

  render () {
    return (
      <div className={line}>
        {`${(this.props.byUser) ? '$' : ''}  ${this.state.print}`}
      </div>
    )
  }
}

ConsoleLine.defaultProps = {
  text: '',
  typed: false,
  byUser: false,
  delay: 0
}

ConsoleLine.propTypes = {
  text: PropTypes.string,
  typed: PropTypes.bool,
  delay: PropTypes.number,
  byUser: PropTypes.bool
}

export default ConsoleLine
