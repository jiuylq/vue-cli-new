# Javascript 常用方法总结

> 以下是本人总结出来的`javascript`常用的方法

## DOM

### 1.1 `getElementByClassName`兼容性处理

``` javascript
/**
 * @desc getElementByClassName 兼容处理
 * @param {String} classname
 * @param {HTMLElement} el
 * @param {String} tag
 * @return {string}
**/

// 常规写法 （可以优化，因为每次调用时都会进行浏览器兼容判断，可用惰性函数进行优化）
function getClassName (classname, el, tag) {
	var classArr = [];
	el = el || document;
	tag = tag || '*';
	if (el.getElementsByClassName) {
		var eles = el.getElementsByClassName(classname);
		if (tag != '*') {
			for (var i = 0, L = eles.length; i < L; i++) {
				if (eles[i].tagName.toLowerCase() == tag.toLowerCase()) {
					classArr.push(eles[i]);
				}
			}
		} else {
			classArr = eles;
		}
	} else {
		eles = el.getElementsByTagName(tag);
		var pattern = new RegExp("(^|\\s)" + classname + "(\\s|$)");
		for (i = 0, L = eles.length; i < L; i++) {
			if (pattern.test(eles[i].className)) {
				classArr.push(eles[i]);
			}
		}
	}
	return classArr;
}

// 使用惰性函数优化 （只判断一次）
var getClassName = function () {
    if (document.getElementsByClassName) {
        return function (classname, el, tag) {
            var classArr = [];
                el = el || document;
                tag = tag || '*';
            var eles = el.getElementsByClassName(classname);
            if (tag != '*') {
                for (var i = 0, L = eles.length; i < L; i++) {
                    if (eles[i].tagName.toLowerCase() == tag.toLowerCase()) {
                        classArr.push(eles[i]);
                    }
                }
            } else {
                classArr = eles;
            }
            return classArr;
        }
	} else {
        return function (classname, el, tag) {
            var classArr = [];
                el = el || document;
                tag = tag || '*';
            eles = el.getElementsByTagName(tag);
            var pattern = new RegExp("(^|\\s)" + classname + "(\\s|$)");
            for (i = 0, L = eles.length; i < L; i++) {
                if (pattern.test(eles[i].className)) {
                    classArr.push(eles[i]);
                }
            }
            return classArr;
        }
	}
}()
```

### 1.2 `className`操作总结

```js
//ie10
  // element.classList.add(className)  //新增
  // element.classList.remove(className)  //删除
  // element.classList.contains(className)  //是否包含
  // element.classList.toggle(className)  //toggle class
```



#### 1.2.1`hasClass` 判断元素是否存在某个className  

``` javascript
/**
 * @desc 判断元素是否有某个className
 * @param {HTMLElement} el
 * @param {String} cls
 * @return {Boolean}
**/

function hasClass(el, cls) {
    if (el.classList) {
        return el.classList.contains(cls)
    } else {
        return (new RegExp('(\\s|^)' + cls + '(\\s|$)')).test(el.className);
        // or 同上只不过空格符由\s换成了' ',写法上的不同
        // return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
        // or 
        // return new RegExp(cls, 'gi').test(el.cls)
        // or
        // return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
    }
}
```

```js
    
* //`addClass` 添加className
    
    /**
    * @desc   为元素添加className
    * @param  {HTMLElement} el
    * @param  {String} cls
    **/
    //依赖hasClass
    function addClass(el, cls) {
        if (el.classList) {
            el.classList.add(cls);
        } else if (!hasClass(el, cls)) {
            el.className += ' ' + cls;
        }
    }
  
  //
  function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}
```

#### 1.2.2 `removeClass` 移除className  

``` javascript
/**
* @desc 移除className
* @param {HTMLElement} el
* @param {String} cls
**/
function removeClass(el, cls) {
    if (el.classList) {
        el.classList.remove(cls)
    } else {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
        el.className = el.className.replace(reg, '')
        // or \b单词边界 \s空白符
        // var reg = new RegExp('(\\b|^)' + cls.split(' ').join('|') + '(\\b|$)', 'gi')
        // el.className = el.className.replace(reg, '')
    }
}
```

````
    
