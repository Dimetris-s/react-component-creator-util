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

const initalPath = path.resolve(process.env.PWD, '');
const settingsPath = path.resolve(__dirname, 'settings.json');

program
  .version(pkg.version)
  .description('Util for creating React components');

program.option('-se, --style-ext <ext>', 'Set extention for styles file', settings.defaultExt);
program.option('-m, --style-module', 'Enable style module', settings.enableModule);
program.option('-ts, --typescript', 'Enable typescript', settings.enableTypescript);
program.option('-s, --style-file', 'Create style file', settings.createCss);
program.option('-cn, --classnames', 'Add import classnames', settings.enableCn);
program.option('-m, --memo', 'Wrap component with memo', settings.memoComponent);

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
  await fs.writeFile(settingsPath, `{
    "relPath": "",
    "defaultExt": ".css",
    "enableModule": false,
    "enableTypescript": false,
    "createCss": false,
    "memoComponent": false,
    "enableCn": false
}`);
  logger(chalk.yellowBright('RC settings was cleared!'), types.INFO)
});

program.command('create <name>').description('Create React Component').action(createComponent(initalPath));
program.command('c <name>').description('Create React Component').action(createComponent(initalPath));

program.command('info').description('Get state info').action(() => {
  logger(`Style extention: ${chalk.magentaBright(settings.defaultExt)}`, types.INFO);
  logger(`Path: ${chalk.yellowBright(settings.relPath)}`, types.INFO);
  logger(`Create style file: ${getColoredBooleanMessage(settings.createCss)}`, types.INFO);
  logger(`Enable style module: ${getColoredBooleanMessage(settings.enableModule)}`, types.INFO);
  logger(`Enable Typescript: ${getColoredBooleanMessage(settings.enableTypescript)}`, types.INFO);
  logger(`Wrap component with memo: ${getColoredBooleanMessage(settings.memoComponent)}`, types.INFO);
  logger(`Enable classnames: ${getColoredBooleanMessage(settings.enableCn)}`, types.INFO);
});

program.command('module <bool>').description('Enable/disable module style file').action(toggleSetting('enableModule'));


program.command('typescript <bool>').description('Enable/disable typescript').action(toggleSetting('enableTypescript'));

program.command('css <bool>').description('Enable/disable creating style file').action(toggleSetting('createCss'));

program.command('memo <bool>').description('Enable/disable wrapping component with memo').action(toggleSetting('memoComponent'));

program.command('cn <bool>').description('Enable/disable classNames lib import').action(toggleSetting('enableCn', true));

program.parse();
