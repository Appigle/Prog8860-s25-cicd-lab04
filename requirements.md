Setting up an Azure CI/CD Pipeline
Objective:
This lab will guide you through creating a simple Continuous Integration/Continuous Deployment (CI/CD) pipeline in Azure DevOps. You will integrate GitHub as your source control and set up a pipeline with three stages: Build, Test, and Deploy. The deployment will be to an Azure Function App.

Prerequisites:
An active Azure account (use a free trial if necessary).
A GitHub account with a repository for your project.
Visual Studio Code or any IDE of your choice for development.
Azure DevOps organization set up.
Assignment Details:
Total Points: 5% of course grade.
Grading Criteria:
Build Stage (1.5%): Successful compilation and packaging of code.
Test Stage (1.5%): Running automated unit tests within the pipeline.
Deploy Stage (2%): Successful deployment to an Azure Function App.
Part 1: Create Your GitHub Repository
Create a new GitHub repository for the project.
Inside the repository, create a simple Azure Function App in C# or JavaScript (or any supported language).
For example, you could create a simple HTTP-triggered function that returns "Hello, world!".
Commit and push the code to GitHub.
Part 2: Set Up Azure DevOps
Create a new project in your Azure DevOps organization if you don’t already have one.
Link your GitHub repository:
Go to "Pipelines" in Azure DevOps.
Click "New Pipeline" and choose "GitHub" as your source.
Authenticate to GitHub and select your repository.
Part 3: Define CI/CD Pipeline
Build Stage:

In your Azure DevOps pipeline YAML file, define a Build stage that installs dependencies and compiles your Azure Function app.
Use dotnet build for .NET functions or npm install for JavaScript functions, depending on the programming language you chose.
Ensure that the build succeeds without errors.
Example YAML (for C# Azure Function):

stages:

- stage: Build
  displayName: 'Build Stage'
  jobs:
  - job: Build
    displayName: 'Build the Function App'
    pool:
    vmImage: 'windows-latest'
    steps: - task: UseDotNet@2
    inputs:
    packageType: 'sdk'
    version: '5.x'
    installationPath: $(Agent.ToolsDirectory)/dotnet - script: |
    dotnet restore
    dotnet build --configuration Release
    displayName: 'Build the Azure Function'
    Test Stage:

After the build stage, define a Test stage that runs unit tests.
If using C#, create a separate test project with unit tests and use dotnet test in the pipeline.
If using JavaScript/TypeScript, use a testing framework like Mocha or Jest and run the tests using npm test.
Example YAML for running tests in C#:

- stage: Test
  displayName: 'Test Stage'
  jobs:
  - job: Test
    displayName: 'Run Unit Tests'
    pool:
    vmImage: 'windows-latest'
    steps: - script: |
    dotnet test --configuration Release
    displayName: 'Run Tests'
    Deploy Stage:

In the Deploy stage, deploy your Azure Function to an Azure Function App.
Ensure you have set up an Azure Service Connection in Azure DevOps to allow access to your Azure subscription.
Use the Azure CLI task or Azure Function App Deployment task to publish the code to Azure.
Example YAML for deploying to Azure Function:

- stage: Deploy
  displayName: 'Deploy to Azure'
  jobs:
  - job: Deploy
    displayName: 'Deploy Function to Azure'
    pool:
    vmImage: 'windows-latest'
    steps: - task: AzureFunctionApp@1
    inputs:
    azureSubscription: '$(azureSubscription)'  # Replace with your Azure service connection name
        appName: 'myAzureFunctionApp'               # Replace with your Azure Function App name
        package: '$(Build.ArtifactStagingDirectory)/\*_/_.zip'
    Part 4: Commit the YAML Pipeline
    Commit the azure-pipelines.yml file to the root of your repository in GitHub.
    Push the changes to GitHub.
    Part 5: Run the Pipeline
    Once the YAML file is committed, navigate to Azure DevOps, and trigger the pipeline.
    Ensure that all stages (Build, Test, Deploy) run successfully.
    Part 6: Verify Deployment
    After the pipeline has completed successfully, verify that your Azure Function is deployed by:
    Going to the Azure Portal.
    Navigating to your Function App.
    Triggering the function (for HTTP triggers, you can use Postman or simply open the function URL in a browser).
    Submission Instructions:
    GitHub Repository URL: Provide the link to your GitHub repository.
    Azure Function URL: Provide the URL of the deployed Azure Function.
    Screenshots: Provide screenshots of the Pipeline execution and logs if possible
