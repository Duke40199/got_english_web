(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[23],{642:function(n,t,e){"use strict";var c=e(694),r=e.n(c).a.create({baseURL:"https://got-english-backend-production-swiyh5bc4q-de.a.run.app",timeout:1e4});t.a=r},658:function(n,t,e){"use strict";t.a=function(n){var t="";if(null!=n&&null!=n.response&&null!=n.response.data){var e=n.response.data;t=e.includes("Account is already suspended.")?"T\xe0i kho\u1ea3n n\xe0y \u0111\xe3 b\u1ecb kh\xf3a!":e.includes("account unavailable")?"Email \u0111\xe3 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng!":e.includes("'username'")?"T\xean t\xe0i kho\u1ea3n \u0111\xe3 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng!":e.includes("Account is currently in a messaging session")?"T\xe0i kho\u1ea3n n\xe0y hi\u1ec7n \u0111ang s\u1eed d\u1ee5ng d\u1ecbch v\u1ee5 Phi\xean nh\u1eafn tin! Ch\u01b0a th\u1ec3 kh\xf3a...":e.includes("Account is currently in a live call session")?"T\xe0i kho\u1ea3n n\xe0y hi\u1ec7n \u0111ang s\u1eed d\u1ee5ng d\u1ecbch v\u1ee5 Phi\xean g\u1ecdi tr\u1ef1c tuy\u1ebfn! Ch\u01b0a th\u1ec3 kh\xf3a...":e.includes("Account is currently in a translation session")?"T\xe0i kho\u1ea3n n\xe0y hi\u1ec7n \u0111ang s\u1eed d\u1ee5ng d\u1ecbch v\u1ee5 Ph\xf2ng phi\xean d\u1ecbch! Ch\u01b0a th\u1ec3 kh\xf3a...":e.includes("Account is not yet suspended.")?"T\xe0i kho\u1ea3n n\xe0y \u0111\xe3 \u0111\u01b0\u1ee3c m\u1edf kh\xf3a!":e.includes("You don't have permission")?"T\xe0i kho\u1ea3n c\u1ee7a b\u1ea1n kh\xf4ng c\xf3 quy\u1ec1n \u0111\u1ec3 th\u1ef1c hi\u1ec7n thao t\xe1c n\xe0y!":"\u0110\xe3 c\xf3 l\u1ed7i x\u1ea3y ra!"}return t}},986:function(n,t,e){"use strict";e.r(t);var c=e(633),r=e.n(c),i=e(634),a=e(637),s=e(1),u=e(635),o=e(642),h=e(658),l=function(){var n=Object(i.a)(r.a.mark((function n(){var t,e,c,i,a;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return t=JSON.parse(localStorage.getItem("user")).token,e=null,c=function(n){e=n.data.data},i=function(n){console.log(n)},a={headers:{Authorization:"Bearer ".concat(t)}},n.next=7,o.a.get("/rating-algorithm",a).then(c).catch(i);case 7:return n.abrupt("return",e);case 8:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),j=function(){var n=Object(i.a)(r.a.mark((function n(t){var e,c,i,a,s;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e=JSON.parse(localStorage.getItem("user")).token,c=null,i=function(n){c=n.data.success},a=function(n){c=Object(h.a)(n)},s={headers:{Authorization:"Bearer ".concat(e)}},n.next=7,o.a.put("/rating-algorithm",t,s).then(i).catch(a);case 7:return n.abrupt("return",c);case 8:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}(),m=e(800),d=function(n){var t={};if(null!=n.minimum_rating_count){var e=n.minimum_rating_count.toString(),c=parseInt(n.minimum_rating_count);Object(m.isEmpty)(e)?t.minimum_rating_count="Gi\xe1 tr\u1ecb (m) l\xe0 b\u1eaft bu\u1ed9c!":Object(m.isNumeric)(e)&&Object(m.isInt)(e)?(c<1||c>1e3)&&(t.minimum_rating_count="Gi\xe1 tr\u1ecb (m) ch\u1ec9 ch\u1ea5p nh\u1eadn gi\xe1 tr\u1ecb t\u1eeb 1 - 1000!"):t.minimum_rating_count="Gi\xe1 tr\u1ecb (m) ph\u1ea3i l\xe0 s\u1ed1 nguy\xean!"}return t},b=e(636),g=e(17);t.default=function(){var n=Object(s.useState)(""),t=Object(a.a)(n,2),e=t[0],c=t[1],o=Object(s.useState)(""),h=Object(a.a)(o,2),m=h[0],p=h[1],O=Object(s.useState)({}),x=Object(a.a)(O,2),f=x[0],k=x[1],y=Object(s.useState)(!1),v=Object(a.a)(y,2),_=v[0],C=v[1],S=Object(s.useState)(null),w=Object(a.a)(S,2),T=w[0],G=w[1],N=Object(b.usePromiseTracker)().promiseInProgress;Object(s.useEffect)((function(){function n(){return(n=Object(i.a)(r.a.mark((function n(){var t;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Object(b.trackPromise)(l());case 2:null!=(t=n.sent)&&(p(t.minimum_rating_count),c(t.average_all_experts_rating));case 4:case"end":return n.stop()}}),n)})))).apply(this,arguments)}!function(){n.apply(this,arguments)}()}),[]);var A=function(){var n=Object(i.a)(r.a.mark((function n(t){var e,c,i;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t.preventDefault(),e=d({minimum_rating_count:m}),!(0===Object.keys(e).length)){n.next=14;break}return c={minimum_rating_count:parseInt(m)},n.next=8,Object(b.trackPromise)(j(c));case 8:i=n.sent,G(!0===i?Object(g.jsx)(u.a,{color:"success",children:"C\u1eadp nh\u1eadt th\xe0nh c\xf4ng!"}):Object(g.jsx)(u.a,{color:"danger",children:i})),C(!1),k({}),n.next=17;break;case 14:C(!1),k(e),G(null);case 17:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}();return JSON.parse(localStorage.getItem("userInfo")).moderator_details.can_manage_rating_algorithm?Object(g.jsxs)(u.k,{children:[T,Object(g.jsxs)(u.g,{children:[Object(g.jsxs)(u.j,{children:[Object(g.jsx)("strong",{children:"C\xf4ng th\u1ee9c:"}),Object(g.jsx)("p",{children:"W = v * 1 / (v + m) * R + m * 1 / (v + m) * C"}),Object(g.jsx)("i",{children:"Trong \u0111\xf3:"}),Object(g.jsx)("br",{}),Object(g.jsx)("i",{children:"W = \u0110\xe1nh gi\xe1 Chuy\xean Gia c\xf3 tr\u1ecdng s\u1ed1"}),Object(g.jsx)("br",{}),Object(g.jsx)("i",{children:"v = S\u1ed1 l\u01b0\u1ee3t \u0111\u01b0\u1ee3c \u0110\xe1nh gi\xe1 c\u1ee7a Chuy\xean Gia"}),Object(g.jsx)("br",{}),Object(g.jsx)("i",{children:"R = Trung b\xecnh \u0110\xe1nh gi\xe1 c\u1ee7a Chuy\xean Gia"}),Object(g.jsx)("br",{})]}),Object(g.jsx)(u.h,{children:Object(g.jsxs)(u.u,{onSubmit:A,method:"post",encType:"multipart/form-data",className:"form-horizontal",children:[Object(g.jsxs)(u.O,{children:[Object(g.jsx)(u.k,{md:"4",children:Object(g.jsx)(u.H,{htmlFor:"update-minimum-rating-count",children:"Trung b\xecnh \u0110\xe1nh Gi\xe1 c\u1ee7a Chuy\xean Gia tr\xean to\xe0n h\u1ec7 th\u1ed1ng (C):"})}),Object(g.jsx)(u.k,{xs:"12",md:"8",children:Object(g.jsx)("p",{children:e})})]}),Object(g.jsxs)(u.O,{children:[Object(g.jsx)(u.k,{md:"4",children:Object(g.jsx)(u.H,{htmlFor:"update-minimum-rating-count",children:"S\u1ed1 l\u01b0\u1ee3t \u0110\xe1nh Gi\xe1 nh\u1ecf nh\u1ea5t m\xe0 Chuy\xean Gia c\u1ea7n \u0111\u1ea1t (m):"})}),Object(g.jsxs)(u.k,{xs:"12",md:"8",children:[Object(g.jsx)(u.A,{className:"w-25",type:"number",id:"update-minimum-rating-count",name:"minimum-rating-count",value:m,onChange:function(n){var t=n.target;return p(t.value)}}),null!=f.minimum_rating_count?Object(g.jsx)(u.G,{className:"d-block",children:f.minimum_rating_count}):null]})]}),Object(g.jsxs)(u.J,{show:_,onClose:function(){return C(!1)},closeOnBackdrop:!1,color:"success",children:[Object(g.jsx)(u.M,{closeButton:!0,children:Object(g.jsx)(u.N,{children:"X\xe1c nh\u1eadn"})}),Object(g.jsx)(u.K,{children:"Thay \u0111\u1ed5i n\xe0y s\u1ebd \u1ea3nh h\u01b0\u1edfng l\xean to\xe0n b\u1ed9 h\u1ec7 th\u1ed1ng. B\u1ea1n c\xf3 \u0111\u1ed3ng \xfd kh\xf4ng?"}),Object(g.jsxs)(u.L,{children:[Object(g.jsx)(u.f,{color:"success",type:"submit",disabled:N,children:"\u0110\u1ed3ng \xfd"}),Object(g.jsx)(u.f,{color:"secondary",onClick:function(){return C(!1)},children:"\u0110\xf3ng"})]})]})]})}),Object(g.jsx)(u.i,{children:Object(g.jsx)(u.f,{className:"mr-2",color:"success",disabled:N,onClick:function(){return C(!0)},children:"C\u1eadp nh\u1eadt"})})]})]}):Object(g.jsx)(u.a,{color:"danger",children:"B\u1ea1n kh\xf4ng c\xf3 quy\u1ec1n s\u1eed d\u1ee5ng ch\u1ee9c n\u0103ng n\xe0y!"})}}}]);
//# sourceMappingURL=23.2b87d386.chunk.js.map