const { firstLetterToUpperCase } = require('../utils/firstLetterToUpperCase');
const schemaTemplate = ({ sliceName }) => {
  return `
    export interface ${firstLetterToUpperCase(sliceName)}Schema {
    
    }
  `;
};

module.exports = { schemaTemplate };
