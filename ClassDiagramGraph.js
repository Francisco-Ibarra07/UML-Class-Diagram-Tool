/**
 * Declaration of a hard object for a class diagram graph
 * This object graph inherits from this generic framework object Graph
 * @extends createGraph
 * @constructor
 * @return properties of a class diagram graph
 */
function createClassDiagramGraph() {
  let superGraph = createGraph()

  return {
    /**
    * Calls the superclass to add a node to the graph
    * @param {Object} n the node to add
    * @memberof createClassDiagramGraph
    */
    add: (n) => {
      superGraph.add(n)
    },
    /**
    * Calls the superclass to delete a node to the graph
    * @param {Object} n the node to delete
    * @memberof createClassDiagramGraph
    */
    delete: (n) => {
      superGraph.delete(n)
    },
    /**
    * Calls the superclass to find a node given a point
    * @param {Object} p the point to check
    * @return {Object} the node that is within the given point. Returns undefined if no node was found
    * @memberof createClassDiagramGraph
    */
    findNode: (p) => {
      return superGraph.findNode(p)
    },
    /**
    * Calls the superclass to draw all the nodes and edges
    * @memberof createClassDiagramGraph
    */
    draw: () => {
      superGraph.draw()
    },
    /**
     * Calls the superclass to connect two nodes
     * @param {Object} e the type of edge
     * @param {Object} p1 node 1
     * @param {Object} p2 node 2
     * @param {Object} g a reference to this graph
     * @return {boolean} whether the nodes were successfully connected
     * @memberof createClassDiagramGraph
     */
    connect: (e, p1, p2, g) => {
      return superGraph.connect(e, p1, p2, g)
    },
    /**
     * Gets the types of nodes to be placed in the toolbar
     * @return {Array} the types of nodes
     * @memberof createClassDiagramGraph
     */
    getNodePrototypes: () => {
      let nodeTypes = [createClassNode(), createInterfaceNode(), createNoteNode(), createPackageNode()]
      return nodeTypes
    },
    /**
     * Gets the types of deges to be placed in the toolbar
     * @return {Array} the types of edges
     * @memberof createClassDiagramGraph
     */
    getEdgePrototypes: () => {
      let edgeTypes = [createSolidEdge(), createDottedEdge(), createDiamondEdge(), createOpenTriangleEdge()]
      return edgeTypes
    }
  }
}