function Watcher(vm, exp, cb) {
  this.cb = cb; // callback
  this.vm = vm;
  this.exp = exp;
  this.depIds = {}; // d0, d1  {0 : d0, 1: d1 }
  this.value = this.get(); // 得到表达式对应值
}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    // 得到表达式最新的值
    var value = this.get();
    var oldVal = this.value;
    if (value !== oldVal) {
      // 保存最新的值
      this.value = value;
      // 调用用于更新节点的回调函数
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep: function (dep) {
    // 如果当前watcher与dep的关系还没有建立
    if (!this.depIds.hasOwnProperty(dep.id)) {
      // 将watcher添加到dep中, 建立dep到watcher的关系  添加订阅者
      dep.addSub(this);
      // 将dep添加到当前watcher中
      this.depIds[dep.id] = dep;
    }
  },
  get: function () {
    Dep.target = this;
    var value = this.getVMVal();
    Dep.target = null;
    return value;
  },

  getVMVal: function () {
    var exp = this.exp.split('.');
    var val = this.vm._data;
    exp.forEach(function (k) {
      val = val[k]; // 导致属性的getter调用
    });
    return val;
  }
};