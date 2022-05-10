import { swipeDetect } from '../swipeDetect'

const setup = () => {
  Element.prototype.getBoundingClientRect = jest.fn(() => {
    return {
      width: 300,
      height: 300,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }
  })

  document.body.innerHTML = ''

  let div = document.createElement('div')
  div.setAttribute('id', 'gestureZone')

  document.body.appendChild(div)

  const element = document.getElementById('gestureZone')

  return {
    element,
  }
}

const createTouchStartEvent = (value) => {
  return new TouchEvent('touchstart', {
    changedTouches: [value],
  })
}

const createTouchEndEvent = (value) => {
  return new TouchEvent('touchend', {
    changedTouches: [value],
  })
}

describe('[helpers] swipeDetect', () => {
  it('should detect left swipe', () => {
    const { element } = setup()
    const callback = (dir) => {
      expect(dir).toBe('left')
    }

    swipeDetect(element, callback)
    element.dispatchEvent(
      createTouchStartEvent({
        screenX: 210,
        screenY: 248,
      })
    )
    element.dispatchEvent(
      createTouchEndEvent({
        screenX: 118,
        screenY: 254,
      })
    )
  })

  it('should detect right swipe', () => {
    const { element } = setup()
    const callback = (dir) => {
      expect(dir).toBe('right')
    }

    swipeDetect(element, callback)
    element.dispatchEvent(
      createTouchStartEvent({
        screenX: 80,
        screenY: 280,
      })
    )
    element.dispatchEvent(
      createTouchEndEvent({
        screenX: 200,
        screenY: 287,
      })
    )
  })

  it('should detect no swipe', () => {
    const { element } = setup()
    const callback = (dir) => {
      expect(dir).toBe('')
    }

    swipeDetect(element, callback)
    element.dispatchEvent(
      createTouchStartEvent({
        screenX: 0,
        screenY: 0,
      })
    )
    element.dispatchEvent(
      createTouchEndEvent({
        screenX: 0,
        screenY: 0,
      })
    )
  })
})
