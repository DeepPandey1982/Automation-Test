export class BugsFormPage {
    constructor(page) {
      this.page = page;
  
      // 🔹 Form fields
      this.firstNameInput = '#firstName'; // First Name field
      this.lastNameInput = '#lastName'; // Last Name field
      this.phoneNumberInput = '#phone'; // Phone Number field
      this.emailInput = '#emailAddress'; // Email Address field
      this.passwordInput = '#password'; // Password field
  
      // 🔹 Dropdowns
      this.countryDropdown = '#countries_dropdown_menu'; // Country dropdown
  
      // 🔹 Checkboxes
      this.termsCheckbox = '#registerForm > div.form-check > label'; // Terms and Conditions checkbox
  
      // 🔹 Buttons
      this.registerBtn = '#registerBtn'; // Register button
  
      // 🔹 Messages
      this.successAlert = '#message'; // Success message
      this.errorAlert = '#message'; // Error message
    }
  
    async navigate() {
      await this.page.goto('https://qa-practice.netlify.app/bugs-form');
    }
  
    async fillFirstName(value) {
      await this.page.fill(this.firstNameInput, value);
    }
  
    async fillLastName(value) {
      await this.page.fill(this.lastNameInput, value);
    }
  
    async fillPhoneNumber(value) {
      await this.page.fill(this.phoneNumberInput, value);
    }
  
    async fillEmail(value) {
      await this.page.fill(this.emailInput, value);
    }
  
    async fillPassword(value) {
      await this.page.fill(this.passwordInput, value);
    }
  
    async selectCountry(value) {
      await this.page.selectOption(this.countryDropdown, value);
    }
  
    async checkTerms() {
      await this.page.check(this.termsCheckbox);
    }
  
    async uncheckTerms() {
      await this.page.uncheck(this.termsCheckbox);
    }
  
    async submitForm() {
      await this.page.click(this.registerBtn);
    }
  
    async isSuccessMessageVisible() {
      return await this.page.isVisible(this.successAlert);
    }
  
    async isErrorMessageVisible() {
      return await this.page.isVisible(this.errorAlert);
    }
  }