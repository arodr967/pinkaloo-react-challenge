import React from 'react';
import ClassNames from 'classnames';
import { connect } from 'react-redux';

import ProgressBar from './ProgressBar';
import { getCampaignContributionsTotal } from '../modules';

function CampaignItem({ campaign, totalContributions, active, onClick }) {
  const className = ClassNames('Campaign', { active });
  const divProps = { className, onClick };
  const progress =
    totalContributions >= campaign.goal
      ? 1
      : totalContributions / campaign.goal;

  return (
    <div {...divProps}>
      <div className="Campaign-logo">
        <div
          className="Campaign-image"
          style={{ backgroundImage: `url('${campaign.image}')` }}
        />
      </div>
      <div className="Campaign-name">{campaign.name}</div>
      <div style={{ flex: 1 }} />
      <ProgressBar progress={progress} />
    </div>
  );
}

const mapStateToProps = function(state, { campaign }) {
  return {
    totalContributions: getCampaignContributionsTotal(state, campaign.id)
  };
};

export default connect(mapStateToProps)(CampaignItem);
