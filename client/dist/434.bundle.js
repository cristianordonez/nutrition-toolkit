"use strict";(self.webpackChunkthe_diabetes_calculator=self.webpackChunkthe_diabetes_calculator||[]).push([[434],{724:(r,e,t)=>{var a=t(5318);e.Z=void 0;var o=a(t(4938)),n=t(5893),i=(0,o.default)((0,n.jsx)("path",{d:"M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"}),"ArrowBackIos");e.Z=i},9062:(r,e,t)=>{t.d(e,{Z:()=>$});var a=t(3366),o=t(7462),n=t(7294),i=t(6010),s=t(4780),l=t(917),c=t(8216),d=t(6122),p=t(9602),u=t(5677);function f(r){return(0,u.Z)("MuiCircularProgress",r)}(0,t(1588).Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var m=t(5893);const h=["className","color","disableShrink","size","style","thickness","value","variant"];let v,b,Z,g,k=r=>r;const w=44,x=(0,l.F4)(v||(v=k`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),S=(0,l.F4)(b||(b=k`
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
`)),y=(0,p.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.root,e[t.variant],e[`color${(0,c.Z)(t.color)}`]]}})((({ownerState:r,theme:e})=>(0,o.Z)({display:"inline-block"},"determinate"===r.variant&&{transition:e.transitions.create("transform")},"inherit"!==r.color&&{color:(e.vars||e).palette[r.color].main})),(({ownerState:r})=>"indeterminate"===r.variant&&(0,l.iv)(Z||(Z=k`
      animation: ${0} 1.4s linear infinite;
    `),x))),P=(0,p.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,e)=>e.svg})({display:"block"}),C=(0,p.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.circle,e[`circle${(0,c.Z)(t.variant)}`],t.disableShrink&&e.circleDisableShrink]}})((({ownerState:r,theme:e})=>(0,o.Z)({stroke:"currentColor"},"determinate"===r.variant&&{transition:e.transitions.create("stroke-dashoffset")},"indeterminate"===r.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})),(({ownerState:r})=>"indeterminate"===r.variant&&!r.disableShrink&&(0,l.iv)(g||(g=k`
      animation: ${0} 1.4s ease-in-out infinite;
    `),S))),$=n.forwardRef((function(r,e){const t=(0,d.Z)({props:r,name:"MuiCircularProgress"}),{className:n,color:l="primary",disableShrink:p=!1,size:u=40,style:v,thickness:b=3.6,value:Z=0,variant:g="indeterminate"}=t,k=(0,a.Z)(t,h),x=(0,o.Z)({},t,{color:l,disableShrink:p,size:u,thickness:b,value:Z,variant:g}),S=(r=>{const{classes:e,variant:t,color:a,disableShrink:o}=r,n={root:["root",t,`color${(0,c.Z)(a)}`],svg:["svg"],circle:["circle",`circle${(0,c.Z)(t)}`,o&&"circleDisableShrink"]};return(0,s.Z)(n,f,e)})(x),$={},D={},M={};if("determinate"===g){const r=2*Math.PI*((w-b)/2);$.strokeDasharray=r.toFixed(3),M["aria-valuenow"]=Math.round(Z),$.strokeDashoffset=`${((100-Z)/100*r).toFixed(3)}px`,D.transform="rotate(-90deg)"}return(0,m.jsx)(y,(0,o.Z)({className:(0,i.Z)(S.root,n),style:(0,o.Z)({width:u,height:u},D,v),ownerState:x,ref:e,role:"progressbar"},M,k,{children:(0,m.jsx)(P,{className:S.svg,ownerState:x,viewBox:"22 22 44 44",children:(0,m.jsx)(C,{className:S.circle,style:$,ownerState:x,cx:w,cy:w,r:(w-b)/2,fill:"none",strokeWidth:b})})}))}))},7049:(r,e,t)=>{t.d(e,{ZP:()=>P});var a=t(3366),o=t(7462),n=t(7294),i=t(6010),s=t(4780),l=t(7794),c=t(4776),d=t(6501),p=t(8216),u=t(2734),f=t(6122),m=t(9602),h=t(5677);function v(r){return(0,h.Z)("MuiDrawer",r)}(0,t(1588).Z)("MuiDrawer",["root","docked","paper","paperAnchorLeft","paperAnchorRight","paperAnchorTop","paperAnchorBottom","paperAnchorDockedLeft","paperAnchorDockedRight","paperAnchorDockedTop","paperAnchorDockedBottom","modal"]);var b=t(5893);const Z=["BackdropProps"],g=["anchor","BackdropProps","children","className","elevation","hideBackdrop","ModalProps","onClose","open","PaperProps","SlideProps","TransitionComponent","transitionDuration","variant"],k=(r,e)=>{const{ownerState:t}=r;return[e.root,("permanent"===t.variant||"persistent"===t.variant)&&e.docked,e.modal]},w=(0,m.ZP)(l.Z,{name:"MuiDrawer",slot:"Root",overridesResolver:k})((({theme:r})=>({zIndex:(r.vars||r).zIndex.drawer}))),x=(0,m.ZP)("div",{shouldForwardProp:m.FO,name:"MuiDrawer",slot:"Docked",skipVariantsResolver:!1,overridesResolver:k})({flex:"0 0 auto"}),S=(0,m.ZP)(d.Z,{name:"MuiDrawer",slot:"Paper",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.paper,e[`paperAnchor${(0,p.Z)(t.anchor)}`],"temporary"!==t.variant&&e[`paperAnchorDocked${(0,p.Z)(t.anchor)}`]]}})((({theme:r,ownerState:e})=>(0,o.Z)({overflowY:"auto",display:"flex",flexDirection:"column",height:"100%",flex:"1 0 auto",zIndex:(r.vars||r).zIndex.drawer,WebkitOverflowScrolling:"touch",position:"fixed",top:0,outline:0},"left"===e.anchor&&{left:0},"top"===e.anchor&&{top:0,left:0,right:0,height:"auto",maxHeight:"100%"},"right"===e.anchor&&{right:0},"bottom"===e.anchor&&{top:"auto",left:0,bottom:0,right:0,height:"auto",maxHeight:"100%"},"left"===e.anchor&&"temporary"!==e.variant&&{borderRight:`1px solid ${(r.vars||r).palette.divider}`},"top"===e.anchor&&"temporary"!==e.variant&&{borderBottom:`1px solid ${(r.vars||r).palette.divider}`},"right"===e.anchor&&"temporary"!==e.variant&&{borderLeft:`1px solid ${(r.vars||r).palette.divider}`},"bottom"===e.anchor&&"temporary"!==e.variant&&{borderTop:`1px solid ${(r.vars||r).palette.divider}`}))),y={left:"right",right:"left",top:"down",bottom:"up"};const P=n.forwardRef((function(r,e){const t=(0,f.Z)({props:r,name:"MuiDrawer"}),l=(0,u.Z)(),d={enter:l.transitions.duration.enteringScreen,exit:l.transitions.duration.leavingScreen},{anchor:m="left",BackdropProps:h,children:k,className:P,elevation:C=16,hideBackdrop:$=!1,ModalProps:{BackdropProps:D}={},onClose:M,open:B=!1,PaperProps:R={},SlideProps:N,TransitionComponent:I=c.Z,transitionDuration:j=d,variant:A="temporary"}=t,z=(0,a.Z)(t.ModalProps,Z),L=(0,a.Z)(t,g),q=n.useRef(!1);n.useEffect((()=>{q.current=!0}),[]);const F=function(r,e){return"rtl"===r.direction&&function(r){return-1!==["left","right"].indexOf(r)}(e)?y[e]:e}(l,m),T=m,O=(0,o.Z)({},t,{anchor:T,elevation:C,open:B,variant:A},L),_=(r=>{const{classes:e,anchor:t,variant:a}=r,o={root:["root"],docked:[("permanent"===a||"persistent"===a)&&"docked"],modal:["modal"],paper:["paper",`paperAnchor${(0,p.Z)(t)}`,"temporary"!==a&&`paperAnchorDocked${(0,p.Z)(t)}`]};return(0,s.Z)(o,v,e)})(O),H=(0,b.jsx)(S,(0,o.Z)({elevation:"temporary"===A?C:0,square:!0},R,{className:(0,i.Z)(_.paper,R.className),ownerState:O,children:k}));if("permanent"===A)return(0,b.jsx)(x,(0,o.Z)({className:(0,i.Z)(_.root,_.docked,P),ownerState:O,ref:e},L,{children:H}));const W=(0,b.jsx)(I,(0,o.Z)({in:B,direction:y[F],timeout:j,appear:q.current},N,{children:H}));return"persistent"===A?(0,b.jsx)(x,(0,o.Z)({className:(0,i.Z)(_.root,_.docked,P),ownerState:O,ref:e},L,{children:W})):(0,b.jsx)(w,(0,o.Z)({BackdropProps:(0,o.Z)({},h,D,{transitionDuration:j}),className:(0,i.Z)(_.root,_.modal,P),open:B,ownerState:O,onClose:M,hideBackdrop:$,ref:e},L,z,{children:W}))}))},9041:(r,e,t)=>{t.d(e,{Z:()=>I});var a=t(3366),o=t(7462),n=t(7294),i=t(6010),s=t(4780),l=t(917),c=t(1796),d=t(8216),p=t(2734),u=t(9602),f=t(6122),m=t(5677);function h(r){return(0,m.Z)("MuiLinearProgress",r)}(0,t(1588).Z)("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);var v=t(5893);const b=["className","color","value","valueBuffer","variant"];let Z,g,k,w,x,S,y=r=>r;const P=(0,l.F4)(Z||(Z=y`
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
`)),C=(0,l.F4)(g||(g=y`
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
`)),$=(0,l.F4)(k||(k=y`
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
`)),D=(r,e)=>"inherit"===e?"currentColor":"light"===r.palette.mode?(0,c.$n)(r.palette[e].main,.62):(0,c._j)(r.palette[e].main,.5),M=(0,u.ZP)("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.root,e[`color${(0,d.Z)(t.color)}`],e[t.variant]]}})((({ownerState:r,theme:e})=>(0,o.Z)({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},backgroundColor:D(e,r.color)},"inherit"===r.color&&"buffer"!==r.variant&&{backgroundColor:"none","&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}},"buffer"===r.variant&&{backgroundColor:"transparent"},"query"===r.variant&&{transform:"rotate(180deg)"}))),B=(0,u.ZP)("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.dashed,e[`dashedColor${(0,d.Z)(t.color)}`]]}})((({ownerState:r,theme:e})=>{const t=D(e,r.color);return(0,o.Z)({position:"absolute",marginTop:0,height:"100%",width:"100%"},"inherit"===r.color&&{opacity:.3},{backgroundImage:`radial-gradient(${t} 0%, ${t} 16%, transparent 42%)`,backgroundSize:"10px 10px",backgroundPosition:"0 -23px"})}),(0,l.iv)(w||(w=y`
    animation: ${0} 3s infinite linear;
  `),$)),R=(0,u.ZP)("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.bar,e[`barColor${(0,d.Z)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar1Indeterminate,"determinate"===t.variant&&e.bar1Determinate,"buffer"===t.variant&&e.bar1Buffer]}})((({ownerState:r,theme:e})=>(0,o.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",backgroundColor:"inherit"===r.color?"currentColor":e.palette[r.color].main},"determinate"===r.variant&&{transition:"transform .4s linear"},"buffer"===r.variant&&{zIndex:1,transition:"transform .4s linear"})),(({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&(0,l.iv)(x||(x=y`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    `),P))),N=(0,u.ZP)("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(r,e)=>{const{ownerState:t}=r;return[e.bar,e[`barColor${(0,d.Z)(t.color)}`],("indeterminate"===t.variant||"query"===t.variant)&&e.bar2Indeterminate,"buffer"===t.variant&&e.bar2Buffer]}})((({ownerState:r,theme:e})=>(0,o.Z)({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},"buffer"!==r.variant&&{backgroundColor:"inherit"===r.color?"currentColor":e.palette[r.color].main},"inherit"===r.color&&{opacity:.3},"buffer"===r.variant&&{backgroundColor:D(e,r.color),transition:"transform .4s linear"})),(({ownerState:r})=>("indeterminate"===r.variant||"query"===r.variant)&&(0,l.iv)(S||(S=y`
      width: auto;
      animation: ${0} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
    `),C))),I=n.forwardRef((function(r,e){const t=(0,f.Z)({props:r,name:"MuiLinearProgress"}),{className:n,color:l="primary",value:c,valueBuffer:u,variant:m="indeterminate"}=t,Z=(0,a.Z)(t,b),g=(0,o.Z)({},t,{color:l,variant:m}),k=(r=>{const{classes:e,variant:t,color:a}=r,o={root:["root",`color${(0,d.Z)(a)}`,t],dashed:["dashed",`dashedColor${(0,d.Z)(a)}`],bar1:["bar",`barColor${(0,d.Z)(a)}`,("indeterminate"===t||"query"===t)&&"bar1Indeterminate","determinate"===t&&"bar1Determinate","buffer"===t&&"bar1Buffer"],bar2:["bar","buffer"!==t&&`barColor${(0,d.Z)(a)}`,"buffer"===t&&`color${(0,d.Z)(a)}`,("indeterminate"===t||"query"===t)&&"bar2Indeterminate","buffer"===t&&"bar2Buffer"]};return(0,s.Z)(o,h,e)})(g),w=(0,p.Z)(),x={},S={bar1:{},bar2:{}};if("determinate"===m||"buffer"===m)if(void 0!==c){x["aria-valuenow"]=Math.round(c),x["aria-valuemin"]=0,x["aria-valuemax"]=100;let r=c-100;"rtl"===w.direction&&(r=-r),S.bar1.transform=`translateX(${r}%)`}else 0;if("buffer"===m)if(void 0!==u){let r=(u||0)-100;"rtl"===w.direction&&(r=-r),S.bar2.transform=`translateX(${r}%)`}else 0;return(0,v.jsxs)(M,(0,o.Z)({className:(0,i.Z)(k.root,n),ownerState:g,role:"progressbar"},x,{ref:e},Z,{children:["buffer"===m?(0,v.jsx)(B,{className:k.dashed,ownerState:g}):null,(0,v.jsx)(R,{className:k.bar1,ownerState:g,style:S.bar1}),"determinate"===m?null:(0,v.jsx)(N,{className:k.bar2,ownerState:g,style:S.bar2})]}))}))}}]);