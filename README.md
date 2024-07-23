# Movie Search Front-end

Front-end implementation for a movie search app.

## Setup

Checkout this repository and run the following:

1. `nvm use` to use the latest Node specified in `.nvmrc`. Requires
   [nvm](https://github.com/nvm-sh/nvm) to be installed.
2. `npm ci` to install dependencies per `package-lock.json`
3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Decision History

### Initial Setup

I am very impressed with [starter.dev](https://starter.dev/) and I had my eye on
the
[NextJS + React Query + Tailwind](https://starter.dev/kits/next-react-query-tailwind/)
setup initially. I've used React Query and Tailwind before, and I remember them
being nice to work with. React Query has since had numerous updates and
improvements, so I was interested in seeing how that package operates these
days.

However, I noticed that the landing page stated that it uses NextJS v12 and
React v17. The project instructions state to _"use the latest version of the
framework or library"_ and since I'm currently working through a dependency
upgrade for a different project, I realized that NextJS is currently on v14, and
React is v18. To double-check, I looked at the
[package.json](https://github.com/thisdot/starter.dev/blob/2703f0ee737111a29f479feec6aa97daa69eea45/starters/next-react-query-tailwind/package.json#L41-L42)
for the starter and saw that it was actually using NextJS v13 and React v18,
which is closer to the latest, but still not quite the latest for NextJS.
Additionally, the starter included some dev dependencies that I'm not too
familiar with, such as `storybook` and `msw`. So, I decided to base this project
on the latest NextJS as found in NextJS'
[Getting Started](https://nextjs.org/docs/getting-started/installation) page.

### Planned Packages / dependencies

As of the time of this writing, I plan to use the following dependencies at
latest versions:

- NextJS
- React
- TypeScript
- React Query
- Jest

For NextJS, I plan to use latest Node LTS (v20.x). I don't expect to use many of
the SSR features of NextJS for this project, but I'm currently most familiar
with NextJS so it will help me get this going faster.
