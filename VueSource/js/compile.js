function Compile(el, vm) {
  // 保存vm
  this.$vm = vm;
  // 保存el元素
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  // 如果el元素存在
  if (this.$el) {
    // 1. 将el中所有子节点转移到fragment对象中
    this.$fragment = this.node2Fragment(this.$el);
    // 2. 编译fragment所有层次(递归)子节点
    this.init();
    // 3. 将编译好的fragment添加到el中
    this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype = {
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(),
      child;

    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }

    return fragment;
  },

  init: function () {
    // 编译fragment中的子节点
    this.compileElement(this.$fragment);
  },

  compileElement: function (el) {
    // 得到最外层所有子节点
    var childNodes = el.childNodes,
      me = this;
    // 遍历所有子节点
    [].slice.call(childNodes).forEach(function (node) {
      // 得到节点的文本内容
      var text = node.textContent;
      // 用于匹配插值的正则对象
      var reg = /\{\{(.*)\}\}/;
      // 如果是元素节点
      if (me.isElementNode(node)) {
        // 编译元素节点中指令属性
        me.compile(node);
      // 如果是插值格式的文本节点
      } else if (me.isTextNode(node) && reg.test(text)) {
        // 编译包含插值的文本节点
        me.compileText(node, RegExp.$1);  // name
      }

      if (node.childNodes && node.childNodes.length) {
        me.compileElement(node);
      }
    });
  },

  compile: function (node) {
    var nodeAttrs = node.attributes,
      me = this;

    [].slice.call(nodeAttrs).forEach(function (attr) {
      var attrName = attr.name;
      if (me.isDirective(attrName)) {
        var exp = attr.value;
        var dir = attrName.substring(2);
        // 事件指令
        if (me.isEventDirective(dir)) {
          compileUtil.eventHandler(node, me.$vm, exp, dir);
          // 普通指令
        } else {
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }

        node.removeAttribute(attrName);
      }
    });
  },

  compileText: function (node, exp) {
    // 编译工具对象编译文本节点
    compileUtil.text(node, this.$vm, exp);
  },

  isDirective: function (attr) {
    return attr.indexOf('v-') == 0;
  },

  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0;
  },

  isElementNode: function (node) {
    return node.nodeType == 1;
  },

  isTextNode: function (node) {
    return node.nodeType == 3;
  }
};

/* 
包含多个用于编译指令/插值的工具方法的对象
*/
var compileUtil = {
  /* 
  编译插值/v-text
  */
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, 'text');
  },

  /* 
  编译v-html
  */
  html: function (node, vm, exp) {
    this.bind(node, vm, exp, 'html');
  },

  /* 
  编译v-model
  */
  model: function (node, vm, exp) {
    this.bind(node, vm, exp, 'model');

    var me = this,
      val = this._getVMVal(vm, exp);
    node.addEventListener('input', function (e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }

      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },

  /* 
  编译v-class
  */
  class: function (node, vm, exp) {
    this.bind(node, vm, exp, 'class');
  },

  /* 
  真正编译模板语法的方法
  exp: 表达式  name
  dir: 指令  text/html/model/class
  */
  bind: function (node, vm, exp, dir) {

    // 根据指令名得到对应更新节点的函数
    var updaterFn = updater[dir + 'Updater'];

    // 执行更新函数第一次更新节点 ==> 初始化显示
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));

    new Watcher(vm, exp, function (value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue);
    });
  },

  // 事件处理
  eventHandler: function (node, vm, exp, dir) {
    var eventType = dir.split(':')[1],
      fn = vm.$options.methods && vm.$options.methods[exp];

    if (eventType && fn) {
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },

  _getVMVal: function (vm, exp) {
    var val = vm._data;
    exp = exp.split('.');
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  },

  _setVMVal: function (vm, exp, value) {
    var val = vm._data;
    exp = exp.split('.');
    exp.forEach(function (k, i) {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  }
};


/* 
包含n个用于dom更新节点的方法的对象
*/
var updater = {
  /* 更新节点的textContent */
  textUpdater: function (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  },
  
  /* 更新节点的innerHTML */
  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value == 'undefined' ? '' : value;
  },
  
  /* 更新节点的className */
  classUpdater: function (node, value, oldValue) {
    var className = node.className;
    className = className.replace(oldValue, '').replace(/\s$/, '');
    
    var space = className && String(value) ? ' ' : '';
    
    node.className = className + space + value;
  },
  
  /* 更新节点的value */
  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value;
  }
};