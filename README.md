# TodoGist

It is a project created for 1st Round of Hatio Innovations Private Limited. It is a Todo list Webapp with github Oauth and a feature to export as gist.

Live Demo: [https://todogist-frontend.herokuapp.com/login](https://todogist-frontend.herokuapp.com/login)

## Features.

1. Implemented Oauth using Github API without any Oauth library.

2. Todo list app to create and edit projects.

3. Todos in each project can be created, updated and deleted.

4. A Project can be exported as secret Gist.

## Getting Started

#### Prerequisite

Install these before moving forward.

[node](https://nodejs.org/en/) v14.x.x or above

[mongodb](https://www.mongodb.com/try/download/community)

##### How to set up the Project

1. clone the project

`git clone https://github.com/DeboDevelop/TodoGist.git`

2. Login into Github

3. Go to [https://github.com/settings/developers](https://github.com/settings/developers)

4. Click on New OAuth app

5. Fill up the details as following

```
Application name = Any name you want
Homepage URL = http://localhost:3000/
Authorization callback URL = http://localhost:3000/github/callback
```

6. Click on generate a Client secret.

7. Copy the Client ID and Client secret and keep it safe for step 14.

8. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens)

9. Click on generate new token. (This is entirely optional as this is just testing token)

10. Add a note and click on gist and read:user.

11. Copy the token store it safely for step 14.

12. cd into backend folder

13. create an .env file

14. Paste the following variable with required data.

```
ENVIRONMENT=DEVELOPMENT/PRODUCTION/TEST
CLIENT_ID=Generated at Step 7
CLIENT_SECRET=Generated at Step 7
DEVELOPMENT_DATABASE_URL=mongodb://localhost:27017/TodoGistDev
TEST_DATABASE_URL=mongodb://localhost:27017/TesttodoGist
PRODUCTION_DATABASE_URL=mongodb://localhost:27017/TodoGist
TEST_TOKEN=Generated at Step 11
```

15. Save

16. Run `npm i` to install all dependencies for backend.

17. Now cd into frontend folder

18. create an .env file.

19. Paste the following variable with required data.

```
REACT_APP_CLIENT_ID=Generated at Step 7
REACT_APP_REDIRECT_URI=http://localhost:3000/github/callback
REACT_APP_BACKEND_URL=http://localhost:8000
```

19. Save

20. Run `npm i` to install all dependencies for frontend.

21. Go to backend folder. Run `npm test` to run test. Run `npm run dev` for development server. Run `npm start` for production server.

22. Go to frontend folder. Run `npm test` to run test. Run `npm start` to start the server.

23. Enjoy

### Author

[DeboDevelop](https://github.com/DeboDevelop)
