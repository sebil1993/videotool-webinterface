import{u as d,o as i,c as u,w as r,a,b as e,H as c,g as _,t as f,k as p,d as t,n as w,e as g,f as b}from"./app.b757f23f.js";import{_ as y,a as k}from"./PrimaryButton.06ad600f.js";import{_ as x,a as h,b as V}from"./TextInput.85df116b.js";import"./ApplicationLogo.b5c20a21.js";const v=t("div",{class:"mb-4 text-sm text-gray-600"}," Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. ",-1),N={key:0,class:"mb-4 font-medium text-sm text-green-600"},$=["onSubmit"],B={class:"flex items-center justify-end mt-4"},F=b(" Email Password Reset Link "),j={__name:"ForgotPassword",props:{status:String},setup(o){const s=d({email:""}),m=()=>{s.post(route("password.email"))};return(S,l)=>(i(),u(y,null,{default:r(()=>[a(e(c),{title:"Forgot Password"}),v,o.status?(i(),_("div",N,f(o.status),1)):p("",!0),t("form",{onSubmit:g(m,["prevent"])},[t("div",null,[a(x,{for:"email",value:"Email"}),a(h,{id:"email",type:"email",class:"mt-1 block w-full",modelValue:e(s).email,"onUpdate:modelValue":l[0]||(l[0]=n=>e(s).email=n),required:"",autofocus:"",autocomplete:"username"},null,8,["modelValue"]),a(V,{class:"mt-2",message:e(s).errors.email},null,8,["message"])]),t("div",B,[a(k,{class:w({"opacity-25":e(s).processing}),disabled:e(s).processing},{default:r(()=>[F]),_:1},8,["class","disabled"])])],40,$)]),_:1}))}};export{j as default};
