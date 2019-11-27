/**
 * Declaration of a hard object for an interface node
 * This hard object "inherits" from the framework class Rectangular Node
 * @extends createRectangularNode
 * @constructor
 * @return properties of a interface node
 */
function createInterfaceNode() {
  let superRecNode = createRectangularNode()

  let properties = {
    name: undefined,
    interfaceAttributes: undefined,
  }
  let originalHeight = undefined
  let originalWidth = undefined

  return {
    /**
     * Calls the superclass to get the rectangular bounds of this node
     * @return {Object} the bounds
     * @memberof createInterfaceNode
     */
    getBounds: () => {
      return superRecNode.getBounds()
    },
    /**
     * Calls the superclass to set the rectangular bounds of this node and stores the height
     * @param {Object} rect the new bounds
     * @memberof createInterfaceNode
     */
    setBounds: (rect) => {
      superRecNode.setBounds(rect)
      originalHeight = superRecNode.getHeight()
      originalWidth = superRecNode.getWidth()
    },
    /**
     * Calls the superclass to check if a given point is within this node
     * @param {Object} p the point
     * @return {Object} the bounds
     * @memberof createInterfaceNode
     */
    contains: p => {
      return superRecNode.contains(p)
    },
    /**
     * Calls the superclass to translate this node
     * @param {number} dx the amount to translate by in the x direction
     * @param {number} dy the amount to translate by in the y direction
     * @memberof createInterfaceNode
     */
    translate: (dx, dy) => {
      superRecNode.translate(dx, dy)
    },
    /**
     * Gets the properties of this node
     * @return {Object} the properties
     * @memberof createInterfaceNode
     */
    getProperties: () => {
      return properties
    },
    /**
     * Sets the properties of this node
     * @param {Object} newProperties the new properties
     * @memberof createInterfaceNode
     */
    setProperties: (newProperties) => {
      properties = newProperties
    },
    /**
     * Calls the superclass to return its type
     * @return {string} the superclass type
     * @memberof createInterfaceNode
     */
    getTypeOfSuperClass: () => {
      return superRecNode.getType()
    },
    /**
     * Returns its type
     * @return {string} the type
     * @memberof createInterfaceNode
     */
    getLocalType: () => {
      return 'INTERFACE_NODE'
    },
    /**
     * Returns a copy of itself
     * @return {Object} the clone of this hard object
     * @memberof createInterfaceNode
     */
    clone: () => {
      return createInterfaceNode()
    },
    /**
     * Draws the interface node using canvas
     * @memberof createInterfaceNode
     */
    draw: () => {
      let x = superRecNode.getX()
      let y = superRecNode.getY()
      let height = originalHeight
      let width = originalWidth

      const panel = document.getElementById('graphpanel')
      const ctx = panel.getContext('2d')

      // Get top third of interface box
      let firstThirdY = y + height / 3
      let max = -1
      let largestWidth = originalWidth

      // Draw text inside boxes
      if (properties.name !== undefined) {
        const interfaceName = properties.name
        if (interfaceName.length > max) { max = interfaceName.length }

        // The width of the box will be as long as the longest word
        /*
        if (max * 10 < 100) {
          width = 100
        }
        else {
          width = ctx.measureText(word).width + 20
        }
        */

        if (ctx.measureText(interfaceName).width > width) {
          width = ctx.measureText(interfaceName).width + 20
          if (width > largestWidth) {
            largestWidth = width
          }
        }

        // Draw the text
        ctx.fillText(interfaceName, x + 10, y + 20)

      }

      if (properties.interfaceAttributes !== undefined) {
        let attributes = properties.interfaceAttributes
        let offset = 20 // Offset to change the y

        for (let i = 0; i < attributes.length; i++) {
          let word = attributes[i]
          if (word.length > max) {
            max = word.length
          }

          // The width of the box will be as long as the longest word
          /*
          if (max * 10 < 100) {
            width = 100
          }
          else {
            width = ctx.measureText(word).width + 20
          }
          */
          if (ctx.measureText(word).width > width) {
            width = ctx.measureText(word).width + 20
            if (width > largestWidth) {
              largestWidth = width
            }
          }

          // Draw the text
          ctx.fillText(word, x + 10, firstThirdY + offset)
          offset = offset + 10
          height += 10
          superRecNode.setHeight(height)
          superRecNode.setWidth(largestWidth)
        }
      }
      ctx.stroke()

      ctx.beginPath
      ctx.style
      ctx.moveTo(x, firstThirdY)
      ctx.lineTo(x + width, firstThirdY)
      ctx.stroke()

      // Interface Name Label
      ctx.fillStyle = "blue"
      ctx.fillText('<<interface>>', x + 10, y + 10)
      ctx.fillStyle = "black"

      // Draws the rectangle box
      ctx.rect(x, y, width, height)
      ctx.setLineDash([])
      ctx.stroke()
    }

  }
}