"use strict";(self.webpackChunkthe_macro_trainer=self.webpackChunkthe_macro_trainer||[]).push([[313],{5705:(e,r,t)=>{t.d(r,{Z:()=>P});var a=t(3366),s=t(7462),o=t(7294),i=t(6010),n=t(4780),l=t(917),c=t(6622),d=t(1468),h=t(4174),u=t(5677);function m(e){return(0,u.Z)("MuiCircularProgress",e)}(0,t(1588).Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var v=t(5893);const f=["className","color","disableShrink","size","style","thickness","value","variant"];let k,p,g,S,Z=e=>e;const x=44,b=(0,l.F4)(k||(k=Z`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),w=(0,l.F4)(p||(p=Z`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),y=(0,h.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.root,r[t.variant],r[`color${(0,c.Z)(t.color)}`]]}})((({ownerState:e,theme:r})=>(0,s.Z)({display:"inline-block"},"determinate"===e.variant&&{transition:r.transitions.create("transform")},"inherit"!==e.color&&{color:(r.vars||r).palette[e.color].main})),(({ownerState:e})=>"indeterminate"===e.variant&&(0,l.iv)(g||(g=Z`
      animation: ${0} 1.4s linear infinite;
    `),b))),M=(0,h.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,r)=>r.svg})({display:"block"}),C=(0,h.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,r)=>{const{ownerState:t}=e;return[r.circle,r[`circle${(0,c.Z)(t.variant)}`],t.disableShrink&&r.circleDisableShrink]}})((({ownerState:e,theme:r})=>(0,s.Z)({stroke:"currentColor"},"determinate"===e.variant&&{transition:r.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:e})=>"indeterminate"===e.variant&&!e.disableShrink&&(0,l.iv)(S||(S=Z`
      animation: ${0} 1.4s ease-in-out infinite;
    `),w))),P=o.forwardRef((function(e,r){const t=(0,d.Z)({props:e,name:"MuiCircularProgress"}),{className:o,color:l="primary",disableShrink:h=!1,size:u=40,style:k,thickness:p=3.6,value:g=0,variant:S="indeterminate"}=t,Z=(0,a.Z)(t,f),b=(0,s.Z)({},t,{color:l,disableShrink:h,size:u,thickness:p,value:g,variant:S}),w=(e=>{const{classes:r,variant:t,color:a,disableShrink:s}=e,o={root:["root",t,`color${(0,c.Z)(a)}`],svg:["svg"],circle:["circle",`circle${(0,c.Z)(t)}`,s&&"circleDisableShrink"]};return(0,n.Z)(o,m,r)})(b),P={},D={},R={};if("determinate"===S){const e=2*Math.PI*((x-p)/2);P.strokeDasharray=e.toFixed(3),R["aria-valuenow"]=Math.round(g),P.strokeDashoffset=`${((100-g)/100*e).toFixed(3)}px`,D.transform="rotate(-90deg)"}return(0,v.jsx)(y,(0,s.Z)({className:(0,i.Z)(w.root,o),style:(0,s.Z)({width:u,height:u},D,k),ownerState:b,ref:r,role:"progressbar"},R,Z,{children:(0,v.jsx)(M,{className:w.svg,ownerState:b,viewBox:"22 22 44 44",children:(0,v.jsx)(C,{className:w.circle,style:P,ownerState:b,cx:x,cy:x,r:(x-p)/2,fill:"none",strokeWidth:p})})}))}))},9100:(e,r,t)=>{t.d(r,{C:()=>s});var a=t(9250),s=function(){return(0,a.bx)()}},7981:(e,r,t)=>{t.r(r),t.d(r,{default:()=>d});var a=t(9144),s=t(5705),o=t(9669),i=t.n(o),n=t(7294),l=t(2104),c=t(9100);const d=function(){var e=(0,c.C)(),r=e.setAlertSeverity,t=e.setAlertMessage,o=e.setOpenAlert,d=e.searchResults,h=e.isLoading,u=e.handleLoadMore,m=e.showLoadMoreBtn,v=e.setSearchResults;return(0,n.useEffect)((function(){i().get("/api/food/sample").then((function(e){v(e.data)}))}),[]),n.createElement("div",{className:"search-page"},d.length>0?n.createElement(l.B,{handleLoadMore:u,searchResults:d,setOpenSnackbar:o,setAlertMessage:t,setAlertSeverity:r,showLoadMoreBtn:m,enableAddToFoodLogFeature:!1}):null,h?n.createElement(a.Z,{alignItems:"center"},n.createElement(s.Z,{size:100})):null)}}}]);