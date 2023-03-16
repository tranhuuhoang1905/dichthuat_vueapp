(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c6ed629"],{5478:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t._self._c;return e("Layout",[e("PageHeader",{attrs:{title:t.title,items:t.items}}),e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("h4",{staticClass:"card-title"},[t._v("Range slider")]),e("p",{staticClass:"card-title-desc"},[t._v("Cool, comfortable, responsive and easily customizable range slider")]),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"p-3"},[e("h5",{staticClass:"font-size-14 mb-3 mt-0"},[t._v("Default")]),e("div",{staticClass:"px-3"},[e("vue-slide-bar",{model:{value:t.simpleValue,callback:function(e){t.simpleValue=e},expression:"simpleValue"}})],1)])]),e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"p-3"},[e("h5",{staticClass:"font-size-14 mb-3 mt-0"},[t._v("Min-Max")]),e("div",{staticClass:"px-3"},[e("vue-slide-bar",{attrs:{min:100,max:500},model:{value:t.sliderCustomzie,callback:function(e){t.sliderCustomzie=e},expression:"sliderCustomzie"}})],1)])])]),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"p-3"},[e("h5",{staticClass:"font-size-14 mb-3 mt-0"},[t._v("Range and Label")]),e("div",{staticClass:"px-3"},[e("vue-slide-bar",{attrs:{data:t.sliderWithLabel.data,range:t.sliderWithLabel.range},on:{callbackRange:t.callbackRange},model:{value:t.sliderWithLabel.value,callback:function(e){t.$set(t.sliderWithLabel,"value",e)},expression:"sliderWithLabel.value"}})],1)])]),e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"p-3"},[e("h5",{staticClass:"font-size-14 mb-3 mt-0"},[t._v("Loading")]),e("div",{staticClass:"px-3"},[e("vue-slide-bar",{attrs:{"show-tooltip":!0,"is-disabled":!0},model:{value:t.loadingValue,callback:function(e){t.loadingValue=e},expression:"loadingValue"}}),e("br"),e("b-button",{attrs:{size:"sm",variant:"light"},on:{click:t.startLoad}},[t._v("Start")])],1)])])]),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"p-3"},[e("h5",{staticClass:"font-size-14 mb-3 mt-0"},[t._v("Custom Style")]),e("div",{staticClass:"px-3"},[e("vue-slide-bar",{attrs:{min:100,max:1e3,"line-height":t.lineHeight},model:{value:t.customStyle,callback:function(e){t.customStyle=e},expression:"customStyle"}})],1)])]),e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"p-3"},[e("h5",{staticClass:"font-size-14 mb-3 mt-0"},[t._v("Custom Data")]),e("div",{staticClass:"px-3"},[e("vue-slide-bar",{attrs:{data:t.customData.data,range:t.customData.range}})],1)])])])])])])])],1)},a=[],n=i("b68d"),r=i.n(n),l=i("5658"),o=i("2579"),u=i("c2a4"),d={page:{title:"Range Slider",meta:[{name:"description",content:u.description}]},components:{VueSlideBar:r.a,Layout:l["a"],PageHeader:o["a"]},data(){return{title:"Range Slider",items:[{text:"UI Elements",href:"/"},{text:"Range Slider",active:!0}],simpleValue:10,sliderCustomzie:300,sliderWithLabel:{value:45,data:[15,30,45,60,75,90,120],range:[{label:"15 mins"},{label:"30 mins",isHide:!0},{label:"45 mins"},{label:"1 hr",isHide:!0},{label:"1 hr 15 mins"},{label:"1 hr 30 mins",isHide:!0},{label:"2 hrs"}],rangeValue:{}},customData:{value:3,data:[1,2,3,4,5,6,7],range:[{label:"Sunday"},{label:"Monday"},{label:"Tuesday"},{label:"Wednesday"},{label:"Thursday"},{label:"Friday"},{label:"Saturday"}]},loader:null,loadingValue:0,customStyle:800,lineHeight:10}},methods:{callbackRange(t){this.sliderWithLabel.rangeValue=t},startLoad(){this.loader=setInterval(()=>{this.loadingValue++,100===this.loadingValue&&clearInterval(this.loader)},100)}}},c=d,h=i("2877"),m=Object(h["a"])(c,s,a,!1,null,null,null);e["default"]=m.exports},b68d:function(t,e,i){
/*!
 * vue-slide-bar v1.2.0
 * (c) 2018-present biig_pongsatorn <biig_pongsatorn@hotmail.com>
 * Released under the MIT License.
 */
!function(e,i){t.exports=i()}(0,(function(){"use strict";function t(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function e(e){for(var i=1;i<arguments.length;i++){var s=null!=arguments[i]?arguments[i]:{},a=Object.keys(s);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(s).filter((function(t){return Object.getOwnPropertyDescriptor(s,t).enumerable})))),a.forEach((function(i){t(e,i,s[i])}))}return e}var i={name:"vue-slide-bar",data:function(){return{flag:!1,size:0,currentValue:0,currentSlider:0,isComponentExists:!0,interval:1,lazy:!1,realTime:!1,dataLabelStyles:e({color:"#4a4a4a","font-family":"Arial, sans-serif","font-size":"12px"},this.$props.labelStyles)}},props:{data:{type:Array,default:null},id:{type:String,default:"wrap"},range:{type:Array,default:null},speed:{type:Number,default:.5},lineHeight:{type:Number,default:5},iconWidth:{type:Number,default:20},value:{type:[String,Number],default:0},min:{type:Number,default:0},max:{type:Number,default:100},showTooltip:{type:Boolean,default:!0},isDisabled:{type:Boolean,default:!1},draggable:{type:Boolean,default:!0},paddingless:{type:Boolean,default:!1},tooltipStyles:Object,labelStyles:Object,processStyle:Object},computed:{slider:function(){return this.$refs.tooltip},val:{get:function(){return this.data?this.data[this.currentValue]:this.currentValue},set:function(t){if(this.data){var e=this.data.indexOf(t);e>-1&&(this.currentValue=e)}else this.currentValue=t}},currentIndex:function(){return(this.currentValue-this.minimum)/this.spacing},indexRange:function(){return[0,this.currentIndex]},minimum:function(){return this.data?0:this.min},maximum:function(){return this.data?this.data.length-1:this.max},multiple:function(){var t="".concat(this.interval).split(".")[1];return t?Math.pow(10,t.length):1},spacing:function(){return this.data?1:this.interval},total:function(){return this.data?this.data.length-1:(Math.floor((this.maximum-this.minimum)*this.multiple)%(this.interval*this.multiple)!=0&&this.printError("[VueSlideBar error]: Prop[interval] is illegal, Please make sure that the interval can be divisible"),(this.maximum-this.minimum)/this.interval)},gap:function(){return this.size/this.total},position:function(){return(this.currentValue-this.minimum)/this.spacing*this.gap},limit:function(){return[0,this.size]},valueLimit:function(){return[this.minimum,this.maximum]},calculateHeight:function(){return this.paddingless?{}:{"padding-top":"40px","min-height":this.range?"100px":null}}},watch:{value:function(t){this.flag?this.setValue(t):this.setValue(t,this.speed)},max:function(t){if(t<this.min)return this.printError("[VueSlideBar error]: The maximum value can not be less than the minimum value.");var e=this.limitValue(this.val);this.setValue(e),this.refresh()},min:function(t){if(t>this.max)return this.printError("[VueSlideBar error]: The minimum value can not be greater than the maximum value.");var e=this.limitValue(this.val);this.setValue(e),this.refresh()}},methods:{bindEvents:function(){document.addEventListener("touchmove",this.moving,{passive:!1}),document.addEventListener("touchend",this.moveEnd,{passive:!1}),document.addEventListener("mousemove",this.moving),document.addEventListener("mouseup",this.moveEnd),document.addEventListener("mouseleave",this.moveEnd),window.addEventListener("resize",this.refresh)},unbindEvents:function(){window.removeEventListener("resize",this.refresh),document.removeEventListener("touchmove",this.moving),document.removeEventListener("touchend",this.moveEnd),document.removeEventListener("mousemove",this.moving),document.removeEventListener("mouseup",this.moveEnd),document.removeEventListener("mouseleave",this.moveEnd)},getPos:function(t){return this.realTime&&this.getStaticData(),t.clientX-this.offset},wrapClick:function(t){if(this.isDisabled||!this.draggable&&t.target.id===this.id)return!1;var e=this.getPos(t);this.setValueOnPos(e)},moveStart:function(t,e){if(!this.draggable)return!1;this.flag=!0,this.$emit("dragStart",this)},moving:function(t){if(!this.flag||!this.draggable)return!1;t.preventDefault(),t.targetTouches&&t.targetTouches[0]&&(t=t.targetTouches[0]),this.setValueOnPos(this.getPos(t),!0)},moveEnd:function(t){if(!this.flag||!this.draggable)return!1;this.$emit("dragEnd",this),this.lazy&&this.isDiff(this.val,this.value)&&this.syncValue(),this.flag=!1,this.setPosition()},setValueOnPos:function(t,e){var i=this.limit,s=this.valueLimit;if(t>=i[0]&&t<=i[1]){this.setTransform(t);var a=(Math.round(t/this.gap)*(this.spacing*this.multiple)+this.minimum*this.multiple)/this.multiple;this.setCurrentValue(a,e)}else t<i[0]?(this.setTransform(i[0]),this.setCurrentValue(s[0]),1===this.currentSlider&&(this.currentSlider=0)):(this.setTransform(i[1]),this.setCurrentValue(s[1]),0===this.currentSlider&&(this.currentSlider=1))},isDiff:function(t,e){return Object.prototype.toString.call(t)!==Object.prototype.toString.call(e)||(Array.isArray(t)&&t.length===e.length?t.some((function(t,i){return t!==e[i]})):t!==e)},setCurrentValue:function(t,e){if(t<this.minimum||t>this.maximum)return!1;this.isDiff(this.currentValue,t)&&(this.currentValue=t,this.lazy&&this.flag||this.syncValue()),e||this.setPosition()},setIndex:function(t){t=this.spacing*t+this.minimum,this.setCurrentValue(t)},setValue:function(t,e){var i=this;if(this.isDiff(this.val,t)){var s=this.limitValue(t);this.val=s,this.syncValue()}this.$nextTick((function(){return i.setPosition(e)}))},setPosition:function(t){this.flag?this.setTransitionTime(0):this.setTransitionTime(void 0===t?this.speed:t),this.setTransform(this.position)},setTransform:function(t){var e=t-(this.$refs.tooltip.scrollWidth-2)/2,i="translateX(".concat(e,"px)");this.slider.style.transform=i,this.slider.style.WebkitTransform=i,this.slider.style.msTransform=i,this.$refs.process.style.width="".concat(t,"px"),this.$refs.process.style.left=0},setTransitionTime:function(t){this.slider.style.transitionDuration="".concat(t,"s"),this.slider.style.WebkitTransitionDuration="".concat(t,"s"),this.$refs.process.style.transitionDuration="".concat(t,"s"),this.$refs.process.style.WebkitTransitionDuration="".concat(t,"s")},limitValue:function(t){var e,i=this;return this.data?t:(e=t)<i.min?(i.printError("[VueSlideBar warn]: The value of the slider is ".concat(t,", the minimum value is ").concat(i.min,", the value of this slider can not be less than the minimum value")),i.min):e>i.max?(i.printError("[VueSlideBar warn]: The value of the slider is ".concat(t,", the maximum value is ").concat(i.max,", the value of this slider can not be greater than the maximum value")),i.max):e},syncValue:function(){var t=this.val;this.range&&this.$emit("callbackRange",this.range[this.currentIndex]),this.$emit("input",t)},getValue:function(){return this.val},getIndex:function(){return this.currentIndex},getStaticData:function(){this.$refs.elem&&(this.size=this.$refs.elem.offsetWidth,this.offset=this.$refs.elem.getBoundingClientRect().left)},refresh:function(){this.$refs.elem&&(this.getStaticData(),this.setPosition())},printError:function(t){console.error(t)}},mounted:function(){var t=this;if(this.isComponentExists=!0,"undefined"==typeof window||"undefined"==typeof document)return this.printError("[VueSlideBar error]: window or document is undefined, can not be initialization.");this.$nextTick((function(){t.isComponentExists&&(t.getStaticData(),t.setValue(t.limitValue(t.value),0),t.bindEvents())}))},beforeDestroy:function(){this.isComponentExists=!1,this.unbindEvents()}};const s="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase()),a=document.head||document.getElementsByTagName("head")[0],n={},r=i;return i.__file="index.vue",function(t,e,i,s,a,n,r,l,o,u){"function"==typeof r&&(o=l,l=r,r=!1);const d="function"==typeof i?i.options:i;let c;if(t&&t.render&&(d.render=t.render,d.staticRenderFns=t.staticRenderFns,d._compiled=!0,a&&(d.functional=!0)),s&&(d._scopeId=s),n?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),e&&e.call(this,o(t)),t&&t._registeredComponents&&t._registeredComponents.add(n)},d._ssrRegister=c):e&&(c=r?function(){e.call(this,u(this.$root.$options.shadowRoot))}:function(t){e.call(this,l(t))}),c)if(d.functional){const t=d.render;d.render=function(e,i){return c.call(i),t(e,i)}}else{const t=d.beforeCreate;d.beforeCreate=t?[].concat(t,c):[c]}return i}({render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"wrap",staticClass:"vue-slide-bar-component vue-slide-bar-horizontal",style:t.calculateHeight,attrs:{id:t.id},on:{click:t.wrapClick}},[i("div",{ref:"elem",staticClass:"vue-slide-bar",style:{height:t.lineHeight+"px"}},[[i("div",{ref:"tooltip",staticClass:"vue-slide-bar-always vue-slide-bar-tooltip-container",style:{width:t.iconWidth+"px"},on:{mousedown:t.moveStart,touchstart:t.moveStart}},[t.showTooltip?i("span",{staticClass:"vue-slide-bar-tooltip-top vue-slide-bar-tooltip-wrap"},[t._t("tooltip",[i("span",{staticClass:"vue-slide-bar-tooltip",style:t.tooltipStyles},[t._v("\n              "+t._s(t.val)+"\n            ")])])],2):t._e()])],t._v(" "),i("div",{ref:"process",staticClass:"vue-slide-bar-process",style:t.processStyle})],2),t._v(" "),t.range?i("div",{staticClass:"vue-slide-bar-range"},t._l(t.range,(function(e,s){return i("div",{key:s,staticClass:"vue-slide-bar-separate",style:t.dataLabelStyles},[e.isHide?t._e():i("span",{staticClass:"vue-slide-bar-separate-text"},[t._v("\n        "+t._s(e.label)+"\n      ")])])})),0):t._e()])},staticRenderFns:[]},(function(t){t&&t("data-v-d3e7b39a_0",{source:".vue-slide-bar-component[data-v-d3e7b39a]{position:relative;box-sizing:border-box;user-select:none}.vue-slide-bar[data-v-d3e7b39a]{position:relative;display:block;border-radius:15px;background-color:#d8d8d8;cursor:pointer}.vue-slide-bar[data-v-d3e7b39a]::after{content:'';position:absolute;left:0;top:0;width:100%;height:100%;z-index:2}.vue-slide-bar-process[data-v-d3e7b39a]{position:absolute;border-radius:15px;background-color:#1066fd;transition:all 0s;z-index:1;width:0;height:100%;top:0;left:0;will-change:width}.vue-slide-bar-tooltip-container[data-v-d3e7b39a]{position:absolute;transition:all 0s;will-change:transform;cursor:pointer;z-index:3;left:0;top:-16px}.vue-slide-bar-tooltip-wrap[data-v-d3e7b39a]{position:absolute;z-index:9;width:100%;height:100%;display:block!important}.vue-slide-bar-tooltip-top[data-v-d3e7b39a]{top:-12px;left:40%;transform:translate(-50%,-100%)}.vue-slide-bar-tooltip[data-v-d3e7b39a]{position:relative;font-size:14px;white-space:nowrap;padding:2px 5px;min-width:20px;text-align:center;color:#fff;border-radius:5px;border:1px solid #1066fd;background-color:#1066fd}.vue-slide-bar-tooltip[data-v-d3e7b39a]::before{content:'';position:absolute;bottom:-10px;left:50%;width:0;height:0;border:5px solid transparent;border-top-color:inherit;transform:translate(-50%,0)}.vue-slide-bar-range[data-v-d3e7b39a]{display:flex;padding:5px 0;justify-content:space-between}.vue-slide-bar-separate[data-v-d3e7b39a]{position:relative;width:2px;background-color:#9e9e9e;height:5px;cursor:pointer}.vue-slide-bar-separate-text[data-v-d3e7b39a]{text-align:center;position:absolute;white-space:nowrap;transform:translate(-50%,0);top:6px}",map:void 0,media:void 0})}),r,"data-v-d3e7b39a",!1,void 0,(function(t){return(t,e)=>function(t,e){const i=s?e.media||"default":t,r=n[i]||(n[i]={ids:new Set,styles:[]});if(!r.ids.has(t)){r.ids.add(t);let i=e.source;if(e.map&&(i+="\n/*# sourceURL="+e.map.sources[0]+" */",i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e.map))))+" */"),r.element||(r.element=document.createElement("style"),r.element.type="text/css",e.media&&r.element.setAttribute("media",e.media),a.appendChild(r.element)),"styleSheet"in r.element)r.styles.push(i),r.element.styleSheet.cssText=r.styles.filter(Boolean).join("\n");else{const t=r.ids.size-1,e=document.createTextNode(i),s=r.element.childNodes;s[t]&&r.element.removeChild(s[t]),s.length?r.element.insertBefore(e,s[t]):r.element.appendChild(e)}}}(t,e)}),void 0)}))}}]);
//# sourceMappingURL=chunk-2c6ed629.80ef4bf1.js.map