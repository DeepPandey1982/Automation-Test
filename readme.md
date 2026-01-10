# QA-Datacom Project

This project automates the testing of the Bugs Form using Playwright and Pytest. It uses the Page Object Model (POM) design pattern to organize the code for better maintainability. The project also integrates GitHub Workflows for automated test execution and dependency management.

## Prerequisites

- Python 3.8 or higher
- Node.js (required for Playwright browsers)
- Git (to clone the repository)

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DeepPandey1982/Automation-Test.git
   cd QA-Datacom
   ```

2. **Create and activate a virtual environment (optional)**:
   - On Windows:
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
  

3. **Install Playwright browsers**:
   ```bash
   playwright install
   ```

## Running the Tests Locally

To execute the tests locally, run the following command:
'''
npx playwright test tests/Auto-ValidationTest1.spec.js 
'''


## GitHub Workflow for Automated Testing

This project uses GitHub Workflows to automate the testing process. The workflow is defined in `.github/workflows/playwright.yml` and includes the following steps:

1. **Install Dependencies**:
   - Node.js dependencies are installed using `npm ci`.
   - Playwright browsers are installed using `npx playwright install --with-deps`.
   - Python dependencies are installed directly in the workflow.

2. **Run Tests**:
   - The tests are executed using `npx playwright test`.

3. **Upload Test Reports**:
   - The Playwright test report is uploaded as an artifact for review.

### Example Workflow File

Here’s an example of the GitHub Workflow file:

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: lts/*

    - name: Install Node.js dependencies
      run: npm ci

    - name: Install Playwright Browsers
      run: npx playwright install --with-deps

    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: 3.8

    - name: Install Python dependencies
      run: |
        python -m venv venv
        source venv/bin/activate
        pip install --upgrade pip
        pip install -r requirements.txt

    - name: Run Playwright tests
      run: npx playwright test

    - name: Upload Playwright report
      uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

## Project Structure

```
QA-Datacom/
├── .github/
│   └── workflows/
│       └── playwright.yml      # GitHub Workflow for automated testing
├── config/
│   └── testCases.yaml          # YAML file for test case configuration
├── pages/
│   └── BugsFormPage.js         # Page object model for the Bugs Form
├── tests/
│   └── Auto-ValidationTest.spec.js  # Automated test cases
├── README.md                   # Project documentation
├── playwright.config.js        # Playwright configuration
└── venv/                       # Virtual environment folder (optional, not included in version control)
```

## Notes

- **GitHub Workflow**:
  - The workflow automatically installs all dependencies and runs the tests on every push or pull request to the `main` or `master` branch.

- **Playwright Browsers**:
  - Ensure Playwright browsers are installed locally using:
    ```bash
    playwright install
    ```

- **Virtual Environment (Optional)**:
  - If you want to run the tests locally, you can create and activate a virtual environment to isolate dependencies.

- **Git Ignore**:
  - Add a `.gitignore` file to exclude unnecessary files like `venv/`:
    ```
    venv/
    __pycache__/
    .pytest_cache/
    .DS_Store
    ```

