(function(){"use strict";var e={46:function(e,t,o){var i=o(395),s=o(271),a=o(348);const n={class:"top"},c=(0,s.uE)('<div class="item website_name" data-v-452fe3f0>ECSRP</div><div class="item page_name" data-v-452fe3f0>Volunteer</div><div class="item page_name" data-v-452fe3f0>Alerts</div><div class="item page_name" data-v-452fe3f0>Health home</div><div class="item page_name" data-v-452fe3f0>Home</div><div class="item page_name" data-v-452fe3f0>resources</div><div class="item page_name" data-v-452fe3f0>Forums</div><div class="item botton" data-v-452fe3f0>Login in</div>',8),l=[c];var r={props:{foo:String},setup(e){const t=e;return console.log(t),(e,t)=>((0,s.wg)(),(0,s.iD)("div",n,l))}},u=o(110);const d=(0,u.Z)(r,[["__scopeId","data-v-452fe3f0"]]);var p=d,m=o(160),v=o.p+"img/abss.7812f1c7.jpg",f=o.p+"img/4a6a714b141a8d2bee058d47c0a4702.3cb9bebb.jpg",g=o.p+"img/028b5dc489ada80228d04c71cfa0975.4cba78c6.png",w=o.p+"img/1778b7d044ba70b8b3cf35f6a0e8b63.922c5c91.jpg",_=o.p+"img/a093cb7e711667cf2786c238e58f19e.858cfce7.png",b=o.p+"img/c68e43db8acec1e8184b759bf02efe3.95558d00.png",h=o.p+"img/inbound.97c594eb.jpg";const y={class:"topic_list"},C={class:"list"},D={class:"topic_name"},j=["src"],H={class:"text"};var k={props:{name:{type:String,required:!0},topicList:{type:Array,required:!0,default(){return[{id:"",name:"",image:"",followCount:0}]}}},setup(e){const t=e;return console.log("topic list",t),(e,o)=>((0,s.wg)(),(0,s.iD)("div",y,[(0,s._)("div",C,[(0,s._)("div",D,(0,a.zw)(t.name),1),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(t.topicList,(e=>((0,s.wg)(),(0,s.iD)("div",{class:"topic",key:e.id},[(0,s._)("img",{class:"image",alt:"Vue logo",src:e.image},null,8,j),(0,s._)("div",H,(0,a.zw)(e.name),1)])))),128))])]))}};const z=(0,u.Z)(k,[["__scopeId","data-v-25999f22"]]);var O=z;const I=e=>((0,s.dD)("data-v-fc792b54"),e=e(),(0,s.Cn)(),e),A={class:"follow_btn"},S=I((()=>(0,s._)("div",{class:"follow"},"+follow",-1))),Z={class:"follow_info"};var L={props:{followCount:String},setup(e){const t=e;return(e,o)=>((0,s.wg)(),(0,s.iD)("div",A,[S,(0,s._)("div",Z,(0,a.zw)(t.followCount)+"followed",1)]))}};const x=(0,u.Z)(L,[["__scopeId","data-v-fc792b54"]]);var Y=x;const q={class:"topic"},W=["src"],F={class:"info"},K={class:"name"};var U={props:{topic:{type:Object,required:!0,default(){return{id:"",name:"",image:"",followCount:0}}},width:{type:Number,required:!0}},setup(e){const t=e;return console.log(t),(e,o)=>((0,s.wg)(),(0,s.iD)("div",q,[(0,s._)("img",{class:"image",style:(0,a.j5)({width:t.width+"px"}),alt:"Vue logo",src:t.topic.image},null,12,W),(0,s._)("div",F,[(0,s._)("div",K,(0,a.zw)(t.topic.name),1),(0,s.Wm)(Y,{"follow-count":t.topic.followCount},null,8,["follow-count"])])]))}};const V=(0,u.Z)(U,[["__scopeId","data-v-52cc28e6"]]);var P=V;const B={class:"slideshow"};var E={props:{topicList:{type:Array,required:!0,default(){return[{id:"",name:"",image:"",followCount:0}]}}},setup(e){const t=e,o=18,i=200,n=[...t.topicList,...t.topicList,...t.topicList],c=(0,m.iH)(!1),l=(0,m.iH)(0);function r(){const e=i+o;l.value-=1,l.value<=-n.length*e/2&&(l.value=0)}function u(){c.value=!c.value}function d(){c.value=!1,p()}function p(){1!=c.value?setTimeout((()=>{r(),p()}),10):console.log("If pause is set, scroll is not performed")}return c.value||p(),(e,t)=>((0,s.wg)(),(0,s.iD)("div",B,[(0,s._)("div",{class:"show",onMouseenter:u,onMouseleave:d},[(0,s._)("div",{class:"move",style:(0,a.j5)({left:l.value+"px"})},[((0,s.wg)(),(0,s.iD)(s.HY,null,(0,s.Ko)(n,(e=>(0,s.Wm)(P,{topic:e,width:i,key:e.id},null,8,["topic"]))),64))],4)],32)]))}};const M=(0,u.Z)(E,[["__scopeId","data-v-78e2dbd9"]]);var N=M;const T=e=>((0,s.dD)("data-v-75ec26fe"),e=e(),(0,s.Cn)(),e),R=T((()=>(0,s._)("div",{class:"topic_name"},"推荐话题",-1))),G={class:"list"};var J={setup(e){const t=[f,g,w,_,b,h],o=new Array(t.length).fill(666).map(((e,o)=>({image:t[o],name:"测试",followCount:10*o,id:"B"+o}))),i=new Array(5).fill(666).map(((e,t)=>({image:v,name:"校园规章制度",followCount:10*t,id:"B"+t})));return(e,t)=>((0,s.wg)(),(0,s.iD)(s.HY,null,[R,(0,s.Wm)(N,{"topic-list":(0,m.SU)(o)},null,8,["topic-list"]),(0,s._)("div",G,[(0,s.Wm)(O,{name:"最热话题","topic-list":(0,m.SU)(i)},null,8,["topic-list"]),(0,s.Wm)(O,{name:"最新评论","topic-list":(0,m.SU)(i)},null,8,["topic-list"])])],64))}};const Q=(0,u.Z)(J,[["__scopeId","data-v-75ec26fe"]]);var X=Q;const $=e=>((0,s.dD)("data-v-941dbc52"),e=e(),(0,s.Cn)(),e),ee={class:"user"},te={class:"head"},oe=["src"],ie={class:"info"},se={class:"name"},ae={class:"follow_btn"},ne=$((()=>(0,s._)("div",{class:"follow"},"+Follow",-1))),ce={class:"follow_info"};var le={props:{user:{name:String,headimage:String,followCount:Number}},setup(e){const t=e;return console.log(t),(e,o)=>((0,s.wg)(),(0,s.iD)("div",ee,[(0,s._)("div",te,[(0,s._)("img",{class:"image",style:(0,a.j5)({width:t.width+"px"}),alt:"Vue logo",src:t.user.headimage},null,12,oe)]),(0,s._)("div",ie,[(0,s._)("div",se,(0,a.zw)(t.user.name),1),(0,s._)("div",ae,[ne,(0,s._)("div",ce,(0,a.zw)(t.user.followCount)+"followed",1)])])]))}};const re=(0,u.Z)(le,[["__scopeId","data-v-941dbc52"]]);var ue=re;const de={class:"member_contrainer"},pe={class:"members"};var me={setup(e){const t=["topic"].map(((e,t)=>(console.log("testuser",e,t),{name:e,headimage:v,followCount:10*t,id:t})));return(e,o)=>((0,s.wg)(),(0,s.iD)("div",de,[(0,s._)("div",pe,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)((0,m.SU)(t),(e=>((0,s.wg)(),(0,s.j4)(ue,{user:e,key:e.id},null,8,["user"])))),128))])]))}};const ve=(0,u.Z)(me,[["__scopeId","data-v-7e9ef7d4"]]);var fe=ve;function ge(){const e=[f,g,w,_,b,h],t=new Array(e.length).fill(666).map(((t,o)=>({image:e[o],name:"test",followCount:10*o,id:"B"+o})));return t}const we={class:"category_contrainer"},_e={class:"categorys"},be={class:"category_name"},he={class:"topic_list"};var ye={setup(e){const t=["ForumClassification"],o=ge();return(e,i)=>((0,s.wg)(),(0,s.iD)("div",we,[(0,s._)("div",_e,[((0,s.wg)(),(0,s.iD)(s.HY,null,(0,s.Ko)(t,(e=>(0,s._)("div",{class:"category",key:e},[(0,s._)("div",be,(0,a.zw)(e),1),(0,s._)("div",he,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)((0,m.SU)(o),(e=>((0,s.wg)(),(0,s.j4)(P,{topic:e,key:e.id},null,8,["topic"])))),128))])]))),64))])]))}};const Ce=(0,u.Z)(ye,[["__scopeId","data-v-6d621cf6"]]);var De=Ce;const je={class:"topic"},He={class:"title"},ke=["src"],ze={class:"info"},Oe={class:"name"},Ie={class:"count"},Ae={class:"desp"},Se={class:"articleList"},Ze={class:"count"},Le={class:"list"},xe=["src"],Ye={class:"info"},qe={class:"name"},We={class:"desp"},Fe={class:"comment"};var Ke={props:{topic:{type:Object,required:!0,default(){return{id:"",name:"",image:"",followCount:0,desp:"",articleCount:0,articles:{type:Array,required:!0,default(){return{name:"",desp:"",commentCount:0}}}}}},width:{type:Number,required:!0}},setup(e){const t=e;return console.log(t),(e,o)=>((0,s.wg)(),(0,s.iD)("div",je,[(0,s._)("div",He,[(0,s._)("img",{class:"image",style:(0,a.j5)({width:t.width+"px"}),alt:"Vue logo",src:t.topic.image},null,12,ke),(0,s._)("div",ze,[(0,s._)("div",Oe,(0,a.zw)(t.topic.name),1),(0,s._)("div",Ie,(0,a.zw)(t.topic.articleCount)+" article",1),(0,s._)("div",Ae,(0,a.zw)(t.topic.desp),1),(0,s.Wm)(Y,{"follow-count":t.topic.followCount},null,8,["follow-count"])])]),(0,s._)("div",Se,[(0,s._)("div",Ze,(0,a.zw)(t.topic.articleCount)+" article",1),(0,s._)("div",Le,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(t.topic.articles,(e=>((0,s.wg)(),(0,s.iD)("div",{class:"article",key:e.name},[(0,s._)("image",{class:"image",src:e.image},null,8,xe),(0,s._)("div",Ye,[(0,s._)("div",qe,(0,a.zw)(e.name),1),(0,s._)("div",We,(0,a.zw)(e.desp),1)]),(0,s._)("div",Fe,(0,a.zw)(e.commentCount)+"comment",1)])))),128))])])]))}};const Ue=(0,u.Z)(Ke,[["__scopeId","data-v-e87f9eac"]]);var Ve=Ue;const Pe={class:"page_us"};var Be={setup(e){const t={name:"Inbound must see",image:v,followCount:23333,id:51664,desp:"Admin topic",articleCount:4,articles:new Array(4).fill(6).map(((e,t)=>({image:v,name:"how to login",desp:"Article description (usually the first paragraph of the article)",commentCount:t})))};return(e,o)=>((0,s.wg)(),(0,s.iD)("div",Pe,[(0,s.Wm)(Ve,{topic:t})]))}};const Ee=(0,u.Z)(Be,[["__scopeId","data-v-47f798e4"]]);var Me=Ee,Ne=o.p+"img/home.09e0db4a.svg",Te=o.p+"img/category.b7817485.svg",Re=o.p+"img/member.8c9f2878.svg",Ge=o.p+"img/about_us.54bd6565.svg",Je=o.p+"img/vip.f55ff043.svg";const Qe={class:"content"},Xe={class:"page_list"},$e=["onClick"],et=["src","alt"],tt={class:"page"};var ot={setup(e){const t=(0,m.iH)(X),o=[{name:"ForumHomePage",src:Ne,component:X},{name:"ForumClassification",src:Te,component:De},{name:"ForumMember",src:Re,component:fe},{name:"About",src:Ge,component:Me},{name:"AdminOnly",src:Je,component:De}],i=(0,m.iH)(o[0].name);function n(e){console.log("page",e),i.value=e.name,t.value=e.component}return(e,c)=>((0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(p),(0,s._)("div",Qe,[(0,s._)("div",Xe,[((0,s.wg)(),(0,s.iD)(s.HY,null,(0,s.Ko)(o,(e=>(0,s._)("div",{class:(0,a.C_)({item:!0,choosed:i.value===e.name}),key:e.name,onClick:t=>n(e)},[(0,s._)("img",{class:"icon",src:e.src,alt:e.name},null,8,et),(0,s.Uk)(" "+(0,a.zw)(e.name),1)],10,$e))),64))]),(0,s._)("div",tt,[((0,s.wg)(),(0,s.j4)((0,s.LL)(t.value)))])])],64))}};const it=ot;var st=it;(0,i.ri)(st).mount("#app")}},t={};function o(i){var s=t[i];if(void 0!==s)return s.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,o),a.exports}o.m=e,function(){var e=[];o.O=function(t,i,s,a){if(!i){var n=1/0;for(u=0;u<e.length;u++){i=e[u][0],s=e[u][1],a=e[u][2];for(var c=!0,l=0;l<i.length;l++)(!1&a||n>=a)&&Object.keys(o.O).every((function(e){return o.O[e](i[l])}))?i.splice(l--,1):(c=!1,a<n&&(n=a));if(c){e.splice(u--,1);var r=s();void 0!==r&&(t=r)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[i,s,a]}}(),function(){o.d=function(e,t){for(var i in t)o.o(t,i)&&!o.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.p=""}(),function(){var e={143:0};o.O.j=function(t){return 0===e[t]};var t=function(t,i){var s,a,n=i[0],c=i[1],l=i[2],r=0;if(n.some((function(t){return 0!==e[t]}))){for(s in c)o.o(c,s)&&(o.m[s]=c[s]);if(l)var u=l(o)}for(t&&t(i);r<n.length;r++)a=n[r],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return o.O(u)},i=self["webpackChunkbbs"]=self["webpackChunkbbs"]||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))}();var i=o.O(void 0,[998],(function(){return o(46)}));i=o.O(i)})();
//# sourceMappingURL=app.714b455b.js.map