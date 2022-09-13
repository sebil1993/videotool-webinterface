import{o as d,c as n,a as e,r as w,b as v,d as h,w as m,v as _,e as C,t as f,f as p,g as b,h as M,F as $,i as k}from"./app.4cd0d737.js";const c=(a,s)=>{const l=a.__vccOpts||a;for(const[i,t]of s)l[i]=t;return l},V={name:"Overlay",props:{isVisible:{type:Boolean,default:!1}}},j={key:0,class:"fixed z-20 inset-0 bg-black bg-opacity-50 bg-scroll h-full flex items-center justify-center"},A={class:"relative w-fit max-h-full overflow-y-auto bg-gray-100 shadow-lg rounded-lg border border-black"},U={class:"px-3 pt-3 flex flex-col justify-between"};function B(a,s,l,i,t,r){return l.isVisible?(d(),n("div",j,[e("div",A,[e("div",U,[w(a.$slots,"default")])])])):v("",!0)}const N=c(V,[["render",B]]),O={name:"CameraModal",data(){return{ip_address:"",username:"",password:""}},methods:{initCamera(){this.ip_address!=""&&this.username!=""&&this.password!=""?h.post("cameras/init",{ip_address:this.ip_address,username:this.username,password:this.password}).then(a=>{a.data[1]=="camera found"&&(alert("camera already exists"),this.ip_address="",this.username="",this.password="",this.closeModal())}):alert("fields are empty")},closeModal(){this.$emit("closeModal")}}},E={class:"min-w-fit"},I=e("h1",{class:"text-center mb-2 text-lg"},[C(" Input for Camera "),e("hr")],-1),P={class:""},Q={class:"flex justify-between"},S=e("label",{class:"my-auto mr-2",for:"ip_address"},"IP-Address:",-1),T={class:"flex justify-between"},q=e("label",{class:"my-auto mr-2",for:"username"},"Username:",-1),D={class:"flex justify-between"},F=e("label",{class:"my-auto","mr-2":"",for:"password"},"Password:",-1),W={class:"my-2 flex justify-between"},z=e("div",{class:"grow"},null,-1);function L(a,s,l,i,t,r){return d(),n("div",E,[I,e("div",P,[e("div",Q,[S,m(e("input",{"onUpdate:modelValue":s[0]||(s[0]=o=>t.ip_address=o),id:"ip_address",class:"border border-gray-400 p-px m-px rounded",type:"text"},null,512),[[_,t.ip_address]])]),e("div",T,[q,m(e("input",{"onUpdate:modelValue":s[1]||(s[1]=o=>t.username=o),id:"username",class:"border border-gray-400 p-px m-px rounded",type:"text"},null,512),[[_,t.username]])]),e("div",D,[F,m(e("input",{"onUpdate:modelValue":s[2]||(s[2]=o=>t.password=o),id:"password",class:"border border-gray-400 p-px m-px rounded",type:"password"},null,512),[[_,t.password]])])]),e("div",W,[z,e("button",{class:"bg-blue-500 text-white rounded border border-black mr-1 w-1/2",onClick:s[3]||(s[3]=(...o)=>r.initCamera&&r.initCamera(...o))}," best\xE4tigen "),e("button",{class:"bg-gray-400 text-white rounded border border-black w-1/2",onClick:s[4]||(s[4]=(...o)=>r.closeModal&&r.closeModal(...o))}," abbrechen ")])])}const G=c(O,[["render",L]]),H={props:{camera:{type:Object,required:!1}},methos:{getMessageQueue(){h.get("cameras/msgqueue").then(a=>{console.log(a)}).finally(console.log("hi"))}}},J={class:"flex flex-col justify-between border bg-gray-100 w-80 h-80 rounded-lg"},K=e("label",null," IP-Address: ",-1),R=e("label",null," User: ",-1),X={class:"flex justify-between"},Y=e("button",{class:"bg-blue-300 px-2 border-black border rounded"}," Edit Camera ",-1);function Z(a,s,l,i,t,r){return d(),n("div",J,[e("div",null,[e("div",null,[K,e("label",null,f(l.camera.ip_address),1)]),e("div",null,[R,e("label",null,f(l.camera.username),1)])]),e("div",X,[Y,e("button",{class:"bg-blue-300 px-2 border-black border rounded",onClick:s[0]||(s[0]=(...o)=>a.getMessageQueue&&a.getMessageQueue(...o))}," Show Events ")])])}const ee=c(H,[["render",Z]]),se={name:"Welcome",components:{CameraModal:G,Overlay:N,CameraTiles:ee},data(){return{cameraModal:!1,cameras:null,events:null,eventtypes:null}},methods:{closeAddCameraModal(){this.cameraModal=!1},showAddCameraModal(){this.cameraModal=!0,axios}},created(){axios.get("/cameras").then(a=>{this.cameras=a.data})}},ae={class:"pt-2 pl-2 w-fit"},te={class:"grid grid-cols-3 gap-4"},oe=e("label",{class:"m-auto text-9xl text-gray-200"},"+",-1),re=[oe];function le(a,s,l,i,t,r){const o=p("camera-modal"),g=p("overlay"),x=p("camera-tiles");return d(),n("div",ae,[b(g,{isVisible:t.cameraModal},{default:M(()=>[b(o,{onCloseModal:r.closeAddCameraModal},null,8,["onCloseModal"])]),_:1},8,["isVisible"]),e("div",te,[(d(!0),n($,null,k(t.cameras,(u,y)=>(d(),n("div",{key:"camera"+y},[b(x,{camera:u},null,8,["camera"])]))),128)),e("div",{class:"flex justify-center border bg-gray-100 w-80 h-80 rounded-lg",onClick:s[0]||(s[0]=(...u)=>r.showAddCameraModal&&r.showAddCameraModal(...u))},re)])])}const ne=c(se,[["render",le]]);export{ne as default};