"use strict";(self.webpackChunkthe_diabetes_calculator=self.webpackChunkthe_diabetes_calculator||[]).push([[812],{5295:(r,e,t)=>{t.d(e,{Z:()=>h});var a=t(7462),o=t(3366),n=t(7294),i=t(6010),s=t(4780),l=t(9602),c=t(6122),d=t(6501),u=t(4867);function f(r){return(0,u.Z)("MuiCard",r)}(0,t(1588).Z)("MuiCard",["root"]);var m=t(5893);const v=["className","raised"],b=(0,l.ZP)(d.Z,{name:"MuiCard",slot:"Root",overridesResolver:(r,e)=>e.root})((()=>({overflow:"hidden"}))),h=n.forwardRef((function(r,e){const t=(0,c.Z)({props:r,name:"MuiCard"}),{className:n,raised:l=!1}=t,d=(0,o.Z)(t,v),u=(0,a.Z)({},t,{raised:l}),h=(r=>{const{classes:e}=r;return(0,s.Z)({root:["root"]},f,e)})(u);return(0,m.jsx)(b,(0,a.Z)({className:(0,i.Z)(h.root,n),elevation:l?8:void 0,ref:e,ownerState:u},d))}))},2643:(r,e,t)=>{t.d(e,{Z:()=>b});var a=t(7462),o=t(3366),n=t(7294),i=t(6010),s=t(4780),l=t(9602),c=t(6122),d=t(4867);function u(r){return(0,d.Z)("MuiCardContent",r)}(0,t(1588).Z)("MuiCardContent",["root"]);var f=t(5893);const m=["className","component"],v=(0,l.ZP)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(r,e)=>e.root})((()=>({padding:16,"&:last-child":{paddingBottom:24}}))),b=n.forwardRef((function(r,e){const t=(0,c.Z)({props:r,name:"MuiCardContent"}),{className:n,component:l="div"}=t,d=(0,o.Z)(t,m),b=(0,a.Z)({},t,{component:l}),h=(r=>{const{classes:e}=r;return(0,s.Z)({root:["root"]},u,e)})(b);return(0,f.jsx)(v,(0,a.Z)({as:l,className:(0,i.Z)(h.root,n),ownerState:b,ref:e},d))}))},9062:(r,e,t)=>{t.d(e,{Z:()=>M});var a=t(3366),o=t(7462),n=t(7294),i=t(6010),s=t(4780),l=t(917),c=t(8216),d=t(6122),u=t(9602),f=t(4867);function m(r){return(0,f.Z)("MuiCircularProgress",r)}(0,t(1588).Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var v=t(5893);const b=["className","color","disableShrink","size","style","thickness","value","variant"];let h,p,Z,g,w=r=>r;const C=44,k=(0,l.F4)(h||(h=w`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),S=(0,l.F4)(p||(p=w`
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
`)),y=(0,u.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.root,e[t.variant],e[`color${(0,c.Z)(t.color)}`]]}})((({ownerState:r,theme:e})=>(0,o.Z)({display:"inline-block"},"determinate"===r.variant&&{transition:e.transitions.create("transform")},"inherit"!==r.color&&{color:(e.vars||e).palette[r.color].main})),(({ownerState:r})=>"indeterminate"===r.variant&&(0,l.iv)(Z||(Z=w`
      animation: ${0} 1.4s linear infinite;
    `),k))),x=(0,u.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,e)=>e.svg})({display:"block"}),P=(0,u.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.circle,e[`circle${(0,c.Z)(t.variant)}`],t.disableShrink&&e.circleDisableShrink]}})((({ownerState:r,theme:e})=>(0,o.Z)({stroke:"currentColor"},"determinate"===r.variant&&{transition:e.transitions.create("stroke-dashoffset")},"indeterminate"===r.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:r})=>"indeterminate"===r.variant&&!r.disableShrink&&(0,l.iv)(g||(g=w`
      animation: ${0} 1.4s ease-in-out infinite;
    `),S))),M=n.forwardRef((function(r,e){const t=(0,d.Z)({props:r,name:"MuiCircularProgress"}),{className:n,color:l="primary",disableShrink:u=!1,size:f=40,style:h,thickness:p=3.6,value:Z=0,variant:g="indeterminate"}=t,w=(0,a.Z)(t,b),k=(0,o.Z)({},t,{color:l,disableShrink:u,size:f,thickness:p,value:Z,variant:g}),S=(r=>{const{classes:e,variant:t,color:a,disableShrink:o}=r,n={root:["root",t,`color${(0,c.Z)(a)}`],svg:["svg"],circle:["circle",`circle${(0,c.Z)(t)}`,o&&"circleDisableShrink"]};return(0,s.Z)(n,m,e)})(k),M={},$={},R={};if("determinate"===g){const r=2*Math.PI*((C-p)/2);M.strokeDasharray=r.toFixed(3),R["aria-valuenow"]=Math.round(Z),M.strokeDashoffset=`${((100-Z)/100*r).toFixed(3)}px`,$.transform="rotate(-90deg)"}return(0,v.jsx)(y,(0,o.Z)({className:(0,i.Z)(S.root,n),style:(0,o.Z)({width:f,height:f},$,h),ownerState:k,ref:e,role:"progressbar"},R,w,{children:(0,v.jsx)(x,{className:S.svg,ownerState:k,viewBox:"22 22 44 44",children:(0,v.jsx)(P,{className:S.circle,style:M,ownerState:k,cx:C,cy:C,r:(C-p)/2,fill:"none",strokeWidth:p})})}))}))},9041:(r,e,t)=>{t.d(e,{Z:()=>D});var a=t(3366),o=t(7462),n=t(7294),i=t(6010),s=t(4780),l=t(917),c=t(1796),d=t(8216),u=t(2734),f=t(9602),m=t(6122),v=t(4867);function b(r){return(0,v.Z)("MuiLinearProgress",r)}(0,t(1588).Z)("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);var h=t(5893);const p=["className","color","value","valueBuffer","variant"];let Z,g,w,C,k,S,y=r=>r;const x=(0,l.F4)(Z||(Z=y`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`)),P=(0,l.F4)(g||(g=y`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`)),M=(0,l.F4)(w||(w=y`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`)),$=(r,e)=>"inherit"===e?"currentColor":"light"===r.palette.mode?(0,c.$n)(r.palette[e].main,.62):(0,c._j)(r.palette[e].main,.5),R=(0,f.ZP)("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.root,e[`color${(0,d.Z)(t.color)}`],e[t.variant]]}})((({ownerState:r,theme:e})=>(0,o.Z)({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:$(e,r.color)},"inherit"===r.color&&"buffer"!==r.variant&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},"buffer"===r.variant&&{backgroundColor:"transparent"},"query"===r.variant&&{transform:"rotate(180deg)"}))),N=(0,f.ZP)("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.dashed,e[`dashedColor${(0,d.Z)(t.color)}`]]}})((({ownerState:r,theme:e})=>{const t=$(e,r.color);return(0,o.Z)({position:"absolute",marginTop:0,height:"100%",width:"100%"},"inherit"===r.color&&{opacity:.3},{backgroundImage:`radial-gradient(${t} 0%, ${t} 16%, transparent 42%)`,backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})}),(0,l.iv)(C||(C=y`
    animation: ${0} 3s infinite linear;
  `),M)),B=(0,f.ZP)("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.bar,e[`barColor${(0,d.Z)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar1Indeterminate,"determinate"===t.variant&&e.bar1Determinate,"buffer"===t.variant&&e.bar1Buffer]}})((({ownerState:r,theme:e})=>(0,o.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:"inherit"===r.color?"currentColor":e.palette[r.color].main},"determinate"===r.variant&&{transition:"transform .4s linear"},"buffer"===r.variant&&{zIndex:1,transition:"transform .4s linear"})),(({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&(0,l.iv)(k||(k=y`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `),x))),z=(0,f.ZP)("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.bar,e[`barColor${(0,d.Z)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar2Indeterminate,"buffer"===t.variant&&e.bar2Buffer]}})((({ownerState:r,theme:e})=>(0,o.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},"buffer"!==r.variant&&{backgroundColor:"inherit"===r.color?"currentColor":e.palette[r.color].main},"inherit"===r.color&&{opacity:.3},"buffer"===r.variant&&{backgroundColor:$(e,r.color),transition:"transform .4s linear"})),(({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&(0,l.iv)(S||(S=y`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `),P))),D=n.forwardRef((function(r,e){const t=(0,m.Z)({props:r,name:"MuiLinearProgress"}),{className:n,color:l="primary",value:c,valueBuffer:f,variant:v="indeterminate"}=t,Z=(0,a.Z)(t,p),g=(0,o.Z)({},t,{color:l,variant:v}),w=(r=>{const{classes:e,variant:t,color:a}=r,o={root:["root",`color${(0,d.Z)(a)}`,t],dashed:["dashed",`dashedColor${(0,d.Z)(a)}`],bar1:["bar",`barColor${(0,d.Z)(a)}`,("indeterminate"===t||"query"===t)&&"bar1Indeterminate","determinate"===t&&"bar1Determinate","buffer"===t&&"bar1Buffer"],bar2:["bar","buffer"!==t&&`barColor${(0,d.Z)(a)}`,"buffer"===t&&`color${(0,d.Z)(a)}`,("indeterminate"===t||"query"===t)&&"bar2Indeterminate","buffer"===t&&"bar2Buffer"]};return(0,s.Z)(o,b,e)})(g),C=(0,u.Z)(),k={},S={bar1:{},bar2:{}};if("determinate"===v||"buffer"===v)if(void 0!==c){k["aria-valuenow"]=Math.round(c),k["aria-valuemin"]=0,k["aria-valuemax"]=100;let r=c-100;"rtl"===C.direction&&(r=-r),S.bar1.transform=`translateX(${r}%)`}else 0;if("buffer"===v)if(void 0!==f){let r=(f||0)-100;"rtl"===C.direction&&(r=-r),S.bar2.transform=`translateX(${r}%)`}else 0;return(0,h.jsxs)(R,(0,o.Z)({className:(0,i.Z)(w.root,n),ownerState:g,role:"progressbar"},k,{ref:e},Z,{children:["buffer"===v?(0,h.jsx)(N,{className:w.dashed,ownerState:g}):null,(0,h.jsx)(B,{className:w.bar1,ownerState:g,style:S.bar1}),"determinate"===v?null:(0,h.jsx)(z,{className:w.bar2,ownerState:g,style:S.bar2})]}))}))},9583:(r,e,t)=>{t.d(e,{xc8:()=>o});var a=t(4405);function o(r){return(0,a.w_)({tag:"svg",attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M288 0C108 0 0 93.4 0 169.14 0 199.44 24.24 224 64 224v256c0 17.67 16.12 32 36 32h376c19.88 0 36-14.33 36-32V224c39.76 0 64-24.56 64-54.86C576 93.4 468 0 288 0z"}}]})(r)}},2585:(r,e,t)=>{t.d(e,{GRs:()=>o});var a=t(4405);function o(r){return(0,a.w_)({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M450.3 27.12c2.6 4.38 4.4 9.37 5.5 14.66 1.3 6.78 1.7 14.22 1.3 22.26 4.3 8.78 7.7 19.3 10 31.35 5.3 28.01 4.6 63.51-3.1 101.51-15.4 76-58.6 161.6-133.4 219.4-52 40.2-101.7 53.4-150.3 50.2-24.3-1.6-48.5-7.5-72.5-16.4-9.9 1.3-19.58 1.9-28.79 1.6-5.37-.1-10.61-.6-15.68-1.3 37.27 18.4 75.87 31.3 115.77 34 52.8 3.5 107.5-11.4 162.5-53.9 79-61 123.8-150.2 140-230 8.1-39.9 9.1-77.5 3.2-108.44-5.4-28.25-16.5-51.53-34.5-64.94zm-31.4 2.53c-2 0-4.3.17-6.7.48-9.8 1.22-22.5 4.46-37.2 9.48-29.2 10.03-66 27.07-104.1 48.34C194.7 130.5 113.1 190.4 73.42 243.6c-16.94 22.7-34.31 59.9-43.35 94.6-4.52 17.4-6.98 34.2-6.61 48.1.37 13.8 3.65 24.3 8.97 30.3 9.75 11 25.89 16.6 47.06 17.1 21.21.6 46.81-4 73.11-12.3 52.6-16.5 108.2-47.5 139.9-76.6 41.2-37.9 87.7-111.5 116.9-178.7 14.6-33.5 24.9-65.6 28.4-90.34 1.8-12.35 1.8-22.84.3-30.4-1.5-7.55-4.2-11.71-7.9-14.01-1.3-.83-5.3-1.8-11.3-1.7zM221.7 199.8c27.7 0 50.5 9.8 59.4 20.2 52.3 60.7-154 202.2-191.95 154.5-15.79-19.8-2.3-96.6 54.05-144.7 25.9-22.1 54.1-29.9 78.5-30z"}}]})(r)}}}]);