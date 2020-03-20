const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const sourcePath = './dist/world-time';
  const files = [
    `${sourcePath}/runtime-es5.js`,
    `${sourcePath}/runtime-es2015.js`,
    `${sourcePath}/polyfills-es5.js`,
    `${sourcePath}/polyfills-es2015.js`,
    `${sourcePath}/main-es5.js`,
    `${sourcePath}/main-es2015.js`,
  ];
  await fs.ensureDir(`./dist/elements/world-time`);
  await concat(files, `./dist/elements/world-time/world-time.js`);
  await fs.copyFile(`${sourcePath}/styles.css`, `./dist/elements/world-time/world-time.css`);
})();
