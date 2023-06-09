(function(){"use strict";var e={5726:function(e,t,s){var a=s(9242),n=s(3396);const i={class:"h-screen w-screen flex max-w-full"},o={class:"w-1/4 bg-gray-800 flex flex-col"},r={class:"p-4"},l=(0,n._)("i",{class:"fas fa-plus mr-2"},null,-1),c={class:"p-4 flex-1 w-full"},d={class:"sticky bottom-0"},h=(0,n._)("div",{class:"border-t border-gray-600 ml-2 mr-2"},null,-1),g={class:"p-4"},u=(0,n._)("i",{class:"fas fa-cog mr-2"},null,-1),p={class:"flex-1 flex-col h-full bg-gray-700 p-4"},x={class:"flex-1 h-full flex flex-col"},f={class:"flex-grow overflow-auto",ref:"messageContainer"},m={class:"flex-none bottom-0 bg-gray-700"},b={class:"ml-3 text-sm text-gray-300 flex items-center"},y={class:"flex p-2"},v=["rows"],w=(0,n._)("div",{class:"ml-3 text-gray-300 flex items-center text-xs"},[(0,n.Uk)(" All data is saved in the browser's LocalStorage. The GitHub repositry is "),(0,n._)("a",{href:"https://github.com/shibh308/gpt-simple-frontend"},"here"),(0,n.Uk)(". ")],-1),k={key:1,class:"fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50"},I={class:"bg-gray-800 rounded p-4"},D={class:"flex justify-end"};function C(e,t,s,C,L,$){const _=(0,n.up)("SideBarElement"),M=(0,n.up)("ChatLog"),S=(0,n.up)("KeyInputModal");return(0,n.wg)(),(0,n.iD)("div",i,[(0,n._)("div",o,[(0,n._)("div",r,[(0,n._)("button",{class:"px-4 py-2 bg-gray-900 text-white rounded font-semibold w-full text-center",onClick:t[0]||(t[0]=(...t)=>e.newChat&&e.newChat(...t))},[l,(0,n.Uk)(" New Chat ")])]),(0,n._)("div",c,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.chatLogDatas,((t,s)=>((0,n.wg)(),(0,n.iD)("div",{key:s},[(0,n.Wm)(_,{title:t.title,index:s,selected:s===this.activeIndex,onSelected:t=>e.handleSelected(s),onDelete:t=>e.handleTrashSidebar(s),onRename:e.handleRename,onDuplicate:t=>e.handleDuplicate(s)},null,8,["title","index","selected","onSelected","onDelete","onRename","onDuplicate"])])))),128))]),(0,n._)("div",d,[h,(0,n._)("div",g,[(0,n._)("button",{class:"px-4 py-2 bg-gray-900 text-white rounded font-semibold w-full text-center",onClick:t[1]||(t[1]=(...t)=>e.openModal&&e.openModal(...t))},[u,(0,n.Uk)(" Set API Key ")])])])]),(0,n._)("div",p,[(0,n._)("div",x,[(0,n._)("div",f,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.chatLogDatas,((t,s)=>((0,n.wg)(),(0,n.iD)("div",{key:s},[s===e.activeIndex?((0,n.wg)(),(0,n.j4)(M,{key:0,id:s,messages:t.messages,asking:e.asking,onTrash:t=>e.handleTrash(s,t),onInterrupt:e.interruptPrompt,onRegenerate:e.handleRegenerate,onContinue:e.handleContinue,onToggle:t=>e.handleRawMode(s,t),onEdit:e.handleEdit},null,8,["id","messages","asking","onTrash","onInterrupt","onRegenerate","onContinue","onToggle","onEdit"])):(0,n.kq)("",!0)])))),128))],512),(0,n._)("div",m,[(0,n._)("div",b,[(0,n.wy)((0,n._)("input",{type:"checkbox",class:"form-checkbox h-3 w-3 mr-1 bg-gray-500 border-gray-700 text-gray-900 rounded","onUpdate:modelValue":t[2]||(t[2]=t=>e.useContext=t)},null,512),[[a.e8,e.useContext]]),(0,n.Uk)(" use context "),(0,n.wy)((0,n._)("input",{type:"checkbox",class:"form-checkbox h-3 w-3 ml-1 mr-1 bg-gray-500 border-gray-700 text-gray-900 rounded","onUpdate:modelValue":t[3]||(t[3]=t=>e.gpt4=t)},null,512),[[a.e8,e.gpt4]]),(0,n.Uk)(" GPT-4 ")]),(0,n._)("div",y,[(0,n.wy)((0,n._)("textarea",{ref:"inputTextarea","onUpdate:modelValue":t[4]||(t[4]=t=>e.prompt=t),class:"flex-grow text-white border-gray-600 bg-gray-800 rounded px-4 py-2 mr-2 no-scrollbar resize-none",rows:e.textRows,onInput:t[5]||(t[5]=(...t)=>e.adjustTextRows&&e.adjustTextRows(...t)),onKeydown:[t[6]||(t[6]=(0,a.D2)((0,a.iM)(((...t)=>e.insertNewLine&&e.insertNewLine(...t)),["shift"]),["enter"])),t[7]||(t[7]=(0,a.D2)((0,a.iM)(((...t)=>e.sendPrompt&&e.sendPrompt(...t)),["exact"]),["enter"]))],type:"text",placeholder:"Send a message."},null,40,v),[[a.nr,e.prompt]]),e.asking?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("button",{key:0,class:"flex px-4 py-2 bg-gray-800 text-white rounded font-semibold",onClick:t[8]||(t[8]=(...t)=>e.sendPrompt&&e.sendPrompt(...t))}," Send ")),e.asking?((0,n.wg)(),(0,n.iD)("button",{key:1,class:"flex px-4 py-2 bg-gray-800 text-white rounded font-semibold",onClick:t[9]||(t[9]=(...t)=>e.interruptPrompt&&e.interruptPrompt(...t))}," Interrupt ")):(0,n.kq)("",!0)]),w])])]),e.keyModalVisible?((0,n.wg)(),(0,n.j4)(S,{key:0,onClose:e.closeModal},null,8,["onClose"])):(0,n.kq)("",!0),e.renameModalVisible?((0,n.wg)(),(0,n.iD)("div",k,[(0,n._)("div",I,[(0,n.wy)((0,n._)("input",{id:"renameModalInput",ref:"inputTextarea","onUpdate:modelValue":t[10]||(t[10]=t=>e.logName=t),class:"text-white bg-gray-700 rounded px-4 py-2 mb-4 focus:outline-none",placeholder:"Enter log name."},null,512),[[a.nr,e.logName]]),(0,n._)("div",D,[(0,n._)("button",{class:"px-4 py-2 bg-blue-500 text-white rounded font-semibold",onClick:t[11]||(t[11]=(...t)=>e.saveLogName&&e.saveLogName(...t))}," Save "),(0,n._)("button",{class:"px-4 py-2 bg-gray-300 text-gray-700 rounded ml-2",onClick:t[12]||(t[12]=t=>{e.renameModalVisible=!1})}," Cancel ")])])])):(0,n.kq)("",!0)])}var L=s(7327),$=(s(7658),s(6520));const _={class:"fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50"},M={class:"bg-gray-800 rounded p-4"},S={class:"flex justify-end"};function T(e,t,s,i,o,r){return(0,n.wg)(),(0,n.iD)("div",_,[(0,n._)("div",M,[(0,n.wy)((0,n._)("input",{ref:"inputTextarea","onUpdate:modelValue":t[0]||(t[0]=t=>e.message=t),class:"text-white bg-gray-700 rounded px-4 py-2 mb-4 focus:outline-none",type:"password",placeholder:"Enter your API key."},null,512),[[a.nr,e.message]]),(0,n._)("div",S,[(0,n._)("button",{class:"px-4 py-2 bg-blue-500 text-white rounded font-semibold",onClick:t[1]||(t[1]=(...t)=>e.saveMessage&&e.saveMessage(...t))}," Save "),(0,n._)("button",{class:"px-4 py-2 bg-gray-300 text-gray-700 rounded ml-2",onClick:t[2]||(t[2]=(...t)=>e.closeModal&&e.closeModal(...t))}," Cancel ")])])])}class P extends $.w3{constructor(...e){super(...e),(0,L.Z)(this,"message","")}mounted(){this.loadMessage()}loadMessage(){const e=localStorage.getItem("api-key");e&&(this.message=e)}saveMessage(){localStorage.setItem("api-key",this.message),this.closeModal()}closeModal(){this.message="",this.$emit("close")}}var R=s(89);const O=(0,R.Z)(P,[["render",T]]);var Z=O,j=s(7139);const q={key:0,class:"p-2 text-right"},N={class:"bg-gray-600 rounded px-4 pt-5 pb-4 text-white inline-block border-l-4 border-blue-400 relative"},V=["onClick"],U=["onClick"],E={key:0,class:"whitespace-pre-wrap text-left"},B={key:1,class:"flex flex-col"},A={class:"p-1 self-end"},W=["onClick"],z={key:1,class:"p-2"},H={class:"bg-gray-600 rounded px-4 pt-5 pb-4 text-white inline-block border-l-4 border-green-400 relative"},K=["onClick"],J=["onClick"],F=["innerHTML"],Y={key:5,class:"whitespace-pre-wrap"},G={key:6,class:"flex flex-col"},Q={class:"p-1 self-end"},X=["onClick"];function ee(e,t,s,i,o,r){return(0,n.wg)(),(0,n.iD)("ul",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.messages,((s,i)=>((0,n.wg)(),(0,n.iD)("li",{key:i},["user"===s.role?((0,n.wg)(),(0,n.iD)("div",q,[(0,n._)("div",N,[(0,n._)("button",{onClick:t=>e.$emit("trash",i),class:"fas fa-trash-can absolute left-1 top-1 text-xs text-gray-400"},null,8,V),(0,n._)("button",{onClick:t=>e.edit(i,!1),class:"far fa-pen-to-square absolute left-5 top-1 text-xs text-gray-400"},null,8,U),e.editIndex!==i?((0,n.wg)(),(0,n.iD)("div",E,(0,j.zw)(s.content),1)):(0,n.kq)("",!0),e.editIndex===i?((0,n.wg)(),(0,n.iD)("div",B,[(0,n.wy)((0,n._)("textarea",{"onUpdate:modelValue":t[0]||(t[0]=t=>e.edittingMessage=t),class:"border-gray-00 bg-gray-700 border-wi rounded border-2 px-2 py-2 resize-none",style:{width:"50vw",height:"10em"},type:"text"},null,512),[[a.nr,e.edittingMessage]]),(0,n._)("div",A,[e.asking?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("button",{key:0,class:"flex px-4 py-2 bg-gray-800 text-white rounded font-semibold text-sm",onClick:t=>e.edit(i,!0)}," Update ",8,W))])])):(0,n.kq)("",!0)])])):(0,n.kq)("",!0),"assistant"===s.role?((0,n.wg)(),(0,n.iD)("div",z,[(0,n._)("div",H,[(0,n._)("button",{onClick:t=>e.$emit("toggle",i),class:"fas fa-code absolute left-1 top-1 text-xs text-gray-400"},null,8,K),s.raw?((0,n.wg)(),(0,n.iD)("button",{key:0,onClick:t=>e.edit(i,!1),class:"far fa-pen-to-square absolute left-5 top-1 text-xs text-gray-400"},null,8,J)):(0,n.kq)("",!0),i+1!==e.messages.length||e.asking?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("button",{key:1,onClick:t[1]||(t[1]=t=>e.$emit("regenerate")),class:"fas fa-repeat absolute right-1 bottom-1 text-xs text-gray-400"})),i+1!==e.messages.length||e.asking?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("button",{key:2,onClick:t[2]||(t[2]=t=>e.$emit("continue")),class:"fas fa-play absolute right-5 bottom-1 text-xs text-gray-400"})),i+1===e.messages.length&&e.asking?((0,n.wg)(),(0,n.iD)("button",{key:3,onClick:t[3]||(t[3]=t=>e.$emit("interrupt")),class:"fas fa-pause absolute right-1 bottom-1 text-xs text-gray-400"})):(0,n.kq)("",!0),s.raw?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("div",{key:4,class:"markdown-content prose",innerHTML:e.renderedMarkdown(s.content)},null,8,F)),s.raw&&e.editIndex!==i?((0,n.wg)(),(0,n.iD)("pre",Y,[(0,n._)("div",null,(0,j.zw)(s.content),1)])):(0,n.kq)("",!0),e.editIndex===i?((0,n.wg)(),(0,n.iD)("div",G,[(0,n.wy)((0,n._)("textarea",{"onUpdate:modelValue":t[4]||(t[4]=t=>e.edittingMessage=t),class:"border-gray-00 bg-gray-700 border-wi rounded border-2 px-2 py-2 resize-none",style:{width:"50vw",height:"10em"},type:"text"},null,512),[[a.nr,e.edittingMessage]]),(0,n._)("div",Q,[e.asking?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("button",{key:0,class:"flex px-4 py-2 bg-gray-800 text-white rounded font-semibold text-sm",onClick:t=>e.edit(i,!0)}," Update ",8,X))])])):(0,n.kq)("",!0)])])):(0,n.kq)("",!0)])))),128))])}var te=s(5068),se=s(4815),ae=s(2020),ne=s(5442),ie=s(7592),oe=s.n(ie),re=function(e,t,s,a){var n,i=arguments.length,o=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,s):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,s,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(i<3?n(o):i>3?n(t,s,o):n(t,s))||o);return i>3&&o&&Object.defineProperty(t,s,o),o};class le extends $.w3{constructor(...e){super(...e),(0,L.Z)(this,"messages",void 0),(0,L.Z)(this,"asking",void 0),(0,L.Z)(this,"codes",new Map),(0,L.Z)(this,"eventListeners",new Map),(0,L.Z)(this,"editIndex",-1),(0,L.Z)(this,"edittingMessage","")}renderedMarkdown(e){const t=new te.TU.Renderer;t.heading=(e,t)=>{const s=(()=>{switch(t){case 1:return"text-4xl font-extrabold mt-4 mb-4";case 2:return"text-3xl font-extrabold mt-3 mb-3";case 3:return"text-2xl font-bold mt-2 mb-2";case 4:return"text-xl font-bold mt-2 mb-2";case 5:return"text-lg font-bold mt-1 mb-1";case 6:return"text-base font-bold mt-1 mb-1";default:return""}})();return`<h${t} class="${s}">${e}</h${t}>\n`},t.list=(e,t,s)=>{const a=t?"ol":"ul",n=t&&1!==s?' start="'+s+'"':"",i=t?"list-decimal":"list-disc";return"<"+a+n+` class="${i} ml-2 mt-2 mb-2">\n`+e+"</"+a+">\n"},t.listitem=e=>`<li class="font-normal ml-4">${e}</li>\n`,t.table=(e,t)=>`\n      <div class="p-2">\n        <div class="border bg-gray-700 border-white rounded inline-block">\n            <table class="border-collapse table-auto">\n            <thead class="bg-gray-600">\n                ${e}\n            </thead>\n            ${t}\n            </table>\n        </div>\n      </div>\n      `,t.tablerow=e=>`<tr>\n${e}</tr>\n`,t.tablecell=(e,t)=>{const s=t.header?"th":"td",a=t.header?"border-l p-1":"border-l border-t p-1",n=t.align?`<${s} class="${a}" align="${t.align}">`:`<${s} class="${a}">`;return n+e+`</${s}>\n`},t.codespan=e=>` <code class="bg-gray-700 p-1 rounded font-bold">${e}</code> `,t.paragraph=e=>`<p>${e}</p><br>`,t.br=()=>"<br>",t.code=(e,t)=>{const s=ne.V8.hashStr(e+"_md5");if(this.codes.set(s,e),t)e=oe().highlight(t,e).value.trim();else{const s=oe().highlightAuto(e);e=s.value.trim(),t=s.language}return`\n      <div class="p-2">\n        <div class="flex bg-gray-700 rounded-t p-1 text-sm">\n          <div class="flex-grow inline-block text-left ml-1">${t}</div>\n          <button class="fas fa-copy mr-2" id="copyButton-${s}" />\n        </div>\n        <pre class="bg-gray-950 rounded-b p-2 flex whitespace-pre-wrap"><code class=language-${t} overflow-x-scroll max-w-2xl text-left">${e}</code></pre>\n      </div>\n      `},te.TU.setOptions({breaks:!0,renderer:t});const s=(0,te.TU)(this.katexReplace(e));return s.replace(/(<br>\s*)+$/,"")}edit(e,t){if(-1===this.editIndex)this.editIndex=e,this.edittingMessage=this.messages[e].content;else{if(this.editIndex!==e)return;this.messages[e].content=this.edittingMessage,this.editIndex=-1,t&&(this.messages[e].raw=!1),this.$emit("edit")}}katexReplace(e){const t=/(```[\s\S]*?```|`[\s\S]*?`|\\\[[\s\S]*?\\\]|(?<=(^|\r|\n|\r\n)\s*?)\$\$[\s\S]*?\$\$(?=\s*?($|\r|\n|\r\n))|(?<=(^|\r|\n|\r\n)\s*?)\\\[[\s\S]*?\\\](?=\s*?($|\r|\n|\r\n))|(\$[^\r\n]+?\$))/g;return e.replace(t,(e=>{if(e.startsWith("```")||e.startsWith("`"))return e;let t=e;return"$$"===e?t="":e.startsWith("$$")&&e.trim().endsWith("$$")?t=e.trim().substring(2,e.length-2):e.startsWith("$")&&e.trim().endsWith("$")?t=e.trim().substring(1,e.length-1):e.startsWith("\\[")&&e.endsWith("\\]")&&(t=e.substring(2,e.length-2)),t?ae.Z.renderToString(t,{throwOnError:!1}):t}))}mounted(){this.setCopyButton()}updated(){this.setCopyButton()}setCopyButton(){const e=document.querySelectorAll('[id^="copyButton-"]');e.forEach((e=>{const t=e.id.replace(/^copyButton-/,""),s=this.eventListeners.get(t);s&&e.removeEventListener("click",s);const a=()=>{let e=this.codes.get(t);e&&navigator.clipboard.writeText(e).then((()=>{alert("Copied!")}))};e.addEventListener("click",a),this.eventListeners.set(t,a)}))}}re([(0,se.fI)()],le.prototype,"messages",void 0),re([(0,se.fI)()],le.prototype,"asking",void 0);const ce=(0,R.Z)(le,[["render",ee]]);var de=ce;const he={class:"mt-auto w-full py-1"},ge={class:"flex items-center"},ue={class:"flex-grow text-white text-left font-bold"},pe={class:"flex items-center"},xe={class:"flex-grow text-white text-left font-bold"};function fe(e,t,s,a,i,o){return(0,n.wg)(),(0,n.iD)("div",he,[e.selected?((0,n.wg)(),(0,n.iD)("button",{key:0,class:"px-4 py-2 bg-gray-900 hover:bg-gray-700 text-white rounded w-full",onClick:t[3]||(t[3]=t=>e.$emit("selected",e.index))},[(0,n._)("div",ge,[(0,n._)("div",ue,(0,j.zw)(e.title),1),(0,n._)("button",{class:"far fa-copy right-1 top-1 mr-1 text-gray-400 text-center",onClick:t[0]||(t[0]=t=>e.$emit("duplicate"))}),(0,n._)("button",{class:"far fa-pen-to-square right-1 top-1 mr-1 text-gray-400 text-center",onClick:t[1]||(t[1]=t=>e.$emit("rename"))}),(0,n._)("button",{class:"far fa-trash-can right-1 top-1 text-gray-400 text-center",onClick:t[2]||(t[2]=(...t)=>e.clickTrashButton&&e.clickTrashButton(...t))})])])):(0,n.kq)("",!0),e.selected?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("button",{key:1,class:"px-4 py-2 hover:bg-gray-600 text-white rounded w-full",onClick:t[7]||(t[7]=t=>e.$emit("selected",e.index))},[(0,n._)("div",pe,[(0,n._)("div",xe,(0,j.zw)(e.title),1),(0,n._)("button",{class:"far fa-copy right-1 top-1 mr-1 text-gray-400 text-center",onClick:t[4]||(t[4]=(...t)=>e.duplicate&&e.duplicate(...t))}),(0,n._)("button",{class:"far fa-pen-to-square right-1 top-1 mr-1 text-gray-400 text-center",onClick:t[5]||(t[5]=t=>e.$emit("rename"))}),(0,n._)("button",{class:"far fa-trash-can right-1 top-1 text-gray-400 text-center",onClick:t[6]||(t[6]=(...t)=>e.clickTrashButton&&e.clickTrashButton(...t))})])]))])}var me=function(e,t,s,a){var n,i=arguments.length,o=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,s):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,s,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(i<3?n(o):i>3?n(t,s,o):n(t,s))||o);return i>3&&o&&Object.defineProperty(t,s,o),o};class be extends $.w3{constructor(...e){super(...e),(0,L.Z)(this,"title",void 0),(0,L.Z)(this,"index",void 0),(0,L.Z)(this,"selected",void 0)}clickTrashButton(e){e.stopPropagation(),this.$emit("delete",this.index)}duplicate(e){e.stopPropagation(),this.$emit("duplicate",this.index)}}me([(0,se.fI)()],be.prototype,"title",void 0),me([(0,se.fI)()],be.prototype,"index",void 0),me([(0,se.fI)()],be.prototype,"selected",void 0);const ye=(0,R.Z)(be,[["render",fe]]);var ve=ye,we=function(e,t,s,a){var n,i=arguments.length,o=i<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,s):a;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)o=Reflect.decorate(e,t,s,a);else for(var r=e.length-1;r>=0;r--)(n=e[r])&&(o=(i<3?n(o):i>3?n(t,s,o):n(t,s))||o);return i>3&&o&&Object.defineProperty(t,s,o),o};class ke{constructor(e,t){(0,L.Z)(this,"title",""),(0,L.Z)(this,"messages",[]),this.title=e,this.messages=t}}let Ie=class extends $.w3{constructor(...e){super(...e),(0,L.Z)(this,"chatLogDatas",[]),(0,L.Z)(this,"activeIndex",0),(0,L.Z)(this,"prompt",""),(0,L.Z)(this,"textRows",1),(0,L.Z)(this,"logName",""),(0,L.Z)(this,"keyModalVisible",!1),(0,L.Z)(this,"renameModalVisible",!1),(0,L.Z)(this,"asking",!1),(0,L.Z)(this,"interrupt",!1),(0,L.Z)(this,"useContext",!1),(0,L.Z)(this,"gpt4",!1)}mounted(){this.loadFromStorage(),this.$nextTick((()=>{this.scroll()})),this.$watch("activeIndex",(e=>{localStorage.setItem("activeIndex",e)})),this.$watch("gpt4",(e=>{localStorage.setItem("gpt4",e)})),this.$watch("useContext",(e=>{localStorage.setItem("useContext",e)}))}loadFromStorage(){const e=localStorage.getItem("activeIndex");if(e){const t=parseInt(e);null!==t&&(this.activeIndex=t)}this.useContext="true"===localStorage.getItem("useContext"),this.gpt4="true"===localStorage.getItem("gpt4"),this.loadChatLogs()}loadChatLogs(){const e=localStorage.getItem("chatLogDatas");e&&(this.chatLogDatas=JSON.parse(e))}openModal(){this.keyModalVisible=!0}closeModal(){this.keyModalVisible=!1}handleSelected(e){this.asking||(this.activeIndex=e,this.updateLogNameVariable())}handleTrashSidebar(e){this.asking||(this.chatLogDatas.splice(e,1),this.activeIndex===e&&(0===this.activeIndex?this.activeIndex+=1:this.activeIndex-=1),e<this.activeIndex&&(this.activeIndex-=1),this.updateLogNameVariable(),this.saveChatLogs())}handleRename(){this.asking||(this.renameModalVisible=!0)}handleDuplicate(e){this.asking||(this.activeIndex=e,this.chatLogDatas.splice(this.activeIndex+1,0,this.chatLogDatas[this.activeIndex]),this.activeIndex+=1,this.updateLogNameVariable(),this.saveChatLogs())}saveLogName(){this.chatLogDatas[this.activeIndex].title=this.logName,this.renameModalVisible=!1}updateLogNameVariable(){this.chatLogDatas[this.activeIndex]&&(this.logName=this.chatLogDatas[this.activeIndex].title)}handleTrash(e,t){if(this.asking)return;const s=this.chatLogDatas[e].messages;s.splice(t,1);while(t<s.length&&"assistant"==s[t].role)s.splice(t,1);this.chatLogDatas[e].messages=s,this.saveChatLogs()}handleRawMode(e,t){this.chatLogDatas[e].messages[t].raw=!this.chatLogDatas[e].messages[t].raw}handleEdit(){this.saveChatLogs()}newChat(){this.asking||(this.chatLogDatas.splice(this.activeIndex+1,0,new ke("New Chat",[])),this.activeIndex+1<this.chatLogDatas.length&&(this.activeIndex+=1),this.saveChatLogs())}saveChatLogs(){localStorage.setItem("chatLogDatas",JSON.stringify(this.chatLogDatas))}addContent(e){const t=this.chatLogDatas[this.activeIndex].messages.length;this.chatLogDatas[this.activeIndex].messages[t-1].content+=e}async ask(e){const t=localStorage.getItem("api-key");if(!t)return void alert("Please set your API key first.");const s=t;await fetch("https://api.openai.com/v1/chat/completions",{headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},method:"POST",body:JSON.stringify({messages:e.map((({role:e,content:t})=>({role:e,content:t}))),model:this.gpt4?"gpt-4":"gpt-3.5-turbo",stream:!0})}).then((e=>{e.ok||alert(`error: ${e.status}`);const t=e.body?.getReader();if(!t)return;const s=new TextDecoder("utf-8"),a=async()=>{const{done:e,value:n}=await t.read();if(this.interrupt)return this.interrupt=!1,t.cancel();if(e||this.interrupt)return t.releaseLock();const i=s.decode(n,{stream:!0}),o=i.split("data:").map((e=>{const t=e.trim();if(""!==t&&"[DONE]"!==t)return JSON.parse(t)})).map((e=>{if(!e||!e.choices)return;if(0===e.choices.length)return;const t=e.choices[0];return t.delta&&t.delta.content?t.delta.content:void 0})).filter((e=>e)),r=this.chatLogDatas[this.activeIndex].messages.length;return this.chatLogDatas[this.activeIndex].messages[r-1].content+=o.join(""),a()};a().finally((()=>{this.asking=!1,this.saveChatLogs()}))})).catch((e=>{alert(`OpenAI API error: ${e.message}`),this.asking=!1}))}interruptPrompt(){this.interrupt=!0}async handleRegenerate(){if(0===this.chatLogDatas.length||this.asking)return;if(null===localStorage.getItem("api-key"))return void alert("Please set your API key.");this.asking=!0,this.chatLogDatas[this.activeIndex].messages.pop(),this.chatLogDatas[this.activeIndex].messages.push({role:"assistant",content:"",raw:!1});const e=this.chatLogDatas[this.activeIndex].messages[this.chatLogDatas[this.activeIndex].messages.length-2],t=this.useContext?this.chatLogDatas[this.activeIndex].messages:[e];this.ask(t)}async handleContinue(){if(0===this.chatLogDatas.length||this.asking)return;if(!localStorage.getItem("api-key"))return void alert("Please set your API key.");this.asking=!0;const e=this.useContext?this.chatLogDatas[this.activeIndex].messages:this.chatLogDatas[this.activeIndex].messages.slice(-2);this.ask(e)}async sendPrompt(e){if(e.preventDefault(),0===this.chatLogDatas.length)return void alert("Please create new chat.");if(this.asking)return;if(!localStorage.getItem("api-key"))return void alert("Please set your API key.");if(!this.prompt)return;this.asking=!0,this.chatLogDatas[this.activeIndex].messages.push({role:"user",content:this.prompt,raw:!1}),this.chatLogDatas[this.activeIndex].messages.push({role:"assistant",content:"",raw:!1});const t=this.useContext?this.chatLogDatas[this.activeIndex].messages:[{role:"user",content:this.prompt,raw:!1}];this.ask(t),this.prompt="",this.textRows=1,this.$refs.inputTextarea.style.height="",this.$nextTick((()=>{this.scroll()}))}scroll(){const e=this.$refs.messageContainer;e.scrollTop=e.scrollHeight}adjustTextRows(){const e=this.$refs.inputTextarea;e.style.height="auto",e.style.height=`${e.scrollHeight}px`,this.textRows=e.rows}};Ie=we([(0,$.Ei)({components:{KeyInputModal:Z,ChatLog:de,SideBarElement:ve}})],Ie);var De=Ie;const Ce=(0,R.Z)(De,[["render",C]]);var Le=Ce;(0,a.ri)(Le).mount("#app")}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var i=t[a]={exports:{}};return e[a].call(i.exports,i,i.exports,s),i.exports}s.m=e,function(){var e=[];s.O=function(t,a,n,i){if(!a){var o=1/0;for(d=0;d<e.length;d++){a=e[d][0],n=e[d][1],i=e[d][2];for(var r=!0,l=0;l<a.length;l++)(!1&i||o>=i)&&Object.keys(s.O).every((function(e){return s.O[e](a[l])}))?a.splice(l--,1):(r=!1,i<o&&(o=i));if(r){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}i=i||0;for(var d=e.length;d>0&&e[d-1][2]>i;d--)e[d]=e[d-1];e[d]=[a,n,i]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var a in t)s.o(t,a)&&!s.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,a){var n,i,o=a[0],r=a[1],l=a[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(n in r)s.o(r,n)&&(s.m[n]=r[n]);if(l)var d=l(s)}for(t&&t(a);c<o.length;c++)i=o[c],s.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return s.O(d)},a=self["webpackChunkgpt_web_frontend"]=self["webpackChunkgpt_web_frontend"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=s.O(void 0,[998],(function(){return s(5726)}));a=s.O(a)})();
//# sourceMappingURL=app.ea178655.js.map