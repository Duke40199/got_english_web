(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[16],{639:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.manuallyIncrementPromiseCounter=t.manuallyDecrementPromiseCounter=t.manuallyResetPromiseCounter=t.trackPromise=t.getCounter=t.promiseCounterUpdateEventId=t.emitter=void 0;var r=n(648),a=n(641);var c=new r.Emitter;t.emitter=c;var i="promise-counter-update";t.promiseCounterUpdateEventId=i;var s,o,u,l=(s={},o=a.defaultArea,u=0,o in s?Object.defineProperty(s,o,{value:u,enumerable:!0,configurable:!0,writable:!0}):s[o]=u,s);t.getCounter=function(e){return l[e]};t.trackPromise=function(e,t){t=t||a.defaultArea,d(t);var n=function(){return h(t)};return e.then(n,n),e};var d=function(e){f(e);var t=p(e);c.emit(i,t,e)},f=function(e){Boolean(l[e])?l[e]++:l[e]=1},p=function(e){return l[e]>0},h=function(e){l[e]>0&&b(e);var t=p(e);c.emit(i,t,e)},b=function(e){l[e]--};t.manuallyResetPromiseCounter=function(e){e=e||a.defaultArea,l[e]=0,c.emit(i,!1,e)};t.manuallyDecrementPromiseCounter=function(e){e=e||a.defaultArea,h(e)};t.manuallyIncrementPromiseCounter=function(e){e=e||a.defaultArea,d(e)}},641:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultArea=void 0;t.defaultArea="default-area"},642:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.setupConfig=t.defaultConfig=void 0;var r=n(641),a={area:r.defaultArea,delay:0};t.defaultConfig=a;t.setupConfig=function(e){return{area:e&&e.area?e.area:r.defaultArea,delay:e&&e.delay?e.delay:0}}},644:function(e,t,n){"use strict";var r=n(659),a=n.n(r).a.create({baseURL:"https://got-english-backend-production-swiyh5bc4q-de.a.run.app",timeout:1e4});t.a=a},647:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"trackPromise",{enumerable:!0,get:function(){return r.trackPromise}}),Object.defineProperty(t,"manuallyResetPromiseCounter",{enumerable:!0,get:function(){return r.manuallyResetPromiseCounter}}),Object.defineProperty(t,"manuallyDecrementPromiseCounter",{enumerable:!0,get:function(){return r.manuallyDecrementPromiseCounter}}),Object.defineProperty(t,"manuallyIncrementPromiseCounter",{enumerable:!0,get:function(){return r.manuallyIncrementPromiseCounter}}),Object.defineProperty(t,"promiseTrackerHoc",{enumerable:!0,get:function(){return a.promiseTrackerHoc}}),Object.defineProperty(t,"usePromiseTracker",{enumerable:!0,get:function(){return c.usePromiseTracker}});var r=n(639),a=n(649),c=n(650)},648:function(e,t,n){"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}Object.defineProperty(t,"__esModule",{value:!0}),t.Emitter=void 0;var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,a;return t=e,(n=[{key:"emit",value:function(e){if(!e)return this;for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];var a=!0,c=!1,i=void 0;try{for(var s,o=this._e(e)[Symbol.iterator]();!(a=(s=o.next()).done);a=!0){var u=s.value;u.apply(u.ctx,[].concat(n)),1==u.off_event&&this.off(e,u)}}catch(l){c=!0,i=l}finally{try{a||null==o.return||o.return()}finally{if(c)throw i}}return this}},{key:"on",value:function(e,t,n){return e?(t.ctx=n,this._e(e).push(t),this):this}},{key:"once",value:function(e,t,n){return e?(t.ctx=n,t.off_event=!0,this.on(e,t)):this}},{key:"off",value:function(e,t){if(!e)return this;if(!this[e])return this;var n=this._e(e);return t?(this[e]=n.filter((function(e){return e!=t})),this):(delete this[e],this)}},{key:"_e",value:function(e){return this[e]||(this[e]=[])}}])&&r(t.prototype,n),a&&r(t,a),e}();t.Emitter=a},649:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.promiseTrackerHoc=void 0;var r=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==s(e)&&"function"!==typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var c=r?Object.getOwnPropertyDescriptor(e,a):null;c&&(c.get||c.set)?Object.defineProperty(n,a,c):n[a]=e[a]}n.default=e,t&&t.set(e,n);return n}(n(1)),a=n(639),c=n(642);function i(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}function s(e){return(s="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(){return(o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}t.promiseTrackerHoc=function(e){return function(t){function n(e){var t,r,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),r=this,(t=!(a=l(n).call(this,e))||"object"!==s(a)&&"function"!==typeof a?d(r):a).state={promiseInProgress:!1,internalPromiseInProgress:!1,config:(0,c.setupConfig)(e.config)},t.notifyPromiseInProgress=t.notifyPromiseInProgress.bind(d(t)),t.updateProgress=t.updateProgress.bind(d(t)),t.subscribeToCounterUpdate=t.subscribeToCounterUpdate.bind(d(t)),t}var i,p,h;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(n,t),i=n,(p=[{key:"notifyPromiseInProgress",value:function(){var e=this;0===this.state.config.delay?this.setState({promiseInProgress:!0}):setTimeout((function(){var t=Boolean((0,a.getCounter)(e.state.config.area)>0);e.setState({promiseInProgress:t})}),this.state.config.delay)}},{key:"updateProgress",value:function(e,t){this.setState({internalPromiseInProgress:e},t),e?this.notifyPromiseInProgress():this.setState({promiseInProgress:!1})}},{key:"subscribeToCounterUpdate",value:function(){var e=this;a.emitter.on(a.promiseCounterUpdateEventId,(function(t,n){e.state.config.area===n&&e.updateProgress(t)}))}},{key:"componentDidMount",value:function(){this.updateProgress(Boolean((0,a.getCounter)(this.state.config.area)>0),this.subscribeToCounterUpdate)}},{key:"componentWillUnmount",value:function(){a.emitter.off(a.promiseCounterUpdateEventId)}},{key:"render",value:function(){return r.default.createElement(e,o({},this.props,{config:this.state.config,promiseInProgress:this.state.promiseInProgress}))}}])&&u(i.prototype,p),h&&u(i,h),n}(r.Component)}},650:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.usePromiseTracker=void 0;var r,a=(r=n(1))&&r.__esModule?r:{default:r},c=n(639),i=n(642);function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e))&&"[object Arguments]"!==Object.prototype.toString.call(e))return;var n=[],r=!0,a=!1,c=void 0;try{for(var i,s=e[Symbol.iterator]();!(r=(i=s.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(o){a=!0,c=o}finally{try{r||null==s.return||s.return()}finally{if(a)throw c}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}t.usePromiseTracker=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i.defaultConfig,t=a.default.useRef(!1);a.default.useEffect((function(){return t.current=!0,function(){return t.current=!1}}),[]);var n=a.default.useState((0,i.setupConfig)(e)),r=s(n,1),o=r[0];a.default.useEffect((function(){t.current&&o&&o.area&&(0,c.getCounter)(o.area)>0&&(f(!0),m(!0))}),[o]);var u=a.default.useState(!1),l=s(u,2),d=l[0],f=l[1],p=a.default.useState(!1),h=s(p,2),b=h[0],m=h[1],j=a.default.useRef(d),O=function(){o&&o.delay&&0!==o.delay?setTimeout((function(){j.current&&m(!0)}),o.delay):m(!0)},g=function(e,n){t.current&&o.area===n&&(f(e),j.current=e,e?O():m(!1))};return a.default.useEffect((function(){return j.current=d,c.emitter.on(c.promiseCounterUpdateEventId,g),function(){return c.emitter.off(c.promiseCounterUpdateEventId,g)}}),[]),{promiseInProgress:b}}},666:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n(652),a=n(643),c=36e5,i={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},s=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,o=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,u=/^([+-])(\d{2})(?::?(\d{2}))?$/;function l(e,t){Object(a.a)(1,arguments);var n=t||{},c=null==n.additionalDigits?2:Object(r.a)(n.additionalDigits);if(2!==c&&1!==c&&0!==c)throw new RangeError("additionalDigits must be 0, 1 or 2");if("string"!==typeof e&&"[object String]"!==Object.prototype.toString.call(e))return new Date(NaN);var i,s=d(e);if(s.date){var o=f(s.date,c);i=p(o.restDateString,o.year)}if(isNaN(i)||!i)return new Date(NaN);var u,l=i.getTime(),h=0;if(s.time&&(h=b(s.time),isNaN(h)||null===h))return new Date(NaN);if(!s.timezone){var m=new Date(l+h),O=new Date(0);return O.setFullYear(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()),O.setHours(m.getUTCHours(),m.getUTCMinutes(),m.getUTCSeconds(),m.getUTCMilliseconds()),O}return u=j(s.timezone),isNaN(u)?new Date(NaN):new Date(l+h+u)}function d(e){var t,n={},r=e.split(i.dateTimeDelimiter);if(r.length>2)return n;if(/:/.test(r[0])?(n.date=null,t=r[0]):(n.date=r[0],t=r[1],i.timeZoneDelimiter.test(n.date)&&(n.date=e.split(i.timeZoneDelimiter)[0],t=e.substr(n.date.length,e.length))),t){var a=i.timezone.exec(t);a?(n.time=t.replace(a[1],""),n.timezone=a[1]):n.time=t}return n}function f(e,t){var n=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+t)+"})|(\\d{2}|[+-]\\d{"+(2+t)+"})$)"),r=e.match(n);if(!r)return{year:null};var a=r[1]&&parseInt(r[1]),c=r[2]&&parseInt(r[2]);return{year:null==c?a:100*c,restDateString:e.slice((r[1]||r[2]).length)}}function p(e,t){if(null===t)return null;var n=e.match(s);if(!n)return null;var r=!!n[4],a=h(n[1]),c=h(n[2])-1,i=h(n[3]),o=h(n[4]),u=h(n[5])-1;if(r)return function(e,t,n){return t>=1&&t<=53&&n>=0&&n<=6}(0,o,u)?function(e,t,n){var r=new Date(0);r.setUTCFullYear(e,0,4);var a=r.getUTCDay()||7,c=7*(t-1)+n+1-a;return r.setUTCDate(r.getUTCDate()+c),r}(t,o,u):new Date(NaN);var l=new Date(0);return function(e,t,n){return t>=0&&t<=11&&n>=1&&n<=(O[t]||(g(e)?29:28))}(t,c,i)&&function(e,t){return t>=1&&t<=(g(e)?366:365)}(t,a)?(l.setUTCFullYear(t,c,Math.max(a,i)),l):new Date(NaN)}function h(e){return e?parseInt(e):1}function b(e){var t=e.match(o);if(!t)return null;var n=m(t[1]),r=m(t[2]),a=m(t[3]);return function(e,t,n){if(24===e)return 0===t&&0===n;return n>=0&&n<60&&t>=0&&t<60&&e>=0&&e<25}(n,r,a)?n*c+6e4*r+1e3*a:NaN}function m(e){return e&&parseFloat(e.replace(",","."))||0}function j(e){if("Z"===e)return 0;var t=e.match(u);if(!t)return 0;var n="+"===t[1]?-1:1,r=parseInt(t[2]),a=t[3]&&parseInt(t[3])||0;return function(e,t){return t>=0&&t<=59}(0,a)?n*(r*c+6e4*a):NaN}var O=[31,null,31,30,31,30,31,31,30,31,30,31];function g(e){return e%400===0||e%4===0&&e%100}},911:function(e,t,n){"use strict";n.r(t);var r=n(633),a=n.n(r),c=n(634),i=n(630),s=n(1),o=n(627),u=n(635),l=n(20),d=n(644),f=function(){var e=Object(c.a)(a.a.mark((function e(){var t,n,r,c,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=JSON.parse(localStorage.getItem("user")).token,n=null,r=function(e){n=e.data.data},c=function(e){console.log(e)},i={headers:{Authorization:"Bearer ".concat(t)}},e.next=7,d.a.get("/pricings?service_name=messaging_session",i).then(r).catch(c);case 7:return e.abrupt("return",n);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),p=function(){var e=Object(c.a)(a.a.mark((function e(){var t,n,r,c,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=JSON.parse(localStorage.getItem("user")).token,n=null,r=function(e){n=e.data.data},c=function(e){console.log(e)},i={headers:{Authorization:"Bearer ".concat(t)}},e.next=7,d.a.get("/pricings?service_name=live_call_session",i).then(r).catch(c);case 7:return e.abrupt("return",n);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),h=function(){var e=Object(c.a)(a.a.mark((function e(){var t,n,r,c,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=JSON.parse(localStorage.getItem("user")).token,n=null,r=function(e){n=e.data.data},c=function(e){console.log(e)},i={headers:{Authorization:"Bearer ".concat(t)}},e.next=7,d.a.get("/pricings?service_name=translation_call_session",i).then(r).catch(c);case 7:return e.abrupt("return",n);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),b=function(){var e=Object(c.a)(a.a.mark((function e(t){var n,r,c,i,s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=JSON.parse(localStorage.getItem("user")).token,r=null,c=function(e){r=e.data.data[0]},i=function(e){console.log(e)},s={headers:{Authorization:"Bearer ".concat(n)}},e.next=7,d.a.get("/pricings?id="+t,s).then(c).catch(i);case 7:return e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),m=function(){var e=Object(c.a)(a.a.mark((function e(t,n){var r,c,i,s,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=JSON.parse(localStorage.getItem("user")).token,c=null,i=function(e){console.log(e.data),c=e.data.success},s=function(e){console.log(e),c=!1},o={headers:{Authorization:"Bearer ".concat(r)}},e.next=7,d.a.put("/pricings/"+t+"/update",n,o).then(i).catch(s);case 7:return e.abrupt("return",c);case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),j=function(){var e=Object(c.a)(a.a.mark((function e(t){var n,r,c,i,s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=JSON.parse(localStorage.getItem("user")).token,r=null,c=function(e){console.log(e.data),r=e.data.success},i=function(e){console.log(e),r=!1},s={headers:{Authorization:"Bearer ".concat(n)}},e.next=7,d.a.post("/pricings",t,s).then(c).catch(i);case 7:return e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),O=function(){var e=Object(c.a)(a.a.mark((function e(t){var n,r,c,i,s;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=JSON.parse(localStorage.getItem("user")).token,r=null,c=function(e){console.log(e.data),r=e.data.success},i=function(e){console.log(e),r=!1},s={headers:{Authorization:"Bearer ".concat(n)}},e.next=7,d.a.delete("/pricings/"+t+"/delete",s).then(c).catch(i);case 7:return e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),g=n(17),y=function(e){var t=e.selectedPricingId,n=e.show,r=e.handleClose,u=Object(l.g)(),d=Object(s.useState)(""),f=Object(i.a)(d,2),p=f[0],h=f[1],j=Object(s.useState)(""),O=Object(i.a)(j,2),y=O[0],v=O[1],x=Object(s.useState)(""),P=Object(i.a)(x,2),_=P[0],w=P[1],k=Object(s.useState)(""),C=Object(i.a)(k,2),N=C[0],S=C[1],T=Object(s.useState)(null),I=Object(i.a)(T,2),D=I[0],M=I[1];Object(s.useEffect)(Object(c.a)(a.a.mark((function e(){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null==t){e.next=8;break}return e.next=3,b(t);case 3:n=e.sent,h(n.id),v(n.service_name),w(n.price),S(n.price_unit);case 8:case"end":return e.stop()}}),e)}))),[t]);var U,E=function(){var e=Object(c.a)(a.a.mark((function e(n){var r,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),r={price:parseInt(_)},e.next=4,m(t,r);case 4:c=e.sent,console.log(c,r),!0===c?(M(Object(g.jsx)(o.a,{color:"success",children:"C\u1eadp nh\u1eadt th\xe0nh c\xf4ng!"})),u.push("/manage-pricing")):M(Object(g.jsx)(o.a,{color:"danger",children:"C\u1eadp nh\u1eadt th\u1ea5t b\u1ea1i!"}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsx)(o.eb,{show:n,onClose:r(),closeOnBackdrop:!1,color:"success",children:Object(g.jsxs)(o.J,{onSubmit:E,method:"post",encType:"multipart/form-data",className:"form-horizontal",children:[Object(g.jsx)(o.hb,{closeButton:!0,children:Object(g.jsx)(o.ib,{children:"C\u1eadp nh\u1eadt \u0110\u01a1n Gi\xe1"})}),Object(g.jsxs)(o.fb,{children:[Object(g.jsxs)(o.K,{row:!0,children:[Object(g.jsx)(o.u,{md:"4",children:Object(g.jsx)(o.ab,{htmlFor:"pricing-id-input",children:"ID:"})}),Object(g.jsx)(o.u,{xs:"12",md:"8",children:Object(g.jsx)("p",{name:"pricing-id-static",children:p})})]}),Object(g.jsxs)(o.K,{row:!0,children:[Object(g.jsx)(o.u,{md:"4",children:Object(g.jsx)(o.ab,{htmlFor:"update-pricing-service-name-input",children:"T\xean D\u1ecbch v\u1ee5:"})}),Object(g.jsx)(o.u,{xs:"12",md:"8",children:Object(g.jsx)(o.Q,{type:"text",id:"update-pricing-service-name-input",name:"service-name",value:(U=y,U.includes("messaging_session")?"Phi\xean nh\u1eafn tin":U.includes("live_call_session")?"Phi\xean g\u1ecdi tr\u1ef1c tuy\u1ebfn":U.includes("translation_call_session")?"Ph\xf2ng phi\xean d\u1ecbch tr\u1ef1c tuy\u1ebfn":"Kh\xf4ng x\xe1c \u0111\u1ecbnh"),readOnly:!0})})]}),Object(g.jsxs)(o.K,{row:!0,children:[Object(g.jsx)(o.u,{md:"4",children:Object(g.jsx)(o.ab,{htmlFor:"update-pricing-price-input",children:"\u0110\u01a1n gi\xe1:"})}),Object(g.jsx)(o.u,{xs:"12",md:"8",children:Object(g.jsx)(o.Q,{type:"number",step:"10",id:"update-pricing-price-input",name:"price",value:_,onChange:function(e){var t=e.target;return w(t.value)},required:!0})})]}),Object(g.jsxs)(o.K,{row:!0,children:[Object(g.jsx)(o.u,{md:"4",children:Object(g.jsx)(o.ab,{htmlFor:"update-pricing-price-unit-input",children:"\u0110\u01a1n v\u1ecb:"})}),Object(g.jsx)(o.u,{xs:"12",md:"8",children:Object(g.jsx)(o.Q,{id:"update-pricing-price-unit-input",name:"price-unit",value:N,readOnly:!0})})]}),D]}),Object(g.jsxs)(o.gb,{children:[Object(g.jsx)(o.f,{color:"success",type:"submit",children:"C\u1eadp nh\u1eadt"}),Object(g.jsx)(o.f,{color:"secondary",onClick:r(),children:"H\u1ee7y"})]})]})})},v=function(e){var t,n=e.selectedPricingServiceName,r=e.show,u=e.handleClose,d=Object(l.g)(),f=Object(s.useState)(n),p=Object(i.a)(f,1)[0],h=Object(s.useState)(""),b=Object(i.a)(h,2),m=b[0],O=b[1],y=Object(s.useState)("ph\xfat"),v=Object(i.a)(y,1)[0],x=Object(s.useState)(""),P=Object(i.a)(x,2),_=P[0],w=P[1],k=Object(s.useState)("coin(s)"),C=Object(i.a)(k,1)[0],N=Object(s.useState)(null),S=Object(i.a)(N,2),T=S[0],I=S[1],D=function(){var e=Object(c.a)(a.a.mark((function e(t){var n,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n={service_name:p,quantity:parseInt(m),quantity_unit:v,price:parseInt(_),price_unit:C},e.next=4,j(n);case 4:r=e.sent,console.log(r,n),!0===r?(I(Object(g.jsx)(o.a,{color:"success",children:"Th\xeam m\u1edbi th\xe0nh c\xf4ng!"})),d.push("/manage-pricing")):I(Object(g.jsx)(o.a,{color:"danger",children:"Th\xeam m\u1edbi th\u1ea5t b\u1ea1i!"}));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsx)(o.eb,{show:r,onClose:u(),closeOnBackdrop:!1,color:"primary",children:Object(g.jsxs)(o.J,{onSubmit:D,method:"post",encType:"multipart/form-data",className:"form-horizontal",children:[Object(g.jsx)(o.hb,{closeButton:!0,children:Object(g.jsx)(o.ib,{children:"Th\xeam m\u1edbi \u0110\u01a1n Gi\xe1"})}),Object(g.jsxs)(o.fb,{children:[Object(g.jsxs)(o.K,{row:!0,children:[Object(g.jsx)(o.u,{md:"4",children:Object(g.jsx)(o.ab,{htmlFor:"add-pricing-service-name-input",children:"T\xean D\u1ecbch v\u1ee5:"})}),Object(g.jsx)(o.u,{xs:"12",md:"8",children:Object(g.jsx)(o.Q,{type:"text",id:"add-pricing-service-name-input",name:"service-name",value:(t=p,t.includes("messaging_session")?"Phi\xean nh\u1eafn tin":t.includes("live_call_session")?"Phi\xean g\u1ecdi tr\u1ef1c tuy\u1ebfn":t.includes("translation_call_session")?"Ph\xf2ng phi\xean d\u1ecbch tr\u1ef1c tuy\u1ebfn":"Kh\xf4ng x\xe1c \u0111\u1ecbnh"),readOnly:!0})})]}),Object(g.jsxs)(o.K,{row:!0,children:[Object(g.jsx)(o.u,{md:"4",children:Object(g.jsx)(o.ab,{htmlFor:"add-pricing-quantity-input",children:"Th\u1eddi l\u01b0\u1ee3ng:"})}),Object(g.jsx)(o.u,{xs:"12",md:"8",children:Object(g.jsxs)(o.ub,{className:"m-0",children:[Object(g.jsx)(o.Q,{type:"number",id:"add-pricing-quantity-input",className:"w-25 mr-2",name:"quantity",onChange:function(e){var t=e.target;return O(t.value)},required:!0}),v]})})]}),Object(g.jsxs)(o.K,{row:!0,children:[Object(g.jsx)(o.u,{md:"4",children:Object(g.jsx)(o.ab,{htmlFor:"add-pricing-price-input",children:"\u0110\u01a1n gi\xe1:"})}),Object(g.jsx)(o.u,{xs:"12",md:"8",children:Object(g.jsxs)(o.ub,{className:"m-0",children:[Object(g.jsx)(o.Q,{type:"number",className:"w-25 mr-2",id:"add-pricing-price-input",name:"price",onChange:function(e){var t=e.target;return w(t.value)},required:!0}),C]})})]}),T]}),Object(g.jsxs)(o.gb,{children:[Object(g.jsx)(o.f,{color:"primary",type:"submit",children:"Th\xeam"}),Object(g.jsx)(o.f,{color:"secondary",onClick:u(),children:"H\u1ee7y"})]})]})})},x=function(e){var t=e.selectedPricingId,n=e.show,r=e.handleClose,u=Object(l.g)(),d=Object(s.useState)(null),f=Object(i.a)(d,2),p=f[0],h=f[1],b=function(){var e=Object(c.a)(a.a.mark((function e(n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),e.next=3,O(t);case 3:!0===e.sent?(h(Object(g.jsx)(o.a,{color:"success",children:"X\xf3a th\xe0nh c\xf4ng!"})),u.push("/manage-pricing")):h(Object(g.jsx)(o.a,{color:"danger",children:"X\xf3a th\u1ea5t b\u1ea1i!"}));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsx)(o.eb,{show:n,onClose:r(),closeOnBackdrop:!1,color:"danger",children:Object(g.jsxs)(o.J,{onSubmit:b,method:"post",encType:"multipart/form-data",className:"form-horizontal",children:[Object(g.jsx)(o.hb,{closeButton:!0,children:Object(g.jsx)(o.ib,{children:"X\xf3a \u0110\u01a1n Gi\xe1"})}),Object(g.jsx)(o.fb,{children:p||"B\u1ea1n ch\u1eafc ch\u1eafn mu\u1ed1n x\xf3a \u0110\u01a1n Gi\xe1 ( id: "+t+" ) n\xe0y ch\u1ee9?"}),Object(g.jsxs)(o.gb,{children:[Object(g.jsx)(o.f,{color:"danger",type:"submit",children:"X\xf3a"}),Object(g.jsx)(o.f,{color:"secondary",onClick:r(),children:"H\u1ee7y"})]})]})})},P=n(926),_=n(666),w=n(647),k=[{key:"price",label:"\u0110\u01a1n gi\xe1",_style:{width:"14%"}},{key:"created_at",label:"Th\u1eddi gian t\u1ea1o",_style:{width:"25%"}},{key:"updated_at",label:"Th\u1eddi gian c\u1eadp nh\u1eadt",_style:{width:"25%"}},{key:"action",label:"",_style:{width:"6%"}}];t.default=function(){var e=Object(s.useState)(!1),t=Object(i.a)(e,2),n=t[0],r=t[1],l=Object(s.useState)(!1),d=Object(i.a)(l,2),b=d[0],m=d[1],j=Object(s.useState)(!1),O=Object(i.a)(j,2),C=O[0],N=O[1],S=Object(s.useState)(null),T=Object(i.a)(S,2),I=T[0],D=T[1],M=Object(s.useState)(null),U=Object(i.a)(M,2),E=U[0],z=U[1],A=Object(s.useState)(null),q=Object(i.a)(A,2),B=q[0],K=q[1],J=Object(s.useState)(null),R=Object(i.a)(J,2),F=R[0],H=R[1],G=Object(s.useState)(null),Q=Object(i.a)(G,2),X=Q[0],Z=Q[1],$=Object(w.usePromiseTracker)().promiseInProgress;Object(s.useEffect)(Object(c.a)(a.a.mark((function e(){var t,n,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(w.trackPromise)(f());case 2:return t=e.sent,e.next=5,Object(w.trackPromise)(p());case 5:return n=e.sent,e.next=8,Object(w.trackPromise)(h());case 8:r=e.sent,K(t),H(n),Z(r);case 12:case"end":return e.stop()}}),e)}))),[n,b]);var W=function(e){r(!0),D(e)},Y=function(e){m(!0),z(e)},V=function(e){N(!0),D(e)},L=function(){r(!1)},ee=function(){m(!1)},te=function(){N(!1)};return JSON.parse(localStorage.getItem("userInfo")).moderator_details.can_manage_pricing?Object(g.jsxs)(o.ub,{children:[Object(g.jsxs)(o.u,{children:[Object(g.jsxs)(o.j,{children:[Object(g.jsx)(o.n,{children:Object(g.jsx)("h3",{className:"m-0",children:"\u0110\u01a1n gi\xe1 d\u1ecbch v\u1ee5 Phi\xean Nh\u1eafn Tin:"})}),Object(g.jsx)(o.k,{className:"pt-0 pb-0",children:Object(g.jsx)(o.y,{addTableClasses:"text-break",items:B,fields:k,hover:!0,striped:!0,bordered:!0,size:"sm",itemsPerPage:20,pagination:!0,loading:$,noItemsView:{noResults:"Kh\xf4ng c\xf3 k\u1ebft qu\u1ea3 t\xecm ki\u1ebfm tr\xf9ng kh\u1edbp",noItems:"Kh\xf4ng c\xf3 d\u1eef li\u1ec7u"},scopedSlots:{price:function(e,t){return Object(g.jsx)("td",{className:"py-1",children:e.quantity+" "+e.quantity_unit+" = "+e.price+" "+e.price_unit})},created_at:function(e,t){return Object(g.jsx)("td",{className:"py-1",children:null==e.created_at||""==e.created_at?"":Object(P.a)(Object(_.a)(e.created_at),"dd-MM-yyyy hh:mm:ss")})},updated_at:function(e,t){return Object(g.jsx)("td",{className:"py-1",children:null==e.updated_at||""==e.updated_at?"":Object(P.a)(Object(_.a)(e.updated_at),"dd-MM-yyyy hh:mm:ss")})},action:function(e,t){return Object(g.jsx)("td",{className:"py-1",children:Object(g.jsx)("button",{type:"button",className:"table-action-button mr-2","data-toggle":"tooltip",title:"C\u1eadp nh\u1eadt",children:Object(g.jsx)(u.a,{name:"cil-pencil",onClick:function(){return W(e.id)}})})})}}})})]}),Object(g.jsxs)(o.j,{children:[Object(g.jsxs)(o.n,{children:[Object(g.jsx)("h3",{className:"m-0",children:"\u0110\u01a1n gi\xe1 d\u1ecbch v\u1ee5 Phi\xean G\u1ecdi Tr\u1ef1c Tuy\u1ebfn:"}),Object(g.jsxs)(o.f,{color:"primary",className:"mt-2 d-flex align-items-center",onClick:function(){return Y("live_call_session")},children:[Object(g.jsx)(u.a,{name:"cilPlus",size:"sm",className:"mr-1"}),"Th\xeam m\u1edbi \u0110\u01a1n Gi\xe1 d\u1ecbch v\u1ee5 Phi\xean G\u1ecdi Tr\u1ef1c Tuy\u1ebfn"]})]}),Object(g.jsx)(o.k,{className:"pt-0 pb-0",children:Object(g.jsx)(o.y,{addTableClasses:"text-break",items:F,fields:k,hover:!0,striped:!0,bordered:!0,size:"sm",itemsPerPage:20,pagination:!0,loading:$,noItemsView:{noResults:"Kh\xf4ng c\xf3 k\u1ebft qu\u1ea3 t\xecm ki\u1ebfm tr\xf9ng kh\u1edbp",noItems:"Kh\xf4ng c\xf3 d\u1eef li\u1ec7u"},scopedSlots:{price:function(e,t){return Object(g.jsx)("td",{className:"py-1",children:e.quantity+" "+e.quantity_unit+" = "+e.price+" "+e.price_unit})},created_at:function(e,t){return Object(g.jsx)("td",{className:"py-1",children:null==e.created_at||""==e.created_at?"":Object(P.a)(Object(_.a)(e.created_at),"dd-MM-yyyy hh:mm:ss")})},updated_at:function(e,t){return Object(g.jsx)("td",{className:"py-1",children:null==e.updated_at||""==e.updated_at?"":Object(P.a)(Object(_.a)(e.updated_at),"dd-MM-yyyy hh:mm:ss")})},action:function(e,t){return Object(g.jsxs)("td",{className:"py-1",children:[Object(g.jsx)("button",{type:"button",className:"table-action-button mr-2","data-toggle":"tooltip",title:"C\u1eadp nh\u1eadt",children:Object(g.jsx)(u.a,{name:"cil-pencil",onClick:function(){return W(e.id)}})}),Object(g.jsx)("button",{type:"button",className:"table-action-button mr-2","data-toggle":"tooltip",title:"X\xf3a",children:Object(g.jsx)(u.a,{name:"cil-x",onClick:function(){return V(e.id)}})})]})}}})})]}),Object(g.jsxs)(o.j,{children:[Object(g.jsxs)(o.n,{children:[Object(g.jsx)("h3",{className:"m-0",children:"\u0110\u01a1n gi\xe1 d\u1ecbch v\u1ee5 Ph\xf2ng Phi\xean D\u1ecbch Tr\u1ef1c Tuy\u1ebfn:"}),Object(g.jsxs)(o.f,{color:"primary",className:"mt-2 d-flex align-items-center",onClick:function(){return Y("translation_call_session")},children:[Object(g.jsx)(u.a,{name:"cilPlus",size:"sm",className:"mr-1"}),"Th\xeam m\u1edbi \u0110\u01a1n Gi\xe1 d\u1ecbch v\u1ee5 Ph\xf2ng Phi\xean D\u1ecbch"]})]}),Object(g.jsx)(o.k,{className:"pt-0 pb-0",children:Object(g.jsx)(o.y,{addTableClasses:"text-break",items:X,fields:k,hover:!0,striped:!0,bordered:!0,size:"sm",itemsPerPage:20,pagination:!0,loading:$,noItemsView:{noResults:"Kh\xf4ng c\xf3 k\u1ebft qu\u1ea3 t\xecm ki\u1ebfm tr\xf9ng kh\u1edbp",noItems:"Kh\xf4ng c\xf3 d\u1eef li\u1ec7u"},scopedSlots:{price:function(e,t){return Object(g.jsx)("td",{className:"py-1",children:e.quantity+" "+e.quantity_unit+" = "+e.price+" "+e.price_unit})},created_at:function(e,t){return Object(g.jsx)("td",{className:"py-1",children:null==e.created_at||""==e.created_at?"":Object(P.a)(Object(_.a)(e.created_at),"dd-MM-yyyy hh:mm:ss")})},updated_at:function(e,t){return Object(g.jsx)("td",{className:"py-1",children:null==e.updated_at||""==e.updated_at?"":Object(P.a)(Object(_.a)(e.updated_at),"dd-MM-yyyy hh:mm:ss")})},action:function(e,t){return Object(g.jsxs)("td",{className:"py-1",children:[Object(g.jsx)("button",{type:"button",className:"table-action-button mr-2","data-toggle":"tooltip",title:"C\u1eadp nh\u1eadt",children:Object(g.jsx)(u.a,{name:"cil-pencil",onClick:function(){return W(e.id)}})}),Object(g.jsx)("button",{type:"button",className:"table-action-button mr-2","data-toggle":"tooltip",title:"X\xf3a",children:Object(g.jsx)(u.a,{name:"cil-x",onClick:function(){return V(e.id)}})})]})}}})})]})]}),n&&null!=I?Object(g.jsx)(y,{selectedPricingId:I,show:n,handleClose:function(){return L}}):null,b&&null!=E?Object(g.jsx)(v,{selectedPricingServiceName:E,show:b,handleClose:function(){return ee}}):null,C&&null!=I?Object(g.jsx)(x,{selectedPricingId:I,show:C,handleClose:function(){return te}}):null]}):Object(g.jsx)(o.a,{color:"danger",children:"B\u1ea1n kh\xf4ng c\xf3 quy\u1ec1n s\u1eed d\u1ee5ng ch\u1ee9c n\u0103ng n\xe0y!"})}}}]);
//# sourceMappingURL=16.8bcf4f0c.chunk.js.map