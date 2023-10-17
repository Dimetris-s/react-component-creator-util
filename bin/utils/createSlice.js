const chalk = require('chalk');
const path = require('path');
const fs = require('fs/promises');
const { program } = require('commander');
const { createModel } = require('./createModel');
const { createUI } = require('./createUI');
const { createPublicApi } = require('./createPublicApi');
const { logger, types } = require('./logger');
const settings = require('../settings.json');
const {createRtkApi} = require("./createApi");

const createSlice = (initPath) => async (layer, sliceName) => {
  if(!layer || !sliceName) {
    throw new Error('Should to pass layer name and slice name!');
  }

  const layers = ['features', 'widgets', 'entities', 'views'];

  if(!layers.includes(layer)) {
    throw new Error(`Incorrect layer name, available layers: ${layers.map(layer => chalk.cyanBright(layer)).join(' or ')}!`)
  }

  const { withModel, withUseActions, withApi, withSelector, withExtraReducers, useModelDirectories, ...componentOptions } = program.opts();
  const srcPath = settings.slice.srcPath
  const sliceOptions = {
    withModel, withUseActions, withApi, withSelector, withExtraReducers, useModelDirectories, srcPath
  }
  if(!srcPath) {
    throw new Error('Src path not found!');
  }

  const slicePath = path.resolve(initPath, srcPath, layer, sliceName);

  try {
    await fs.mkdir(slicePath, {recursive: true});
  } catch (e) {
    console.log('Cannot create slice dir', e);
  }
  if(withApi) {
    await createRtkApi({slicePath, sliceName});
  }
  if(withModel) {
    await createModel({slicePath, sliceName, sliceOptions})
  }
  await createUI({slicePath, sliceName, componentOptions, layer})
  await createPublicApi({slicePath, sliceName, useModelDirectories, withModel, typescript: componentOptions.typescript})


  logger(`Slice ${chalk.whiteBright.bold(sliceName)} has been successfully created in ${chalk.whiteBright.bold(layer)} layer!`, types.SUCCESS);
};

module.exports = { createSlice };
