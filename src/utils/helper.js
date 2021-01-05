import Vue from 'vue';

Vue.prototype.alertMessage = function (type, message, showclose) {
  return this.$message({
    showClose: showclose,
    message: message,
    type: type
  });
};


