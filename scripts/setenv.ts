// @ts-nocheck
const fs = require('fs');
const { writeFile, existsSync, mkdirSync } = require('fs');

const { argv } = require('yargs');
require('dotenv').config();

const envKey = 'TETU_';
const { configuration } = argv;
const isProduction = configuration === 'prod';
const targetPath = isProduction ? `./src/environments/environment.prod.ts` : `./src/environments/environment.ts`;
const targetPath2 = !isProduction ? `./src/environments/environment.prod.ts` : `./src/environments/environment.ts`;
const targetPath3 = isProduction
  ? `./libs/ui/src/lib/core/environment/environment.prod.ts`
  : `./libs/ui/src/lib/core/environment/environment.ts`;

// @ts-ignore
const env = Object.keys(process.env)
  .filter(key => {
    return key.startsWith(envKey);
  })
  .reduce((result: never, key: string) => {
    result[key.replace(envKey, '')] = JSON.stringify(process.env[key]);

    return result;
  }, {});

let environmentFileContent = `export const environment = {
  production: ${isProduction},`;

Object.keys(env).forEach(key => {
  environmentFileContent = `${environmentFileContent}
  ${key}: ${env[key]},`;
});

environmentFileContent = `${environmentFileContent}
};
`;

if (!existsSync('./src/environments')) {
  mkdirSync('./src/environments');
}

if (!existsSync('./libs/ui/src/lib/core/environment')) {
  mkdirSync('./libs/ui/src/lib/core/environment', { recursive: true });
}

fs.open(targetPath, 'w', function (err, file) {
  if (err) {
    throw err;
  }
  console.log('Created: ' + targetPath);
});

fs.open(targetPath2, 'w', function (err, file) {
  if (err) {
    throw err;
  }
  console.log('Created2: ' + targetPath2);
});

fs.open(targetPath3, 'w', function (err, file) {
  if (err) {
    throw err;
  }
  console.log('Created2: ' + targetPath3);
});

writeFile(targetPath, environmentFileContent, (err: never) => {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});

writeFile(targetPath2, environmentFileContent, (err: never) => {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath2}`);
});

writeFile(targetPath3, environmentFileContent, (err: never) => {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath3}`);
});
