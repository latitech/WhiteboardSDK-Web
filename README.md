# Whiteboard WEB 版本使用说明

## 基本介绍

### 组成

- webassembly 二进制文件
  - whiteboard_webassembly.wasm
  - whiteboard_webassembly.data
- 一个 webassembly 导入文件，与 wasm 文件同名
  - (whiteboard_webassembly.js
- whiteboard 库

  - whiteboard_sdk.js

- 示例文件
  - test.html
  - test.index

### 需求

- 能支持 webassembly 和 webgl 的浏览器（最近几年的主流浏览器基本上都支持)

## 使用介绍

### 基本使用

像 test.html 描述的那样，先在 html 中插入对 sdk 的引用，如：

```
<html>
<body>
<script type="module" src="whiteboard_sdk.js"></script>
</body>
</html>

```

此时 whiteboard 就已经被导入了，接下来可以调用`whiteboard.controller`来对白板进行初始化动作和控制了。

初始化的流程可以看例子中的代码

```
function addScript(url,isModule){
  let script = document.createElement("script");
  script.src = url;
  if(isModule)
    script.type = "module";
  document.body.appendChild(script);
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


//建立一个全局对象Module，用来初始化webassembly
window.Module = {};

//下面的信息为进入房间的认证信息，由服务器端生成
//加入房间所需要的token
let token =  "xxxxxxxx-*d";
//当前程序的appId
let appId =  "****";
//要加入房间的meetingId
let meetingId = "***";
//用户信息
let userId = "****"

//初始化白板
whiteboard.controller.initialize();
//注册白板的事件回调函数
whiteboard.controller.registerEvent(whiteboard.controller.Event.AllEvent,processEvent);

//加载webassembly代码
addScript('./whiteboard_webassembly.js',false)


//加入房间
whiteboard.controller.join_room(appId,meetingId,userId,token);

//处理白板和房间事件
function processEvent(event,params)
{
  switch(event)
  {
    case whiteboard.controller.Event.AllEvent:
      break;
    case whiteboard.controller.Event.PageListChanged:
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
      break;
    case whiteboard.controller.Event.BackgroundChange:
      break;
    case whiteboard.controller.Event.WidgetActivity:
      break;
    case whiteboard.controller.Event.FileFlip:
      break;
    case whiteboard.controller.Event.RecoveryState:
      break;
    case whiteboard.controller.Event.WidgetAction:
      break;
  }
}

```

### 控制接口介绍

以下接口都属于 whiteboard.controller 对象，调用时候都是以 whiteboard.controller 为开头，例如
whiteboard.controller.leave_room()等

#### 加入房间

` join_room(appId,meetingId,userId,token)`

- appId 代表应用的 ID
- meetingId 房间的 Id
- userId 用户的 Id
- token 认证信息

#### 通用属性

`widgetId：需要修改页id`

#### 离开房间

`leave_room()`

#### widget 缩放

`scale_widget({widgetId,scale})`
`widgetId scale 1放大 -1缩小 `

#### 删除 widget

` delete_widget({widgetId})`

#### 还原笔迹

`rubber_undo()`

#### 清空 undo 回收站

`clear_recovery()`

#### 设置白板输入模式属性

`set_pen_style({ type: 0 写字笔 ，1 荧光笔，（2，3，4，5，指针状态） , 
color: `#FF+颜色 彩笔:#7F+颜色 `,
size: 大小 }) `

#### 设置白板输入模式

`set_input_mode({mode})`
// 普通模式
mode = 0;
// 橡皮模式
mode = 1;
// 选择模式
mode = 2;
// 图形模式
mode = 3;
// 文字模式
mode = 4;

#### 设置橡皮参数

`set_erase_size({size})`
size：数字大小

#### 设置图形模式

`set_geometry_mode({mode})`
mode 矩形 - 0 圆 - 1 线 - 3 箭头 - 6

#### 设置白板的背景色

`set_whiteboard_back({color})`
#FF+颜色

#### 新建文档

`new_document()`

#### 切换文档

` cut_document(widgetId)`

#### 插入文档

` insert_document(widgetId)`

#### 删除文档

` delete_document(widgetId)`
#### 文件上传
` upload_file({
	file: event.target.files[0]   （enent事件），
   	superior: {
		sessionId，
		fileGroupId,
		userId
	}
})`


### 事件回调接口介绍

示例：

```javascript
whiteboard.controller.registerEvent(whiteboard.controller.Event.AllEvent,processEvent);
function processEvent(event,params)
{
  switch(event)
  {
    case whiteboard.controller.Event.PageListChanged:
      break;
    case whiteboard.controller.Event.PageChanged:
      break;
    case whiteboard.controller.Event.WebassemblyReady:
      break;
	...
   }
}
```

#### 事件参数说明:

##### PageListChanged

    页面列表变更，例如有人新建或者删除页面

##### PageChanged

    当前显示页面发生变更，例如翻页会触发此动作

###### WhiteboardSizeChanged

    白板的尺寸发生变更

##### JoinRoomError

    加入房间失败

##### DocumentChange

    文档发生变更

##### BackgroundChange

    背景色发生变更

##### WidgetActivity

    当前的活动widget发生变更

##### FileFlip

    当前widget被翻页

##### RecoveryState

    橡皮的可还原状态发生变更

##### WidgetAction

    有文件发生变化，例如插入、删除等