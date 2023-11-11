# to_dos
- [x] create a reusable component library
  - [x] use shadcn-ui components for more logical components (@radix-ui/...primitive components + tailwindcss)
  - [x] use other components if required, like ag-grid which is very stable for table component
  - [x] so its best to create your own component lib with best elements from right library.
  - [x] build setup is very minimal, like only uses typescript for generating js and d.ts files
  - [x] tried using vite for this setup but minimal setup for this looks better
  - [x] can use daisyui component classes for purely presentational components
  - [ ] if you are creating wrapper components inside your reusable component library like on top of ag-grid,
        mark the dependencies ag-grid-react, ag-grid-community, ag-grid-enterprise as peer-dependencies. You
        don't need to bundle these with your library. Also if you specify it as a direct dependency, then it
        will be installed when your library is installed. that is not what you want for the consumers of your lib.
        If your library is designed for users who are already using ag-grid, or if you want to give them the
        flexibility to choose the version of ag-grid, you should specify ag-grid as a peer-dependency
  - [ ] don't minify what you publish on npm   

- [ ] learn main modules from remix indie stack
  - [x] prisma
  - [ ] docker
  - [ ] auth

- [ ] book_haven (an online e-commerce application -- to encode all full-stack learning)
  - [x] typescript
  - [x] eslint
  - [x] tailwindcss
  - [x] use mnlib_components for all the reusable components
  - [x] prisma (db design, seed db scripts)
  - [x] auth (securely handle using server side session and cookies)
  - [ ] e2e test drive this application
  - [ ] try exploring vite plugins for advanced build setup (for eg add Copyright info to all pages)
  - [ ] e2e testing with playwright
  - [ ] deployment using docker
  - [ ] implement overall e-commerce flow from cart, checkout, payment, account creation etc.
     
- [ ] create an end-to-end project using remix_space
  - [ ] use TDD to drive the application (using playwright e2e and component testing for this)
  - [ ] An E-Commerce application, Online book store

- [ ] explore bun, extremely fast, in place of all the nodejs related stuff

- [x] csr_space
  - [x] add components from shadcn/ui (this is a copy pase component library with tailwind)
  - [x] react-query
  - [x] add Highcharts component in react with comprehensive features
  - [ ] auth
  - [ ] deployment
  - [ ] gain expertise on e2e testing using playwright

- [ ] complete courses on prompt engineering
  - [ ] https://www.deeplearning.ai/short-courses/
  - [ ] https://www.udemy.com/course/chatgpt-bard-bing-complete-guide-to-chatgpt-openai-apis/

- [x] create extensible table component using ag-grid react (this comes with virtualization support)

# starter_kits
- [x] csr_space 
  - [x] vite + react + react-router
  - [x] tailwindcss
  - [x] prettier
  - [x] eslint
  - [x] react-query
  - [ ] auth
  - [ ] deployment

- [x] mn_components (create component lib and publish on npm and then consume in your individual projects)
  - [x] use this lib to add few components in the collection https://ui.shadcn.com/docs 
  - [x] have components in typescript
  - [x] have some stable way of having styles (most preferrably plain css or css modules or tailwindcss with prefix)
  - [x] have storybook setup to preview components
  - [x] might use daisy-ui css components as a starting point
    - [x] if we are using tailwindcss, lets use component_classes so that we can override using utility classes


- [x] mn_utils (create common utilities library either publish on npm or use it from github url)
  - [x] have utilities in typescript 
  - [ ] with JSDoc documentation

- [ ] ssr_space
  - [ ] remix_space ( tailwindcss + prettier + eslint + auth + deployment )
  - [ ] next_space (tailwindcss + prettier + eslint + auth + deployment )

- [ ] vanilla_space (vite + tailwindcss + prettier + eslint + deployement )

- [x] mn_blog [amanmavai.github.io] (create your blog in astro.build)
  - [x] md / mdx 
  - [x] tailwindcss
  - [x] react / preact components
  - [x] use Github Pages for deployment
  - [x] setup Github Actions for workflow
  - [x] create a normal blog from astro, and convert it to Astro Paper from scratch. this will help learn and solidify.
  - [x] use AstroPaper theme for your blog (https://github.com/satnaing/astro-paper)
  - [ ] revisit your blog once again with this setup



# build_tooling
- [x] prettier
- [ ] eslint
- [ ] typescript
- [ ] lint-staged (only need before push , don't need to interfere in local commits)
- [ ] nodejs scripts for custom build tasks


# documentation
- [ ] codify your learning, document things in code itself.
- [ ] colocate your markdown files near to your code to document things.
- [ ] docusauras for team setting
- [ ] have video library to explain things

# ast(abstract syntax tree)
- [ ] create new eslint plugin
- [ ] babel macros (babel-plugins , babel-plugin-macros)
- [ ] chodmods


# backend
- [ ] Node js / Express js
- [ ] Deno
- [ ] Bun

# choosing framework
- [ ] document various trade-offs or use-cases for different frameworks (in the mn_space repo as a md file)
- [ ] as solid js has fine grained reactivity, it might be a good choice for dashboard apps, where we are struggling with lot of rerenders.

# monorepo
- [ ] turborepo with pnpm for now
  ```
  // example file structure
  // have all the projects you work upon over here, so that you don't have to setup tooling everytime
  mn_projects
    --apps
      --next_space
      --remix_space
      --csr_space
      --astro_blog
      --docusaurus_blog
      --mn_blog
    --packages
      --mn_components
      --mn_utils
      --tsconfig
      --eslint
      --prettier
    --commands.md
    -- .gitignore 
    --package.json
    --pnpm-lock.yaml
    --pnpm-workspace.yaml
    --turbo.json
  ```

# publishing a package on npm
- [ ] typescript package template
- [ ] a document on how to publish a package on npm

# state machines
- [ ] https://www.youtube.com/watch?v=Aixi0e53qAE&list=PLvWgkXBB3dd4I_l-djWVU2UGPyBgKfnTQ&index=1
- [ ] https://stately.ai/docs/

# Understand Usecases for different architectures
- CSR
- SSR
- SSG
- Server Components
- Others

# Useful Resources
- https://www.epicweb.dev/the-webs-next-transition  [Video: https://www.youtube.com/watch?v=VXR-994OkCM]