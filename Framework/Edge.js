/**
 * Declaration of a hard object for an edge
 * Any edge like solid, dotted, open triangle, or diamond can "inherit" from this hard object
 * @constructor
 * @return properties of an edge
 */
function createEdge() {
  let start = undefined
  let end = undefined

  return {
    /**
     * Connects two nodes
     * @param {Object} s the start node
     * @param {Object} e the end node
     * @memberof createEdge
     */
    connect: (s, e) => {
      start = s
      end = e
    },
    /**
     * Returns the starting node
     * @return {Object} the starting node
     * @memberof createEdge
     */
    getStart: () => {
      return start
    },
    /**
     * Returns the ending node
     * @return {Object} the ending node
     * @memberof createEdge
     */
    getEnd: () => {
      return end
    },
    /**
     * Returns the type of this object
     * @return {string} the type of the object
     * @memberof createEdge
     */
    getType: () => {
      return 'EDGE'
    },
  }
}