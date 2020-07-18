import Vue from 'vue'
import Antd from 'ant-design-vue/lib'

Vue.use(Antd)
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
}