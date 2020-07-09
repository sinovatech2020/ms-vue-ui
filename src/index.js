import MsToast from '../packages/toast/index';
import MsLoading from '../packages/loading/index'
import MsDialog from '../packages/dialog/index'
import MsButton from '../packages/button/index'
import MsPopup from '../packages/popup/index'
import MsMoKe from '../packages/moke/index'
import MsScroll from '../packages/scroll/index'
import MsSwitchCell from '../packages/switchCell/index'
import MsDatePicker from "../packages/datePicker/index"
import MsShareSheet from '../packages/shareSheet/index'
import MsSwitch from '../packages/switch/index'
import MsAreaPicker from '../packages/areaPicker/index'

const components = [
    MsDialog,
    MsButton,
    MsPopup,
    MsMoKe,
    MsScroll,
    MsSwitchCell,
    MsDatePicker,
    MsShareSheet,
    MsSwitch,
    MsAreaPicker
];

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
    Vue.$MsToast = Vue.prototype.$MsToast = MsToast;
    Vue.$MsLoading = Vue.prototype.$MsLoading = MsLoading;
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}


export default {
    install,
    MsToast,
    MsLoading,
    MsDialog,
    MsButton,
    MsPopup,
    MsMoKe,
    MsScroll,
    MsSwitchCell,
    MsDatePicker,
    MsShareSheet,
    MsSwitch,
    MsAreaPicker
}
