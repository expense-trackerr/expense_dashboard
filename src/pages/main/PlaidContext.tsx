// @ts-nocheck
import { AxiosError } from 'axios';
import { createContext, useCallback, useMemo, useState } from 'react';
import defaultAxios from '../../config/axiosConfig';

type PlaidContextType = {};

export const PlaidContext = createContext<PlaidContextType>({});

export function PlaidContextProvider({ children }: { children: React.ReactNode }) {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [linkTokenError, setLinkTokenError] = useState<string | null>(null);

  const generateToken = useCallback(async () => {
    // Link tokens for 'payment_initiation' use a different creation flow in your backend.

    defaultAxios
      .post('http://localhost:3000/api/create_link_token')
      .then((res) => {
        if (!res.ok) {
          setLinkToken(null);
          return;
        }
        res.json().then((data) => {
          if (data) {
            if (data.error != null) {
              setLinkToken(null);
              setLinkTokenError(data.error);
              return;
            }
            setLinkToken(data.link_token);
            // Save the link_token to be used later in the Oauth flow.
            localStorage.setItem('plaidLinkToken', data.link_token);
          }
        });
      })
      .catch((err) => {
        const axiosError = err as AxiosError<{ message: string }>;
        console.error(axiosError.response?.data.message);
      });
  }, []);

  useEffect(() => {
    const init = async () => {
      // do not generate a new token for OAuth redirect; instead
      // setLinkToken from localStorage
      if (window.location.href.includes('?oauth_state_id=')) {
        setLinkToken(localStorage.getItem('plaidLinkToken'));
        return;
      }
      generateToken();
    };
    init();
  }, [generateToken]);

  const plaidContextValue = useMemo(() => ({ linkToken, linkTokenError }), [linkToken, linkTokenError]);

  return <PlaidContext.Provider value={plaidContextValue}>{children}</PlaidContext.Provider>;
}
