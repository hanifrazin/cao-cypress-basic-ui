import { faker } from "@faker-js/faker";
import login from "../fixtures/dataLogin.json";
import karyawan from "../fixtures/dataKaryawan.json";

describe('Automation UI E2E Flow Request Cuti untuk Karyawan Baru',() => {
    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${middleName} ${lastName}`;
    let empId;
    const numbUsr = faker.number.int({min:100,max:999});
    const username = firstName.length < 5 ? `${firstName}_${numbUsr}` : firstName;
    const password = `${firstName}@@12345`;
    const role = 'ESS';
    const status = 'Enabled';
        
    before(() => {
        // Flow 1 dan 2 - Menambah Karyawan Baru dan Tambah Kuota Cuti 
        empId = faker.number.int({min:10001,max:99999});
        cy.login(login.validData.username, login.validData.password);
        cy.TambahKaryawanBaru(firstName, middleName, lastName, empId);
        cy.TambahAkunKaryawan(fullName,role,status,username,password,firstName,lastName);
        cy.TambahJatahCuti(fullName,karyawan.izinCuti.leaveType,karyawan.izinCuti.days);
        cy.task('log',`\n\nUsername : ${username}\nPassword : ${password}\nFull Name : ${fullName}\n\n`);
        cy.logout();
    })

    it('Request Cuti oleh Karyawan Baru', () => {
        cy.login(username,password);
        cy.xpath(`//p[@class="oxd-userdropdown-name"]`).should('have.text',`${firstName} ${lastName}`);
        cy.xpath(`//a[@href="/web/index.php/leave/viewLeaveModule"]`).click();
        cy.url(`/leave/viewMyLeaveList`).should('include','/leave/viewMyLeaveList');
        cy.get(`nav > ul > li:nth-of-type(1)`).click();
        cy.url(`/leave/applyLeave`).should('include','/leave/applyLeave');
        cy.xpath(`//form/div/div/div/div/div[2]/div/div/div[2]`).click();
        cy.wait(3000)
        cy.contains(`${karyawan.izinCuti.leaveType}`).click();
        cy.xpath(`//form/div/div/div/div/div[2]/div/div/div[1]`).contains(`${karyawan.izinCuti.leaveType}`);
        cy.contains(`${karyawan.izinCuti.days}.00 Day(s)`).should('be.visible');
        cy.xpath(`//form/div[2]/div/div[1]/div/div[2]/div/div/input`).click();
        cy.wait(3000);
        cy.contains(21).click();
        cy.xpath(`//form/div[2]/div/div[2]/div/div[2]/div/div/input`).click();
        cy.wait(3000);
        cy.contains(26).click();
        cy.xpath(`//form/div[3]/div/div/div/div[2]/div/div/div[2]`).click();
        cy.contains('All Days').click();
        cy.xpath(`//form/div[3]/div/div[2]/div/div[2]/div/div/div[2]`).click();
        cy.contains(`Half Day - Morning`).click();
        cy.xpath(`//textarea[@class="oxd-textarea oxd-textarea--active oxd-textarea--resize-vertical"]`).click().clear().type('Saya mau healing sejenak');
        cy.screenshot();
        cy.xpath(`//button[@type="submit"]`).click();
        cy.wait(3000);
        cy.get(`nav > ul > li:nth-of-type(2)`).click();
        cy.url(`/leave/viewMyLeaveList`).should('include','/leave/viewMyLeaveList');
        cy.get(`.orangehrm-container`).scrollIntoView();
        cy.wait(3000)
        cy.screenshot();
        cy.logout();
    });

    it('HR Approve Cuti', () => {
        cy.login(login.validData.username,login.validData.password);
        cy.xpath(`//a[@href="/web/index.php/leave/viewLeaveModule"]`).click();
        cy.url(`/leave/viewLeaveList`).should('include','/leave/viewLeaveList');
        cy.get(`.orangehrm-container`).scrollIntoView();
        cy.get('.orangehrm-container > .oxd-table > .oxd-table-body > .oxd-table-card > .oxd-table-row.oxd-table-row--with-border')
            .first()
            .find('input[type="checkbox"]')
            .check({ force: true });
        cy.screenshot();
        cy.xpath(`//button[@class="oxd-button oxd-button--medium oxd-button--label-success"]`).click();
        cy.xpath(`//div[@class="oxd-dialog-container-default--inner"]`).should('be.visible');
        cy.screenshot();
        cy.xpath(`//div[@class="orangehrm-modal-footer"]/button[2]`).click();
        cy.wait(3000);
        cy.screenshot();
        cy.logout();
    });
        
    it("Karyawan login expect cuti di approved", () => {
        cy.login(username,password);
        cy.xpath(`//p[@class="oxd-userdropdown-name"]`).should('have.text',`${firstName} ${lastName}`);
        cy.xpath(`//a[@href="/web/index.php/leave/viewLeaveModule"]`).click();
        cy.url(`/leave/viewMyLeaveList`).should('include','/leave/viewMyLeaveList');
        cy.get(`.orangehrm-container`).scrollIntoView();
        cy.get('.orangehrm-container > .oxd-table > .oxd-table-body > .oxd-table-card > .oxd-table-row.oxd-table-row--with-border')
            .first()
            .find('input[type="checkbox"]')
            .check({ force: true });
        cy.screenshot();
        cy.xpath(`//div/div/li/button[@type="button"][@class="oxd-icon-button"]`).click();
        cy.xpath(`//ul[@class="oxd-dropdown-menu"]`).contains('View Leave Details').click();
        cy.xpath(`//p[@class="oxd-text oxd-text--p orangehrm-request-details-text"]`).contains(`${fullName}`);
        cy.get('.orangehrm-container > .oxd-table > .oxd-table-body > .oxd-table-card > .oxd-table-row.oxd-table-row--with-border')
            .first()
            .within(() => {
                // Cek kolom Username (kolom ke-2)
                cy.get('.oxd-table-cell.oxd-padding-cell')
                .eq(1)
                .should('contain.text', karyawan.izinCuti.leaveType);
                // Cek kolom User Role (kolom ke-6)
                cy.get('.oxd-table-cell.oxd-padding-cell')
                .eq(4)
                .should('contain.text', 'Taken');
        });
        cy.wait(3000);
        cy.screenshot();
        cy.logout();
    });
});