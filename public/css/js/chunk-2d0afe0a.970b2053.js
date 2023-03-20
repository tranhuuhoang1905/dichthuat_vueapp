(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0afe0a"],{"0fca":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t._self._c;return e("Layout",[e("PageHeader",{attrs:{title:t.title,items:t.items}}),e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("h4",{staticClass:"card-title"},[t._v("Examples")]),e("p",{staticClass:"card-title-desc"},[t._v(" A beautiful, responsive, customizable and accessible (WAI-ARIA) replacement for JavaScript's popup boxes. Zero dependencies. ")]),e("div",{staticClass:"row text-center"},[e("div",{staticClass:"col-xl-3 col-lg-4 col-sm-6 mb-2"},[e("div",{staticClass:"p-3"},[e("p",[t._v("A basic message")]),e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.showAlert}},[t._v("Click me")])])]),e("div",{staticClass:"col-xl-3 col-lg-4 col-sm-6 mb-2"},[e("div",{staticClass:"p-3"},[e("p",[t._v("A title with a text under")]),e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.titleText}},[t._v("Click me")])])]),e("div",{staticClass:"col-xl-3 col-lg-4 col-sm-6 mb-2"},[e("div",{staticClass:"p-3"},[e("p",[t._v("A success message!")]),e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.successmsg}},[t._v("Click me")])])]),e("div",{staticClass:"col-xl-3 col-lg-4 col-sm-6 mb-2"},[e("div",{staticClass:"p-3"},[e("p",[t._v('A warning message, with a function attached to the "Confirm"-button...')]),e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.confirm}},[t._v("Click me")])])]),e("div",{staticClass:"col-xl-3 col-lg-4 col-sm-6 mb-2"},[e("div",{staticClass:"p-3"},[e("p",[t._v('By passing a parameter, you can execute something else for "Cancel".')]),e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.cancel}},[t._v("Click me")])])]),e("div",{staticClass:"col-xl-3 col-lg-4 col-sm-6 mb-2"},[e("div",{staticClass:"p-3"},[e("p",[t._v("A message with custom Image Header")]),e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.imageHeader}},[t._v("Click me")])])]),e("div",{staticClass:"col-xl-3 col-lg-4 col-sm-6 mb-2"},[e("div",{staticClass:"p-3"},[e("p",[t._v("A message with auto close timer")]),e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.timer}},[t._v("Click me")])])]),e("div",{staticClass:"col-xl-3 col-lg-4 col-sm-6 mb-2"},[e("div",{staticClass:"p-3"},[e("p",[t._v("Custom HTML description and buttons")]),e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.custom}},[t._v("Click me")])])]),e("div",{staticClass:"col-xl-3 col-lg-4 col-sm-6 mb-2"},[e("div",{staticClass:"p-3"},[e("p",[t._v("A custom positioned dialog")]),e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.position}},[t._v("Click me")])])]),e("div",{staticClass:"col-xl-3 col-lg-4 col-sm-6 mb-2"},[e("div",{staticClass:"p-3"},[e("p",[t._v("A message with custom width, padding and background")]),e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.customBackground}},[t._v("Click me")])])]),e("div",{staticClass:"col-xl-3 col-lg-4 col-sm-6 mb-2"},[e("p",[t._v("Ajax request example")]),e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.ajax}},[t._v("Click me")])]),e("div",{staticClass:"col-xl-3 col-lg-4 col-sm-6 mb-2"},[e("div",{staticClass:"p-3"},[e("p",[t._v("Chaining modals (queue) example")]),e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.chain}},[t._v("Click me")])])]),e("div",{staticClass:"col-xl-3 col-lg-4 col-sm-6 mb-2"},[e("div",{staticClass:"p-3"},[e("p",[t._v("Dynamic queue example")]),e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.dynamicQueue}},[t._v("Click me")])])])])])])])])],1)},i=[],o=(s("d9e2"),s("2b0e")),l=s("3d20"),n=s.n(l),c=s("5658"),r=s("2579"),u=s("c2a4"),m={page:{title:"Sweet Alert",meta:[{name:"description",content:u.description}]},components:{Layout:c["a"],PageHeader:r["a"]},data(){return{title:"SweetAlert 2",items:[{text:"UI Elements",href:"/"},{text:"SweetAlert 2",active:!0}]}},methods:{showAlert(){o["default"].swal("Any fool can use a computer!")},titleText(){n.a.fire("The Internet?","That thing is still around?","question")},successmsg(){n.a.fire("Good job!","You clicked the button!","success")},position(){o["default"].swal({position:"top-end",icon:"success",title:"Your work has been saved",showConfirmButton:!1,timer:1500})},confirm(){n.a.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#34c38f",cancelButtonColor:"#f46a6a",confirmButtonText:"Yes, delete it!"}).then(t=>{t.value&&n.a.fire("Deleted!","Your file has been deleted.","success")})},cancel(){const t=n.a.mixin({customClass:{confirmButton:"btn btn-success",cancelButton:"btn btn-danger ml-2"},buttonsStyling:!1});t.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel!",showCancelButton:!0}).then(e=>{e.value?t.fire("Deleted!","Your file has been deleted.","success"):e.dismiss===n.a.DismissReason.cancel&&t.fire("Cancelled","Your imaginary file is safe :)","error")})},imageHeader(){n.a.fire({title:"Sweet!",text:"Modal with a custom image.",imageUrl:s("59da"),imageHeight:20,confirmButtonColor:"#556ee6"})},timer(){let t;n.a.fire({title:"Auto close alert!",html:"I will close in <b></b> milliseconds.",timer:2e3,timerProgressBar:!0,onBeforeOpen:()=>{n.a.showLoading(),t=setInterval(()=>{n.a.getContent().querySelector("b").textContent=n.a.getTimerLeft()},100)},onClose:()=>{clearInterval(t)}}).then(t=>{t.dismiss===n.a.DismissReason.timer&&console.log("I was closed by the timer")})},custom(){n.a.fire({title:"<strong>HTML <u>example</u></strong>",icon:"info",html:'You can use <b>bold text</b>, <a href="//sweetalert2.github.io">links</a> and other HTML tags',showCloseButton:!0,showCancelButton:!0,focusConfirm:!1,confirmButtonText:'<i class="fa fa-thumbs-up"></i> Great!',confirmButtonAriaLabel:"Thumbs up, great!",cancelButtonText:'<i class="fa fa-thumbs-down"></i>',cancelButtonAriaLabel:"Thumbs down"})},customBackground(){n.a.fire({title:"Custom width, padding, background.",width:600,padding:100,confirmButtonColor:"#556ee6",background:"#fff url(//subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/geometry.png)"})},ajax(){n.a.fire({title:"Submit email to run ajax request",input:"email",showCancelButton:!0,confirmButtonText:"Submit",showLoaderOnConfirm:!0,confirmButtonColor:"#556ee6",cancelButtonColor:"#f46a6a",preConfirm:t=>new Promise((function(e,s){setTimeout((function(){"taken@example.com"===t?Promise.reject(new Error("This email is already taken.")):e()}),2e3)})),allowOutsideClick:!1}).then(t=>{n.a.fire({title:"Ajax request finished!",html:"Submitted email: "+t})})},chain(){n.a.mixin({input:"text",confirmButtonText:"Next &rarr;",showCancelButton:!0,confirmButtonColor:"#556ee6",cancelButtonColor:"#74788d",progressSteps:["1","2","3"]}).queue([{title:"Question 1",text:"Chaining swal2 modals is easy"},"Question 2","Question 3"]).then(t=>{t.value&&n.a.fire({title:"All done!",html:"Your answers: <pre><code>"+JSON.stringify(t.value)+"</code></pre>",confirmButtonText:"Lovely!"})})},dynamicQueue(){var t="https://api.ipify.org?format=json";n.a.queue([{title:"Your public IP",confirmButtonText:"Show my public IP",text:"Your public IP will be received via AJAX request",showLoaderOnConfirm:!0,preConfirm:()=>fetch(t).then(t=>t.json()).then(t=>n.a.insertQueueStep(t.ip)).catch(()=>{n.a.insertQueueStep({type:"error",title:"Unable to get your public IP"})})}])}}},d=m,b=s("2877"),p=Object(b["a"])(d,a,i,!1,null,null,null);e["default"]=p.exports}}]);
//# sourceMappingURL=chunk-2d0afe0a.970b2053.js.map