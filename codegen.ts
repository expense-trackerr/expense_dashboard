import { CodegenConfig } from '@graphql-codegen/cli';
import { URL_OF_GRAPHQL_API } from './src/config/gqlClient';

const config: CodegenConfig = {
  schema: [
    {
      [URL_OF_GRAPHQL_API]: {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImFhMDhlN2M3ODNkYjhjOGFjNGNhNzJhZjdmOWRkN2JiMzk4ZjE2ZGMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmlzaGFiIEd1cHRhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eFlUZVk1TkFuc1R3WDVQTVZrWFBjNVd4ZG1xbkhSYzVUd3dTTkdoPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2V4cGVuc2UtdHJhY2tlci1hNjczMyIsImF1ZCI6ImV4cGVuc2UtdHJhY2tlci1hNjczMyIsImF1dGhfdGltZSI6MTY5NDgyODI3NCwidXNlcl9pZCI6IjN3RDZrZWxQeXZaZ254RVEwTHdaMEIxVzg4SjMiLCJzdWIiOiIzd0Q2a2VsUHl2WmdueEVRMEx3WjBCMVc4OEozIiwiaWF0IjoxNjk0ODgxMDU1LCJleHAiOjE2OTQ4ODQ2NTUsImVtYWlsIjoicmdwcmFpbnNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTExOTgyMDM3NTUzMzU4OTEwMjIiXSwiZW1haWwiOlsicmdwcmFpbnNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.ZCTDMXO7sLe5xCWq6HADtObPS2r-kWsEqetSd0W023nn2I-Q9O0oaqkOJpg70p-52yTdqUXF_0s1HIcQ0Y_bHK9wG9HtL7VT-dLw-FDv0qotL9c5nKL4a_3Ics7Mh8JNGZqhxB_yRu-n7rltYGsxwwvQPDJNXz3EDWhpkv6-hHJcPAIYeW0gGhrKk5o6eDZTPGgtecdEjrV9FB69az4hFb5UKJFHLvpJJtrhguxNec-2amY8brqg33Iytpn5Q1TOqTzh62PbuPc2ldR-9Xh3lMCcW2gvBcprP7iwqZbDFKgsTlZUcLhcAduXUoNoesJJP-_ibqx8Ms9oM4DrDbY7YQ',
        },
      },
    },
  ],
  documents: ['src/**/*.tsx'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
  config: {
    scalars: {
      Decimal: 'string', // Map Decimal scalar to string
    },
  },
};

export default config;
