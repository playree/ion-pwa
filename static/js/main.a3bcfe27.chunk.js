(this["webpackJsonpion-pwa"]=this["webpackJsonpion-pwa"]||[]).push([[0],{252:function(e,t,n){},253:function(e,t,n){},264:function(e,t){},266:function(e,t){},277:function(e,t){},279:function(e,t){},306:function(e,t){},307:function(e,t){},313:function(e,t){},332:function(e,t){},398:function(e,t,n){"use strict";n.r(t);var r=n(0),i=n.n(r),a=n(51),c=n.n(a),s=(n(252),n(50)),o=n(17),u=(n(253),n(12)),d=n(70),l=n(4),j=n(31),x=n(477),b=n(446),h=n(478),O=n(479),p=n(408),f=n(470),v=n(481),g=n(482),m=n(466),y=n(483),w=n(484),k=n(480),I=n(485),S=n(475),D=n(447),R=n(450),E=n(451),P=n(452),K=n(453),C=n(454),L=n(455),N=n(1),W=200,T=Object(l.a)("main",{shouldForwardProp:function(e){return"open"!==e}})((function(e){var t=e.theme,n=e.open;return Object(d.a)({flexGrow:1,padding:t.spacing(3),transition:t.transitions.create("margin",{easing:t.transitions.easing.sharp,duration:t.transitions.duration.leavingScreen}),marginLeft:"-".concat(W,"px")},n&&{transition:t.transitions.create("margin",{easing:t.transitions.easing.easeOut,duration:t.transitions.duration.enteringScreen}),marginLeft:0})})),M=Object(l.a)(S.a,{shouldForwardProp:function(e){return"open"!==e}})((function(e){var t=e.theme,n=e.open;return Object(d.a)({transition:t.transitions.create(["margin","width"],{easing:t.transitions.easing.sharp,duration:t.transitions.duration.leavingScreen})},n&&{width:"calc(100% - ".concat(W,"px)"),marginLeft:"".concat(W,"px"),transition:t.transitions.create(["margin","width"],{easing:t.transitions.easing.easeOut,duration:t.transitions.duration.enteringScreen})})})),A=Object(l.a)("div")((function(e){var t=e.theme;return Object(d.a)(Object(d.a)({display:"flex",alignItems:"center",padding:t.spacing(0,1)},t.mixins.toolbar),{},{justifyContent:"flex-end"})})),U={textDecorationLine:"none",color:"#444",fontWeight:"bold"},F=r.createContext({}),_=r.createContext({}),z=r.createContext({}),V=function(){return r.useContext(z)},Y=function(){var e=Object(j.a)(),t=r.useState(!1),n=Object(u.a)(t,2),i=n[0],a=n[1],c=r.useState(!1),l=Object(u.a)(c,2),S=l[0],V=l[1],Y=r.useState(null),H=Object(u.a)(Y,2),B=H[0],J=H[1],X=r.useState(null),q=Object(u.a)(X,2),G=function(){a(!1)},Q={isNowLoading:S,setNowLoading:V},$={settings:B,setSettings:J},Z={didModel:q[0],setDidModel:q[1]};return Object(N.jsxs)(x.a,{sx:{display:"flex"},children:[Object(N.jsx)(b.a,{}),Object(N.jsx)(M,{position:"fixed",open:i,children:Object(N.jsxs)(h.a,{sx:{minHeight:"40px"},children:[Object(N.jsx)(O.a,{color:"inherit","aria-label":"open drawer",onClick:function(){a(!0)},edge:"start",sx:Object(d.a)({mr:2},i&&{display:"none"}),children:Object(N.jsx)(D.a,{})}),Object(N.jsx)(p.a,{variant:"h6",noWrap:!0,component:"div",children:"ION PWA Sample"})]})}),Object(N.jsxs)(f.a,{sx:{width:W,flexShrink:0,"& .MuiDrawer-paper":{width:W,boxSizing:"border-box"}},variant:"persistent",anchor:"left",open:i,children:[Object(N.jsx)(A,{children:Object(N.jsx)(O.a,{onClick:G,children:"ltr"===e.direction?Object(N.jsx)(R.a,{}):Object(N.jsx)(E.a,{})})}),Object(N.jsx)(v.a,{}),Object(N.jsxs)(g.a,{children:[Object(N.jsx)(s.b,{to:"/",style:U,onClick:G,children:Object(N.jsxs)(m.a,{button:!0,children:[Object(N.jsx)(y.a,{sx:{minWidth:"40px"},children:Object(N.jsx)(P.a,{})}),Object(N.jsx)(w.a,{primary:"\u30c8\u30c3\u30d7"})]})}),Object(N.jsx)(s.b,{to:"/qr/",style:U,onClick:G,children:Object(N.jsxs)(m.a,{button:!0,children:[Object(N.jsx)(y.a,{sx:{minWidth:"40px"},children:Object(N.jsx)(K.a,{})}),Object(N.jsx)(w.a,{primary:"QR\u8aad\u307f\u8fbc\u307f"})]})}),Object(N.jsx)(s.b,{to:"/did/",style:U,onClick:G,children:Object(N.jsxs)(m.a,{button:!0,children:[Object(N.jsx)(y.a,{sx:{minWidth:"40px"},children:Object(N.jsx)(C.a,{})}),Object(N.jsx)(w.a,{primary:"DID\u8a73\u7d30"})]})})]}),Object(N.jsx)(v.a,{}),Object(N.jsx)(g.a,{children:Object(N.jsx)(s.b,{to:"/settings/",style:U,onClick:G,children:Object(N.jsxs)(m.a,{button:!0,children:[Object(N.jsx)(y.a,{sx:{minWidth:"40px"},children:Object(N.jsx)(L.a,{})}),Object(N.jsx)(w.a,{primary:"\u8a2d\u5b9a"})]})})}),Object(N.jsx)(v.a,{}),Object(N.jsx)(g.a,{children:Object(N.jsxs)(m.a,{sx:{fontSize:"14px",color:"gray"},children:["build: ","20220531.001"]})})]}),Object(N.jsx)(F.Provider,{value:Q,children:Object(N.jsx)(_.Provider,{value:$,children:Object(N.jsxs)(z.Provider,{value:Z,children:[Object(N.jsxs)(T,{onClick:G,sx:{height:"100vh",width:"100%",paddingX:"8px"},children:[Object(N.jsx)(A,{sx:{minHeight:"40px"}}),Object(N.jsx)(o.b,{})]}),Object(N.jsx)(k.a,{sx:{color:"#fff",zIndex:function(e){return e.zIndex.drawer+1}},open:Q.isNowLoading,children:Object(N.jsx)(I.a,{color:"inherit"})})]})})}),Object(N.jsx)("div",{className:"SW-update-dialog"})]})},H=n(10),B=n(24),J=n(471),X=n(472),q=n(473),G=n(467),Q=n(465),$=n(474),Z=n(486),ee=n(487),te=n(462),ne=n(488),re=n(489),ie=n(459),ae=n(490),ce=n(491),se=n(456),oe=n(38),ue=n(39),de=n(228),le=Object(ue.a)((function e(t,n){Object(oe.a)(this,e),this.key=void 0,this.value=void 0,this.key=t,this.value=n}));le.KEYS={URL_OPERATION:"URL_OPERATION",URL_RESOLVE:"URL_RESOLVE"},Object(ue.a)((function e(t,n,r,i,a){Object(oe.a)(this,e),this.key=void 0,this.didlong=void 0,this.signingPrivateKey=void 0,this.recoveryPrivateKey=void 0,this.updatePrivateKey=void 0,this.key=t,this.didlong=n,this.signingPrivateKey=r,this.recoveryPrivateKey=i,this.updatePrivateKey=a})).KEY="KEY";var je=new de.a("ionpwa-db");je.version(1).stores({settings:"key",did:"id",privatekey:"id"});var xe=function(){function e(){Object(oe.a)(this,e),this.urlOperation=void 0,this.urlResolve=void 0,this.urlOperation="https://beta.ion.msidentity.com/api/v1.0/",this.urlResolve="https://beta.discover.did.microsoft.com/1.0/"}return Object(ue.a)(e,[{key:"load",value:function(){var e=Object(B.a)(Object(H.a)().mark((function e(){var t,n;return Object(H.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,je.settings.get(le.KEYS.URL_OPERATION);case 2:return(t=e.sent)&&(this.urlOperation=t.value),e.next=6,je.settings.get(le.KEYS.URL_RESOLVE);case 6:(n=e.sent)&&(this.urlResolve=n.value);case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"save",value:function(){var e=Object(B.a)(Object(H.a)().mark((function e(){return Object(H.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,je.settings.put(new le(le.KEYS.URL_OPERATION,this.urlOperation));case 2:return e.next=4,je.settings.put(new le(le.KEYS.URL_RESOLVE,this.urlResolve));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}],[{key:"load",value:function(){var t=Object(B.a)(Object(H.a)().mark((function t(){var n;return Object(H.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=new e,t.next=3,n.load();case 3:return t.abrupt("return",n);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"clear",value:function(){var e=Object(B.a)(Object(H.a)().mark((function e(){return Object(H.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,je.settings.clear();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),e}(),be=n(71),he=n(230),Oe=n.n(he),pe=n(119),fe=n(231),ve=function(){function e(){Object(oe.a)(this,e)}return Object(ue.a)(e,null,[{key:"create",value:function(){var t=Object(B.a)(Object(H.a)().mark((function t(n){var r,i,a,c,s,o,d,l,j,x,b,h,O,p,f,v,g,m,y,w,k,I,S,D,R,E,P=arguments;return Object(H.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=P.length>1&&void 0!==P[1]?P[1]:"signing-key",t.next=3,be.IonKey.generateEs256kOperationKeyPair();case 3:return i=t.sent,a=Object(u.a)(i,2),c=a[0],s=a[1],t.next=9,be.IonKey.generateEs256kOperationKeyPair();case 9:return o=t.sent,d=Object(u.a)(o,2),l=d[0],j=d[1],t.next=15,be.IonKey.generateEs256kDidDocumentKeyPair({id:r});case 15:return x=t.sent,b=Object(u.a)(x,2),h=b[0],O=b[1],p={recoveryKey:c,updateKey:l,document:{publicKeys:[h]}},f=be.IonRequest.createCreateRequest(p),v=be.IonDid.createLongFormDid(p),g=v.substring(v.lastIndexOf(":")+1),t.next=27,Oe.a.submitIonRequest(Object(pe.a)(n,e.ACTION_PATH.PROOF),Object(pe.a)(n,e.ACTION_PATH.OPERATIONS),JSON.stringify(f));case 27:if(m=t.sent){t.next=30;break}return t.abrupt("return",null);case 30:return y=JSON.parse(m),w=y.didDocument.id,k=w.split(":"),I=k[0],S=k[k.length-1],D=k[1],4===k.length&&(D+=":"+k[2]),R=y.didDocumentMetadata.method.published,E=new me(I,D,S,g,r,R),t.abrupt("return",{didModel:E,signingPrivateKey:O,recoveryPrivateKey:s,updatePrivateKey:j});case 42:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"resolve",value:function(){var t=Object(B.a)(Object(H.a)().mark((function t(n,r){var i;return Object(H.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(fe.fetch)(Object(pe.a)(n,e.ACTION_PATH.IDENTIFIERS,r));case 2:if(200===(i=t.sent).status){t.next=10;break}return t.t0=i.status,t.next=7,i.text();case 7:return t.t1=t.sent,t.t2={status:t.t0,text:t.t1},t.abrupt("return",{error:t.t2});case 10:return t.next=12,i.json();case 12:return t.abrupt("return",t.sent);case 13:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"save",value:function(){var e=Object(B.a)(Object(H.a)().mark((function e(t){return Object(H.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,je.did.put(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"load",value:function(){var e=Object(B.a)(Object(H.a)().mark((function e(){var t;return Object(H.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,je.did.get(me.ID);case 2:if(!(t=e.sent)){e.next=5;break}return e.abrupt("return",new me(t.scheme,t.method,t.didSuffix,t.longFormSuffixData,t.signingKeyId,t.published));case 5:return e.abrupt("return",null);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"clear",value:function(){var e=Object(B.a)(Object(H.a)().mark((function e(){return Object(H.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,je.did.clear();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),e}();ve.ACTION_PATH={OPERATIONS:"operations",IDENTIFIERS:"identifiers",PROOF:"proof-of-work-challenge"};var ge=function(){function e(){Object(oe.a)(this,e)}return Object(ue.a)(e,null,[{key:"save",value:function(){var e=Object(B.a)(Object(H.a)().mark((function e(t,n){return Object(H.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,je.privatekey.put(new ye(t,n));case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"load",value:function(){var e=Object(B.a)(Object(H.a)().mark((function e(t){return Object(H.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,je.privatekey.get(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"clear",value:function(){var e=Object(B.a)(Object(H.a)().mark((function e(){return Object(H.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,je.privatekey.clear();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),e}();ge.RESERVE_ID={RECOVERY:"@RECOVERY",UPDATE:"@UPDATE"};var me=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:e.SIGNING_KEY,c=arguments.length>5&&void 0!==arguments[5]&&arguments[5];Object(oe.a)(this,e),this.id=void 0,this.scheme=void 0,this.method=void 0,this.didSuffix=void 0,this.longFormSuffixData=void 0,this.signingKeyId=void 0,this.published=void 0,this.id=e.ID,this.scheme=t,this.method=n,this.didSuffix=r,this.longFormSuffixData=i,this.signingKeyId=a,this.published=c}return Object(ue.a)(e,[{key:"did",get:function(){return[this.scheme,this.method,this.didSuffix].join(":")}},{key:"didLong",get:function(){return[this.scheme,this.method,this.didSuffix,this.longFormSuffixData].join(":")}}]),e}();me.ID="onlyid",me.SIGNING_KEY="signing-key";var ye=Object(ue.a)((function e(t,n){Object(oe.a)(this,e),this.id=void 0,this.privateKey=void 0,this.id=t,this.privateKey=n})),we=function(){var e=r.useContext(F),t=r.useContext(_),n=V(),i=r.useState(!1),a=Object(u.a)(i,2),c=a[0],s=a[1],o=r.useState(!1),d=Object(u.a)(o,2),l=d[0],j=d[1],x=r.useState({title:"",text:""}),b=Object(u.a)(x,2),h=b[0],O=b[1],f=function(e,t){"clickaway"!==t&&s(!1)},g=function(){var r=Object(B.a)(Object(H.a)().mark((function r(){var i;return Object(H.a)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e.setNowLoading(!0),r.t0=t,r.next=4,xe.load();case 4:return r.t1=r.sent,r.t0.setSettings.call(r.t0,r.t1),r.next=8,ve.load();case 8:(i=r.sent)&&n.setDidModel(i),setTimeout((function(){e.setNowLoading(!1)}),500);case 11:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}();r.useEffect((function(){t.settings||g()}));var m=function(){var r=Object(B.a)(Object(H.a)().mark((function r(){var i;return Object(H.a)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(t.settings){r.next=2;break}return r.abrupt("return");case 2:return e.setNowLoading(!0),r.next=5,ve.create(t.settings.urlOperation);case 5:if(!(i=r.sent)){r.next=16;break}return r.next=9,ge.save(i.didModel.signingKeyId,i.signingPrivateKey);case 9:return r.next=11,ge.save(ge.RESERVE_ID.RECOVERY,i.recoveryPrivateKey);case 11:return r.next=13,ge.save(ge.RESERVE_ID.UPDATE,i.updatePrivateKey);case 13:return r.next=15,ve.save(i.didModel);case 15:n.setDidModel(i.didModel);case 16:setTimeout((function(){e.setNowLoading(!1),s(!0)}),500);case 17:case"end":return r.stop()}}),r)})));return function(){return r.apply(this,arguments)}}(),y=function(){var e=Object(B.a)(Object(H.a)().mark((function e(){return Object(H.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.didModel){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,k(n.didModel.did);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=Object(B.a)(Object(H.a)().mark((function e(){return Object(H.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.didModel){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,k(n.didModel.didLong);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){var r=Object(B.a)(Object(H.a)().mark((function r(i){var a;return Object(H.a)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(t.settings){r.next=2;break}return r.abrupt("return");case 2:if(n.didModel){r.next=4;break}return r.abrupt("return");case 4:return e.setNowLoading(!0),r.next=7,ve.resolve(t.settings.urlResolve,i);case 7:if((a=r.sent).error){r.next=15;break}if(n.didModel.published){r.next=15;break}if(!a.didDocumentMetadata.method.published){r.next=15;break}return n.didModel.published=!0,n.setDidModel(n.didModel),r.next=15,ve.save(n.didModel);case 15:setTimeout((function(){O({title:"DID\u691c\u8a3c\u30ec\u30b9\u30dd\u30f3\u30b9",text:JSON.stringify(a,null,2)}),j(!0),e.setNowLoading(!1)}),500);case 16:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}(),I=function(){var t=Object(B.a)(Object(H.a)().mark((function t(){return Object(H.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setNowLoading(!0),t.next=3,ge.clear();case 3:return t.next=5,ve.clear();case 5:n.setDidModel(null),setTimeout((function(){e.setNowLoading(!1)}),500);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),S=function(){var e=Object(B.a)(Object(H.a)().mark((function e(){return Object(H.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:j(!1);case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();if(!n.didModel)return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsxs)(J.a,{maxWidth:"sm",sx:{paddingX:"8px"},children:[Object(N.jsx)(p.a,{variant:"h5",sx:{marginBottom:"16px"},children:"DID"}),Object(N.jsxs)(X.a,{container:!0,spacing:2,children:[Object(N.jsx)(X.a,{item:!0,xs:12,children:"DID\u304c\u767a\u884c\u3055\u308c\u3066\u3044\u307e\u305b\u3093\u3002"}),Object(N.jsx)(X.a,{container:!0,item:!0,xs:12,justifyContent:"center",children:Object(N.jsx)(q.a,{variant:"contained",size:"large",startIcon:Object(N.jsx)(se.a,{}),onClick:m,children:"DID\u767a\u884c"})})]})]}),Object(N.jsx)(G.a,{open:c,autoHideDuration:6e3,onClose:f,children:Object(N.jsx)(Q.a,{onClose:f,severity:"success",sx:{width:"100%"},children:"DID\u3092\u767a\u884c\u3057\u307e\u3057\u305f\u3002"})})]});var D=n.didModel.published?Object(N.jsx)($.a,{label:"\u516c\u958b\u6e08",color:"success"}):Object(N.jsx)($.a,{label:"\u672a\u516c\u958b",color:"warning"});return Object(N.jsxs)(N.Fragment,{children:[Object(N.jsxs)(J.a,{maxWidth:"sm",sx:{paddingX:"8px"},children:[Object(N.jsx)(p.a,{variant:"h5",sx:{marginBottom:"16px"},children:"DID"}),Object(N.jsx)(X.a,{container:!0,spacing:2,children:Object(N.jsx)(X.a,{item:!0,xs:12,children:Object(N.jsxs)(Z.a,{variant:"outlined",children:[Object(N.jsxs)(ee.a,{children:[Object(N.jsx)(te.a,{label:"DID",fullWidth:!0,multiline:!0,value:n.didModel.did,InputProps:{readOnly:!0}}),Object(N.jsx)(J.a,{fixed:!0,sx:{marginTop:"8px",textAlign:"right"},children:D})]}),Object(N.jsx)(v.a,{sx:{marginX:"8px"}}),Object(N.jsxs)(ne.a,{children:[Object(N.jsx)(q.a,{size:"small",onClick:y,children:"DID\u3092\u691c\u8a3c"}),Object(N.jsx)(q.a,{size:"small",onClick:w,children:"DID(Long)\u3092\u691c\u8a3c"}),Object(N.jsx)(q.a,{size:"small",color:"error",onClick:I,children:"\u524a\u9664"})]})]})})})]}),Object(N.jsx)(G.a,{open:c,autoHideDuration:6e3,onClose:f,children:Object(N.jsx)(Q.a,{onClose:f,severity:"success",sx:{width:"100%"},children:"DID\u3092\u767a\u884c\u3057\u307e\u3057\u305f\u3002"})}),Object(N.jsxs)(re.a,{fullWidth:!0,maxWidth:"sm",open:l,"aria-labelledby":"responsive-dialog-title",children:[Object(N.jsx)(ie.a,{id:"responsive-dialog-title",children:h.title}),Object(N.jsx)(ae.a,{children:Object(N.jsx)(te.a,{label:"DID",fullWidth:!0,multiline:!0,maxRows:16,value:h.text,InputProps:{readOnly:!0,sx:{fontSize:"11px"}},sx:{marginTop:"8px"}})}),Object(N.jsx)(ce.a,{children:Object(N.jsx)(q.a,{onClick:S,autoFocus:!0,children:"OK"})})]})]})},ke=n(232),Ie=function(){var e=r.useState(""),t=Object(u.a)(e,2),n=t[0],i=t[1],a=Object(N.jsx)(ke.a,{constraints:{facingMode:"environment"},onResult:function(e){e&&(console.log(e),i(e.getText()))}}),c=Object(N.jsx)(Z.a,{variant:"outlined",children:Object(N.jsxs)(ee.a,{children:[Object(N.jsx)(p.a,{variant:"h6",children:"QR\u8aad\u307f\u53d6\u308a\u7d50\u679c"}),Object(N.jsx)(p.a,{sx:{wordWrap:"break-word",marginTop:"16px"},children:n})]})});return Object(N.jsx)(N.Fragment,{children:Object(N.jsxs)(J.a,{maxWidth:"sm",sx:{paddingX:"8px"},children:[Object(N.jsx)(p.a,{variant:"h5",sx:{marginBottom:"16px"},children:"QR\u8aad\u307f\u53d6\u308a"}),Object(N.jsxs)(J.a,{maxWidth:"sm",children:[!n&&a,n&&c]})]})})},Se=n(468),De=n(492),Re=n(493),Ee=n(460),Pe=function(){var e=V(),t=r.useState({signing:"",recovery:"",update:""}),n=Object(u.a)(t,2),i=n[0],a=n[1],c=function(){var t=Object(B.a)(Object(H.a)().mark((function t(){var n,r,i;return Object(H.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.didModel){t.next=46;break}return t.t0=a,t.t1=JSON,t.next=5,ge.load(e.didModel.signingKeyId);case 5:if(t.t3=n=t.sent,t.t2=null===t.t3,t.t2){t.next=9;break}t.t2=void 0===n;case 9:if(!t.t2){t.next=13;break}t.t4=void 0,t.next=14;break;case 13:t.t4=n.privateKey;case 14:return t.t5=t.t4,t.t6=t.t1.stringify.call(t.t1,t.t5,null,2),t.t7=JSON,t.next=19,ge.load(ge.RESERVE_ID.RECOVERY);case 19:if(t.t9=r=t.sent,t.t8=null===t.t9,t.t8){t.next=23;break}t.t8=void 0===r;case 23:if(!t.t8){t.next=27;break}t.t10=void 0,t.next=28;break;case 27:t.t10=r.privateKey;case 28:return t.t11=t.t10,t.t12=t.t7.stringify.call(t.t7,t.t11,null,2),t.t13=JSON,t.next=33,ge.load(ge.RESERVE_ID.UPDATE);case 33:if(t.t15=i=t.sent,t.t14=null===t.t15,t.t14){t.next=37;break}t.t14=void 0===i;case 37:if(!t.t14){t.next=41;break}t.t16=void 0,t.next=42;break;case 41:t.t16=i.privateKey;case 42:t.t17=t.t16,t.t18=t.t13.stringify.call(t.t13,t.t17,null,2),t.t19={signing:t.t6,recovery:t.t12,update:t.t18},(0,t.t0)(t.t19);case 46:case 47:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return r.useEffect((function(){i.signing||c()})),e.didModel?Object(N.jsx)(N.Fragment,{children:Object(N.jsxs)(J.a,{maxWidth:"sm",sx:{paddingX:"8px"},children:[Object(N.jsx)(p.a,{variant:"h5",sx:{marginBottom:"16px"},children:"DID\u8a73\u7d30"}),Object(N.jsxs)(Se.a,{children:[Object(N.jsx)(De.a,{expandIcon:Object(N.jsx)(Ee.a,{}),children:Object(N.jsx)(p.a,{children:"DID(Long)"})}),Object(N.jsx)(Re.a,{children:Object(N.jsx)(te.a,{label:"DID(Long)",fullWidth:!0,multiline:!0,maxRows:8,value:e.didModel.didLong,InputProps:{readOnly:!0,sx:{fontSize:"12px"}}})})]}),Object(N.jsxs)(Se.a,{children:[Object(N.jsx)(De.a,{expandIcon:Object(N.jsx)(Ee.a,{}),children:Object(N.jsx)(p.a,{children:"SigningPrivateKey"})}),Object(N.jsx)(Re.a,{children:Object(N.jsx)(te.a,{label:"SigningPrivateKey",fullWidth:!0,multiline:!0,maxRows:8,value:i.signing,InputProps:{readOnly:!0,sx:{fontSize:"12px"}}})})]}),Object(N.jsxs)(Se.a,{children:[Object(N.jsx)(De.a,{expandIcon:Object(N.jsx)(Ee.a,{}),children:Object(N.jsx)(p.a,{children:"RecoveryPrivateKey"})}),Object(N.jsx)(Re.a,{children:Object(N.jsx)(te.a,{label:"RecoveryPrivateKey",fullWidth:!0,multiline:!0,maxRows:8,value:i.recovery,InputProps:{readOnly:!0,sx:{fontSize:"12px"}}})})]}),Object(N.jsxs)(Se.a,{children:[Object(N.jsx)(De.a,{expandIcon:Object(N.jsx)(Ee.a,{}),children:Object(N.jsx)(p.a,{children:"UpdatePrivateKey"})}),Object(N.jsx)(Re.a,{children:Object(N.jsx)(te.a,{label:"UpdatePrivateKey",fullWidth:!0,multiline:!0,maxRows:8,value:i.update,InputProps:{readOnly:!0,sx:{fontSize:"12px"}}})})]})]})}):Object(N.jsx)(o.a,{to:"/",replace:!0})},Ke=n(461),Ce=function(){var e=r.useState(!1),t=Object(u.a)(e,2),n=t[0],i=t[1],a=r.useState(""),c=Object(u.a)(a,2),s=c[0],o=c[1],d=r.useState(""),l=Object(u.a)(d,2),j=l[0],x=l[1],b=function(e){switch(e.target.id){case"url-operation":o((function(){return e.target.value}));break;case"url-resolve":x((function(){return e.target.value}))}},h=function(e,t){"clickaway"!==t&&i(!1)},O=function(){var e=Object(B.a)(Object(H.a)().mark((function e(){var t;return Object(H.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=new xe).urlOperation=s,t.urlResolve=j,e.next=5,t.save();case 5:i(!0);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),f=function(){var e=Object(B.a)(Object(H.a)().mark((function e(){var t;return Object(H.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,xe.clear();case 2:t=new xe,o(t.urlOperation),x(t.urlResolve);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.useEffect((function(){xe.load().then((function(e){o(e.urlOperation),x(e.urlResolve)}))}),[]),Object(N.jsxs)(N.Fragment,{children:[Object(N.jsxs)(J.a,{maxWidth:"sm",sx:{paddingX:"8px"},children:[Object(N.jsx)(p.a,{variant:"h5",sx:{marginBottom:"16px"},children:"Settings"}),Object(N.jsxs)(X.a,{container:!0,spacing:2,children:[Object(N.jsx)(X.a,{item:!0,xs:12,children:Object(N.jsx)(te.a,{id:"url-operation",fullWidth:!0,label:"Operation URL",variant:"outlined",value:s,onChange:b})}),Object(N.jsx)(X.a,{item:!0,xs:12,children:Object(N.jsx)(te.a,{id:"url-resolve",fullWidth:!0,label:"Resolve URL",variant:"outlined",value:j,onChange:b})}),Object(N.jsx)(X.a,{item:!0,xs:8,children:Object(N.jsx)(q.a,{fullWidth:!0,variant:"contained",startIcon:Object(N.jsx)(Ke.a,{}),onClick:O,children:"\u4fdd\u5b58"})}),Object(N.jsx)(X.a,{item:!0,xs:4,children:Object(N.jsx)(q.a,{fullWidth:!0,variant:"contained",color:"error",onClick:f,children:"\u30ea\u30bb\u30c3\u30c8"})})]})]}),Object(N.jsx)(G.a,{open:n,autoHideDuration:6e3,onClose:h,children:Object(N.jsx)(Q.a,{onClose:h,severity:"success",sx:{width:"100%"},children:"\u8a2d\u5b9a\u3092\u4fdd\u5b58\u3057\u307e\u3057\u305f\u3002"})})]})},Le=function(){return Object(N.jsx)(s.a,{children:Object(N.jsx)(o.e,{children:Object(N.jsxs)(o.c,{element:Object(N.jsx)(Y,{}),children:[Object(N.jsx)(o.c,{index:!0,element:Object(N.jsx)(we,{})}),Object(N.jsx)(o.c,{path:"qr",element:Object(N.jsx)(Ie,{})}),Object(N.jsx)(o.c,{path:"did",element:Object(N.jsx)(Pe,{})}),Object(N.jsx)(o.c,{path:"settings",element:Object(N.jsx)(Ce,{})})]})})})},Ne=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function We(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){e.waiting&&t&&t.onUpdate&&t.onUpdate(e);var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state?navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)):"activated"===n.state&&window.location.reload()})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var Te=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,495)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),r(e),i(e),a(e),c(e)}))},Me=n(494),Ae=function(e){var t=e.registration,n=Object(r.useState)(!!t.waiting),i=Object(u.a)(n,2),a=i[0],c=i[1];return Object(N.jsxs)(re.a,{open:a,children:[Object(N.jsx)(ie.a,{style:{textAlign:"center"},children:"\u30a2\u30c3\u30d7\u30c7\u30fc\u30c8\u901a\u77e5"}),Object(N.jsx)(ae.a,{children:Object(N.jsx)(Me.a,{children:"\u65b0\u3057\u3044\u30d0\u30fc\u30b8\u30e7\u30f3\u304c\u30ea\u30ea\u30fc\u30b9\u3055\u308c\u307e\u3057\u305f\u3002"})}),Object(N.jsx)(ce.a,{sx:{justifyContent:"center"},children:Object(N.jsx)(q.a,{onClick:function(){var e;null===(e=t.waiting)||void 0===e||e.postMessage({type:"SKIP_WAITING"}),c(!1)},children:"\u30a2\u30c3\u30d7\u30c7\u30fc\u30c8"})})]})};c.a.render(Object(N.jsx)(i.a.StrictMode,{children:Object(N.jsx)(Le,{})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");Ne?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):We(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):We(t,e)}))}}({onUpdate:function(e){e.waiting&&c.a.render(Object(N.jsx)(Ae,{registration:e}),document.querySelector(".SW-update-dialog"))}}),Te()}},[[398,1,2]]]);
//# sourceMappingURL=main.a3bcfe27.chunk.js.map