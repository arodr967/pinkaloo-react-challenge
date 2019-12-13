import './App.css';

import React from 'react';
import { connect } from 'react-redux';
import { getSession } from './modules';

import CampaignNavigation from './components/CampaignNavigation';
import CampaignInfo from './components/CampaignInfo';
import UserBalance from './components/UserBalance';

function App({ session }) {
  const { user } = session;

  return (
    <div className="App">
      <div className="App-header">
        <img src="/icons/Code.svg" alt="code" width={48} />
        <h1>Stack Showdown</h1>
        <div style={{ flex: 1 }} />
        <UserBalance {...user} />
      </div>
      <CampaignNavigation />
      <CampaignInfo />
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    session: getSession(state)
  };
};

const mapDispatchToProps = {
  //selectCampaignById
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
