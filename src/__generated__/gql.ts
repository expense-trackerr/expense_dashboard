/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\nquery getCategoryColors {\n  getCategoryColors {\n    id\n    name\n    hex_code\n}\n}\n": types.GetCategoryColorsDocument,
    "\nquery getCategories($userId: String!) {\n    getCategories(userId: $userId) {\n        id\n        name\n        budget\n        category_type\n        category_color\n    }\n}\n": types.GetCategoriesDocument,
    "\nquery getLinkedAccounts($userId: String!) {\n    getLinkedAccounts(userId: $userId) {\n        item_id\n        name\n        alias_name\n        created_at\n        linked_sub_accounts {\n            account_id\n            name\n            alias_name\n            balance \n        }\n    }\n}\n": types.GetLinkedAccountsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getCategoryColors {\n  getCategoryColors {\n    id\n    name\n    hex_code\n}\n}\n"): (typeof documents)["\nquery getCategoryColors {\n  getCategoryColors {\n    id\n    name\n    hex_code\n}\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getCategories($userId: String!) {\n    getCategories(userId: $userId) {\n        id\n        name\n        budget\n        category_type\n        category_color\n    }\n}\n"): (typeof documents)["\nquery getCategories($userId: String!) {\n    getCategories(userId: $userId) {\n        id\n        name\n        budget\n        category_type\n        category_color\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery getLinkedAccounts($userId: String!) {\n    getLinkedAccounts(userId: $userId) {\n        item_id\n        name\n        alias_name\n        created_at\n        linked_sub_accounts {\n            account_id\n            name\n            alias_name\n            balance \n        }\n    }\n}\n"): (typeof documents)["\nquery getLinkedAccounts($userId: String!) {\n    getLinkedAccounts(userId: $userId) {\n        item_id\n        name\n        alias_name\n        created_at\n        linked_sub_accounts {\n            account_id\n            name\n            alias_name\n            balance \n        }\n    }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;