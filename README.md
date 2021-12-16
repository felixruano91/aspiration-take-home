This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Steps to run project

1. run `yarn` to install all the dependencies
2. add env variables for `Github GraphQL API URL` and for the `token`
3. run `yarn start` to run the project

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Tech Stack
- Chakra UI:
  - I thought this was a good option due to its ease of use, their components are accessible out of the box which makes it a lot easier to focus on the requirements of the task
  - Composable
  - Highly adopted, so there is an established community for troubleshooting
  - Good documentation
- Apollo Client: 
  - To be honest I chose this client due to its popularity, so there is an established community for troubleshooting
  - Integrated cache which is very useful to optimise how many requests we are making when we toggle topics
  - Great dev tools
  - Good documentation
