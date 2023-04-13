import VConsole from 'vconsole';

if (Number(process.env.VUE_APP_BUILD_VCONSOLE) === 1) {
  // 或者使用配置参数来初始化，详情见文档
  // eslint-disable-next-line no-new
  new VConsole({ theme: 'dark' });
}
