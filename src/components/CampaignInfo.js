import './CampaignInfo.css';

import React from 'react';
import { connect } from 'react-redux';
import {
  getCampaignById,
  getSelectedCampaignId,
  getCampaignContributions,
  getCampaignContributionsTotal,
  getUsers,
  getSession
} from '../modules';

import DonateForm from './DonateForm';
import Contributions from './CampaignContributions';
import CampaignDetails from './CampaignDetails';

const CampaignInfo = function({
  campaign,
  totalContributions,
  contributions,
  users,
  currentBalance
}) {
  return (
    <div className="CampaignInfo">
      <CampaignDetails
        campaign={campaign}
        totalContributions={totalContributions}
      />
      <Contributions contributions={contributions} users={users} />
      <DonateForm campaign={campaign} currentBalance={currentBalance} />
    </div>
  );
};

const mapStateToProps = function(state) {
  const session = getSession(state);
  const selectedCampaignId = getSelectedCampaignId(state);
  const campaign = getCampaignById(state, selectedCampaignId);
  const contributions = getCampaignContributions(state, selectedCampaignId);
  const totalContributions = getCampaignContributionsTotal(
    state,
    selectedCampaignId
  );
  const users = getUsers(state);

  return {
    campaign,
    contributions,
    totalContributions,
    users,
    currentBalance: session.user.balance
  };
};

const mapDispatchToProps = {
  // selectCampaignById
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignInfo);
