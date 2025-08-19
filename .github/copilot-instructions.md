# Copilot Onboarding Instructions for Chemnitz Culture Project

<Goals>
- Reduce the likelihood of a coding agent pull request getting rejected by the user due to generating code that fails the continuous integration build, fails a validation pipeline, or having misbehavior.
- Minimize bash command and build failures.
- Allow the agent to complete its task more quickly by minimizing the need for exploration using grep, find, str_replace_editor, and code search tools.
</Goals>

<Limitations>
- Instructions must be no longer than 2 pages.
- Instructions must not be task specific.
</Limitations>

<WhatToAdd>

<HighLevelDetails>
- **Summary**: The Chemnitz Culture Project is a small-to-medium sized frontend web application that highlights cultural landmarks of Chemnitz, Germany. It uses modern UI frameworks and animations to present content in a clean, interactive way.
- **Repository type**: React single-page application.
- **Languages**: JavaScript / TypeScript.
- **Frameworks and libraries**: React, Tailwind CSS, Node, PostgreSQL and Prisma, mapbox.
- **Runtime**: Browser (bundled via Vite).
- **Package manager**: npm with Node.js (>= 18).
</HighLevelDetails>

<BuildInstructions>
- **Bootstrap**: Always run `npm install` before any other step.
- **Development**: Run `npm run dev` to start the local development server (default: http://localhost:5173).
- **Build**: Run `npm run build` to generate the production bundle. This should always succeed if linting and tests pass.
- **Preview**: Run `npm run preview` to serve the production bundle locally.
- **Lint**: Run `npm run lint` before committing. ESLint rules enforce style and best practices.
- **Test**: Run `npm run test` to execute the test suite. Always run after linting, before pushing code.
- **Environment requirements**:
  - Node.js v18 or higher.
  - npm v9 or higher.
- **Error handling**:
  - If build fails, delete `node_modules` and re-run `npm install`.
  - If lint/test pipelines fail, fix issues before attempting a build.
- **Validation pipeline**:
  - CI runs the sequence: `npm install && npm run lint && npm run test && npm run build`.
  - Pull requests will be blocked if any step fails.
</BuildInstructions>

<ProjectLayout>
- **src/**: Contains all React components and logic.
  - Example: `src/components/ChemnitzCulture.tsx` renders cultural highlights with cards and animations.
- **public/**: Static assets.
- **package.json**: Defines dependencies and npm scripts.
- **tailwind.config.js**: Tailwind setup.
- **vite.config.js**: Vite build configuration.
- **.eslintrc.js**: ESLint rules.
- **.github/workflows/**: GitHub Actions for build/test/lint validation.
- **Validation checks**:
  - PRs must pass lint, tests, and build in CI before merge.
  - Code must adhere to readability guidelines (no nested ternary operators).
  - Internal security checklist must be followed.
- **Dependencies not obvious**:
  - shadcn/ui (customizable UI components).
  - Framer Motion (animations).
- **Repo root files**:
  - README.md (project overview).
  - package.json, vite.config.js, tailwind.config.js, .eslintrc.js.
</ProjectLayout>

</WhatToAdd>

<StepsToFollow>
- Trust these instructions as authoritative.
- Only search if information is missing or inconsistent.
- Always: `npm install` → `npm run lint` → `npm run test` → `npm run build` before submitting changes.
- Do not introduce nested ternary operators (reduce readability).
- Ensure security checklist is followed for every code change.
- If errors are encountered:
  - Clear `node_modules`, reinstall, and retry build.
  - Validate on local preview (`npm run preview`) before pushing.
</StepsToFollow>
