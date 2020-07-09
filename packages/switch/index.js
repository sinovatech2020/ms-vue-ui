import MsSwitch from './src/main.vue';

MsSwitch.install=(Vue)=>{
    Vue.component(MsSwitch.name,MsSwitch)
}

export default MsSwitch;