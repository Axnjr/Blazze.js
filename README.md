# Blazze.js 
### A light-weight express framework to write typesafe API's with zero configuration, no boiler-plate blazingly fast.

## How to start ? 

- Install blazze
- ```npx blazze-init```
- Create your API routes in the root-endpoint directory 
- Each route can have 5 http method files viz: GET, POST, PUT, PATCH, DELETE
- Each files handles specific API request methods
- You need to export a default normal function from each file
- These functions get Express Request and Response objects as parameters
- For nested routes use "@" symbol ex: new/subs/ppl will be -> new@subs@ppl which will have its respective logic
- This is to avoid deep recursive file watching and being more performent for the system
- Dynamic routes start with a underscore "_" ex: api/v1/_users 
- That's it you are ready to blazze ...
