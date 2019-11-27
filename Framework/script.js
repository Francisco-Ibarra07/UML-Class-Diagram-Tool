'use strict'

/**
 * Draws the grabber
 * @function
 * @param {int} x the x value
 * @param {int} y the y value
 */
function drawGrabber(x, y) {
  const size = 5;
  const panel = document.getElementById('graphpanel')
  const ctx = panel.getContext('2d')
  ctx.fillStyle = 'black'
  ctx.fillRect(x - size / 2, y - size / 2, size, size);
}

// main()
document.addEventListener('DOMContentLoaded', function () {
  let graph = createClassDiagramGraph()
  let toolbar = createToolbar(graph)
  let propertySheet = createPropertySheet()

  const panel = document.getElementById('graphpanel')
  let selected = undefined
  let dragStartPoint = undefined
  let dragStartBounds = undefined
  let dragStartNode = undefined
  let visibleEdge = undefined
  let pointNode = undefined

  /**
   * Clears the graph, orders the graph and toolbar nodes to redraw their components, and redraws the grabber around a selected object
   * @function
   */
  function repaint() {
    const ctx = panel.getContext('2d')
    ctx.clearRect(0, 0, 1000, 500)
    panel.innnerHTML = ''
    graph.draw()
    toolbar.redraw()

    if (visibleEdge !== undefined && pointNode !== undefined) {
      visibleEdge.draw()
    }
    if (selected !== undefined) {
      const bounds = selected.getBounds()
      drawGrabber(bounds.x, bounds.y)
      drawGrabber(bounds.x + bounds.width, bounds.y)
      drawGrabber(bounds.x, bounds.y + bounds.height)
      drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
    }
  } // End of repaint()

  /**
   * Given an event variable, this method calculates the x and y coordinates of a mouse click on the graph
   * @param {Object} event is the location of the event given by the JS library
   * @returns {Object} an object with the x and y coordinates of the mouse click
   */
  function mouseLocation(event) {
    let rect = panel.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  } // End of mouseLocation()

  panel.addEventListener('mousedown', event => {
    let mousePoint = mouseLocation(event)
    selected = graph.findNode(mousePoint)

    // If the toolbar was clicked
    if (toolbar.areaIsClicked(mousePoint)) {
      // Mark the clicked on tool as 'selected' by turning its background gray
      toolbar.selectNode(mousePoint)
      repaint()
      return
    }
    // If a node on the graph was clicked on
    if (selected !== undefined) {
      dragStartPoint = mousePoint
      dragStartBounds = selected.getBounds()
      dragStartNode = selected

      const selectedToolType = toolbar.getSelected()
      if (selectedToolType.getTypeOfElement() === 'EDGE') {
        visibleEdge = selectedToolType.getCloneOfPrototype()
      }
    }
    // If the graph was clicked and it wasn't on a node
    else if (selected === undefined) {

      // Grab a clone of the current tool that is selected
      const selectedToolType = toolbar.getSelected()

      // If its of type 'rectangular node'
      if (selectedToolType.getTypeOfElement() === 'RECTANGULAR_NODE') {
        const newRectangleNode = selectedToolType.getCloneOfPrototype()
        const bounds = {
          x: mousePoint.x,
          y: mousePoint.y,
          width: 100,
          height: 100
        }
        newRectangleNode.setBounds(bounds)
        graph.add(newRectangleNode)
      }
      // If its of type 'EDGE'
      else if (selectedToolType.getTypeOfElement() === 'EDGE') {
        // Do something with the edge
      }
    }

    repaint()
  }) // End of mousedown

  panel.addEventListener('mousemove', event => {
    if (dragStartPoint === undefined) {
      return
    }

    // Get the current tool selected
    const selectedToolType = toolbar.getSelected()

    // Get the position of the mouse
    let mousePoint = mouseLocation(event)

    // If a node is being dragged
    if (selected !== undefined) {

      // Get the bounds of this node
      const bounds = selected.getBounds();

      if (selectedToolType.getTypeOfElement() === 'EDGE') {
        if (visibleEdge !== undefined) {
          pointNode = {
            getBounds: () => {
              return {
                x: mousePoint.x,
                y: mousePoint.y,
                width: 0,
                height: 0
              }
            }
          }
          visibleEdge.connect(dragStartNode, pointNode)
        }
      }
      else if (selectedToolType.getTypeOfElement() === 'GRABBER') {

        // translate the node
        selected.translate(dragStartBounds.x - bounds.x + mousePoint.x - dragStartPoint.x,
          dragStartBounds.y - bounds.y + mousePoint.y - dragStartPoint.y);
      }

      repaint()
    }
  }) // End of mousemove

  /**
   * Checks to see if two rectangles are the same
   * @param {rect} b1 
   * @param {rect} b2 
   * @function
   */
  function boundsAreEqual(b1, b2) {
    return (b1.x === b2.x && b1.y === b2.y && b1.width === b2.width && b1.height === b2.height)
  }

  panel.addEventListener('mouseup', event => {

    const selectedToolType = toolbar.getSelected()

    // If its not an edge, return
    if (selectedToolType.getTypeOfElement() === 'EDGE') {

      let mousePoint = mouseLocation(event)
      let selected = graph.findNode(mousePoint)
      let edge = selectedToolType.getCloneOfPrototype()

      if (selected !== undefined && dragStartPoint !== undefined) {
        if (!boundsAreEqual(selected.getBounds(), dragStartBounds)) {
          graph.connect(edge, dragStartPoint, mousePoint, graph)
        }
      }
    }
    visibleEdge = undefined
    pointNode = undefined
    dragStartPoint = undefined
    dragStartBounds = undefined
    dragStartNode = undefined
    repaint()
    repaint()
  }) // End of mouseup

  panel.addEventListener('dblclick', event => {
    const currentTool = toolbar.getSelected().getCloneOfPrototype()

    // Make sure the Grabber tool is selected in order to edit properties
    if (currentTool !== 'GRABBER') {
      return
    }

    // Check to see if the double click happened on a node
    const nodeSelectedToEditProperties = graph.findNode(mouseLocation(event))
    if (nodeSelectedToEditProperties === undefined) {
      return // return if no node was double clicked
    }

    // Pass in the object to the property sheet
    // Also pass in the 'repaint()' function so we can use it to repaint the graph once we update the text of the node
    propertySheet.update(nodeSelectedToEditProperties, repaint)
    propertySheet.show()

  }) // End of dblclick

  const modal = document.getElementById('propertysheet')
  window.onclick = function (event) {
    if (event.target == modal) {
      propertySheet.hide()
    }
  }

}) // End of DOMContentLoad
