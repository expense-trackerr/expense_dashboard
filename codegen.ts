import { CodegenConfig } from '@graphql-codegen/cli';
import { URL_OF_GRAPHQL_API } from './src/config/gqlClient';

const config: CodegenConfig = {
  schema: [
    {
      [URL_OF_GRAPHQL_API]: {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBiYmQyOTllODU2MmU3MmYyZThkN2YwMTliYTdiZjAxMWFlZjU1Y2EiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmlzaGFiIEd1cHRhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pKSXV3RGxibmNCLVN4enVVTXZTQlE1TlBUREFEbEdxQmoxU1FpdVZuYz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9leHAtdHJhIiwiYXVkIjoiZXhwLXRyYSIsImF1dGhfdGltZSI6MTcwMDkzNDYzNSwidXNlcl9pZCI6ImdWMm1RbkpKM1hZYkhjTUFIV2RRS291QndLUjIiLCJzdWIiOiJnVjJtUW5KSjNYWWJIY01BSFdkUUtvdUJ3S1IyIiwiaWF0IjoxNzAwOTM0NjM1LCJleHAiOjE3MDA5MzgyMzUsImVtYWlsIjoicmdwcmFpbnNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTExOTgyMDM3NTUzMzU4OTEwMjIiXSwiZW1haWwiOlsicmdwcmFpbnNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Rtzz2VLb0egaQ_pGRTISMq8WDQAf9DTFFrc8rmaZnh_SOwNPRCM6zDHUM7OZiscCbh9o4QjwLm71KzolvHVkQ_jmQPE8u6XMPwHS0qSGXh74ksNAyOf5IoSANimmO7MbgVfOOiAwb_nRNLiFy1w-K0KaHE6mbQApUkT8rvJjf08VLOuUkchrxZDl5MLL6y0TIscebbCHcT2MNdMF55MgAgGEvUVHpPObtsOm3A29KYTRS7Il3rWOwsPMEFxD0rnKb2oKwQPA06SBjuxgG5A-CBMzvVSfbGQGd9_kx_YJxUmgeTCCH8TTl2BrjjqeoadNzKIDNpgKzpLhskU88jNiag',
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