* `toggleClass`  
    ``` javascript
    /**
    * @desc toggleClass
    * @param {HTMLElement} el
    * @param {String} cls
    **/
    function toggleClass(el, cls) {
        if (el.classList) {
            el.classList.toggle(cls)
        } else {
            if (hasClass(el, cls)) {
                removeClass(el, cls)
            } else {
                addClass(el, cls)
            }
        }
    }
```

### 1.3 `cookie` 常用操作 

#### 1.3.1`setCookie`  

``` javascript
/**
* @desc setCookie
* @param {String} name
* @param {String} value
* @param {String} path
**/
function setCookie(name, value, opts) {
    // opts: {,
    //     'domain': '',
    //     'path': '',
    //     'expires': '',
    //     'maxAage': '',
    //     'secure': ''
    // }
    // 对name和value进行编码
    value = encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
    name = encodeURIComponent(String(name)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
    var options =''
    if (opts) {
        if (opts.expires && typeof opts.expires === 'number') {
            opts.expires = new Date(new Date() * 1 + opts.expires * 864e+5).toUTCString();
        }
        for (var i in opts) {
            if (!opts[i]) continue
            options += ';' + i
            options += '=' + opts[i]
        }
    }
    document.cookie = name + '=' + value + options;
}
```

#### 1.3.2 `getCookie`  

``` javascript
/**
* @desc getCookie
* @param {string} name
**/
function getCookie(name) {
    var cookies = document.cookie.split('; ');
    var keyVal = {};
    function decode (s) {
        return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
    }
    for (var i = 0; i< cookies.length; i++) {
        var part = cookies[i].split('=');
        if (decode(part[0]) === name) {
            keyVal[name] = decode(part[1])
            break;
        }
    }
    return name ? keyVal[name] : '';
}
```

#### 1.3.3 `removeCookie`  

``` javascript
/**
* @desc getCookie
* @param {string} name
**/
function removeCookie(name) {
    setCookie(name, 1, {'expires': -1});
}
```

### 1.4 判断类型(type)

``` javascript
// 1、typeof 可用来判断undefined, string, number, boolean, symbol,function等类型
// 2、typeof null 为object类型
// 3、完美解决方案 Object.prototype.toString
/**
 * @param {object} obj
 * @param {string} type
 * @returns {string}
 */
function type(obj, type) {
    var classType = {};
    var result = null;
    var typeArr = ['Function', 'Array', 'Date', 'RegExp', 'Null', 'Object', 'Error'];
    typeArr.map(function(item) {
        classType['[object '+ item +']'] = item.toLowerCase();
    })
    result = typeof obj === 'function' || typeof obj === 'object' ? classType[Object.prototype.toString.call(obj)] : typeof obj;
    return result === type;
}
```

### 1.5 实现一个发布订阅EventEmitter功能

```js
function EventEmitter (){
  this.list = {}
}
EventEmitter.prototype = {
  on: function(key,fn) {
    if(!this.list[key]){
      this.list[key] = []
    }
    this.list[key].push(fn)
  },
  emit: function(key,obj) {
    if(this.list[key]) {
      for(var i = 0; i < this.list[key].length; i++){
        this.list[key][i](obj)
      }
    }
  },
  remove: function(key) {
    delete this.list[key]
  }
}
```

## Ajax

### 1.1实现一个JSONP功能

```js
/**
 * @desc  
 * @param {string} url
 * @param {object} params
 * @param {function} callback
 * @returns {Promise}
 */
function jsonp({url, params, callback}) {
   return new Promise((resolve, reject) => {
     let script = document.createElement('script');
     window[callback] = function(data) {
       resolve(data);
       document.body.removeChild(script);
     }
     // 参数格式化
     params = {...params, callback};
     let arrs = [];
     for(let key in params) {
       arrs.push(`${key}=${params[key]}`)
     }
     script.src = `${url}?${arrs.join('&')}`; // 拼接url+wd=b&callback=show
     document.body.appendChild(script);
   })
 }
```



## BOM

### 1.1 获取地址栏参数

