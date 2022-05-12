class Nl_template_PO {

    /**
     * @param {string} url The newsletter web view URL
     * */
    constructor(url) {
        this.url = url;
    }

    /**
     * Returns an array of attributes given an element
     * @param {string} element
     * @param {string} attribute
     * @return {Promise<*>}
     */
    getLinksByElementAttribute = async (element, attribute) => {
        /**@type{array}*/
        let arrayHTML = [];
        return new Cypress.Promise((resolve) => {
            cy.get(element).each(($el, index) => {
                const attributeValue = $el.attr(attribute) 
               if(attributeValue && attributeValue.startsWith('http')) {
                    arrayHTML.push(attributeValue);
                }
                    resolve(arrayHTML);
            });
        });
    }
}

export default Nl_template_PO;