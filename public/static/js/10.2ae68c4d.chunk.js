(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[10],{101:function(e,t,n){e.exports=n.p+"static/media/home.34034ca8.png"},118:function(e,t,n){"use strict";n.d(t,"a",(function(){return g}));var a=n(99),r=n(102),i=n.n(r),l=n(103),o=n(92),c=n(3),s=n.n(c),u=n(114),m=n(51),f=n(93),d=n(10);function g(e){var t=e.forwardingUrl,n=e.imgUrl,r=e.text,g=e.fadeInMillis,p=e.customStyle,h=Object(d.f)(),y=Object(c.useState)(0),b=Object(o.a)(y,2),E=b[0],v=b[1];return Object(c.useEffect)((function(){function e(){return(e=Object(l.a)(i.a.mark((function e(t){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){return setTimeout(e,t)}));case 2:v(1);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(t){e.apply(this,arguments)}(g)}),[g]),s.a.createElement(u.a,{xs:3,style:Object(a.a)({transition:"opacity 0.5s",opacity:E,marginTop:10,marginRight:5,marginLeft:5,paddingLeft:"0px",paddingRight:"10px",minHeight:"100%"},p)},s.a.createElement(f.a,{style:{minWidth:"100%",minHeight:"100%"},onClick:function(){return h.push(t)}},s.a.createElement(u.a,null,s.a.createElement(m.a,{src:n,style:{minWidth:"50%",minHeight:"50%",maxWidth:"50%",maxHeight:"50%"}})),s.a.createElement(u.a,null,s.a.createElement("p",{style:{fontSize:"20px"}},r))))}},129:function(e,t,n){"use strict";n.d(t,"a",(function(){return m}));var a=n(99),r=n(92),i=n(3),l=n.n(i),o=n(140),c=n(106),s=n.n(c),u=n(130);function m(e){var t=e.children,n=e.title,c=e.imgOverlay,m=e.linkText,f=e.linkHref,d=e.style,g=Object(i.useState)(0),p=Object(r.a)(g,2),h=p[0],y=p[1],b=Object(u.a)({threshold:.5}),E=Object(r.a)(b,2),v=E[0],j=E[1];Object(i.useEffect)((function(){j&&y(1)}),[j]);var O=s()(),k=O.innerWidth,S=O.innerHeight;return l.a.createElement(o.a,{ref:v,className:"shadow-lg",style:Object(a.a)({width:"".concat(.8*k),position:"relative",left:"50%",transform:"translate(-50%, 0px)",opacity:h,transition:"opacity 500ms",marginBottom:20,marginTop:20,height:S-100},d),border:"primary"},l.a.createElement(l.a.Fragment,null,l.a.createElement(o.a.Title,{style:{fontSize:40,textAlign:"center"}},n),l.a.createElement(o.a.Link,{style:{fontSize:20,textAlign:"center",zIndex:1e3},href:f},m),l.a.createElement(o.a.ImgOverlay,null,c),t))}},138:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return u}));var a=n(3),r=n.n(a),i=n(27),l=n(96),o=n(107),c=n(104),s=n(118);function u(e){var t=e.results,n=e.input,a=e.setInput,u=e.loading,m=e.defaultValue;return r.a.createElement(l.a,{fluid:!0,style:{zIndex:1e3}},r.a.createElement(c.a,{className:"justify-content-md-center"},r.a.createElement(o.a,{onChange:function(e){return a(e.target.value)},onSubmit:function(e){e.preventDefault()}},r.a.createElement(o.a.Control,{defaultValue:m||"",placeholder:"Search",autoFocus:!0}))),r.a.createElement(c.a,{style:{justifyContent:"center",marginTop:5}},""===n?null:!u&&t?t.map((function(e,t){return r.a.createElement(s.a,Object.assign({key:t},e,{fadeInMillis:100*(t+1)}))})):r.a.createElement(i.a,{centered:!1})))}},204:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return j}));var a=n(92),r=n(95),i=n(3),l=n.n(i),o=n(27),c=n(138),s=n(50),u=n(98),m=n(129),f=n(96),d=n(93),g=n(104),p=n(51),h=n(101),y=n.n(h);function b(){var e=Object(r.a)(["\nquery geniussearchresults($query: String){\n  geniusSearchResults(query: $query){\n    imgUrl\n    text\n    forwardingUrl\n  }\n}"]);return b=function(){return e},e}var E=Object(i.lazy)((function(){return Promise.all([n.e(1),n.e(15)]).then(n.bind(null,197))})),v=Object(s.gql)(b());function j(){var e=Object(i.useState)(""),t=Object(a.a)(e,2),n=t[0],r=t[1],h=Object(i.useRef)(),b=Object(s.useQuery)(v,{variables:{query:n},skip:""===n}),j=b.data,O=b.loading;return l.a.createElement(f.a,{fluid:!0,style:{paddingLeft:0,paddingRight:0}},l.a.createElement(u.a,null),l.a.createElement("div",{style:{top:60}},l.a.createElement(m.a,{title:"Type your tunes!",style:{height:"30%",width:"40%"}},l.a.createElement(p.a,{src:y.a,style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",width:1373/3,height:382/3,zIndex:1e3}}),l.a.createElement(d.a,{style:{position:"absolute",left:"50%",bottom:"10%",transform:"translate(-50%, 0)"},onClick:function(){return window.scrollTo(0,h.current.offsetTop)}},"How does this site work?")),l.a.createElement(m.a,{title:"Search For An Artist/Song/Album",style:{minHeight:"calc(70% - 120px)",height:"auto",overflow:"hidden"}},l.a.createElement(g.a,{style:{justifyContent:"center",marginBottom:12}}),l.a.createElement(c.default,{results:j?j.geniusSearchResults:void 0,input:n,setInput:r,formText:"Search For An Artist/Song/Album",loading:O}))),l.a.createElement("div",{ref:h},l.a.createElement(i.Suspense,{fallback:l.a.createElement(o.a,null)},l.a.createElement(E,null))))}},98:function(e,t,n){"use strict";n.d(t,"a",(function(){return C}));var a=n(92),r=n(95),i=n(3),l=n.n(i),o=n(109),c=n(112),s=n(120),u=n(93),m=n(117),f=n(111),d=n(107),g=n(10),p=n(119),h=n(100),y=n.n(h),b="359548864121-f3blhpvvgm17oqoun8tvh2708a8loujm.apps.googleusercontent.com",E=n(50),v=n(106),j=n.n(v);function O(){var e=Object(r.a)(["\n  mutation createuser($tokenId: String, $userName: String) {\n    createUser(tokenId: $tokenId, userName: $userName)\n  }\n"]);return O=function(){return e},e}function k(){var e=Object(r.a)(["\n  query usernametaken($userName: String) {\n    userNameTaken(userName: $userName)\n  }\n"]);return k=function(){return e},e}function S(){var e=Object(r.a)(["\n  query signedinuser($tokenId: String) {\n    signedInUser(tokenId: $tokenId) {\n      userName\n      existsInDB\n    }\n  }\n"]);return S=function(){return e},e}var I=Object(E.gql)(S()),x=Object(E.gql)(k()),w=Object(E.gql)(O());function C(e){var t=e.centerContent,r=e.customContent,v=e.setParentTokenId,O=Object(g.f)(),k=j()(),S=k.innerWidth,C=k.innerHeight,N=Object(i.useState)(""),T=Object(a.a)(N,2),q=T[0],z=T[1],H=Object(E.useLazyQuery)(I,{variables:{tokenId:q},onCompleted:function(){console.log("fetched"),console.log(A),A.existsInDB||V(!0)},fetchPolicy:"network-only"}),L=Object(a.a)(H,2),$=L[0],R=L[1].data,A=(R=void 0===R?{}:R).signedInUser,B=Object(i.useState)(""),F=Object(a.a)(B,2),U=F[0],D=F[1],W=Object(E.useQuery)(x,{variables:{userName:U},skip:!A||A.existsInDB}).data,P=(W=void 0===W?{}:W).userNameTaken,_=Object(i.useState)(!1),M=Object(a.a)(_,2),Q=M[0],V=M[1],G=Object(E.useMutation)(w,{variables:{userName:U,tokenId:q},onCompleted:function(){$({variables:{tokenId:q}}),V(!1)}}),J=Object(a.a)(G,1)[0];return l.a.createElement(l.a.Fragment,null,l.a.createElement(c.a,{className:"shadow-lg",style:{position:"absolute",left:.5*S,top:.5*C,transform:"translate(-50%, -50%)",zIndex:1e3},show:Q,dismissible:!0,onClose:function(){return V(!1)},variant:"primary"},l.a.createElement(l.a.Fragment,null,l.a.createElement(c.a.Heading,null,"Create a username for your account"),l.a.createElement(d.a,{onSubmit:function(e){e.preventDefault(),J()},onChange:function(e){return D(e.target.value)}},l.a.createElement(d.a.Control,{style:{marginTop:"em"},placeholder:"Enter username for your new account",autoFocus:!0}),l.a.createElement(u.a,{style:{position:"relative",marginTop:"1em",left:"50%",transform:"translate(-50%, 0px)"},disabled:P,onClick:function(){return J()}},"Create account")))),l.a.createElement(o.a,{style:{height:60},sticky:"top",bg:"secondary",variant:"dark"},l.a.createElement(o.a.Brand,{onClick:function(){return O.push("/")}},l.a.createElement(u.a,{variant:"outline-primary",style:{justifyContent:"left",width:142,height:44},size:"sm"},l.a.createElement("img",{alt:"Home",src:n(101),style:{top:0,height:"100%",width:"100%"}}))),r,l.a.createElement(o.a.Collapse,{style:{position:"absolute",transform:"translate(-50%, 0%)",left:"50%"}},t),l.a.createElement(s.a,{className:"ml-auto"},l.a.createElement("div",{style:{marginRight:10,marginTop:20,marginBottom:20}},l.a.createElement(p.a,{href:"https://github.com/EerikSaksi/type_to_lyrics","data-icon":"octicon-star","data-size":"large","data-show-count":"true","aria-label":"Star EerikSaksi/type_to_lyrics on GitHub"},"Star")),A&&A.existsInDB?l.a.createElement(m.a,{title:"Signed in as ".concat(A.userName),style:{alignSelf:"center"}},l.a.createElement(f.a.Item,{style:{paddingLeft:4,paddingRight:4}},l.a.createElement(u.a,{style:{width:"100%"},onClick:function(){return O.push("/user/".concat(A.userName))}},"View your profile")),l.a.createElement(f.a.Item,{style:{paddingLeft:4,paddingRight:4}},l.a.createElement(h.GoogleLogout,{clientId:b,onLogoutSuccess:function(){z(""),$()}}))):Q?l.a.createElement("p",{style:{fontSize:20,marginTop:16}}," Logging in... "):l.a.createElement("div",{style:{height:"100%",alignSelf:"center"}},l.a.createElement(y.a,{clientId:b,onSuccess:function(e){z(e.tokenId),$(),v&&v(e.tokenId)},isSignedIn:!0})))))}}}]);
//# sourceMappingURL=10.2ae68c4d.chunk.js.map