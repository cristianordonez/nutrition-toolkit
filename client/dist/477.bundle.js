"use strict";(self.webpackChunkthe_macro_trainer=self.webpackChunkthe_macro_trainer||[]).push([[477],{3147:(r,e,t)=>{var a=t(4836);e.Z=void 0;var i=a(t(4938)),s=t(5893),o=(0,i.default)((0,s.jsx)("path",{d:"M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"}),"CalendarMonth");e.Z=o},5705:(r,e,t)=>{t.d(e,{Z:()=>M});var a=t(3366),i=t(7462),s=t(7294),o=t(6010),n=t(4780),c=t(917),l=t(6622),h=t(1468),v=t(4174),d=t(5677);function m(r){return(0,d.Z)("MuiCircularProgress",r)}(0,t(1588).Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var k=t(5893);const u=["className","color","disableShrink","size","style","thickness","value","variant"];let f,p,Z,S,x=r=>r;const g=44,w=(0,c.F4)(f||(f=x`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),y=(0,c.F4)(p||(p=x`
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
`)),b=(0,v.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.root,e[t.variant],e[`color${(0,l.Z)(t.color)}`]]}})((({ownerState:r,theme:e})=>(0,i.Z)({display:"inline-block"},"determinate"===r.variant&&{transition:e.transitions.create("transform")},"inherit"!==r.color&&{color:(e.vars||e).palette[r.color].main})),(({ownerState:r})=>"indeterminate"===r.variant&&(0,c.iv)(Z||(Z=x`
      animation: ${0} 1.4s linear infinite;
    `),w))),z=(0,v.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,e)=>e.svg})({display:"block"}),C=(0,v.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.circle,e[`circle${(0,l.Z)(t.variant)}`],t.disableShrink&&e.circleDisableShrink]}})((({ownerState:r,theme:e})=>(0,i.Z)({stroke:"currentColor"},"determinate"===r.variant&&{transition:e.transitions.create("stroke-dashoffset")},"indeterminate"===r.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:r})=>"indeterminate"===r.variant&&!r.disableShrink&&(0,c.iv)(S||(S=x`
      animation: ${0} 1.4s ease-in-out infinite;
    `),y))),M=s.forwardRef((function(r,e){const t=(0,h.Z)({props:r,name:"MuiCircularProgress"}),{className:s,color:c="primary",disableShrink:v=!1,size:d=40,style:f,thickness:p=3.6,value:Z=0,variant:S="indeterminate"}=t,x=(0,a.Z)(t,u),w=(0,i.Z)({},t,{color:c,disableShrink:v,size:d,thickness:p,value:Z,variant:S}),y=(r=>{const{classes:e,variant:t,color:a,disableShrink:i}=r,s={root:["root",t,`color${(0,l.Z)(a)}`],svg:["svg"],circle:["circle",`circle${(0,l.Z)(t)}`,i&&"circleDisableShrink"]};return(0,n.Z)(s,m,e)})(w),M={},P={},D={};if("determinate"===S){const r=2*Math.PI*((g-p)/2);M.strokeDasharray=r.toFixed(3),D["aria-valuenow"]=Math.round(Z),M.strokeDashoffset=`${((100-Z)/100*r).toFixed(3)}px`,P.transform="rotate(-90deg)"}return(0,k.jsx)(b,(0,i.Z)({className:(0,o.Z)(y.root,s),style:(0,i.Z)({width:d,height:d},P,f),ownerState:w,ref:e,role:"progressbar"},D,x,{children:(0,k.jsx)(z,{className:y.svg,ownerState:w,viewBox:"22 22 44 44",children:(0,k.jsx)(C,{className:y.circle,style:M,ownerState:w,cx:g,cy:g,r:(g-p)/2,fill:"none",strokeWidth:p})})}))}))}}]);