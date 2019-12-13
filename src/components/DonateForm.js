import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addContribution } from '../modules';

const DonateForm = ({ campaign, currentBalance, dispatch }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const amountInputProps = {
    className: 'Donate-amount',
    value: amount,
    placeholder: 'Amount',
    onChange: ({ target: { value } }) => setAmount(value)
  };

  const messageInputProps = {
    className: 'Donate-message',
    value: message,
    placeholder: 'Message',
    onChange: ({ target: { value } }) => setMessage(value)
  };

  const buttonProps = {
    className: 'Donate-button',
    onClick: event => {
      // Initially set error to null to clear it.
      setError(null);

      // Check if donation amount is greater than current balance
      if (currentBalance < amount) {
        setError(`You don't have enough money.`);
        return;
      }

      // Dispatch action to add a new contribution
      dispatch(addContribution(Number(amount), campaign.id));

      // Clear inputs
      setAmount('');
      setMessage('');
    }
  };

  const errorMessage = error && <div className="Donate-error">{error}</div>;

  return (
    <div className="CampaignInfo-donate">
      <h2>Donate to {campaign.name}</h2>
      <input {...amountInputProps} />
      <input {...messageInputProps} />
      {errorMessage}
      <button {...buttonProps}>Donate</button>
    </div>
  );
};

export default connect()(DonateForm);
