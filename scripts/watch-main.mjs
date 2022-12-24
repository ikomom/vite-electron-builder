import {build} from 'vite';
import path from 'path';
import {spawn} from 'child_process';
// import electronPath from 'electron';

const mode = (process.env.MODE = process.env.MODE || 'development');
// const server = await createServer({
//   mode,
//   configFile: path.resolve('../packages/renderer/vite.config.js'),
//   server: {
//     port: 8888
//   }
// }).then(s => s.listen())
console.log('开始', 'spawn');
const sv = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['-v'], {
  stdio: 'inherit',
});

// sv.addListener('data', d => console.log(d.toString()));

sv.addListener('error', err => {
  console.error(err);
});
console.log('hhh', 'xxx');
// setPreload()
/**
 * 建立文件观察器
 * @param {import('vite').ViteDevServer} watchServer
 */
function setPreload() {
  return  build({
    mode,
    configFile: path.resolve('../packages/renderer/vite.config.js'),
  });

}
