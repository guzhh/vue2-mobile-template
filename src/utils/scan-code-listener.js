import mitt from 'mitt';

/**
 * 单独监听扫码事件。使用发布订阅模式去进行分发管理。
 */

const emitter = mitt();

const key = Symbol('CODE_CHANGE');

let latestCode = null;

/**
 * 发布监听到扫码
 * @param to
 */
export function setOrgEmitter(code) {
  emitter.emit(key, code);
  latestCode = code;
}

/**
 * 监听扫码
 * @param handler
 * @param immediate
 */
export function listenerCodeChange(handler, immediate = true) {
  emitter.on(key, handler);
  // 判断注册是是否立即加载一下方法
  if (immediate && latestCode) {
    handler(latestCode);
  }
}

/**
 * 删除默认扫码监听
 */
export function removeCodeListener() {
  emitter.off(key);
}
