import { CodegenConfig } from '@graphql-codegen/cli';
import { URL_OF_GRAPHQL_API } from './src/config/gqlClient';

const config: CodegenConfig = {
  schema: [
    {
      [URL_OF_GRAPHQL_API]: {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjYzODBlZjEyZjk1ZjkxNmNhZDdhNGNlMzg4ZDJjMmMzYzIzMDJmZGUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmlzaGFiIEd1cHRhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eFlUZVk1TkFuc1R3WDVQTVZrWFBjNVd4ZG1xbkhSYzVUd3dTTkdoPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2V4cGVuc2UtdHJhY2tlci1hNjczMyIsImF1ZCI6ImV4cGVuc2UtdHJhY2tlci1hNjczMyIsImF1dGhfdGltZSI6MTY5MjU0NzI4MiwidXNlcl9pZCI6IjN3RDZrZWxQeXZaZ254RVEwTHdaMEIxVzg4SjMiLCJzdWIiOiIzd0Q2a2VsUHl2WmdueEVRMEx3WjBCMVc4OEozIiwiaWF0IjoxNjkyNTQ3MjgyLCJleHAiOjE2OTI1NTA4ODIsImVtYWlsIjoicmdwcmFpbnNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTExOTgyMDM3NTUzMzU4OTEwMjIiXSwiZW1haWwiOlsicmdwcmFpbnNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Ug13BWh5uG3aZkUJzJLwKS3kywnG-7Z3ILIKnzNvcSvAydPM6UkVe9RDGxfWc__d3GtS7yFyLNJUXPDc43bfNusvHlSx7ZGeAopBlmQXeW9nDxxwu5Fi-6EE5klty7EYlYByr0df0h_-4w7DDxlWZ6RTu-VTXQRY6obt0SWtwD0foAahjA72d4KIAqn4lxhBGVH09UCKPw0K5Tb9bCkMvBntUeQTAi1vxNzBu-PF6ykiYr64FJuNwCAZ5CUnE5jDUJ4-i-EU4acVfOQg9jc3_NIuBF8Wn_d3wlTeSNMzdGEOFwZs_4zy8tyDm12_PJMJDJ_IpoZppv_X1Wfz3a89oA',
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
