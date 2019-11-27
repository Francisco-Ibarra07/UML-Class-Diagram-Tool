/**
 * Declaration of a hard object for a toolbar element
 * Any element that wishes to be placed in the toolbar gets placed in this object
 * @constructor
 * @param {Object} prototypeObject the object to create an element for in the toolbar
 * @param {int} elementSize the bounds of the toolbar element
 * @param {int} offsetFromStart distance from the beginning of the toolbar
 */
function createToolbarElement(prototypeObject, elementSize, offsetFromStart) {

  // Initialize properties of this toolbar element 
  let isSelected = false
  let width = elementSize.width
  let height = elementSize.height
  let x = offsetFromStart
  let y = 0
  let clonedPrototype = undefined

  // Only clone the object if its not the grabber
  if (prototypeObject !== 'GRABBER') {
    clonedPrototype = prototypeObject.clone()
  }

  /**
   * Draws the grabber around the object
   * @function drawGrabber
   * @param {int} x the x value of the object
   * @param {iny} y the y value of the object
   * @memberof createToolbarElement
   */
  function drawGrabber(x, y) {
    const size = 5;
    const panel = document.getElementById('graphpanel')
    const ctx = panel.getContext('2d')
    ctx.fillStyle = 'black'
    ctx.fillRect(x - size / 2, y - size / 2, size, size);
  }

  return {
    /**
     * Returns a clone of the object that this toolbar element is holding
     * If the grabber is within this toolbar element, a string is returned
     * @return {Object} the clone
     * @memberof createToolbarElement
     */
    getCloneOfPrototype: () => {
      if (prototypeObject === 'GRABBER') {
        return 'GRABBER'
      }
      else {
        return prototypeObject.clone()
      }
    },
    /**
     * Returns the type of this elements superclass
     * If the grabber is within this toolbar element, a string is returned
     * @return {string} the superclass type of this element
     * @memberof createToolbarElement
     */
    getTypeOfElement: () => {
      if (prototypeObject === 'GRABBER') {
        return 'GRABBER'
      }
      else {
        return prototypeObject.getTypeOfSuperClass()
      }
    },
    /**
     * Marks whether this toolbar element as selected
     * @param {boolean} bool true if it's selected
     * @memberof createToolbarElement
     */
    setIsSelected: (bool) => {
      isSelected = bool
    },
    /**
     * Checks if a given point is within this node
     * @return {boolean} true if the point is within the node
     * @memberof createToolbarElement
     */
    contains: (p) => {
      return x <= p.x && p.x <= x + width && y <= p.y && p.y <= y + height
    },
    /**
     * Draws the toolbar element and renders the prototype drawing inside using canvas
     * @memberof createToolbarElement
     */
    draw: () => {
      const panel = document.getElementById('graphpanel')
      const ctx = panel.getContext('2d')

      // Draw outer box
      ctx.rect(x, y, width, height)
      if (isSelected) {
        ctx.fillStyle = "#D3D3D3"
        ctx.fillRect(x, y, width, height)
      }

      // Draw the prototype inside this box
      const bounds = {
        x: x,
        y: y,
        width: width,
        height: height,
      }

      // If this toolbar element is a Grabber
      if (prototypeObject === 'GRABBER') {

        // Adjust the toolbar element bounds to put the Grabber drawing in the center
        bounds.x += 18
        bounds.y += 10
        bounds.width -= 35
        bounds.height -= 25

        drawGrabber(bounds.x, bounds.y)
        drawGrabber(bounds.x + bounds.width, bounds.y)
        drawGrabber(bounds.x, bounds.y + bounds.height)
        drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
      }
      // If its a Rectangular Node type of prototype, draw it as normal inside the bounds
      else if (clonedPrototype.getTypeOfSuperClass() === 'RECTANGULAR_NODE') {

        // Adjust the bounds to put the node at the center of the toolbar element button
        bounds.x = bounds.x + 5
        bounds.y = bounds.y + 5
        bounds.width = bounds.width - 10
        bounds.height = bounds.height - 10

        clonedPrototype.setBounds(bounds)
        clonedPrototype.draw()
      }
      // If its an edge, define the 'start' and 'end' coordinates then draw the line within the bounds
      else if (clonedPrototype.getTypeOfSuperClass() === 'EDGE') {

        const bottomRightCorner = {
          getBounds: () => {
            return {
              x: bounds.x + 5,
              y: bounds.height - 5,
              width: 1,
              height: 1
            }
          }
        }
        const topRightCorner = {
          getBounds: () => {
            return {
              x: bounds.x + bounds.width,
              y: bounds.y + 15,
              width: 1,
              height: 1,
            }
          }
        }

        // Connect bottom left corner to top right corner
        clonedPrototype.connect(bottomRightCorner, topRightCorner)
        clonedPrototype.draw()
      }
    }
  }
}