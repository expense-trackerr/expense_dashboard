import { CodegenConfig } from '@graphql-codegen/cli';
import { URL_OF_GRAPHQL_API } from './src/config/gqlClient';

const config: CodegenConfig = {
  schema: [
    {
      [URL_OF_GRAPHQL_API]: {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjE5MGFkMTE4YTk0MGFkYzlmMmY1Mzc2YjM1MjkyZmVkZThjMmQwZWUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmlzaGFiIEd1cHRhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eFlUZVk1TkFuc1R3WDVQTVZrWFBjNVd4ZG1xbkhSYzVUd3dTTkdoPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2V4cGVuc2UtdHJhY2tlci1hNjczMyIsImF1ZCI6ImV4cGVuc2UtdHJhY2tlci1hNjczMyIsImF1dGhfdGltZSI6MTY5NDA0MDAxOSwidXNlcl9pZCI6IjN3RDZrZWxQeXZaZ254RVEwTHdaMEIxVzg4SjMiLCJzdWIiOiIzd0Q2a2VsUHl2WmdueEVRMEx3WjBCMVc4OEozIiwiaWF0IjoxNjk0MTEwNTEwLCJleHAiOjE2OTQxMTQxMTAsImVtYWlsIjoicmdwcmFpbnNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTExOTgyMDM3NTUzMzU4OTEwMjIiXSwiZW1haWwiOlsicmdwcmFpbnNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.FWINCV1WgZG6Ky7gMAQ6SpNdHMA4onGxCc13zFN2yxZLS0jt00-2s-0SPrUTNpWJCXRmwZymrXlfhlpItjRGLJsTh2CcgD9XlZlJRzNJ6n-8wExgun29Z7VbQtOqeENEoTx8PBdbmXc-DfuO9w4zYPXCbqAiaTla1IHtKgeBQA84xhWOC4ct2DqE7uchlINEjO2ZSmlsIRbslvKOQyynPLXcWEQmlvrdwEd4gElwxsn6NnVPx9TRFT0MNSPbYaQ3dTo7i6ZCiu0qGwdWMzwSvPc2pQe2VqF1T8jH26Nn32k3tAEWfz_R2mBSL1pyPEPQuhhLYlrWmZnTtfgN4iqEHg',
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
