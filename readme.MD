# React Frontend Project

## Prerequisites

1. Node with version >= v14.18.2
2. Yarn (Package Manager) >=1.22
<!--

## Project Setup for Devops

1. Clone the project
2. Ask for .npmrc from team member.
3. Run dockerfile -->

## Project Setup

1. Clone the Project.
<!-- 2. Ask for .npmrc file from any frontend teammate and put that at the root directory. -->
2. Install dependencies using following command in the **ROOT** directory:
   ```console
   yarn
   ```
3. Now there are following use cases to work on the project: Choose carefully and follow steps for particular option
   - A.
     You want to just work on customer portal for development:
     1. Open terminal and type below command.
     ```console
      yarn start
     ```
   - B.
     You want to just develop the **components**:
     1. You want storybook to view that component so fire below command in terminal 1.
     ```console
     yarn storybook
     ```
     2. You also want to view that component with temporary integration so fire below command in terminal 2.
     ```console
      yarn start
     ```
   - C.
     You want to just check production build.
     1. Fire below command in terminal and it will build and preview with give URL.
     ```console
      yarn check
     ```
   - D.
     You want to create production/staging build of customer portal and use that build
     1. Build the project
     ```console
     yarn build
     ```
     2. Go to dist where you can see all the build chunks

## Variable Naming Convention

| Object Name        | Notation     | Length | Plural | Prefix | Suffix | Abbreviation | Char Mask  | Underscores |
| ------------------ | ------------ | ------ | ------ | ------ | ------ | ------------ | ---------- | ----------- |
| Function name      | camelCase    | 50     | Yes    | No     | Yes    | Yes          | [A-z][0-9] | No          |
| Function arguments | camelCase    | 50     | Yes    | No     | No     | Yes          | [A-z][0-9] | No          |
| Local variables    | camelCase    | 50     | Yes    | No     | No     | Yes          | [A-z][0-9] | No          |
| Constants name     | CAPITAL_CASE | 50     | Yes    | No     | No     | Yes          | [A-z][0-9] | Yes         |
| Field name         | camelCase    | 50     | Yes    | No     | No     | Yes          | [A-z][0-9] | No          |

## Import Orders:

As we know we are going to import multiple things in every file(screen,component,etc), I recommend to follow below import order which is called as 'Standard Import Order'

1. Keep library imports first.
2. Keep local imports (import pages, components, routes) second.
3. Keep util imports third. (util -> constants, helper functions, types).
4. Keep style imports last ( import from component.styled.tsx file or import from scss files).

# Following instruction are for component kit inside packages folder

## Creating New Components:

1. Create Folder where folder name is in **PascalCase**
2. Create **4** Files under that folder which should be named and contains as per the following:

   i. [ComponentName].component.tsx : This contains component related code. Use functional component. Do default export for that component.

   ii. [ComponentName].styled.tsx : This will contain all the styled related logic, used with styled-components.

   iii. [ComponentName].stories.tsx : This will contain storybook related template to render that particular component.

   iv. index.ts : This file will import the component from [ComponentName].component.tsx and do the default export for that component.

3. You can check same component by integrating in packages/component-kit/src/App.tsx.

**Note:** Please make sure that all the reusable components have stories integrated.

# Following instruction are for customer-portal

## Environment Variables

For adding any new environment variable following will be the process

1. Add that variable and value in .env file
2. Add that variable in env.d.ts located outside src.
3. Consume that variable using import.meta.env.[VariableName]

## Folder Structure

Consider below folders inside src/ of customer-portal

1. APIs: This folder contains all the APIs we wanted call in the form of simple exported function so that we can reuse it accross the screens.
2. chunks: This folder will contain routes, redirection routes and public, private bifurcated routes.

   **Note**: Adding here anything will affect overall bundle size.

3. components: This folder will contain all the components used by Application. For adding any new component add that component to component-kit and if required customization then import that component inside this folder with same structure and then do customize the component.

4. context: This folder will contain all the context used accross the application. For adding any new context, follow the process of 'Adding new context'.

5. hooks: This folder will contain all the hooks used accross the application. For adding new hook, follow the process of 'Adding new hook'.

6. stories: This folder will contain all the common components used accross the application. This is storybook.

7. routes: This folder will contain all the different type of hoc route component.

   **Note**: Here we don't need any modification/addition right now.

8. pages: This folder will contain all the screen used accross the application. For adding new screen, follow the process of 'Adding new screen'.

9. store: This folder contains rootReducer with store configuration and all the store slices.

10. style: This folder will contain all the new variables, mixins, and other style related things, which we need for scss and globally.

11. theme: This folder will contain all the theme related files which will be needed accross the application. For any modification in this, please consider following Theme section of this file.

12. util: This folder will contain all the common logic, contants, regex, helper functions, HTTP Methods.

    i. constants.ts: This file will have constants used accross the app. Each constants should have capital case.

    ii. helper.tsx: This file will contain all the common functions used accross the application.

    iii. HTTP.ts: This file will contain all common class for calling API which will have 4 common HTTP methods. For now there will be no major modifications.

    iv. regex.ts: This file will contain all the regex used accross the application. Please consider adding any new regex here so that other can use that also.

