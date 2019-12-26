export function mapToRange2 (value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / ((inMax - inMin) + outMin)
}

export function mapToRange (value, low1, high1, low2, high2) {
  return (low2 + ((high2 - low2) * (value - low1))) / (high1 - low1)
}

export function routeToLevel (location) {
  const route = location.split('_')[0]
  switch (route) {
    case 'zero':
      return 0
    case 'one':
      return 100
    case 'two':
      return 200
    case 'three':
      return 300
    case 'four':
      return 400
    default:
      return 0
  }
}

export function stopPropagation (event) {
  console.log('Prevented Propagation')
  event.stopPropagation()
  event.nativeEvent.stopImmediatePropagation()
}
