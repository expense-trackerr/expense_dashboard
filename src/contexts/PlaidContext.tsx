import { AxiosError, AxiosResponse } from 'axios';
import { LinkTokenCreateResponse } from 'plaid';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { PlaidLinkOnSuccessMetadata } from 'react-plaid-link';
import defaultAxios from '../config/axiosConfig';

type PlaidContextType = {
  itemId?: string;
  linkToken?: string;
  linkTokenError?: string;
  generateToken?: () => void;
  onSuccess: (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => void;
};

export const PlaidContext = createContext<PlaidContextType>({
  itemId: undefined,
  linkToken: undefined,
  linkTokenError: undefined,
  generateToken: () => {},
  onSuccess: () => {},
});

export function PlaidContextProvider({ children }: { children: React.ReactNode }) {
  const [itemId, setItemId] = useState<string | undefined>();
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
    const exchangePublicTokenForAccessToken = async () => {
      const response = await defaultAxios.post('http://localhost:3000/api/set_access_token', {
        publicToken: public_token,
      });
      if (response.status !== 201) {
        setItemId(undefined);
        return;
      }
      const data = response.data;
      setItemId(data.itemId);
    };

    exchangePublicTokenForAccessToken();
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
    () => ({ linkToken, linkTokenError, itemId, onSuccess }),
    [linkToken, linkTokenError, itemId, onSuccess]
  );

  return <PlaidContext.Provider value={plaidContextValue}>{children}</PlaidContext.Provider>;
}
