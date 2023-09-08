import { useContext, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { AddButton } from '../../components/Buttons';
import { PlaidContext } from '../../contexts/PlaidContext';

export const PlaidLink = () => {
  const { linkToken, onSuccess } = useContext(PlaidContext);

  let isOauth = false;
  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
  };

  if (window.location.href.includes('?oauth_state_id=')) {
    // config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (isOauth && ready) {
      open();
    }
  }, [ready, open, isOauth]);

  return (
    <AddButton onClick={() => open()} disabled={!ready}>
      Add Account
    </AddButton>
  );
};
