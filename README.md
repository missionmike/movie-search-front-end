# Movie Search Front-end

Front-end implementation for a movie search app.

## Setup

Checkout this repository and run the following:

1. `nvm use` to use the latest Node specified in `.nvmrc`. Requires
   [nvm](https://github.com/nvm-sh/nvm) to be installed.
2. `npm ci` to install dependencies per `package-lock.json`
3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Testing

To test with Jest, run `npm run test`.

During development, if a snapshot needs to be update, `npm run test:update` will
update all snapshots.

The HTML coverage report can generated with `npm run test:coverage` and viewed
in the `coverage/lcov-report/index.html` file.

## Project Highlights

### Testing and Linting Support

This project was initialized with shared contribution in mind, including a git
hook for linting. Additionally, support is added for Jest w/ TypeScript to help
ensure consistency with code behavior and outcome.

### React Query

React Query (Tanstack Query) was used to help cache data upon retrieval. The
data only invalidates and re-fetches if a state key changes.

### Token Authentication

The initial request to fetch a token for authenticate the user and allow them to
access the API is cached after page load. If the token expires after a certain
time, we could improve the `useApi` hook to attempt to refetch a new token if it
encounters a `401` response from the API.

## My Favorite Parts

I'm fond of the wrapper around `useQuery` and its ease of use (the `useApi`
hook).

This project is my first time using the `<Suspense />` component, so I'm
learning a bit there. I like the improvements to the routing, and the new hooks
to `useSearchParams()`, etc. available with NextJS.

## Questionable Decisions

I made some choices here that could be questioned... here's a few that I'm aware
of, but there are likely more. One of the benefits of working with a team is
that I can almost always receive input and perspectives that I'd otherwise miss
on my own.

### Documentation

I opted to use JSDoc-style comments on functions and hooks, etc. Most of the
parameters are self-documenting via TypeScript and their variable names, however
they are repeated in the JSDoc comments. This may seem redundant, but I find
there's two reasons I like this approach:

1. It's explicit and allows room for more details to be provided, such as the
   "why" behind a choice.
2. We could have a process to auto-generate HTML documentation for shared
   knowledge. Yes, developers could just access the code itself to learn more
   about it, but not everybody wants to clone the repository and install
   dependencies in order to review a codebase. Or, perhaps the project needs to
   be handed off entirely to a 3rd party, and having a robust documentation
   generator is a bonus for the recipient.

### Token Handling

I chose to generate a new token via REST request on the initial page load. I
didn't see details on how we should handle this token, or if it should expire,
etc., so I opted for an option that would refresh it every time.

An alternative option for a non-expiring Bearer token would be to generate it
once, and then save it to the deployment environment variables for re-use in
every deployment.

The token is not sensitive, and can be found client-side via request headers.

If we were concerned about the sensitivity of the token, we could set this up
differently:

1. Request would get sent to internal NextJS `/api/` route instead of the
   3rd-party directly.
2. The NextJS `/api/` route would only accept requests from the same domain.
   These could be optionally secured by an additional client-side token that
   gets saved with the deployment environment.
3. The NextJS `/api/` endpoint relays the request to the 3rd-party endpoint,
   using Node to attach the secret bearer token.
4. The response from 3rd party gets relayed back to the client-side.

## Given More Time

Given more time, I would improve on the following items.

### Jest Tests and CI

I included some basic testing with Jest in this repository. Time allowing, I
would ensure all components, hooks, and helpers (etc.) is covered well.
Additionally, I would ensure that linting and testing is automatically run in a
CI process with GitHub Actions for pull requests and prior to deployments.

### Organization

There's room for further code extraction and component separation. Given more
time, I would improve this.

### TypeScript Improvements

I've been curious about [zod](https://github.com/colinhacks/zod), so I might
take some time to validate data after fetch.

Additionally, I'd look into auto-generating the type definitions for queries and
API data responses using a 3rd-party package, to avoid the manual maintenance of
adding and updating types for every kind of query response.

### Styling

I went bare-minimum on the CSS and styling here. I haven't used Tailwind in a
long time, so I thought I'd give that a shot again... I don't remember many of
the class names, so this ended up being a bit of a time-suck for me. I would
have been able to develop some proper styles faster if I had just used standard
CSS or SASS modules.

### Query Filtering

Given more time, I'd look into enabling a multi-select option for the genre
filter.

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

### Progress

#### Minimum Requirements

As a user,

- [x] I can search for movies and see a paginated list of results
- [x] I can filter search results by genre
- [x] I can navigate through the next and previous pages of the paginated
      results
- [x] I see the total count of search results (note: we see total number of
      pages of search results, not total number of movies)
- [x] I see notable information for each search result, such as the summary,
      poster, duration, rating, etc.
