import { CodegenConfig } from '@graphql-codegen/cli';
import { URL_OF_GRAPHQL_API } from './src/config/gqlClient';

const config: CodegenConfig = {
  schema: [
    {
      [URL_OF_GRAPHQL_API]: {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjE5MGFkMTE4YTk0MGFkYzlmMmY1Mzc2YjM1MjkyZmVkZThjMmQwZWUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmlzaGFiIEd1cHRhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eFlUZVk1TkFuc1R3WDVQTVZrWFBjNVd4ZG1xbkhSYzVUd3dTTkdoPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2V4cGVuc2UtdHJhY2tlci1hNjczMyIsImF1ZCI6ImV4cGVuc2UtdHJhY2tlci1hNjczMyIsImF1dGhfdGltZSI6MTY5Mzk2ODM3MiwidXNlcl9pZCI6IjN3RDZrZWxQeXZaZ254RVEwTHdaMEIxVzg4SjMiLCJzdWIiOiIzd0Q2a2VsUHl2WmdueEVRMEx3WjBCMVc4OEozIiwiaWF0IjoxNjk0MDE2NzU5LCJleHAiOjE2OTQwMjAzNTksImVtYWlsIjoicmdwcmFpbnNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTExOTgyMDM3NTUzMzU4OTEwMjIiXSwiZW1haWwiOlsicmdwcmFpbnNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Sa14-9sXyh8wu-R3JXhQ_wCwMZxIflJ_M-0ZmTvzEUbMfRBqE63SJbQ9738gKDOtnRe6nbjvaTM70wsktqAe6_LAapPMqQLA9Soh3rsQsHfwWtZkepnor0ufFHvuqPQpryXUl5mr-4YAYBVeBZdwe4v8IY73JpYQDMdC9pF-hTZRfzwAThE6WznjcGafOiH2sTNZq_rum1tZ5lVJp-v3Q6ud61Bwob46FDQcizSc5nz9K_bRZMZFPjJJ8m6Q8nMM6VTk_oLPZbonJ2ZZl77h3bmrl1yiNElIGS5dKcZCVgfs8aWGoiXaDWz2conhWcndDU4nUgVV7JPjbnshfrv3kg',
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