```js
  /**
   * @param {string} url
   * @returns {object}
   * 0.07568359375ms
  **/
  function getQueryObject(url) {
    url = url == null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
      const name = decodeURIComponent($1)
      let val = decodeURIComponent($2)
      val = String(val)
      obj[name] = val
      return rs
    })
    return obj
  }
  /**
   * @param {string} url
   * @returns {Object}
   * 0.1640625ms
  **/
 function getRequest(url) {
    console.time()
    var request = {};
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        request[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
      }
    }
    console.timeEnd()
    return request;
  }
  /**
   * @param {string} url
   * @returns {Object}
   * 0.06396484375ms
   */
  function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse(
      '{"' +
      decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
      '"}'
    )
  }
  /**
   * @param {string} url
   * @returns {Object}
   * 0.074951171875ms
   */
  function parseQueryString(url) {
    url = url == null ? window.location.href : url
    var search = url.substring(url.lastIndexOf('?') + 1)
    if (!search) {
      return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  }
```

### 1.2 切割字符串组成新数（类似1.1）

```js
/**
* @desc getNotice('xx=11&ss=22&gg=33', '&', '=')
* @param {String} notice 
* @param {String} key
* @param {String} spl
**/
function getNotice(notice, key, spl) {
    var ntarr = notice.split(key);
    var request = {};
    for (var i = 0; i < ntarr.length; i++) {
        let res = ntarr[i].split(spl)
        request[res[0]] = res[1]
    }
    return request;
}
```

### 1.3 判断当前浏览器环境

```
var ua = navigator.userAgent.toLowerCase();
var isWeixin = ua.indexOf('micromessenger') != -1;
var isAndroid = ua.indexOf('android') != -1;
var isIos = (ua.indexOf('iphone') != -1) || (ua.indexOf('ipad') != -1);
if (!isWeixin) {
}
```



## Array类

### 1.1 将类数组转为数组  

``` javascript
// 常规
Array.prototype.slice.call(arguments)
//等同于 [].slice.call(arguments)

// ES2015
Array.form(arguments)
var arr = [...arguments]
```

### 1.2 数组扁平化

``` javascript
// 方法一 递归
var arr = [1,2,3,[8,4,6,7,[5,8,3,[1,2,5]]],3,[6,8],'9']
/**
* @desc 
* @param {array} arr 
* @return {array}
**/
function flatten(arr) {
    var result = [];
    for(var i = 0; i < arr.length; i++) {
        if(Array.isArray(arr[i])) { // Array.isArray IE不支持
            result = result.concat(flatten(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
     return result;
}

// 不使用递归，使用 stack 无限反嵌套多层嵌套数组
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
/**
* @desc 
* @param {array} arr 
* @return {array}
**/
function flatten(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    // 使用 pop 从 stack 中取出并移除值
    const next = stack.pop();
    if (Array.isArray(next)) {
      // 使用 push 送回内层数组中的元素，不会改动原始输入 original input
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // 使用 reverse 恢复原数组的顺序
  return res.reverse();
}

// toString 适用于数组为纯数字

var arr = [1, [2, [3, 4]]];
/**
* @desc 
* @param {array} arr 
* @return {array}
**/
function flatten(arr) {
    return arr.toString().split(',').map(function(item){
        return +item
    })
    // or arr.toString().split(',').map(Number)
}

// join 适用于数组为纯数字
/**
* @desc 
* @param {array} arr 
* @return {array}
**/
function flatten(arr) {
    return arr.join(',').split(',').map(Number)
}

// reduce 实现
/**
* @desc 
* @param {array} arr 
* @return {array}
**/
function flatten(arr) {
    return arr.reduce(function(prev, next) {
        return prev.concat(Array.isArray(next) ? flatten(arr) : next);
    }, [])
}

// ... 扩展运算符
/**
* @desc 
* @param {array} arr 
* @return {array}
**/
function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
        // or arr = [].concat.apply([], arr);
    }
    return arr;
}

// es6自带的flat 不兼容IE
// 使用 Infinity 作为深度，展开任意深度的嵌套数组
arr.flat(2);
arr.flat(Infinity);
// 手动实现一个兼容IE9的flat
Array.prototype.flat= function() {
    return [].concat(...this.map(item => (Array.isArray(item) ? item.flat() : [item])));
}


// 简单实现一个降维函数
/**
* @desc 
* @param {array} arr
* @param {number} depth
* @return {array}
**/
const flat = function(arr, depth) {
  let flatedAry = ary
  depth = depth || 1
  while(depth > 0) {
     flatedAry = [].concat.apply([], flatedAry)
     depth--
  }
  return flatedAry
}

```

