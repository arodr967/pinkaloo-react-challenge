import React from 'react';
import { connect } from 'react-redux';
import {
  selectCampaignById,
  getSession,
  getCampaigns,
  getCampaignContributionsTotal
} from '../modules';
import { orderBy } from 'lodash';

import CampaignItem from './CampaignItem';

function CampaignNavigation({
  campaigns,
  selectedCampaignId,
  selectCampaignById
}) {
  // Generate component click handler for campaignId
  const campaignClickHandler = campaignId => event =>
    selectCampaignById(campaignId, event);

  const renderCampaignItem = campaign => {
    const { id } = campaign;

    const key = `campaign-${id}`;
    const active = id === selectedCampaignId;
    const onClick = campaignClickHandler(id);

    const itemProps = {
      key,
      active,
      campaign,
      onClick
    };

    return <CampaignItem {...itemProps} />;
  };

  return <div className="Campaigns">{campaigns.map(renderCampaignItem)}</div>;
}

const mapStateToProps = function(state) {
  const { selectedCampaignId } = getSession(state);
  let campaigns = getCampaigns(state);
  // Create new property in campaigns to calculate the goal progress
  campaigns = campaigns.map(c => ({
    ...c,
    goalProgress: getCampaignContributionsTotal(state, c.id) / c.goal
  }));
  // Sort by goal progress
  campaigns = orderBy(campaigns, c => c.goalProgress, 'desc');

  return {
    campaigns,
    selectedCampaignId
  };
};

const mapDispatchToProps = {
  selectCampaignById
};

export default connect(mapStateToProps, mapDispatchToProps)(CampaignNavigation);
