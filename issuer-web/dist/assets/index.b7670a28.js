import{_,a as f}from"./index.39131854.js";import{g as I}from"./getAssetsFile.a139323f.js";import{a as l,a3 as x,an as y,o as n,b as o,e as t,F as h,ad as k,P as C,_ as E,u as c,Y as L,Z as V,T as r,X as m,aB as d}from"./vue.dd6c0a93.js";const B={class:"personal"},A={class:"personal-main"},N={class:"personal-nav"},P=["onClick"],T={class:"main-body"},D=l({name:"personalIndex"}),R=l({...D,setup(b){const v=d(()=>_(()=>import("./informat.73eda24c.js"),["assets/informat.73eda24c.js","assets/index.39131854.js","assets/vue.dd6c0a93.js","assets/index.4d4fe88d.css","assets/getAssetsFile.a139323f.js","assets/informat.94fc8925.css"])),p=d(()=>_(()=>import("./enterprise.93be92ee.js"),["assets/enterprise.93be92ee.js","assets/index.39131854.js","assets/vue.dd6c0a93.js","assets/index.4d4fe88d.css","assets/getAssetsFile.a139323f.js","assets/enterprise.06672883.css"])),e=x({navList:[{name:"基本信息",icon:"icon-staic.svg"},{name:"企业认证",icon:"icon-set.svg"},{name:"诊断评估",icon:"icon-staic.svg"},{name:"项目管理",icon:"icon-set.svg"},{name:"需求管理",icon:"icon-set.svg"},{name:"标杆案例",icon:"icon-staic.svg"},{name:"问卷调研",icon:"icon-set.svg"},{name:"评价中心",icon:"icon-staic.svg"}],activeIndex:0}),u=s=>{s>1||(e.activeIndex=s)};return(s,z)=>{const g=y("svgIcon");return n(),o("div",B,[t("div",A,[t("ul",N,[(n(!0),o(h,null,k(e.navList,(i,a)=>(n(),o("li",{key:a,onClick:F=>u(a),class:C({active:a===e.activeIndex})},[E(g,{size:24,style:{"margin-right":"4px"},name:c(I)(`icon/${i.icon}`)},null,8,["name"]),L(V(i.name),1)],10,P))),128))]),t("div",T,[e.activeIndex===0?(n(),r(c(v),{key:0})):m("",!0),e.activeIndex===1?(n(),r(c(p),{key:1})):m("",!0)])])])}}});const S=f(R,[["__scopeId","data-v-aa29a72c"]]);export{S as default};