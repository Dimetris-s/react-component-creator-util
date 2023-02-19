const chalk = require('chalk');
const path = require('path');
const fs = require('fs/promises');
const { program } = require('commander');
const createSlice = async (layer, sliceName) => {
  if(!layer || !sliceName) {
    throw new Error('Should to pass layer name and slice name!');
  }

  const layers = ['feature', 'widget', 'entity', 'view'];

  if(!layers.includes(layer)) {
    throw new Error(`Incorrect layer name, available layers: ${layers.map(layer => chalk.cyanBright(layer)).join(' or ')}!`)
  }

  const { withModel, withUseActions, withApi, withSelector, withExtraReducers, srcPath, ...componentOptions } = program.opts();

  const slicePath = path.resolve()

};

module.exports = { createSlice };
