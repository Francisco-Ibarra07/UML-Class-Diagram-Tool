/**
 * Declaration of a hard object for a graph
 * Any graphs like a class diagram, sequence, object diagram graph can inherit from this generic object
 * @constructor
 * @return properties of a graph
 */
function createGraph() {
  let nodes = []
  let edges = []

  return {
    /**
     * Adds a node to the graph
     * @param {Object} n the node to add
     * @memberof createGraph
     */
    add: (n) => {
      if (n.getTypeOfSuperClass() === 'RECTANGULAR_NODE') {
        nodes.push(n)
      }
      if (n.getTypeOfSuperClass() === 'EDGE') {
        edges.push(n)
      }
    },
    /**
     * Deletes a node to the graph
     * @param {Object} n the node to delete
     * @memberof createGraph
     */
    delete: (n) => {
      if (n.getTypeOfSuperClass() === 'RECTANGULAR_NODE') {
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i] === n) {
            nodes.splice(i, 1)
            return
          }
        }
      }
      if (n.getTypeOfSuperClass() === 'EDGE') {
        for (let i = 0; i < edges.length; i++) {
          if (edges[i] === n) {
            edges.splice(i, 1)
            return
          }
        }
      }
    },
    /**
     * Checks whether the given point is within a node
     * @param {Object} p the point
     * @return {Object} the node containing the point
     * @memberof createGraph
     */
    findNode: (p) => {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i]
        if (n.contains(p)) return n
      }
      return undefined
    },
    /**
     * Calls all the nodes and edges in the graph commands them to draw
     * @memberof createGraph
     */
    draw: () => {
      for (const n of nodes) {
        n.draw()
      }
      // Draws the lines that connect circles
      for (const e of edges) {
        e.draw()
      }
    },
    /**
     * Connects two nodes together with an edge
     * @param {Object} e the type of edge
     * @param {Object} p1 node 1
     * @param {Object} p2 node 2
     * @param {Object} g a reference to this graph
     * @return {boolean} whether the nodes were successfully connected
     * @memberof createGraph
     */
    connect: (e, p1, p2, g) => {
      const n1 = g.findNode(p1)
      const n2 = g.findNode(p2)
      if (n1 !== undefined && n2 !== undefined) {
        e.connect(n1, n2)
        edges.push(e)
        return true
      }
      return false
    }
  }
}