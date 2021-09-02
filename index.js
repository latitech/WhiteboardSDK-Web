
function addScript(url,isModule){
  let script = document.createElement("script");
  script.src = url;
  if(isModule)
    script.type = "module";
  document.documentElement.appendChild(script);
}


//建立一个全局对象Module，用来初始化webassembly
window.Module = {};


//北纬测试服务器
let url = `https://sdk.efaceboard.cn:8888/Chatboard/meeting/join`;
// 加入房间所需token
let token =  "5aecbec19cb0b2e0b290e2876369bbd0";
// 当前程序appId
let appId =  "a4b26ecae3744e3fb60ff679e186cd98";
// 房间的meetingId
let meetingId = "32f13181ef444be1b5d2ad0f95db2432";
// 用户信息
let userId = "test1";



//初始化白板
whiteboard.controller.initialize(url);
// 挂载canvas
whiteboard.controller.mountCanvas("canvasBox")
//注册白板的事件回调函数
whiteboard.controller.registerEvent(whiteboard.controller.Event.AllEvent,processEvent);

//加载webassembly代码
addScript('./whiteboard_webassembly.js',false)
addScript('./ui.js')


//加入房间
whiteboard.controller.join_room(appId,meetingId,userId,token, status => {
  console.log('join_room status', status)
});

//处理白板和房间事件
function processEvent(event,params)
{ 
  console.log('=========================processEvent',event,params,whiteboard.controller.Event)
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
      console.log("document size:",whiteboard.controller.documentWidth,whiteboard.controller.documentHeight);
      GlobalMethod.documentChange(event,params)
      break;
    case whiteboard.controller.Event.BackgroundChange:
      console.log('修改背景色为：', params);
      GlobalMethod.setBackgroundColor(params)
      console.log(GlobalMethod.documents);
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
      case whiteboard.controller.WhiteboardSizeChanged:
        console.log("size changed:",params);
        break;
        case whiteboard.controller.WidgetScroll:
          console.log("scroll event",params);
          break;

  }
}

document.getElementById('setbgred').addEventListener("click",function() {
  whiteboard.controller.set_whiteboard_back("#FFFF0000");
})

document.getElementById('leave').addEventListener("click",function() {
  whiteboard.controller.leave_room()
})

document.getElementById('join').addEventListener("click",function() {
  whiteboard.controller.join_room(appId,meetingId,userId,token)
})

document.getElementById('mount').addEventListener("click",function() {
  whiteboard.controller.mountCanvas("canvasBox")
})

document.getElementById('unload').addEventListener("click",function() {
  whiteboard.controller.unloadCanvs()
})

document.getElementById('setCanvasBtn').addEventListener('click', () => {
  setCanvas();
});

function setCanvas() {
  const canvas = document.querySelector('#canvas');
  console.log('canvas', canvas)
  console.log('document.body.clientWidth', document.body.clientWidth)
  console.log('document.body.clientHeight', document.body.clientHeight)
  canvas.style.width = `${document.body.clientWidth}px`;
  canvas.style.height = `${document.body.clientHeight}px`;
  let devicePixelRatio = window.devicePixelRatio;
  let width = document.body.clientWidth;
  let height = document.body.clientHeight;
  canvas.width = width * window.devicePixelRatio;
  canvas.height = height * window.devicePixelRatio;
  
  console.log("resize to ",width,height);
  whiteboard.controller.update_canvas_size({originWidth:width,originHeight:height,height:height * devicePixelRatio,width:width*devicePixelRatio});
}