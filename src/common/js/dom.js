//判断dom是否已存在类名
export function addClass(el, className) {
  if (hasClass(el, className)) return;
  let newClass = el.className.split(' ');
  newClass.push(className)
  el.className = newClass.join(' ').substring(1);
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s) + className + (\\s|$)');
  return reg.test(el.className);
}

export function getData(el, name, val) {
  const prefix = 'data-';
  return val ? el.setAttribute(prefix + name, val) : el.getAttribute(prefix + name);
}
