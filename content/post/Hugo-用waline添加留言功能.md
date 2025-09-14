---
title: 配置waline添加留言功能
description: stack主题加载很快，但blowfish要个把小时，不理解
date: 2025-04-02
categories: ["数枝横斜"]
tags: ["Hugo"]
slug: waline
image: 
---

### 注册LeanCloud

注册地址：[https://console.leancloud.app/register（国际版）](https://console.leancloud.app/register)（如果是自己网页搜索的，注意必须注册国际版）

1. 进入控制台，点击左上角`创建应用`并起一个名字 ，这里必须选免费的开发版

2. 进入应用，点击项目左下角`设置`，再选择左下角的 `设置`、`应用凭证`，记录 **App ID**、**App Key** 和 **Master Key** 的内容。

### Vercel 部署 (服务端)

1. 部署地址：[vercel Deploy](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

2. 如果你未登录的话，Vercel 会让你注册或登录，请使用 GitHub 账户进行快捷登录。

3. 在右侧 Private Repository Name 位置输入仓库名，点击 `Create`，大概等1分钟左右，会弹出来一个**Congratulations！**的弹窗

   {{< card >}}注意：waline和你的博客在vercel是两个独立的项目{{< /card >}}

4. 点击 `Continue to Dashboard` 进入管理页面，对应项目Domains下面的 **xxx.vercel.app**就是自动分配的访问网址域名，点击可以直接进入留言区

5. 点击右上角`头像`，点击 `Dashboard` ，看到刚刚建立的项目，点击项目`右上角三个点`后再点击 `Setting` 进入设置

6. 点击左侧 `Environment Variables`，Key 处填写`LEAN_ID`, `LEAN_KEY` 和 `LEAN_MASTER_KEY` ，它们的值分别对应上一步在 LeanCloud 中获得的 `APP ID`，`APP KEY`， `Master Key`，Value 处填写`对应的内容`，最后点击 `save`

### 引入博客

#### stack主题

1. 登录 vercel，点击右上角`头像`，点击 `Dashboard`，复制 Domains 下面自动分配网址域名

2. 进入博客文件夹里的**\themes\stack\layouts\partials\comments\provider** ，将**waline.html**文件复制到对应的根目录文件夹

3. 在博客文件夹中打开 **hugo.yaml**，下拉到 **params**

   - 找到 **comments:**，将 ` provider:`修改为` provider: waline`

   - 找到**waline:**，将`serverURL:`修改为`serverURL: https://xxx.vercel.app`，将`lang:`修改为`lang: zh-CN`
   - 保存并关闭

{{< detail "测试能否正常运行" >}}

<p>编辑好文件后，在<b>donbro</b>文件夹的空白处单击右键，选择<b>Open Git Bash Here</b>，在弹出的命令行界面中输入<b>ugo server --disableFastRender</b>，如果步骤正确，会显示：</p>

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

### 推送到Github

1. 打开 Github Desktop ，登录 Github 账号

2. 点击左边 `Changes` 栏，点击文件名可以看到具体内容，勾选要同步的文件，下方 `Summary(required)` 为本次更新行为命名，再点击最下面 `Commit to main` 提交，最后点击上方第三个大黑框 `Push origin` 进行推送

### 评论管理

1. 部署完成后，请访问你的域名进行注册。首个注册的人会被设定成管理员。
2. 管理员登陆后，即可看到评论管理界面。在这里可以修改、标记或删除评论。 
3. 用户也可通过评论框注册账号，登陆后会跳转到自己的档案页。

### 添加emoji

打开 hugo.yaml，找到 waline 部分，在 `emoji:` 下面添加表情链接。示例如下：

```
waline:
            serverURL: https://***/
            lang: zh-cn
            pageview: ***
            emoji:
                - https://gcore.jsdelivr.net/gh/norevi/waline-blobcatemojis@1.0/blobs
                - https://gcore.jsdelivr.net/gh/norevi/blob-emoji-for-waline@2.0/blobs-gif
                - https://gcore.jsdelivr.net/gh/norevi/blob-emoji-for-waline@2.0/blobs-png
                - https://gcore.jsdelivr.net/gh/Saidosi/azuki-emoji-for-waline@1.0/azukisan/
            requiredMeta:
                - name
                - email
                - url
            locale:
                admin: Admin
                placeholder: