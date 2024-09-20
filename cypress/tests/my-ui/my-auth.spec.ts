
describe("User Sign-up and Login", function () {
    beforeEach(function () {
        cy.visit("/signin");

        cy.task("db:seed"); // Resets the DB 

        cy.intercept("POST", "/users").as("signup"); // To intercept network request
    });

    it("should redirect unauthenticated user to signin page", function () {
        cy.visit("/bankaccounts");

        cy.location("pathname")
        .should("equal", "/signin")
        .and("not.include", "/bankaccounts")
        ;
    });

    it("UsingCommands: should redirect to home page after successful login", function () {
        cy.login("Dina20", "s3cret");
        cy.location("pathname").should("equal", "/");
    });

    it("should redirect to home page after successful login", function () {
        cy.get("[data-test=signin-username]").type("Dina20");
        cy.get("[data-test=signin-password]").type("s3cret");
        cy.get("[data-test=signin-submit]").click();
        cy.location("pathname").should("equal", "/");
    });

    it("should redirect to signin page and error message should popup after unsuccessful login", function () {
        // Login with wrong Username
        cy.get("[data-test=signin-username]").type("Dina22");
        cy.get("[data-test=signin-password]").type("s3cret");
        cy.get("[data-test=signin-submit]").click();
        // Should send user back to signin page
        cy.location("pathname").should("equal", "/signin");
        // Should show error message "Username or password is invalid"
        cy.get("[data-test=signin-error]").should("have.text", "Username or password is invalid")
    });

    it.only("should be possible to sign-up, login, create bank account and logout", function () {



        const newUser = {
            firstName: "Edgar",
            lastName: "Musket",
            username: "EMusket",
            password: "s3cret+" + ((Math.random() + 1).toString(36).substring(5)),

            bankName: "Gringotts",
            bankAccountNumber: "123456789",
            bankRoutingNumber: "012345678"
        };
        // Sign-up
        cy.get("[data-test=signup]").click();
        cy.get("[data-test=signup-first-name]").type(newUser.firstName);
        cy.get("[data-test=signup-last-name]").type(newUser.lastName);
        cy.get("[data-test=signup-username]").type(newUser.username);
        cy.get("[data-test=signup-password]").type(newUser.password);
        cy.get("[data-test=signup-confirmPassword]").type(newUser.password);

        cy.get("[data-test=signup-submit]").click();


        // Wait so the user is created
        // cy.wait(500);
        // cy.wait("@signup");
        // Wait & make sure User is created 201 = (created)
        cy.wait("@signup").its("response.statusCode").should("equal", 201);

        // Should get back to singin
        cy.location("pathname").should("equal", "/signin");


        // Login
        cy.get("[data-test=signin-username]").type(newUser.username);
        cy.get("[data-test=signin-password]").type(newUser.password);

        cy.get("[data-test=signin-submit]").click();
        cy.location("pathname").should("equal", "/");

        // Pass get starting modal
        cy.get("[data-test=user-onboarding-next]").click();

        // Should ask to create Bank Account in modal
        cy.get("[data-test=user-onboarding-dialog-title]").should("contain", "Create Bank Account");
        

        cy.get("[data-test=bankaccount-bankName-input]").type(newUser.bankName);
        cy.get("[data-test=bankaccount-routingNumber-input]").type(newUser.bankRoutingNumber);
        cy.get("[data-test=bankaccount-accountNumber-input]").type(newUser.bankAccountNumber);

        cy.get("[data-test=bankaccount-submit]").click();

        // Wait so the BankAccount is created
        // cy.wait(500);
        // cy.wait("@gqlCreateBankAccountMutation");

        // Should say Finished in modal
        cy.get("[data-test=user-onboarding-dialog-title]").should("contain", "Finished");
        

        cy.get("[data-test=user-onboarding-next]").click();

        // Logout
        cy.get("[data-test=sidenav-signout]").click();

        // Should get back to singin
        cy.location("pathname").should("equal", "/signin");

    });

    /* For Easy copy
    cy.get("[data-test=]")
    */
});