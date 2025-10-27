# AGENTS.md - Guidelines for Agentic Coding in m3ecn-ui

## Build/Lint/Test Commands

- Build: `npm run build` or `bun run build`
- Lint: `npm run lint` (uses Biome via ultracite)
- Test: No test scripts configured. Add tests and use `npm run test` for all tests. For single test, use `npx jest path/to/test.spec.ts` if Jest is added.

## Code Style Guidelines

- **Types**: Use TypeScript strictly; avoid `any`, prefer `interface` or `type` consistently.
- **Imports**: Use ES6 imports; group by external, internal, relative.
- **Formatting**: Follow Biome rules (extends ultracite/core, ultracite/next); use arrow functions, template literals, consistent braces.
- **Naming**: camelCase for variables/functions, PascalCase for components/types, kebab-case for files.
- **Error Handling**: Use try-catch, throw Error objects, handle React hooks dependencies.
- **React/Next.js**: Use functional components, server components for async ops, Next.js Image over img.
- **Accessibility**: Ensure ARIA compliance, semantic HTML, meaningful alt text.
- **Other**: No console logs, use `===`, avoid var, follow exhaustive switches. See original AGENTS.md for full Biome rules.
