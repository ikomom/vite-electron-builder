import {resolve, sep} from 'path';

export default {
  '*.{js,mjs,cjs,ts,mts,cts,vue}': 'eslint --cache --fix',

  /**
   * Run typechecking if any type-sensitive files or project dependencies was changed
   * @param {string[]} filenames
   * @return {string[]}
   */
  '{pnpm-lock.yaml,packages/**/{*.ts,*.vue,tsconfig.json}}': ({filenames}) => {
    // if dependencies was changed run type checking for all packages
    if (filenames.some(f => f.endsWith('pnpm-lock.yaml'))) {
      return ['npm run typecheck'];
    }

    // else run type checking for staged packages
    const fileNameToPackageName = filename =>
      filename.replace(resolve(process.cwd(), 'packages') + sep, '').split(sep)[0];
    return [...new Set(filenames.map(fileNameToPackageName))].map(p => `npm run typecheck:${p}`);
  },
};
