Welcome to the Pinkaloo Stack Showdown code challenge. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project uses Redux (https://redux.js.org) to manage the application state. The applicable reducers, actions, and selectors can be found in `src/modules/index.js`.

## Rules

The file `src/modules/mock_data.json` itself should not be modified. Consider this to be immutable data coming from an API.

## Tasks

- [x] 0. Run the app using `yarn start`
- [x] 1. Replace placeholder values in `CampaignDetails` component
	- Display total dollar amount of contributions for the campaign
	- Provide the campaign's goal progress to `ProgressBar `
- [x] 2. Replace placeholder values in `CampaignContributions` component
	- Display the associated user avatar
	- Display the associated user name. Show both `first_name` and `last_name` if available
- [x] 3. Sort campaign contributions by date. Newest contributions should display at the top
- [x] 4. Add the ability to contribute to the selected campaign using the `DonateForm` component
	- Create an addContribution function in `modules` that accepts accepts `amount` and `campaignId` as input parameters and returns a redux action
	- Handle the created redux action in the app reducer and generate a full contribution using the `amount` and `campaignId`.
		- Example Contribution (all attributes required):
		``
		{
	        "id": 49,
	        "amount": 12.51,
	        "campaignId": "elastic",
	        "date": "2019-08-15T03:00:00.000Z",
	        "userId": 17
	    }
	    ``
	    - `id` should be auto-incremented using `(contributions.length + 1)`, `date` should be the current datetime JSON formatted, `userId` should be derived from `session.user.id`.
	    - The newly generated contribution should be appended to the `contributions` array in the app reducer state
	- Decrease the user's available balance after successfully contributing
	- Show validation error in `DonateForm` component if user does not have the required funds to contribute
- [x] 5. Prevent `ProgressBar` component from visually overflowing when `progress > 1.0`
- [x] 6. Sort campaigns in `CampaignNavigation` by goal progress (total contributions / goal)
- [x] 7. Resolve any generated warnings from Webpack & React that are displayed in the browser console

## Extras
- [ ] Optimize data lookup (e.g memoize selectors or restructure redux state)
- [ ] Add your own feature to Stack Showdown!

## Submitting

Via GitHub:

- Create a public repository, push your changes and email the link to `mark@pinkaloo.com`

Via Email:

- Remove the `node_modules` directory and send a `.zip` of the project directory to `mark@pinkaloo.com`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
