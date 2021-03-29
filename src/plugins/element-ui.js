import Vue from 'vue'
import {  MessageBox,Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;