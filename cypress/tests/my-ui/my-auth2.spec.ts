
describe("User Sign-up and Login", function () {


    beforeEach(function () {
        cy.visit("/signin");
    });

    it.only("should redirect unauthenticated user to signin page", function () {
        cy.visit("/bankaccounts");
    
        cy.location("pathname").should("equal", "/signin");
    });


    it("should redirect to home page after successful login", function () {
        cy.get("[data-test=signin-username]").type("Dina20");
        cy.get("[data-test=signin-password]").type("s3cret");
        // cy.get("[data-test=signin-submit]").click();
        cy.get('button[type="submit"]').click();
        cy.location("pathname").should("equal", "/");
    });


    it("should redirect to home page after successful login using exprect", function () {
        cy.get("[data-test=signin-username]").type("Dina20");
        cy.get("[data-test=signin-password]").type("s3cret");
        // cy.get("[data-test=signin-submit]").click();
        cy.get('button[type="submit"]').click();
        cy.location("pathname").then((pathname) => {
            expect(pathname).to.equal("/signin");
            expect(pathname).to.not.include("/bankaccounts");
          });
          
    });
    
    
});

// <button class="MuiButtonBase-root MuiButton-root MuiButton-containedmakeStyles-submit-53 MuiButton-containedPrimary MuiButton-fullWidth" 
// tabindex="0" type="submit" data-test="signin-submit"><span class="MuiButton-label">
//  Sign In</span><span class="MuiTouchRipple-root"></span></button>




/*
beforeEach(function () {
    cy.visit("/signin");

    cy.task("db:seed"); // Resets the DB 

    cy.intercept("POST", "/users").as("signup"); // To intercept network request
});

it("should redirect unauthenticated user to signin page", function () {
    cy.visit("/bankaccounts");

    cy.location("pathname").should("equal", "/signin");
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


/* For Easy copy
cy.get("[data-test=]")
*/