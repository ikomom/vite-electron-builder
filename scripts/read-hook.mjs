import fs from 'fs';
import path from 'path';

const res = fs.readFileSync(path.resolve('../', '.git/hooks/pre-commit'));

const b = res.toString();
console.log('b', b);
