/**
 * Declaration of a hard object for a diamond edge
 * This hard object "inherits" from the framework class Edge
 * @extends createEdge
 * @constructor
 * @return properties of a diamond edge
 */
function createDiamondEdge() {
  let superEdge = createEdge()

  return {
    /**
     * Calls the superclass to connect two nodes
     * @param {Object} s starting node
     * @param {Object} e ending node
     * @memberof createDiamondEdge
     */
    connect: (s, e) => {
      superEdge.connect(s, e)
    },
    /**
     * Calls the superclass to return the starting node
     * @return {Object} the starting node
     * @memberof createDiamondEdge
     */
    getStart: () => {
      return superEdge.getStart()
    },
    /**
     * Calls the superclass to returns the ending node
     * @return {Object} the ending node
     * @memberof createDiamondEdge
     */
    getEnd: () => {
      return superEdge.getEnd()
    },
    /**
     * Calls the superclass to return its type
     * @return {string} the type
     * @memberof createDiamondEdge
     */
    getTypeOfSuperClass: () => {
      return superEdge.getType()
    },
    /**
     * Return the type of this object
     * @return {string} the type of the object
     * @memberof createDiamondEdge
     */
    getLocalType: () => {
      return 'DIAMOND_EDGE'
    },
    /**
     * Returns a copy of itself
     * @return {Object} the clone of this hard object
     * @memberof createDiamondEdge
     */
    clone: () => {
      return createDiamondEdge()
    },
    /**
     * Draws the diamond edge between two nodes
     * @memberof createDiamondEdge
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
          ctx.moveTo(sx - 20, sy + str.height / 2)
          ctx.lineTo((sx + ex + en.width) / 2, sy + str.height / 2)
          ctx.lineTo((sx + ex + en.width) / 2, ey + en.height / 2)
          // right side
          ctx.lineTo(ex + en.width, ey + en.height / 2)
          ctx.setLineDash([])
          ctx.stroke()
          ctx.closePath()
          ctx.beginPath()
          ctx.moveTo(sx, sy + str.height / 2)
          ctx.lineTo(sx - 10, sy + str.height / 2 + 10)
          ctx.lineTo(sx - 20, sy + str.height / 2)
          ctx.lineTo(sx - 10, sy + str.height / 2 - 10)
          ctx.closePath()
          ctx.setLineDash([])
          ctx.stroke()
        }
        else if (ex > sx + str.width) {
          // right side                
          ctx.moveTo(sx + str.width + 20, sy + str.height / 2)
          // middle liners
          ctx.lineTo((sx + str.width + ex) / 2, sy + str.height / 2)
          ctx.lineTo((sx + str.width + ex) / 2, ey + en.height / 2)
          // left side
          ctx.lineTo(ex, ey + en.height / 2)
          ctx.setLineDash([])
          ctx.stroke()
          ctx.closePath()
          ctx.beginPath()
          ctx.moveTo(sx + str.width, sy + str.height / 2)
          ctx.lineTo(sx + str.width + 10, sy + str.height / 2 + 10)
          ctx.lineTo(sx + str.width + 20, sy + str.height / 2)
          ctx.lineTo(sx + str.width + 10, sy + str.height / 2 - 10)
          ctx.closePath()
          ctx.setLineDash([])
          ctx.stroke()
        }
        else {
          // top                
          ctx.moveTo(sx + str.width / 2, sy - 20)
          // middle liners
          ctx.lineTo(sx + str.width / 2, (sy + ey + en.height) / 2)
          ctx.lineTo(ex + en.width / 2, (sy + ey + en.height) / 2)
          // bottom
          ctx.lineTo(ex + en.width / 2, ey + en.height)
          ctx.setLineDash([])
          ctx.stroke()
          ctx.closePath()
          ctx.beginPath()
          ctx.moveTo(sx + str.width / 2, sy)
          ctx.lineTo(sx + str.width / 2 - 10, sy - 10)
          ctx.lineTo(sx + str.width / 2, sy - 20)
          ctx.lineTo(sx + str.width / 2 + 10, sy - 10)
          ctx.closePath()
          ctx.setLineDash([])
          ctx.stroke()
        }
      }
      else {
        if (sx > ex + en.width) {
          // left side
          ctx.moveTo(sx - 20, sy + str.height / 2)
          ctx.lineTo((sx + ex + en.width) / 2, sy + str.height / 2)
          ctx.lineTo((sx + ex + en.width) / 2, ey + en.height / 2)
          // right side
          ctx.lineTo(ex + en.width, ey + en.height / 2)
          ctx.setLineDash([])
          ctx.stroke()
          ctx.closePath()
          ctx.beginPath()
          ctx.moveTo(sx, sy + str.height / 2)
          ctx.lineTo(sx - 10, sy + str.height / 2 + 10)
          ctx.lineTo(sx - 20, sy + str.height / 2)
          ctx.lineTo(sx - 10, sy + str.height / 2 - 10)
          ctx.closePath()
          ctx.setLineDash([])
          ctx.stroke()
        }
        else if (ex > sx + str.width) {
          // right side
          ctx.moveTo(sx + str.width + 20, sy + str.height / 2)
          // middle liners
          ctx.lineTo((sx + str.width + ex) / 2, sy + str.height / 2)
          ctx.lineTo((sx + str.width + ex) / 2, ey + en.height / 2)
          // left side
          ctx.lineTo(ex, ey + en.height / 2)
          ctx.setLineDash([])
          ctx.stroke()
          ctx.closePath()
          ctx.beginPath()
          ctx.moveTo(sx + str.width, sy + str.height / 2)
          ctx.lineTo(sx + str.width + 10, sy + str.height / 2 + 10)
          ctx.lineTo(sx + str.width + 20, sy + str.height / 2)
          ctx.lineTo(sx + str.width + 10, sy + str.height / 2 - 10)
          ctx.closePath()
          ctx.setLineDash([])
          ctx.stroke()
        }
        else {
          // bottom
          ctx.moveTo(sx + str.width / 2, sy + str.height + 20)
          // middle liners
          ctx.lineTo(sx + str.width / 2, (sy + ey + en.height) / 2)
          ctx.lineTo(ex + en.width / 2, (sy + ey + en.height) / 2)
          // top
          ctx.lineTo(ex + en.width / 2, ey)
          ctx.setLineDash([])
          ctx.stroke()
          ctx.closePath()
          ctx.beginPath()
          ctx.moveTo(sx + str.width / 2, sy + str.height)
          ctx.lineTo(sx + str.width / 2 + 10, sy + str.height + 10)
          ctx.lineTo(sx + str.width / 2, sy + str.height + 20)
          ctx.lineTo(sx + str.width / 2 - 10, sy + str.height + 10)
          ctx.closePath()
          ctx.setLineDash([])
          ctx.stroke()
        }
      }
    }
  }
}