## Files outside src in portal:

1. App.scss: "Global" styles used accross the applicaiton

2. main.tsx: 1st Entry point of the application

3. App.tsx: 2nd Entry point of the application.

4. AuthApp.tsx: This file will have logic to check authenticaiton on intial load and load chunk based on whether user is authenticated or not.

5. i18n.ts: This file contains i18 related config.

6. vite-env.d.ts: This file contains the type for custom evironment variables.

7. '.env' : This file contains environment variables used accross the application

   **Note** : Please add envionment variable in capital only with underscore as space.

8. index.html: HTML Entrypoint for the application.

## Adding new page

1. Create new folder 'your_screen_name' under 'pages' folder.
2. Create two files named as:
   1. 'your_screen_name'.component.tsx and write any example template. (**Hint**: You can use rfce if you have react snippet extension installed).
   2. 'your_screen_name'.module.scss file for writing up styles and import like we have in Dashboard.screen.tsx on line 9.
   3. index.ts : Import above componet here and do the default export.
3. Now to add that screen to route, follow below steps mentioned in 'Adding new route' section.

## Adding new route

1. Go to src/util/constants.ts and add any one route in ROUTES or ROUTE.PUBLIC based on requirement.
2. Add same route in Authenticated.routes.ts or in Unauthenticated.routes.ts.
3. Use route wherever needed. You screen should be rendered

## Adding new component

Process for adding new component:

1. Create Folder where folder name is in **PascalCase**
2. Create **4** Files under that folder which should be named and contains as per the following:

   i. [ComponentName].component.tsx : This contains component related code. Use functional component. Do default export for that component.

   ii. [ComponentName].styled.tsx : This will contain all the styled related logic, used with styled-components.

   iii. [ComponentName].stories.tsx : This will contain storybook related template to render that particular component.

   iv. index.ts : This file will import the component from [ComponentName].component.tsx and do the default export for that component.

## Adding new context

Process for adding any new context:

1. Create Folder where folder name is in **PascalCase**
2. Create two files inside that folder:

   i. [ContextName].context.tsx, where context name should be in **PascalCase**, which contains all the context related logic.

   ii. Add index.ts file which imports and exports(named) context.

## Adding new hook

Process to follow for adding any new custom hook:

1. Create separate file named as use[YourHookName] inside src/hooks/ directory.

2. Export default that hook from the file.

3. Import same hooks in index.ts located in src/hooks/ folder.

4. Do named export from index.ts file.

## Theme

We have done the setup of Styled Component's theme so for every new color, font family, font size, we need to follow below steps:

1. Add those in src/theme/default.tsx.
2. Consume those values in styled component using theme prop.

## Internationlisation - i18

We have done the setup of i18, so for adding any static text following will be procedure.

1. Add that partiular text inside customer-portal/public/locales/en/translation.json
2. Consume it using `t` component provided by library, for reference you can view the Login.screen.tsx

## Static Analysis Tooling

For static analysis we have configured below tools,

1. ESLint - Recommened plugins and rules
2. Prettier - Code Formatting basic rules
3. Husky and Lint Staged - Checking linting before any commit
<!--

# Git Workflow

## Creating new feature

1. Checkout to latest release branch. For now current release branch is 'release/4.0.1'. To checkout to following branch, I will fire below command in my terminal.

   ```
   git fetch -p
   ```

   ```
   git checkout release/4.0.1
   ```

2. I will create my new branch. To create new branch, we will be firing below command in my terminal.

   ```
   git checkout -b feature/<JIRA_FETAURE_KEY>
   ```

3. When we complete my feature and wanted to deploy that feature in DEV Envrionment, at that time, We will create Merge Request (Pull Request) from that feature branch to development.
4. When we complete our developer testing and wanted to deploy the same in QA environment for QA Testing, We will create Merge Request from that feature branch to QA.

## Resolving Merge Conflicts When Merging with Development branch

When we have merge conflicts while creating PR from feature branch to development branch, we will be following below process.

1. Create separate branch from feature branch with following name

   ```
   git checkout feature/<JIRA_FEATURE_KEY>_Merge
   ```

2. Will be merging development with below command.
   ```
   git merge origin development
   ```
3. Will resolve merge conflicts in my local machine using VS Code.
4. Will do Push my changes to origin with following branch.
   ```
   git push origin feature/<JIRA_FEATURE_KEY>_Merge
   ```
5. Will Do Merge request (Pull Request) from newly created branch to development.

## Resolving Bugs

When we want to resolve any bugs, we want to follow below mentioned steps.

1. Checkout to QA branch.
2. Take latest code of QA
   ```
   git pull origin qa
   ```
3. Checkout to New branch with following command:
   ```
   git checkout -b Bug/<JIRA_BUG_KEY>
   ```
4. Resolve bug.
5. Do PR from Bug Branch to QA branch.
6. Do PR from Bug Branch to Development branch. -->
