/**
 * Declaration of a hard object for a rectangular node
 * Any node like class, interface, note, or package can "inherit" from this hard object
 * @constructor
 * @return properties of a rectangular node
 */
function createRectangularNode() {
  let width = 100
  let height = 50
  let x = 0
  let y = 0

  return {
    /**
     * Returns the rectangular bounds of this node
     * @return the bounds
     * @memberof createRectangularNode
     */
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: width,
        height: height,
      }
    },
    /**
     * Sets the rectangular bounds of this node
     * @param {Object} rect new bounds
     * @memberof createRectangularNode
     */
    setBounds: (rect) => {
      x = rect.x
      y = rect.y
      width = rect.width
      height = rect.height
    },
    /**
     * Sets the new height
     * @param {number} newHeight the new height
     * @memberof createRectangularNode
     */
    setHeight: (newHeight) => {
      height = newHeight
    },
    /**
     * Sets the new width
     * @param {number} newWidth the new width
     * @memberof createRectangularNode
     */
    setWidth: (newWidth) => {
      width = newWidth
    },
    /**
     * Gets the width
     * @param {number} newWidth the new width
     * @memberof createRectangularNode
     */
    getWidth: () => {
      return width
    },
    /**
     * Gets the height
     * @return {number} the height
     * @memberof createRectangularNode
     */
    getHeight: () => {
      return height
    },
    /**
     * Gets the x
     * @return {number} x the x coordinate
     * @memberof createRectangularNode
     */
    getX: () => {
      return x
    },
    /**
     * Gets the y
     * @return {number} y the y coordinate
     * @memberof createRectangularNode
     */
    getY: () => {
      return y
    },
    /**
     * Return the type of this object
     * @return {string} the type of the object
     * @memberof createRectangularNode
     */
    getType: () => {
      return 'RECTANGULAR_NODE'
    },
    /**
     * Checks if a given point is within this node
     * @return {boolean} true if the point is within the node
     * @memberof createRectangularNode
     */
    contains: p => {
      return x <= p.x && p.x <= x + width && y <= p.y && p.y <= y + height
    },
    /**
     * Translates this node
     * @param {number} dx the amount to translate by in the x direction
     * @param {number} dy the amount to translate by in the y direction
     * @memberof createRectangularNode
     */
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
  }
}