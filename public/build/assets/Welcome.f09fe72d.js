import{o as d,c as i,a as e,r as E,b as w,d as g,w as p,v as y,e as C,f as V,t as c,g as f,h as _,i as $,F as v,j as x,k as M,l as j}from"./app.e0919e37.js";const m=(t,s)=>{const l=t.__vccOpts||t;for(const[u,n]of s)l[u]=n;return l},T={name:"Overlay",props:{isVisible:{type:Boolean,default:!1}}},D={key:0,class:"fixed z-20 inset-0 bg-black bg-opacity-50 bg-scroll h-full flex items-center justify-center"},P={class:"relative w-fit max-h-full overflow-y-auto bg-gray-100 shadow-lg rounded-lg border border-black"},S={class:"px-3 pt-3 flex flex-col justify-between"};function I(t,s,l,u,n,r){return l.isVisible?(d(),i("div",D,[e("div",P,[e("div",S,[E(t.$slots,"default")])])])):w("",!0)}const O=m(T,[["render",I]]),A={name:"CameraModal",data(){return{ip_address:"",username:"",password:""}},methods:{initCamera(){this.ip_address!=""&&this.username!=""&&this.password!=""?g.post("cameras/init",{ip_address:this.ip_address,username:this.username,password:this.password}).then(t=>{console.log(t),t.data[6]=="aborting..."&&alert("something went wrong"),t.data[1]=="camera found"&&(alert("camera already exists"),this.ip_address="",this.username="",this.password=""),this.closeModal()}):alert("fields are empty")},closeModal(){this.$emit("closeModal")}}},R={class:"min-w-fit"},U=e("h1",{class:"text-center mb-2 text-lg"},[V(" Input for Camera "),e("hr")],-1),L={class:""},q={class:"flex justify-between"},W=e("label",{class:"my-auto mr-2",for:"ip_address"},"IP-Address:",-1),N={class:"flex justify-between"},F=e("label",{class:"my-auto mr-2",for:"username"},"Username:",-1),K={class:"flex justify-between"},H=e("label",{class:"my-auto","mr-2":"",for:"password"},"Password:",-1),z={class:"my-2 flex justify-between"},Y=e("div",{class:"grow"},null,-1);function Z(t,s,l,u,n,r){return d(),i("div",R,[U,e("div",L,[e("div",q,[W,p(e("input",{"onUpdate:modelValue":s[0]||(s[0]=a=>n.ip_address=a),id:"ip_address",class:"border border-gray-400 p-px m-px rounded",type:"text"},null,512),[[y,n.ip_address]])]),e("div",N,[F,p(e("input",{"onUpdate:modelValue":s[1]||(s[1]=a=>n.username=a),id:"username",class:"border border-gray-400 p-px m-px rounded",type:"text"},null,512),[[y,n.username]])]),e("div",K,[H,p(e("input",{"onUpdate:modelValue":s[2]||(s[2]=a=>n.password=a),id:"password",class:"border border-gray-400 p-px m-px rounded",type:"password",onKeyup:s[3]||(s[3]=C((...a)=>r.initCamera&&r.initCamera(...a),["enter"]))},null,544),[[y,n.password]])])]),e("div",z,[Y,e("button",{class:"bg-blue-500 text-white rounded border border-black mr-1 w-1/2",onClick:s[4]||(s[4]=(...a)=>r.initCamera&&r.initCamera(...a)),onKeyup:s[5]||(s[5]=C((...a)=>r.initCamera&&r.initCamera(...a),["enter"]))}," best\xE4tigen ",32),e("button",{class:"bg-gray-400 text-white rounded border border-black w-1/2",onClick:s[6]||(s[6]=(...a)=>r.closeModal&&r.closeModal(...a))}," abbrechen ")])])}const G=m(A,[["render",Z]]),J={name:"VideoPlayer",props:{camera:{type:Object,required:!0}},data(){return{last:{event:"",timestamp:""}}},methods:{getLastEvent(){g.get(`events/${this.camera.id}`).then(t=>{this.last.event=t.data[0],this.last.timestamp=t.data[1].split(".")[0]})},playVideo(){console.log("playVideo")},pauseVideo(){console.log("pauseVideo")},fullVideo(){let t=document.getElementById("video");t.style.position="absolute",t.style.height=t.clientHeight*2,t.style.width=t.clientWidth*2,new Promise(s=>setTimeout(s,1e3)).then(()=>{t.style.position="relative",t.style.height=t.clientHeight/2,t.style.width=t.clientWidth/2})},showControls(){}},created(){this.getLastEvent()}},Q={class:"flex justify-between"},X=e("label",null,"Last Event:",-1),ee={class:"border border-black mb-1"},te=["src"],se={class:"w-full bg-gray-300 h-7 border-t border-black flex justify-between"};function re(t,s,l,u,n,r){return d(),i("div",{onMouseover:s[3]||(s[3]=(...a)=>r.showControls&&r.showControls(...a)),class:"h-min"},[e("div",Q,[X,e("label",null,c(n.last.timestamp.split("T")[0]+" "+n.last.timestamp.split("T")[1]),1)]),e("div",ee,[e("video",{id:"video",src:n.last.event},null,8,te),e("div",se,[e("button",{onClick:s[0]||(s[0]=(...a)=>r.playVideo&&r.playVideo(...a)),class:"border-black border-r px-2 bg-gray-200"}," PLAY "),e("button",{onClick:s[1]||(s[1]=(...a)=>r.pauseVideo&&r.pauseVideo(...a)),class:"border-black border-l border-r px-2 bg-gray-200"}," PAUSE "),e("button",{onClick:s[2]||(s[2]=(...a)=>r.fullVideo&&r.fullVideo(...a)),class:"border-black border-l px-2 bg-gray-200"}," FULL ")])])],32)}const ae=m(J,[["render",re]]),le={components:{VideoPlayer:ae},props:{camera:{type:Object,required:!0},buffer:{type:Object,required:!1},concateRunning:{type:Boolean,required:!1,default:!1}},methods:{deleteCamera(){this.stopBuffer(),g.delete(`cameras/${this.camera.id}`).then(()=>{this.$emit("getCameras")})},startBuffer(){console.log("startBuffer",this.camera.id),this.$emit("startBuffer",this.camera)},stopBuffer(){this.buffer!=null&&g.delete(`processes/${this.camera.id}`).then(t=>{this.$emit("stopBuffer",this.camera.id),console.log(`stopped buffer for ${this.camera.ip_address}`),console.log(t.data)})},triggerEvent(){console.log(`trigger/${this.camera.id}`),g.get(`trigger/${this.camera.id}`).then(t=>{console.log(t.data)})}},created(){}},ne={class:"flex flex-col justify-between border border-black bg-gray-100 w-80 min-h-[80] rounded-lg grid-cols-2 grid-rows-2 p-1 pb-px mb-1"},oe={class:"flex justify-between"},de=e("label",null," Camera-ID: ",-1),ie={class:"flex justify-between"},ce=e("label",null," IP-Address: ",-1),ue={class:"flex justify-between"},me=e("label",null," User: ",-1),fe={class:"flex justify-start gap-2"};function be(t,s,l,u,n,r){const a=f("VideoPlayer");return d(),i("div",ne,[e("div",null,[e("div",oe,[de,e("label",null,c(l.camera.id),1)]),e("div",ie,[ce,e("label",null,c(l.camera.ip_address),1)]),e("div",ue,[me,e("label",null,c(l.camera.username),1)]),_(a,{camera:l.camera},null,8,["camera"])]),e("div",fe,[e("button",{class:"bg-red-400 px-2 h-10 min-w-max border-black border rounded text-sm",onClick:s[0]||(s[0]=(...o)=>r.deleteCamera&&r.deleteCamera(...o))}," Delete Camera "),l.buffer==null?(d(),i("button",{key:0,class:"bg-blue-400 px-2 h-10 min-w-max border-black border rounded text-sm",onClick:s[1]||(s[1]=(...o)=>r.startBuffer&&r.startBuffer(...o))}," Start Buffer ")):(d(),i("button",{key:1,class:"bg-blue-400 px-2 h-10 min-w-max border-black border rounded text-sm",onClick:s[2]||(s[2]=(...o)=>r.stopBuffer&&r.stopBuffer(...o))}," Stop Buffer ")),l.concateRunning?(d(),i("button",{key:2,class:"bg-gray-300 px-2 h-10 min-w-max border-black border rounded text-sm",onClick:s[3]||(s[3]=(...o)=>r.triggerEvent&&r.triggerEvent(...o))}," Trigger Event ")):w("",!0)])])}const he=m(le,[["render",be]]),_e={name:"Event",props:{event:{type:Object,required:!0}},methods:{clickevent(){console.log(this.event.id,"clicked")},showEventTimestamp(t){return t.created_at.split(".")[0].split("T")[1]},showEventCamera(t){return t.camera_id},showEventType(t){return t.eventtype_id}}},ge={class:"flex"},ve=e("div",{class:"bg-gray-400 w-5 h-5 my-auto -m-1.5 shrink-0 mr-1 rounded-full"},null,-1),pe=["title"],ye={class:"flex flex-col justify-between"},xe={class:"ml-2 font-bold text-left"},we={class:"ml-2 text-left"},Ce={class:"ml-2 text-left"};function ke(t,s,l,u,n,r){return d(),i("div",ge,[ve,e("div",{class:"bg-gray-400 min-w-[15rem] min-h-[5rem] rounded-lg my-2 text-center",title:r.showEventTimestamp(l.event),onClick:s[0]||(s[0]=(...a)=>r.clickevent&&r.clickevent(...a))},[e("div",ye,[e("label",xe,"Zeitpunkt: "+c(r.showEventTimestamp(l.event)),1),e("label",we,"Camera-ID: "+c(r.showEventCamera(l.event)),1),e("label",Ce,"Eventtyp-ID: "+c(r.showEventType(l.event)),1)])],8,pe)])}const Be=m(_e,[["render",ke]]),Ee={name:"Timeline",components:{Event:Be},data(){return{date:null,timePeriod:null,events:null,eventDays:null}},methods:{getEvents(){axios.get(`events${this.date?"?date="+this.date:""}`).then(t=>{this.timePeriod=t.data[0],this.events=t.data[1].reverse(),console.log(`events${this.date?"?date="+this.date:""}`)})},getEventDays(){axios.get("events/names").then(t=>{this.eventDays=t.data})}},created(){this.date=new Date().toISOString().split("T")[0],this.getEvents(),this.getEventDays()}},Ve=e("br",null,null,-1),$e={class:"bg-gray-100 border rounded-lg"},Me={class:"flex"},je=["value"],Te={key:0,class:"m-auto"},De={class:"max-h-[25rem] min-h-[25rem] overflow-y-scroll border-t border-black"},Pe={class:"my-2 pl-2 h-full flex border"},Se={class:"h-full w-2 ml-2 flex flex-col bg-gray-300 rounded-sm"};function Ie(t,s,l,u,n,r){const a=f("Event");return d(),i(v,null,[Ve,e("div",$e,[e("div",Me,[p(e("select",{"onUpdate:modelValue":s[0]||(s[0]=o=>n.date=o),class:"mb-px rounded",onChange:s[1]||(s[1]=o=>r.getEvents())},[(d(!0),i(v,null,x(n.eventDays,(o,b)=>(d(),i("option",{key:"days"+b,value:o},c(o),9,je))),128))],544),[[$,n.date]]),this.events?(d(),i("label",Te,c(n.events.length)+" Events found ",1)):w("",!0)]),e("div",De,[e("div",Pe,[e("div",Se,[(d(!0),i(v,null,x(n.events,(o,b)=>(d(),M(a,{key:"event"+b,event:o},null,8,["event"]))),128))])])])])],64)}const Oe=m(Ee,[["render",Ie]]),Ae={name:"Welcome",components:{CameraModal:G,Overlay:O,CameraTiles:he,Timeline:Oe},data(){return{cameraModal:!1,buffers:null,cameras:null,events:null}},methods:{getCameras(){axios.get("/cameras").then(t=>{this.cameras=t.data})},getRunningBuffers(){axios.get("/processes").then(t=>{this.buffers=t.data})},getBuffer(t){var s;return(s=this.buffers)==null?void 0:s.find(l=>l.camera_id==t.id)},stopBuffer(t){let s=this.buffers.findIndex(l=>l.camera_id==t);this.buffers.splice(s,1),this.getRunningBuffers()},startBuffer(t){axios.get(`startbuffer/${t.id}`).then(s=>{console.log(`started buffer for ${t.ip_address}`),this.buffers.push(s.data),this.getRunningBuffers()})},closeAddCameraModal(){this.cameraModal=!1,this.getCameras()},showAddCameraModal(){this.cameraModal=!0}},created(){this.getCameras(),this.getRunningBuffers()},computed:{concateBuffer(){var t;return((t=this.buffers)==null?void 0:t.find(s=>s.command=="concateBuffer"))!=null}}},Re=e("div",null,[e("h1",{class:"text-2xl ml-3 mt-2 text-center"},"Videotool - Webinterface"),e("hr")],-1),Ue={class:""},Le={class:"pt-2 pl-2 w-fit mx-auto"},qe={class:"grid grid-cols-3 gap-4"},We=e("label",{class:"m-auto text-9xl text-gray-200"},"+",-1),Ne=[We];function Fe(t,s,l,u,n,r){const a=f("CameraModal"),o=f("Overlay"),b=f("CameraTiles"),k=f("Timeline");return d(),i(v,null,[Re,e("div",Ue,[e("div",Le,[_(o,{isVisible:n.cameraModal},{default:j(()=>[_(a,{onCloseModal:r.closeAddCameraModal},null,8,["onCloseModal"])]),_:1},8,["isVisible"]),e("div",qe,[(d(!0),i(v,null,x(n.cameras,(h,B)=>(d(),i("div",{key:"camera"+B},[_(b,{camera:h,buffer:r.getBuffer(h),concateRunning:r.concateBuffer&&r.getBuffer(h)!=null,onDeleteCamera:r.getCameras,onStopBuffer:r.stopBuffer,onStartBuffer:r.startBuffer},null,8,["camera","buffer","concateRunning","onDeleteCamera","onStopBuffer","onStartBuffer"])]))),128)),e("div",{class:"flex flex-col justify-between border border-black bg-gray-100 w-80 min-h-[80] rounded-lg grid-cols-2 grid-rows-2 p-1 pb-px mb-1",onClick:s[0]||(s[0]=(...h)=>r.showAddCameraModal&&r.showAddCameraModal(...h))},Ne)]),_(k)])])],64)}const He=m(Ae,[["render",Fe]]);export{He as default};
