(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ad7148d2"],{"2a0c":function(t,i,s){t.exports=s.p+"img/img-2.d13ce9ed.png"},"2acb":function(t,i,s){t.exports=s.p+"img/img-5.12e6feca.png"},"516e":function(t,i,s){t.exports=s.p+"img/img-4.ce306f88.png"},8416:function(t,i,s){t.exports=s.p+"img/img-3.c03ab73f.png"},"8b3b":function(t,i,s){t.exports=s.p+"img/img-6.14a87195.png"},b68d:function(t,i,s){
/*!
 * vue-slide-bar v1.2.0
 * (c) 2018-present biig_pongsatorn <biig_pongsatorn@hotmail.com>
 * Released under the MIT License.
 */
!function(i,s){t.exports=s()}(0,(function(){"use strict";function t(t,i,s){return i in t?Object.defineProperty(t,i,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[i]=s,t}function i(i){for(var s=1;s<arguments.length;s++){var a=null!=arguments[s]?arguments[s]:{},e=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(e=e.concat(Object.getOwnPropertySymbols(a).filter((function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable})))),e.forEach((function(s){t(i,s,a[s])}))}return i}var s={name:"vue-slide-bar",data:function(){return{flag:!1,size:0,currentValue:0,currentSlider:0,isComponentExists:!0,interval:1,lazy:!1,realTime:!1,dataLabelStyles:i({color:"#4a4a4a","font-family":"Arial, sans-serif","font-size":"12px"},this.$props.labelStyles)}},props:{data:{type:Array,default:null},id:{type:String,default:"wrap"},range:{type:Array,default:null},speed:{type:Number,default:.5},lineHeight:{type:Number,default:5},iconWidth:{type:Number,default:20},value:{type:[String,Number],default:0},min:{type:Number,default:0},max:{type:Number,default:100},showTooltip:{type:Boolean,default:!0},isDisabled:{type:Boolean,default:!1},draggable:{type:Boolean,default:!0},paddingless:{type:Boolean,default:!1},tooltipStyles:Object,labelStyles:Object,processStyle:Object},computed:{slider:function(){return this.$refs.tooltip},val:{get:function(){return this.data?this.data[this.currentValue]:this.currentValue},set:function(t){if(this.data){var i=this.data.indexOf(t);i>-1&&(this.currentValue=i)}else this.currentValue=t}},currentIndex:function(){return(this.currentValue-this.minimum)/this.spacing},indexRange:function(){return[0,this.currentIndex]},minimum:function(){return this.data?0:this.min},maximum:function(){return this.data?this.data.length-1:this.max},multiple:function(){var t="".concat(this.interval).split(".")[1];return t?Math.pow(10,t.length):1},spacing:function(){return this.data?1:this.interval},total:function(){return this.data?this.data.length-1:(Math.floor((this.maximum-this.minimum)*this.multiple)%(this.interval*this.multiple)!=0&&this.printError("[VueSlideBar error]: Prop[interval] is illegal, Please make sure that the interval can be divisible"),(this.maximum-this.minimum)/this.interval)},gap:function(){return this.size/this.total},position:function(){return(this.currentValue-this.minimum)/this.spacing*this.gap},limit:function(){return[0,this.size]},valueLimit:function(){return[this.minimum,this.maximum]},calculateHeight:function(){return this.paddingless?{}:{"padding-top":"40px","min-height":this.range?"100px":null}}},watch:{value:function(t){this.flag?this.setValue(t):this.setValue(t,this.speed)},max:function(t){if(t<this.min)return this.printError("[VueSlideBar error]: The maximum value can not be less than the minimum value.");var i=this.limitValue(this.val);this.setValue(i),this.refresh()},min:function(t){if(t>this.max)return this.printError("[VueSlideBar error]: The minimum value can not be greater than the maximum value.");var i=this.limitValue(this.val);this.setValue(i),this.refresh()}},methods:{bindEvents:function(){document.addEventListener("touchmove",this.moving,{passive:!1}),document.addEventListener("touchend",this.moveEnd,{passive:!1}),document.addEventListener("mousemove",this.moving),document.addEventListener("mouseup",this.moveEnd),document.addEventListener("mouseleave",this.moveEnd),window.addEventListener("resize",this.refresh)},unbindEvents:function(){window.removeEventListener("resize",this.refresh),document.removeEventListener("touchmove",this.moving),document.removeEventListener("touchend",this.moveEnd),document.removeEventListener("mousemove",this.moving),document.removeEventListener("mouseup",this.moveEnd),document.removeEventListener("mouseleave",this.moveEnd)},getPos:function(t){return this.realTime&&this.getStaticData(),t.clientX-this.offset},wrapClick:function(t){if(this.isDisabled||!this.draggable&&t.target.id===this.id)return!1;var i=this.getPos(t);this.setValueOnPos(i)},moveStart:function(t,i){if(!this.draggable)return!1;this.flag=!0,this.$emit("dragStart",this)},moving:function(t){if(!this.flag||!this.draggable)return!1;t.preventDefault(),t.targetTouches&&t.targetTouches[0]&&(t=t.targetTouches[0]),this.setValueOnPos(this.getPos(t),!0)},moveEnd:function(t){if(!this.flag||!this.draggable)return!1;this.$emit("dragEnd",this),this.lazy&&this.isDiff(this.val,this.value)&&this.syncValue(),this.flag=!1,this.setPosition()},setValueOnPos:function(t,i){var s=this.limit,a=this.valueLimit;if(t>=s[0]&&t<=s[1]){this.setTransform(t);var e=(Math.round(t/this.gap)*(this.spacing*this.multiple)+this.minimum*this.multiple)/this.multiple;this.setCurrentValue(e,i)}else t<s[0]?(this.setTransform(s[0]),this.setCurrentValue(a[0]),1===this.currentSlider&&(this.currentSlider=0)):(this.setTransform(s[1]),this.setCurrentValue(a[1]),0===this.currentSlider&&(this.currentSlider=1))},isDiff:function(t,i){return Object.prototype.toString.call(t)!==Object.prototype.toString.call(i)||(Array.isArray(t)&&t.length===i.length?t.some((function(t,s){return t!==i[s]})):t!==i)},setCurrentValue:function(t,i){if(t<this.minimum||t>this.maximum)return!1;this.isDiff(this.currentValue,t)&&(this.currentValue=t,this.lazy&&this.flag||this.syncValue()),i||this.setPosition()},setIndex:function(t){t=this.spacing*t+this.minimum,this.setCurrentValue(t)},setValue:function(t,i){var s=this;if(this.isDiff(this.val,t)){var a=this.limitValue(t);this.val=a,this.syncValue()}this.$nextTick((function(){return s.setPosition(i)}))},setPosition:function(t){this.flag?this.setTransitionTime(0):this.setTransitionTime(void 0===t?this.speed:t),this.setTransform(this.position)},setTransform:function(t){var i=t-(this.$refs.tooltip.scrollWidth-2)/2,s="translateX(".concat(i,"px)");this.slider.style.transform=s,this.slider.style.WebkitTransform=s,this.slider.style.msTransform=s,this.$refs.process.style.width="".concat(t,"px"),this.$refs.process.style.left=0},setTransitionTime:function(t){this.slider.style.transitionDuration="".concat(t,"s"),this.slider.style.WebkitTransitionDuration="".concat(t,"s"),this.$refs.process.style.transitionDuration="".concat(t,"s"),this.$refs.process.style.WebkitTransitionDuration="".concat(t,"s")},limitValue:function(t){var i,s=this;return this.data?t:(i=t)<s.min?(s.printError("[VueSlideBar warn]: The value of the slider is ".concat(t,", the minimum value is ").concat(s.min,", the value of this slider can not be less than the minimum value")),s.min):i>s.max?(s.printError("[VueSlideBar warn]: The value of the slider is ".concat(t,", the maximum value is ").concat(s.max,", the value of this slider can not be greater than the maximum value")),s.max):i},syncValue:function(){var t=this.val;this.range&&this.$emit("callbackRange",this.range[this.currentIndex]),this.$emit("input",t)},getValue:function(){return this.val},getIndex:function(){return this.currentIndex},getStaticData:function(){this.$refs.elem&&(this.size=this.$refs.elem.offsetWidth,this.offset=this.$refs.elem.getBoundingClientRect().left)},refresh:function(){this.$refs.elem&&(this.getStaticData(),this.setPosition())},printError:function(t){console.error(t)}},mounted:function(){var t=this;if(this.isComponentExists=!0,"undefined"==typeof window||"undefined"==typeof document)return this.printError("[VueSlideBar error]: window or document is undefined, can not be initialization.");this.$nextTick((function(){t.isComponentExists&&(t.getStaticData(),t.setValue(t.limitValue(t.value),0),t.bindEvents())}))},beforeDestroy:function(){this.isComponentExists=!1,this.unbindEvents()}};const a="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase()),e=document.head||document.getElementsByTagName("head")[0],r={},o=s;return s.__file="index.vue",function(t,i,s,a,e,r,o,l,c,n){"function"==typeof o&&(c=l,l=o,o=!1);const d="function"==typeof s?s.options:s;let u;if(t&&t.render&&(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,e&&(d.functional=!0)),a&&(d._scopeId=a),r?(u=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,c(t)),t&&t._registeredComponents&&t._registeredComponents.add(r)},d._ssrRegister=u):i&&(u=o?function(){i.call(this,n(this.$root.$options.shadowRoot))}:function(t){i.call(this,l(t))}),u)if(d.functional){const t=d.render;d.render=function(i,s){return u.call(s),t(i,s)}}else{const t=d.beforeCreate;d.beforeCreate=t?[].concat(t,u):[u]}return s}({render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{ref:"wrap",staticClass:"vue-slide-bar-component vue-slide-bar-horizontal",style:t.calculateHeight,attrs:{id:t.id},on:{click:t.wrapClick}},[s("div",{ref:"elem",staticClass:"vue-slide-bar",style:{height:t.lineHeight+"px"}},[[s("div",{ref:"tooltip",staticClass:"vue-slide-bar-always vue-slide-bar-tooltip-container",style:{width:t.iconWidth+"px"},on:{mousedown:t.moveStart,touchstart:t.moveStart}},[t.showTooltip?s("span",{staticClass:"vue-slide-bar-tooltip-top vue-slide-bar-tooltip-wrap"},[t._t("tooltip",[s("span",{staticClass:"vue-slide-bar-tooltip",style:t.tooltipStyles},[t._v("\n              "+t._s(t.val)+"\n            ")])])],2):t._e()])],t._v(" "),s("div",{ref:"process",staticClass:"vue-slide-bar-process",style:t.processStyle})],2),t._v(" "),t.range?s("div",{staticClass:"vue-slide-bar-range"},t._l(t.range,(function(i,a){return s("div",{key:a,staticClass:"vue-slide-bar-separate",style:t.dataLabelStyles},[i.isHide?t._e():s("span",{staticClass:"vue-slide-bar-separate-text"},[t._v("\n        "+t._s(i.label)+"\n      ")])])})),0):t._e()])},staticRenderFns:[]},(function(t){t&&t("data-v-d3e7b39a_0",{source:".vue-slide-bar-component[data-v-d3e7b39a]{position:relative;box-sizing:border-box;user-select:none}.vue-slide-bar[data-v-d3e7b39a]{position:relative;display:block;border-radius:15px;background-color:#d8d8d8;cursor:pointer}.vue-slide-bar[data-v-d3e7b39a]::after{content:'';position:absolute;left:0;top:0;width:100%;height:100%;z-index:2}.vue-slide-bar-process[data-v-d3e7b39a]{position:absolute;border-radius:15px;background-color:#1066fd;transition:all 0s;z-index:1;width:0;height:100%;top:0;left:0;will-change:width}.vue-slide-bar-tooltip-container[data-v-d3e7b39a]{position:absolute;transition:all 0s;will-change:transform;cursor:pointer;z-index:3;left:0;top:-16px}.vue-slide-bar-tooltip-wrap[data-v-d3e7b39a]{position:absolute;z-index:9;width:100%;height:100%;display:block!important}.vue-slide-bar-tooltip-top[data-v-d3e7b39a]{top:-12px;left:40%;transform:translate(-50%,-100%)}.vue-slide-bar-tooltip[data-v-d3e7b39a]{position:relative;font-size:14px;white-space:nowrap;padding:2px 5px;min-width:20px;text-align:center;color:#fff;border-radius:5px;border:1px solid #1066fd;background-color:#1066fd}.vue-slide-bar-tooltip[data-v-d3e7b39a]::before{content:'';position:absolute;bottom:-10px;left:50%;width:0;height:0;border:5px solid transparent;border-top-color:inherit;transform:translate(-50%,0)}.vue-slide-bar-range[data-v-d3e7b39a]{display:flex;padding:5px 0;justify-content:space-between}.vue-slide-bar-separate[data-v-d3e7b39a]{position:relative;width:2px;background-color:#9e9e9e;height:5px;cursor:pointer}.vue-slide-bar-separate-text[data-v-d3e7b39a]{text-align:center;position:absolute;white-space:nowrap;transform:translate(-50%,0);top:6px}",map:void 0,media:void 0})}),o,"data-v-d3e7b39a",!1,void 0,(function(t){return(t,i)=>function(t,i){const s=a?i.media||"default":t,o=r[s]||(r[s]={ids:new Set,styles:[]});if(!o.ids.has(t)){o.ids.add(t);let s=i.source;if(i.map&&(s+="\n/*# sourceURL="+i.map.sources[0]+" */",s+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i.map))))+" */"),o.element||(o.element=document.createElement("style"),o.element.type="text/css",i.media&&o.element.setAttribute("media",i.media),e.appendChild(o.element)),"styleSheet"in o.element)o.styles.push(s),o.element.styleSheet.cssText=o.styles.filter(Boolean).join("\n");else{const t=o.ids.size-1,i=document.createTextNode(s),a=o.element.childNodes;a[t]&&o.element.removeChild(a[t]),a.length?o.element.insertBefore(i,a[t]):o.element.appendChild(i)}}}(t,i)}),void 0)}))},c080:function(t,i,s){t.exports=s.p+"img/img-1.3ce3b98b.png"},e76d:function(t,i,s){"use strict";s.r(i);var a=function(){var t=this,i=t._self._c;return i("Layout",[i("PageHeader",{attrs:{title:t.title,items:t.items}}),i("div",{staticClass:"row"},[i("div",{staticClass:"col-xl-3 col-lg-4"},[i("div",{staticClass:"card"},[i("div",{staticClass:"card-header bg-transparent border-bottom"},[i("h5",{staticClass:"mb-0"},[t._v("Filters")])]),i("div",{staticClass:"card-body"},[i("h5",{staticClass:"font-size-14 mb-3"},[t._v("Categories")]),i("div",{staticClass:"custom-accordion categories-accordion mb-3",attrs:{id:"accordion"}},[i("div",{staticClass:"categories-group-card"},[i("a",{directives:[{name:"b-toggle",rawName:"v-b-toggle.electorinic",modifiers:{electorinic:!0}}],staticClass:"categories-group-list"},[i("i",{staticClass:"mdi mdi-desktop-classic font-size-16 align-middle mr-2"}),t._v(" Electronic "),i("i",{staticClass:"mdi mdi-minus float-right accor-plus-icon"})]),i("b-collapse",{attrs:{id:"electorinic","data-parent":"#accordion",accordion:"my-accordion"}},[i("div",[i("ul",{staticClass:"list-unstyled categories-list mb-0"},[i("li",[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-circle-medium mr-1"}),t._v(" Mobile ")])]),i("li",[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-circle-medium mr-1"}),t._v(" Mobile accessories ")])]),i("li",[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-circle-medium mr-1"}),t._v(" Computers ")])]),i("li",[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-circle-medium mr-1"}),t._v(" Laptops ")])]),i("li",[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-circle-medium mr-1"}),t._v(" Speakers ")])])])])])],1),i("div",{staticClass:"categories-group-card"},[i("a",{directives:[{name:"b-toggle",rawName:"v-b-toggle.fashion",modifiers:{fashion:!0}}],staticClass:"categories-group-list",attrs:{"data-toggle":"collapse","aria-expanded":"true","aria-controls":"collapseTwo"}},[i("i",{staticClass:"mdi mdi-hanger font-size-16 align-middle mr-2"}),t._v(" Fashion "),i("i",{staticClass:"mdi mdi-minus float-right accor-plus-icon"})]),i("b-collapse",{attrs:{id:"fashion",visible:"","data-parent":"#accordion",accordion:"my-accordion"}},[i("div",[i("ul",{staticClass:"list-unstyled categories-list mb-0"},[i("li",{staticClass:"active"},[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-circle-medium mr-1"}),t._v(" Clothing ")])]),i("li",[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-circle-medium mr-1"}),t._v(" Footwear ")])]),i("li",[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-circle-medium mr-1"}),t._v(" Watches ")])]),i("li",[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-circle-medium mr-1"}),t._v(" Sportswear ")])])])])])],1),i("div",{staticClass:"categories-group-card"},[i("a",{directives:[{name:"b-toggle",rawName:"v-b-toggle.kids",modifiers:{kids:!0}}],staticClass:"categories-group-list collapsed",attrs:{"data-toggle":"collapse","aria-expanded":"false","aria-controls":"collapseThree"}},[i("i",{staticClass:"mdi mdi-pinwheel-outline font-size-16 align-middle mr-2"}),t._v(" Baby & Kids "),i("i",{staticClass:"mdi mdi-minus float-right accor-plus-icon"})]),i("b-collapse",{attrs:{id:"kids","data-parent":"#accordion",accordion:"my-accordion"}},[i("div",[i("ul",{staticClass:"list-unstyled categories-list mb-0"},[i("li",[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-circle-medium mr-1"}),t._v(" Clothing ")])]),i("li",[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-circle-medium mr-1"}),t._v(" Footwear ")])]),i("li",[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-circle-medium mr-1"}),t._v(" Toys ")])]),i("li",[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-circle-medium mr-1"}),t._v(" Baby care ")])])])])])],1),i("div",{staticClass:"categories-group-card"},[i("a",{directives:[{name:"b-toggle",rawName:"v-b-toggle.Fitness",modifiers:{Fitness:!0}}],staticClass:"categories-group-list collapsed",attrs:{"data-toggle":"collapse","aria-expanded":"false","aria-controls":"collapseFour"}},[i("i",{staticClass:"mdi mdi-dumbbell font-size-16 align-middle mr-2"}),t._v(" Fitness "),i("i",{staticClass:"mdi mdi-minus float-right accor-plus-icon"})]),i("b-collapse",{attrs:{id:"Fitness","data-parent":"#accordion",accordion:"my-accordion"}},[i("div",[i("ul",{staticClass:"list-unstyled categories-list mb-0"},[i("li",[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-circle-medium mr-1"}),t._v(" Gym equipment ")])]),i("li",[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-circle-medium mr-1"}),t._v(" Yoga mat ")])]),i("li",[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-circle-medium mr-1"}),t._v(" Dumbbells ")])]),i("li",[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-circle-medium mr-1"}),t._v(" Protein supplements ")])])])])])],1)])]),i("div",{staticClass:"card-body border-top"},[i("div",[i("h5",{staticClass:"font-size-14 mb-4"},[t._v("Price")]),i("vue-slide-bar",{attrs:{min:0,max:1e3},model:{value:t.sliderPrice,callback:function(i){t.sliderPrice=i},expression:"sliderPrice"}})],1)]),i("div",{staticClass:"custom-accordion"},[i("div",{staticClass:"card-body border-top"},[i("div",[i("h5",{staticClass:"font-size-14 mb-0"},[i("a",{directives:[{name:"b-toggle",rawName:"v-b-toggle.discount",modifiers:{discount:!0}}],staticClass:"text-dark d-block",attrs:{"data-toggle":"collapse"}},[t._v(" Discount "),i("i",{staticClass:"mdi mdi-minus float-right accor-plus-icon"})])]),i("b-collapse",{attrs:{visible:"",id:"discount"}},[i("div",{staticClass:"mt-4"},[i("div",{staticClass:"custom-control custom-radio mt-2"},[i("input",{staticClass:"custom-control-input",attrs:{type:"radio",id:"productdiscountRadio6",name:"productdiscountRadio1"}}),i("label",{staticClass:"custom-control-label",attrs:{for:"productdiscountRadio6"}},[t._v("50% or more")])]),i("div",{staticClass:"custom-control custom-radio mt-2"},[i("input",{staticClass:"custom-control-input",attrs:{type:"radio",id:"productdiscountRadio5",name:"productdiscountRadio1"}}),i("label",{staticClass:"custom-control-label",attrs:{for:"productdiscountRadio5"}},[t._v("40% or more")])]),i("div",{staticClass:"custom-control custom-radio mt-2"},[i("input",{staticClass:"custom-control-input",attrs:{type:"radio",id:"productdiscountRadio4",name:"productdiscountRadio1"}}),i("label",{staticClass:"custom-control-label",attrs:{for:"productdiscountRadio4"}},[t._v("30% or more")])]),i("div",{staticClass:"custom-control custom-radio mt-2"},[i("input",{staticClass:"custom-control-input",attrs:{type:"radio",id:"productdiscountRadio3",name:"productdiscountRadio1"}}),i("label",{staticClass:"custom-control-label",attrs:{for:"productdiscountRadio3"}},[t._v("20% or more")])]),i("div",{staticClass:"custom-control custom-radio mt-2"},[i("input",{staticClass:"custom-control-input",attrs:{type:"radio",id:"productdiscountRadio2",name:"productdiscountRadio1"}}),i("label",{staticClass:"custom-control-label",attrs:{for:"productdiscountRadio2"}},[t._v("10% or more")])]),i("div",{staticClass:"custom-control custom-radio mt-2"},[i("input",{staticClass:"custom-control-input",attrs:{type:"radio",id:"productdiscountRadio1",name:"productdiscountRadio1"}}),i("label",{staticClass:"custom-control-label",attrs:{for:"productdiscountRadio1"}},[t._v("Less than 10%")])])])])],1)]),i("div",{staticClass:"card-body border-top"},[i("div",[i("h5",{staticClass:"font-size-14 mb-0"},[i("a",{directives:[{name:"b-toggle",rawName:"v-b-toggle.size",modifiers:{size:!0}}],staticClass:"text-dark d-block",attrs:{"data-toggle":"collapse"}},[t._v(" Size "),i("i",{staticClass:"mdi mdi-minus float-right accor-plus-icon"})])]),i("b-collapse",{attrs:{visible:"",id:"size"}},[i("div",{staticClass:"mt-4"},[i("div",{staticClass:"custom-control custom-radio mt-2"},[i("input",{staticClass:"custom-control-input",attrs:{type:"radio",id:"productsizeRadio1",name:"productsizeRadio"}}),i("label",{staticClass:"custom-control-label",attrs:{for:"productsizeRadio1"}},[t._v("X-Large")])]),i("div",{staticClass:"custom-control custom-radio mt-2"},[i("input",{staticClass:"custom-control-input",attrs:{type:"radio",id:"productsizeRadio2",name:"productsizeRadio"}}),i("label",{staticClass:"custom-control-label",attrs:{for:"productsizeRadio2"}},[t._v("Large")])]),i("div",{staticClass:"custom-control custom-radio mt-2"},[i("input",{staticClass:"custom-control-input",attrs:{type:"radio",id:"productsizeRadio3",name:"productsizeRadio"}}),i("label",{staticClass:"custom-control-label",attrs:{for:"productsizeRadio3"}},[t._v("Medium")])]),i("div",{staticClass:"custom-control custom-radio mt-2"},[i("input",{staticClass:"custom-control-input",attrs:{type:"radio",id:"productsizeRadio4",name:"productsizeRadio"}}),i("label",{staticClass:"custom-control-label",attrs:{for:"productsizeRadio4"}},[t._v("Small")])])])])],1)]),i("div",{staticClass:"card-body border-top"},[i("div",[i("h5",{staticClass:"font-size-14 mb-0"},[i("a",{directives:[{name:"b-toggle",rawName:"v-b-toggle.customrating",modifiers:{customrating:!0}}],staticClass:"collapsed text-dark d-block",attrs:{"data-toggle":"collapse"}},[t._v(" Customer Rating "),i("i",{staticClass:"mdi mdi-minus float-right accor-plus-icon"})])]),i("b-collapse",{attrs:{id:"customrating"}},[i("div",{staticClass:"mt-4"},[i("div",{staticClass:"custom-control custom-radio mt-2"},[i("input",{staticClass:"custom-control-input",attrs:{type:"radio",id:"productratingRadio1",name:"productratingRadio1"}}),i("label",{staticClass:"custom-control-label",attrs:{for:"productratingRadio1"}},[t._v(" 4 "),i("i",{staticClass:"mdi mdi-star text-warning"}),t._v(" & Above ")])]),i("div",{staticClass:"custom-control custom-radio mt-2"},[i("input",{staticClass:"custom-control-input",attrs:{type:"radio",id:"productratingRadio2",name:"productratingRadio1"}}),i("label",{staticClass:"custom-control-label",attrs:{for:"productratingRadio2"}},[t._v(" 3 "),i("i",{staticClass:"mdi mdi-star text-warning"}),t._v(" & Above ")])]),i("div",{staticClass:"custom-control custom-radio mt-2"},[i("input",{staticClass:"custom-control-input",attrs:{type:"radio",id:"productratingRadio3",name:"productratingRadio1"}}),i("label",{staticClass:"custom-control-label",attrs:{for:"productratingRadio3"}},[t._v(" 2 "),i("i",{staticClass:"mdi mdi-star text-warning"}),t._v(" & Above ")])]),i("div",{staticClass:"custom-control custom-radio mt-2"},[i("input",{staticClass:"custom-control-input",attrs:{type:"radio",id:"productratingRadio4",name:"productratingRadio1"}}),i("label",{staticClass:"custom-control-label",attrs:{for:"productratingRadio4"}},[t._v(" 1 "),i("i",{staticClass:"mdi mdi-star text-warning"})])])])])],1)])])])]),i("div",{staticClass:"col-lg-9"},[i("div",{staticClass:"card"},[i("div",{staticClass:"card-body"},[i("div",[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-6"},[i("div",[i("h5",[t._v("Clothes & Accessories")]),i("ol",{staticClass:"breadcrumb p-0 bg-transparent mb-2"},[i("li",{staticClass:"breadcrumb-item"},[i("a",{attrs:{href:"javascript: void(0);"}},[t._v("Fashion")])]),i("li",{staticClass:"breadcrumb-item"},[i("a",{attrs:{href:"javascript: void(0);"}},[t._v("Clothing")])]),i("li",{staticClass:"breadcrumb-item active"},[t._v("T-shirts")])])])]),i("div",{staticClass:"col-md-6"},[i("div",{staticClass:"form-inline float-md-right"},[i("div",{staticClass:"search-box ml-2"},[i("div",{staticClass:"position-relative"},[i("input",{staticClass:"form-control rounded",attrs:{type:"text",placeholder:"Search..."}}),i("i",{staticClass:"mdi mdi-magnify search-icon"})])])])])]),i("ul",{staticClass:"list-inline my-3 ecommerce-sortby-list"},[i("li",{staticClass:"list-inline-item"},[i("span",{staticClass:"font-weight-medium font-family-secondary"},[t._v("Sort by:")])]),i("li",{staticClass:"list-inline-item active"},[i("a",{attrs:{href:"#"}},[t._v("Popularity")])]),i("li",{staticClass:"list-inline-item"},[i("a",{attrs:{href:"#"}},[t._v("Newest")])]),i("li",{staticClass:"list-inline-item"},[i("a",{attrs:{href:"#"}},[t._v("Discount")])])]),i("div",{staticClass:"row no-gutters"},[i("div",{staticClass:"col-xl-4 col-sm-6"},[i("div",{staticClass:"product-box"},[i("div",{staticClass:"product-img"},[i("div",{staticClass:"product-ribbon badge badge-warning"},[t._v("Trending")]),i("div",{staticClass:"product-like"},[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-heart-outline"})])]),i("img",{staticClass:"img-fluid mx-auto d-block",attrs:{src:s("c080"),alt:""}})]),i("div",{staticClass:"text-center"},[i("p",{staticClass:"font-size-12 mb-1"},[t._v("Blue color, T-shirt")]),i("h5",{staticClass:"font-size-15"},[i("a",{staticClass:"text-dark",attrs:{href:"#"}},[t._v("Full sleeve T-shirt")])]),i("h5",{staticClass:"mt-3 mb-0"},[t._v("$240")])])])]),i("div",{staticClass:"col-xl-4 col-sm-6"},[i("div",{staticClass:"product-box"},[i("div",{staticClass:"product-img"},[i("div",{staticClass:"product-ribbon badge badge-primary"},[t._v("- 25 %")]),i("div",{staticClass:"product-like"},[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-heart-outline"})])]),i("img",{staticClass:"img-fluid mx-auto d-block",attrs:{src:s("2a0c"),alt:""}})]),i("div",{staticClass:"text-center"},[i("p",{staticClass:"font-size-12 mb-1"},[t._v("Half sleeve, T-shirt")]),i("h5",{staticClass:"font-size-15"},[i("a",{staticClass:"text-dark",attrs:{href:"#"}},[t._v("Half sleeve T-shirt")])]),i("h5",{staticClass:"mt-3 mb-0"},[i("span",{staticClass:"text-muted mr-2"},[i("del",[t._v("$240")])]),t._v("$225 ")])])])]),i("div",{staticClass:"col-xl-4 col-sm-6"},[i("div",{staticClass:"product-box"},[i("div",{staticClass:"product-img"},[i("div",{staticClass:"product-like"},[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-heart text-danger"})])]),i("img",{staticClass:"img-fluid mx-auto d-block",attrs:{src:s("8416"),alt:""}})]),i("div",{staticClass:"text-center"},[i("p",{staticClass:"font-size-12 mb-1"},[t._v("Green color, Hoodie")]),i("h5",{staticClass:"font-size-15"},[i("a",{staticClass:"text-dark",attrs:{href:"#"}},[t._v("Hoodie (Green)")])]),i("h5",{staticClass:"mt-3 mb-0"},[i("span",{staticClass:"text-muted mr-2"},[i("del",[t._v("$290")])]),t._v("$275 ")])])])]),i("div",{staticClass:"col-xl-4 col-sm-6"},[i("div",{staticClass:"product-box"},[i("div",{staticClass:"product-img"},[i("div",{staticClass:"product-like"},[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-heart-outline"})])]),i("img",{staticClass:"img-fluid mx-auto d-block",attrs:{src:s("516e"),alt:""}})]),i("div",{staticClass:"text-center"},[i("p",{staticClass:"font-size-12 mb-1"},[t._v("Gray color, Hoodie")]),i("h5",{staticClass:"font-size-15"},[i("a",{staticClass:"text-dark",attrs:{href:"#"}},[t._v("Hoodie (Green)")])]),i("h5",{staticClass:"mt-3 mb-0"},[i("span",{staticClass:"text-muted mr-2"},[i("del",[t._v("$290")])]),t._v("$275 ")])])])]),i("div",{staticClass:"col-xl-4 col-sm-6"},[i("div",{staticClass:"product-box"},[i("div",{staticClass:"product-img"},[i("div",{staticClass:"product-like"},[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-heart text-danger"})])]),i("img",{staticClass:"img-fluid mx-auto d-block",attrs:{src:s("2acb"),alt:""}})]),i("div",{staticClass:"text-center"},[i("p",{staticClass:"font-size-12 mb-1"},[t._v("Blue color, T-shirt")]),i("h5",{staticClass:"font-size-15"},[i("a",{staticClass:"text-dark",attrs:{href:"#"}},[t._v("Full sleeve T-shirt")])]),i("h5",{staticClass:"mt-3 mb-0"},[t._v("$242")])])])]),i("div",{staticClass:"col-xl-4 col-sm-6"},[i("div",{staticClass:"product-box"},[i("div",{staticClass:"product-img"},[i("div",{staticClass:"product-ribbon badge badge-primary"},[t._v("- 22 %")]),i("div",{staticClass:"product-like"},[i("a",{attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-heart-outline"})])]),i("img",{staticClass:"img-fluid mx-auto d-block",attrs:{src:s("8b3b"),alt:""}})]),i("div",{staticClass:"text-center"},[i("p",{staticClass:"font-size-12 mb-1"},[t._v("Black color, T-shirt")]),i("h5",{staticClass:"font-size-15"},[i("a",{staticClass:"text-dark",attrs:{href:"#"}},[t._v("Half sleeve T-shirt")])]),i("h5",{staticClass:"mt-3 mb-0"},[i("span",{staticClass:"text-muted mr-2"},[i("del",[t._v("$240")])]),t._v("$225 ")])])])])]),i("div",{staticClass:"row mt-4"},[i("div",{staticClass:"col-sm-6"},[i("div",[i("p",{staticClass:"mb-sm-0 mt-2"},[t._v(" Page "),i("span",{staticClass:"font-weight-bold"},[t._v("2")]),t._v(" Of "),i("span",{staticClass:"font-weight-bold"},[t._v("113")])])])]),i("div",{staticClass:"col-sm-6"},[i("div",{staticClass:"float-sm-right"},[i("ul",{staticClass:"pagination pagination-rounded mb-sm-0"},[i("li",{staticClass:"page-item disabled"},[i("a",{staticClass:"page-link",attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-chevron-left"})])]),i("li",{staticClass:"page-item"},[i("a",{staticClass:"page-link",attrs:{href:"#"}},[t._v("1")])]),i("li",{staticClass:"page-item active"},[i("a",{staticClass:"page-link",attrs:{href:"#"}},[t._v("2")])]),i("li",{staticClass:"page-item"},[i("a",{staticClass:"page-link",attrs:{href:"#"}},[t._v("3")])]),i("li",{staticClass:"page-item"},[i("a",{staticClass:"page-link",attrs:{href:"#"}},[t._v("4")])]),i("li",{staticClass:"page-item"},[i("a",{staticClass:"page-link",attrs:{href:"#"}},[t._v("5")])]),i("li",{staticClass:"page-item"},[i("a",{staticClass:"page-link",attrs:{href:"#"}},[i("i",{staticClass:"mdi mdi-chevron-right"})])])])])])])])])])])])],1)},e=[],r=s("b68d"),o=s.n(r),l=s("5658"),c=s("2579"),n=s("c2a4"),d={page:{title:"Product",meta:[{name:"description",content:n.description}]},components:{VueSlideBar:o.a,Layout:l["a"],PageHeader:c["a"]},data(){return{title:"Products",items:[{text:"Ecommerce"},{text:"Products",active:!0}],sliderPrice:800}}},u=d,m=s("2877"),p=Object(m["a"])(u,a,e,!1,null,null,null);i["default"]=p.exports}}]);
//# sourceMappingURL=chunk-ad7148d2.eb3fa24a.js.map