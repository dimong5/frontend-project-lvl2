#!/usr/bin/env node

const { program } = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the current version');

program.parse(process.argv);