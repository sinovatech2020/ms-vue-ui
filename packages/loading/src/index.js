import Vue from 'vue';
import MsLoading from "./main.vue";

const LoadingConstructor = Vue.extend(MsLoading);
let loadingFlag = null;

const getInstance = () => {
    if (loadingFlag !== null) {
        return loadingFlag;
    }
    const instance = new LoadingConstructor({
        el: document.createElement('div')
    });
    loadingFlag = instance;
    document.body.appendChild(instance.$el);
    return instance
}

const Loading = (options={}) => {
    const instance = getInstance();; //创建一个Vue子类
    instance.display=options.display;
    instance.message=options.message || "加载中...";
    document.body.appendChild(instance.$el);
    return instance;
};
export default Loading;