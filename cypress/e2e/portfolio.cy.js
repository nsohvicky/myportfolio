describe("Victorine portfolio home page", () => {
  it("loads and shows navbar and contact link", () => {
    
    cy.visit("http://localhost:5173/");

   
    cy.contains(/Victorine/i).should("exist");

    cy.contains(/Contact/i).should("exist");
  });
});
