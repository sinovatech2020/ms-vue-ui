import Vue from 'vue';
import MsToast from "./main.vue";

const ToastConstructor = Vue.extend(MsToast);


let toastPool = [];

const getInstance = () => {
    if (toastPool.length > 0) {
        return toastPool[0];
    }
    const instance= new ToastConstructor({
        el: document.createElement('div')
    });
    toastPool.push(instance);
    document.body.appendChild(instance.$el);
    return instance
}

const Toast = (options = {}) => {
    const instance = getInstance();
    let duration = options.duration || 3000;
    clearTimeout(instance.timer);
    instance.message = options.message;
    instance.iconType=options.iconType
    instance.theToast = true;
    instance.timer = setTimeout(() => {
        instance.theToast = false;
    }, duration);
    return instance;
}

export default Toast;
