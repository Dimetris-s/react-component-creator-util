const path = require('path');
const fs = require('fs/promises');
const { firstLetterToUpperCase } = require('./firstLetterToUpperCase');
const { firstLetterToLowerCase } = require('./firstLetterToLowerCase');

const createPublicApi = async ({slicePath, sliceName, withModel}) => {
  const componentName = firstLetterToUpperCase(sliceName);
  try {
    await fs.writeFile(
      path.resolve(slicePath, 'index.ts'),
`export { ${ componentName } } from './ui/${componentName}';
${withModel ? `export type { ${componentName}Schema } from './model/types/${firstLetterToLowerCase(sliceName)}Schema';`: ''}
`
    )
  } catch(e) {
    console.log('Cannot create public api', e);
  }
};

module.exports = { createPublicApi };
