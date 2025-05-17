describe('Test Login Feature untuk web Orange HRM',() => {
    context('Login Feature', () => {
        let loginData;

        beforeEach(() => {
            cy.fixture("dataLogin").then((data) => {
                loginData = data;

                expect(loginData).to.be.not.undefined;
                expect(loginData).to.be.exist;
            });
        });

        it("Login dengan valid data", () => {
            cy.visit("/auth/login");
            cy.xpath(`//input[@placeholder='Username']`).click().clear().type(loginData.validData.username);
            cy.xpath(`//input[@placeholder='Password']`).click().clear().type(loginData.validData.password);
            cy.xpath(`//button[@type='submit']`).click();
        });

        it("Login dengan invalid data", () => {
            cy.visit("/auth/login");
            cy.xpath(`//input[@placeholder='Username']`).click().clear().type(loginData.invalidData.username);
            cy.xpath(`//input[@placeholder='Password']`).click().clear().type(loginData.invalidData.password);
            cy.xpath(`//button[@type='submit']`).click();
        });  
        
        it("Login dengan empty data", () => {
            cy.visit("/auth/login");
            cy.xpath(`//input[@placeholder='Username']`).click().clear();
            cy.xpath(`//input[@placeholder='Password']`).click().clear();
            cy.xpath(`//button[@type='submit']`).click();
        });
    })

})