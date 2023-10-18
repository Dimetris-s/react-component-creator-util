const fs = require('fs/promises');
const path = require('path');
const { reduxSliceTemplate } = require('../templates/reduxSlice');
const { selectorTemplate } = require('../templates/selector');
const { schemaTemplate } = require('../templates/schema');
const { firstLetterToLowerCase } = require('./firstLetterToLowerCase');

const createModel = async ({ sliceName, slicePath, sliceOptions }) => {
  const { withUseActions, withSelector, withExtraReducers, useModelDirectories } = sliceOptions;
  const modelPath = (...segments) => path.resolve(slicePath, 'model', ...segments);

  const createFolderStructure = async () => {
    try {
      await fs.mkdir(modelPath(), { recursive: true });
      if(!useModelDirectories) return;
      await fs.mkdir(modelPath('types'), { recursive: true });
      await fs.mkdir(modelPath('slices'), { recursive: true });
      if(withSelector) {
        await fs.mkdir(modelPath('selectors'), { recursive: true });
      }
    } catch(e) {
      console.log('Cannot create folder structure', e);
    }
  };

  const createReduxSlice = async () => {
    try {
      const fileName= `${firstLetterToLowerCase(sliceName)}Slice.ts`
      const path = useModelDirectories ? modelPath('slices', fileName) : modelPath(fileName);
      await fs.writeFile(
        path,
        reduxSliceTemplate({
          sliceName,
          useActions: withUseActions,
          extraReducers: withExtraReducers
        })
      );
    } catch(e) {
      console.log('Cannot create slice', e);
    }
  };

  const createSelectors = async () => {
    try {
      const fileName = `${firstLetterToLowerCase(sliceName)}Selectors.ts`
      const path = useModelDirectories ? modelPath('selectors', fileName) : modelPath(fileName)
      await fs.writeFile(
        path,
        selectorTemplate({sliceName: firstLetterToLowerCase(sliceName)})
      )
    } catch(e) {
      console.log('Cannot create selector', e);
    }
  }

  const createSchema = async () => {
    try {
      const fileName = `${firstLetterToLowerCase(sliceName)}Schema.ts`
      const path = useModelDirectories ? modelPath('types', fileName) : modelPath(fileName);
      await fs.writeFile(
        path,
        schemaTemplate({sliceName})
      )
    } catch(e) {
      console.log('Cannot create schema', e);
    }
  }

  await createFolderStructure();
  await createReduxSlice();
  if(withSelector) {
    await createSelectors();
  }
  await createSchema();
};

module.exports = { createModel };
