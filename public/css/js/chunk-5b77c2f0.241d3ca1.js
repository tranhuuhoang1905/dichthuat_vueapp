(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5b77c2f0"],{1331:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=(0,n.regex)("integer",/(^[0-9]*$)|(^-[0-9]+$)/);t.default=i},"2a12":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=function(e){return(0,n.withParams)({type:"maxLength",max:e},(function(t){return!(0,n.req)(t)||(0,n.len)(t)<=e}))};t.default=i},3360:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.withParams)({type:"and"},(function(){for(var e=this,r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];return t.length>0&&t.reduce((function(t,r){return t&&r.apply(e,n)}),!0)}))};t.default=i},"3a54":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=(0,n.regex)("alphaNum",/^[a-zA-Z0-9]*$/);t.default=i},"45b8":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=(0,n.regex)("numeric",/^[0-9]*$/);t.default=i},"46bc":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=function(e){return(0,n.withParams)({type:"maxValue",max:e},(function(t){return!(0,n.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t<=+e}))};t.default=i},"4d77":function(e,t,r){"use strict";r.d(t,"c",(function(){return i})),r.d(t,"b",(function(){return u})),r.d(t,"d",(function(){return a})),r.d(t,"a",(function(){return o})),r.d(t,"e",(function(){return l}));var n=r("2f62");Object(n["d"])("auth",{currentUser:e=>e.currentUser}),Object(n["c"])("auth",["loggedIn"]);const i={...Object(n["d"])("layout",{layoutType:e=>e.layoutType,leftSidebarType:e=>e.leftSidebarType,layoutWidth:e=>e.layoutWidth,topbar:e=>e.topbar,loader:e=>e.loader})},u=Object(n["b"])("auth",["logIn","logOut","register","resetPassword"]),a=Object(n["b"])("layout",["changeLayoutType","changeLayoutWidth","changeLeftSidebarType","changeTopbar","changeLoaderValue"]),o=Object(n["b"])("authfack",["login","registeruser","logout"]),l=Object(n["b"])("notification",["success","error","clear"])},"59da":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN0AAAAtCAYAAAAqVm4DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNEJBRURDMUUwN0JFQTExOTZDRTk5NjA5QkYxMUQ4NiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1MjYwOENBQTdDODcxMUVBQjg4MENDRDhCMkZCRTI5NSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MjYwOENBOTdDODcxMUVBQjg4MENDRDhCMkZCRTI5NSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxODRBM0RDMTY5N0NFQTExOTNDRUE1N0IzRjlCQkVDNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNEJBRURDMUUwN0JFQTExOTZDRTk5NjA5QkYxMUQ4NiIvPiA8L3JkZjpEZXNjcmlwdGlv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"},"5d75":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i,u=(0,n.regex)("email",i);t.default=u},"5db3":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=function(e){return(0,n.withParams)({type:"minLength",min:e},(function(t){return!(0,n.req)(t)||(0,n.len)(t)>=e}))};t.default=i},6235:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=(0,n.regex)("alpha",/^[a-zA-Z]*$/);t.default=i},6417:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=function(e){return(0,n.withParams)({type:"not"},(function(t,r){return!(0,n.req)(t)||!e.call(this,t,r)}))};t.default=i},"772d":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i,u=(0,n.regex)("url",i);t.default=u},"78ef":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.req=t.regex=t.ref=t.len=void 0,Object.defineProperty(t,"withParams",{enumerable:!0,get:function(){return n.default}});var n=i(r("8750"));function i(e){return e&&e.__esModule?e:{default:e}}function u(e){return u="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}var a=function(e){if(Array.isArray(e))return!!e.length;if(void 0===e||null===e)return!1;if(!1===e)return!0;if(e instanceof Date)return!isNaN(e.getTime());if("object"===u(e)){for(var t in e)return!0;return!1}return!!String(e).length};t.req=a;var o=function(e){return Array.isArray(e)?e.length:"object"===u(e)?Object.keys(e).length:String(e).length};t.len=o;var l=function(e,t,r){return"function"===typeof e?e.call(t,r):r[e]};t.ref=l;var c=function(e,t){return(0,n.default)({type:e},(function(e){return!a(e)||t.test(e)}))};t.regex=c},8750:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n="web"===Object({NODE_ENV:"production",VUE_APP_APIKEY:"",VUE_APP_APPId:"",VUE_APP_AUTHDOMAIN:"",VUE_APP_DATABASEURL:"",VUE_APP_DEFAULT_AUTH:"fack-backend",VUE_APP_I18N_FALLBACK_LOCALE:"en",VUE_APP_I18N_LOCALE:"en",VUE_APP_MEASUREMENTID:"",VUE_APP_MESSAGINGSENDERID:"",VUE_APP_PROJECTId:"",VUE_APP_STORAGEBUCKET:"",BASE_URL:"/"}).BUILD?r("cb69").withParams:r("0234").withParams,i=n;t.default=i},"91d3":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:":";return(0,n.withParams)({type:"macAddress"},(function(t){if(!(0,n.req)(t))return!0;if("string"!==typeof t)return!1;var r="string"===typeof e&&""!==e?t.split(e):12===t.length||16===t.length?t.match(/.{2}/g):null;return null!==r&&(6===r.length||8===r.length)&&r.every(u)}))};t.default=i;var u=function(e){return e.toLowerCase().match(/^[0-9a-f]{2}$/)}},aa82:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=function(e){return(0,n.withParams)({type:"requiredIf",prop:e},(function(t,r){return!(0,n.ref)(e,this,r)||(0,n.req)(t)}))};t.default=i},b5ae:function(e,t,r){"use strict";function n(e){return n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"alpha",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"alphaNum",{enumerable:!0,get:function(){return u.default}}),Object.defineProperty(t,"and",{enumerable:!0,get:function(){return g.default}}),Object.defineProperty(t,"between",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"decimal",{enumerable:!0,get:function(){return O.default}}),Object.defineProperty(t,"email",{enumerable:!0,get:function(){return l.default}}),t.helpers=void 0,Object.defineProperty(t,"integer",{enumerable:!0,get:function(){return w.default}}),Object.defineProperty(t,"ipAddress",{enumerable:!0,get:function(){return c.default}}),Object.defineProperty(t,"macAddress",{enumerable:!0,get:function(){return f.default}}),Object.defineProperty(t,"maxLength",{enumerable:!0,get:function(){return s.default}}),Object.defineProperty(t,"maxValue",{enumerable:!0,get:function(){return A.default}}),Object.defineProperty(t,"minLength",{enumerable:!0,get:function(){return d.default}}),Object.defineProperty(t,"minValue",{enumerable:!0,get:function(){return j.default}}),Object.defineProperty(t,"not",{enumerable:!0,get:function(){return P.default}}),Object.defineProperty(t,"numeric",{enumerable:!0,get:function(){return a.default}}),Object.defineProperty(t,"or",{enumerable:!0,get:function(){return h.default}}),Object.defineProperty(t,"required",{enumerable:!0,get:function(){return b.default}}),Object.defineProperty(t,"requiredIf",{enumerable:!0,get:function(){return m.default}}),Object.defineProperty(t,"requiredUnless",{enumerable:!0,get:function(){return y.default}}),Object.defineProperty(t,"sameAs",{enumerable:!0,get:function(){return p.default}}),Object.defineProperty(t,"url",{enumerable:!0,get:function(){return v.default}});var i=M(r("6235")),u=M(r("3a54")),a=M(r("45b8")),o=M(r("ec11")),l=M(r("5d75")),c=M(r("c99d")),f=M(r("91d3")),s=M(r("2a12")),d=M(r("5db3")),b=M(r("d4f4")),m=M(r("aa82")),y=M(r("e652")),p=M(r("b6cb")),v=M(r("772d")),h=M(r("d294")),g=M(r("3360")),P=M(r("6417")),j=M(r("eb66")),A=M(r("46bc")),w=M(r("1331")),O=M(r("c301")),_=R(r("78ef"));function x(e){if("function"!==typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(x=function(e){return e?r:t})(e)}function R(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!==n(e)&&"function"!==typeof e)return{default:e};var r=x(t);if(r&&r.has(e))return r.get(e);var i={},u=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var o=u?Object.getOwnPropertyDescriptor(e,a):null;o&&(o.get||o.set)?Object.defineProperty(i,a,o):i[a]=e[a]}return i.default=e,r&&r.set(e,i),i}function M(e){return e&&e.__esModule?e:{default:e}}t.helpers=_},b6cb:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=function(e){return(0,n.withParams)({type:"sameAs",eq:e},(function(t,r){return t===(0,n.ref)(e,this,r)}))};t.default=i},b9ec:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e._self._c;return t("div",[e._m(0),t("div",[t("div",{staticClass:"container-fluid p-0"},[t("div",{staticClass:"row no-gutters"},[t("div",{staticClass:"col-lg-4"},[t("div",{staticClass:"authentication-page-content p-4 d-flex align-items-center min-vh-100"},[t("div",{staticClass:"w-100"},[t("div",{staticClass:"row justify-content-center"},[t("div",{staticClass:"col-lg-9"},[t("div",[e._m(1),t("div",{staticClass:"p-2 mt-5"},[t("b-alert",{staticClass:"mb-4",attrs:{variant:"danger",dismissible:""},model:{value:e.isResetError,callback:function(t){e.isResetError=t},expression:"isResetError"}},[e._v(e._s(e.error))]),t("form",{staticClass:"form-horizontal",on:{submit:function(t){return t.preventDefault(),e.tryToReset.apply(null,arguments)}}},[t("div",{staticClass:"form-group auth-form-group-custom mb-4"},[t("i",{staticClass:"ri-mail-line auti-custom-input-icon"}),t("label",{attrs:{for:"useremail"}},[e._v("Email")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],staticClass:"form-control",class:{"is-invalid":e.submitted&&e.$v.email.$error},attrs:{type:"email",id:"useremail",placeholder:"Enter email"},domProps:{value:e.email},on:{input:function(t){t.target.composing||(e.email=t.target.value)}}}),e.submitted&&e.$v.email.$error?t("div",{staticClass:"invalid-feedback"},[e.$v.email.required?e._e():t("span",[e._v("Email is required.")]),e.$v.email.email?e._e():t("span",[e._v("Please enter valid email.")])]):e._e()]),e._m(2)])],1),t("div",{staticClass:"mt-5 text-center"},[t("p",[e._v(" Don't have an account ? "),t("router-link",{staticClass:"font-weight-medium text-primary",attrs:{tag:"a",to:"/login"}},[e._v("Log in")])],1),e._m(3)])])])])])])]),e._m(4)])])])])},i=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"home-btn d-none d-sm-block"},[t("a",{attrs:{href:"/"}},[t("i",{staticClass:"mdi mdi-home-variant h2 text-white"})])])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"text-center"},[t("div",[t("a",{staticClass:"logo",attrs:{href:"/"}},[t("img",{attrs:{src:r("59da"),height:"20",alt:"logo"}})])]),t("h4",{staticClass:"font-size-18 mt-4"},[e._v("Reset Password")]),t("p",{staticClass:"text-muted"},[e._v("Reset your password to Nazox.")])])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"mt-4 text-center"},[t("button",{staticClass:"btn btn-primary w-md waves-effect waves-light",attrs:{type:"submit"}},[e._v("Reset")])])},function(){var e=this,t=e._self._c;return t("p",[e._v(" © 2020 Nazox. Crafted with "),t("i",{staticClass:"mdi mdi-heart text-danger"}),e._v(" by Themesdesign ")])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"col-lg-8"},[t("div",{staticClass:"authentication-bg"},[t("div",{staticClass:"bg-overlay"})])])}],u=r("4d77"),a=r("b5ae"),o={data(){return{email:"",submitted:!1,error:null,tryingToReset:!1,isResetError:!1}},validations:{email:{required:a["required"],email:a["email"]}},created(){document.body.classList.add("auth-body-bg")},methods:{...u["b"],tryToReset(){this.submitted=!0,this.$v.$touch(),this.$v.$invalid}}},l=o,c=r("2877"),f=Object(c["a"])(l,n,i,!1,null,null,null);t["default"]=f.exports},c301:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=(0,n.regex)("decimal",/^[-]?\d*(\.\d+)?$/);t.default=i},c99d:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=(0,n.withParams)({type:"ipAddress"},(function(e){if(!(0,n.req)(e))return!0;if("string"!==typeof e)return!1;var t=e.split(".");return 4===t.length&&t.every(u)}));t.default=i;var u=function(e){if(e.length>3||0===e.length)return!1;if("0"===e[0]&&"0"!==e)return!1;if(!e.match(/^\d+$/))return!1;var t=0|+e;return t>=0&&t<=255}},cb69:function(e,t,r){"use strict";(function(e){function r(e){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.withParams=void 0;var n="undefined"!==typeof window?window:"undefined"!==typeof e?e:{},i=function(e,t){return"object"===r(e)&&void 0!==t?t:e((function(){}))},u=n.vuelidate?n.vuelidate.withParams:i;t.withParams=u}).call(this,r("c8ba"))},d294:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,n.withParams)({type:"or"},(function(){for(var e=this,r=arguments.length,n=new Array(r),i=0;i<r;i++)n[i]=arguments[i];return t.length>0&&t.reduce((function(t,r){return t||r.apply(e,n)}),!1)}))};t.default=i},d4f4:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=(0,n.withParams)({type:"required"},(function(e){return"string"===typeof e?(0,n.req)(e.trim()):(0,n.req)(e)}));t.default=i},e652:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=function(e){return(0,n.withParams)({type:"requiredUnless",prop:e},(function(t,r){return!!(0,n.ref)(e,this,r)||(0,n.req)(t)}))};t.default=i},eb66:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=function(e){return(0,n.withParams)({type:"minValue",min:e},(function(t){return!(0,n.req)(t)||(!/\s/.test(t)||t instanceof Date)&&+t>=+e}))};t.default=i},ec11:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r("78ef"),i=function(e,t){return(0,n.withParams)({type:"between",min:e,max:t},(function(r){return!(0,n.req)(r)||(!/\s/.test(r)||r instanceof Date)&&+e<=+r&&+t>=+r}))};t.default=i}}]);
//# sourceMappingURL=chunk-5b77c2f0.241d3ca1.js.map