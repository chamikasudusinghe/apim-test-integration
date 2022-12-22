/*
 * Copyright (c) 2022, WSO2 LLC. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import PublisherComonPage from "../pages/publisher/PublisherComonPage";
import DevportalComonPage from "../pages/devportal/DevportalComonPage";

class Portals {
    static logInToPublisher(username = 'admin', password = 'admin'){
        var portal = 'publisher';
        Cypress.log({
            name: 'logInToPublisher',
            message: `${username} | ${password}`,
        })
    
        cy.intercept('**/logincontext*').as('logincontext');
        cy.visit(portal);
        cy.wait('@logincontext', { requestTimeout: 30000 });
        cy.url().should('contain', `/authenticationendpoint/login.do`);
        cy.get('#usernameUserInput').click();
        cy.get('#usernameUserInput').type(username);
        cy.get('#password').type(password);
        cy.intercept('**/api/am/publisher/v1/apis?limit**').as('getapis');
        
        //cy.get('button[type="submit"]').click();
        cy.get('#loginForm').submit();
        cy.wait('@getapis', { requestTimeout: 30000 });
        PublisherComonPage.waitUntillLoadingComponentsExit()
        cy.url().should('contain', portal);
    }

    static logInToDevportal(username = 'admin', password = 'admin'){
        var portal = 'devportal';
        Cypress.log({
            name: 'logInToDevportalr',
            message: `${username} | ${password}`,
        })
        cy.intercept('**/api/am/store/v1/apis?limit**').as('getapis');
        cy.visit('/devportal/apis?tenant=carbon.super');
        DevportalComonPage.waitUntillLoadingComponentsExit()
        cy.wait('@getapis', { requestTimeout: 30000 });
        cy.get('[data-testid="itest-devportal-sign-in"]').click();
        cy.url().should('contain', `/authenticationendpoint/login.do`);
        cy.wait(2000);

        cy.get('#usernameUserInput').click();
        cy.get('#usernameUserInput').type(username);
        cy.wait(1000);
        cy.get('#password').type(password);
        cy.wait(1000);
        
        //cy.get('button[type="submit"]').click();
        cy.get('#loginForm').submit();
        cy.wait('@getapis', { requestTimeout: 30000 });
        DevportalComonPage.waitUntillLoadingComponentsExit()
        cy.url().should('contain', portal);
        cy.wait(2000);
    }

}
export default Portals;