const { firstLetterToUpperCase } = require('../utils/firstLetterToUpperCase');
const rtkApiTemplate = ({ sliceName }) => `
import { rtkApi } from '@/shared/api/rtkApi';

const ${sliceName}Api = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    get${firstLetterToUpperCase(sliceName)}: build.query<any, void>({
      query: () => ({
        url: '/${sliceName}',
      }),
    }),
  }),
});

export const use${firstLetterToUpperCase(sliceName)} = ${sliceName}Api.useGet${firstLetterToUpperCase(sliceName)}Query;

export const { get${firstLetterToUpperCase(sliceName)} } = ${sliceName}Api.endpoints;
`;

module.exports = { rtkApiTemplate };
