const { firstLetterToUpperCase } = require('../utils/firstLetterToUpperCase');
const { firstLetterToLowerCase } = require('../utils/firstLetterToLowerCase');
const rtkApiTemplate = ({ sliceName }) =>
`import { rtkApi } from '@/shared/api/rtkApi';

const ${firstLetterToLowerCase(sliceName)}Api = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    get${firstLetterToUpperCase(sliceName)}: build.query<any, void>({
      query: () => ({
        url: '/${firstLetterToLowerCase(sliceName)}',
      }),
    }),
  }),
});

export const {
  useGet${firstLetterToUpperCase(sliceName)}Query,
  endpoints: {
    get${firstLetterToUpperCase(sliceName)},
  },
} = ${firstLetterToLowerCase(sliceName)}Api;

`;

module.exports = { rtkApiTemplate };
