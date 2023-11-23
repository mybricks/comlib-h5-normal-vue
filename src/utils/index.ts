export function uuid(pre = 'u_', len = 6) {
  const seed = 'abcdefhijkmnprstwxyz0123456789',
    maxPos = seed.length;
  let rtn = '';
  for (let i = 0; i < len; i++) {
    rtn += seed.charAt(Math.floor(Math.random() * maxPos));
  }
  return pre + rtn;
}

export function deepCopy(obj: any, cache: any = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const hit: any = cache.filter((c: any) => c.original === obj)[0];
  if (hit) {
    return hit.copy;
  }
  const copy: any = Array.isArray(obj) ? [] : {};

  cache.push({
    original: obj,
    copy,
  });

  Object.keys(obj).forEach((key) => {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy;
}

export function getUrlFromBg(bgUrl) {
  let picUrl = '';
  if (bgUrl) {
    picUrl = bgUrl.replace(/url\((.*)\)$/g, '$1');
  }
  return picUrl;
}

export function throttle(fn, time = 300) {
  let timer;
  let firstTime = true;

  return function (...args) {
    const context = this;
    if (firstTime) {
      fn.apply(context, args);
      firstTime = false;
      return;
    }
    if (timer) {
      return false;
    }

    timer = setTimeout(function () {
      clearTimeout(timer);
      timer = null;
      fn.apply(context, args);
    }, time);
  };
}

// export function debounce(fn, wait = 300) {
//   let timer;
//   return function (...args) {
//     const context = this;
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn.apply(context, args);
//     }, wait);
//   };
// }

export function debounce(fn, delay, immediate = false) {
  let timer
  let result
  return function(...args) {
    if (timer) clearTimeout(timer)

    if (immediate) {
      // 如果timer存在，说明第二次调用的时候还没到delay时间，因为如果超过delay时间
      // timer会被赋值为null，所以这个时候我们不应该执行fn，应该重新设置一个定时器
      // 但如果是一次的时候，因为还没有设过定时器，所以这里timer会是undefined
      if (timer) {
        timer = setTimeout(() => timer = null, delay)
      } else {
        result = fn.apply(this, args)
        return result
      }
    } else {
      timer = setTimeout(() => fn.apply(this, args), delay)
    }
  }
}

/**
 * 获取url参数
 * @param key key
 * @returns   value/undefined
 */
export function getUrlParam(key: string): string | undefined {
  const searchAry: string[] = location.search.slice(1).split('&');

  for (let i = 0; i < searchAry.length; i++) {
    const kv = searchAry[i].split('=');
    if (kv[0] === key) {
      return kv[1];
    }
  }

  return;
}

const typeMap = {
  OBJECT: '[object Object]',
  ARRAY: '[object Array]',
  STRING: '[object String]',
  NUMBER: '[object Number]',
  FORMDATA: '[object FormData]',
  NULL: '[object Null]',
  UNDEFINED: '[object Undefined]',
  BOOLEAN: '[object Boolean]',
  FUNCTION: '[object Function]',
};

export function typeCheck(variable, type) {
  if (Array.isArray(type)) {
    let bool = false;
    for (let i = 0; i < type.length; i++) {
      if (typeCheck(variable, type[i])) {
        bool = true;
        break;
      }
    }
    return bool;
  } else {
    const checkType = /^\[.*\]$/.test(type)
      ? type
      : typeMap[type.toUpperCase()];
    return Object.prototype.toString.call(variable) === checkType;
  }
}

export function dateFormate(date: Date | number, fmt: string) {
  const d = new Date(date);
  const o = {
    'M+': d.getMonth() + 1, //月份
    'D+': d.getDate(), //日
    'h+': d.getHours(), //小时
    'm+': d.getMinutes(), //分
    's+': d.getSeconds(), //秒
    'q+': Math.floor((d.getMonth() + 3) / 3), //季度
    S: d.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (d.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}

export function wFormat(value: number) {
  if (typeof value === 'string') {
    value = +value;
  }
  if (value / 100000000 > 1) {
    const num = parseFloat((value / 100000000).toFixed(1));
    return num + '亿';
  } else if (value / 10000 > 1) {
    const num = parseFloat((value / 10000).toFixed(1));
    return num + '万';
  } else {
    return value;
  }
}

export function padZero(num: number | string, targetLength = 2): string {
  let str = num + '';
  while (str.length < targetLength) {
    str = '0' + str;
  }
  return str;
}


/**
 * 将二维数组转为 csv 并下载
 */
export function downloadExcel(fileName, fileData) {
  let result = fileData
    .map((row) => {
      return row.join(',');
    })
    .join('\r\n');

  result = 'data:application/csv,' + encodeURIComponent(result);

  let elem = document.createElement('A');
  elem.setAttribute('href', result);
  elem.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(elem);
  elem.click();
  elem.remove();
}

