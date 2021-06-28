## 背景
浙江大学2021年春夏学期课程 《BS体系软件设计》(by hxj)期末大作业

任选Web开发技术实现一个物联网应用的网站

本项目的[技术栈及开发体会](./开发体会.md)
## 要求
需要实现的基本功能如下：
1.	搭建一个mqtt服务器，能够接收指定的物联网终端模拟器发送的数据。
2.	实现用户注册、登录功能，用户注册时需要填写必要的信息并验证，如用户名、密码要求在6字节以上，email的格式验证，并保证用户名和email在系统中唯一，用户登录后可以进行以下操作。
3.	提供设备配置界面，可以创建或修改设备信息，包含必要信息，如设备ID、设备名称等
4.	提供设备上报数据的查询统计界面
5.	提供地图界面展示设备信息，区分正常和告警信息，并可以展示历史轨迹
6.	首页提供统计信息（设备总量、在线总量、接收的数据量等），以图表方式展示（柱状体、折线图等）
增强功能：
7.	样式适配手机端，能够在手机浏览器/微信等应用内置的浏览器中友好显示。

## 

## 项目结构

- Iot-frontend    物联网管理网站的前端
- Iot-backend      物联网管理网站的后端，包括一个订阅指定物联网终端消息的client
- Iot-client          指定物联网终端（老师提供）

此仓库为项目的前端，后端项目见 [IoT-backend](https://github.com/YdreamW/IoT-backend)


## 运行方法

### 1、启动mqtt broker

直接使用成熟的mqtt broker即可，如Mosquitto等。

注意，由于监听的端口号写死在代码里，因此最好让broker监听默认端口号



### 2、安装 MongoDB

请按照官网的教程安装MongoDB，并且将其开启在默认端口

为了测试，我提供了个人测试所用的数据。也可以通过运行老师的终端来获取数据，但是由于数据可视化中大多数是以天为单位，因此建议导入测试数据以方便运行测试。

### 3、后端： [IoT-backend](https://github.com/YdreamW/IoT-backend)

使用以下脚本运行（如果没有安装nodejs和npm的话需要先安装nodejs和npm）

```sh
cd IoT-backend
npm install
npm run dev
```

应用默认在7001端口运行。运行开始后，终端会给出反馈信息，请关注一下其端口号

![image-20210630221429072](https://YdreamW.github.io/Images/BS/image-20210630221429072.png)

如上图，由于7001端口被占用，应用监听了7002端口。<font color='red'>我们需要在前端修改代理规则</font>



### 4、Iot-client

按照老师提供的方法运行Iot-client，后端将能够接收到虚拟终端发送的信息，并且将这些数据保存到数据库中

### 5、前端： IoT-frontend

使用以下脚本运行

```sh
cd IoT-backend
npm install
npm run start
```

<font color='red'>如果后端端口不是7001，我们需要在前端修改代理规则</font>

/config/proxy 中修改代码为如下

```js
  dev: {
    '/api/': {
      target: 'http://localhost:7002/',
      changeOrigin: process.env.MOCK === 'none',
      pathRewrite: { '^/api': '' },
    },
  },
```

## 各界面介绍与功能

### 1、首页(dashboard)： 数据统计与可视化

![image-20210630223116290](https://YdreamW.github.io/Images/BS/image-20210630223116290.png)

其中面积图与折线图下方，可以通过拖动滚动条来选择数据的起止时间

### 2、设备(device)： 设备统计页

![image-20210630223158742](https://YdreamW.github.io/Images/BS/image-20210630223158742.png)

上方搜索栏中可以输入设备ID或者设备名称或者两者都输入来进行搜索。

右侧三个按钮分别可以刷新列表、修改表格密度，修改需要展示的列

![image-20210630223343336](https://YdreamW.github.io/Images/BS/image-20210630223343336.png)

每一行表示一个设备，最右边的操作来修改设备名称，在项目中<font color='red'>设备ID作为唯一标识符，因此不可修改</font>。而增加设备我认为应当由client来完成，<font color='red'>后台管理系统不应当具备增加真实存在的终端的功能</font>

拥有上下三角标识的列具有排序功能。

### 3、信息(message)： 信息统计页

![image-20210630223418354](https://YdreamW.github.io/Images/BS/image-20210630223418354.png)

对消息数据的呈现。



### 4、地图(map) ： 地图展现界面

![image-20210630223736789](https://YdreamW.github.io/Images/BS/image-20210630223736789.png)

图中红色标记表示设备告警，绿色标记表示设备正常。

白色线条上有动画，动画的方向表示设备的路径。

### 5、UI适配手机端

![image-20210630224010501](https://YdreamW.github.io/Images/BS/image-20210630224010501.png)

![image-20210630224027132](https://YdreamW.github.io/Images/BS/image-20210630224027132.png)
