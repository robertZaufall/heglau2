# Static publication

Use this reference for an authorized GitHub Pages deployment. Determine the repository, branch, and public URL from the current task and existing configuration.

## Repository and Pages

Initialize Git only if the directory is not already in a repository. Keep source, optimized media, licenses, meaningful tests, build scripts, and maintenance documentation. Ignore dependencies, generated builds, media masters, local tooling state, environment files, and credentials. Remove obsolete temporary artifacts while preserving accepted media originals.

Use a conventional Actions workflow with checkout, supported Node setup, tests, static build, configure-pages, upload-pages-artifact, and deploy-pages. Verify current official action versions when creating or updating the workflow. Upload only the generated static directory. Grant Pages write and OIDC permissions to the deployment job and use the `github-pages` environment.

Match the workflow trigger to the actual deployment branch and configure Pages to use GitHub Actions as its build source. Check both again if the repository is recreated: its hosting settings can reset independently of the checked-in workflow.

Use relative asset paths or the correct public base path. Keep source URLs versioned together so visitors receive matching HTML, CSS, and JavaScript after updates.

## Public address

GitHub Pages provides static hosting. Reuse the requested domain's existing routing arrangement and keep routing source and deployment configuration in its owning infrastructure project. Establish the active mapping and upstream before changing domain routing. Scope any such change to the requested address.

## Proof of delivery

Wait for the Pages workflow associated with the pushed commit. Verify local HEAD, the tracking branch, and the remote branch agree.

Check the Pages origin and public address: HTML, CSS, modules, fonts, poster, illustrations, and a bounded video range request. Compare changed files with the local build and check a missing path. Browser-check chapters, forward and reverse video seeking, and the address bar when publication changes asset paths or routing.

Report the verified public URL, commit, and deployment result.

Reference: [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
