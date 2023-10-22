import { ApolloError, ApolloQueryResult, QueryResult, useQuery } from '@apollo/client';
import React, { createContext, useMemo } from 'react';
import { gql } from '../__generated__';
import { Exact, GetCategoriesQuery, GetCategoryColorsQuery } from '../__generated__/graphql';
import { useAuth } from './AuthContext';

type CategoriesContextType = {
  categoryColorsGqlResponse: QueryResult<
    GetCategoryColorsQuery,
    Exact<{
      [key: string]: never;
    }>
  >;
  categories: {
    data: GetCategoriesQuery['getCategories'] | undefined;
    error: ApolloError | undefined;
    loading: boolean;
    refetch: () => Promise<ApolloQueryResult<GetCategoriesQuery>>;
  };
};

export const CategoriesContext = createContext<CategoriesContextType>({
  categoryColorsGqlResponse: {} as QueryResult<
    GetCategoryColorsQuery,
    Exact<{
      [key: string]: never;
    }>
  >,
  categories: {
    data: undefined,
    error: undefined,
    loading: false,
    refetch: () => Promise.resolve({} as ApolloQueryResult<GetCategoriesQuery>),
  },
});

const GET_CATEGORY_COLORS = gql(`
query getCategoryColors {
  getCategoryColors {
    id
    name
    hex_code
}
}
`);

const GET_CATEGORIES = gql(`
query getCategories($userId: String!) {
    getCategories(userId: $userId) {
        id
        name
        budget
        category_type
        category_color
    }
}
`);

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useAuth();

  const categoryColorsGqlResponse = useQuery(GET_CATEGORY_COLORS);

  const {
    data: categoriesData,
    error: categoriesError,
    loading: categoriesLoading,
    refetch: categoriesRefetch,
  } = useQuery(GET_CATEGORIES, { variables: { userId: currentUser?.uid ?? '' } });

  const categoriesContextValue = useMemo(
    () => ({
      categoryColorsGqlResponse,
      categories: {
        data: categoriesData?.getCategories,
        error: categoriesError,
        loading: categoriesLoading,
        refetch: categoriesRefetch,
      },
    }),
    [categoryColorsGqlResponse, categoriesData, categoriesError, categoriesLoading, categoriesRefetch]
  );

  return <CategoriesContext.Provider value={categoriesContextValue}>{children}</CategoriesContext.Provider>;
}
