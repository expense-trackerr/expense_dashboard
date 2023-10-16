/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Decimal: { input: string; output: string; }
};

export type Category = {
  __typename?: 'Category';
  budget?: Maybe<Scalars['Decimal']['output']>;
  category_color: Scalars['String']['output'];
  category_type: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CategoryColor = {
  __typename?: 'CategoryColor';
  hex_code: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type LinkedAccount = {
  __typename?: 'LinkedAccount';
  alias_name?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['String']['output'];
  item_id: Scalars['String']['output'];
  linked_sub_accounts: Array<LinkedSubAccount>;
  name: Scalars['String']['output'];
};

export type LinkedSubAccount = {
  __typename?: 'LinkedSubAccount';
  account_id: Scalars['String']['output'];
  alias_name?: Maybe<Scalars['String']['output']>;
  balance?: Maybe<Scalars['Decimal']['output']>;
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getCategories: Array<Category>;
  getCategoryColors: Array<CategoryColor>;
  getLinkedAccounts: Array<LinkedAccount>;
  getTransactions: Array<Transaction>;
};


export type QueryGetCategoriesArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetLinkedAccountsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetTransactionsArgs = {
  userId: Scalars['String']['input'];
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Decimal']['output'];
  category?: Maybe<Category>;
  currency: Scalars['String']['output'];
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  linked_sub_account: LinkedSubAccount;
  name: Scalars['String']['output'];
  pending: Scalars['Boolean']['output'];
};

export type GetCategoryColorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoryColorsQuery = { __typename?: 'Query', getCategoryColors: Array<{ __typename?: 'CategoryColor', id: string, name: string, hex_code: string }> };

export type GetCategoriesQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories: Array<{ __typename?: 'Category', id: string, name: string, budget?: string | null, category_type: string, category_color: string }> };

export type GetLinkedAccountsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetLinkedAccountsQuery = { __typename?: 'Query', getLinkedAccounts: Array<{ __typename?: 'LinkedAccount', item_id: string, name: string, alias_name?: string | null, created_at: string, linked_sub_accounts: Array<{ __typename?: 'LinkedSubAccount', account_id: string, name: string, alias_name?: string | null, balance?: string | null }> }> };

export type GetTransactionsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetTransactionsQuery = { __typename?: 'Query', getTransactions: Array<{ __typename?: 'Transaction', amount: string, currency: string, date: string, id: string, name: string, pending: boolean, category?: { __typename?: 'Category', id: string, name: string, category_type: string, category_color: string } | null, linked_sub_account: { __typename?: 'LinkedSubAccount', account_id: string, name: string, alias_name?: string | null } }> };


export const GetCategoryColorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCategoryColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCategoryColors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"hex_code"}}]}}]}}]} as unknown as DocumentNode<GetCategoryColorsQuery, GetCategoryColorsQueryVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"category_type"}},{"kind":"Field","name":{"kind":"Name","value":"category_color"}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetLinkedAccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLinkedAccounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLinkedAccounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"item_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alias_name"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"linked_sub_accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alias_name"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]}}]} as unknown as DocumentNode<GetLinkedAccountsQuery, GetLinkedAccountsQueryVariables>;
export const GetTransactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTransactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTransactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category_type"}},{"kind":"Field","name":{"kind":"Name","value":"category_color"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"pending"}},{"kind":"Field","name":{"kind":"Name","value":"linked_sub_account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"account_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"alias_name"}}]}}]}}]}}]} as unknown as DocumentNode<GetTransactionsQuery, GetTransactionsQueryVariables>;