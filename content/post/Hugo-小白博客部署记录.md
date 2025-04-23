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

## 下载软件，注册账号

1. Hugo 下载地址：[https://github.com/gohugoio/hugo/releases](https://github.com/gohugoio/hugo/releases)

   打开链接后往下拉，找到 **Assets** ，下载最新的带 **extended** 的版本，或者直接点 [hugo_extended_0.145.0_windows-amd64.zip](https://github.com/gohugoio/hugo/releases/download/v0.145.0/hugo_extended_0.145.0_windows-amd64.zip) 下载

   下载后解压到解压博客文件夹在的位置，比如说，我在 D 盘建了一个 blog 文件，那么解压后的 hugo 文件夹就要移动到这个 blog 文件夹里（后文举例都用这个）

2. Git 下载地址：[https://git-scm.com](https://git-scm.com)

   打开链接后点击 `Download for Windows` ，下载 64-bit Git for Windows Setup ，或者直接点 [Git-2.49.0-64-bit.exe](https://github.com/git-for-windows/git/releases/download/v2.49.0.windows.1/Git-2.49.0-64-bit.exe) 下载

   下载后安装，安装路径随意，一直点下一步直到安装成功

3. Github账号 注册网址：[https://github.com](https://github.com)

   最好用谷歌邮箱，或者别的国外邮箱

4. Github Desktop 下载地址：[https://github.com/apps/desktop](https://github.com/apps/desktop)

5. VScode 下载地址：[https://code.visualstudio.com](https://code.visualstudio.com)

   下载后点击左下角`设置`，再点击 `Extensions`（扩展），搜索 Chinese Language Pack for Visual Studio Code（汉化） 和 Markdown All in One 插件，点击 install 安装

   {{< detail "启动汉化插件" >}}
   
   <p><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>打开命令搜索框，输入<b> configure language </b>，点击<b> Display language </b>，点击<b>中文（简体）</b>，在弹出框中点<b> Restart </b>重启 VScode </p>
   
   {{< /detail >}}
   

## 安装HUGO

Hugo.exe 放在 D 盘的 blog 文件中，可以从文件上方看到文件路径为 **D:\blog\hugo_extended_0.145.0_windows-amd64** ，在地址栏复制路径

1. <kbd>win</kbd>+<kbd>R</kbd>，输入`sysdm.cpl`，按<kbd>ENTER</kbd>回车
2. 进入**高级**选项卡，点击`环境变量`
3. 在**系统变量**部分，找到 **Path 变量**，点击`编辑`
4. 在**编辑环境变量**窗口中，点击`新建`，然后将上面的路径粘贴到这里
5. 依次点**确定**关闭所有窗口

{{< detail "测试是否成功" >}}

<p>在D:\blog中任意空白处<b>右键</b>，点击<b>Open Git Bash Here</b>，在弹出的命令行界面中输入<b>hugo version</b>，如果步骤正确，会显示：</p>

<pre><code class="code-highlight"><span class="code-line line-number" line="1">hugo v0.145.0-666444f0a52132f9fec9f71cf25b441cc6a4f355+extended windows/amd64 BuildDate=2025-02-26T15:41:25Z VendorInfo=gohugoio
</span></code></pre>

<p>显示结果中的<b>0.145.0</b>是hugo的版本号，后面需要用</p>

{{< /detail >}}

## 搭建博客

1. 注册Verce：[https://vercel.com](https://vercel.com)，点击右上角 `Sign Up` ，选择 `I'm working on personal projects`（hobby），给自己取个名字，再点击 `Continue`

2. 选择`使用 Github 账号注册`，登录前面注册的github账号，弹出授权窗口时，点击 `Authorize Vercel`

3. 在 Let's build something new 页面，点击右边 Clone Template 项目下方的 `Browse All Templates` ，左边搜索栏输入 `hugo`，会出现 **Hugo Starter** 项目，点开

   {{< card >}}如果没有看到这个界面，点击右上角`头像`，点击 `Dashboard`，点击右上角黑色的 `Add New project`{{< /card >}}

4. 点击左边 `Deploy`，点击 **Git Scope**的`下拉列表`，点击 `Add GitHub Org or Account`，弹出安装窗口，点击 `Install`

5. 在Git Scope下拉列表中点击`你的Github账户`，在右侧 Private Repository Name 位置输入仓库名，我这里输入 donbro <mark>（这个名字很重要！它决定了博客的域名！）</mark>，点击 `Create` ，大概等1分钟左右，会弹出来一个<b>Congratulations！</b>的弹窗，代表 Vercel 已经自动搭建好一个 Hugo 博客

6. 点击 `Continue to Dashboard` 进入管理页面，Domains下面的 **donbro.vercel.app** 就是自动分配的访问网址域名，点击可以直接进入博客

7. 点击右上角`头像`，点击 `Dashboard`，看到刚刚建立的 Hugo 项目，点击项目`右上角三个点`后再点击 `Setting` 进入设置

8. 点击左侧 `Environment Variables` ，key 处填写 `HUGO_VERSION`，Value 处填写`版本号`(上面写了怎么查)，最后点击 `save`

## 推送到Github

这个博客更新的顺序是，你在本地新建一篇md文件，然后通过 github Desktop 同步更新到 Github，然后再更新到你的博客域名

1. 打开 Github Desktop，登录 Github 账号，选择 `Clone a repository from the internet…`（也就是把刚刚在 vercel 建立的项目克隆到 github ）
2. 跳出的 Clone a repository 弹框中，注意下面的 **Local path**，确认选择的是自动建立的 donbro 空文件夹
3. 点击左边 `Changes` 栏，点击文件名可以看到具体内容，`勾选要同步的文件`，下方 `Summary(required)` 为本次更新行为命名，再点击最下面 `Commit to main` 提交，最后点击上方第三个大黑框 `Push origin` 进行推送
4. 登录 github 网页，点击右上角`头像`，选择 `Your repositories` ，点击 `donbro` 仓库，左边是更新记录和文件，右边可以看到一个蓝色链接 [donbro.vercel.app](https://donbro.vercel.app/) ，点击就可以进入博客，也可以从vercel项目中进入

{{< detail "如果你想在同步到 github 之前预览效果" >}}

<p>编辑好文件后，在<b>donbro</b>文件夹的空白处单击右键，选择<b>Open Git Bash Here</b>，在弹出的命令行界面中输入<b>hugo server</b>，如果步骤正确，会显示：</p>

<pre><code class="code-highlight"><span class="code-line line-number" line="1">Watching for changes in D:\blog\github_wsw_hugo\donbro\{archetypes,content,theme
s}
Watching for config changes in D:\blog\github_wsw_hugo\donbro\config.toml
Start building sites …
hugo v0.145.0-666444f0a52132f9fec9f71cf25b441cc6a4f355+extended windows/amd64 Bu
ildDate=2025-02-26T15:41:25Z VendorInfo=gohugoio


          | ZH-CN
-------------------+--------
Pages            |    11
Paginator pages  |     0
Non-page files   |     0
Static files     |    11
Processed images |     0
Aliases          |     0
Cleaned          |     0

Built in 110 ms
Environment: "development"
Serving pages from disk
Running in Fast Render Mode. For full rebuilds on change: hugo server --disableF
astRender
Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
Press Ctrl+C to stop
</span></code></pre>

<p>显示结果最后的 http://localhost:1313 就是预览网址</p>

{{< /detail >}}

## 新建文章

在 **donbro** 文件夹的空白处单击右键，选择 `Open Git Bash Here`，在弹出的命令行界面中输入 `hugo new posts/文章名字.md`，回车后，hugo 会在 **\donbro\content\posts** 文件夹中创建一个新的 md 文件，用 Markdown 编辑器（比如 Tyopa ）打开后，就可以写文章了

### 文章属性模板

用以指定文章的标题、分类、Tag等，打开 **\donbro\content\posts\archetypes** 文件夹下的 `default.md` 文件，将下面的代码粘贴进去，不需要的属性可以自由删除：

```
title: "{{ replace .Name "-" " " | title }}"
author: ""
description: "" //描述
date: {{ .Date }}
categories: [""] //分类
tags: ["",""] //标签
draft: false //草稿，填true则不显示在博客中
image： //略缩图链接
slug： //别名，分享文章链接时用，建议别用汉字
```
{{< card >}}提示：单击右键，选择`Open Git Bash Here`，然后在git中输入命令的前提是，<mark>右键时文件夹内必须有config.toml文件</mark>。{{< /card >}}

## 安装主题

其实这篇流水账记录到上面就已经结束了，剩下的是更复杂的花里胡哨部分~

在此附上Hugo主题下载网址：[https://themes.gohugo.io/](https://themes.gohugo.io/)，大（剩）家（下）自（的）由（我）发（不）挥（会）吧（了）！