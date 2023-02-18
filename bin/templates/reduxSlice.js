const { firstLetterToUpperCase } = require('../utils/firstLetterToUpperCase');
const reduxSliceTemplate = ({ sliceName, useActions, extraReducers }) => {
  const typeName = firstLetterToUpperCase(sliceName);
  return `
import { PayloadAction${useActions ? '' : ', createSlice'} } from '@reduxjs/toolkit';
${useActions ? `import { buildSlice } from '@/shared/lib/utils/buildSlice';` : ''}
import { ${typeName}Schema } from '../types/${sliceName}Schema';

const initialState:${typeName}Schema = {
  
};

export const ${sliceName}Slice = ${useActions ? 'buildSlice': 'createSlice'}({
  name: ${sliceName},
  initialState,
  reducers: {
        template: (state, action: PayloadAction<string>) => {
           
        },
    },
    ${extraReducers ? `// extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },`: ''}
});

export const { reducer: ${sliceName}Reducer } = ${sliceName}Slice;
${useActions ? `export const { useActions: use${firstLetterToUpperCase(sliceName)}Actions } = ${sliceName}Slice;` : `export const { actions: ${sliceName}Actions } = ${sliceName}Slice`}
`;
};

module.exports = { reduxSliceTemplate };