### 1.3 数组去重

```js
// 数组去重unique
const arr = [];
// 生成[0, 100000]之间的随机数
for (let i = 0; i < 100000; i++) {
  arr.push(0 + Math.floor((100000 - 0 + 1) * Math.random()))
}
console.time('test');
arr.unique();
console.timeEnd('test');

// 1.双循环
/**
* @desc 
* @param {array} arr
* @return {array}
**/
function unique(arr) {
  var result = []
  for(var i = 0; i < arr.length; i++) {
    var isRepeat = false
    for(var j = 0; j < arr.length; j++) {
      if(arr[i] === result[j]){
        isRepeat = true
        break;
      }
    }
    !isRepeat && result.push(arr[i])
  }
  return result
}
//test: 105777.423828125ms

// 同1，不同写法
/**
* @desc 
* @param {array} arr
* @return {array}
**/
function unique(arr) {
  var result = []
  for(var i = 0; i < arr.length; i++) {
    for(var j = i+1; j < arr.length; j++) {
      if(arr[i] === arr[j]){
        j = ++i;
      }
    }
    result.push(arr[i])
  }
  return result
}
//test: 10074.97509765625ms

// indexOf
/**
* @desc 
* @param {array} arr
* @return {array}
**/
function unique(arr) {
  var result = []
  for(var i = 0; i < arr.length; i++) {
    if(result.indexOf(arr[i]) === -1) {
      result.push(arr[i])
    }
  }
  return result;
}

// filter + indexOf
/**
* @desc 
* @param {array} arr
* @return {array}
**/
function unique(arr) {
  return arr.filter(function(item, index) {
    return arr.indexOf(item) === index
  })
}
//test: 8018.947998046875ms

// includes
/**
* @desc 
* @param {array} arr
* @return {array}
**/
function unique(arr) {
  var result = [];
  for(var i = 0; i < arr.length; i++) {
    if(!result.includes(arr[i])) {
      result.push(arr[i])
    }
  }
  return result
}
//test: 8119.7578125ms

//sort
/**
* @desc 
* @param {array} arr
* @return {array}
**/
function unique(arr) {
  var array = arr.sort(function(a, b){
    return a-b;
  })
  for(var i = 0; i<array.length; i++) {
    if(array[i] === array[i+1]) {
      array.splice(i+1, 1);
      i--;
    }
  }
  return array;
}

// reduce
/**
* @desc 
* @param {array} arr
* @return {array}
**/
function unique(arr) {
  return arr.sort().reduce((init, current) => {
    if(init.length === 0 || init[init.length - 1] !== current){
      init.push(current);
    }
    return init;
  }, []);
}
//test: 483.41796875ms

// Map
/**
* @desc 
* @param {array} arr
* @return {array}
**/
function unique(arr) {
  var result = [];
  var temp = new Map()
  for(var i = 0; i < arr.length; i++) {
    if(!temp.get(arr[i])) {
      temp.set(arr[i], 1);
      result.push(arr[i])
    }
  }
  return result;
}
// test: 66.85400390625ms

// new Set() / Array.from()
[...new Set(arr)]
//test: 39.782958984375ms

//对象键值对
/**
* @desc 
* @param {array} arr
* @return {array}
**/
function unique(arr) {
  const newArray = [];
  const tmp = {};
  for (let i = 0; i < this.length; i++) {
    // 使用JSON.stringify()进行序列化
    if (!tmp[typeof arr[i] + JSON.stringify(arr[i])]) {
      // 将对象序列化之后作为key来使用
      tmp[typeof arr[i] + JSON.stringify(arr[i])] = 1;
      newArray.push(arr[i]);
    }
  }
  return newArray;
}
//test: 0.154052734375ms
```

### 1.4 取出数组中的随机项

```js
var ran = array[Math.floor(Math.random * array.length)]
```

### 1.5 获取指定范围内的随机数

``` javascript
function getRandom(max, min) {
	min = arguments[1] || 0;
	return Math.floor(Math.random() * (max - min + 1) + min);
};


/**
 * 产生随机整数，包含下限值，包括上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @return {Number} 返回在下限到上限之间的一个随机整数
 */
function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower+1)) + lower;
}


/**
 * 产生随机整数，包含下限值，但不包括上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @return {Number} 返回在下限到上限之间的一个随机整数
 */
function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower)) + lower;
}
```

