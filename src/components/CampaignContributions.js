import './CampaignContributions.css';
import React from 'react';
import Moment from 'moment';
import { orderBy } from 'lodash';

// Converted the renderContribution function into a Function
// Component instead for readability purposes and it seems like
// it should be a Component on it's own as well. I attempted to
// get the user from the store by converting it into a Component,
// but still failed to do so.
function Contribution({ contribution, user }) {
  const { amount, date } = contribution;
  let userInfo = {
    image: 'https://static.pinkaloo.com/static/img/profile.png',
    name: 'Anonymous Contributor'
  };

  if (user) {
    // Checking if user has a last name in order to add a leading space on the
    // string so it can be displayed correctly.
    const lastName = user.last_name ? ` ${user.last_name}` : '';
    userInfo = {
      image: user.image || 'https://static.pinkaloo.com/static/img/profile.png',
      name: `${user.first_name}${lastName}`
    };
  }

  return (
    <div className="ContributionInfo">
      <img className="UserImage" src={userInfo.image} alt="user" />
      <div className="ContributionInfo-user">
        <strong>{userInfo.name}</strong>
        <div>{amount} donated</div>
        <div className="ContributionInfo-date">
          {Moment(date).format('MMM DD, YYYY')}
        </div>
      </div>
    </div>
  );
}

function Contributions({ contributions, users }) {
  // Finding the user is better done by using the getUserById
  // function from the store. I couldn't figure out how to get
  // it working here, so due to time constraints, I passed down
  // the users and did the logic here instead.

  // The complexity here is not the best because we are iterating through the
  // list of contributions at least twice. Not the best for performance reasons.
  const sortedContributionsByDate = orderBy(contributions, c => c.date, 'desc');
  const mappedContributions = sortedContributionsByDate.map(contribution => (
    <Contribution
      contribution={contribution}
      user={users.find(user => user.id === contribution.userId)}
    />
  ));
  return (
    <div className="CampaignInfo-contributions">{mappedContributions}</div>
  );
}

export default Contributions;
