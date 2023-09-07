import { ApolloError, ApolloQueryResult, useQuery } from '@apollo/client';
import { AxiosError, AxiosResponse } from 'axios';
import { LinkTokenCreateResponse } from 'plaid';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { PlaidLinkOnSuccessMetadata } from 'react-plaid-link';
import defaultAxios from '../config/axiosConfig';
import { gql } from '../__generated__';
import { GetLinkedAccountsQuery } from '../__generated__/graphql';
import { useAuth } from './AuthContext';

const GET_LINKED_ACCOUNTS = gql(`
    query getLinkedAccounts($userId: String!) {
        getLinkedAccounts(userId: $userId) {
            item_id
            name
            alias_name
            created_at
        }
    }
`);

type PlaidContextType = {
  linkToken?: string;
  linkTokenError?: string;
  generateToken?: () => void;
  onSuccess: (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => void;
  linkedAccounts: GetLinkedAccountsQuery['getLinkedAccounts'] | undefined;
  linkedAccountError?: ApolloError;
  linkedAccountLoading: boolean;
  linkedAccountRefetch: () => Promise<ApolloQueryResult<GetLinkedAccountsQuery>>;
};

export const PlaidContext = createContext<PlaidContextType>({
  linkToken: undefined,
  linkTokenError: undefined,
  generateToken: () => {},
  onSuccess: () => {},
  linkedAccounts: [],
  linkedAccountError: undefined,
  linkedAccountLoading: false,
  linkedAccountRefetch: () => Promise.resolve({} as ApolloQueryResult<GetLinkedAccountsQuery>),
});

export function PlaidContextProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();
  const [linkToken, setLinkToken] = useState<string | undefined>();
  const [linkTokenError, setLinkTokenError] = useState<string | undefined>();

  const {
    data,
    error: linkedAccountError,
    loading: linkedAccountLoading,
    refetch: linkedAccountRefetch,
  } = useQuery(GET_LINKED_ACCOUNTS, {
    variables: { userId: currentUser?.uid ?? '' },
  });
  const linkedAccounts = data?.getLinkedAccounts;

  useEffect(() => {
    linkedAccountRefetch();
  }, [linkedAccounts]);

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
        return;
      }
    };

    exchangePublicTokenForAccessToken();
  }, []);

  // Generate token to initialize Plaid Link
  useEffect(() => {
    const init = async () => {
      if (window.location.href.includes('?oauth_state_id=')) {
        setLinkToken(localStorage.getItem('plaidLinkToken') ?? undefined);
        return;
      }
      generateToken();
    };
    init();
  }, [generateToken]);

  const plaidContextValue = useMemo(
    () => ({
      linkToken,
      linkTokenError,
      onSuccess,
      linkedAccounts,
      linkedAccountError,
      linkedAccountLoading,
      linkedAccountRefetch,
    }),
    [
      linkToken,
      linkTokenError,
      onSuccess,
      linkedAccounts,
      linkedAccountError,
      linkedAccountLoading,
      linkedAccountRefetch,
    ]
  );

  return <PlaidContext.Provider value={plaidContextValue}>{children}</PlaidContext.Provider>;
}
