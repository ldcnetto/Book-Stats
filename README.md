This is a [Vite](https://pt.vite.dev/)

## Getting Started

At first, in the repository, you must install package manager:

```bash
npm install
# or
yarn install
```

After that, to be able to view the application run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

You can start editing the page by modifying `src/app.tsx`. The page auto-updates as you edit the file.

## Commit pattern

In this repository, the commit pattern follows the **[Conventional Commits](https://www.conventionalcommits.org/pt-br)**.

- `feat`- Commits of type feat indicate that your code snippet is including a **new feature** (related to the MINOR of semantic versioning).

- `fix` - Commits of type fix indicate that your committed code snippet is **solving a problem** (bug fix), (related to the PATCH of semantic versioning).

- `docs` - Commits of type docs indicate that there were **changes in the documentation**, such as in the Readme of your repository. (Does not include code changes).

- `test` - Commits of type test are used when **changes to tests** are made, whether creating, changing or deleting unit tests. (Does not include code changes)

- `build` - Commits of type build are used when modifications are made to **build files and dependencies**.

- `perf` - Commits of type perf are used to identify any code changes that are related to **performance**.

- `style` - Commits of type style indicate that there were changes regarding **code formatting**, semicolons, trailing spaces, lint... (Does not include code changes).

- `refactor` - Commits of type refactor refer to changes due to **refactorings that do not change its functionality**, such as a change in the format in which a certain part of the screen is processed, but which maintained the same functionality, or performance improvements due to a code review.

- `chore` - Chore commits indicate **build task updates**, administrator settings, packages... such as adding a package to gitignore. (Does not include code changes)

- `ci` - Commits of type ci indicate changes related to **continuous integration** (_continuous integration_).
