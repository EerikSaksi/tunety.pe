(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[5],{102:function(e,t,n){var r=function(e){"use strict";var t=Object.prototype,n=t.hasOwnProperty,r="function"===typeof Symbol?Symbol:{},a=r.iterator||"@@iterator",o=r.asyncIterator||"@@asyncIterator",i=r.toStringTag||"@@toStringTag";function c(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(k){c=function(e,t,n){return e[t]=n}}function u(e,t,n,r){var a=t&&t.prototype instanceof f?t:f,o=Object.create(a.prototype),i=new w(r||[]);return o._invoke=function(e,t,n){var r="suspendedStart";return function(a,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw o;return I()}for(n.method=a,n.arg=o;;){var i=n.delegate;if(i){var c=E(i,n);if(c){if(c===l)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=s(e,t,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===l)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}(e,n,i),o}function s(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(k){return{type:"throw",arg:k}}}e.wrap=u;var l={};function f(){}function m(){}function h(){}var d={};d[a]=function(){return this};var y=Object.getPrototypeOf,g=y&&y(y(S([])));g&&g!==t&&n.call(g,a)&&(d=g);var p=h.prototype=f.prototype=Object.create(d);function v(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function b(e,t){var r;this._invoke=function(a,o){function i(){return new t((function(r,i){!function r(a,o,i,c){var u=s(e[a],e,o);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"===typeof f&&n.call(f,"__await")?t.resolve(f.__await).then((function(e){r("next",e,i,c)}),(function(e){r("throw",e,i,c)})):t.resolve(f).then((function(e){l.value=e,i(l)}),(function(e){return r("throw",e,i,c)}))}c(u.arg)}(a,o,r,i)}))}return r=r?r.then(i,i):i()}}function E(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,E(e,t),"throw"===t.method))return l;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var r=s(n,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,l;var a=r.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,l):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,l)}function O(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function j(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function w(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(O,this),this.reset(!0)}function S(e){if(e){var t=e[a];if(t)return t.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var r=-1,o=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return o.next=o}}return{next:I}}function I(){return{value:void 0,done:!0}}return m.prototype=p.constructor=h,h.constructor=m,m.displayName=c(h,i,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===m||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,h):(e.__proto__=h,c(e,i,"GeneratorFunction")),e.prototype=Object.create(p),e},e.awrap=function(e){return{__await:e}},v(b.prototype),b.prototype[o]=function(){return this},e.AsyncIterator=b,e.async=function(t,n,r,a,o){void 0===o&&(o=Promise);var i=new b(u(t,n,r,a),o);return e.isGeneratorFunction(n)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},v(p),c(p,i,"Generator"),p[a]=function(){return this},p.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=S,w.prototype={constructor:w,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(j),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(n,r){return i.type="throw",i.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],i=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var c=n.call(o,"catchLoc"),u=n.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,l):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),l},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),j(n),l}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var a=r.arg;j(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:S(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),l}},e}(e.exports);try{regeneratorRuntime=r}catch(a){Function("r","regeneratorRuntime = r")(r)}},104:function(e,t,n){e.exports=n.p+"static/media/home.34034ca8.png"},113:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(120);var a=n(119);function o(e){return function(e){if(Array.isArray(e))return Object(r.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(a.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},173:function(e,t,n){"use strict";var r=n(3),a=r.useState,o=r.useCallback,i=r.useLayoutEffect;function c(e){return e?{width:e.offsetWidth,height:e.offsetHeight}:{width:0,height:0}}e.exports=function(e){var t=a(c(e?e.current:{})),n=t[0],r=t[1],u=o((function(){e.current&&r(c(e.current))}),[e]);return i((function(){if(e.current){if(u(),"function"===typeof ResizeObserver){var t=new ResizeObserver((function(){u()}));return t.observe(e.current),function(){t.disconnect(e.current),t=null}}return window.addEventListener("resize",u),function(){window.removeEventListener("resize",u)}}}),[e.current]),n}},174:function(e,t,n){},192:function(e,t,n){e.exports=n.p+"static/media/cat_nodding.1327cfd0.gif"},205:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return U}));var r=n(98),a=n.n(r),o=n(99),i=n(91),c=n(95),u=n(3),s=n.n(u),l=n(100),f=n(105),m=n(92),h=n(50),d=n(113),y=n(96);function g(e){var t=e.text,n=(e.time,e.id,e.topOffset),r=e.commonSuffixLength,a=e.horizontalOffsetPercentage;return s.a.createElement(y.a,null,s.a.createElement("div",{style:{width:"auto",position:"absolute",transform:"translate(-50%, ".concat(n,"px)"),transition:"opacity .1s ease-in-out, top 2s ease-in-out",left:"".concat(a,"%")}},s.a.createElement("p",null,s.a.createElement("span",{style:{color:"green",display:"inline-block"}},t.substring(0,r||0)),s.a.createElement("span",{style:{color:"black",display:"inline-block"}},t.substring(r||0)))))}var p=n(173),v=n.n(p);function b(e){var t=e.syncedLyrics,n=e.input,r=e.setInput,a=e.setTotalCharacters,o=e.videoDuration,c=e.animateBackgroundColor,l=Object(u.useRef)(),f=v()(l).height,m=Object(u.useState)(0),h=Object(i.a)(m,2),y=h[0],p=h[1],b=Object(u.useState)(t[0]),E=Object(i.a)(b,2),O=E[0],j=E[1];Object(u.useEffect)((function(){var e=!0,i=!1,u=O.map((function(t){var r=(o-t.time)/3*f;return r<=0&&(r=0,e=!1),t.topOffset=r,0===t.text.indexOf(n)?t.commonSuffixLength=n.length:t.commonSuffixLength=0,t})).filter((function(e){return o-e.time>3?(c("red"),!1):!(!i&&e.text+" "===n)||(i=!0,r(""),c("green"),a((function(t){return t+e.text.length})),!1)}));if(e){var s=y+1;s<t.length&&(p(s),u.push.apply(u,Object(d.a)(t[s])))}j(u)}),[o,c,f,t]);var w=function(e){j.filter((function(t){return t.id!==e}))};return s.a.createElement("div",{ref:l,style:{position:"absolute",top:60,bottom:"20%",left:0,right:0,zIndex:1e3}},O===[]?null:O.map((function(e){return s.a.createElement(g,Object.assign({key:e.id},e,{input:n,removeByID:w,topOffset:e.topOffset,commonSuffixLength:e.commonSuffixLength}))})))}var E=n(10),O=n(97),j=n(108),w=n(107),S=n(111);n(174);function I(e){var t=e.playing,n=e.setPlaying,r=e.setShowCat,a=e.gameStats,o=Object(u.useState)("/leaderboards"),c=Object(i.a)(o,2),h=c[0],d=c[1],y=Object(u.useState)(""),g=Object(i.a)(y,2),p=g[0],v=g[1];return s.a.createElement(j.a,{show:!t,variant:"primary",className:"shadow-lg fade",style:{top:80,bottom:20,marginBottom:0,position:"absolute",left:"50%",transform:"translateX(-50%)",width:"50%",zIndex:1e3}},s.a.createElement(S.a,{style:{height:"10%"},variant:"pills",activeKey:h,onSelect:function(e){return d(e)}},s.a.createElement(S.a.Item,null,s.a.createElement(S.a.Link,{eventKey:"/leaderboards"},"Leaderboards")),s.a.createElement(S.a.Item,null,s.a.createElement(S.a.Link,{eventKey:"/options"},"Options"))),"/leaderboards"===h?a?a.map((function(e){var t=e.playerUserName,n=e.wordsPerMinute,r=e.accuracy;return s.a.createElement(l.a,{id:e.bb,style:{height:"10%"}},s.a.createElement(w.a,{style:{borderColor:"black"}},s.a.createElement("p",null,t)),s.a.createElement(w.a,{style:{justifyContent:"right"}},s.a.createElement("p",null,"".concat(n,"wpm")," ")),s.a.createElement(w.a,{style:{justifyContent:"right"}},s.a.createElement("p",null,"".concat(r,"%"))))})):null:s.a.createElement(l.a,null,s.a.createElement(w.a,{xs:1,style:{alignSelf:"center"}},s.a.createElement(f.a.Check,{onClick:function(e){r(e.target.checked),v(!0)},variant:"checkbox"})),s.a.createElement(w.a,null,s.a.createElement("p",{style:{alignSelf:"center",fontSize:40,marginBottom:0}},"Add cat"),s.a.createElement(j.a,{dismissible:!0,show:p,onClose:function(){return v(!1)},style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},variant:"danger"},s.a.createElement(j.a.Heading,{style:{textAlign:"center"}},"Warning! This setting only works for absolute bangers!"),s.a.createElement(l.a,{style:{justifyContent:"center"}},s.a.createElement(m.a,{onClick:function(){return v(!1)}},"Don't worry I only play bangers"))))),s.a.createElement(l.a,{style:{justifyContent:"center",height:"10%"}},s.a.createElement(m.a,{style:{height:"40%",alignSelf:"center"},onClick:function(){return n(!0)}},"Play!")))}var k=n(49),x=n(27),L=n(117),C=n.n(L);function D(){var e=Object(c.a)(["\n  query gamestats($youtubeID: String, $geniusID: String, $creatorUserName: String) {\n    gameStats(youtubeID: $youtubeID, geniusID: $geniusID, creatorUserName: $creatorUserName) {\n      playerUserName\n      wordsPerMinute\n      accuracy\n    }\n  }\n"]);return D=function(){return e},e}function N(){var e=Object(c.a)(["\n  mutation postgamestats($gameStats: InputGameStats!) {\n    postGameStats(gameStats: $gameStats)\n  }\n"]);return N=function(){return e},e}function T(){var e=Object(c.a)(["\n  query synchronizationdata($youtubeID: String, $geniusID: String) {\n    synchronizationData(youtubeID: $youtubeID, geniusID: $geniusID) {\n      startTime\n      endTime\n    }\n  }\n"]);return T=function(){return e},e}function _(){var e=Object(c.a)(["\n  query syncedlyrics($youtubeID: String, $geniusID: String) {\n    syncedLyrics(youtubeID: $youtubeID, geniusID: $geniusID) {\n      text\n      time\n      id\n      horizontalOffsetPercentage\n    }\n  }\n"]);return _=function(){return e},e}var P=Object(k.gql)(_()),$=Object(k.gql)(T()),z=Object(k.gql)(N()),R=Object(k.gql)(D());function U(){var e=Object(E.g)(),t=e.creatorUserName,r=e.youtubeID,c=e.geniusID,d=Object(k.useQuery)(P,{variables:{youtubeID:r,geniusID:c}}),y=d.data,g=(y=void 0===y?{}:y).syncedLyrics,p=d.loading,v=Object(k.useQuery)($,{variables:{youtubeID:r,geniusID:c}}),j=v.data,w=(j=void 0===j?{}:j).synchronizationData,S=v.error,L=Object(u.useState)(!1),D=Object(i.a)(L,2),N=D[0],T=D[1],_=Object(u.useState)(!1),U=Object(i.a)(_,2),G=U[0],F=U[1],A=Object(k.useLazyQuery)(R,{variables:{geniusID:c,youtubeID:r,creatorUserName:t},fetchPolicy:"network-only"}),B=Object(i.a)(A,2),q=B[0],H=B[1].data,K=(H=void 0===H?{}:H).gameStats,W=Object(u.useRef)();Object(u.useEffect)((function(){q();var e=setInterval((function(){W.current&&ge(W.current.getCurrentTime())}),10);return function(){return clearInterval(e)}}),[]);var M=Object(u.useState)(""),Q=Object(i.a)(M,2),V=Q[0],J=Q[1],Y=Object(u.useState)(0),X=Object(i.a)(Y,2),Z=X[0],ee=X[1];console.log({gameStats:{tokenId:V,creatorUserName:t,youtubeID:r,geniusID:c,totalCharacters:Z}});var te=Object(k.useMutation)(z,{variables:{gameStats:{tokenId:V,creatorUserName:t,youtubeID:r,geniusID:c,totalCharacters:Z}},onCompleted:function(){q()}}),ne=Object(i.a)(te,1)[0];Object(u.useEffect)((function(){N&&w&&W.current.seekTo(w[0].startTime)}),[w,N]);var re=Object(E.f)(),ae=Object(u.useState)(""),oe=Object(i.a)(ae,2),ie=oe[0],ce=oe[1],ue=Object(u.useState)("white"),se=Object(i.a)(ue,2),le=se[0],fe=se[1],me=function(){var e=Object(o.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return fe(t),e.next=3,new Promise((function(e){return setTimeout(e,100)}));case 3:fe("white");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),he=Object(u.useState)(0),de=Object(i.a)(he,2),ye=de[0],ge=de[1],pe=Object(u.useRef)();return Object(u.useEffect)((function(){pe.current&&pe.current.focus()}),[N]),r&&c?s.a.createElement(s.a.Fragment,null,s.a.createElement(O.a,{setParentTokenId:J}),S?s.a.createElement(l.a,{className:"justify-content-md-center"},s.a.createElement(m.a,{onClick:function(){return re.push("/sync/".concat(r,"/").concat(c))}},s.a.createElement("p",null,"Create synchronization for this song and video."))):p?s.a.createElement(s.a.Fragment,null,s.a.createElement(l.a,{style:{justifyContent:"center"}},s.a.createElement("p",null,"Loading lyrics")),s.a.createElement(l.a,{style:{justifyContent:"center"}},s.a.createElement(x.a,null))):s.a.createElement("div",{style:{position:"absolute",top:0,bottom:0,right:0,left:0,backgroundColor:le,transition:"background-color 200ms"}},s.a.createElement(I,{playing:N,setPlaying:T,setShowCat:F,gameStats:K}),s.a.createElement(l.a,null,s.a.createElement(f.a,{style:{position:"absolute",bottom:0,left:"50%",width:800,transform:"translate(-50%, 0%)",fontSize:100},onChange:function(e){return ce(e.target.value)}},s.a.createElement(f.a.Control,{onChange:function(e){return ce(e.target.value)},value:ie,className:"shadow-lg",ref:pe,style:{fontSize:40},autoFocus:!0}))),s.a.createElement(C.a,{ref:W,url:"https://www.youtube.com/watch?v=".concat(r),playing:N,onEnded:function(){T(!1),ne()},style:{opacity:0}}),N?s.a.createElement(s.a.Fragment,null,s.a.createElement(b,{input:ie,setInput:ce,setTotalCharacters:ee,syncedLyrics:p?[]:g,videoDuration:ye,animateBackgroundColor:me}),G?s.a.createElement(h.a,{style:{height:500,width:500,position:"absolute",left:"50%",transform:"translate(-50%, -50%)",top:"50%",zIndex:0},src:n(192)}):null):null)):"Invalid URL: Missing either a youtubeID or a geniusID"}},96:function(e,t,n){"use strict";var r=n(9),a=n(22),o=n(41),i=n.n(o),c=n(3),u=n.n(c),s=n(47),l=u.a.forwardRef((function(e,t){var n=e.bsPrefix,o=e.fluid,c=e.as,l=void 0===c?"div":c,f=e.className,m=Object(a.a)(e,["bsPrefix","fluid","as","className"]),h=Object(s.a)(n,"container"),d="string"===typeof o?"-"+o:"-fluid";return u.a.createElement(l,Object(r.a)({ref:t},m,{className:i()(f,o?""+h+d:h)}))}));l.displayName="Container",l.defaultProps={fluid:!1},t.a=l},97:function(e,t,n){"use strict";n.d(t,"a",(function(){return x}));var r=n(91),a=n(95),o=n(3),i=n.n(o),c=n(112),u=n(108),s=n(111),l=n(92),f=n(123),m=n(118),h=n(105),d=n(10),y=n(124),g=n(103),p=n.n(g),v=n(49),b=n(106),E=n.n(b);function O(){var e=Object(a.a)(["\n  mutation createuser($tokenId: String, $userName: String) {\n    createUser(tokenId: $tokenId, userName: $userName)\n  }\n"]);return O=function(){return e},e}function j(){var e=Object(a.a)(["\n  query usernametaken($userName: String!) {\n    userNameTaken(userName: $userName)\n  }\n"]);return j=function(){return e},e}function w(){var e=Object(a.a)(["\n  query userdata($tokenId: String) {\n    userData(tokenId: $tokenId) {\n      userName\n      existsInDB\n    }\n  }\n"]);return w=function(){return e},e}var S=Object(v.gql)(w()),I=Object(v.gql)(j()),k=Object(v.gql)(O());function x(e){var t=e.centerContent,a=e.customContent,b=e.setParentTokenId,O=e.setParentUserName,j=Object(d.f)(),w=E()(),x=w.innerWidth,L=w.innerHeight,C=Object(o.useState)(""),D=Object(r.a)(C,2),N=D[0],T=D[1],_=Object(v.useLazyQuery)(S,{variables:{tokenId:N},onCompleted:function(){R.existsInDB?O&&O(R.userName):M(!0)},fetchPolicy:"network-only"}),P=Object(r.a)(_,2),$=P[0],z=P[1].data,R=(z=void 0===z?{}:z).userData,U=Object(o.useState)(""),G=Object(r.a)(U,2),F=G[0],A=G[1],B=Object(v.useQuery)(I,{variables:{userName:F},skip:!R||R.existsInDB||""===F}).data,q=(B=void 0===B?{}:B).userNameTaken,H=Object(o.useState)(!1),K=Object(r.a)(H,2),W=K[0],M=K[1],Q=Object(v.useMutation)(k,{variables:{userName:F,tokenId:N},onCompleted:function(){$({variables:{tokenId:N}}),M(!1)}}),V=Object(r.a)(Q,1)[0];return i.a.createElement(i.a.Fragment,null,i.a.createElement(u.a,{className:"shadow-lg",style:{position:"absolute",left:.5*x,top:.5*L,transform:"translate(-50%, -50%)",zIndex:1e3},show:W,onClose:function(){return M(!1)},variant:q?"danger":"primary"},i.a.createElement(i.a.Fragment,null,i.a.createElement(u.a.Heading,null,q?"This username is taken":"Create a username for your account"),i.a.createElement(h.a,{onSubmit:function(e){e.preventDefault(),q||V()},onChange:function(e){return A(e.target.value)}},i.a.createElement(h.a.Control,{style:{marginTop:"em"},placeholder:"Enter username for your new account",autoFocus:!0}),i.a.createElement(l.a,{style:{position:"relative",marginTop:"1em",left:"50%",transform:"translate(-50%, 0px)"},disabled:q,onClick:function(){return V()}},"Create account")))),i.a.createElement(c.a,{style:{height:60},sticky:"top",bg:"secondary",variant:"dark"},i.a.createElement(c.a.Brand,{onClick:function(){return j.push("/")}},i.a.createElement(l.a,{variant:"outline-primary",style:{justifyContent:"left",width:142,height:44},size:"sm"},i.a.createElement("img",{alt:"Home",src:n(104),style:{top:0,height:"100%",width:"100%"}}))),a,i.a.createElement(c.a.Collapse,{style:{position:"absolute",transform:"translate(-50%, 0%)",left:"50%"}},t),i.a.createElement(s.a,{className:"ml-auto"},i.a.createElement("div",{style:{marginRight:10,marginTop:20,marginBottom:20}},i.a.createElement(y.a,{href:"https://github.com/EerikSaksi/type_to_lyrics","data-icon":"octicon-star","data-size":"large","data-show-count":"true","aria-label":"Star EerikSaksi/type_to_lyrics on GitHub"},"Star")),R&&R.existsInDB?i.a.createElement(f.a,{title:"Signed in as ".concat(R.userName),style:{alignSelf:"center"}},i.a.createElement(m.a.Item,{style:{paddingLeft:4,paddingRight:4}},i.a.createElement(l.a,{style:{width:"100%"},onClick:function(){return j.push("/user/".concat(R.userName))}},"View your profile")),i.a.createElement(m.a.Item,{style:{paddingLeft:4,paddingRight:4}},i.a.createElement(g.GoogleLogout,{clientId:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).GOOGLE_AUTHENTICATOR_CLIENT,onLogoutSuccess:function(){T(""),$()}}))):W?i.a.createElement("p",{style:{fontSize:20,marginTop:16}}," Logging in... "):i.a.createElement("div",{style:{height:"100%",alignSelf:"center"}},i.a.createElement(p.a,{clientId:Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).GOOGLE_AUTHENTICATOR_CLIENT,onSuccess:function(e){T(e.tokenId),$(),b&&b(e.tokenId)},onFailure:function(e){},isSignedIn:!0})))))}},98:function(e,t,n){e.exports=n(102)},99:function(e,t,n){"use strict";function r(e,t,n,r,a,o,i){try{var c=e[o](i),u=c.value}catch(s){return void n(s)}c.done?t(u):Promise.resolve(u).then(r,a)}function a(e){return function(){var t=this,n=arguments;return new Promise((function(a,o){var i=e.apply(t,n);function c(e){r(i,a,o,c,u,"next",e)}function u(e){r(i,a,o,c,u,"throw",e)}c(void 0)}))}}n.d(t,"a",(function(){return a}))}}]);
//# sourceMappingURL=5.ca6ba4ce.chunk.js.map