import MsMoke from './src/main.vue';

MsMoke.install=(Vue)=>{
    Vue.component(MsMoke.name,MsMoke)
}

export default MsMoke;