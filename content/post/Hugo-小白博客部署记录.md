---
title: Hugo-小白博客部署记录
description: 由于本人没有相关理论知识储备，所以这篇文章不包含原理讲解
date: 2025-04-02T01:00:56+08:00
categories: ["数枝横斜"]
tags: ["Hugo"]
slug: hugo
image: https://chatstorage.dvd.moe/dvdchat/dvdchat/8114f986-0e3a-4b7d-b8fc-65865cd5f636.jpg
---

> 感谢[“小球飞鱼”的教程](https://mantyke.icu/posts/2021/hugo-build-blog/)，以及在这个过程提供帮助的各位朋友。
>

#### 下载软件，注册账号

1. Hugo 下载地址：[https://github.com/gohugoio/hugo/releases](https://github.com/gohugoio/hugo/releases)

   打开链接后往下拉，找到**Assets**，下载最新的带**extended**的版本，或者直接点[hugo_extended_0.145.0_windows-amd64.zip](https://github.com/gohugoio/hugo/releases/download/v0.145.0/hugo_extended_0.145.0_windows-amd64.zip)下载

   下载后解压到解压博客文件夹在的位置，比如说，我在D盘建了一个blog文件，那么解压后的hugo文件夹就要移动到这个blog文件夹里（后文举例都用这个）

2. Git 下载地址：[https://git-scm.com](https://git-scm.com)

   打开链接后点击`Download for Windows`，下载64-bit Git for Windows Setup，或者直接点[Git-2.49.0-64-bit.exe](https://github.com/git-for-windows/git/releases/download/v2.49.0.windows.1/Git-2.49.0-64-bit.exe)下载

   下载后安装，安装路径随意，一直点下一步直到安装成功

3. Github账号 注册网址：[https://github.com](https://github.com)

   最好用谷歌邮箱，或者别的国外邮箱

4. Github Desktop 下载地址：[https://github.com/apps/desktop](https://github.com/apps/desktop)

5. VScode 下载地址：[https://code.visualstudio.com](https://code.visualstudio.com)

   下载后点击左下角`设置`，再点击`Extensions`（扩展），搜索Chinese Language Pack for Visual Studio Code（汉化） 和Markdown All in One插件，点击install安装

   > 汉化插件启动：快捷键【Ctrl+Shift+P】打开命令搜索框，输入【configure language】,点击【Display language】这行，点击【中文（简体）】这行，在弹出框中点【Restart】重启VScode

#### 安装HUGO

Hugo.exe放在D盘的blog文件中，可以从文件上方看到文件路径为**D:\blog\hugo_extended_0.145.0_windows-amd64**，在地址栏复制路径

1. 【win+R】，输入`sysmd.cpl`，按回车
2. 进入**高级**选项卡，点击`环境变量`
3. 在**系统变量**部分，找到**Path变量**，点击`编辑`
4. 在**编辑环境变量**窗口中，点击`新建`，然后将上面的路径粘贴到这里
5. 依次点**确定**关闭所有窗口

> 测试是否成功：（命令窗口复制粘贴只能右键，不能用快捷键）
>
> 在**D:\blog**中任意空白处`右键`，点击`Open Git Bash Here`，在弹出的命令行界面中输入`hugo version`，如果步骤正确，会显示：
>
> ```
> hugo v0.145.0-666444f0a52132f9fec9f71cf25b441cc6a4f355+extended windows/amd64 BuildDate=2025-02-26T15:41:25Z VendorInfo=gohugoio
> ```
>
> 显示结果中的**0.145.0**是hugo的版本号，后面需要用

#### 搭建博客

1. 注册Verce：[https://vercel.com](https://vercel.com)，点击右上角`Sign Up`，选择`  I'm working on personal projects`（hobby），给自己取个名字，再点击`Continue`

2. 选择`使用Github账号注册`，登录前面注册的github账号，弹出授权窗口时，点击`Authorize Vercel`

3. 在Let's build something new页面，点击右边Clone Template项目下方的`Browse All Templates`，左边搜索栏输入`hugo`，会出现**Hugo Starter**项目，点开

   > 如果没有看到这个界面，点击右上角`头像`，点击`Dashboard`，点击右上角黑色的`Add New project`

4. 点击左边`Deploy`，点击**Git Scope**的`下拉列表`，点击`Add GitHub Org or Account`，弹出安装窗口，点击`Install`

5. 在Git Scope下拉列表中点击`你的Github账户`，在右侧Private Repository Name位置输入仓库名，我这里输入donbro<mark>（这个名字很重要！它决定了博客的域名！）</mark>，点击`Create`，大概等1分钟左右，会弹出来一个**Congratulations！**的弹窗，代表Vercel已经自动搭建好一个Hugo博客

6. 点击`Continue to Dashboard`进入管理页面，Domains下面的**donbro.vercel.app**就是自动分配的访问网址域名，点击可以直接进入博客

7. 点击右上角`头像`，点击`Dashboard`，看到刚刚建立的Hugo项目，点击项目`右上角三个点`后再点击`Setting`进入设置

8. 点击左侧`Environment Variables`，key处填写`HUGO_VERSION`，Value处填写`版本号`(上面写了怎么查)，最后点击`save`

#### 推送到Github

这个博客更新的顺序是，你在本地新建一篇md文件，然后通过github Desktop同步更新到Github，然后再更新到你的博客域名

1. 在D盘的blog文件夹中新建一个名为**donbro** 的<mark>空</mark>文件夹，这里特意和vercel的项目同名是为了方便自己看
2. 打开Github Desktop，登录Github账号，选择`Clone a repository from the internet…`（也就是把刚刚在vercel建立的项目克隆到github）
3. 跳出的Clone a repository弹框中，注意下面的**Local path**，这里要点击左边的`choose`选择刚刚新建的donbro空文件夹
4. 点击左边`Changes`栏，点击文件名可以看到具体内容，`勾选要同步的文件`，下方`Summary(required)`为本次更新行为命名，再点击最下面`Commit to main`提交，最后点击上方第三个大黑框`Push origin`进行推送
5. 登录github网页，点击右上角`头像`，选择`Your repositories`，点击`donbro`仓库，左边是更新记录和文件，右边可以看到一个蓝色链接[donbro.vercel.app](https://donbro.vercel.app/)，点击就可以进入博客，也可以从vercel项目中进入

> 如果你想在同步到github之前预览效果：
>
> 编辑好文件后，在**D:\blog\github_wsw_hugo\donbro**文件夹的空白处单击右键，选择`Open Git Bash Here`，在弹出的命令行界面中输入`hugo server`，如果步骤正确，会显示：
>
> ```
> Watching for changes in D:\blog\github_wsw_hugo\donbro\{archetypes,content,theme
> s}
>Watching for config changes in D:\blog\github_wsw_hugo\donbro\config.toml
> Start building sites …
>hugo v0.145.0-666444f0a52132f9fec9f71cf25b441cc6a4f355+extended windows/amd64 Bu
> ildDate=2025-02-26T15:41:25Z VendorInfo=gohugoio
> 
> 
>              | ZH-CN
> -------------------+--------
> Pages            |    11
> Paginator pages  |     0
> Non-page files   |     0
> Static files     |    11
>    Processed images |     0
> Aliases          |     0
> Cleaned          |     0
> 
> Built in 110 ms
> Environment: "development"
> Serving pages from disk
> Running in Fast Render Mode. For full rebuilds on change: hugo server --disableF
> astRender
> Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
> Press Ctrl+C to stop
> ```
> 
> 显示结果最后的[http://localhost:1313](http://localhost:1313)就是预览网址

#### 新建文章

在**D:\blog\github_wsw_hugo\donbro**文件夹的空白处单击右键，选择`Open Git Bash Here`，在弹出的命令行界面中输入`hugo new posts/文章名字.md`，回车后，hugo会在**D:\blog\github_wsw_hugo\donbro\content\posts**文件夹中创建一个新的md文件，用Markdown编辑器（比如Tyopa）打开后，就可以写文章了

> 文章属性模板：用以指定文章的标题、分类、Tag、是否为草稿、是否隐藏等属性。
>
> 打开**D:\blog\github_wsw_hugo\donbro\content\posts\archetypes**文件夹下的`default.md`文件，将下面的代码粘贴进去，不需要的属性可以自由删除（【】内是解释，请自行删除）
>```
>---
>title: "{{ replace .Name "-" " " | title }}"【用git新建文章会自动填写】
>author: ""【作者，建议填入本人名字默认】
>description: ""【描述】
>date: {{ .Date }}【自动填写建立时间】
>categories: [""]【分类】
>tags: ["",""]【标签】
>draft: 【是否为草稿，可以填false/ture默认，或者每次新建文件自行填写】
>hidden: 【是否隐藏，可以填false/ture默认，或者每次新建文件自行填写】
>---
>```

> 提示：单击右键，选择`Open Git Bash Here`，然后在git中输入命令的前提是，<mark>右键时文件夹内必须有config.toml文件</mark>。

#### 安装主题

其实这篇流水账记录到上面就已经结束了，剩下的是更复杂的花里胡哨部分~

在此附上Hugo主题下载网址：[https://themes.gohugo.io/](https://themes.gohugo.io/)，大（剩）家（下）自（的）由（我）发（不）挥（会）吧（了）！