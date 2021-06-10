function addScript(url,isModule){
  let script = document.createElement("script");
  script.src = url;
  if(isModule)
    script.type = "module";
  document.documentElement.appendChild(script);
}
function addCanvas()
{
  let cvs = document.createElement("canvas");
  if(cvs == undefined)
  {
    console.log("create canvas failed");
  }
  cvs.id = "canvas";
  cvs.tabindex = -1;
  cvs.backgroundColor = "#ffff00ff";
  document.body.appendChild(cvs);
}
//创建canvas对象，设置其ID为“canvas”，如果html已经创建好了对象，那这一步可以忽略
addCanvas();
// import {controller as whiteboard,Tool} from "../src/entry.js"


//建立一个全局对象Module，用来初始化webassembly
window.Module = {};

/*
//七牛测试服务器

//下面的信息为进入房间的认证信息，由服务器端生成
//当前程序的appId
let appId =  "fd3c029d48a64afeb5b46c24aedc2995";
//要加入房间的meetingId
let meetingId = "aede5dfa1c194803b40799783b5d92c2";
//用户信息
let userId = "test1";
//加入房间所需要的token
let token =  "63e511d858589eab6d9e8a4d8029a1c0"; 
let url = "`https://sdk.efaceboard.cn:8888/Chatboard/meeting/join`"

*/

//小黑板测试服务器
//for sdktest
let token =  "42e564342aa38b7be51bda37f5590f5d"; 
let appId =  "a4b26ecae3744e3fb60ff679e186cd98";
let meetingId = "95daddc650294ddda5ea42d84dffe838";
let userId = "0585184c-b515-4533-b146-1d39379e7d9a"
let url = `https://sdktest.efaceboard.cn:8888/Chatboard/meeting/join`;

//初始化白板
whiteboard.controller.initialize(url);
//注册白板的事件回调函数
whiteboard.controller.registerEvent(whiteboard.controller.Event.AllEvent,processEvent);

//加载webassembly代码
addScript('./whiteboard_webassembly.js',false)
addScript('./ui.js')

//加入房间
whiteboard.controller.join_room(appId,meetingId,userId,token);

//处理白板和房间事件
function processEvent(event,params)
{
  console.log('------------processEvent',event,params,whiteboard.controller.Event)
  switch(event)
  {
    case whiteboard.controller.Event.AllEvent:
      
      break;
    case whiteboard.controller.Event.PageListChanged:
      GlobalMethod.createPage(params)
      break;
    case whiteboard.controller.Event.PageChanged:

      break;
    case whiteboard.controller.Event.WebassemblyReady:
      break;
    case whiteboard.controller.Event.WhiteboardSizeChanged:
      break;
    case whiteboard.controller.Event.JoinRoomError:
      break;
    case whiteboard.controller.Event.DocumentChange:
      GlobalMethod.documentChange(event,params)
      console.log("background changed");
      whiteboard.controller.set_whiteboard_back("#ffF5f5f5");
      break;
    case whiteboard.controller.Event.BackgroundChange:
      break;
    case whiteboard.controller.Event.WidgetActivity:
      GlobalMethod.widgetActivity(event,params)
      break;
    case whiteboard.controller.Event.FileFlip:
      break;
    case whiteboard.controller.Event.RecoveryState:
      console.log('RecoveryState',params)
      if(params.notEmpty)document.querySelector('.rubber-undo').style.display = 'block';
      break;
    case whiteboard.controller.Event.WidgetAction:
      break;
  }
}
