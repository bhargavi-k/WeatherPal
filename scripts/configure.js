#!/usr/bin/env node
/**
 * Should be called from the project root
 * `npm i` must be run before this script will work (or inquirer installed globally)
 * Runs automatically with 3 arguments, pathToWrite, env, and releaseMode. Prompts user when run with no arguments
 * - Add secrets.json
 */
const fs = require('fs');
const {input} = require('@inquirer/prompts');

async function askForApiKey() {
  const apiKey = await input({
    type: 'string',
    name: 'apiKey',
    message: 'What is your OpenWeatherMap ApiKey?',
  });

  return apiKey;
}

async function main() {
  const path = '.';
  const weatherAPIKey = await askForApiKey();
  console.log('weatherAPIKey: ', weatherAPIKey);

  fs.writeFileSync(
    `${path}/secrets.json`,
    JSON.stringify(
      {
        weatherAPIKey,
      },
      null,
      4,
    ),
  );
  console.log(
    './secrets.json for mapbox api key and realm encryption access...🦆',
  );
}

main()
  .then(() => {
    console.log("You're ready to go!");
    process.exit(0);
  })
  .catch(error => {
    console.error('Failed to configure:', error);
    process.exit(1);
  });
