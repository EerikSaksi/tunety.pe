(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[9],{100:function(e,t,n){e.exports=n.p+"static/media/home.34034ca8.png"},195:function(e,t,n){"use strict";var a=n(3),r=a.useState,o=a.useCallback,c=a.useLayoutEffect;function i(e){return e?{width:e.offsetWidth,height:e.offsetHeight}:{width:0,height:0}}e.exports=function(e){var t=r(i(e?e.current:{})),n=t[0],a=t[1],s=o((function(){e.current&&a(i(e.current))}),[e]);return c((function(){if(e.current){if(s(),"function"===typeof ResizeObserver){var t=new ResizeObserver((function(){s()}));return t.observe(e.current),function(){t.disconnect(e.current),t=null}}return window.addEventListener("resize",s),function(){window.removeEventListener("resize",s)}}}),[e.current]),n}},196:function(e,t,n){},197:function(e,t,n){e.exports=n.p+"static/media/cat_nodding.1327cfd0.gif"},205:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return B}));var a=n(105),r=n.n(a),o=n(106),c=n(91),i=n(95),s=n(3),u=n.n(s),l=n(97),m=n(102),f=n(92),g=n(50),d=n(122),b=n(101);function y(e){var t=e.text,n=(e.time,e.id,e.topOffset),a=e.commonSuffixLength,r=e.horizontalOffsetPercentage;return u.a.createElement(b.a,null,u.a.createElement("div",{style:{width:"auto",position:"absolute",transform:"translate(-50%, ".concat(n,"px)"),transition:"opacity .1s ease-in-out, top 2s ease-in-out",left:"".concat(r,"%")}},u.a.createElement("p",null,u.a.createElement("span",{style:{color:"green",display:"inline-block"}},t.substring(0,a||0)),u.a.createElement("span",{style:{color:"black",display:"inline-block"}},t.substring(a||0)))))}var p=n(195),h=n.n(p);function v(e){var t=e.syncedLyrics,n=e.input,a=e.setInput,r=e.setTotalCharacters,o=e.videoDuration,i=e.animateBackgroundColor,l=Object(s.useRef)(),m=h()(l).height,f=Object(s.useState)(0),g=Object(c.a)(f,2),b=g[0],p=g[1],v=Object(s.useState)(t[0]),E=Object(c.a)(v,2),O=E[0],j=E[1];Object(s.useEffect)((function(){var e=!0,c=!1,s=O.map((function(t){var a=(o-t.time)/3*m;return a<=0&&(a=0,e=!1),t.topOffset=a,0===t.text.indexOf(n)?t.commonSuffixLength=n.length:t.commonSuffixLength=0,t})).filter((function(e){return o-e.time>3?(i("red"),!1):!(!c&&e.text+" "===n)||(c=!0,a(""),i("green"),r((function(t){return t+e.text.length})),!1)}));if(e){var u=b+1;u<t.length&&(p(u),s.push.apply(s,Object(d.a)(t[u])))}j(s)}),[o,i,m,t]);var I=function(e){j.filter((function(t){return t.id!==e}))};return u.a.createElement("div",{ref:l,style:{position:"absolute",top:60,bottom:"20%",left:0,right:0,zIndex:1e3}},O===[]?null:O.map((function(e){return u.a.createElement(y,Object.assign({key:e.id},e,{input:n,removeByID:I,topOffset:e.topOffset,commonSuffixLength:e.commonSuffixLength}))})))}var E=n(10),O=n(98),j=n(110),I=n(104),S=n(109);n(196);function k(e){var t=e.playing,n=e.setPlaying,a=e.setShowCat,r=e.gameStats,o=Object(s.useState)("/leaderboards"),i=Object(c.a)(o,2),g=i[0],d=i[1],b=Object(s.useState)(""),y=Object(c.a)(b,2),p=y[0],h=y[1];return u.a.createElement(j.a,{show:!t,variant:"primary",className:"shadow-lg fade",style:{top:80,bottom:20,marginBottom:0,position:"absolute",left:"50%",transform:"translateX(-50%)",width:"50%",zIndex:1e3}},u.a.createElement(S.a,{style:{height:"10%"},variant:"pills",activeKey:g,onSelect:function(e){return d(e)}},u.a.createElement(S.a.Item,null,u.a.createElement(S.a.Link,{eventKey:"/leaderboards"},"Leaderboards")),u.a.createElement(S.a.Item,null,u.a.createElement(S.a.Link,{eventKey:"/options"},"Options"))),"/leaderboards"===g?r?r.map((function(e){var t=e.playerUserName,n=e.wordsPerMinute,a=e.accuracy;return u.a.createElement(l.a,{id:e.bb,style:{height:"10%"}},u.a.createElement(I.a,{style:{borderColor:"black"}},u.a.createElement("p",null,t)),u.a.createElement(I.a,{style:{justifyContent:"right"}},u.a.createElement("p",null,"".concat(n,"wpm")," ")),u.a.createElement(I.a,{style:{justifyContent:"right"}},u.a.createElement("p",null,"".concat(a,"%"))))})):null:u.a.createElement(l.a,null,u.a.createElement(I.a,{xs:1,style:{alignSelf:"center"}},u.a.createElement(m.a.Check,{onClick:function(e){a(e.target.checked),h(!0)},variant:"checkbox"})),u.a.createElement(I.a,null,u.a.createElement("p",{style:{alignSelf:"center",fontSize:40,marginBottom:0}},"Add cat"),u.a.createElement(j.a,{dismissible:!0,show:p,onClose:function(){return h(!1)},style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},variant:"danger"},u.a.createElement(j.a.Heading,{style:{textAlign:"center"}},"Warning! This setting only works for absolute bangers!"),u.a.createElement(l.a,{style:{justifyContent:"center"}},u.a.createElement(f.a,{onClick:function(){return h(!1)}},"Don't worry I only play bangers"))))),u.a.createElement(l.a,{style:{justifyContent:"center",height:"10%"}},u.a.createElement(f.a,{style:{height:"40%",alignSelf:"center"},onClick:function(){return n(!0)}},"Play!")))}var D=n(49),w=n(27),C=n(119),x=n.n(C);function N(){var e=Object(i.a)(["\n  query gamestats($youtubeID: String, $geniusID: String, $creatorUserName: String) {\n    gameStats(youtubeID: $youtubeID, geniusID: $geniusID, creatorUserName: $creatorUserName) {\n      playerUserName\n      wordsPerMinute\n      accuracy\n    }\n  }\n"]);return N=function(){return e},e}function L(){var e=Object(i.a)(["\n  mutation postgamestats($gameStats: InputGameStats!) {\n    postGameStats(gameStats: $gameStats)\n  }\n"]);return L=function(){return e},e}function $(){var e=Object(i.a)(["\n  query synchronizationdata($youtubeID: String, $geniusID: String) {\n    synchronizationData(youtubeID: $youtubeID, geniusID: $geniusID) {\n      startTime\n      endTime\n    }\n  }\n"]);return $=function(){return e},e}function z(){var e=Object(i.a)(["\n  query syncedlyrics($youtubeID: String, $geniusID: String) {\n    syncedLyrics(youtubeID: $youtubeID, geniusID: $geniusID) {\n      text\n      time\n      id\n      horizontalOffsetPercentage\n    }\n  }\n"]);return z=function(){return e},e}var T=Object(D.gql)(z()),q=Object(D.gql)($()),P=Object(D.gql)(L()),U=Object(D.gql)(N());function B(){var e=Object(E.g)(),t=e.creatorUserName,a=e.youtubeID,i=e.geniusID,d=Object(D.useQuery)(T,{variables:{youtubeID:a,geniusID:i}}),b=d.data,y=(b=void 0===b?{}:b).syncedLyrics,p=d.loading,h=Object(D.useQuery)(q,{variables:{youtubeID:a,geniusID:i}}),j=h.data,I=(j=void 0===j?{}:j).synchronizationData,S=h.error,C=Object(s.useState)(!1),N=Object(c.a)(C,2),L=N[0],$=N[1],z=Object(s.useState)(!1),B=Object(c.a)(z,2),R=B[0],F=B[1],H=Object(D.useLazyQuery)(U,{variables:{geniusID:i,youtubeID:a,creatorUserName:t},fetchPolicy:"network-only"}),M=Object(c.a)(H,2),Q=M[0],_=M[1].data,G=(_=void 0===_?{}:_).gameStats,K=Object(s.useRef)();Object(s.useEffect)((function(){Q();var e=setInterval((function(){K.current&&ye(K.current.getCurrentTime())}),10);return function(){return clearInterval(e)}}),[]);var W=Object(s.useState)(""),A=Object(c.a)(W,2),J=A[0],V=A[1],X=Object(s.useState)(0),Y=Object(c.a)(X,2),Z=Y[0],ee=Y[1];console.log({gameStats:{tokenId:J,creatorUserName:t,youtubeID:a,geniusID:i,totalCharacters:Z}});var te=Object(D.useMutation)(P,{variables:{gameStats:{tokenId:J,creatorUserName:t,youtubeID:a,geniusID:i,totalCharacters:Z}},onCompleted:function(){Q()}}),ne=Object(c.a)(te,1)[0];Object(s.useEffect)((function(){L&&I&&K.current.seekTo(I[0].startTime)}),[I,L]);var ae=Object(E.f)(),re=Object(s.useState)(""),oe=Object(c.a)(re,2),ce=oe[0],ie=oe[1],se=Object(s.useState)("white"),ue=Object(c.a)(se,2),le=ue[0],me=ue[1],fe=function(){var e=Object(o.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return me(t),e.next=3,new Promise((function(e){return setTimeout(e,100)}));case 3:me("white");case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ge=Object(s.useState)(0),de=Object(c.a)(ge,2),be=de[0],ye=de[1],pe=Object(s.useRef)();return Object(s.useEffect)((function(){pe.current&&pe.current.focus()}),[L]),a&&i?u.a.createElement(u.a.Fragment,null,u.a.createElement(O.a,{setParentTokenId:V}),S?u.a.createElement(l.a,{className:"justify-content-md-center"},u.a.createElement(f.a,{onClick:function(){return ae.push("/sync/".concat(a,"/").concat(i))}},u.a.createElement("p",null,"Create synchronization for this song and video."))):p?u.a.createElement(u.a.Fragment,null,u.a.createElement(l.a,{style:{justifyContent:"center"}},u.a.createElement("p",null,"Loading lyrics")),u.a.createElement(l.a,{style:{justifyContent:"center"}},u.a.createElement(w.a,null))):u.a.createElement("div",{style:{position:"absolute",top:0,bottom:0,right:0,left:0,backgroundColor:le,transition:"background-color 200ms"}},u.a.createElement(k,{playing:L,setPlaying:$,setShowCat:F,gameStats:G}),u.a.createElement(l.a,null,u.a.createElement(m.a,{style:{position:"absolute",bottom:0,left:"50%",width:800,transform:"translate(-50%, 0%)",fontSize:100},onChange:function(e){return ie(e.target.value)}},u.a.createElement(m.a.Control,{onChange:function(e){return ie(e.target.value)},value:ce,className:"shadow-lg",ref:pe,style:{fontSize:40},autoFocus:!0}))),u.a.createElement(x.a,{ref:K,url:"https://www.youtube.com/watch?v=".concat(a),playing:L,onEnded:function(){$(!1),ne()},style:{opacity:0}}),L?u.a.createElement(u.a.Fragment,null,u.a.createElement(v,{input:ce,setInput:ie,setTotalCharacters:ee,syncedLyrics:p?[]:y,videoDuration:be,animateBackgroundColor:fe}),R?u.a.createElement(g.a,{style:{height:500,width:500,position:"absolute",left:"50%",transform:"translate(-50%, -50%)",top:"50%",zIndex:0},src:n(197)}):null):null)):"Invalid URL: Missing either a youtubeID or a geniusID"}},98:function(e,t,n){"use strict";n.d(t,"a",(function(){return C}));var a=n(91),r=n(95),o=n(3),c=n.n(o),i=n(114),s=n(110),u=n(109),l=n(92),m=n(118),f=n(115),g=n(102),d=n(10),b=n(120),y=n(99),p=n.n(y),h="359548864121-f3blhpvvgm17oqoun8tvh2708a8loujm.apps.googleusercontent.com",v=n(49),E=n(103),O=n.n(E);function j(){var e=Object(r.a)(["\n  mutation createuser($tokenId: String, $userName: String) {\n    createUser(tokenId: $tokenId, userName: $userName)\n  }\n"]);return j=function(){return e},e}function I(){var e=Object(r.a)(["\n  query usernametaken($userName: String!) {\n    userNameTaken(userName: $userName)\n  }\n"]);return I=function(){return e},e}function S(){var e=Object(r.a)(["\n  query userdata($tokenId: String) {\n    userData(tokenId: $tokenId) {\n      userName\n      existsInDB\n    }\n  }\n"]);return S=function(){return e},e}var k=Object(v.gql)(S()),D=Object(v.gql)(I()),w=Object(v.gql)(j());function C(e){var t=e.centerContent,r=e.customContent,E=e.setParentTokenId,j=e.setParentUserName,I=Object(d.f)(),S=O()(),C=S.innerWidth,x=S.innerHeight,N=Object(o.useState)(""),L=Object(a.a)(N,2),$=L[0],z=L[1],T=Object(v.useLazyQuery)(k,{variables:{tokenId:$},onCompleted:function(){B.existsInDB?j&&j(B.userName):A(!0)},fetchPolicy:"network-only"}),q=Object(a.a)(T,2),P=q[0],U=q[1].data,B=(U=void 0===U?{}:U).userData,R=Object(o.useState)(""),F=Object(a.a)(R,2),H=F[0],M=F[1],Q=Object(v.useQuery)(D,{variables:{userName:H},skip:!B||B.existsInDB||""===H}).data,_=(Q=void 0===Q?{}:Q).userNameTaken,G=Object(o.useState)(!1),K=Object(a.a)(G,2),W=K[0],A=K[1],J=Object(v.useMutation)(w,{variables:{userName:H,tokenId:$},onCompleted:function(){P({variables:{tokenId:$}}),A(!1)}}),V=Object(a.a)(J,1)[0];return c.a.createElement(c.a.Fragment,null,c.a.createElement(s.a,{className:"shadow-lg",style:{position:"absolute",left:.5*C,top:.5*x,transform:"translate(-50%, -50%)",zIndex:1e3},show:W,onClose:function(){return A(!1)},variant:_?"danger":"primary"},c.a.createElement(c.a.Fragment,null,c.a.createElement(s.a.Heading,null,_?"This username is taken":"Create a username for your account"),c.a.createElement(g.a,{onSubmit:function(e){e.preventDefault(),_||V()},onChange:function(e){return M(e.target.value)}},c.a.createElement(g.a.Control,{style:{marginTop:"em"},placeholder:"Enter username for your new account",autoFocus:!0}),c.a.createElement(l.a,{style:{position:"relative",marginTop:"1em",left:"50%",transform:"translate(-50%, 0px)"},disabled:_,onClick:function(){return V()}},"Create account")))),c.a.createElement(i.a,{style:{height:60},sticky:"top",bg:"secondary",variant:"dark"},c.a.createElement(i.a.Brand,{onClick:function(){return I.push("/")}},c.a.createElement(l.a,{variant:"outline-primary",style:{justifyContent:"left",width:142,height:44},size:"sm"},c.a.createElement("img",{alt:"Home",src:n(100),style:{top:0,height:"100%",width:"100%"}}))),r,c.a.createElement(i.a.Collapse,{style:{position:"absolute",transform:"translate(-50%, 0%)",left:"50%"}},t),c.a.createElement(u.a,{className:"ml-auto"},c.a.createElement("div",{style:{marginRight:10,marginTop:20,marginBottom:20}},c.a.createElement(b.a,{href:"https://github.com/EerikSaksi/type_to_lyrics","data-icon":"octicon-star","data-size":"large","data-show-count":"true","aria-label":"Star EerikSaksi/type_to_lyrics on GitHub"},"Star")),B&&B.existsInDB?c.a.createElement(m.a,{title:"Signed in as ".concat(B.userName),style:{alignSelf:"center"}},c.a.createElement(f.a.Item,{style:{paddingLeft:4,paddingRight:4}},c.a.createElement(l.a,{style:{width:"100%"},onClick:function(){return I.push("/user/".concat(B.userName))}},"View your profile")),c.a.createElement(f.a.Item,{style:{paddingLeft:4,paddingRight:4}},c.a.createElement(y.GoogleLogout,{clientId:h,onLogoutSuccess:function(){z(""),P()}}))):W?c.a.createElement("p",{style:{fontSize:20,marginTop:16}}," Logging in... "):c.a.createElement("div",{style:{height:"100%",alignSelf:"center"}},c.a.createElement(p.a,{clientId:h,onSuccess:function(e){z(e.tokenId),P(),E&&E(e.tokenId)},onFailure:function(e){},isSignedIn:!0})))))}}}]);
//# sourceMappingURL=9.062914b4.chunk.js.map