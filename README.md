[![Website](https://img.shields.io/website-up-down-green-red/https/codersforcauses.org.svg?style=flat-square)](https://www.codersforcauses.org)
![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square&color=000000)
![Code Style](https://img.shields.io/badge/code%20style-standard-green.svg?style=flat-square&logo=eslint&color=4B32C3)

![Alt](https://repobeats.axiom.co/api/embed/f27cd0e713c22af6abc7653cae5e4fbee2cc00bc.svg "Repobeats analytics image")

## Coders for Causes (CFC) website

Bootstrapped using the create-t3-app using:

- [Next.js App router](https://nextjs.org/docs)
- [tRPC v10](https://trpc.io/docs/v10/)
- [Tailwind.css v3](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/docs/overview)
- [Clerk authentication](https://clerk.com/docs)
- [Vercel](https://vercel.com)

We use [pnpm](https://pnpm.io/) as the package manager for this project.

```bash
# To install
pnpm i

# To run in dev
pnpm dev

# To start inngest dev server for testing webhooks (e.g. user signups)
pnpm dev:inngest

# To add a dependency. We use the -E to install the latest dependency and pin it.
pnpm i <dep_name> -E

# Update all packages
pnpm upgrade -L
```

## Planned Features

### Project Integration Enhancements

- Profiles will soon showcase the projects that users have contributed to, highlighting their work and collaborations.
- Applications to join our seasonal Summer and Winter projects will be directly accessible through the site for our members.
- Committee members and Administrators will gain the ability to upload project specifics directly to the platform.

### User Profile Enhancements

- The platform will support multiple role assignments for users, offering tailored experiences based on their involvement and interests.
- Enhanced profile customization options will be introduced.

### Event Participation and Management

- Users will be able to purchase event tickets directly through the platform, making attendance simpler and more integrated.
- Event management will be streamlined for Committee members and Administrators, with capabilities to upload and update event information directly to the platform.
