(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[10],{100:function(t,e,n){"use strict";function r(t,e,n,r,a,o,c){try{var i=t[o](c),u=i.value}catch(s){return void n(s)}i.done?e(u):Promise.resolve(u).then(r,a)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(a,o){var c=t.apply(e,n);function i(t){r(c,a,o,i,u,"next",t)}function u(t){r(c,a,o,i,u,"throw",t)}i(void 0)}))}}n.d(e,"a",(function(){return a}))},104:function(t,e,n){var r=function(t){"use strict";var e=Object.prototype,n=e.hasOwnProperty,r="function"===typeof Symbol?Symbol:{},a=r.iterator||"@@iterator",o=r.asyncIterator||"@@asyncIterator",c=r.toStringTag||"@@toStringTag";function i(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{i({},"")}catch(k){i=function(t,e,n){return t[e]=n}}function u(t,e,n,r){var a=e&&e.prototype instanceof f?e:f,o=Object.create(a.prototype),c=new O(r||[]);return o._invoke=function(t,e,n){var r="suspendedStart";return function(a,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw o;return L()}for(n.method=a,n.arg=o;;){var c=n.delegate;if(c){var i=E(c,n);if(i){if(i===l)continue;return i}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=s(t,e,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===l)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}(t,n,c),o}function s(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(k){return{type:"throw",arg:k}}}t.wrap=u;var l={};function f(){}function m(){}function y(){}var h={};h[a]=function(){return this};var d=Object.getPrototypeOf,p=d&&d(d(x([])));p&&p!==e&&n.call(p,a)&&(h=p);var v=y.prototype=f.prototype=Object.create(h);function b(t){["next","throw","return"].forEach((function(e){i(t,e,(function(t){return this._invoke(e,t)}))}))}function g(t,e){var r;this._invoke=function(a,o){function c(){return new e((function(r,c){!function r(a,o,c,i){var u=s(t[a],t,o);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"===typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,c,i)}),(function(t){r("throw",t,c,i)})):e.resolve(f).then((function(t){l.value=t,c(l)}),(function(t){return r("throw",t,c,i)}))}i(u.arg)}(a,o,r,c)}))}return r=r?r.then(c,c):c()}}function E(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var r=s(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,l;var a=r.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function w(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function x(t){if(t){var e=t[a];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:L}}function L(){return{value:void 0,done:!0}}return m.prototype=v.constructor=y,y.constructor=m,m.displayName=i(y,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,i(t,c,"GeneratorFunction")),t.prototype=Object.create(v),t},t.awrap=function(t){return{__await:t}},b(g.prototype),g.prototype[o]=function(){return this},t.AsyncIterator=g,t.async=function(e,n,r,a,o){void 0===o&&(o=Promise);var c=new g(u(e,n,r,a),o);return t.isGeneratorFunction(n)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},b(v),i(v,c,"Generator"),v[a]=function(){return this},v.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=x,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(w),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return c.type="throw",c.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],c=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var i=n.call(o,"catchLoc"),u=n.call(o,"finallyLoc");if(i&&u){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=t,c.arg=e,o?(this.method="next",this.next=o.finallyLoc,l):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),w(n),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;w(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:x(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),l}},t}(t.exports);try{regeneratorRuntime=r}catch(a){Function("r","regeneratorRuntime = r")(r)}},156:function(t,e,n){t.exports=n.p+"static/media/fast-forward.04baf9a2.png"},196:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return F}));var r=n(91),a=n(94),o=n(3),c=n.n(o),i=n(10),u=n(49),s=n(101),l=n(95),f=n(27),m=n(96),y=n(99),h=n.n(y),d=n(100),p=function(t){var e=t.text,n=t.fadeOut,a=t.style,i=Object(o.useState)(0),u=Object(r.a)(i,2),s=u[0],l=u[1],f=Object(o.useState)(""),y=Object(r.a)(f,2),p=y[0],v=y[1],b=function(t){return new Promise((function(e){return setTimeout(e,t)}))};return Object(o.useEffect)((function(){l(1),v(e)}),[e]),Object(o.useEffect)((function(){(function(){var t=Object(d.a)(h.a.mark((function t(){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return l(0),t.next=3,b(250);case 3:v(e),l(1);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[e]),c.a.createElement("p",{style:Object(m.a)({textAlign:n?"left":"center",transition:"opacity 0.25s",opacity:s},a)},p)},v=n(98),b=n(107),g=n(50),E=n(92),j=n(110),w=n(117),O=n.n(w),x=n(153);function L(t){var e=t.id,n=t.text,a=t.time,i=t.timePixelOffset,u=t.changeLyricById,s=t.videoDuration,l=t.width,f=t.playing,m=t.setPlaying,y=Object(o.useState)("primary"),p=Object(r.a)(y,2),v=p[0],b=p[1],g=Object(o.useState)(130),j=Object(r.a)(g,2),w=j[0],O=j[1];Object(o.useEffect)((function(){a-s<=.5&&a-s>0&&function(){var t=Object(d.a)(h.a.mark((function t(){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t){return setTimeout(t,1e3*(a-s))}));case 2:return b("warning"),t.next=5,new Promise((function(t){return setTimeout(t,500)}));case 5:b("primary");case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()()}),[s,a]);var L=Object(o.useState)(i),k=Object(r.a)(L,2),S=k[0],C=k[1],T=Object(o.useState)(!1),P=Object(r.a)(T,2),I=P[0],D=P[1],N=function(){var t=Object(d.a)(h.a.mark((function t(n){var r,a;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=10*((r=n/l)-.5),O(1e3),a=f,m(!1),u(e,s+r),D(!1),t.next=9,new Promise((function(t){return setTimeout(t,1e3)}));case 9:a&&m(!0),O(130);case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(o.useEffect)((function(){I||C(i)}),[i,I]),c.a.createElement(c.a.Fragment,null,c.a.createElement(x.DraggableCore,{axis:"x",onStart:function(){return D(!0)},onStop:function(){return N(S)},onDrag:function(t){var e=t.movementX,n=t.clientX,r=t.screenX;C((function(t){return e*(n/r)+t})),O(0)}},c.a.createElement(E.a,{key:e,variant:v,style:{transition:"transform linear ".concat(w,"ms"),position:"absolute",alignSelf:"center",transform:"translate(".concat(S,"px, 0px)"),justifyContent:"start"}},c.a.createElement("p",{style:{fontSize:"30px"}},n))))}function k(t){var e=t.videoDuration,n=t.syncedLyrics,a=t.changeLyricById,i=t.aboveProgressBar,u=t.playing,f=t.setPlaying,m=Object(o.useState)(Array(3)),y=Object(r.a)(m,2),h=y[0],d=y[1],p=Object(o.useState)(0),v=Object(r.a)(p,2),b=v[0],g=v[1],E=Object(o.useRef)();return Object(o.useLayoutEffect)((function(){E.current&&g(E.current.offsetWidth)}),[]),Object(o.useEffect)((function(){for(var t=Array(3),r=0;r<t.length;r++)t[r]=[];n.forEach((function(n){n.forEach((function(n){var r,a=n.time-e;(-5<a&&a<5||!n.time)&&(r=n.id,i?0<=r%6&&r%6<=2:3<=r%6&&r%6<=6)&&t[n.id%3].push(n)}))})),d(t)}),[e,i,n]),c.a.createElement(l.a,{ref:E,fluid:!0,style:{height:"30%",width:"80%"}},c.a.createElement(c.a.Fragment,null,h.map((function(t,n){return c.a.createElement(s.a,{key:n,style:{marginTop:"8%"}},t.map((function(t){var n=(t.time-e+5)/10,r=b*n;return c.a.createElement(L,{key:t.id,text:t.text,id:t.id,time:t.time,changeLyricById:a,videoDuration:e,timePixelOffset:r,width:b,playing:u,setPlaying:f})})))}))))}var S=n(109),C=n(151),T=n.n(C),P=n(152),I=n.n(P);function D(){var t=Object(a.a)(["\nmutation postsyncedlyrics($syncedLyrics: [[InputSyncedLyric]], $synchronizationData: InputSynchronizationData){\n  postSyncedLyrics(syncedLyrics: $syncedLyrics, synchronizationData: $synchronizationData)\n}\n"]);return D=function(){return t},t}var N=Object(u.gql)(D());function z(t){var e=t.syncedLyrics,a=t.startTime,f=t.endTime,y=Object(i.g)(),h=y.youtubeID,d=y.geniusID,p=Object(o.useRef)(null),w=Object(o.useRef)(null),x=Object(o.useRef)(null),L=Object(i.f)(),C=Object(o.useState)(e),P=Object(r.a)(C,2),D=P[0],z=P[1],_=Object(u.useMutation)(N,{variables:{syncedLyrics:D,synchronizationData:{youtubeID:h,geniusID:d,startTime:a,endTime:f}},onCompleted:function(){nt(!0)}}),B=Object(r.a)(_,1)[0],F=Object(o.useState)(""),R=Object(r.a)(F,2),G=R[0],A=R[1],$=Object(o.useState)(0),W=Object(r.a)($,2),X=W[0],q=W[1],M=Object(o.useState)(""),H=Object(r.a)(M,2),J=H[0],Y=H[1],Q=Object(o.useState)(!1),K=Object(r.a)(Q,2),U=K[0],V=K[1],Z=Object(o.useState)(!1),tt=Object(r.a)(Z,2),et=tt[0],nt=tt[1],rt=function(t,e){var n=function(t){return"".concat(Math.floor(t/60),":").concat(t%60>=9?(t%60).toFixed(2):"0"+(t%60).toFixed(2))};z((function(r){return r.map((function(r){return r.map((function(r){return r.id===t?(Y("'".concat(r.text,"' ").concat(n(r.time)," \u2192 ").concat(n(e))),Object(m.a)(Object(m.a)({},r),{},{time:e})):r}))}))})),p.current.seekTo(e-2)},at=Object(o.useState)(!0),ot=Object(r.a)(at,2),ct=ot[0],it=ot[1],ut=Object(o.useState)(!0),st=Object(r.a)(ut,2),lt=st[0],ft=st[1];Object(o.useEffect)((function(){document.addEventListener("keydown",mt,!1);var t=setInterval((function(){if(p.current){var t=p.current.getCurrentTime();t<a&&(p.current.seekTo(a),q(a)),t>f?(p.seekTo(f),q(f),it(!1)):q(t)}A("".concat(Math.floor(X/60),":").concat(X%60>=9?(X%60).toFixed(2):"0"+(X%60).toFixed(2)))}),200);return function(){clearInterval(t),window.removeEventListener("keydown",mt)}}),[f,q,a]);var mt=function(t){"Space"===t.code&&it((function(t){return!t}))};return c.a.createElement(l.a,{fluid:!0,style:{paddingLeft:0,paddingRight:0}},c.a.createElement(v.a,{centerContent:c.a.createElement(S.a.Collapse,null,c.a.createElement(E.a,{disabled:lt,style:{color:"black",height:"40px",textAlign:"center"},onClick:function(){return it((function(t){return!t}))}},c.a.createElement(g.a,{style:{height:30,width:30},src:ct?T.a:I.a})),c.a.createElement(S.a.Text,{style:{fontSize:30,marginLeft:10}}," ",G)),customContent:c.a.createElement(S.a.Text,{style:{fontSize:15}},"Icons made by ",c.a.createElement("a",{href:"https://www.flaticon.com/authors/elias-bikbulatov",title:"Elias Bikbulatov"}," Elias Bikbulatov"),"             from ",c.a.createElement("a",{href:"https://www.flaticon.com/",title:"Flaticon"}," www.flaticon.com"))}),c.a.createElement(l.a,{style:{position:"relative"}},c.a.createElement(s.a,{style:{position:"relative"}},c.a.createElement(O.a,{ref:p,playing:ct,onBuffer:function(){return ft(!0)},onBufferEnd:function(){return ft(!1)},url:"https://www.youtube.com/watch?v=".concat(h),controls:!1,style:{opacity:0}}))),c.a.createElement(l.a,{fluid:!0,style:{position:"absolute",top:0,left:0,right:0,bottom:0}},c.a.createElement("div",{style:{position:"absolute",left:"50%",marginLeft:"-3px",top:0,bottom:0,borderLeft:"4px solid black"}}),c.a.createElement(j.a,{style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",zIndex:1e3},show:U,dismissible:!0,onClose:function(){return V(!1)},variant:et?"success":"primary"},et?c.a.createElement(c.a.Fragment,null,c.a.createElement(j.a.Heading,null,"Success: lyrics saved!"),c.a.createElement(E.a,{onClick:function(){return L.push("/p/".concat(h,"/").concat(d))}}," Play now!")):c.a.createElement(c.a.Fragment,null,c.a.createElement(j.a.Heading,{style:{justifyContent:"center"}}," Click the button below to confirm your submission "),c.a.createElement(E.a,{onClick:function(){return B()}}," Send Lyric Synchronization"))),c.a.createElement(s.a,{className:"justify-content-center h-10"},c.a.createElement(b.a,{xs:5}),c.a.createElement(b.a,{className:"align-self-center",xs:1}),c.a.createElement(b.a,{style:{alignSelf:"center",fontSize:"20px"},xs:5})),c.a.createElement(k,{videoDuration:X,syncedLyrics:D,changeLyricById:rt,aboveProgressBar:!0,playing:ct,setPlaying:it}),c.a.createElement(l.a,{fluid:!0,className:"mw-100 h-10"},c.a.createElement(s.a,{className:"align-self-center"},c.a.createElement(b.a,{xs:1,className:"align-self-center"},c.a.createElement(E.a,{ref:x,disabled:lt,block:!0,onClick:function(){q(X-10),x.current.blur()}},c.a.createElement(g.a,{style:{justifyContent:"center",height:30,transform:"scaleX(-1)"},src:n(156)}))),c.a.createElement(b.a,{className:"align-self-center",xs:10},c.a.createElement("hr",{style:{color:"black",backgroundColor:"black",height:2}})),c.a.createElement(b.a,{xs:1,className:"align-self-center"},c.a.createElement(E.a,{ref:w,disabled:lt,block:!0,onClick:function(){q(X+10),w.current.blur()}},c.a.createElement(g.a,{style:{justifyContent:"center",height:30},src:n(156)}))))),c.a.createElement(k,{videoDuration:X,syncedLyrics:D,changeLyricById:rt,aboveProgressBar:!1,playing:ct,setPlaying:it}),c.a.createElement("div",{style:{width:1,backgroundColor:"black",position:"absolute",left:"50%",transform:"translate(-50%, 0%)"}}),c.a.createElement(S.a,{style:{height:60,maxWidth:"100%"},fixed:"bottom",bg:"secondary",variant:"dark"},c.a.createElement(S.a.Collapse,{style:{position:"absolute",transform:"translate(-50%, 0%)",left:"50%"}},c.a.createElement(S.a.Text,{style:{fontSize:40}},J)),c.a.createElement(S.a.Collapse,{className:"justify-content-end"},c.a.createElement(E.a,{onClick:function(){return V(!0)}}," Submit synchronization ")))))}function _(){var t=Object(a.a)(["\n  query processedlyrics($id: String) {\n    processedLyrics(id: $id) {\n      id\n      text\n    }\n  }\n"]);return _=function(){return t},t}var B=Object(u.gql)(_());function F(t){var e=t.startTime,n=t.endTime,a=Object(i.g)(),m=a.youtubeID,y=a.geniusID,h=Object(o.useRef)(null),d=Object(o.useState)(!1),b=Object(r.a)(d,2),g=b[0],E=b[1],j=Object(o.useState)(!1),w=Object(r.a)(j,2),x=w[0],L=w[1],k=Object(o.useState)(!0),S=Object(r.a)(k,2),C=S[0],T=S[1],P=Object(o.useState)(0),I=Object(r.a)(P,2),D=I[0],N=I[1],_=Object(o.useState)(0),F=Object(r.a)(_,2),R=F[0],G=F[1],A=Object(o.useState)({}),$=Object(r.a)(A,2),W=$[0],X=$[1];Object(o.useEffect)((function(){var t=function(t){t.keyCode&&(g?C||D<W.length&&(X((function(t){return t.map((function(t,e){return t.map((function(t,n){return e===D&&n===R&&(t.time=h.current.getCurrentTime()),t}))}))})),W[D].length-1===R?(N((function(t){return t+1})),G(0)):G((function(t){return t+1}))):(E(!0),h.current&&h.current.seekTo(e)))};return document.addEventListener("keydown",t,!1),function(){return window.removeEventListener("keydown",t)}}),[C,g,e,R,D,W]),Object(o.useEffect)((function(){var t=setInterval((function(){h.current&&h.current.getCurrentTime()>n&&L(!0)}),1e3);return function(){return clearInterval(t)}}),[h,n]);var q=Object(o.useState)("Waiting for lyrics to be processed..."),M=Object(r.a)(q,2),H=M[0],J=M[1],Y=Object(u.useQuery)(B,{variables:{id:y},onCompleted:function(){X(Y.processedLyrics.map((function(t){return t.map((function(t){return delete t.__typename,t}))}))),J("Press any key to start the video")}}).data;return Object(o.useEffect)((function(){C||J("Whenever the highlighted word is said, press any key to sync it.")}),[C]),x?c.a.createElement(z,{syncedLyrics:W,startTime:e,endTime:n}):c.a.createElement(l.a,{fluid:!0,style:{paddingLeft:0,paddingRight:0}},c.a.createElement(v.a,{centerContent:c.a.createElement(p,{text:H,style:{fontSize:30,color:"white",zIndex:1e3,textAlign:"center"}})}),c.a.createElement(s.a,{className:"justify-content-md-center"},c.a.createElement(O.a,{ref:h,playing:g,url:"https://www.youtube.com/watch?v=".concat(m),onEnded:function(){return L(!0)},onBuffer:function(){return T(!0)},onBufferEnd:function(){return T(!1)},controls:!1})),Y?Y.processedLyrics.slice(D).map((function(t,e){return c.a.createElement(s.a,{className:"justify-content-md-center",style:{minWidth:"100%"},key:e},t.map((function(t,n){return 0===e&&R===n?c.a.createElement("mark",{key:t.id,style:{backgroundColor:"#007bff",color:"#fff",marginBottom:10,fontSize:"40px",marginLeft:"0.5em"}},t.text):c.a.createElement("p",{key:t.id,style:{marginBottom:10,fontSize:"40px",marginLeft:"0.5em"}},t.text)})))})):c.a.createElement(f.a,{centered:!0}))}},99:function(t,e,n){t.exports=n(104)}}]);
//# sourceMappingURL=10.a7d713a1.chunk.js.map