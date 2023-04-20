import Vue from 'vue';
import SvgIcon from '@/components/Icon/SvgIcon.vue';// svg组件

// 1. 全局注册SvgIcon组件
Vue.component('svg-icon', SvgIcon);
// 2. 载入所有svg icon
const requireContext = require.context('../assets/icons', true, /\.svg$/);
requireContext.keys().forEach(requireContext);
