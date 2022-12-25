import {build, createServer} from 'vite';
import path from 'path';
import {spawn} from 'child_process';
// import electronPath from 'electron';

printNpmVersion();

const mode = (process.env.MODE = process.env.MODE || 'development');
const server = await createServer({
  mode,
  configFile: path.resolve('../packages/renderer/vite.config.js'),
  server: {
    port: 8888,
  },
  plugins: [
    {
      name: 'hahaha',
      config: (userConfig, env) => {
        console.log('hjhhh', {userConfig, env});
      },
    },
  ],
}).then(s => s.listen());

// setPreload()
/**
 * 建立文件观察器
 * @param {import('vite').ViteDevServer} watchServer
 */
function setPreload() {
  return build({
    mode,
    configFile: path.resolve('../packages/renderer/vite.config.js'),
  });
}
function printNpmVersion() {
  const sv = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['-v'], {
    stdio: 'inherit',
  });
  // sv.addListener('data', d => console.log(d.toString()));
  // sv.addListener('error', err => {
  //   console.error(err);
  // });
}