### 1.6 打乱数字数组的顺序

``` javascript
// sort 排序
// sort 存在的问题就是元素位置概率不均
function shuffle(arr) {
    return arr.concat().sort(function() {
        return Math.random() - 0.5;
    })
}

// Fisher–Yates shuffle排序算法
function shuffle(arr) {
    var rand, temp;
    for(var i=0; i<arr.length; i++) {
    	rand = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[rand];
        arr[rand] = temp;
    }
    return arr;
}

// 其它实现
function shuffle(arr) {
    var newArr = [], rand;
    arr = arr.concat();
    while(arr.length) {
        rand = Math.floor(Math.random() * arr.length);
        newArr.push(arr[rand]);
        arr.splice(rand, 1);
    }
    return newArr;
}


// 测试

var count = new Array(7).fill(0);

for(var i=0; i<10000; i++) {
    var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    arr = shuffle(arr);
    count[arr.indexOf('b')]++;
}
console.log(count); 
```

### 1.7 获取数组中的最大值和最小值

``` javascript
// Function.prototype.apply() 可以让提供的 this 与数组参数来调用函数
var max = Math.max.apply(Math, array);
var min = Math.min.apply(Math, array);

/// es6 展开运算符
Math.max(...numbers)
Math.min(...numbers)
```

### 1.8 随机码

``` javascript
/**
 * 不定长度的随机码
 * @param {Number} count 2-36 表示输出的进制
 * @return {String} return
 */
function randomWord(count) {
    count = count || 36;
    return Math.random().toString(count).substring(2)
}
function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}
/**
 * 可限定最大长度的随机码
 * @param {Number} count 2-36 表示输出的进制
 * @return {String} return
 */

// MDN官网推荐用substring替换substr
function randomWord(count,len) {
    count = count || 36;
    len = len || 15
     return Math.random().toString(count).substr(2, len);
}
```

### 1.9  实现数组倒序(非 reverse)

``` javascript
// 方案一 sort实现
function reverse(arr) {
    return arr.concat().sort(function() {
        return 1;
    })
}

// 方案二 unshift实现
function reverse(arr) {
    var newArr = [];
    for(var i = 0; i < arr.length; i++) {
        newArr.unshift(arr[i]);
    }
    return newArr;
}

// 方案三 取数组居中位置，两边位置互换
function reverse(arr) {
    var len = arr.length;
    var last = len -1;
    var temp;
    for(var i = 0; i < Math.floor(len/2); i++) {
        temp = arr[i];
        arr[i] = arr[last - i];
        arr[last - i] = temp;
    }
    return arr;
}
```

### 1.10 深拷贝

```js
/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
```

### 1.11 数组排序

```js
// sort
// 最常用
function Sort(arr) {
  return arr.sort(function(a, b) {
    return a-b;
  })
}

// 冒泡排序
//
function bubbleSort(arr) {
  for(var i = 0; i < arr.length; i++) {
    for(var j = 0; j < arr.length -1 -i; j++) {
      if(arr[j]>arr[j+1]){
        var tmp = arr[j+1];
        arr[j+1] = arr[j]
        arr[j] = tmp
      }
    }
  }
  return arr;
}

// 选择排序selectionSort
//找出最小的值与其它的对比,大于则交换位置,否则继续比较
function selectionSort(arr) {
  var len = arr.length;
  var minindex, tmp;
  for(var i = 0; i < len; i++){
    minindex = i;
    for(var j = i + 1; j < len; j++){
      if(arr[j] < arr[minindex]) {
        minindex = j
      }
    }
    tmp = arr[i];
    arr[i] = arr[minindex];
    arr[minindex] = tmp;
  }
  return arr;
}

// 插入排序
function insertionSort(arr) {
  var len = arr.length;
  var preIndex, current;
  for (var i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while(preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex+1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex+1] = current;
  }
  return arr;
}

//快速排序
function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left = typeof left != 'number' ? 0 : left,
        right = typeof right != 'number' ? len - 1 : right;

    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex-1);
        quickSort(arr, partitionIndex+1, right);
    }
    return arr;
}

function partition(arr, left ,right) {     //分区操作
    var pivot = left,                      //设定基准值（pivot）
        index = pivot + 1;
    for (var i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) {
            swap(arr, i, index);
            index++;
        }       
    }
    swap(arr, pivot, index - 1);
    return index-1;
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

```

