import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Line from './Line'
import Image from './Image'
import Loading from './Loading'
import Input from './Input'
import Transition from './Transition'

import { mapToRange } from '../DefaultFunctions'

import style from './Console.module.css'

const viewPlaneDistance = 1000

class ConsoleContainer extends React.Component {
  render () {
    const {
      console: { elements }, dispatch, transitioning, level, display, dimensions
    } = this.props
    const rotation = level * 4
    return [
      <div
        key='consoleContent'
        style={{
          perspective: `${viewPlaneDistance}px`,
          perspectiveOrigin: `${dimensions.centerX}px ${dimensions.centerY}px`,
          display: (display) ? 'block' : 'none'
        }}
      >
        <div
          style={{
            willChange: 'transform',
            transformOrigin: `${dimensions.centerX}px ${dimensions.centerY}px`,
            transform: (level < 100) ? `translateZ(${(-level * 100)}px)
                                        rotate(${rotation}deg)` : '',
            opacity: (level < 40) ? 100 : (60 - (level - 40)) * 0.01 * (10 / 6),
            display: (level < 100) ? 'block' : 'none'
          }}
        >
          <div
            className={style.container}
            style={(transitioning) ? { overflow: 'scroll' } : {}}
            ref={(ref) => { this.container = ref }}
          >
            <div className={style.body}>
              {elements.map((element) => {
                switch (element.type) {
                  case 'line':
                    return (
                      <Line
                        key={element.key}
                        text={element.text}
                        typed={element.typed}
                        delay={element.delay}
                        userInput={element.userInput}
                      />
                    )
                  case 'loading':
                    return (
                      <Loading
                        key={element.key}
                        maxPercent={element.maxPercent}
                        delay={element.delay}
                      />
                    )
                  case 'image':
                    return (
                      <Image
                        key={element.key}
                        imagePath={element.imagePath}
                        delay={element.delay}
                      />
                    )
                  default:
                    return (
                      <Line
                        key={element.key}
                        text='error'
                      />
                    )
                }
              })}
              <Input
                path='/images/'
                dispatch={dispatch}
              />
            </div>
            <div ref={(ref) => { this.scrollBottomElement = ref }} />
          </div>
        </div>
      </div>,
      <Transition
        key='consoleTransition'
        cameraPositionZ={(level >= 0 && level < 100) ? level + 7 : 0}
        nextLevelPosition={(level >= 0 && level < 100)
          ? ((mapToRange(level, 50, 100, 0, 300) - 200) * 0.01 * (100 + 6)) : 100}
        rotation={(level >= 0 && level < 100) ? rotation : 0}
        viewPlaneDistance={viewPlaneDistance}
        numSquares={20}
        planeDistance={5}
        transitioning={transitioning}
      />
    ]
  }
}

ConsoleContainer.defaultProps = {
  elements: []
}

ConsoleContainer.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func.isRequired,
  transitioning: PropTypes.bool.isRequired,
  level: PropTypes.number.isRequired,
  display: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  const { dimensions, console } = state
  return { dimensions, console }
}

export default connect(mapStateToProps)(ConsoleContainer)
