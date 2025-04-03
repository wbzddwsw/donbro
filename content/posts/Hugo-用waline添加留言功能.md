---
title: "用waline添加留言功能"
description: "本记录基于stack主题"
author: "wsw"
date: 2025-04-02T11:55:04+08:00
categories: ["博客学习"]
tags: [软件操作]
draft: false
hidden: false
---

# 注册LeanCloud

注册地址：[https://console.leancloud.app/register（国际版）](https://console.leancloud.app/register)（如果是自己网页搜索的，注意必须注册国际版）

进入控制台，点击左上角`创建应用`并起一个名字 ，这里必须选免费的开发版

进入应用，点击项目左下角`设置`，再选择左下角的 `设置`、`应用凭证`，记录**App ID**、**App Key**和**Master Key**的内容。

# Vercel 部署 (服务端)

如果已有账号请直接从第三步开始

1. 注册Verce：[https://vercel.com](https://vercel.com)，点击右上角`Sign Up`，选择`  I'm working on personal projects`（hobby），给自己取个名字，再点击`Continue`

2. 选择`使用Github账号注册`，登录前面注册的github账号，弹出授权窗口时，点击`Authorize Vercel`

3. 在Let's build something new页面，点击右边Clone Template项目下方的`Browse All Templates`，左边搜索栏输入`hugo`，会出现**Hugo Starter**项目，点开

   > 如果没有看到这个界面，点击右上角`头像`，点击`Dashboard`，点击右上角黑色的`Add New project`

4. 点击左边`Deploy`，点击**Git Scope**的`下拉列表`，点击`Add GitHub Org or Account`，弹出安装窗口，点击`Install`

5. 在Git Scope下拉列表中点击`你的Github账户`，在右侧Private Repository Name位置输入仓库名，我这里输入liuyan，点击`Create`，大概等1分钟左右，会弹出来一个**Congratulations！**的弹窗，代表Vercel已经自动搭建好一个Hugo博客

6. 点击`Continue to Dashboard`进入管理页面，对应项目Domains下面的**liuyan-ochre.vercel.app**就是自动分配的访问网址域名，点击可以直接进入留言区

7. 点击右上角`头像`，点击`Dashboard`，看到刚刚建立的Hugo项目，点击项目`右上角三个点`后再点击`Setting`进入设置

8. 点击左侧`Environment Variables`，Value处填写`App ID`、`App Key`和`Master Key`版本号，key处填写`对应的内容`，最后点击`save`

# 引入博客

1. 登录vercel，点击右上角`头像`，点击`Dashboard`，复制Domains下面自动分配网址域名

2. 进入博客文件夹里的**D:xx\themes\stack\layouts\partials\comments\provider**，确认有**waline.html**文件

   > 如果没有waline.html文件要自己创建：
   >
   > 1. 打开VScode，右上角新建文件，将下面的代码复制粘贴进去
   > ```
   > <div id="waline"></div>
   > <script src="https://cdn.jsdelivr.net/npm/@waline/client"></script>
   > <script>
   >   Waline.init({
   >       el: '#waline',
   >       serverURL: '{{ site.Params.comments.waline.serverURL }}',
   >       dark: '{{ site.Params.comments.waline.dark }}',
   >       lang: '{{ site.Params.comments.waline.lang }}',
   >       emoji: {{ site.Params.comments.waline.emoji | jsonify }}, 
   >     });
   > </script>
   > ```
   > 2. 将文件另存为`waline.html`,保存地址为**D:xx\themes\stack\layouts\partials\comments\provider**

3. 在博客文件夹中打开**hugo.yaml**，下拉到**params**

   - 找到**comments:**，将` provider:`修改为` provider: waline`

   - 找到**waline:**，将`serverURL:`修改为`serverURL: https://你的留言项目域名.vercel.app`，将`lang:`修改为`lang: zh-CN`
   - 保存并关闭
>测试能否正常运行：
>
>编辑好文件后，在博客所在文件夹的空白处单击`右键`（文件夹内必须有config.toml文件），选择`Open Git Bash Here`，在弹出的命令行界面中输入`hugo server --disableFastRender`，如果步骤正确，会显示：
>
>```
>Watching for changes in D:\blog\github_wsw_hugo\hugo\hugo\{archetypes,content,th
>emes}
>Watching for config changes in D:\blog\github_wsw_hugo\hugo\hugo\hugo.yaml, D:\b
>log\github_wsw_hugo\hugo\hugo\themes\stack\config.yaml
>Start building sites …
>hugo v0.145.0-666444f0a52132f9fec9f71cf25b441cc6a4f355+extended windows/amd64 Bu
>ildDate=2025-02-26T15:41:25Z VendorInfo=gohugoio
>
>WARN  Search page not found. Create a page with layout: search.
>WARN  Archives page not found. Create a page with layout: archives.
>
>                   | EN | ZH-CN | AR
>-------------------+----+-------+-----
>  Pages            | 47 |    18 | 21
>  Paginator pages  |  6 |     0 |  0
>  Non-page files   |  5 |     1 |  1
>  Static files     |  0 |     0 |  0
>  Processed images | 14 |     0 |  0
>  Aliases          | 22 |     7 |  9
>  Cleaned          |  0 |     0 |  0
>
>Built in 614 ms
>Environment: "development"
>Serving pages from disk
>Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
>Press Ctrl+C to stop
>```
>
>显示结果最后的http://localhost:1313就是预览网址
# 推送到Github
1. 打开Github Desktop，登录Github账号

2. 点击左边`Changes`栏，点击文件名可以看到具体内容，勾选要同步的文件，下方`Summary(required)`为本次更新行为命名，再点击最下面`Commit to main`提交，最后点击上方第三个大黑框`Push origin`进行推送

# 评论管理

1. 部署完成后，请访问你的域名进行注册。首个注册的人会被设定成管理员。
2. 管理员登陆后，即可看到评论管理界面。在这里可以修改、标记或删除评论。 
3. 用户也可通过评论框注册账号，登陆后会跳转到自己的档案页。