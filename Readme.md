# Whiteboard WEB版本使用说明
## 基本介绍
### 组成
- webassembly二进制文件
	- whiteboard_webassembly.wasm
	- whiteboard_webassembly.data
- 一个webassembly导入文件，与wasm文件同名
	- (whiteboard_webassembly.js
- whiteboard库
	- whiteboard_sdk.js

- 示例文件
	- test.html
	- test.index
### 需求
- 能支持webassembly和webgl的浏览器（最近几年的主流浏览器基本上都支持)

## 使用介绍
### 基本使用
像test.html描述的那样，先在html中插入对sdk的引用，如：
```
<html>
<body>
<script type="module" src="whiteboard_sdk.js"></script>
</body>
</html>

```
此时whiteboard就已经被导入了，接下来可以调用`whiteboard.controller`来对白板进行初始化动作和控制了。

初始化的流程可以看例子中的代码
```

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
以下接口都属于whiteboard.controller对象，调用时候都是以whiteboard.controller为开头，例如
whiteboard.controller.leave_room()等
#### 加入房间
` join_room(appId,meetingId,userId,token)`
 - appId代表应用的ID
- meetingId 房间的Id
- userId 用户的Id
- token 认证信息

#### 离开房间
`leave_room()`

#### 挂载canvas
elementId 挂载canvas的父元素标签Id
`mountCanvas(elementId)`

#### 卸载canvas
`unload()`

#### widget翻页
`flip_widget(params)` 
#### widget缩放
  `scale_widget(params)`
#### 删除widget
`  delete_widget(widgetId) `
#### 还原笔迹
`rubber_undo()`
#### 清空undo回收站
`clear_recovery()`
#### 设置白板输入模式属性
`set_pen_style(params) `

#### 设置白板输入模式
`set_input_mode(mode)`
#### 设置橡皮参数
`set_erase_size(size)`

#### 设置图形模式 
 矩形 - 0 圆 - 1 线 - 3 箭头 - 6\
 `set_geometry_mode(mode)`

#### 设置白板的背景色
 `set_whiteboard_back(theme)`
#### 新建文档
  `new_document()`
#### 切换文档
`  cut_document(widgetId)`
#### 插入文档
`  insert_document(widgetId)`
#### 删除文档
`  delete_document(widgetId)`

#### 清空文档
`. clean_document(widgetId)`

### 事件回调接口介绍
示例：
``` javascript
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
#####            JoinRoomError
	加入房间失败

#####            DocumentChange
	文档发生变更
#####            BackgroundChange
	背景色发生变更

#####            WidgetActivity
	当前的活动widget发生变更
#####            FileFlip
	当前widget被翻页

#####            RecoveryState
	橡皮的可还原状态发生变更
#####            WidgetAction
	有文件发生变化，例如插入、删除等
####			  WidgetScroll
	文件滚动事件发生，包括ScrollToTop表示滚动顶部，ScrollToBottom标识滚动到了底部

