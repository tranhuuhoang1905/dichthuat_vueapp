(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e4e4d"],{"91ba":function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t._self._c;return a("Layout",[a("PageHeader",{attrs:{title:t.title,items:t.items}}),a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-6"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("h4",{staticClass:"card-title"},[t._v("Basic")]),a("p",{staticClass:"card-title-dsec"},[t._v("Example of google maps.")]),a("GmapMap",{staticStyle:{height:"300px"},attrs:{center:{lat:2,lng:2},zoom:5}})],1)])]),a("div",{staticClass:"col-lg-6"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("h4",{staticClass:"card-title"},[t._v("Markers")]),a("p",{staticClass:"card-title-dsec"},[t._v("Example of google maps.")]),a("gmap-map",{staticStyle:{height:"300px"},attrs:{center:{lat:11,lng:12},zoom:3}},t._l(t.markers,(function(s,e){return a("gmap-marker",{key:e,attrs:{position:s.position,clickable:!0,draggable:!0},on:{click:function(a){t.center=s.position}}})})),1)],1)])])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-6"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("h4",{staticClass:"card-title"},[t._v("Street View Panoramas")]),a("p",{staticClass:"card-title-dsec"},[t._v("Example of google maps.")]),a("gmap-street-view-panorama",{staticStyle:{height:"300px"},attrs:{position:{lat:52.201272,lng:.11872},pov:t.pov,zoom:1},on:{pano_changed:t.updatePano,pov_changed:t.updatePov}})],1)])]),a("div",{staticClass:"col-lg-6"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("h4",{staticClass:"card-title"},[t._v("Polygon Editing")]),a("p",{staticClass:"card-title-dsec"},[t._v("Example of google maps.")]),a("gmap-map",{staticStyle:{height:"300px"},attrs:{center:{lat:1.38,lng:103.8},zoom:12}},[a("gmap-polygon",{attrs:{paths:t.paths,editable:!0},on:{paths_changed:function(a){return t.updateEdited(a)}}})],1)],1)])])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-6"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("h4",{staticClass:"card-title"},[t._v("Map type")]),a("p",{staticClass:"card-title-dsec"},[t._v("Example of google maps.")]),a("gmap-map",{staticStyle:{height:"300px"},attrs:{center:{lat:4,lng:4},zoom:3,"map-type-id":"terrain"}})],1)])])])],1)},l=[],i=(s("14d9"),s("5658")),o=s("2579"),c=s("c2a4"),d={page:{title:"Google Map",meta:[{name:"description",content:c.description}]},components:{Layout:i["a"],PageHeader:o["a"]},data(){return{title:"Google Maps",items:[{text:"Maps",href:"/"},{text:"Google Maps",active:!0}],markers:[{position:{lat:10,lng:10}},{position:{lat:15,lng:13}}],pov:null,pano:null,edited:null,paths:[[{lat:1.38,lng:103.8},{lat:1.38,lng:103.81},{lat:1.39,lng:103.81},{lat:1.39,lng:103.8}],[{lat:1.382,lng:103.802},{lat:1.382,lng:103.808},{lat:1.388,lng:103.808},{lat:1.388,lng:103.802}]]}},methods:{updatePov(t){this.pov=t},updatePano(t){this.pano=t},updateEdited(t){let a=[];for(let s=0;s<t.getLength();s++){let e=[];for(let a=0;a<t.getAt(s).getLength();a++){let l=t.getAt(s).getAt(a);e.push({lat:l.lat(),lng:l.lng()})}a.push(e)}this.edited=a}}},n=d,p=s("2877"),r=Object(p["a"])(n,e,l,!1,null,null,null);a["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d0e4e4d.e39f7861.js.map