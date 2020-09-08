(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[9],{100:function(t,e,n){"use strict";n.d(e,"a",(function(){return S}));var r=n(91),a=n(94),o=n(3),i=n.n(o),c=n(110),s=n(108),u=n(109),l=n(92),f=n(123),h=n(118),m=n(105),d=n(10),p=n(124),y=n(103),g=n.n(y),v="359548864121-f3blhpvvgm17oqoun8tvh2708a8loujm.apps.googleusercontent.com",b=n(49),E=n(106),w=n.n(E);function x(){var t=Object(a.a)(["\n  mutation createuser($tokenId: String, $userName: String) {\n    createUser(tokenId: $tokenId, userName: $userName)\n  }\n"]);return x=function(){return t},t}function j(){var t=Object(a.a)(["\n  query usernametaken($userName: String!) {\n    userNameTaken(userName: $userName)\n  }\n"]);return j=function(){return t},t}function O(){var t=Object(a.a)(["\n  query userdata($tokenId: String) {\n    userData(tokenId: $tokenId) {\n      userName\n      existsInDB\n    }\n  }\n"]);return O=function(){return t},t}var k=Object(b.gql)(O()),L=Object(b.gql)(j()),N=Object(b.gql)(x());function S(t){t.centerContent;var e=t.customContent,a=t.setParentTokenId,E=t.setParentUserName,x=Object(d.f)(),j=w()(),O=j.innerWidth,S=j.innerHeight,I=Object(o.useState)(""),C=Object(r.a)(I,2),T=C[0],_=C[1],D=Object(b.useLazyQuery)(k,{variables:{tokenId:T},onCompleted:function(){q.existsInDB?E&&E(q.userName):A(!0)},fetchPolicy:"network-only"}),P=Object(r.a)(D,2),z=P[0],$=P[1].data,q=($=void 0===$?{}:$).userData,G=Object(o.useState)(""),R=Object(r.a)(G,2),F=R[0],B=R[1],H=Object(b.useQuery)(L,{variables:{userName:F},skip:!q||q.existsInDB||""===F}).data,U=(H=void 0===H?{}:H).userNameTaken,M=Object(o.useState)(!1),Q=Object(r.a)(M,2),W=Q[0],A=Q[1],J=Object(b.useMutation)(N,{variables:{userName:F,tokenId:T},onCompleted:function(){z({variables:{tokenId:T}}),A(!1)}}),Y=Object(r.a)(J,1)[0];return i.a.createElement(i.a.Fragment,null,i.a.createElement(s.a,{className:"shadow-lg",style:{position:"absolute",left:.5*O,top:.5*S,transform:"translate(-50%, -50%)",zIndex:1e3},show:W,dismissible:!0,onClose:function(){return A(!1)},variant:U?"danger":"primary"},i.a.createElement(i.a.Fragment,null,i.a.createElement(s.a.Heading,null,U?"This username is taken":"Create a username for your account"),i.a.createElement(m.a,{onSubmit:function(t){t.preventDefault(),U||Y()},onChange:function(t){return B(t.target.value)}},i.a.createElement(m.a.Control,{style:{marginTop:"em"},placeholder:"Enter username for your new account",autoFocus:!0}),i.a.createElement(l.a,{style:{position:"relative",marginTop:"1em",left:"50%",transform:"translate(-50%, 0px)"},disabled:U,onClick:function(){return Y()}},"Create account")))),i.a.createElement(c.a,{style:{height:60},sticky:"top",bg:"secondary",variant:"dark"},i.a.createElement(c.a.Brand,{onClick:function(){return x.push("/")}},i.a.createElement(l.a,{variant:"outline-primary",style:{justifyContent:"left",width:142,height:44},size:"sm"},i.a.createElement("img",{alt:"Home",src:n(104),style:{top:0,height:"100%",width:"100%"}}))),e,i.a.createElement(c.a.Collapse,{style:{position:"absolute",transform:"translate(-50%, 0%)",left:"50%"}},JSON.stringify(q)),i.a.createElement(u.a,{className:"ml-auto"},i.a.createElement("div",{style:{marginRight:10,marginTop:20,marginBottom:20}},i.a.createElement(p.a,{href:"https://github.com/EerikSaksi/type_to_lyrics","data-icon":"octicon-star","data-size":"large","data-show-count":"true","aria-label":"Star EerikSaksi/type_to_lyrics on GitHub"},"Star")),q&&q.existsInDB?i.a.createElement(f.a,{title:"Signed in as ".concat(q.userName),style:{alignSelf:"center"}},i.a.createElement(h.a.Item,{style:{paddingLeft:4,paddingRight:4}},i.a.createElement(l.a,{style:{width:"100%"},onClick:function(){return x.push("/user/".concat(q.userName))}},"View your profile")),i.a.createElement(h.a.Item,{style:{paddingLeft:4,paddingRight:4}},i.a.createElement(y.GoogleLogout,{clientId:v,onLogoutSuccess:function(){_(""),z()}}))):W?i.a.createElement("p",{style:{fontSize:20,marginTop:16}}," Logging in... "):i.a.createElement("div",{style:{height:"100%",alignSelf:"center"}},i.a.createElement(g.a,{clientId:v,onSuccess:function(t){_(t.tokenId),z(),a&&a(t.tokenId)},isSignedIn:!0})))))}},102:function(t,e,n){var r=function(t){"use strict";var e=Object.prototype,n=e.hasOwnProperty,r="function"===typeof Symbol?Symbol:{},a=r.iterator||"@@iterator",o=r.asyncIterator||"@@asyncIterator",i=r.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(L){c=function(t,e,n){return t[e]=n}}function s(t,e,n,r){var a=e&&e.prototype instanceof f?e:f,o=Object.create(a.prototype),i=new j(r||[]);return o._invoke=function(t,e,n){var r="suspendedStart";return function(a,o){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===a)throw o;return k()}for(n.method=a,n.arg=o;;){var i=n.delegate;if(i){var c=E(i,n);if(c){if(c===l)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var s=u(t,e,n);if("normal"===s.type){if(r=n.done?"completed":"suspendedYield",s.arg===l)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r="completed",n.method="throw",n.arg=s.arg)}}}(t,n,i),o}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(L){return{type:"throw",arg:L}}}t.wrap=s;var l={};function f(){}function h(){}function m(){}var d={};d[a]=function(){return this};var p=Object.getPrototypeOf,y=p&&p(p(O([])));y&&y!==e&&n.call(y,a)&&(d=y);var g=m.prototype=f.prototype=Object.create(d);function v(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){var r;this._invoke=function(a,o){function i(){return new e((function(r,i){!function r(a,o,i,c){var s=u(t[a],t,o);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"===typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(f).then((function(t){l.value=t,i(l)}),(function(t){return r("throw",t,i,c)}))}c(s.arg)}(a,o,r,i)}))}return r=r?r.then(i,i):i()}}function E(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var r=u(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,l;var a=r.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function w(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function x(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(w,this),this.reset(!0)}function O(t){if(t){var e=t[a];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:k}}function k(){return{value:void 0,done:!0}}return h.prototype=g.constructor=m,m.constructor=h,h.displayName=c(m,i,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,c(t,i,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},v(b.prototype),b.prototype[o]=function(){return this},t.AsyncIterator=b,t.async=function(e,n,r,a,o){void 0===o&&(o=Promise);var i=new b(s(e,n,r,a),o);return t.isGeneratorFunction(n)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},v(g),c(g,i,"Generator"),g[a]=function(){return this},g.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=O,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return i.type="throw",i.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],i=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var c=n.call(o,"catchLoc"),s=n.call(o,"finallyLoc");if(c&&s){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,l):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),x(n),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;x(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:O(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),l}},t}(t.exports);try{regeneratorRuntime=r}catch(a){Function("r","regeneratorRuntime = r")(r)}},104:function(t,e,n){t.exports=n.p+"static/media/home.34034ca8.png"},112:function(t,e,n){"use strict";n.d(e,"a",(function(){return p}));var r=n(93),a=n(97),o=n.n(a),i=n(98),c=n(91),s=n(3),u=n.n(s),l=n(107),f=n(50),h=n(92),m=n(10);function d(t){var e=t.text,n=t.style;return u.a.createElement("div",{style:Object(r.a)({position:"absolute",height:30,opacity:.8,width:"100%",display:"flex",alignItems:"center",backgroundColor:"white",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},n)},u.a.createElement("p",{style:{width:"100%",whiteSpace:"no-wrap",color:"black",fontSize:20,margin:0}},e))}function p(t){var e=t.forwardingUrl,n=t.imgUrl,a=t.bottomText,p=t.centerText,y=t.topText,g=t.fadeInMillis,v=t.style,b=Object(m.f)(),E=Object(s.useState)(!1),w=Object(c.a)(E,2),x=w[0],j=w[1],O=Object(s.useState)(0),k=Object(c.a)(O,2),L=k[0],N=k[1];return Object(s.useEffect)((function(){function t(){return(t=Object(i.a)(o.a.mark((function t(e){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,new Promise((function(t){return setTimeout(t,e)}));case 2:N(1);case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(e){t.apply(this,arguments)}(g)}),[g]),u.a.createElement(l.a,{xs:12,style:Object(r.a)({transition:"opacity 0.5s",opacity:L,margin:10,padding:0,maxHeight:347.5,maxWidth:347.5,minHeight:"100%"},v),onMouseEnter:function(){return j(!0)},onMouseLeave:function(){return j(!1)}},u.a.createElement(h.a,{style:{width:"100%",height:"100%",padding:0,border:0},onClick:function(){return b.push(e)}},u.a.createElement(f.a,{className:x?"shadow-lg":"",style:{maxHeight:347.5,height:"100%",width:"auto",maxWidth:"100%",transition:"all 200ms"},rounded:!0,src:n}),u.a.createElement(d,{style:{top:0},text:y}),u.a.createElement(d,{style:{top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"auto"},text:p}),u.a.createElement(d,{style:{bottom:0},text:a})))}},203:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return v}));var r=n(94),a=n(3),o=n.n(a),i=n(27),c=n(10),s=n(49),u=n(92),l=n(99),f=n(95),h=n(100),m=n(112);function d(){var t=Object(r.a)(["\n  query displaylyrics($id: String) {\n    displayLyrics(id: $id)\n  }\n"]);return d=function(){return t},t}function p(){var t=Object(r.a)(["\n  query synchronizationdata($geniusID: String) {\n    synchronizationData(geniusID: $geniusID) {\n      youtubeID\n      searchResult {\n        imgUrl\n        bottomText\n        topText\n        forwardingUrl\n      }\n    }\n  }\n"]);return p=function(){return t},t}var y=Object(s.gql)(p()),g=Object(s.gql)(d());function v(){var t=Object(c.g)().geniusID,e=Object(c.f)(),n=Object(s.useQuery)(y,{variables:{geniusID:t}}),r=n.data,a=(r=void 0===r?{}:r).synchronizationData,d=(n.loading,n.error),p=Object(s.useQuery)(g,{variables:{id:t}}),v=p.data,b=(v=void 0===v?{}:v).displayLyrics,E=p.loading,w=p.error,x=o.a.createElement(i.a,null);!w&&d?x=o.a.createElement(f.a,null,o.a.createElement(l.a,{className:"justify-content-md-center"},o.a.createElement("p",{style:{fontSize:30}},"No synchronizations exist.")),o.a.createElement(l.a,{className:"justify-content-md-center"},o.a.createElement(u.a,{onClick:function(){return e.push("/sync/0/".concat(t))}},o.a.createElement("p",null,"Create synchronization for this song.")))):a&&(console.log(a),x=o.a.createElement(f.a,null,o.a.createElement(l.a,{style:{justifyContent:"center"}},o.a.createElement("p",{style:{textAlign:"center"}},"Synchronizations")),o.a.createElement(l.a,{style:{justifyContent:"center"}},o.a.createElement(m.a,Object.assign({},a[0].searchResult,{fadeInMillis:100,style:{paddingRight:0}})))));var j=o.a.createElement(i.a,null);return E||(j=b.map((function(t,e){return o.a.createElement(l.a,{className:"justify-content-md-center",style:{minWidth:"100%"},key:e},o.a.createElement("p",{style:{marginBottom:10,fontSize:"20px"}},t))}))),o.a.createElement(f.a,{fluid:!0,style:{paddingLeft:0,paddingRight:0}},o.a.createElement(h.a,null),o.a.createElement(l.a,{style:{marginBottom:"20px"},className:"justify-content-md-center"},x),o.a.createElement(l.a,{className:"justify-content-md-center"},j))}},95:function(t,e,n){"use strict";var r=n(9),a=n(22),o=n(41),i=n.n(o),c=n(3),s=n.n(c),u=n(47),l=s.a.forwardRef((function(t,e){var n=t.bsPrefix,o=t.fluid,c=t.as,l=void 0===c?"div":c,f=t.className,h=Object(a.a)(t,["bsPrefix","fluid","as","className"]),m=Object(u.a)(n,"container"),d="string"===typeof o?"-"+o:"-fluid";return s.a.createElement(l,Object(r.a)({ref:e},h,{className:i()(f,o?""+m+d:m)}))}));l.displayName="Container",l.defaultProps={fluid:!1},e.a=l},97:function(t,e,n){t.exports=n(102)},98:function(t,e,n){"use strict";function r(t,e,n,r,a,o,i){try{var c=t[o](i),s=c.value}catch(u){return void n(u)}c.done?e(s):Promise.resolve(s).then(r,a)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(a,o){var i=t.apply(e,n);function c(t){r(i,a,o,c,s,"next",t)}function s(t){r(i,a,o,c,s,"throw",t)}c(void 0)}))}}n.d(e,"a",(function(){return a}))}}]);
//# sourceMappingURL=9.8179e38e.chunk.js.map