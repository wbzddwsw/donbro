---
title: "部署stack主题"
description: "尝试git没成功，所以用的是手动下载的办法"
author: "wsw"
date: 2025-04-02T11:53:59+08:00
categories: ["博客学习"]
tags: [软件操作]
draft: false
hidden: false
---

> 非常感谢[**莱特雷-letere**的教程](https://letere-gzj.github.io/hugo-stack/p/hugo/custom-blog/)，我这里只是自己的操作记录，便于日后有需要的时候回顾

### 下载stack主题

下载地址：[https://github.com/CaiJimmy/hugo-theme-stack/tags](https://github.com/CaiJimmy/hugo-theme-stack/tags)

1. 解压后将文件重命名为`stack`，并移动到**/themes**文件夹中

2. 将/stack/exampleSite中的**Content**和**hugo.yaml**复制到博客主文件夹中

3. 打开**hugo.yaml**，将theme内容修改为`stack`跟主题文件夹同名，保存退出

> 测试能否正常运行:
>
>  编辑好文件后，在博客所在文件夹的空白处单击`右键`（文件夹内必须有config.toml文件），选择`Open Git Bash Here`，在弹出的命令行界面中输入`hugo server` 如果步骤正确，会显示：
>
> ```
> Watching for changes in D:\blog\github_wsw_hugo\hugo\hugo\{archetypes,content,th
> emes}
> Watching for config changes in D:\blog\github_wsw_hugo\hugo\hugo\hugo.yaml, D:\b
> log\github_wsw_hugo\hugo\hugo\themes\stack\config.yaml
> Start building sites …
> hugo v0.145.0-666444f0a52132f9fec9f71cf25b441cc6a4f355+extended windows/amd64 Bu
> ildDate=2025-02-26T15:41:25Z VendorInfo=gohugoio
> 
> WARN  Search page not found. Create a page with layout: search.
> WARN  Archives page not found. Create a page with layout: archives.
> 
>                    | EN | ZH-CN | AR
> -------------------+----+-------+-----
>   Pages            | 47 |    18 | 21
>   Paginator pages  |  6 |     0 |  0
>   Non-page files   |  5 |     1 |  1
>   Static files     |  0 |     0 |  0
>   Processed images | 14 |     0 |  0
>   Aliases          | 22 |     7 |  9
>   Cleaned          |  0 |     0 |  0
> 
> Built in 571 ms
> Environment: "development"
> Serving pages from disk
> Running in Fast Render Mode. For full rebuilds on change: hugo server --disableF
> astRender
> Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
> Press Ctrl+C to stop
> ```
>
> 显示结果最后的http://localhost:1313就是预览网址 
### 推送到Github 
1. 打开Github Desktop，登录Github账号
2. 点击左边Changes栏，点击文件名可以看到具体内容，勾选要同步的文件，下方Summary(required)为本次更新行为命名，再点击最下面Commit to main提交，最后点击上方第三个大黑框Push origin进行推送