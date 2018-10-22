import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
/* import locale from 'element-ui/lib/locale/lang/en' // lang i18n */

import '@/styles/index.scss'; // global css

import App from './App';
import router from './router';
import store from './store';
require('@/utils/classTest.js')

import '@/icons'; // icon
import '@/permission'; // permission control
require('@/mockjs')
window.PIXI = require('phaser-ce/build/custom/pixi.js');
window.p2 = require('phaser-ce/build/custom/p2.js');
window.Phaser = require('phaser-ce/build/custom/phaser-split.js');
import './utils/moment-locale';

const VueUploadComponent = require('vue-upload-component')
Vue.component('file-upload', VueUploadComponent)
/* Vue.use(ElementUI, { locale }) //国际化*/
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});