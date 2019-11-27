/**
 * Declaration of a hard object for a property sheet
 * This object allows editing properties of nodes
 * @constructor
 * @return properties of a property sheet object
 */
function createPropertySheet() {

    // Grab a reference to the html divs
    const propertysheetModal = document.getElementById('propertysheet')
    const propertysheet = document.getElementById('propertysheet-content')

    return {
        /**
         * Given a node, this method creates a text box for each property so the user can edit
         * @param {Object} nodeSelectedToEditProperties the target node
         * @param {Object} repaintFunction a reference to the repaint function
         * @memberof createPropertySheet
         */
        update: (nodeSelectedToEditProperties, repaintFunction) => {

            // Clear property sheet and grab the properties of the node that was double-clicked on
            propertysheet.innerHTML = ''
            let properties = nodeSelectedToEditProperties.getProperties()

            // If this node doesn't have properties, exit
            if (properties === undefined) { return }

            // Create submit button and initialize its attributes
            const submitButton = document.createElement("button")
            submitButton.innerHTML = 'Submit'

            // Create cancel button and intiialize its attributes
            const cancelButton = document.createElement("button")
            cancelButton.innerHTML = 'Cancel'

            // Create a textbox for each property given
            let newTextbox = undefined
            let textBoxNametag = undefined
            for (let x in properties) {
                // Create a new textbox
                newTextbox = document.createElement("textarea")
                newTextbox.id = x
                newTextbox.name = x
                newTextbox.cols = "100"
                newTextbox.rows = "4"

                // Create the tag for this textbox
                textBoxNametag = document.createElement("p")
                textBoxNametag.innerHTML = x.toUpperCase()
                textBoxNametag.style.fontWeight = 'bold'

                // If there are previous contents, display them on the textbox
                if (properties[x] !== undefined) {
                    newTextbox.value = properties[x].join('\n') // Concatenate the array
                }

                // Add the name tag and the corresponding text box to property sheet
                propertysheet.appendChild(textBoxNametag)
                propertysheet.appendChild(newTextbox)
            }

            // Add the submit and cancel buttons to the property sheet
            propertysheet.appendChild(submitButton)
            propertysheet.appendChild(cancelButton)

            // Add an on-click listener to the button
            submitButton.onclick = function () {

                // Iterate through all the text boxes
                let textboxContents = undefined
                let newProperties = {}
                let splittedAtNewLineChar
                for (let x in properties) {
                    // Grab the contents of the box
                    textboxContents = document.getElementById(x).value

                    // Split the text into an array. The split happens at each new line character
                    splittedAtNewLineChar = textboxContents.split(/\r?\n/)

                    // Pass that array back to the node
                    newProperties[x] = splittedAtNewLineChar
                }

                // Set the new properties for the passed in object
                nodeSelectedToEditProperties.setProperties(newProperties)

                // Repaint
                repaintFunction()

                // Hide and clear the property sheet on the way out
                propertysheet.innerHTML = ''
                propertysheetModal.style.display = "none"
            }
            cancelButton.onclick = function () {
                // Hide and clear the property sheet on the way out
                propertysheet.innerHTML = ''
                propertysheetModal.style.display = "none"
            }
        },
        /**
         * Displays the property sheet
         * @memberof createPropertySheet
         */
        show: () => {
            propertysheetModal.style.display = "block"
        },
        /**
         * Hides the property sheet
         * @memberof createPropertySheet
         */
        hide: () => {
            propertysheetModal.style.display = "none"
        }
    }
}