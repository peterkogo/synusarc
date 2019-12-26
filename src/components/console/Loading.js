import React from 'react'
import PropTypes from 'prop-types'

import { line } from './Console.module.css'

class ConsoleLoading extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loadingBar: '',
      percent: 0,
      display: this.props.instant
    }
  }

  componentDidMount () {
    const {
      delay, speed, maxPercent, instant
    } = this.props
    const executeLoading = () => {
      this.setState({
        display: true
      })
      if (instant) {
        this.setState({
          percent: maxPercent,
          loadingBar: Array(this.loadingBarSize).join('#')
        })
      } else {
        const timer = setInterval(() => {
          if (this.state.percent !== maxPercent) {
            this.load()
          } else {
            clearInterval(timer)
          }
        }, speed)
      }
    }

    if (delay > 0) {
      setTimeout(executeLoading, delay)
    } else {
      executeLoading()
    }
  }

  load = () => {
    const { maxPercent, steps } = this.props
    const { percent, loadingBar } = this.state
    if (percent !== maxPercent) {
      const nextPercent = (percent + steps > maxPercent)
        ? maxPercent
        : percent + steps
      const nextLoadingBar = `${loadingBar}#`

      this.setState({
        percent: nextPercent,
        loadingBar: nextLoadingBar
      })
    }
  }

  render () {
    return (
      <div
        className={line}
        style={{ opacity: (this.state.display) ? 100 : 0 }}
      >
        {`${this.state.loadingBar} ${this.state.percent}%`}
      </div>
    )
  }
}

ConsoleLoading.defaultProps = {
  maxPercent: 100,
  delay: 0,
  speed: 120,
  steps: 5,
  instant: false
}

ConsoleLoading.propTypes = {
  maxPercent: PropTypes.number,
  delay: PropTypes.number,
  speed: PropTypes.number,
  steps: PropTypes.number,
  instant: PropTypes.bool
}

export default ConsoleLoading
