import{F as y}from"./index-itkDzUCr.js";import{_ as C,r as l,j as I,u as S,o as t,c,a as s,d as h,w as B,e as u,F as v,f as V,m as $,t as m,p as j,i as F}from"./index-EgUD6bev.js";import{I as L}from"./IconBack-kSM-6Ncb.js";import{_ as D}from"./PlayView-NlCHjNjL.js";import"./_commonjsHelpers-5-cIlDoe.js";const f=n=>(j("data-v-539ae4dc"),n=n(),F(),n),N={"data-theme":"cupcake",class:"detail"},z={class:"navbar bg-base-100 shadow-sm"},A={class:"navbar-start"},E=f(()=>s("div",{class:"navbar-center"},[s("h1",{class:"text-xl"},"停车场监控")],-1)),O=f(()=>s("div",{class:"navbar-end"},null,-1)),P={key:0,class:"center-box"},R={key:0,class:"loading loading-spinner loading-lg"},q={class:"flex justify-center p-5"},G={class:"grid card-compact grid-flow-row-dense grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"},H=["src"],J={class:"card-body"},K={class:"card-title text-sm"},M={class:"text-xs"},Q={class:"card-actions justify-center"},T=["onClick"],U={__name:"CameraList",setup(n){const r=l(!1),g=I(),_=l(),i=l(!0),k=S(),p=l();function b(){k.go(-1)}const x=async e=>{p.value=e,r.value=!0};function w(){r.value=!1}return(async()=>{const e=g.state.userInfo,d=e?e.token:null,o=await(await fetch("http://localhost:9000/getVideos?parking_lot_id=1",{headers:d?{Authorization:`${d}`}:{}})).json();o.code===0?_.value=o.data:alert(o.message),i.value=!1})(),(e,d)=>(t(),c(v,null,[s("div",N,[h(y,null,{default:B(()=>[s("div",z,[s("div",A,[s("button",{class:"btn btn-ghost",onClick:b},[h(L,{class:"size-5"})])]),E,O])]),_:1}),i.value?(t(),c("div",P,[i.value?(t(),c("span",R)):u("",!0)])):u("",!0),s("div",q,[s("div",G,[(t(!0),c(v,null,V(_.value,(a,o)=>(t(),c("div",{key:o,class:"card w-full shadow-xl"},[s("figure",null,[s("img",{src:a.picture_url,alt:"Shoes"},null,8,H)]),s("div",J,[s("h2",K,m(a.title),1),s("p",M,m(a.updatedAt),1),s("div",Q,[s("button",{class:"btn btn-block btn-primary",onClick:X=>x(a)}," 查看 ",8,T)])])]))),128))])])]),r.value?(t(),$(D,{key:0,onClose:w,item:p.value},null,8,["item"])):u("",!0)],64))}},as=C(U,[["__scopeId","data-v-539ae4dc"]]);export{as as default};
