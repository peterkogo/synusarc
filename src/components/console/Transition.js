import React from 'react'
import PropTypes from 'prop-types'
import {
  Scene, PerspectiveCamera, WebGLRenderer, PlaneGeometry, Mesh,
  LineBasicMaterial, EdgesGeometry, LineSegments, Euler, Fog, MeshBasicMaterial
} from 'three'

const downSample = 0.25
const fogFar = 100
const initialRotation = -3

function degToEuler (degrees) {
  return -(degrees * Math.PI) / 180
}

class ConsoleTransition extends React.Component {
  updateComponent = true

  componentDidMount () {
    window.addEventListener('resize', this.resizeCanvas)

    this.scene = new Scene()
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      precision: 'lowp',
      preserveDrawingBuffer: true
    })
    this.renderer.autoClearColor = true
    this.renderer.setPixelRatio(window.devicePixelRatio * downSample)

    this.scene.fog = new Fog(0x000000, 0, fogFar)

    const plane = new PlaneGeometry(1, 1, 1)

    const tunnelGeometry = new EdgesGeometry(plane)
    const tunnelMaterial = new LineBasicMaterial({ color: 0x00ff00 })

    const nextLevelMaterial = new MeshBasicMaterial({ color: 0xfffff2 })
    this.nextLevelMesh = new Mesh(plane, nextLevelMaterial)
    this.nextLevelMesh.position.set(0, 0, 1000)

    this.scene.add(this.nextLevelMesh)

    this.planes = []

    for (let i = 0; i < this.props.numSquares; i++) {
      if (i === 0) {
        this.planes[0] = new LineSegments(tunnelGeometry, tunnelMaterial)
      } else {
        this.planes[i] = this.planes[0].clone()
      }
      this.scene.add(this.planes[i])
      this.planes[i].position.set(0, 0, i * this.props.planeDistance)
    }

    this.updateComponent = true

    this.resizeCanvas()
    window.requestAnimationFrame(this.animate)
  }

  componentDidUpdate (prevProps) {
    if (this.props.cameraPositionZ !== prevProps.cameraPositionZ) {
      const {
        cameraPositionZ, rotation, numSquares, nextLevelPosition, planeDistance
      } = prevProps

      console.log(rotation)

      this.camera.position.z = cameraPositionZ
      this.camera.updateProjectionMatrix()

      for (let i = 0; i < numSquares; i++) {
        const b = new Euler(0, 0, -((rotation - (i * 3)) * Math.PI) / 180)
        this.planes[i].setRotationFromEuler(b)
      }

      if (Math.abs(nextLevelPosition - cameraPositionZ) > fogFar) {
        this.nextLevelMesh.position.set(0, 0, 1000)
      } else {
        this.nextLevelMesh.position.set(0, 0, nextLevelPosition)
        const rotation2 = rotation + ((nextLevelPosition / planeDistance) * initialRotation)
        this.nextLevelMesh
          .setRotationFromEuler(new Euler(0, 0, degToEuler(rotation2)))
      }

      // console.log(cameraPositionZ)

      if (cameraPositionZ < 85 && this.renderer.autoClearColor === false) {
        this.renderer.autoClearColor = true
      } else if (cameraPositionZ > 85 && this.renderer.autoClearColor === true) {
        this.renderer.autoClearColor = false
        // this.planes.forEach((plane) => { plane.material.color.setHex(0x000000) })
        // document.getElementById('viewport').setAttribute('content', '')
      }

      window.requestAnimationFrame(this.animate)
    }
  }

  // shouldComponentUpdate () {
  //   return this.updateComponent
  // }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resizeCanvas)
  }

  resizeCanvas = () => {
    const { viewPlaneDistance, cameraPositionZ, numSquares } = this.props
    const width = window.innerWidth
    const height = window.innerHeight

    const FOV = (2 * Math.atan(height / (2 * viewPlaneDistance)) * 180) / Math.PI

    this.camera = new PerspectiveCamera(FOV, width / height, 0.1, viewPlaneDistance)
    this.camera.position.z = cameraPositionZ
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(width, height)

    const planeWidth = width * 0.01
    const planeHeight = height * 0.01

    for (let i = 0; i < numSquares; i++) {
      this.planes[i].scale.x = planeWidth
      this.planes[i].scale.y = planeHeight
    }

    this.nextLevelMesh.scale.x = planeWidth
    this.nextLevelMesh.scale.y = planeHeight

    window.requestAnimationFrame(this.animate)
  }

  animate = () => {
    this.renderer.render(this.scene, this.camera)
  }

  render () {
    return (
      <canvas
        ref={(ref) => { this.canvas = ref }}
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none' }}
      />
    )
  }
}

ConsoleTransition.defaultProps = {
  planeDistance: 3,
  numSquares: 15
}

ConsoleTransition.propTypes = {
  cameraPositionZ: PropTypes.number.isRequired,
  nextLevelPosition: PropTypes.number.isRequired,
  planeDistance: PropTypes.number,
  numSquares: PropTypes.number,
  rotation: PropTypes.number.isRequired,
  viewPlaneDistance: PropTypes.number.isRequired
}

export default ConsoleTransition
