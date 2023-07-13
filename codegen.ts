import { CodegenConfig } from '@graphql-codegen/cli';
import { URL_OF_GRAPHQL_API } from './src/config/gqlClient';

const config: CodegenConfig = {
  schema: [
    {
      [URL_OF_GRAPHQL_API]: {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjE0ZWI4YTNiNjgzN2Y2MTU4ZWViNjA3NmU2YThjNDI4YTVmNjJhN2IiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmlzaGFiIEd1cHRhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eFl1SEVDd1BmWUk1S2cwejZSTEN2cVBiQ3hzWGtHQVBFSFdGSUFFbnc9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZXhwZW5zZS10cmFja2VyLWE2NzMzIiwiYXVkIjoiZXhwZW5zZS10cmFja2VyLWE2NzMzIiwiYXV0aF90aW1lIjoxNjg5MTg0NTY0LCJ1c2VyX2lkIjoiSDNadkZMMFZKRGhVeXVLM2Rta3lSVTA4elBmMiIsInN1YiI6IkgzWnZGTDBWSkRoVXl1SzNkbWt5UlUwOHpQZjIiLCJpYXQiOjE2ODkyODc5OTIsImV4cCI6MTY4OTI5MTU5MiwiZW1haWwiOiJyaXNoYWJndXB0YTk4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA4NDMxMDU1MzI4MzgzODgyNzIzIl0sImVtYWlsIjpbInJpc2hhYmd1cHRhOThAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.ODNTHtkZzJrO0SL9p6kttSfyeCusdnBnsEQmpWBigVT9j9w-NB1Sy8i1ragM90GKUQqMIkxuic_kBJkJrc1xVyyYva3Ysn8Z6m7flwvWAxVp_QMlzrlyH2cWxY2oKVWvE_BTMVjj51S_VOV2mYY8hmvXJqnIKUag9JjRCqkQIXN6SkEzMFJLn5KyCqqX_t3FKip7IGe1aVJUeVEBTyp8WsQDsn6JIkVPN6fzX1UZfFd7c1aULePFbVM4PfYJ9lpDmwTHMztvrtyyIDlKTBxfToCuJ5N9m39hhAj0zyyadfYV7KZ3eVBM73y9JUKnfA6rnMZu1uoquXp6zF1-k20u-g',
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
};

export default config;
