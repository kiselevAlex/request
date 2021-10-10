const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv').config();

fs.writeFileSync(
    path.resolve(__dirname, './public/env.js'),
    `var _RUNTIME_ENV_ = ${JSON.stringify(dotenv.parsed)}`,
);
