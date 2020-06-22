import MsScroll from './src/main.vue';

MsScroll.install = function (Vue) {
    Vue.component(MsScroll.name, MsScroll);
};

export default MsScroll;