import path from 'path';
import { fileURLToPath } from 'url';
import { makeSchema } from 'nexus';
import appointment, {
  appointmentQueryList,
  appointmentQuery,
  appointmentCreateMutation,
  appointmentUpdateMutation,
  appointmentSoftDeleteMutation,
  appointmentRecoverMutation,
} from 'graphql-server/types/appointment';
import service, { serviceQuery, serviceAndSalonsQueryList } from 'graphql-server/types/service';
import salon, { salonQuery } from 'graphql-server/types/salon';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const queries = [
  appointmentQuery,
  appointmentQueryList,
  serviceQuery,
  serviceAndSalonsQueryList,
  salonQuery,
];
const mutations = [
  appointmentCreateMutation,
  appointmentUpdateMutation,
  appointmentSoftDeleteMutation,
  appointmentRecoverMutation,
];

export default makeSchema({
  types: [appointment, service, salon, ...queries, ...mutations],
  shouldExitAfterGenerateArtifacts: false,
  outputs: {
    schema: path.join(__dirname, 'generated/schema.graphql'),
    typegen: path.join(__dirname, 'generated/nexus-types.d.ts'),
  },
  sourceTypes: {
    modules: [
      {
        module: path.join(__dirname, '../prisma/generated/index.d.ts'),
        alias: 'prisma',
      },
    ],
    debug: true,
  },
  contextType: {
    module: path.join(__dirname, 'context.ts'),
    export: 'Context',
  },
  nonNullDefaults: {
    input: true,
    output: true,
  },
});
