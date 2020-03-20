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

  const destinationPath = './dist/web-component/world-time';

  await fs.ensureDir(destinationPath);
  await concat(files, `${destinationPath}/world-time.js`);
  await fs.copyFile(`${sourcePath}/styles.css`, `${destinationPath}/world-time.css`);
})();
