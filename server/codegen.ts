import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql-server/generated/schema.graphql',
  generates: {
    '../app/src/graphql-generated/': {
      preset: 'client',
    },
  },
};

export default config;
