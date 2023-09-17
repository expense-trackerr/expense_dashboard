import { CodegenConfig } from '@graphql-codegen/cli';
import { URL_OF_GRAPHQL_API } from './src/config/gqlClient';

const config: CodegenConfig = {
  schema: [
    {
      [URL_OF_GRAPHQL_API]: {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImFhMDhlN2M3ODNkYjhjOGFjNGNhNzJhZjdmOWRkN2JiMzk4ZjE2ZGMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmlzaGFiIEd1cHRhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eFlUZVk1TkFuc1R3WDVQTVZrWFBjNVd4ZG1xbkhSYzVUd3dTTkdoPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2V4cGVuc2UtdHJhY2tlci1hNjczMyIsImF1ZCI6ImV4cGVuc2UtdHJhY2tlci1hNjczMyIsImF1dGhfdGltZSI6MTY5NDgyODI3NCwidXNlcl9pZCI6IjN3RDZrZWxQeXZaZ254RVEwTHdaMEIxVzg4SjMiLCJzdWIiOiIzd0Q2a2VsUHl2WmdueEVRMEx3WjBCMVc4OEozIiwiaWF0IjoxNjk0OTc1MzcwLCJleHAiOjE2OTQ5Nzg5NzAsImVtYWlsIjoicmdwcmFpbnNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTExOTgyMDM3NTUzMzU4OTEwMjIiXSwiZW1haWwiOlsicmdwcmFpbnNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.BY7Xu4mzRPQWoY_dyP8LsWksTFkPwqs7o24sXTqUjiTIz_uFfH49IUaKxlETSHKYrYwA3EHKBj1yOU8qm2ihaZFAbGV7hTxoXZEUs6SwkHa1iH0bbcOu2HYVtSJAeYY5hcfJ_IY0yNt-I41MlThfFmb7DwkepLi3N3XrGCWDeNctmE8-DZDgno8_Ggu7OKMZGRtXbNIc-oZHu3ty6xvo5G7zmckvfUKJXOUr5Zh4EuilXMNBQx7raXbPWm_sUNs-2jkjIOyghnOBFvvuq6JexKTEKnrGXBejGOahwWDrWTaK9yjiPF3OSxbWA3wnsP0uwoTgKdiuAxgj14FYuL1HKA',
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
