# Setting Environment Variables

Variables that belong in an `.env` file are handled by Github secrets. Firebase hosting does not directly manage secrets/environment variables. As such, we must assign them in Repository > Settings > Secrets and Variables. In addition, we must allow the build to access these variables by creating a `.env` during the CI/CD process. Refer to `.github/firebase-hosting-merge.yml` and `.github/firebase-hosting-pull-request.yml`: Environment variables are retrieved from Github Secrets, before being `echo`'d into a `.env` in the build.

NOTE: [[According to Vite]](https://vitejs.dev/guide/env-and-mode.html), environment variables are called with `import.meta.env.VAR_NAME`, which are replaced with the actual value when the code is built. As such, variable names must start with the `VITE_` prefix, and named/accessed accordingly both in `.env`, in Github Secrets, and in the codebase.
