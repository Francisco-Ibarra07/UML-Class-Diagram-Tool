/**
 * Declaration of a hard object for a note node
 * This hard object "inherits" from the framework class Rectangular Node
 * @extends createRectangularNode
 * @constructor
 * @return properties of a note node
 */
function createNoteNode() {
  let superRecNode = createRectangularNode()

  let properties = {
    text: undefined,
  }
  let originalHeight = undefined

  return {
    /**
     * Calls the superclass to get the rectangular bounds of this node
     * @return {Object} the bounds
     * @memberof createNoteNode
     */
    getBounds: () => {
      return superRecNode.getBounds()
    },
    /**
     * Calls the superclass to set the rectangular bounds of this node and stores the height
     * @param {Object} rect the new bounds
     * @memberof createNoteNode
     */
    setBounds: (rect) => {
      superRecNode.setBounds(rect)
      originalHeight = superRecNode.getHeight()
    },
    /**
     * Calls the superclass to check if a given point is within this node
     * @param {Object} p the point
     * @return {Object} the bounds
     * @memberof createNoteNode
     */
    contains: p => {
      return superRecNode.contains(p)
    },
    /**
     * Calls the superclass to translate this node
     * @param {number} dx the amount to translate by in the x direction
     * @param {number} dy the amount to translate by in the y direction
     * @memberof createNoteNode
     */
    translate: (dx, dy) => {
      superRecNode.translate(dx, dy)
    },
    /**
     * Gets the properties of this node
     * @return {Object} the properties
     * @memberof createNoteNode
     */
    getProperties: () => {
      return properties
    },
    /**
     * Sets the properties of this node
     * @param {Object} newProperties the new properties
     * @memberof createNoteNode
     */
    setProperties: (newProperties) => {
      properties = newProperties
    },
    /**
     * Calls the superclass to return its type
     * @return {string} the superclass type
     * @memberof createNoteNode
     */
    getTypeOfSuperClass: () => {
      return superRecNode.getType()
    },
    /**
     * Calls the superclass to return its type
     * @return {string} the superclass type
     * @memberof createNoteNode
     */
    getLocalType: () => {
      return 'NOTE_NODE'
    },
    /**
     * Returns a copy of itself
     * @return {Object} the clone of this hard object
     * @memberof createNoteNode
     */
    clone: () => {
      return createNoteNode()
    },
    /**
     * Draws the note node using canvas
     * @memberof createNoteNode
     */
    draw: () => {
      let x = superRecNode.getX()
      let y = superRecNode.getY()
      let height = originalHeight
      let width = superRecNode.getWidth()

      const panel = document.getElementById('graphpanel')
      const ctx = panel.getContext('2d')

      if (properties.text === undefined) {
        ctx.rect(x, y, width, height)
        ctx.fillStyle = 'rgb(248, 228, 179)' // Yellowish color as the default
        ctx.fillRect(x, y, width, height)
        ctx.fillStyle = "black"
      }

      // Add text to the correct location
      if (properties.text !== undefined) {
        const lines = properties.text
        let offset = 20

        if (ctx.measureText(lines).width > width) {
          width = ctx.measureText(lines).width + 20
        }

        ctx.rect(x, y, width, height)
        ctx.fillStyle = 'rgb(248, 228, 179)' // Yellowish color as the default
        ctx.fillRect(x, y, width, height)
        ctx.fillStyle = "black"

        for (let i = 0; i < lines.length; i++) {
          let word = lines[i];

          if (ctx.measureText(word).width > width) {
            width = ctx.measureText(word).width + 20
          }
          ctx.stroke()
          //ctx.fillText(lines[i], x + 10, y + offset)
          ctx.fillText(word, x + 10, y + offset)
          offset += 10
        }
      }

      // Note title label
      ctx.fillStyle = "black"
      ctx.fillText("Note", x + 30, y + 10)
      ctx.stroke()


      //      ctx.rect(x, y, width, height)

      //    ctx.fillStyle = 'rgb(248, 228, 179)' // Yellowish color as the default
      //  ctx.fillRect(x, y, width, height)

      // Note title label
      //ctx.fillStyle = "black"
      //ctx.fillText("Note", x + 30, y + 10)

      // Add border to note node
      //ctx.fillStyle = "black"

      //ctx.strokeRect(x, y, width, height)


      // ctx.rect(x, y, width, height)
      //ctx.setLineDash([])
      //ctx.stroke()
    }
  }
}