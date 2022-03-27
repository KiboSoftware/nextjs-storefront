export function swipedetect(gestureZone, callback) {
  let touchstartX = 0
  let touchstartY = 0
  let touchendX = 0
  let touchendY = 0
  let getGesture = callback

  gestureZone?.addEventListener(
    'touchstart',
    function (event) {
      touchstartX = event.changedTouches[0].screenX
      touchstartY = event.changedTouches[0].screenY
    },
    false
  )

  gestureZone?.addEventListener(
    'touchend',
    function (event) {
      touchendX = event.changedTouches[0].screenX
      touchendY = event.changedTouches[0].screenY
      getGesture(handleGesture())
    },
    false
  )

  function handleGesture() {
    const { width, height } = gestureZone.getBoundingClientRect()

    const ratio_horizontal = (touchendX - touchstartX) / width
    const ratio_vertical = (touchendY - touchstartY) / height

    if (ratio_horizontal > ratio_vertical && ratio_horizontal > 0.25) {
      return 'right'
    }
    if (ratio_vertical > ratio_horizontal && ratio_vertical > 0.25) {
      return 'down'
    }
    if (ratio_horizontal < ratio_vertical && ratio_horizontal < -0.25) {
      return 'left'
    }
    if (ratio_vertical < ratio_horizontal && ratio_vertical < -0.25) {
      return 'up'
    }

    return ''
  }
}
