module.exports=function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=24)}({0:function(t,e,n){"use strict";function o(t,e,n,o,i,r,s,a){var c,l="function"==typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=n,l._compiled=!0),o&&(l.functional=!0),r&&(l._scopeId="data-v-"+r),s?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},l._ssrRegister=c):i&&(c=a?function(){i.call(this,(l.functional?this.parent:this).$root.$options.shadowRoot)}:i),c)if(l.functional){l._injectStyles=c;var u=l.render;l.render=function(t,e){return c.call(e),u(t,e)}}else{var f=l.beforeCreate;l.beforeCreate=f?[].concat(f,c):[c]}return{exports:t,options:l}}n.d(e,"a",(function(){return o}))},24:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ms-switch",on:{click:this.move}},[e("div",{staticClass:"ms-switch-common",class:{"ms-switch-on-gray":!this.value},style:{backgroundColor:this.bgColor}}),this._v(" "),e("div",{staticClass:"ms-switch-btn",class:{"ms-switch-btn-on":this.value,"ms-switch-btn-off":!this.value}})])};o._withStripped=!0;var i={name:"MsSwitch",props:{value:{default:!1,type:Boolean},disabled:{default:!1,type:Boolean}},data:function(){return{disable:!1,actColor:"#ff6024",inactiveColor:"#fff"}},computed:{bgColor:function(){return this.value?this.actColor:this.inactiveColor}},methods:{move:function(){this.disable||(this.$emit("input",!this.value),this.$emit("change",!this.value))}},mounted:function(){this.$attrs["active-color"]&&(this.actColor=this.$attrs["active-color"]),this.$attrs["inactive-color"]&&(this.inactiveColor=this.$attrs["inactive-color"])}},r=n(0),s=Object(r.a)(i,o,[],!1,null,null,null);s.options.__file="packages/switch/src/main.vue";var a=s.exports;a.install=function(t){t.component(a.name,a)};e.default=a}});