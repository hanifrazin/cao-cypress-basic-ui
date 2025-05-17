describe('Test Login Feature untuk web Orange HRM',() => {
    context('Login Feature', () => {
        let loginData;

        beforeEach(() => {
            cy.fixture("dataLogin").then((data) => {
                loginData = data;

                expect(loginData).to.be.not.undefined;
                expect(loginData).to.be.exist;
            });
            cy.visit("/auth/login");
        });

        it("Login dengan valid data", () => {
            cy.xpath(`//input[@placeholder='Username']`).click().clear().type(loginData.validData.username);
            cy.xpath(`//input[@placeholder='Password']`).click().clear().type(loginData.validData.password);
            cy.xpath(`//button[@type='submit']`).click();
        });

        it("Login dengan invalid data", () => {
            cy.xpath(`//input[@placeholder='Username']`).click().clear().type(loginData.invalidData.username);
            cy.xpath(`//input[@placeholder='Password']`).click().clear().type(loginData.invalidData.password);
            cy.xpath(`//button[@type='submit']`).click();
            cy.xpath(`//div[@class="oxd-alert oxd-alert--error"]`).should('be.visible')
            cy.xpath(`//p[text()="Invalid credentials"]`).should('contain',loginData.invalidData.errorLoginMessage);
        });  
        
        it("Login dengan empty data", () => {
            cy.xpath(`//input[@placeholder='Username']`).click().clear();
            cy.xpath(`//input[@placeholder='Password']`).click().clear();
            cy.xpath(`//button[@type='submit']`).click();
            cy.xpath(`//input[@class="oxd-input oxd-input--active oxd-input--error"][@name="username"]`).should('be.visible');
            cy.xpath(`//input[@class="oxd-input oxd-input--active oxd-input--error"][@name="password"]`).should('be.visible');
            cy.xpath(`//span[text()="Required"]`).should('contain',loginData.emptyData.errorLoginMessage);
        });

        context('Forgot Password Feature', () => {
            beforeEach(() => {
                cy.xpath(`//div[@class="orangehrm-login-forgot"]`).click();
                cy.url("/auth/requestPasswordResetCode");
            });

            it("Success Reset Password dengan Username is not empty", () => {
                cy.xpath(`//input[@placeholder='Username']`).click().clear().type(loginData.validData.username);
                cy.xpath(`//button[@type='submit']`).click();
                cy.url(`/auth/sendPasswordReset`);
                cy.xpath(`//h6[text()="Reset Password link sent successfully"]`).should('contain',loginData.validData.successResetPassword);
            });

            it("Failed Reset Password dengan Username is empty", () => {
                cy.xpath(`//input[@placeholder='Username']`).click().clear();
                cy.xpath(`//button[@type='submit']`).click();
                cy.xpath(`//input[@class="oxd-input oxd-input--active oxd-input--error"][@name="username"]`).should('be.visible');
                cy.xpath(`//span[text()="Required"]`).should('contain',loginData.emptyData.errorLoginMessage);
            });
        });
    });
})