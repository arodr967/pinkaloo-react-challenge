import sampleData from './mock_data';

const initialState = { ...sampleData };

export const MERGE_SESSION = 'app/MERGE_SESSION';

//- Redux
export const app = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case MERGE_SESSION: {
      const session = { ...state.session, ...payload };

      return { ...state, session };
    }

    default: {
      return state;
    }
  }
};

//- Actions

export const selectCampaignById = campaignId => {
  return {
    type: MERGE_SESSION,
    payload: { selectedCampaignId: campaignId }
  };
};

//- Selectors

// Session
export const getSession = state => {
  return state.app.session;
};

// Contributions
export const getContributions = state => {
  return state.app.contributions;
};

// Users
export const getUsers = state => {
  return state.app.users;
};

export const getUserById = (state, userId) => {
  return getUsers(state).find(user => user.id === userId);
};

// Campaigns
export const getCampaigns = state => {
  return state.app.campaigns;
};

export const getSelectedCampaignId = state => {
  return state.app.session.selectedCampaignId;
};

export const getCampaignById = (state, campaignId) => {
  const campaigns = getCampaigns(state);

  return campaigns.find(campaign => campaign.id === campaignId);
};

export const getCampaignContributions = (state, campaignId) => {
  const contributions = getContributions(state);

  return contributions.reduce((array, contribution) => {
    if (contribution.campaignId !== campaignId) {
      return array;
    }

    return [...array, contribution];
  }, []);
};

export const getCampaignContributionsTotal = (state, campaignId) =>
  getCampaignContributions(state, campaignId).reduce((total, { amount }) => {
    return total + amount;
  }, 0);
