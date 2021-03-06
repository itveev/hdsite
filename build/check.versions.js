import chalk from 'chalk';
import semver from 'semver';
import childProcess from 'child_process';
import packageConfig from '../package.json';
// const shell = require('shelljs');

const exec = function (cmd) {
  return childProcess.execSync(cmd).toString().trim();
};

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node,
  },
  {
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm,
  },
];

export default function () {
  const warnings = [];
  for (let i = 0; i < versionRequirements.length; i += 1) {
    const mod = versionRequirements[i];
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(`${mod.name}: ${chalk
        .red(mod.currentVersion)} should be ${chalk
        .green(mod.versionRequirement)}`);
    }
  }

  if (warnings.length) {
    console.log('');
    console.log(chalk.yellow('To use this template, you must update following to modules:'));
    console.log();
    for (let i = 0; i < warnings.length; i += 1) {
      const warning = warnings[i];
      console.log(`  ${warning}`);
    }
    console.log();
    process.exit(1);
  }
}
