(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[25,33],{644:function(e,t){!function(e,t){for(var r in t)e[r]=t[r]}(t,function(e){var t={};function r(c){if(t[c])return t[c].exports;var n=t[c]={i:c,l:!1,exports:{}};return e[c].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,c){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:c})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(r.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(c,n,function(t){return e[t]}.bind(null,n));return c},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t),r.d(t,"deepObjectsMerge",(function(){return c})),r.d(t,"getColor",(function(){return a})),r.d(t,"getStyle",(function(){return i})),r.d(t,"hexToRgb",(function(){return l})),r.d(t,"hexToRgba",(function(){return d})),r.d(t,"makeUid",(function(){return j})),r.d(t,"omitByKeys",(function(){return b})),r.d(t,"pickByKeys",(function(){return h})),r.d(t,"rgbToHex",(function(){return x}));var c=function e(t,r){for(var c=0,n=Object.keys(r);c<n.length;c++){var o=n[c];r[o]instanceof Object&&Object.assign(r[o],e(t[o],r[o]))}return Object.assign(t||{},r),t},n=function(){for(var e={},t=document.styleSheets,r="",c=t.length-1;c>-1;c--){for(var n=t[c].cssRules,o=n.length-1;o>-1;o--)if(".ie-custom-properties"===n[o].selectorText){r=n[o].cssText;break}if(r)break}return(r=r.substring(r.lastIndexOf("{")+1,r.lastIndexOf("}"))).split(";").forEach((function(t){if(t){var r=t.split(": ")[0],c=t.split(": ")[1];r&&c&&(e["--".concat(r.trim())]=c.trim())}})),e},o=function(){return Boolean(document.documentMode)&&document.documentMode>=10},s=function(e){return e.match(/^--.*/i)},i=function(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;if(s(e)&&o()){var c=n();t=c[e]}else t=window.getComputedStyle(r,null).getPropertyValue(e).replace(/^\s/,"");return t},a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body,r="--".concat(e),c=i(r,t);return c||e},l=function(e){if(void 0===e)throw new TypeError("Hex color is not defined");var t,r,c;if(!e.match(/^#(?:[0-9a-f]{3}){1,2}$/i))throw new Error("".concat(e," is not a valid hex color"));return 7===e.length?(t=parseInt(e.slice(1,3),16),r=parseInt(e.slice(3,5),16),c=parseInt(e.slice(5,7),16)):(t=parseInt(e.slice(1,2),16),r=parseInt(e.slice(2,3),16),c=parseInt(e.slice(3,5),16)),"rgba(".concat(t,", ").concat(r,", ").concat(c,")")},d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;if(void 0===e)throw new TypeError("Hex color is not defined");var r,c,n,o=e.match(/^#(?:[0-9a-f]{3}){1,2}$/i);if(!o)throw new Error("".concat(e," is not a valid hex color"));return 7===e.length?(r=parseInt(e.slice(1,3),16),c=parseInt(e.slice(3,5),16),n=parseInt(e.slice(5,7),16)):(r=parseInt(e.slice(1,2),16),c=parseInt(e.slice(2,3),16),n=parseInt(e.slice(3,5),16)),"rgba(".concat(r,", ").concat(c,", ").concat(n,", ").concat(t/100,")")},j=function(){return"uid-"+Math.random().toString(36).substr(2)},b=function(e,t){for(var r={},c=Object.keys(e),n=0;n<c.length;n++)!t.includes(c[n])&&(r[c[n]]=e[c[n]]);return r},h=function(e,t){for(var r={},c=0;c<t.length;c++)r[t[c]]=e[t[c]];return r},x=function(e){if(void 0===e)throw new TypeError("Hex color is not defined");if("transparent"===e)return"#00000000";var t=e.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);if(!t)throw new Error("".concat(e," is not a valid rgb color"));var r="0".concat(parseInt(t[1],10).toString(16)),c="0".concat(parseInt(t[2],10).toString(16)),n="0".concat(parseInt(t[3],10).toString(16));return"#".concat(r.slice(-2)).concat(c.slice(-2)).concat(n.slice(-2))},m={deepObjectsMerge:c,getColor:a,getStyle:i,hexToRgb:l,hexToRgba:d,makeUid:j,omitByKeys:b,pickByKeys:h,rgbToHex:x};t.default=m}]))},655:function(e,t,r){"use strict";var c=r(40),n=r(65),o=(r(1),r(644)),s=r(652),i=r(17),a=function(e){var t=e.borderColor,r=e.backgroundColor,a=e.pointHoverBackgroundColor,l=e.dataPoints,d=e.label,j=e.pointed,b=Object(n.a)(e,["borderColor","backgroundColor","pointHoverBackgroundColor","dataPoints","label","pointed"]),h=a||("transparent"!==r?r:t),x=[{data:l,borderColor:Object(o.getColor)(t),backgroundColor:Object(o.getColor)(r),pointBackgroundColor:Object(o.getColor)(h),pointHoverBackgroundColor:Object(o.getColor)(h)}],m={scales:{xAxes:[{offset:!0,gridLines:{color:"transparent",zeroLineColor:"transparent"},ticks:{fontSize:2,fontColor:"transparent"}}],yAxes:[{display:!1,ticks:{display:!1,min:Math.min.apply(Math,l)-5,max:Math.max.apply(Math,l)+5}}]},elements:{line:{borderWidth:1},point:{radius:4,hitRadius:10,hoverRadius:4}}},g={scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]},elements:{line:{borderWidth:2},point:{radius:0,hitRadius:10,hoverRadius:4}}},u=function(){var e=j?m:g;return Object.assign({},e,{maintainAspectRatio:!1,legend:{display:!1}})}(),O=Object(o.deepObjectsMerge)(x,b.datasets||{}),f=Object(o.deepObjectsMerge)(u,b.options||{});return Object(i.jsx)(s.c,Object(c.a)(Object(c.a)({},b),{},{datasets:O,options:f,labels:d}))};a.defaultProps={borderColor:"rgba(255,255,255,.55)",backgroundColor:"transparent",dataPoints:[10,22,34,46,58,70,46,23,45,78,34,12],label:"Sales"},t.a=a},660:function(e,t,r){"use strict";var c=r(40),n=r(65),o=(r(1),r(644)),s=r(652),i=r(17),a=function(e){var t=e.backgroundColor,r=e.pointHoverBackgroundColor,a=e.dataPoints,l=e.label,d=(e.pointed,Object(n.a)(e,["backgroundColor","pointHoverBackgroundColor","dataPoints","label","pointed"])),j=[{data:a,backgroundColor:Object(o.getColor)(t),pointHoverBackgroundColor:Object(o.getColor)(r),barPercentage:.5,categoryPercentage:1}],b={maintainAspectRatio:!1,legend:{display:!1},scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]}};return Object(i.jsx)(s.a,Object(c.a)(Object(c.a)({},d),{},{datasets:j,options:b,labels:l}))};a.defaultProps={backgroundColor:"rgba(0,0,0,.2)",dataPoints:[10,22,34,46,58,70,46,23,45,78,34,12],label:"Sales"},t.a=a},719:function(e,t,r){"use strict";r.r(t);r(1);var c=r(627),n=(r(655),r(660)),o=r(17);t.default=function(){return Object(o.jsxs)(c.ub,{children:[Object(o.jsx)(c.u,{sm:"6",lg:"3",children:Object(o.jsx)(c.Sb,{color:"gradient-primary",header:"114",text:"Chuy\xean Gia m\u1edbi trong ng\xe0y h\xf4m nay",footerSlot:Object(o.jsx)(n.a,{pointed:!0,className:"mt-3 mx-3",style:{height:"70px"},dataPoints:[65,72,50,88,93,100,114],backgroundColor:"rgba(255,255,255,.5)",label:["7 ng\xe0y tr\u01b0\u1edbc","6 ng\xe0y tr\u01b0\u1edbc","5 ng\xe0y tr\u01b0\u1edbc","4 ng\xe0y tr\u01b0\u1edbc","3 ng\xe0y tr\u01b0\u1edbc","2 ng\xe0y tr\u01b0\u1edbc","H\xf4m qua"]})})}),Object(o.jsx)(c.u,{sm:"6",lg:"3",children:Object(o.jsx)(c.Sb,{color:"gradient-info",header:"421",text:"Ng\u01b0\u1eddi D\xf9ng m\u1edbi trong ng\xe0y h\xf4m nay",footerSlot:Object(o.jsx)(n.a,{pointed:!0,className:"mt-3 mx-3",style:{height:"70px"},backgroundColor:"rgba(255,255,255,.5)",dataPoints:[321,366,295,315,362,389,407],label:["7 ng\xe0y tr\u01b0\u1edbc","6 ng\xe0y tr\u01b0\u1edbc","5 ng\xe0y tr\u01b0\u1edbc","4 ng\xe0y tr\u01b0\u1edbc","3 ng\xe0y tr\u01b0\u1edbc","2 ng\xe0y tr\u01b0\u1edbc","H\xf4m qua"]})})}),Object(o.jsx)(c.u,{sm:"6",lg:"3",children:Object(o.jsx)(c.Sb,{color:"gradient-warning",header:"621",text:"Cu\u1ed9c Tr\xf2 Chuy\u1ec7n trong ng\xe0y h\xf4m nay",footerSlot:Object(o.jsx)(n.a,{pointed:!0,className:"mt-3 mx-3",style:{height:"70px"},backgroundColor:"rgba(255,255,255,.5)",dataPoints:[315,421,141,366,235,188,503],label:["7 ng\xe0y tr\u01b0\u1edbc","6 ng\xe0y tr\u01b0\u1edbc","5 ng\xe0y tr\u01b0\u1edbc","4 ng\xe0y tr\u01b0\u1edbc","3 ng\xe0y tr\u01b0\u1edbc","2 ng\xe0y tr\u01b0\u1edbc","H\xf4m qua"]})})}),Object(o.jsx)(c.u,{sm:"6",lg:"3",children:Object(o.jsx)(c.Sb,{color:"gradient-danger",header:"47",text:"B\xe0i Vi\u1ebft m\u1edbi trong ng\xe0y h\xf4m nay",footerSlot:Object(o.jsx)(n.a,{className:"mt-3 mx-3",style:{height:"70px"},dataPoints:[43,38,66,76,36,41,38],backgroundColor:"rgba(255,255,255,.5)",label:["7 ng\xe0y tr\u01b0\u1edbc","6 ng\xe0y tr\u01b0\u1edbc","5 ng\xe0y tr\u01b0\u1edbc","4 ng\xe0y tr\u01b0\u1edbc","3 ng\xe0y tr\u01b0\u1edbc","2 ng\xe0y tr\u01b0\u1edbc","H\xf4m qua"]})})})]})}},899:function(e,t,r){"use strict";r.r(t);r(1);var c=r(627),n=r(635),o=r(655),s=r(17),i=function(e){return e.withCharts?Object(s.jsxs)(c.ub,{children:[Object(s.jsx)(c.u,{sm:"6",lg:"3",children:Object(s.jsxs)(c.Rb,{color:"facebook",rightHeader:"89k",rightFooter:"friends",leftHeader:"459",leftFooter:"feeds",children:[Object(s.jsx)(n.a,{name:"cib-facebook",height:"52",className:"my-4"}),Object(s.jsx)(o.a,{className:"position-absolute w-100 h-100",backgroundColor:"rgba(255,255,255,.1)",dataPoints:[65,59,84,84,51,55,40],label:"Friends",labels:"months"})]})}),Object(s.jsx)(c.u,{sm:"6",lg:"3",children:Object(s.jsxs)(c.Rb,{color:"twitter",rightHeader:"973k",rightFooter:"followers",leftHeader:"1.792",leftFooter:"tweets",children:[Object(s.jsx)(n.a,{name:"cib-twitter",height:"52",className:"my-4"}),Object(s.jsx)(o.a,{className:"position-absolute w-100 h-100",backgroundColor:"rgba(255,255,255,.1)",dataPoints:[1,13,9,17,34,41,38],label:"Followers",labels:"months"})]})}),Object(s.jsx)(c.u,{sm:"6",lg:"3",children:Object(s.jsxs)(c.Rb,{color:"linkedin",rightHeader:"500+",rightFooter:"contracts",leftHeader:"292",leftFooter:"feeds",children:[Object(s.jsx)(n.a,{name:"cib-linkedin",height:"52",className:"my-4"}),Object(s.jsx)(o.a,{className:"position-absolute w-100 h-100",backgroundColor:"rgba(255,255,255,.1)",dataPoints:[78,81,80,45,34,12,40],label:"Contracts",labels:"months"})]})}),Object(s.jsx)(c.u,{sm:"6",lg:"3",children:Object(s.jsxs)(c.Rb,{rightHeader:"12",rightFooter:"events",leftHeader:"4",leftFooter:"meetings",color:"gradient-warning",children:[Object(s.jsx)(n.a,{name:"cil-calendar",height:"52",className:"my-4"}),Object(s.jsx)(o.a,{className:"position-absolute w-100 h-100",backgroundColor:"rgba(255,255,255,.1)",dataPoints:[35,23,56,22,97,23,64],label:"Followers",labels:"months"})]})})]}):Object(s.jsxs)(c.ub,{children:[Object(s.jsx)(c.u,{sm:"6",lg:"3",children:Object(s.jsx)(c.Rb,{color:"facebook",rightHeader:"89k",rightFooter:"friends",leftHeader:"459",leftFooter:"feeds",children:Object(s.jsx)(n.a,{name:"cib-facebook",height:"56",className:"my-4"})})}),Object(s.jsx)(c.u,{sm:"6",lg:"3",children:Object(s.jsx)(c.Rb,{color:"twitter",rightHeader:"973k",rightFooter:"followers",leftHeader:"1.792",leftFooter:"tweets",children:Object(s.jsx)(n.a,{name:"cib-twitter",height:"56",className:"my-4"})})}),Object(s.jsx)(c.u,{sm:"6",lg:"3",children:Object(s.jsx)(c.Rb,{color:"linkedin",rightHeader:"500+",rightFooter:"contracts",leftHeader:"292",leftFooter:"feeds",children:Object(s.jsx)(n.a,{name:"cib-linkedin",height:"56",className:"my-4"})})}),Object(s.jsx)(c.u,{sm:"6",lg:"3",children:Object(s.jsx)(c.Rb,{rightHeader:"12",rightFooter:"events",leftHeader:"4",leftFooter:"meetings",color:"gradient-warning",children:Object(s.jsx)(n.a,{name:"cil-calendar",height:"56",className:"my-4"})})})]})},a=r(719),l=r(660);t.default=function(){return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(a.default,{}),Object(s.jsxs)(c.ub,{children:[Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(s.jsx)(c.Ub,{color:"success",header:"89.9%",text:"Lorem ipsum...",footer:"Lorem ipsum dolor sit amet enim."})}),Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(s.jsx)(c.Ub,{color:"info",header:"12.124",text:"Lorem ipsum...",footer:"Lorem ipsum dolor sit amet enim."})}),Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(s.jsx)(c.Ub,{color:"warning",header:"$98.111,00",text:"Lorem ipsum...",footer:"Lorem ipsum dolor sit amet enim."})}),Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(s.jsx)(c.Ub,{header:"2 TB",text:"Lorem ipsum...",footer:"Lorem ipsum dolor sit amet enim.",children:Object(s.jsx)(c.sb,{color:"danger",animated:!0,size:"xs",className:"my-3",value:75})})}),Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(s.jsx)(c.Ub,{inverse:!0,color:"success",variant:"inverse",header:"89.9%",text:"Lorem ipsum...",footer:"Lorem ipsum dolor sit amet enim."})}),Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(s.jsx)(c.Ub,{inverse:!0,color:"info",variant:"inverse",header:"12.124",text:"Lorem ipsum...",footer:"Lorem ipsum dolor sit amet enim."})}),Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(s.jsx)(c.Ub,{inverse:!0,color:"warning",variant:"inverse",header:"$98.111,00",text:"Lorem ipsum...",footer:"Lorem ipsum dolor sit amet enim."})}),Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(s.jsx)(c.Ub,{inverse:!0,color:"danger",variant:"inverse",value:95,header:"2 TB",text:"Lorem ipsum...",footer:"Lorem ipsum dolor sit amet enim."})})]}),Object(s.jsxs)(c.ub,{children:[Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(s.jsx)(c.Tb,{text:"income",header:"$1.999,50",color:"primary",children:Object(s.jsx)(n.a,{width:24,name:"cil-settings"})})}),Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(s.jsx)(c.Tb,{text:"income",header:"$1.999,50",color:"info",children:Object(s.jsx)(n.a,{width:24,name:"cil-user"})})}),Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(s.jsx)(c.Tb,{text:"income",header:"$1.999,50",color:"warning",children:Object(s.jsx)(n.a,{width:24,name:"cil-moon"})})}),Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(s.jsx)(c.Tb,{text:"income",header:"$1.999,50",color:"danger",children:Object(s.jsx)(n.a,{width:24,name:"cil-bell"})})}),Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(s.jsx)(c.Tb,{text:"income",header:"$1.999,50",color:"primary",iconPadding:!1,children:Object(s.jsx)(n.a,{width:24,name:"cil-settings"})})}),Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(s.jsx)(c.Tb,{text:"income",header:"$1.999,50",color:"info",iconPadding:!1,children:Object(s.jsx)(n.a,{width:24,name:"cil-laptop"})})}),Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(s.jsx)(c.Tb,{text:"income",header:"$1.999,50",color:"warning",iconPadding:!1,children:Object(s.jsx)(n.a,{width:24,name:"cil-moon"})})}),Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(s.jsx)(c.Tb,{text:"income",header:"$1.999,50",color:"danger",iconPadding:!1,children:Object(s.jsx)(n.a,{width:24,name:"cil-bell"})})}),Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"4",children:Object(s.jsx)(c.Tb,{text:"income",header:"$1.999,50",color:"primary",iconPadding:!1,children:Object(s.jsx)(n.a,{width:24,name:"cil-settings",className:"mx-5"})})}),Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"4",children:Object(s.jsx)(c.Tb,{text:"income",header:"$1.999,50",color:"info",iconPadding:!1,children:Object(s.jsx)(n.a,{width:24,name:"cil-laptop",className:"mx-5"})})}),Object(s.jsx)(c.u,{xs:"12",sm:"6",lg:"4",children:Object(s.jsx)(c.Tb,{text:"income",header:"$1.999,50",color:"warning",iconPadding:!1,footerSlot:Object(s.jsx)(c.l,{className:"card-footer px-3 py-2",children:Object(s.jsxs)(c.bb,{className:"font-weight-bold font-xs btn-block text-muted",href:"https://coreui.io/",rel:"noopener norefferer",target:"_blank",children:["View more",Object(s.jsx)(n.a,{name:"cil-arrow-right",className:"float-right",width:"16"})]})}),children:Object(s.jsx)(n.a,{width:24,name:"cil-moon",className:"mx-5"})})})]}),Object(s.jsx)(i,{}),Object(s.jsx)(i,{withCharts:!0}),Object(s.jsxs)(c.m,{className:"mb-4",children:[Object(s.jsx)(c.Vb,{header:"87.500",text:"Visitors",color:"gradient-info",children:Object(s.jsx)(n.a,{name:"cil-people",height:"36"})}),Object(s.jsx)(c.Vb,{header:"385",text:"New Clients",color:"gradient-success",children:Object(s.jsx)(n.a,{name:"cil-userFollow",height:"36"})}),Object(s.jsx)(c.Vb,{header:"1238",text:"Products sold",color:"gradient-warning",children:Object(s.jsx)(n.a,{name:"cil-basket",height:"36"})}),Object(s.jsx)(c.Vb,{header:"28%",text:"Returning Visitors",children:Object(s.jsx)(n.a,{name:"cil-chartPie",height:"36"})}),Object(s.jsx)(c.Vb,{header:"5:34:11",text:"Avg. Time",color:"gradient-danger",progressSlot:Object(s.jsx)(c.sb,{color:"danger",size:"xs",value:75,animated:!0,className:"my-3"}),children:Object(s.jsx)(n.a,{name:"cil-speedometer",height:"36"})})]}),Object(s.jsxs)(c.m,{className:"mb-4",children:[Object(s.jsx)(c.Vb,{header:"87.500",text:"Visitors",color:"gradient-info",inverse:!0,children:Object(s.jsx)(n.a,{name:"cil-people",height:"36"})}),Object(s.jsx)(c.Vb,{header:"385",text:"New Clients",color:"gradient-success",inverse:!0,children:Object(s.jsx)(n.a,{name:"cil-userFollow",height:"36"})}),Object(s.jsx)(c.Vb,{header:"1238",text:"Products sold",color:"gradient-warning",inverse:!0,children:Object(s.jsx)(n.a,{name:"cil-basket",height:"36"})}),Object(s.jsx)(c.Vb,{header:"28%",text:"Returning Visitors",color:"gradient-primary",inverse:!0,children:Object(s.jsx)(n.a,{name:"cil-chartPie",height:"36"})}),Object(s.jsx)(c.Vb,{header:"5:34:11",text:"Avg. Time",color:"gradient-danger",inverse:!0,children:Object(s.jsx)(n.a,{name:"cil-speedometer",height:"36"})})]}),Object(s.jsxs)(c.ub,{children:[Object(s.jsx)(c.u,{sm:"6",md:"2",children:Object(s.jsx)(c.Vb,{header:"87.500",text:"Visitors",color:"gradient-info",children:Object(s.jsx)(n.a,{name:"cil-people",height:"36"})})}),Object(s.jsx)(c.u,{sm:"6",md:"2",children:Object(s.jsx)(c.Vb,{header:"385",text:"New Clients",color:"gradient-success",children:Object(s.jsx)(n.a,{name:"cil-userFollow",height:"36"})})}),Object(s.jsx)(c.u,{sm:"6",md:"2",children:Object(s.jsx)(c.Vb,{header:"1238",text:"Products sold",color:"gradient-warning",children:Object(s.jsx)(n.a,{name:"cil-basket",height:"36"})})}),Object(s.jsx)(c.u,{sm:"6",md:"2",children:Object(s.jsx)(c.Vb,{header:"28%",text:"Returning Visitors",color:"gradient-primary",children:Object(s.jsx)(n.a,{name:"cil-chartPie",height:"36"})})}),Object(s.jsx)(c.u,{sm:"6",md:"2",children:Object(s.jsx)(c.Vb,{header:"5:34:11",text:"Avg. Time",color:"gradient-danger",children:Object(s.jsx)(n.a,{name:"cil-speedometer",height:"36"})})}),Object(s.jsx)(c.u,{sm:"6",md:"2",children:Object(s.jsx)(c.Vb,{header:"972",text:"comments",color:"gradient-info",children:Object(s.jsx)(n.a,{name:"cil-speech",height:"36"})})})]}),Object(s.jsxs)(c.ub,{children:[Object(s.jsx)(c.u,{sm:"6",md:"2",children:Object(s.jsx)(c.Vb,{header:"87.500",text:"Visitors",color:"gradient-info",inverse:!0,children:Object(s.jsx)(n.a,{name:"cil-people",height:"36"})})}),Object(s.jsx)(c.u,{sm:"6",md:"2",children:Object(s.jsx)(c.Vb,{header:"385",text:"New Clients",color:"gradient-success",inverse:!0,children:Object(s.jsx)(n.a,{name:"cil-userFollow",height:"36"})})}),Object(s.jsx)(c.u,{sm:"6",md:"2",children:Object(s.jsx)(c.Vb,{header:"1238",text:"Products sold",color:"gradient-warning",inverse:!0,children:Object(s.jsx)(n.a,{name:"cil-basket",height:"36"})})}),Object(s.jsx)(c.u,{sm:"6",md:"2",children:Object(s.jsx)(c.Vb,{header:"28%",text:"Returning Visitors",color:"gradient-primary",inverse:!0,children:Object(s.jsx)(n.a,{name:"cil-chartPie",height:"36"})})}),Object(s.jsx)(c.u,{sm:"6",md:"2",children:Object(s.jsx)(c.Vb,{header:"5:34:11",text:"Avg. Time",color:"gradient-danger",inverse:!0,children:Object(s.jsx)(n.a,{name:"cil-speedometer",height:"36"})})}),Object(s.jsx)(c.u,{sm:"6",md:"2",children:Object(s.jsx)(c.Vb,{header:"972",text:"comments",color:"gradient-info",inverse:!0,children:Object(s.jsx)(n.a,{name:"cil-speech",height:"36"})})})]}),Object(s.jsxs)(c.ub,{children:[Object(s.jsx)(c.u,{sm:"4",lg:"2",children:Object(s.jsx)(c.Wb,{header:"title",text:"1,123",children:Object(s.jsx)(o.a,{style:{height:"40px"},borderColor:"danger"})})}),Object(s.jsx)(c.u,{sm:"4",lg:"2",children:Object(s.jsx)(c.Wb,{header:"title",text:"1,123",children:Object(s.jsx)(o.a,{style:{height:"40px"},borderColor:"primary"})})}),Object(s.jsx)(c.u,{sm:"4",lg:"2",children:Object(s.jsx)(c.Wb,{header:"title",text:"1,123",children:Object(s.jsx)(o.a,{style:{height:"40px"},borderColor:"success"})})}),Object(s.jsx)(c.u,{sm:"4",lg:"2",children:Object(s.jsx)(c.Wb,{header:"title",text:"1,123",children:Object(s.jsx)(l.a,{style:{height:"40px"},backgroundColor:"danger"})})}),Object(s.jsx)(c.u,{sm:"4",lg:"2",children:Object(s.jsx)(c.Wb,{header:"title",text:"1,123",children:Object(s.jsx)(l.a,{style:{height:"40px"},backgroundColor:"primary"})})}),Object(s.jsx)(c.u,{sm:"4",lg:"2",children:Object(s.jsx)(c.Wb,{header:"title",text:"1,123",children:Object(s.jsx)(l.a,{style:{height:"40px"},backgroundColor:"success"})})})]})]})}}}]);
//# sourceMappingURL=25.5f35e629.chunk.js.map