### 1.12 数组对象去重

```js

```



## Object类

### 1.1 

## String类

### 1.1 计算一个字符串占用的字节数

// 编码格式为gb2312时，中文所占的字符为2个

// 一般数据库不会将保存数据的格式设为gb2312

``` javascrpt
/**
 * @param  {String} str
 * @param  {String} charset gb2312
 * @return {Number}
**/
function GetBytes(str){
  var len = str.length;
  var bytes = len;
  for(var i=0; i<len; i++){
    if (str.charCodeAt(i) > 255) bytes++;
  }
  return bytes;
}
```

// 正规

> UTF-8是一种变长的编码方法，字符长度从1个字节到4个字节不等。越是常用的字符，字节越短，最前面的128个字符，只使用1个字节表示，与ASCII码完全相同。

UTF-8编码规范

|       编号范围       |     字节    |
| :-----------------: |:-----------:|
|   0x0000 - 0x007F   |       1     |
|   0x0080 - 0x07FF   |       2     |
|   0x0800 - 0xFFFF   |       3     |
| 0x010000 - 0x10FFFF |       4     |

UTF-16编码规范

|       编号范围       |     字节    |
| :-----------------: |:-----------:|
|   0x0000 - 0xFFFF   |       2     |
| 0x010000 - 0x10FFFF |       4     |


``` javascript
/**
 * @param  {String} str
 * @param  {String} charset utf-8, utf-16
 * @return {Number}
**/
var sizeof = function(str, charset){
    var total = 0,
        charCode,
        i,
        len;
    charset = charset ? charset.toLowerCase() : '';
    if(charset === 'utf-16' || charset === 'utf16'){
        for(i = 0, len = str.length; i < len; i++){
            charCode = str.charCodeAt(i);
            if(charCode <= 0xffff){
                total += 2;
            }else{
                total += 4;
            }
        }
    }else{
        for(i = 0, len = str.length; i < len; i++){
            charCode = str.charCodeAt(i);
            if(charCode <= 0x007f) {
                total += 1;
            }else if(charCode <= 0x07ff){
                total += 2;
            }else if(charCode <= 0xffff){
                total += 3;
            }else{
                total += 4;
            }
        }
    }
    return total;
}

/**
 * //只能计算2字节及以下
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

//只能计算2字节及以下
str.replace(/[^\x00-\xff]/gi, "--").length;
```

### 1.2 js字符串与Unicode编码互相转换

``` javascript
/**
 * @desc js字符串与Unicode编码互相转换
 * @param {String} str
**/
function encodeUnicode(str) {  
    var res = [];  
    for ( var i=0; i<str.length; i++ ) {
        res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);  
    }  
    return "\\u" + res.join("\\u");  
}  
  
// 解码  
function decodeUnicode(str) {
    // 转%有问题
    // str = str.replace(/\\/g, "%");
    return decodeURIComponent(str);
}  
```

### 1.3 查找字符串出现的次数

``` javascript
//1、查找字符串出现的次数
// split
function findStrCount(str, text) {
    return str.split(text).length -1
}
//let strTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
//findStrCount(strTest,'blog')
//result：6

//2、查找字符串出现的次数
// for
function findStrCount(obj, text) {
    var num = 0;
    for (var i = 0, len = obj.length; i < len; i++) {
        if (text === obj[i]) {
            num++;
        }
    }
    return num;
}

//3、正则match
function findStrCount(obj, text) {
    var num = 0;
    // 如果是. , * , ? 等特殊字符需转义
    var re = new RegExp(text, "g");
    //var re = =eval("/"+re+"/g");
    return obj.match(re).length;
}

// 查找某个字符串在数组（字符串）中出现的位置
//1、indexOf(val, index) val代表查找的字符串，index(可选)代表从哪个位置开始查找
function findStrIndex(str, text) {
    var arr = [];
    var n = 0;
    while(str.indexOf(text, n) != -1) {
        var m = str.indexOf(text, n)
        n = m + 1;
        arr.push(m)
    }
}
//2、for 简单不写了

// 查找字符串各个字符出现的次数
function findStrMax(str) {
    // 定义一个obj用来保存每个字符出现的次数
    var obj = {}
    for(var i = 0; i < str.length; i++) {
        var k = str.charAt(i);
        if(obj[k]) {
            obj[k]++;
        } else {
            obj[k] = 1;
        }
    }
    // max
    var max = 0;
    var oArr = []
    for(var j in obj) {
        oArr.push({ key: j, count: obj[j]})
        if(max < obj[j]) {
            max = obj[j]
        }
    }
    // 降序
    oArr.sort(function(a, b) {
        return b.count - a.count
        // return a.key.charCodeAt(0) - b.key.charCodeAt(0)
    })
    console.log(obj)
    console.log(oArr)
}

```



