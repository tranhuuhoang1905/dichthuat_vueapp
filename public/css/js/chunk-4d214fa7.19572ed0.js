(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d214fa7"],{1331:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=(0,a.regex)("integer",/(^[0-9]*$)|(^-[0-9]+$)/);t.default=i},"2a12":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=function(e){return(0,a.withParams)({type:"maxLength",max:e},(function(t){return!(0,a.req)(t)||(0,a.len)(t)<=e}))};t.default=i},3360:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,a.withParams)({type:"and"},(function(){for(var e=this,r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return t.length>0&&t.reduce((function(t,r){return t&&r.apply(e,a)}),!0)}))};t.default=i},"3a54":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=(0,a.regex)("alphaNum",/^[a-zA-Z0-9]*$/);t.default=i},"45b8":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=(0,a.regex)("numeric",/^[0-9]*$/);t.default=i},"46bc":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=function(e){return(0,a.withParams)({type:"maxValue",max:e},(function(t){return!(0,a.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t<=+e}))};t.default=i},"5d75":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i,o=(0,a.regex)("email",i);t.default=o},"5db3":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=function(e){return(0,a.withParams)({type:"minLength",min:e},(function(t){return!(0,a.req)(t)||(0,a.len)(t)>=e}))};t.default=i},6235:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=(0,a.regex)("alpha",/^[a-zA-Z]*$/);t.default=i},6417:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=function(e){return(0,a.withParams)({type:"not"},(function(t,r){return!(0,a.req)(t)||!e.call(this,t,r)}))};t.default=i},"772d":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i,o=(0,a.regex)("url",i);t.default=o},"78ef":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.req=t.regex=t.ref=t.len=void 0,Object.defineProperty(t,"withParams",{enumerable:!0,get:function(){return a.default}});var a=i(r("8750"));function i(e){return e&&e.__esModule?e:{default:e}}function o(e){return o="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}var n=function(e){if(Array.isArray(e))return!!e.length;if(void 0===e||null===e)return!1;if(!1===e)return!0;if(e instanceof Date)return!isNaN(e.getTime());if("object"===o(e)){for(var t in e)return!0;return!1}return!!String(e).length};t.req=n;var s=function(e){return Array.isArray(e)?e.length:"object"===o(e)?Object.keys(e).length:String(e).length};t.len=s;var l=function(e,t,r){return"function"===typeof e?e.call(t,r):r[e]};t.ref=l;var u=function(e,t){return(0,a.default)({type:e},(function(e){return!n(e)||t.test(e)}))};t.regex=u},8750:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a="web"===Object({NODE_ENV:"production",VUE_APP_APIKEY:"",VUE_APP_APPId:"",VUE_APP_AUTHDOMAIN:"",VUE_APP_DATABASEURL:"",VUE_APP_DEFAULT_AUTH:"fack-backend",VUE_APP_I18N_FALLBACK_LOCALE:"en",VUE_APP_I18N_LOCALE:"en",VUE_APP_MEASUREMENTID:"",VUE_APP_MESSAGINGSENDERID:"",VUE_APP_PROJECTId:"",VUE_APP_STORAGEBUCKET:"",BASE_URL:"/"}).BUILD?r("cb69").withParams:r("0234").withParams,i=a;t.default=i},"91d3":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:":";return(0,a.withParams)({type:"macAddress"},(function(t){if(!(0,a.req)(t))return!0;if("string"!==typeof t)return!1;var r="string"===typeof e&&""!==e?t.split(e):12===t.length||16===t.length?t.match(/.{2}/g):null;return null!==r&&(6===r.length||8===r.length)&&r.every(o)}))};t.default=i;var o=function(e){return e.toLowerCase().match(/^[0-9a-f]{2}$/)}},aa82:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=function(e){return(0,a.withParams)({type:"requiredIf",prop:e},(function(t,r){return!(0,a.ref)(e,this,r)||(0,a.req)(t)}))};t.default=i},b5ae:function(e,t,r){"use strict";function a(e){return a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a(e)}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"alpha",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"alphaNum",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"and",{enumerable:!0,get:function(){return _.default}}),Object.defineProperty(t,"between",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(t,"decimal",{enumerable:!0,get:function(){return P.default}}),Object.defineProperty(t,"email",{enumerable:!0,get:function(){return l.default}}),t.helpers=void 0,Object.defineProperty(t,"integer",{enumerable:!0,get:function(){return C.default}}),Object.defineProperty(t,"ipAddress",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(t,"macAddress",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(t,"maxLength",{enumerable:!0,get:function(){return m.default}}),Object.defineProperty(t,"maxValue",{enumerable:!0,get:function(){return x.default}}),Object.defineProperty(t,"minLength",{enumerable:!0,get:function(){return v.default}}),Object.defineProperty(t,"minValue",{enumerable:!0,get:function(){return $.default}}),Object.defineProperty(t,"not",{enumerable:!0,get:function(){return h.default}}),Object.defineProperty(t,"numeric",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(t,"or",{enumerable:!0,get:function(){return y.default}}),Object.defineProperty(t,"required",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"requiredIf",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(t,"requiredUnless",{enumerable:!0,get:function(){return p.default}}),Object.defineProperty(t,"sameAs",{enumerable:!0,get:function(){return b.default}}),Object.defineProperty(t,"url",{enumerable:!0,get:function(){return g.default}});var i=j(r("6235")),o=j(r("3a54")),n=j(r("45b8")),s=j(r("ec11")),l=j(r("5d75")),u=j(r("c99d")),d=j(r("91d3")),m=j(r("2a12")),v=j(r("5db3")),c=j(r("d4f4")),f=j(r("aa82")),p=j(r("e652")),b=j(r("b6cb")),g=j(r("772d")),y=j(r("d294")),_=j(r("3360")),h=j(r("6417")),$=j(r("eb66")),x=j(r("46bc")),C=j(r("1331")),P=j(r("c301")),w=O(r("78ef"));function q(e){if("function"!==typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(q=function(e){return e?r:t})(e)}function O(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==a(e)&&"function"!==typeof e)return{default:e};var r=q(t);if(r&&r.has(e))return r.get(e);var i={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var n in e)if("default"!==n&&Object.prototype.hasOwnProperty.call(e,n)){var s=o?Object.getOwnPropertyDescriptor(e,n):null;s&&(s.get||s.set)?Object.defineProperty(i,n,s):i[n]=e[n]}return i.default=e,r&&r.set(e,i),i}function j(e){return e&&e.__esModule?e:{default:e}}t.helpers=w},b6cb:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=function(e){return(0,a.withParams)({type:"sameAs",eq:e},(function(t,r){return t===(0,a.ref)(e,this,r)}))};t.default=i},c301:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=(0,a.regex)("decimal",/^[-]?\d*(\.\d+)?$/);t.default=i},c99d:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=(0,a.withParams)({type:"ipAddress"},(function(e){if(!(0,a.req)(e))return!0;if("string"!==typeof e)return!1;var t=e.split(".");return 4===t.length&&t.every(o)}));t.default=i;var o=function(e){if(e.length>3||0===e.length)return!1;if("0"===e[0]&&"0"!==e)return!1;if(!e.match(/^\d+$/))return!1;var t=0|+e;return t>=0&&t<=255}},cb69:function(e,t,r){"use strict";(function(e){function r(e){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.withParams=void 0;var a="undefined"!==typeof window?window:"undefined"!==typeof e?e:{},i=function(e,t){return"object"===r(e)&&void 0!==t?t:e((function(){}))},o=a.vuelidate?a.vuelidate.withParams:i;t.withParams=o}).call(this,r("c8ba"))},cd6d:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e._self._c;return t("Layout",[t("PageHeader",{attrs:{title:e.title,items:e.items}}),t("div",{staticClass:"row"},[t("div",{staticClass:"col-lg-6"},[t("div",{staticClass:"card"},[t("div",{staticClass:"card-body"},[t("h4",{staticClass:"card-title"},[e._v("Bootstrap Validation - Normal")]),t("p",{staticClass:"card-title-desc"},[e._v("Provide valuable, actionable feedback to your users with HTML5 form validation–available in all our supported browsers.")]),t("form",{staticClass:"needs-validation",on:{submit:function(t){return t.preventDefault(),e.formSubmit.apply(null,arguments)}}},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-6"},[t("div",{staticClass:"form-group"},[t("label",{attrs:{for:"validationCustom01"}},[e._v("First name")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.fname,expression:"form.fname"}],staticClass:"form-control",class:{"is-invalid":e.submitted&&e.$v.form.fname.$error},attrs:{id:"validationCustom01",type:"text",placeholder:"First name",value:"Mark"},domProps:{value:e.form.fname},on:{input:function(t){t.target.composing||e.$set(e.form,"fname",t.target.value)}}}),e.submitted&&e.$v.form.fname.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.form.fname.required?e._e():t("span",[e._v("This value is required.")])]):e._e()])]),t("div",{staticClass:"col-md-6"},[t("div",{staticClass:"form-group"},[t("label",{attrs:{for:"validationCustom02"}},[e._v("Last name")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.lname,expression:"form.lname"}],staticClass:"form-control",class:{"is-invalid":e.submitted&&e.$v.form.lname.$error},attrs:{id:"validationCustom02",type:"text",placeholder:"Last name",value:"Otto"},domProps:{value:e.form.lname},on:{input:function(t){t.target.composing||e.$set(e.form,"lname",t.target.value)}}}),e.submitted&&e.$v.form.lname.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.form.lname.required?e._e():t("span",[e._v("This value is required.")])]):e._e()])])]),t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-4"},[t("div",{staticClass:"form-group"},[t("label",{attrs:{for:"validationCustom03"}},[e._v("City")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.city,expression:"form.city"}],staticClass:"form-control",class:{"is-invalid":e.submitted&&e.$v.form.city.$error},attrs:{id:"validationCustom03",type:"text",placeholder:"City"},domProps:{value:e.form.city},on:{input:function(t){t.target.composing||e.$set(e.form,"city",t.target.value)}}}),e.submitted&&e.$v.form.city.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.form.city.required?e._e():t("span",[e._v("This value is required.")])]):e._e()])]),t("div",{staticClass:"col-md-4"},[t("div",{staticClass:"form-group"},[t("label",{attrs:{for:"validationCustom04"}},[e._v("State")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.state,expression:"form.state"}],staticClass:"form-control",class:{"is-invalid":e.submitted&&e.$v.form.state.$error},attrs:{id:"validationCustom04",type:"text",placeholder:"State"},domProps:{value:e.form.state},on:{input:function(t){t.target.composing||e.$set(e.form,"state",t.target.value)}}}),e.submitted&&e.$v.form.state.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.form.state.required?e._e():t("span",[e._v("This value is required.")])]):e._e()])]),t("div",{staticClass:"col-md-4"},[t("div",{staticClass:"form-group"},[t("label",{attrs:{for:"validationCustom05"}},[e._v("Zip")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.form.zipcode,expression:"form.zipcode"}],staticClass:"form-control",class:{"is-invalid":e.submitted&&e.$v.form.zipcode.$error},attrs:{id:"validationCustom05",type:"text",placeholder:"Zip"},domProps:{value:e.form.zipcode},on:{input:function(t){t.target.composing||e.$set(e.form,"zipcode",t.target.value)}}}),e.submitted&&e.$v.form.zipcode.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.form.zipcode.required?e._e():t("span",[e._v("This value is required.")])]):e._e()])])]),t("div",{staticClass:"row"},[t("div",{staticClass:"col-lg-12"},[t("div",{staticClass:"form-group"},[t("div",{staticClass:"custom-control custom-checkbox"},[t("input",{staticClass:"custom-control-input",attrs:{id:"invalidCheck",type:"checkbox"}}),t("label",{staticClass:"custom-control-label",attrs:{for:"invalidCheck"}},[e._v("Agree to terms and conditions")]),t("div",{staticClass:"invalid-feedback"},[e._v("You must agree before submitting.")])])])])]),t("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v("Submit form")])])])])]),t("div",{staticClass:"col-lg-6"},[t("div",{staticClass:"card"},[t("div",{staticClass:"card-body"},[t("h4",{staticClass:"card-title"},[e._v("Bootstrap Validation (Tooltips)")]),t("p",{staticClass:"card-title-desc"},[e._v(" If your form layout allows it, you can swap the "),t("code",[e._v(".{valid|invalid}-feedback")]),e._v(" classes for "),t("code",[e._v(".{valid|invalid}-tooltip")]),e._v(" classes to display validation feedback in a styled tooltip. ")]),t("form",{staticClass:"needs-validation",on:{submit:function(t){return t.preventDefault(),e.tooltipForm.apply(null,arguments)}}},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-4"},[t("div",{staticClass:"form-group position-relative"},[t("label",{attrs:{for:"validationTooltip01"}},[e._v("First name")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.tooltipform.fname,expression:"tooltipform.fname"}],staticClass:"form-control",class:{"is-invalid":e.submitform&&e.$v.tooltipform.fname.$error},attrs:{id:"validationTooltip01",type:"text",placeholder:"First name",value:"Mark"},domProps:{value:e.tooltipform.fname},on:{input:function(t){t.target.composing||e.$set(e.tooltipform,"fname",t.target.value)}}}),e.submitform&&e.$v.tooltipform.fname.$error?t("div",{staticClass:"invalid-tooltip"},[e.$v.tooltipform.fname.required?e._e():t("span",[e._v("Please provide valid First name.")])]):e._e()])]),t("div",{staticClass:"col-md-4"},[t("div",{staticClass:"form-group position-relative"},[t("label",{attrs:{for:"validationTooltip02"}},[e._v("Last name")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.tooltipform.lname,expression:"tooltipform.lname"}],staticClass:"form-control",class:{"is-invalid":e.submitform&&e.$v.tooltipform.lname.$error},attrs:{id:"validationTooltip02",type:"text",placeholder:"Last name",value:"Otto"},domProps:{value:e.tooltipform.lname},on:{input:function(t){t.target.composing||e.$set(e.tooltipform,"lname",t.target.value)}}}),e.submitform&&e.$v.tooltipform.lname.$error?t("div",{staticClass:"invalid-tooltip"},[e.$v.tooltipform.lname.required?e._e():t("span",[e._v("Please provide valid Last name.")])]):e._e()])]),t("div",{staticClass:"col-md-4"},[t("div",{staticClass:"form-group position-relative"},[t("label",{attrs:{for:"validationTooltipUsername"}},[e._v("Username")]),t("div",{staticClass:"input-group"},[t("div",{staticClass:"input-group-prepend"},[t("span",{staticClass:"input-group-text",attrs:{id:"validationTooltipUsernamePrepend"}},[e._v("@")])]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.tooltipform.username,expression:"tooltipform.username"}],staticClass:"form-control",class:{"is-invalid":e.submitform&&e.$v.tooltipform.username.$error},attrs:{id:"validationTooltipUsername",type:"text",placeholder:"Username","aria-describedby":"validationTooltipUsernamePrepend"},domProps:{value:e.tooltipform.username},on:{input:function(t){t.target.composing||e.$set(e.tooltipform,"username",t.target.value)}}}),e.submitform&&e.$v.tooltipform.username.$error?t("div",{staticClass:"invalid-tooltip"},[e.$v.tooltipform.username.required?e._e():t("span",[e._v("Please choose a unique and valid username.")])]):e._e()])])])]),t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-6"},[t("div",{staticClass:"form-group position-relative"},[t("label",{attrs:{for:"validationTooltip03"}},[e._v("City")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.tooltipform.city,expression:"tooltipform.city"}],staticClass:"form-control",class:{"is-invalid":e.submitform&&e.$v.tooltipform.city.$error},attrs:{id:"validationTooltip03",type:"text",placeholder:"City"},domProps:{value:e.tooltipform.city},on:{input:function(t){t.target.composing||e.$set(e.tooltipform,"city",t.target.value)}}}),e.submitform&&e.$v.tooltipform.city.$error?t("div",{staticClass:"invalid-tooltip"},[e.$v.tooltipform.city.required?e._e():t("span",[e._v("Please provide a valid city.")])]):e._e()])]),t("div",{staticClass:"col-md-6"},[t("div",{staticClass:"form-group position-relative"},[t("label",{attrs:{for:"validationTooltip04"}},[e._v("State")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.tooltipform.state,expression:"tooltipform.state"}],staticClass:"form-control",class:{"is-invalid":e.submitform&&e.$v.tooltipform.state.$error},attrs:{id:"validationTooltip04",type:"text",placeholder:"State"},domProps:{value:e.tooltipform.state},on:{input:function(t){t.target.composing||e.$set(e.tooltipform,"state",t.target.value)}}}),e.submitform&&e.$v.tooltipform.state.$error?t("div",{staticClass:"invalid-tooltip"},[e.$v.tooltipform.state.required?e._e():t("span",[e._v("Please provide a valid state.")])]):e._e()])])]),t("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v("Submit form")])])])])])]),t("div",{staticClass:"row"},[t("div",{staticClass:"col-lg-6"},[t("div",{staticClass:"card"},[t("div",{staticClass:"card-body"},[t("h4",{staticClass:"card-title"},[e._v("Validation type")]),t("p",{staticClass:"card-title-desc"},[e._v(" Parsley is a javascript form validation library. It helps you provide your users with feedback on their form submission before sending it to your server. ")]),t("form",{attrs:{action:"#"},on:{submit:function(t){return t.preventDefault(),e.typeForm.apply(null,arguments)}}},[t("div",{staticClass:"form-group"},[t("label",[e._v("Required")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.typeform.name,expression:"typeform.name"}],staticClass:"form-control",class:{"is-invalid":e.typesubmit&&e.$v.typeform.name.$error},attrs:{type:"text",placeholder:"Type something",name:"name"},domProps:{value:e.typeform.name},on:{input:function(t){t.target.composing||e.$set(e.typeform,"name",t.target.value)}}}),e.typesubmit&&e.$v.typeform.name.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.typeform.name.required?e._e():t("span",[e._v("This value is required.")])]):e._e()]),t("div",{staticClass:"form-group"},[t("label",[e._v("Equal To")]),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.typeform.password,expression:"typeform.password"}],staticClass:"form-control",class:{"is-invalid":e.typesubmit&&e.$v.typeform.password.$error},attrs:{type:"password",name:"password",placeholder:"Password"},domProps:{value:e.typeform.password},on:{input:function(t){t.target.composing||e.$set(e.typeform,"password",t.target.value)}}}),e.typesubmit&&e.$v.typeform.password.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.typeform.password.required?e._e():t("span",[e._v("This value is required.")]),e.$v.typeform.password.minLength?e._e():t("span",[e._v("Password must be at least 6 characters.")])]):e._e()]),t("div",{staticClass:"mt-2"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.typeform.confirmPassword,expression:"typeform.confirmPassword"}],staticClass:"form-control",class:{"is-invalid":e.typesubmit&&e.$v.typeform.confirmPassword.$error},attrs:{type:"password",name:"confirmPassword",placeholder:"Re-Type Password"},domProps:{value:e.typeform.confirmPassword},on:{input:function(t){t.target.composing||e.$set(e.typeform,"confirmPassword",t.target.value)}}}),e.typesubmit&&e.$v.typeform.confirmPassword.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.typeform.confirmPassword.required?e.$v.typeform.confirmPassword.sameAsPassword?e._e():t("span",[e._v("This value should be the same.")]):t("span",[e._v("This value is required.")])]):e._e()])]),t("div",{staticClass:"form-group"},[t("label",[e._v("E-Mail")]),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.typeform.email,expression:"typeform.email"}],staticClass:"form-control",class:{"is-invalid":e.typesubmit&&e.$v.typeform.email.$error},attrs:{type:"email",name:"email",placeholder:"Enter a valid e-mail"},domProps:{value:e.typeform.email},on:{input:function(t){t.target.composing||e.$set(e.typeform,"email",t.target.value)}}}),e.typesubmit&&e.$v.typeform.email.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.typeform.email.required?e._e():t("span",[e._v("This value is required.")]),e.$v.typeform.email.email?e._e():t("span",[e._v("This value should be a valid email.")])]):e._e()])]),t("div",{staticClass:"form-group"},[t("label",[e._v("URL")]),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.typeform.url,expression:"typeform.url"}],staticClass:"form-control",class:{"is-invalid":e.typesubmit&&e.$v.typeform.url.$error},attrs:{type:"url",name:"url",placeholder:"URL"},domProps:{value:e.typeform.url},on:{input:function(t){t.target.composing||e.$set(e.typeform,"url",t.target.value)}}}),e.typesubmit&&e.$v.typeform.url.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.typeform.url.required?e._e():t("span",[e._v("This value is required.")]),e.$v.typeform.url.url?e._e():t("span",[e._v("This value should be a valid url.")])]):e._e()])]),t("div",{staticClass:"form-group"},[t("label",[e._v("Digits")]),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.typeform.digit,expression:"typeform.digit"}],staticClass:"form-control",class:{"is-invalid":e.typesubmit&&e.$v.typeform.digit.$error},attrs:{type:"text",name:"digit",placeholder:"Enter only digits"},domProps:{value:e.typeform.digit},on:{input:function(t){t.target.composing||e.$set(e.typeform,"digit",t.target.value)}}}),e.typesubmit&&e.$v.typeform.digit.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.typeform.digit.required?e._e():t("span",[e._v("This value is required.")]),e.$v.typeform.digit.numeric?e._e():t("span",[e._v("This value should be digits.")])]):e._e()])]),t("div",{staticClass:"form-group"},[t("label",[e._v("Number")]),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.typeform.number,expression:"typeform.number"}],staticClass:"form-control",class:{"is-invalid":e.typesubmit&&e.$v.typeform.number.$error},attrs:{type:"text",name:"number",placeholder:"Enter only numbers"},domProps:{value:e.typeform.number},on:{input:function(t){t.target.composing||e.$set(e.typeform,"number",t.target.value)}}}),e.typesubmit&&e.$v.typeform.number.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.typeform.number.required?e._e():t("span",[e._v("This value is required.")]),e.$v.typeform.number.numeric?e._e():t("span",[e._v("This value should be a valid number.")])]):e._e()])]),t("div",{staticClass:"form-group"},[t("label",[e._v("Alphanumeric")]),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.typeform.alphanum,expression:"typeform.alphanum"}],staticClass:"form-control",class:{"is-invalid":e.typesubmit&&e.$v.typeform.alphanum.$error},attrs:{type:"text",name:"alphanum",placeholder:"Enter alphanumeric value"},domProps:{value:e.typeform.alphanum},on:{input:function(t){t.target.composing||e.$set(e.typeform,"alphanum",t.target.value)}}}),e.typesubmit&&e.$v.typeform.alphanum.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.typeform.alphanum.required?e._e():t("span",[e._v("This value is required.")]),e.$v.typeform.alphanum.alphaNum?e._e():t("span",[e._v("This value should be alphanumeric.")])]):e._e()])]),t("div",{staticClass:"form-group"},[t("label",[e._v("Textarea")]),t("div",[t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.typeform.textarea,expression:"typeform.textarea"}],staticClass:"form-control",class:{"is-invalid":e.typesubmit&&e.$v.typeform.textarea.$error},attrs:{name:"textarea",rows:"5"},domProps:{value:e.typeform.textarea},on:{input:function(t){t.target.composing||e.$set(e.typeform,"textarea",t.target.value)}}}),e.typesubmit&&e.$v.typeform.textarea.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.typeform.textarea.required?e._e():t("span",[e._v("This value is required.")])]):e._e()])]),t("div",{staticClass:"form-group mb-0"},[t("div",[t("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v("Submit")]),t("button",{staticClass:"btn btn-secondary m-l-5 ml-1",attrs:{type:"reset"}},[e._v("Cancel")])])])])])])]),t("div",{staticClass:"col-lg-6"},[t("div",{staticClass:"card"},[t("div",{staticClass:"card-body"},[t("h4",{staticClass:"card-title"},[e._v("Range validation")]),t("p",{staticClass:"card-title-desc"},[e._v(" Parsley is a javascript form validation library. It helps you provide your users with feedback on their form submission before sending it to your server. ")]),t("form",{attrs:{action:"#"},on:{submit:function(t){return t.preventDefault(),e.rangeform.apply(null,arguments)}}},[t("div",{staticClass:"form-group"},[t("label",[e._v("Min Length")]),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.range.minlen,expression:"range.minlen"}],staticClass:"form-control",class:{"is-invalid":e.submit&&e.$v.range.minlen.$error},attrs:{type:"text",name:"minlen",placeholder:"Min 6 chars."},domProps:{value:e.range.minlen},on:{input:function(t){t.target.composing||e.$set(e.range,"minlen",t.target.value)}}}),e.submit&&e.$v.range.minlen.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.range.minlen.required?e._e():t("span",[e._v("This value is required.")]),e.$v.range.minlen.minLength?e._e():t("span",[e._v("This value is too short. It should have 6 characters or more.")])]):e._e()])]),t("div",{staticClass:"form-group"},[t("label",[e._v("Max Length")]),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.range.maxlength,expression:"range.maxlength"}],staticClass:"form-control",class:{"is-invalid":e.submit&&e.$v.range.maxlength.$error},attrs:{type:"text",name:"maxlength",placeholder:"Max 6 chars."},domProps:{value:e.range.maxlength},on:{input:function(t){t.target.composing||e.$set(e.range,"maxlength",t.target.value)}}}),e.submit&&e.$v.range.maxlength.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.range.maxlength.required?e._e():t("span",[e._v("This value is required.")]),e.$v.range.maxlength.maxLength?e._e():t("span",[e._v("This value is too long. It should have 6 characters or fewer.")])]):e._e()])]),t("div",{staticClass:"form-group"},[t("label",[e._v("Range Length")]),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.range.between,expression:"range.between"}],staticClass:"form-control",class:{"is-invalid":e.submit&&e.$v.range.between.$error},attrs:{type:"text",name:"between",placeholder:"Text between 5 - 10 chars length"},domProps:{value:e.range.between},on:{input:function(t){t.target.composing||e.$set(e.range,"between",t.target.value)}}}),e.submit&&e.$v.range.between.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.range.between.required?e._e():t("span",[e._v("This value is required.")]),e.$v.range.between.maxLength?e._e():t("span",[e._v("This value length is invalid. It should be between 5 and 10 characters long.")]),e.$v.range.between.minLength?e._e():t("span",[e._v("This value length is invalid. It should be between 5 and 10 characters long.")])]):e._e()])]),t("div",{staticClass:"form-group"},[t("label",[e._v("Min Value")]),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.range.minval,expression:"range.minval"}],staticClass:"form-control",class:{"is-invalid":e.submit&&e.$v.range.minval.$error},attrs:{type:"text",name:"minval",placeholder:"Min value is 6"},domProps:{value:e.range.minval},on:{input:function(t){t.target.composing||e.$set(e.range,"minval",t.target.value)}}}),e.submit&&e.$v.range.minval.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.range.minval.required?e._e():t("span",[e._v("This value is required.")]),e.$v.range.minval.minValue?e._e():t("span",[e._v("This value should be greater than or equal to 6.")])]):e._e()])]),t("div",{staticClass:"form-group"},[t("label",[e._v("Max Value")]),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.range.maxval,expression:"range.maxval"}],staticClass:"form-control",class:{"is-invalid":e.submit&&e.$v.range.maxval.$error},attrs:{type:"text",name:"maxval",placeholder:"Max value is 6"},domProps:{value:e.range.maxval},on:{input:function(t){t.target.composing||e.$set(e.range,"maxval",t.target.value)}}}),e.submit&&e.$v.range.maxval.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.range.maxval.required?e._e():t("span",[e._v("This value is required.")]),e.$v.range.maxval.maxValue?e._e():t("span",[e._v("This value should be lower than or equal to 6.")])]):e._e()])]),t("div",{staticClass:"form-group"},[t("label",[e._v("Range Value")]),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.range.rangeval,expression:"range.rangeval"}],staticClass:"form-control",class:{"is-invalid":e.submit&&e.$v.range.rangeval.$error},attrs:{type:"text",name:"rangeval",placeholder:"Number between 6 - 100"},domProps:{value:e.range.rangeval},on:{input:function(t){t.target.composing||e.$set(e.range,"rangeval",t.target.value)}}}),e.submit&&e.$v.range.rangeval.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.range.rangeval.required?e._e():t("span",[e._v("This value is required.")]),e.$v.range.rangeval.minValue?e._e():t("span",[e._v("This value should be between 6 and 100.")]),e.$v.range.rangeval.maxValue?e._e():t("span",[e._v("This value should be between 6 and 100.")])]):e._e()])]),t("div",{staticClass:"form-group"},[t("label",[e._v("Regular Exp")]),t("div",[t("input",{directives:[{name:"model",rawName:"v-model",value:e.range.expr,expression:"range.expr"}],staticClass:"form-control",class:{"is-invalid":e.submit&&e.$v.range.expr.$error},attrs:{type:"text",name:"expr",placeholder:"Hex. Color"},domProps:{value:e.range.expr},on:{input:function(t){t.target.composing||e.$set(e.range,"expr",t.target.value)}}}),e.submit&&e.$v.range.expr.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.range.expr.required?e._e():t("span",[e._v("This value is required.")])]):e._e()])]),t("div",{staticClass:"form-group mb-0"},[t("div",[t("button",{staticClass:"btn btn-primary",attrs:{type:"submit"}},[e._v("Submit")]),t("button",{staticClass:"btn btn-secondary m-l-5 ml-1",attrs:{type:"reset"}},[e._v("Cancel")])])])])])])])])],1)},i=[],o=r("5658"),n=r("2579"),s=r("c2a4"),l=r("b5ae"),u={page:{title:"Form Validation",meta:[{name:"description",content:s.description}]},components:{Layout:o["a"],PageHeader:n["a"]},data(){return{title:"Form Validation",items:[{text:"Forms",href:"/"},{text:"Validation",active:!0}],form:{fname:"",lname:"",city:"",state:"",zipcode:""},tooltipform:{fname:"",lname:"",username:"",city:"",state:""},range:{minlen:"",maxlength:"",between:"",minval:"",maxval:"",rangeval:"",expr:""},typeform:{name:"",password:"",confirmPassword:"",email:"",url:"",digit:"",number:"",alphanum:"",textarea:""},submitted:!1,submitform:!1,submit:!1,typesubmit:!1}},validations:{form:{fname:{required:l["required"]},lname:{required:l["required"]},city:{required:l["required"]},state:{required:l["required"]},zipcode:{required:l["required"]}},tooltipform:{fname:{required:l["required"]},lname:{required:l["required"]},username:{required:l["required"]},city:{required:l["required"]},state:{required:l["required"]}},range:{minlen:{required:l["required"],minLength:Object(l["minLength"])(6)},maxlength:{required:l["required"],maxLength:Object(l["maxLength"])(6)},between:{required:l["required"],minLength:Object(l["minLength"])(5),maxLength:Object(l["maxLength"])(10)},minval:{required:l["required"],minValue:Object(l["minValue"])(6)},maxval:{required:l["required"],maxValue:Object(l["maxValue"])(6)},rangeval:{required:l["required"],minValue:Object(l["minValue"])(6),maxValue:Object(l["maxValue"])(100)},expr:{required:l["required"]}},typeform:{name:{required:l["required"]},password:{required:l["required"],minLength:Object(l["minLength"])(6)},confirmPassword:{required:l["required"],sameAsPassword:Object(l["sameAs"])("password")},email:{required:l["required"],email:l["email"]},url:{required:l["required"],url:l["url"]},digit:{required:l["required"],numeric:l["numeric"]},number:{required:l["required"],numeric:l["numeric"]},alphanum:{required:l["required"],alphaNum:l["alphaNum"]},textarea:{required:l["required"]}}},methods:{formSubmit(e){this.submitted=!0,this.$v.$touch()},tooltipForm(){this.submitform=!0,this.$v.$touch()},rangeform(e){this.submit=!0,this.$v.$touch()},typeForm(e){this.typesubmit=!0,this.$v.$touch()}}},d=u,m=r("2877"),v=Object(m["a"])(d,a,i,!1,null,null,null);t["default"]=v.exports},d294:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,a.withParams)({type:"or"},(function(){for(var e=this,r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return t.length>0&&t.reduce((function(t,r){return t||r.apply(e,a)}),!1)}))};t.default=i},d4f4:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=(0,a.withParams)({type:"required"},(function(e){return"string"===typeof e?(0,a.req)(e.trim()):(0,a.req)(e)}));t.default=i},e652:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=function(e){return(0,a.withParams)({type:"requiredUnless",prop:e},(function(t,r){return!!(0,a.ref)(e,this,r)||(0,a.req)(t)}))};t.default=i},eb66:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=function(e){return(0,a.withParams)({type:"minValue",min:e},(function(t){return!(0,a.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t>=+e}))};t.default=i},ec11:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r("78ef"),i=function(e,t){return(0,a.withParams)({type:"between",min:e,max:t},(function(r){return!(0,a.req)(r)||(!/\s/.test(r)||r instanceof Date)&&+e<=+r&&+t>=+r}))};t.default=i}}]);
//# sourceMappingURL=chunk-4d214fa7.19572ed0.js.map