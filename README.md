# Tugas 3 - Cypress Basic UI

 ### Reference UI Web
 [Orange HRM Open Source Management](https://opensource-demo.orangehrmlive.com/web/index.php)

### Requirement Dependencies
 1. cypress
 1. cypress-xpath
 1. faker

### Scope Automation Flow in this Project 
1. Add New Employee
    ```
    a. Login as Admin
    b. Add new employee at PIM Menu --> Add Employee
    c. Create an account for new employee at Admin menu --> users --> add
    ```

 1. Add Leave Entitlement
    ```
    a. Login as Admin
    b. Add Leave Entitlement for new employee at Leave menu --> Entitlement
    ```
    
 1. New Employee Leave Request
    ```
    a. Login as New Employee
    b. Leave Request
    c. Login as Admin
    d. Approve employee request
    e. Login as New Employee
    f. Expect approve leave request
    ```

### How to Run the Code

 1. Clone [this repo](https://github.com/hanifrazin/cao-cypress-basic-ui) to your local
 1. Open the project using Visual Studio Code
 1. Type bellow command in terminal at VS Code
	 ```
     npm install
     ```
     > You only need to run `npm install` once to install dependencies such as `cypress, cypress-xpath, faker`
 4. After that you can run using one of bellow command

	 ```
     npx cypress open 
     ```
     Or
     ```
     npx cypress run --spec cypress/e2e/e2e-employee-orange-hrm.cy.js --browser chrome       
     ```

 ### Note
 You can see my recording video to see how it looks like [running this automation](https://drive.google.com/file/d/1BHyWVNeVX5kxajhbSBQ-_H1lQlk-Dery/view?usp=sharing) 
