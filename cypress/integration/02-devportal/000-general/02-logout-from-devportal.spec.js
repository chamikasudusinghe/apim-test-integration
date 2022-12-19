
/*
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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

describe("devportal-000-02 : Verify a user can perform login and logout in devportal", () => {
    const developer = 'developer';
    const password = 'test123';
    const carbonUsername = 'admin';
    const carbonPassword = 'admin';

    before(function(){
        //cy.carbonLogin(carbonUsername, carbonPassword);
        //cy.addNewUser(developer, ['Internal/subscriber', 'Internal/everyone'], password);
    })
    it.only("User can login and logout from devportal", () => {
        cy.loginToDevportal(developer, password);
        cy.wait(3000);
        cy.logoutFromDevportal();
    });

    after(() => {
        //cy.visit('carbon/user/user-mgt.jsp');
        //cy.deleteUser(developer);
    })
})