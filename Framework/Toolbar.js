/**
 * Declaration of a hard object for a toolbar
 * Any rectangle node or edge prototype can be placed in the toolbar
 * @constructor
 * @param {Object} graph the graph to create a toolbar for
 * @return properties of a toolbar
 */
function createToolbar(graph) {

  let nodes = graph.getNodePrototypes()
  let edges = graph.getEdgePrototypes()
  let toolbarElements = []
  let currentOffsetForNextToolbarElement = 0
  const toolbarElementSize = {
    width: 100,
    height: 50,
  }
  let toolbarBounds = {
    x: 0,
    y: 0,
    width: currentOffsetForNextToolbarElement + toolbarElementSize.width,
    height: toolbarElementSize.height
  }
  let newToolElement = undefined

  // Create grabber
  newToolElement = createToolbarElement('GRABBER', toolbarElementSize, currentOffsetForNextToolbarElement)
  newToolElement.setIsSelected(true) // By default mark this tool as selected on startup
  newToolElement.draw()

  // Add it to the list of toolbar elements
  toolbarElements.push(newToolElement)

  // Increase the size of the toolbar
  toolbarBounds.width += toolbarElementSize.width
  currentOffsetForNextToolbarElement += toolbarElementSize.width

  // Mark it as 'selected'
  let selectedNode = newToolElement

  // Add all node prototypes given by the graph
  for (let i = 0; i < nodes.length; i++) {
    newToolElement = createToolbarElement(nodes[i], toolbarElementSize, currentOffsetForNextToolbarElement)

    newToolElement.draw()
    toolbarElements.push(newToolElement)
    toolbarBounds.width += toolbarElementSize.width
    currentOffsetForNextToolbarElement += toolbarElementSize.width
  }

  // Add all edge prototypes given by the graph
  for (let i = 0; i < edges.length; i++) {
    newToolElement = createToolbarElement(edges[i], toolbarElementSize, currentOffsetForNextToolbarElement)

    newToolElement.draw()
    toolbarElements.push(newToolElement)
    toolbarBounds.width += toolbarElementSize.width
    currentOffsetForNextToolbarElement += toolbarElementSize.width
  }

  return {
    /**
      * Returns the rectangular bounds of this node
      * @return the bounds
      * @memberof createToolbar
      */
    getBounds: () => {
      return toolbarBounds
    },
    /**
     * Returns the currently selected element in the toolbar
     * @return {Object} the selected toolbar element
     * @memberof createToolbar
     */
    getSelected: () => {
      return selectedNode
    },
    /**
     * Redraws the toolbar
     * @memberof createToolbar
     */
    redraw: () => {
      for (let i = 0; i < toolbarElements.length; i++) {
        toolbarElements[i].draw()
      }
    },
    /**
     * Checks if the toolbar was clicked
     * @param {Object} p is the point to check
     * @return {boolean} whether the toolbar was clicked
     * @memberof createToolbar
     */
    areaIsClicked: (p) => {
      const x = toolbarBounds.x
      const y = toolbarBounds.y
      const width = toolbarBounds.width
      const height = toolbarBounds.height

      return x <= p.x && p.x <= x + width && y <= p.y && p.y <= y + height
    },
    /**
     * Given a point, marks a new toolbar element as selected
     * @memberof createToolbar
     * @param {Object} point is the point to check
     */
    selectNode: (point) => {
      for (let i = 0; i < toolbarElements.length; i++) {
        let element = toolbarElements[i]
        if (element.contains(point)) {
          element.setIsSelected(true)
          selectedNode = element
        }
        else {
          element.setIsSelected(false)
        }
      }
    }
  }
}
