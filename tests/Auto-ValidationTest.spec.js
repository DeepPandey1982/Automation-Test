import { test, expect } from '@playwright/test';
import { BugsFormPage } from '../pages/BugsFormPage';
import fs from 'fs';
import yaml from 'yaml';

// Load test cases from the YAML file using a relative path
const file = fs.readFileSync('./config/testCases.yaml', 'utf8');
const testCases = yaml.parse(file).testCases;

test.describe('Bugs Form - Field Validation', () => {
  for (const testCase of testCases) {
    // Check if the test case should be executed
    if (testCase.run) {
      test(testCase.name, async ({ page }) => {
        const bugsForm = new BugsFormPage(page);

        await bugsForm.navigate();

        // Fill all fields dynamically
        await bugsForm.fillFirstName(testCase.inputs.firstName);
        await bugsForm.fillLastName(testCase.inputs.lastName);
        await bugsForm.fillPhoneNumber(testCase.inputs.phoneNumber);
        await bugsForm.fillEmail(testCase.inputs.email);
        await bugsForm.fillPassword(testCase.inputs.password);
        await bugsForm.selectCountry(testCase.inputs.country);

        // Handle the terms checkbox
        if (testCase.inputs.terms) {
          await bugsForm.checkTerms();
        } else {
          await bugsForm.uncheckTerms();
        }

        // Submit the form
        await bugsForm.submitForm();

        // Validate the result
        const isSuccess = await bugsForm.isSuccessMessageVisible();
        expect(isSuccess).toBe(testCase.expectedSuccess);
      });
    } else {
      test.skip(testCase.name, async () => {
        console.log(`Skipping test: ${testCase.name}`);
      });
    }
  }
});