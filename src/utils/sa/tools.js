import { message } from 'ant-design-vue';
import Cookies from 'js-cookie';
import clipboard from 'clipboard';

/**
 * 点击查询用户编号
 */
export function copyDistinct() {
  const saCookieObjStr = Cookies.get('sensorsdata2015jssdkcross');
  if (saCookieObjStr) {
    const saCookieObj = JSON.parse(saCookieObjStr);
    const distinctId = saCookieObj.distinct_id;
    clipboard.copy(distinctId);
    message.success('复制成功');
  } else {
    message.error('复制失败，本浏览器不存在埋点用户编号');
  }
}

/**
 * 点击查询设备号
 */
export function copyAnonymousId() {
  const saCookieObjStr = Cookies.get('sensorsdata2015jssdkcross');
  if (saCookieObjStr) {
    const saCookieObj = JSON.parse(saCookieObjStr);
    const anonymousId = saCookieObj['$device_id'];
    clipboard.copy(anonymousId);
    message.success('复制成功');
  } else {
    message.error('复制失败，本浏览器不存在埋点缓存设备号');
  }
}
