(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[14],{636:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"trackPromise",{enumerable:!0,get:function(){return n.trackPromise}}),Object.defineProperty(t,"manuallyResetPromiseCounter",{enumerable:!0,get:function(){return n.manuallyResetPromiseCounter}}),Object.defineProperty(t,"manuallyDecrementPromiseCounter",{enumerable:!0,get:function(){return n.manuallyDecrementPromiseCounter}}),Object.defineProperty(t,"manuallyIncrementPromiseCounter",{enumerable:!0,get:function(){return n.manuallyIncrementPromiseCounter}}),Object.defineProperty(t,"promiseTrackerHoc",{enumerable:!0,get:function(){return a.promiseTrackerHoc}}),Object.defineProperty(t,"usePromiseTracker",{enumerable:!0,get:function(){return o.usePromiseTracker}});var n=r(659),a=r(798),o=r(799)},642:function(e,t,r){"use strict";var n=r(694),a=r.n(n).a.create({baseURL:"https://got-english-backend-production-swiyh5bc4q-de.a.run.app",timeout:1e4});t.a=a},659:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.manuallyIncrementPromiseCounter=t.manuallyDecrementPromiseCounter=t.manuallyResetPromiseCounter=t.trackPromise=t.getCounter=t.promiseCounterUpdateEventId=t.emitter=void 0;var n=r(797),a=r(692);var o=new n.Emitter;t.emitter=o;var i="promise-counter-update";t.promiseCounterUpdateEventId=i;var u,c,s,l=(u={},c=a.defaultArea,s=0,c in u?Object.defineProperty(u,c,{value:s,enumerable:!0,configurable:!0,writable:!0}):u[c]=s,u);t.getCounter=function(e){return l[e]};t.trackPromise=function(e,t){t=t||a.defaultArea,f(t);var r=function(){return h(t)};return e.then(r,r),e};var f=function(e){p(e);var t=d(e);o.emit(i,t,e)},p=function(e){Boolean(l[e])?l[e]++:l[e]=1},d=function(e){return l[e]>0},h=function(e){l[e]>0&&m(e);var t=d(e);o.emit(i,t,e)},m=function(e){l[e]--};t.manuallyResetPromiseCounter=function(e){e=e||a.defaultArea,l[e]=0,o.emit(i,!1,e)};t.manuallyDecrementPromiseCounter=function(e){e=e||a.defaultArea,h(e)};t.manuallyIncrementPromiseCounter=function(e){e=e||a.defaultArea,f(e)}},661:function(e,t,r){"use strict";r.d(t,"c",(function(){return c})),r.d(t,"b",(function(){return s}));var n=r(633),a=r.n(n),o=r(634),i=r(807);r(804),r(805);i.a.initializeApp({apiKey:"AIzaSyB0l31PMIfIMgDceOjlcOimsHUFSccvzjU",authDomain:"gotenglish-app.firebaseapp.com",projectId:"gotenglish-app",storageBucket:"gotenglish-app.appspot.com",messagingSenderId:"392616753385",appId:"1:392616753385:web:cf70a3478c6f8ea51d5878",measurementId:"G-T0K0LB12VF"});var u=i.a.auth();i.a.analytics();var c=function(){var e=Object(o.a)(a.a.mark((function e(t,r){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.signInWithEmailAndPassword(t,r).catch((function(e){console.error("Error signing in with password and email",e)})).then(function(){var e=Object(o.a)(a.a.mark((function e(t){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0===t){e.next=5;break}return r=t.user,e.next=4,r.getIdTokenResult(!1);case 4:n=e.sent;case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:return e.abrupt("return",n);case 3:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),s=function(){var e=Object(o.a)(a.a.mark((function e(t){var r,n,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=!1,n=function(e){r=!0},o=function(e){console.log(e)},e.next=5,u.sendPasswordResetEmail(t).then(n).catch(o);case 5:return e.abrupt("return",r);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();t.a=i.a},692:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.defaultArea=void 0;t.defaultArea="default-area"},693:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.setupConfig=t.defaultConfig=void 0;var n=r(692),a={area:n.defaultArea,delay:0};t.defaultConfig=a;t.setupConfig=function(e){return{area:e&&e.area?e.area:n.defaultArea,delay:e&&e.delay?e.delay:0}}},797:function(e,t,r){"use strict";function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}Object.defineProperty(t,"__esModule",{value:!0}),t.Emitter=void 0;var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,r,a;return t=e,(r=[{key:"emit",value:function(e){if(!e)return this;for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];var a=!0,o=!1,i=void 0;try{for(var u,c=this._e(e)[Symbol.iterator]();!(a=(u=c.next()).done);a=!0){var s=u.value;s.apply(s.ctx,[].concat(r)),1==s.off_event&&this.off(e,s)}}catch(l){o=!0,i=l}finally{try{a||null==c.return||c.return()}finally{if(o)throw i}}return this}},{key:"on",value:function(e,t,r){return e?(t.ctx=r,this._e(e).push(t),this):this}},{key:"once",value:function(e,t,r){return e?(t.ctx=r,t.off_event=!0,this.on(e,t)):this}},{key:"off",value:function(e,t){if(!e)return this;if(!this[e])return this;var r=this._e(e);return t?(this[e]=r.filter((function(e){return e!=t})),this):(delete this[e],this)}},{key:"_e",value:function(e){return this[e]||(this[e]=[])}}])&&n(t.prototype,r),a&&n(t,a),e}();t.Emitter=a},798:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.promiseTrackerHoc=void 0;var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==u(e)&&"function"!==typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var r={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var o=n?Object.getOwnPropertyDescriptor(e,a):null;o&&(o.get||o.set)?Object.defineProperty(r,a,o):r[a]=e[a]}r.default=e,t&&t.set(e,r);return r}(r(1)),a=r(659),o=r(693);function i(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}function u(e){return(u="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function s(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}t.promiseTrackerHoc=function(e){return function(t){function r(e){var t,n,a;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,r),n=this,(t=!(a=l(r).call(this,e))||"object"!==u(a)&&"function"!==typeof a?f(n):a).state={promiseInProgress:!1,internalPromiseInProgress:!1,config:(0,o.setupConfig)(e.config)},t.notifyPromiseInProgress=t.notifyPromiseInProgress.bind(f(t)),t.updateProgress=t.updateProgress.bind(f(t)),t.subscribeToCounterUpdate=t.subscribeToCounterUpdate.bind(f(t)),t}var i,d,h;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(r,t),i=r,(d=[{key:"notifyPromiseInProgress",value:function(){var e=this;0===this.state.config.delay?this.setState({promiseInProgress:!0}):setTimeout((function(){var t=Boolean((0,a.getCounter)(e.state.config.area)>0);e.setState({promiseInProgress:t})}),this.state.config.delay)}},{key:"updateProgress",value:function(e,t){this.setState({internalPromiseInProgress:e},t),e?this.notifyPromiseInProgress():this.setState({promiseInProgress:!1})}},{key:"subscribeToCounterUpdate",value:function(){var e=this;a.emitter.on(a.promiseCounterUpdateEventId,(function(t,r){e.state.config.area===r&&e.updateProgress(t)}))}},{key:"componentDidMount",value:function(){this.updateProgress(Boolean((0,a.getCounter)(this.state.config.area)>0),this.subscribeToCounterUpdate)}},{key:"componentWillUnmount",value:function(){a.emitter.off(a.promiseCounterUpdateEventId)}},{key:"render",value:function(){return n.default.createElement(e,c({},this.props,{config:this.state.config,promiseInProgress:this.state.promiseInProgress}))}}])&&s(i.prototype,d),h&&s(i,h),r}(n.Component)}},799:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.usePromiseTracker=void 0;var n,a=(n=r(1))&&n.__esModule?n:{default:n},o=r(659),i=r(693);function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e))&&"[object Arguments]"!==Object.prototype.toString.call(e))return;var r=[],n=!0,a=!1,o=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(c){a=!0,o=c}finally{try{n||null==u.return||u.return()}finally{if(a)throw o}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}t.usePromiseTracker=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i.defaultConfig,t=a.default.useRef(!1);a.default.useEffect((function(){return t.current=!0,function(){return t.current=!1}}),[]);var r=a.default.useState((0,i.setupConfig)(e)),n=u(r,1),c=n[0];a.default.useEffect((function(){t.current&&c&&c.area&&(0,o.getCounter)(c.area)>0&&(p(!0),b(!0))}),[c]);var s=a.default.useState(!1),l=u(s,2),f=l[0],p=l[1],d=a.default.useState(!1),h=u(d,2),m=h[0],b=h[1],y=a.default.useRef(f),g=function(){c&&c.delay&&0!==c.delay?setTimeout((function(){y.current&&b(!0)}),c.delay):b(!0)},v=function(e,r){t.current&&c.area===r&&(p(e),y.current=e,e?g():b(!1))};return a.default.useEffect((function(){return y.current=f,o.emitter.on(o.promiseCounterUpdateEventId,v),function(){return o.emitter.off(o.promiseCounterUpdateEventId,v)}}),[]),{promiseInProgress:m}}},803:function(e,t,r){"use strict";function n(e){this.message=e}n.prototype=new Error,n.prototype.name="InvalidCharacterError";var a="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(e){var t=String(e).replace(/=+$/,"");if(t.length%4==1)throw new n("'atob' failed: The string to be decoded is not correctly encoded.");for(var r,a,o=0,i=0,u="";a=t.charAt(i++);~a&&(r=o%4?64*r+a:a,o++%4)?u+=String.fromCharCode(255&r>>(-2*o&6)):0)a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a);return u};function o(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(a(e).replace(/(.)/g,(function(e,t){var r=t.charCodeAt(0).toString(16).toUpperCase();return r.length<2&&(r="0"+r),"%"+r})))}(t)}catch(e){return a(t)}}function i(e){this.message=e}i.prototype=new Error,i.prototype.name="InvalidTokenError",t.a=function(e,t){if("string"!=typeof e)throw new i("Invalid token specified");var r=!0===(t=t||{}).header?0:1;try{return JSON.parse(o(e.split(".")[r]))}catch(e){throw new i("Invalid token specified: "+e.message)}}},814:function(e,t,r){"use strict";r.d(t,"b",(function(){return u})),r.d(t,"a",(function(){return c}));var n=r(633),a=r.n(n),o=r(634),i=r(642),u=function(){var e=Object(o.a)(a.a.mark((function e(t){var r,n,o,u;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r={userData:null,errorMessage:null},void 0!==t){e.next=4;break}return r.errorMessage="Xin ki\u1ec3m tra l\u1ea1i th\xf4ng tin \u0111\u0103ng nh\u1eadp.",e.abrupt("return",r);case 4:return n=function(e){r.userData=e.data.data},o=function(e){console.log(e);var t="";null!=e.response?403===e.response.status?t="Xin ki\u1ec3m tra l\u1ea1i th\xf4ng tin \u0111\u0103ng nh\u1eadp.":401===e.response.status&&(t="T\xe0i kho\u1ea3n c\u1ee7a b\u1ea1n \u0111\xe3 b\u1ecb kh\xf3a."):t="\u0110\xe3 c\xf3 m\u1ed9t l\u1ed7i b\u1ea5t th\u01b0\u1eddng x\u1ea3y ra. Xin h\xe3y li\xean h\u1ec7 v\u1edbi Admin \u0111\u1ec3 b\u1ea3o tr\xec h\u1ec7 th\u1ed1ng.",r.errorMessage=t},u={headers:{Authorization:"Bearer ".concat(t.token)}},e.next=9,i.a.post("/login",null,u).then(n).catch(o);case 9:return e.abrupt("return",r);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),c=function(){var e=Object(o.a)(a.a.mark((function e(){var t,r,n,o,u;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=JSON.parse(localStorage.getItem("user")).token,r=null,n=function(e){r=e.data.data},o=function(e){console.log(e)},u={headers:{Authorization:"Bearer ".concat(t)}},e.next=7,i.a.get("/profile",u).then(n).catch(o);case 7:return e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},972:function(e,t,r){"use strict";r.r(t);var n=r(633),a=r.n(n),o=r(634),i=r(637),u=r(1),c=r(20),s=r(814),l=r(803),f=r(635),p=r(644),d=r(661),h=r(636),m=r(17);t.default=function(){var e=Object(u.useState)(""),t=Object(i.a)(e,2),r=t[0],n=t[1],b=Object(u.useState)(""),y=Object(i.a)(b,2),g=y[0],v=y[1],j=Object(u.useState)(),O=Object(i.a)(j,2),P=O[0],k=O[1],x=Object(u.useState)(null),w=Object(i.a)(x,2),C=w[0],I=w[1],S=Object(c.g)(),_=Object(h.usePromiseTracker)().promiseInProgress,E=function(){var e=Object(o.a)(a.a.mark((function e(t){var n,o,i,u;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,Object(h.trackPromise)(Object(d.c)(r,g));case 3:return n=e.sent,e.next=6,Object(h.trackPromise)(Object(s.b)(n));case 6:if(null==(o=e.sent).userData){e.next=24;break}if("Admin"!==(i=Object(l.a)(o.userData.token).claims.role_name)&&"Moderator"!==i){e.next=21;break}return I(Object(m.jsx)(f.a,{color:"success",children:"\u0110\u0103ng nh\u1eadp th\xe0nh c\xf4ng! Xin ch\u1edd trong gi\xe2y l\xe1t..."})),k(o.userData),console.log(P),localStorage.setItem("user",JSON.stringify(o.userData)),e.next=16,Object(s.a)();case 16:u=e.sent,localStorage.setItem("userInfo",JSON.stringify(u)),S.go(0),e.next=22;break;case 21:I(Object(m.jsx)(f.a,{color:"danger",children:"T\xe0i kho\u1ea3n c\u1ee7a b\u1ea1n kh\xf4ng c\xf3 quy\u1ec1n truy c\u1eadp h\u1ec7 th\u1ed1ng n\xe0y!"}));case 22:e.next=25;break;case 24:I(Object(m.jsx)(f.a,{color:"danger",children:o.errorMessage}));case 25:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(m.jsx)("div",{className:"c-app c-default-layout flex-row align-items-center",children:Object(m.jsx)(f.l,{children:Object(m.jsx)(f.O,{className:"justify-content-center",children:Object(m.jsx)(f.k,{md:"8",children:Object(m.jsx)(f.g,{children:Object(m.jsx)(f.h,{children:Object(m.jsxs)(f.u,{onSubmit:E,children:[Object(m.jsx)("h1",{children:"\u0110\u0103ng nh\u1eadp"}),Object(m.jsx)("p",{className:"text-muted",children:"Xin h\xe3y \u0111i\u1ec1n th\xf4ng tin t\xe0i kho\u1ea3n"}),Object(m.jsxs)(f.D,{className:"mb-3",children:[Object(m.jsx)(f.E,{children:Object(m.jsx)(f.F,{children:Object(m.jsx)(p.a,{name:"cil-envelope-closed"})})}),Object(m.jsx)(f.A,{type:"email",placeholder:"Email",required:!0,onChange:function(e){var t=e.target;return n(t.value)}})]}),Object(m.jsxs)(f.D,{className:"mb-4",children:[Object(m.jsx)(f.E,{children:Object(m.jsx)(f.F,{children:Object(m.jsx)(p.a,{name:"cil-lock-locked"})})}),Object(m.jsx)(f.A,{type:"password",placeholder:"M\u1eadt kh\u1ea9u",required:!0,onChange:function(e){var t=e.target;return v(t.value)}})]}),_?Object(m.jsx)("div",{className:"spinner-border text-primary mb-3"}):null!=C&&""!==C?C:null,Object(m.jsxs)(f.O,{children:[Object(m.jsx)(f.k,{xs:"6",children:Object(m.jsx)(f.f,{color:"primary",className:"px-4",type:"Submit",disabled:_,children:"\u0110\u0103ng Nh\u1eadp"})}),Object(m.jsx)(f.k,{xs:"6",className:"text-right",children:Object(m.jsx)(f.f,{color:"link",className:"px-0",onClick:function(){return S.push("/recover-account")},children:"Qu\xean m\u1eadt kh\u1ea9u?"})})]})]})})})})})})})}}}]);
//# sourceMappingURL=14.aa8068f7.chunk.js.map