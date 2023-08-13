import { constant } from '@/common/utils';
import { history } from 'umi';

const token = sessionStorage.getItem(constant.KEY_USER_TOKEN);

if (token) {
  history.push(history.location.pathname);
} else {
  history.push(constant.SYSTEM_ROUTE_LOGIN);
}

// =================================================
// 这段代码将会在新打开的选项卡中复制sessionStorage内容
// 以便在同一浏览器中的多个选项卡中共享session
// ==================================================
const sessionStorage_transfer = function (event) {
  if (!event) {
    event = window.event;
  } // ie suq
  if (!event.newValue) return; // do nothing if no value to work with
  if (event.key === 'getSessionStorage') {
    // another tab asked for the sessionStorage -> send it
    localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
    // the other tab should now have it, so we're done with it.
    localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
  } else if (event.key === 'sessionStorage' && !sessionStorage.length) {
    // another tab sent data <- get it
    const data = JSON.parse(event.newValue);
    for (const key in data) {
      sessionStorage.setItem(key, data[key]);
    }
  }
};

// listen for changes to localStorage
if (window.addEventListener) {
  window.addEventListener('storage', sessionStorage_transfer, false);
} else if (window.attachEvent) {
  window.attachEvent('onstorage', sessionStorage_transfer);
} else {
  window.onstorage = sessionStorage_transfer;
}

// Ask other tabs for session storage (this is ONLY to trigger event)
if (!sessionStorage.length) {
  localStorage.setItem('getSessionStorage', 'foobar');
  localStorage.removeItem('getSessionStorage', 'foobar');
}


// 搜索栏布局
const closeStyle = {
  width: '100%',
  backgroundColor: '#FFFFFF',
  paddingTop: '10px',
  marginBottom: '10px',
  height: '44px',
  overflow: 'hidden',
};
const openStyle = {
  width: '100%',
  backgroundColor: '#FFFFFF',
  paddingTop: '10px',
  marginBottom: '10px',
};
