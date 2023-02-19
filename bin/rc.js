#!/usr/bin/env node
require('dotenv').config();
const { program } = require('commander');
const path = require('path');
const pkg = require('../package.json');
const fs = require('fs/promises');

const settings = require('./settings.json');
const { createComponent } = require('./utils/createComponent');
const { toggleSetting } = require('./utils/toggleSetting');
const chalk = require('chalk');
const { logger, types } = require('./utils/logger');
const { getColoredBooleanMessage } = require('./utils/getColoredBooleanMessage');
const { defaultSettings } = require('./utils/defaultSettings');
const { createSlice } = require('./utils/createSlice');

const initialPath = path.resolve(process.env.PWD, '');
const settingsPath = path.resolve(__dirname, 'settings.json');

program
  .version(pkg.version)
  .description('Util for creating React components');

program.option('-se, --style-ext <ext>', 'Set extention for styles file', settings.component.defaultExt);
program.option('-m, --style-module', 'Enable style module', settings.component.enableModule);
program.option('-ts, --typescript', 'Enable typescript', settings.component.enableTypescript);
program.option('-s, --style-file', 'Create style file', settings.component.createCss);
program.option('-cn, --classnames', 'Add import classnames', settings.component.enableCn);
program.option('-m, --memo', 'Wrap component with memo', settings.component.memoComponent);

program.option('-wm, --with-model', 'Enable model directory in slice', settings.slice.withModel);
program.option('-wa, --with-api', 'Enable creating rtk api file', settings.slice.withApi);
program.option('-ws, --with-selector', 'Enable creating selector file', settings.slice.withSelector);
program.option('-wua, --with-use-actions', 'Enable use actions export in slice', settings.slice.withUseActions);
program.option('-wer, --with-extra-reducers', 'Add extra reducers template in slice', settings.slice.withExtraReducers);

program.command('dest <dest>').description('Set realtive path').action(async (dest) => {
  const envFile = await fs.readFile(settingsPath, { encoding: 'utf-8' });
  const newData = envFile.replace(/\"relPath\": \S+,/, `"relPath": "${dest}",`);
  await fs.writeFile(settingsPath, newData);
  logger(`A path for components has been changed to ${chalk.yellowBright(path.resolve(process.env.PWD, dest))}`, types.INFO);
});

program.command('style-ext <ext>').description('Set default style extention').action(async ext => {
  const styleRE = /^\.?(css|s[ac]ss|less)$/;
  if(!styleRE.test(ext)) {
    throw Error('Incorrect extention');
  }
  const extention = ext.includes('.') ? ext : `.${ext}`;
  const envFile = await fs.readFile(settingsPath, { encoding: 'utf-8' });
  const newData = envFile.replace(/\"defaultExt\": \S+,/, `"defaultExt": "${extention}",`);
  await fs.writeFile(settingsPath, newData);
  logger(`Style files extension has been changed to ${chalk.magentaBright(extention)}`, types.SUCCESS)
});

program.command('reset').description('Reset settings').action(async () => {
  await fs.writeFile(settingsPath, defaultSettings);
  logger(chalk.yellowBright('RC settings was cleared!'), types.INFO)
});

program.command('create <name>').description('Create React Component').action(createComponent(initialPath));
program.command('c <name>').description('Create React Component').action(createComponent(initialPath));
program.command('slice <layer> <sliceName>').description('Create Slice').action(createSlice);
program.command('sl <layer> <sliceName>').description('Create Slice').action(createSlice);

program.command('info').description('Get state info').action(() => {
  logger(`Style extention: ${chalk.magentaBright(settings.component.defaultExt)}`, types.INFO);
  logger(`Path: ${chalk.yellowBright(settings.component.relPath)}`, types.INFO);
  logger(`Create style file: ${getColoredBooleanMessage(settings.component.createCss)}`, types.INFO);
  logger(`Enable style module: ${getColoredBooleanMessage(settings.component.enableModule)}`, types.INFO);
  logger(`Enable Typescript: ${getColoredBooleanMessage(settings.component.enableTypescript)}`, types.INFO);
  logger(`Wrap component with memo: ${getColoredBooleanMessage(settings.component.memoComponent)}`, types.INFO);
  logger(`Enable classnames: ${getColoredBooleanMessage(settings.component.enableCn)}`, types.INFO);
});

program.command('module <bool>').description('Enable/disable module style file').action(toggleSetting('enableModule'));


program.command('typescript <bool>').description('Enable/disable typescript').action(toggleSetting('enableTypescript'));

program.command('css <bool>').description('Enable/disable creating style file').action(toggleSetting('createCss'));

program.command('memo <bool>').description('Enable/disable wrapping component with memo').action(toggleSetting('memoComponent'));

program.command('cn <bool>').description('Enable/disable classNames lib import').action(toggleSetting('enableCn', true));

program.parse();
