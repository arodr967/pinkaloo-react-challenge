import sampleData from './mock_data';
import moment from 'moment';

const initialState = { ...sampleData };

export const MERGE_SESSION = 'app/MERGE_SESSION';
export const ADD_CONTRIBUTION = 'app/ADD_CONTRIBUTION';

//- Redux
export const app = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case MERGE_SESSION: {
      const session = { ...state.session, ...payload };

      return { ...state, session };
    }

    case ADD_CONTRIBUTION: {
      const { amount, campaignId } = payload;
      const id = state.contributions.length + 1;
      const contribution = {
        id,
        amount,
        campaignId,
        date: moment(new Date()).format(),
        userId: state.session.user.id
      };
      return {
        ...state,
        session: {
          ...state.session,
          user: {
            ...state.session.user,
            // Ideally, this should be done as part of another Action.
            // Actions should only represent one logical change.
            balance: state.session.user.balance - amount
          }
        },
        contributions: [...state.contributions, contribution]
      };
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

export const addContribution = (amount, campaignId) => {
  return {
    type: ADD_CONTRIBUTION,
    payload: { amount, campaignId }
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
