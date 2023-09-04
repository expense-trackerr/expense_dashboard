import { AxiosError, AxiosResponse } from 'axios';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import defaultAxios from '../config/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { PlaidLinkOnSuccessMetadata } from 'react-plaid-link';
import { LinkTokenCreateResponse } from 'plaid';

type PlaidContextType = {
  itemId?: string;
  accessToken?: string;
  linkToken?: string;
  linkTokenError?: string;
  generateToken?: () => void;
  onSuccess: (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => void;
};

type OnSuccessResponseType = {
  access_token: string;
  item_id: string;
};

export const PlaidContext = createContext<PlaidContextType>({
  itemId: undefined,
  accessToken: undefined,
  linkToken: undefined,
  linkTokenError: undefined,
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
        setItemId(undefined);
        setAccessToken(undefined);
        return;
      }
      const data = response.data;
      setItemId(data.item_id);
      setAccessToken(data.access_token);
      localStorage.setItem('plaidAccessToken', data.access_token); // Remove this from local storage
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

  // TODO: Set AccessToken in the database
  useEffect(() => {
    const accessToken = localStorage.getItem('plaidAccessToken');
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, []);

  const plaidContextValue = useMemo(
    () => ({ linkToken, linkTokenError, itemId, accessToken, onSuccess }),
    [linkToken, linkTokenError, itemId, accessToken, onSuccess]
  );

  return <PlaidContext.Provider value={plaidContextValue}>{children}</PlaidContext.Provider>;
}
