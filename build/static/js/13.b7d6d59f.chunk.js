(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[13],{631:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var o=n(632);function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var n=[],o=!0,r=!1,i=void 0;try{for(var a,l=t[Symbol.iterator]();!(o=(a=l.next()).done)&&(n.push(a.value),!e||n.length!==e);o=!0);}catch(c){r=!0,i=c}finally{try{o||null==l.return||l.return()}finally{if(r)throw i}}return n}}(t,e)||Object(o.a)(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},632:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var o=n(633);function r(t,e){if(t){if("string"===typeof t)return Object(o.a)(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(o.a)(t,e):void 0}}},633:function(t,e,n){"use strict";function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}n.d(e,"a",(function(){return o}))},888:function(t,e,n){t.exports=function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e){t.exports=n(1)},function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return b}));var o=n(0),r=n.n(o);function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function u(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=d(t);if(e){var r=d(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return s(this,n)}}function s(t,e){return!e||"object"!==i(e)&&"function"!=typeof e?f(t):e}function f(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function d(t){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function m(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function p(t){var e=0,n=0;return t.touches&&t.touches.length?(e=t.touches[0].pageX,n=t.touches[0].pageY):(e=t.pageX,n=t.pageY),{x:e,y:n}}function v(t){return t.condition?r.a.createElement(r.a.Fragment,null,t.children):null}var b=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(i,t);var e,n,o=u(i);function i(){var t,e,n,l,c;a(this,i);for(var u=arguments.length,s=new Array(u),d=0;d<u;d++)s[d]=arguments[d];return m(f(c=o.call.apply(o,[this].concat(s))),"initX",0),m(f(c),"initY",0),m(f(c),"lastX",0),m(f(c),"lastY",0),m(f(c),"_cont",r.a.createRef()),m(f(c),"state",{x:0,y:0,zoom:1,rotate:0,loading:!0,moving:!1,current:null!==(t=null===(e=c.props)||void 0===e?void 0:e.startIndex)&&void 0!==t?t:0,multi:!(null===(n=c.props)||void 0===n||null===(l=n.images)||void 0===l||!l.length)}),m(f(c),"createTransform",(function(t,e,n,o){return"translate3d(".concat(t,"px,").concat(e,"px,0px) scale(").concat(n,") rotate(").concat(o,"deg)")})),m(f(c),"stopSideEffect",(function(t){return t.stopPropagation()})),m(f(c),"getCurrentImage",(function(t,e){var n,o,r,i,a;return t.multi?null!==(o=null!==(r=null===(i=e.images[t.current])||void 0===i?void 0:i.url)&&void 0!==r?r:null===(a=e.images)||void 0===a?void 0:a[t.current])&&void 0!==o?o:"":null!==(n=e.image)&&void 0!==n?n:""})),m(f(c),"getCurrentTitle",(function(t,e){var n,o,r,i;return t.multi?null!==(o=null===(r=e.images)||void 0===r||null===(i=r[t.current])||void 0===i?void 0:i.title)&&void 0!==o?o:"":null!==(n=e.title)&&void 0!==n?n:""})),m(f(c),"resetZoom",(function(){return c.setState({x:0,y:0,zoom:1})})),m(f(c),"shockZoom",(function(t){var e,n,o=c.props,r=o.zoomStep,i=void 0===r?.3:r,a=o.allowZoom,l=void 0===a||a,u=o.doubleClickZoom,s=void 0===u?4:u;if(!l||!s)return!1;if(c.stopSideEffect(t),c.state.zoom>1)return c.resetZoom();var f=(i<1?Math.ceil(s/i):i)*i,d=p(t),m=null===(e=c._cont.current)||void 0===e||null===(n=e.getBoundingClientRect)||void 0===n?void 0:n.call(e),v=m.x+m.width/2,b=m.y+m.height/2,y=-1*(d.x-v)*f,g=-1*(d.y-b)*f;c.setState({x:y,y:g,zoom:f})})),m(f(c),"navigateImage",(function(t,e){c.stopSideEffect(e);var n=0;switch(t){case"next":n=c.state.current+1;break;case"prev":n=c.state.current-1}n>=c.props.images.length?n=0:n<0&&(n=c.props.images.length-1),c.setState({current:n,x:0,y:0,zoom:1,rotate:0,loading:!0})})),m(f(c),"startMove",(function(t){if(c.state.zoom<=1)return!1;c.setState({moving:!0});var e=p(t);c.initX=e.x-c.lastX,c.initY=e.y-c.lastY})),m(f(c),"duringMove",(function(t){if(!c.state.moving)return!1;var e=p(t);c.lastX=e.x-c.initX,c.lastY=e.y-c.initY,c.setState({x:e.x-c.initX,y:e.y-c.initY})})),m(f(c),"endMove",(function(t){return c.setState({moving:!1})})),m(f(c),"applyZoom",(function(t){var e=c.props.zoomStep,n=void 0===e?.3:e;switch(t){case"in":c.setState({zoom:c.state.zoom+n});break;case"out":var o=c.state.zoom-n;if(o<1)break;1===o?c.setState({x:0,y:0,zoom:1}):c.setState({zoom:o});break;case"reset":c.resetZoom()}})),m(f(c),"applyRotate",(function(t){switch(t){case"cw":c.setState({rotate:c.state.rotate+90});break;case"acw":c.setState({rotate:c.state.rotate-90})}})),m(f(c),"reset",(function(t){c.stopSideEffect(t),c.setState({x:0,y:0,zoom:1,rotate:0})})),m(f(c),"exit",(function(t){if("function"==typeof c.props.onClose)return c.props.onClose(t);console.error("No Exit function passed on prop: onClose. Clicking the close button will do nothing")})),m(f(c),"shouldShowReset",(function(){return c.state.x||c.state.y||1!==c.state.zoom||0!==c.state.rotate})),m(f(c),"canvasClick",(function(t){var e=c.props.clickOutsideToExit;if((void 0===e||e)&&c.state.zoom<=1)return c.exit(t)})),m(f(c),"keyboardNavigation",(function(t){var e=c.props,n=e.allowZoom,o=void 0===n||n,r=e.allowReset,i=void 0===r||r,a=c.state,l=a.multi,u=a.x,s=a.y,f=a.zoom;switch(t.key){case"ArrowLeft":l&&1===f?c.navigateImage("prev",t):f>1&&c.setState({x:u-20});break;case"ArrowRight":l&&1===f?c.navigateImage("next",t):f>1&&c.setState({x:u+20});break;case"ArrowUp":f>1&&c.setState({y:s+20});break;case"ArrowDown":f>1&&c.setState({y:s-20});break;case"+":o&&c.applyZoom("in");break;case"-":o&&c.applyZoom("out");break;case"Escape":i&&c.shouldShowReset()?c.reset(t):c.exit(t)}})),c}return e=i,(n=[{key:"componentDidMount",value:function(){document.body.classList.add("lb-open-lightbox");var t=this.props.keyboardInteraction;(void 0===t||t)&&document.addEventListener("keyup",this.keyboardNavigation)}},{key:"componentWillUnmount",value:function(){document.body.classList.remove("lb-open-lightbox");var t=this.props.keyboardInteraction;(void 0===t||t)&&document.removeEventListener("keyup",this.keyboardNavigation)}},{key:"render",value:function(){var t=this,e=this.getCurrentImage(this.state,this.props),n=this.getCurrentTitle(this.state,this.props);if(!e)return console.warn("Not showing lightbox because no image(s) was supplied"),null;var o=this.props,i=o.allowZoom,a=void 0===i||i,l=o.allowRotate,c=void 0===l||l,u=o.buttonAlign,s=void 0===u?"flex-end":u,f=o.showTitle,d=void 0===f||f,m=o.allowReset,p=void 0===m||m,b=this.state,y=b.x,g=b.y,h=b.zoom,x=b.rotate,w=b.multi,k=b.loading,S=b.moving,E=p&&this.shouldShowReset();return r.a.createElement("div",{className:"lb-container"},r.a.createElement("div",{className:"lb-header",style:{justifyContent:s}},r.a.createElement(v,{condition:d&&n},r.a.createElement("div",{className:"lb-title",style:{display:"center"===s?"none":"flex",order:"flex-start"===s?"2":"unset"}},r.a.createElement("span",{title:n,style:{textAlign:"flex-start"===s?"right":"left"}},n))),r.a.createElement(v,{condition:"center"===s||E},r.a.createElement("div",{title:"Reset",style:{order:"flex-start"===s?"1":"unset"},className:"lb-button lb-icon-reset lb-hide-mobile reload ".concat(E?"":"lb-disabled"),onClick:this.reset})),r.a.createElement(v,{condition:w},r.a.createElement("div",{title:"Previous",className:"lb-button lb-icon-arrow prev lb-hide-mobile",onClick:function(e){return t.navigateImage("prev",e)}}),r.a.createElement("div",{title:"Next",className:"lb-button lb-icon-arrow next lb-hide-mobile",onClick:function(e){return t.navigateImage("next",e)}})),r.a.createElement(v,{condition:a},r.a.createElement("div",{title:"Zoom In",className:"lb-button lb-icon-zoomin zoomin",onClick:function(){return t.applyZoom("in")}}),r.a.createElement("div",{title:"Zoom Out",className:"lb-button lb-icon-zoomout zoomout ".concat(h<=1?"lb-disabled":""),onClick:function(){return t.applyZoom("out")}})),r.a.createElement(v,{condition:c},r.a.createElement("div",{title:"Rotate left",className:"lb-button lb-icon-rotate rotatel",onClick:function(){return t.applyRotate("acw")}}),r.a.createElement("div",{title:"Rotate right",className:"lb-button lb-icon-rotate rotater",onClick:function(){return t.applyRotate("cw")}})),r.a.createElement("div",{title:"Close",className:"lb-button lb-icon-close close",style:{order:"flex-start"===s?"-1":"unset"},onClick:function(e){return t.exit(e)}})),r.a.createElement("div",{className:"lb-canvas".concat(k?" lb-loading":""),ref:this._cont,onClick:function(e){return t.canvasClick(e)}},r.a.createElement("img",{draggable:"false",style:{transform:this.createTransform(y,g,h,x),cursor:h>1?"grab":"unset",transition:S?"none":"all 0.1s"},onMouseDown:function(e){return t.startMove(e)},onTouchStart:function(e){return t.startMove(e)},onMouseMove:function(e){return t.duringMove(e)},onTouchMove:function(e){return t.duringMove(e)},onMouseUp:function(e){return t.endMove(e)},onMouseLeave:function(e){return t.endMove(e)},onTouchEnd:function(e){return t.endMove(e)},onClick:function(e){return t.stopSideEffect(e)},onDoubleClick:function(e){return t.shockZoom(e)},onLoad:function(e){return t.setState({loading:!1})},className:"lb-img".concat(k?" lb-loading":""),title:n,src:e,alt:n}),r.a.createElement("div",{className:"mobile-controls lb-show-mobile"},w?r.a.createElement("div",{title:"Previous",className:"lb-button lb-icon-arrow prev",onClick:function(e){return t.navigateImage("prev",e)}}):null,E?r.a.createElement("div",{title:"Reset",className:"lb-button lb-icon-reset reload",onClick:this.reset}):null,w?r.a.createElement("div",{title:"Next",className:"lb-button lb-icon-arrow next",onClick:function(e){return t.navigateImage("next",e)}}):null)))}}])&&l(e.prototype,n),i}(r.a.Component)}])},889:function(t,e,n){}}]);
//# sourceMappingURL=13.b7d6d59f.chunk.js.map