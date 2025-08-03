# firebase-admin-seeder

A TypeScript CLI tool to add the `admin` role to a Firebase user via custom claims.

## Installation

```bash
npm install -g firebase-admin-seeder
```

Place your `service-account.json` in the working directory (download from the Firebase Console).

## Usage

```bash
seed-admin <USER_UID>
```

Example:

```bash
seed-admin abc123def456
```

## Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the project:

   ```bash
   npm run build
   ```

3. Run linter:

   ```bash
   npm run lint
   ```

4. Run tests:

   ```bash
   npm test
   ```

## Publishing to npm

1. Ensure the version in `package.json` is updated.
2. Compile:
   ```bash
   npm run build
   ```
3. Login and publish:
   ```bash
   npm login
   npm publish
   ```