## Date 时间类

### 1.1 间格式化

``` javascript
// 方案一

function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || 'y-m-d h:i:s'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/([ymdhisa])+/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    // padStart字符串补全，这里为补两个0
    return value.toString().padStart(2, '0')
  })
  return time_str
}

// 方案二

function parseTime(fmt, date) {
  var o = {
    "M+": date.getMonth() + 1, //月份   
    "d+": date.getDate(), //日   
    "h+": date.getHours(), //小时   
    "m+": date.getMinutes(), //分   
    "s+": date.getSeconds(), //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr((
        "" + o[k]).length)));
  return fmt;
}

// 3
define("qdm/js/common/utils/date.65910.js", [], function(require, exports, module) {
    var ONE_SECOND = 1e3;
    var ONE_MINUTE = 60 * ONE_SECOND;
    var ONE_HOUR = 60 * ONE_MINUTE;
    var ONE_DAY = 24 * ONE_HOUR;
    var ONE_MONTH = 30 * ONE_DAY;
    var ONE_YEAR = 365 * ONE_DAY;
    function formatDate(date, format) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        format = format || "YYYY-MM-DD HH:mm:ss";
        var o = {
            "M+": date.getMonth() + 1,
            "D+": date.getDate(),
            "H+": date.getHours(),
            "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            S: date.getMilliseconds()
        };
        if (/(Y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(dd+)/.test(format)) {
            format = format.replace(RegExp.$1, "日一二三四五六七".split("")[date.getDay()]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
    module.exports = {
        format: formatDate,
        toNow: function(date) {
            var time = new Date(date).getTime();
            if (isNaN(time)) {
                return date;
            }
            var duration = new Date().getTime() - time;
            if (duration > ONE_YEAR) {
                return "1年前";
            }
            if (duration > ONE_MONTH) {
                return Math.floor(duration / ONE_MONTH) + "个月前";
            }
            if (duration > ONE_DAY) {
                return Math.floor(duration / ONE_DAY) + "天前";
            }
            if (duration > ONE_HOUR) {
                return Math.floor(duration / ONE_HOUR) + "小时前";
            }
            if (duration > ONE_MINUTE) {
                return Math.floor(duration / ONE_MINUTE) + "分钟前";
            }
            if (duration > 0) {
                return "刚刚";
            }
            return formatDate(date);
        }
    };
});

// 3
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

```

### 1.2 格式化时间(xx分钟前)

```js
/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}
```

### 1.3 计算平年还是闰年

```js
// 闰年2月29天,平年2月28天,注意普通闰年(能被4整除且不能被100整除的为闰年)和世纪闰年(能被400整除的是闰年)

// function isRunYear(year) {
//   return year%4== 0? (year%100 == 0? (year%400==0? true:false) :true) : false;
// }
function isRunYear(fullYear){
  return (fullYear % 4 == 0 && (fullYear % 100 != 0 || fullYear % 400 == 0));
}
```

### 1.4 获取某年某月某天的天数

```
const getDaysInMonth = (year, month) => {
    let date = new Date(year, month, 1);
    // 24*60*60*1000 => 864e5
    return new Date(date.getTime() - 864e5).getDate();
 }
 // 老土办法
function fanDayByYearMonth(year,month) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
      break;
    case 2:
      return isRunYear(year) ? 29 : 28;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
      break;
  }
}
```



## 正则（regExp）

### 1.1 

## other

### 1.1 

