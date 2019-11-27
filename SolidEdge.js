/**
 * Declaration of a hard object for a solid edge
 * This hard object "inherits" from the framework class Edge
 * @extends createEdge
 * @constructor
 * @return properties of a solid edge
 */
function createSolidEdge() {
  let superEdge = createEdge()

  return {
    /**
     * Calls the superclass to connect two nodes
     * @param {Object} s starting node
     * @param {Object} e ending node
     * @memberof createSolidEdge
     */
    connect: (s, e) => {
      superEdge.connect(s, e)
    },
    /**
     * Calls the superclass to return the starting node
     * @return {Object} the starting node
     * @memberof createSolidEdge
     */
    getStart: () => {
      return superEdge.getStart()
    },
    /**
     * Calls the superclass to returns the ending node
     * @return {Object} the ending node
     * @memberof createSolidEdge
     */
    getEnd: () => {
      return superEdge.getEnd()
    },
    /**
     * Calls the superclass to return its type
     * @return {string} the type
     * @memberof createSolidEdge
     */
    getTypeOfSuperClass: () => {
      return superEdge.getType()
    },
    /**
     * Return the type of this object
     * @return {string} the type of the object
     * @memberof createSolidEdge
     */
    getLocalType: () => {
      return 'SOLID_EDGE'
    },
    /**
     * Draws the solid edge between two nodes
     * @memberof createSolidEdge
     */
    draw: () => {
      const start = superEdge.getStart()
      const end = superEdge.getEnd()

      const canvas = document.getElementById('graphpanel')
      const ctx = canvas.getContext('2d')
      ctx.beginPath()

      const str = start.getBounds()
      const en = end.getBounds()
      const sx = str.x
      const sy = str.y
      const ex = en.x
      const ey = en.y
      if (sy >= ey) {
        if (sx > ex + en.width) {
          // left side
          ctx.moveTo(sx, sy + str.height / 2)
          // middle liners
          ctx.lineTo((sx + ex + en.width) / 2, sy + str.height / 2)
          ctx.lineTo((sx + ex + en.width) / 2, ey + en.height / 2)
          // right side
          ctx.lineTo(ex + en.width, ey + en.height / 2)
          ctx.setLineDash([])
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(ex + en.width, ey + en.height / 2)
          ctx.lineTo(ex + en.width + 10, ey + en.height / 2 + 10)
          ctx.moveTo(ex + en.width, ey + en.height / 2)
          ctx.lineTo(ex + en.width + 10, ey + en.height / 2 - 10)
          ctx.closePath()
          ctx.setLineDash([])
          ctx.stroke()
        }
        else if (ex > sx + str.width) {
          // right side
          ctx.moveTo(sx + str.width, sy + str.height / 2)
          // middle liners
          ctx.lineTo((sx + str.width + ex) / 2, sy + str.height / 2)
          ctx.lineTo((sx + str.width + ex) / 2, ey + en.height / 2)
          // left side
          ctx.lineTo(ex, ey + en.height / 2)
          ctx.setLineDash([])
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(ex, ey + en.height / 2)
          ctx.lineTo(ex - 10, ey + en.height / 2 + 10)
          ctx.moveTo(ex, ey + en.height / 2)
          ctx.lineTo(ex - 10, ey + en.height / 2 - 10)
          ctx.closePath()
          ctx.setLineDash([])
          ctx.stroke()
        }
        else {
          // top
          ctx.moveTo(sx + str.width / 2, sy)
          // middle liners
          ctx.lineTo(sx + str.width / 2, (sy + ey + en.height) / 2)
          ctx.lineTo(ex + en.width / 2, (sy + ey + en.height) / 2)
          // bottom
          ctx.lineTo(ex + en.width / 2, ey + en.height)
          ctx.setLineDash([])
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(ex + en.width / 2, ey + en.height)
          ctx.lineTo(ex + en.width / 2 + 10, ey + en.height + 10)
          ctx.moveTo(ex + en.width / 2, ey + en.height)
          ctx.lineTo(ex + en.width / 2 - 10, ey + en.height + 10)
          ctx.closePath()
          ctx.setLineDash([])
          ctx.stroke()
        }
      }
      else {
        if (sx > ex + en.width) {
          // left side
          ctx.moveTo(sx, sy + str.height / 2)
          // middle liners
          ctx.lineTo((sx + ex + en.width) / 2, sy + str.height / 2)
          ctx.lineTo((sx + ex + en.width) / 2, ey + en.height / 2)
          // right side
          ctx.lineTo(ex + en.width, ey + en.height / 2)
          ctx.setLineDash([])
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(ex + en.width, ey + en.height / 2)
          ctx.lineTo(ex + en.width + 10, ey + en.height / 2 + 10)
          ctx.moveTo(ex + en.width, ey + en.height / 2)
          ctx.lineTo(ex + en.width + 10, ey + en.height / 2 - 10)
          ctx.closePath()
          ctx.setLineDash([])
          ctx.stroke()
        }
        else if (ex > sx + str.width) {
          // right side
          ctx.moveTo(sx + str.width, sy + str.height / 2)
          // middle liners
          ctx.lineTo((sx + str.width + ex) / 2, sy + str.height / 2)
          ctx.lineTo((sx + str.width + ex) / 2, ey + en.height / 2)
          // left side
          ctx.lineTo(ex, ey + en.height / 2)
          ctx.setLineDash([])
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(ex, ey + en.height / 2)
          ctx.lineTo(ex - 10, ey + en.height / 2 + 10)
          ctx.moveTo(ex, ey + en.height / 2)
          ctx.lineTo(ex - 10, ey + en.height / 2 - 10)
          ctx.closePath()
          ctx.setLineDash([])
          ctx.stroke()
        }
        else {
          // bottom
          ctx.moveTo(sx + str.width / 2, sy + str.height)
          // middle liners
          ctx.lineTo(sx + str.width / 2, (sy + ey + en.height) / 2)
          ctx.lineTo(ex + en.width / 2, (sy + ey + en.height) / 2)
          // top
          ctx.lineTo(ex + en.width / 2, ey)
          ctx.setLineDash([])
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(ex + en.width / 2, ey)
          ctx.lineTo(ex + en.width / 2 + 10, ey - 10)
          ctx.moveTo(ex + en.width / 2, ey)
          ctx.lineTo(ex + en.width / 2 - 10, ey - 10)
          ctx.closePath()
          ctx.setLineDash([])
          ctx.stroke()
        }
      }
    },
    /**
     * Returns a copy of itself
     * @return {Object} the clone of this hard object
     * @memberof createSolidEdge
     */
    clone: () => {
      return createSolidEdge()
    }
  }
}
