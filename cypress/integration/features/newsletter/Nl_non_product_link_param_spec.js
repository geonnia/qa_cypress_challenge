import Nl_helper from '../../../support/helpers/Nl_helper';
import Nl_template_PO from '../../../support/pageObjects/Nl_template_PO';
/// <reference types="Cypress" />

describe('Check tracking parameters for non-product links', () => {
    /** @type {Nl_helper} */
    const nl_helper = new Nl_helper();

    /** @type {object} */
    const nl_url_list = nl_helper.getTestData('nl_urls.json');

    /** @type {Nl_template_PO} */
    const nl_template = new Nl_template_PO();

    // Ignore errors from the site itself
    Cypress.on('uncaught:exception', () => {
        return false;
    });

    it('C962349 Check if utm_campaign value of all non product links is the same, url: ',() => {
        for (const [, url] of Object.entries(nl_url_list)) {
            cy.visit(`${url}`);

            const linksArrayPromise = nl_template.getLinksByElementAttribute('a', 'href');
            
            cy.wrap(linksArrayPromise).then(linksArray => {
                //filter out all links which contain utm_campaign
                let linksWithParamsArray = nl_helper.extractParameterValues(linksArray, 'utm_campaign');
                //check if the links were found
                expect(linksWithParamsArray.length).greaterThan(0);
                //getting values of utm_campaign
                let uniqueParameterValues = linksWithParamsArray.reduce((carry, current) => {
                    if(current.parameterValue !== null) {    
                        carry.add(current.parameterValue);
                    }
                    return carry;
                }, new Set());
                //check if all parameter values are equal to each other
                expect(uniqueParameterValues.size).eq(1);
            });
        }

    });

    it('C955682 Check if wpset value of all non product links is the same, url: ',() => {
        for (const [, url] of Object.entries(nl_url_list)) {
            cy.visit(`${url}`);
     
            const linksArrayPromise = nl_template.getLinksByElementAttribute('a', 'href');
             
            cy.wrap(linksArrayPromise).then(linksArray => {
                //filter out all links which contain wpset
                let linksWithParamsArray = nl_helper.extractParameterValues(linksArray, 'wpset');
                //check if the links were found
                expect(linksWithParamsArray.length).greaterThan(0);

                //getting values of wpset
                let uniqueParameterValues = linksWithParamsArray.reduce((carry, current) => {
                    if(current.parameterValue !== null) {            
                        carry.add(current.parameterValue);
                    }
                    return carry;
                }, new Set());
                //check if all paramter values are equal to each other
                expect(uniqueParameterValues.size).eq(1);
            
            });
        }
    });
});
