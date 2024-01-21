<div align="center">

  ![Screenshot 2024-01-21 153036-modified](https://github.com/Axnjr/Blazze.js/assets/111436589/cad139ae-a2e0-4f39-9c1a-ee99c63f732a)
  
  <br> 
  
  <a>![Static Badge](https://img.shields.io/badge/TypeSafe-8A28E2)</a> 
  <a>![Static Badge](https://img.shields.io/badge/API%20Dev-%201A18A0)</a> 
  <a>![Static Badge](https://img.shields.io/badge/OpenSource%20-%20%23fff?logoColor=%23fff&labelColor=%23fff&color=%23fff)</a>
  <a>![Static Badge](https://img.shields.io/badge/Express-%20%20%23FF00FF)</a>
  <a>![Static Badge](https://img.shields.io/badge/SWC-%20?logoColor=%23000&color=%2300FFF3)</a>
  <a>![X (formerly Twitter) URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Ftwitter.com%2FYC59094) </a>
  <a>![Static Badge](https://img.shields.io/badge/v.1.2.3%20-%20%230213FF)</a>
  <a>![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/Axnjr/Blazze.js?logoColor=%23000&labelColor=%23F4FF00&color=%23FC9300)</a>

  <br>
  
</div>

A light-weight express framework to write typesafe API's with zero configuration, no boiler-plate blazingly fast. Blazze.js is a powerful and lightweight JavaScript framework designed to simplify web development. With a focus on simplicity and performance, Blazze.js provides a set of features that make building web applications a breeze.

## Features
- __`😎 Request Caching:`__ Blazze handles caching automatically to optimize large computations.
- __`🏎️ Powered by SWC:`__ Super speed transpilation via the power of Rust.
- __`🐣 Easy Setup:`__ Hit `npx blazze-init` to start building your projects.
- __`💪 TypeScript:`__ Out of the box TS support, no configurations and environment setup, just get started directly.
- __`📂 Directory based Routing:`__ Keep the logic separated without any setup. Routes are based on the directory structure.
- __`🚀 Fast & Robust:`__ Built on top of express, for better developer experience.
- __`💫 No Boiler Plate Code:`__ Install init and start, Nothing else 🚀
- __`🔥 Build Optimization:`__ Makes a single optimized bundle for your app

## How to start ? 

- Install blazze `npm i blazze@latest`
- ```npx blazze-init```
- You will be asked a few questions to configure `blazze.config.js`
  
  <img width="" alt="Screenshot 2024-01-11 222945" src="https://github.com/Axnjr/Blazze.js/assets/111436589/c9f09ffe-953e-43a5-bd52-ef2f8ee376e0">
  
- Create your API routes in the root-endpoint directory 
- Each route can have 5 http method files viz: GET, POST, PUT, PATCH, DELETE
- Each files handles specific API request methods
- You need to export a default normal function from each file
- These functions get Express Request and Response objects as parameters
- For nested routes use "@" symbol ex: new/subs/ppl will be -> new@subs@ppl which will have its respective logic
- This is to avoid deep recursive file watching and being more performent for the system
- Dynamic routes start with a underscore "_" ex: api/v1/_users 
- That's it you are ready to blazze ...

## Contribute to Blazze
Read the [Contribution guidlines](https://github.com/Axnjr/Blazze.js/blob/main/contributing.md) to begin.

## Give Blazze a Star ❤️⭐
