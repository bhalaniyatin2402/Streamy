# Streamy Using React + Vite

## Routes
- `/` 
    - home page - background poster & movies based on trending and popularity
- `/:media_type/:id` 
    - details page - details, cast & videos of movie and tv shows
- `/search/:query` 
    - search page - infinite scroll based on the search query
- `/explore/:media_type` 
    - explore page - filter of genres, sort_by & infinite scroll for movie and tv shows
- `*` - 404 page - page not found


## npm modules
- @reduxjs/toolkit
- axios
- dayjs
- react-circular-progressbar
- react-icons
- react-lazy-load-image-component
- react-player
- react-redux
- react-router-dom
- react-select
- sass


## devDependencies - Test Environment
- @testing-library/react
- @testing-library/jest-dom
- @testing-library/user-event
- jsdom
- msw
- vitest


## File Structure
-  `public` - streamy logo shows in tab
-  `src`
    -  `__test__`
        - `component` - test related to component
        - `pages` - test related to pages
        - `testHelper.jsx` - providing store to test environment
        -  `testServer.js` - response fake data during testing
    -  `assets` - images like avatar, no-photo etc..
    -  `components`
        - `cards` - card like structure for movie, video & cast
        - `carousel` - scroll large list of movie card
        - `form` - filter and switching tab for fetching new request
        - `helpers` - rearly used and used for specific purpose 
        - `layout` - mostly used component like header, footer & content wrapper
        - `skeletons` - showing when the data is in loading state
        - `ui` - small and mostly re-usable components like spinner, lazy load image etc..
    -  `pages` - pages describe same as in Routes above
    -  `routes` - set up custom routes using react-router-dom
    -  `services` - fetching data using rtk qury modify data before set in store
    -  `store` - store global state of fetch data and managed by react redux
    -  `App.jsx` - providing store state the whole app
    - `index.scss` - reset css and set basic style in root
    - `main.jsx` - get root element and render app
    - `mixins.scss` - set up quick responsive design
    - `setupTest.js` - setup file for test environment
- `index.html` - root element for single page application
- `.gitignore` - file name that you want push into github
- `package.json` - list of all dependencies that used in project


## Project Setup
To run project locally
- Clone repo
- `npm install` in root directory to install all depedncies
- Set for `environment variables` in root
    - `VITE_APP_TMDB_TOKEN` - for get access of tmdb api to get result - get on tmdb site by login and get token
- `npm run dev` to start project
- `npm run test` to run test files
