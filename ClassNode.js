/**
 * Declaration of a hard object for an class node
 * This hard object "inherits" from the framework class Rectangular Node
 * @extends createRectangularNode
 * @constructor
 * @return properties of a class node
 */
function createClassNode() {
  let superRecNode = createRectangularNode()
  let properties = {
    name: undefined,
    attributes: undefined,
    methods: undefined,
  }
  let originalHeight = undefined
  let originalWidth = undefined


  return {
    /**
     * Calls the superclass to get the rectangular bounds of this node
     * @return {Object} the bounds
     * @memberof createClassNode
     */
    getBounds: () => {
      return superRecNode.getBounds()
    },
    /**
     * Calls the superclass to set the rectangular bounds of this node and stores the height
     * @param {Object} rect the new bounds
     * @memberof createClassNode
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
     * @memberof createClassNode
     */
    contains: p => {
      return superRecNode.contains(p)
    },
    /**
     * Calls the superclass to translate this node
     * @param {number} dx the amount to translate by in the x direction
     * @param {number} dy the amount to translate by in the y direction
     * @memberof createClassNode
     */
    translate: (dx, dy) => {
      superRecNode.translate(dx, dy)
    },
    /**
     * Gets the properties of this node
     * @return {Object} the properties
     * @memberof createClassNode
     */
    getProperties: () => {
      return properties
    },
    /**
     * Sets the properties of this node
     * @param {Object} newProperties the new properties
     * @memberof createClassNode
     */
    setProperties: (newProperties) => {
      properties = newProperties
      propsWereSet = false
    },
    /**
     * Calls the superclass to return its type
     * @return {string} the superclass type
     * @memberof createClassNode
     */
    getTypeOfSuperClass: () => {
      return superRecNode.getType()
    },
    /**
     * Returns its type
     * @return {string} the type
     * @memberof createClassNode
     */
    getLocalType: () => {
      return 'CLASS_NODE'
    },
    /**
     * Returns a copy of itself
     * @return {Object} the clone of this hard object
     * @memberof createClassNode
     */
    clone: () => {
      return createClassNode()
    },
    /**
     * Draws the class node using canvas
     * @memberof createClassNode
     */
    draw: () => {
      let x = superRecNode.getX()
      let y = superRecNode.getY()
      let height = originalHeight
      let width = originalWidth

      const panel = document.getElementById('graphpanel')
      const ctx = panel.getContext('2d')

      // KP Needed to divide class box into 3 sections
      let firstThirdY = (y + height / 3) // Ref to bottom of class
      let secondThirdY = y + 2 * (height / 3) // Ref to attributes line
      let largestWidth = originalWidth

      // Draw text inside boxes
      if (properties.name !== undefined) {
        const className = properties.name[0]

        if (ctx.measureText(className).width > width) {
          width = ctx.measureText(className).width + 20
          if (width > largestWidth) {
            largestWidth = width
          }
        }

        // Draw the text
        ctx.fillText(className, x + 10, y + 20)
        ctx.stroke()
      }
      if (properties.attributes !== undefined) {
        let attributes = properties.attributes
        let offset = 20 // Offset to change the y

        for (let i = 0; i < attributes.length; i++) {
          let word = attributes[i]

          if (ctx.measureText(word).width > width) {
            width = ctx.measureText(word).width + 20
            if (width > largestWidth) {
              largestWidth = width
            }
          }

          // Draw the text
          ctx.fillText(word, x + 10, firstThirdY + offset)
          ctx.stroke()

          offset = offset + 10
          secondThirdY += 10
          height += 10
        }
      }
      if (properties.methods !== undefined) {
        let methods = properties.methods
        let offset = 20 // Offset to change the y

        for (let i = 0; i < methods.length; i++) {
          let word = methods[i]

          if (ctx.measureText(word).width > width) {
            width = ctx.measureText(word).width + 20
            if (width > largestWidth) {
              largestWidth = width
            }
          }

          // Draw the text
          ctx.fillText(word, x + 10, secondThirdY + offset)
          ctx.stroke()

          offset = offset + 10
          height += 10
          superRecNode.setHeight(height)
          superRecNode.setWidth(largestWidth)
        }
      }

      // KP Divides Class Box
      ctx.beginPath;
      ctx.moveTo(x, firstThirdY);
      ctx.lineTo(x + width, firstThirdY);
      ctx.stroke();
      // KP Divides Class Box
      ctx.beginPath;
      ctx.moveTo(x, secondThirdY);
      ctx.lineTo(x + width, secondThirdY);
      ctx.stroke();
      // KP Class Name Label
      ctx.fillStyle = "red"
      ctx.fillText("Class Name", x + 2, y + 10);
      ctx.fillStyle = "black";
      // KP Attribute Name Label
      ctx.fillStyle = "red"
      ctx.fillText("Attributes", x + 2, firstThirdY + 10);
      ctx.fillStyle = "black";
      // KP Methods Name Label
      ctx.fillStyle = "red"
      ctx.fillText("Methods()", x + 2, secondThirdY + 10);
      ctx.fillStyle = "black";

      ctx.rect(x, y, width, height) // Change height to the last line
      ctx.rect(x, y, width, height) // Change height to the last line
      ctx.setLineDash([])

    }
  }
}