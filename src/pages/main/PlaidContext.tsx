import { AxiosError, AxiosResponse } from 'axios';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import defaultAxios from '../../config/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { PlaidLinkOnSuccessMetadata } from 'react-plaid-link';
import { LinkTokenCreateResponse } from 'plaid';

type PlaidContextType = {
  itemId?: string | null;
  accessToken?: string | null;
  linkToken?: string | null;
  linkTokenError?: string | null;
  generateToken?: () => void;
  onSuccess: (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => void;
};

export const PlaidContext = createContext<PlaidContextType>({
  itemId: null,
  accessToken: null,
  linkToken: null,
  linkTokenError: null,
  generateToken: () => {},
  onSuccess: () => {},
});

export function PlaidContextProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [itemId, setItemId] = useState<string | undefined>();
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [linkToken, setLinkToken] = useState<string | undefined>();
  const [linkTokenError, setLinkTokenError] = useState<string | undefined>();

  const generateToken = useCallback(async () => {
    defaultAxios
      .post('http://localhost:3000/api/create_link_token')
      .then((res: AxiosResponse<LinkTokenCreateResponse>) => {
        if (res.status !== 200) {
          setLinkToken(undefined);
          return;
        }
        const data = res.data;
        if (data) {
          setLinkToken(data.link_token);
          // Save the link_token to be used later in the Oauth flow.
          localStorage.setItem('plaidLinkToken', data.link_token);
        }
      })
      .catch((err) => {
        const axiosError = err as AxiosError<{ message: string }>;
        console.error(axiosError.response?.data.message);
        setLinkTokenError(axiosError.response?.data.message);
      });
  }, []);

  type OnSuccessResponseType = {
    access_token: string;
    item_id: string;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSuccess = React.useCallback((public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
    // If the access_token is needed, send public_token to server
    const exchangePublicTokenForAccessToken = async () => {
      const response: AxiosResponse<OnSuccessResponseType> = await defaultAxios.post(
        'http://localhost:3000/api/set_access_token',
        {
          publicToken: public_token,
        }
      );
      if (response.status !== 200) {
        setItemId('No item_id retrieved');
        setAccessToken('No access_token retrieved');
        return;
      }
      const data = response.data;
      setItemId(data.item_id);
      setAccessToken(data.access_token);
    };

    exchangePublicTokenForAccessToken();

    navigate('/');
  }, []);

  useEffect(() => {
    const init = async () => {
      // do not generate a new token for OAuth redirect; instead
      // setLinkToken from localStorage
      if (window.location.href.includes('?oauth_state_id=')) {
        setLinkToken(localStorage.getItem('plaidLinkToken') ?? undefined);
        return;
      }
      generateToken();
    };
    init();
  }, [generateToken]);

  const plaidContextValue = useMemo(
    () => ({ linkToken, linkTokenError, itemId, accessToken, onSuccess }),
    [linkToken, linkTokenError, itemId, accessToken, onSuccess]
  );

  return <PlaidContext.Provider value={plaidContextValue}>{children}</PlaidContext.Provider>;
}
