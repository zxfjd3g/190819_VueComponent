function Observer(data) {
  // 保存data
  this.data = data;
  // 开始对data实现劫持
  this.walk(data);
}

Observer.prototype = {
  walk: function (data) {
    var me = this;
    // 遍历data中所有属性
    Object.keys(data).forEach(function (key) {
      // 给data重新定义响应式属性(带setter的)
      me.defineReactive(data, key, data[key]);
    });
  },

  defineReactive: function (data, key, val) {
    // 创建一个对应的dep对象
    var dep = new Dep();
    // 通过递归调用实现所有层次属性的劫持
    var childObj = observe(val);
    // 给data重新定义  ==> 加setter/getter
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      get: function () {  // 用于建立dep与watcher的关系
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      set: function (newVal) {// 监视data的数据变化
        if (newVal === val) {
          return;
        }
        val = newVal;
        // 新的值是object的话，进行监视
        childObj = observe(newVal);
        // 通知dep来通知所有相关的订阅者watcher
        dep.notify();
      }
    });
  }
};

function observe(value, vm) {

  if (!value || typeof value !== 'object') {
    return;
  }
  // 创建Observer的实例
  return new Observer(value);
};


var uid = 0;

function Dep() {
  this.id = uid++;
  this.subs = []; // subs: subscribers 所有对应泊订阅者(watcher)数据
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },

  depend: function () {
    Dep.target.addDep(this);
  },

  removeSub: function (sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  },

  notify: function () {
    // 遍历每个相关的订阅者watcher
    this.subs.forEach(function (sub) {
      // 让watcher去更新对应的节点
      sub.update();
    });
  }
};

Dep.target = null;