```js
document.domain = 'xxx.com';
(function() {
    //设置cookie
    function setCookie(name, value, domain, path, expires) {
        if (expires) {
            expires = new Date(+new Date() + expires);
        }
        var tempcookie = name + '=' + escape(value) + ((expires) ? '; expires=' + expires.toGMTString() : '') + ((path) ? '; path=' + path : '') + ((domain) ? '; domain=' + domain : '');

        //Ensure the cookie's size is under the limitation
        if (tempcookie.length < 4096) {
            document.cookie = tempcookie;
        }
    }

    //获取cookie
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg))

            return (arr[2]);
        else
            return null;
    }

    //创建并发送请求
    function createSender(url) {
        var img = new Image();
        img.onload = img.onerror = function() {
            img = null;
        }
        ;
        img.src = url;
    }

    /*
             *防劫持逻辑所需参数在此处设置参数即可
             *cookieName:用于记录连续被劫持的次数，为防止死循环，cookie值为3以上则不进行url重置
             *cookieDomain:cookie所在的域
             *reportUrl:非连续性劫持时上报的接口地址【如无需上报，可不填】
             *reportUrl2：连续性劫持时上报的接口地址【如无需上报，可不填】
             */
    var cookieName = 'hiijack';
    var cookieDomain = '.qidian.com';
    var reportUrl = '//book.qidian.com/ajax/safe/hiijackReport?times=1&_csrfToken=' + getCookie('_csrfToken') || '';
    var reportUrl2 = '//book.qidian.com/ajax/safe/hiijackReport?times=3&_csrfToken=' + getCookie('_csrfToken') || '';

    //判断是否被iframe
    if (top.location !== self.location) {
        //用于记录被劫持的次数
        var countHijack;

        //如果未设置cookie，则需要set一下cookie，否则获取此cookie的值
        if (!getCookie(cookieName)) {
            setCookie(cookieName, 0, cookieDomain, '', 30 * 24 * 60 * 60 * 1000);
            countHijack = 0;
        } else {
            countHijack = parseInt(getCookie(cookieName));
        }

        //如果连续被劫持的次数大于等于3次，则发请求上报此情况,否则上报非连续性的情况,同时累加被劫持次数、重置当前url
        if (countHijack >= 3) {
            reportUrl2 && reportUrl2 != '' && createSender(reportUrl2);
        } else {
            reportUrl && reportUrl != '' && createSender(reportUrl);
            countHijack++;
            setCookie(cookieName, countHijack, cookieDomain, '', 30 * 24 * 60 * 60 * 1000);
            top.location = self.location;
        }
    }
    //每次成功进入页面则计数清0
    setCookie(cookieName, 0, cookieDomain, '', 30 * 24 * 60 * 60 * 1000);
}
)();

// add by zhangxinxu 让iOS9- Safari :active伪类生效
// document.body.addEventListener('ontouchstart', function() {});
// Safari使用-webkit-tap-highlight-color高亮，因为:active时机有问题
if (/iphone/i.test(navigator.userAgent)) {
    document.body.style.webkitTapHighlightColor = 'rgba(0,0,0,.05)';
    document.body.classList.add('iphone');
}
a[href]:active,
button:active {
  background-image: -webkit-linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05));
  background-image: linear-gradient(to top,rgba(0,0,0,.05),rgba(0,0,0,.05))
}
body.iphone a[href]:active,
body.iphone button:active {
  background-image: none
}
```



16、全屏/取消全屏

```
/**
 * 全屏
 */
function toFullScreen() {
  let elem = document.body;
  elem.webkitRequestFullScreen ?
    elem.webkitRequestFullScreen() :
    elem.mozRequestFullScreen ?
    elem.mozRequestFullScreen() :
    elem.msRequestFullscreen ?
    elem.msRequestFullscreen() :
    elem.requestFullScreen ?
    elem.requestFullScreen() :
    alert("浏览器不支持全屏");
}

/**
 * 退出全屏
 */
function exitFullscreen() {
  let elem = parent.document;
  elem.webkitCancelFullScreen ?
    elem.webkitCancelFullScreen() :
    elem.mozCancelFullScreen ?
    elem.mozCancelFullScreen() :
    elem.cancelFullScreen ?
    elem.cancelFullScreen() :
    elem.msExitFullscreen ?
    elem.msExitFullscreen() :
    elem.exitFullscreen ?
    elem.exitFullscreen() :
    alert("切换失败,可尝试Esc退出");
}
```

17.