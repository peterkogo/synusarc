import React from 'react'
import PropTypes from 'prop-types'

import { asciiImage } from './Console.module.css'

class ConsoleImage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showImage: (props.delay === 0),
      image: ''
    }
  }

  componentDidMount () {
    const { delay, imagePath } = this.props
    if (delay > 0) {
      setTimeout(() => {
        this.setState({
          showImage: true
        })
      }, delay)
    }

    if (imagePath) {
      fetch(imagePath)
        .then(response => response.text())
        .then((text) => {
          this.setState({
            image: text
          })
        })
    }
  }

  render () {
    return (
      <div
        className={asciiImage}
        style={{
          opacity: (this.state.showImage) ? 100 : 0
        }}
      >
        {this.state.image}
      </div>
    )
  }
}

ConsoleImage.defaultProps = {
  imagePath: '',
  delay: 0
}

ConsoleImage.propTypes = {
  imagePath: PropTypes.string,
  delay: PropTypes.number
}

export default ConsoleImage
