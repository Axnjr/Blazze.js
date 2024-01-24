<div align="center">

  ![Screenshot 2024-01-21 153036-modified](https://github.com/Axnjr/Blazze.js/assets/111436589/cad139ae-a2e0-4f39-9c1a-ee99c63f732a)
  
  <br> 
  
  <a>![Static Badge](https://img.shields.io/badge/TypeSafe-8A28E2)</a> 
  <a>![Static Badge](https://img.shields.io/badge/API%20Dev-%201A18A0)</a> 
  <a>![Static Badge](https://img.shields.io/badge/OpenSource%20-%20%23fff?logoColor=%23fff&labelColor=%23fff&color=%23fff)</a>
  <a>![Static Badge](https://img.shields.io/badge/Express-%20%20%23FF00FF)</a>
  <a>![Static Badge](https://img.shields.io/badge/SWC-%20?logoColor=%23000&color=%2300FFF3)</a>
  <a href="https://twitter.com/Blazzejs">![X (formerly Twitter) URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Ftwitter.com%2FBlazzejs)</a>
  <a>![Static Badge](https://img.shields.io/badge/v.1.2.3%20-%20%230213FF)</a>
  <a>![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/Axnjr/Blazze.js?logoColor=%23000&labelColor=%23F4FF00&color=%23FC9300)</a>

  <br>
  
</div>

A lightweight express framework to write typesafe APIs with zero configuration, no boilerplate, and blazingly fast. Blazze.js is a powerful and lightweight JavaScript framework designed to simplify web development. With a focus on simplicity and performance, Blazze.js provides a set of features that make building web applications a breeze.

## Features

- __😎 Request Caching:__ - Blazze handles caching automatically in both Production and Dev Environments. In production it is obviously necessary to optimize large computations however, request caching is taken care of in dev mode as well by Blazze to provide a smooth developer experience, there is no need to revalidate the cache manually Blazze handles everything under the hood.
  
- __🏎️ Powered by SWC:__ - Blazze leverages Rust-based tool: [Speedy Web Compiler](https://swc.rs/) to transpile Typescript files, so there is negligible waiting time after file changes.
  
- __🐣 Easy Setup:__ - Hit `npx blazz-init` to start building your projects, you'll be asked a few questions for configuring Blazze & that's it Blazze will set up the project for you.
  
- __💪 TypeScript:__ - Out of the box TS support, no configurations and environment setup, just get started directly.
  
- __📂 Directory based Routing:__ - Keep the logic separated without any setup. Routes are based on the directory structure. ex: you will create a dir `user` inside of which you can add your logic for various request methods viz: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.

- __🚀 Fast & Robust:__ - Built on top of [Express JS](https://expressjs.com/) and [Helmet JS](https://helmetjs.github.io/), security and efficiency by default.
  
- __💫 No Boiler Plate Code:__ - Install init and start, Nothing else 🚀
  
- __🔥 Build Optimization:__ - Makes a single optimized Expressjs bundle for your complete app
  
## How to start? 

- Install blazze
  
  ```
    npm i blazze@latest
  ```
- Run the below command in the terminal.
  ```
    npx blazze-init
  ``` 
- You will be asked a few questions to configure `blazze.config.js`
  ```bash
    PS C:\Users\yaksh\bltest> npx blazze-init      
    ? What is your project named? myFuckingAPIS
    ? What will be the root endpoint for your project? api/v5.1/users/i
    ? Would you like to use TypeScript? yes
    ? Which port should the server listen to? 3000
    ? Where would you like to keep your static content like HTML and PNG files? public
    ? Would you like to enable request caching? (Experimental) yes
    ✔  Configuring your Blazze App
    Run commands:
  
          - npm i
          - npm run dev
  
    Success ! Created myFuckingAPIS at C:\Users\yaksh\bltest
    You are ready to Blazze 🚀. Refer to docs at https://github.com/Axnjr/Blazze.js/main/README.md.
  ```
- Create your API routes in the root-endpoint directory
- Each route can have 5 HTTP method files viz: GET, POST, PUT, PATCH, DELETE
- Project Structure
  ```bash
    myFuckingAPIS
    ├── api/v5.1/users/i (root-endpoint)
    │ ├── Route-1
    │ │ ├── GET.ts
    │ │ ├── POST.ts
    │ │ ├── PUT.ts
    │ │ ├── DELETE.ts
    │ │ ├── PATCH.ts
    │ └── Other-routes / ...
    ├── blazze (for typescript)
    ├── cache (if enabled)
    ├── public (static-root)
    ├── blaze.config.js (from blazze-init)
    ├── package.json
    ├── packagelock.json
    └── ...
  ```
- Each file handles specific API request methods
- You need to export a default normal function from each file
- These functions get Express Request and Response objects as parameters
- For nested routes use the "@" symbol ex: `new/subs/ppl` will be -> `new@subs@ppl` which will have its respective logic
- This is to avoid deep recursive file watching and being more performant for the system
- Dynamic routes start with an underscore "_" ex: `api/v1/_users`
- That's it you are ready to blazze ...

## Contribute to Blazze
Read the [Contribution guidlines](https://github.com/Axnjr/Blazze.js/blob/main/contributing.md) to begin.

## Give Blazze a Star ❤️⭐
