---
title: "Hugo-stack主题修改学习记录"
description: "这里是hugo.html文件的逐行讲解，会有一些改起来比较简单的地方东西，更复杂的自定义会单独记录"
author: "wsw"
date: 2025-04-02T14:08:36+08:00
categories: ["博客学习"]
tags: ["Hugo","stack"]
draft: false
hidden: false
---

#### 基础设置

```
baseurl: https://hugo-one-green.vercel.app/ // 博客地址
languageCode: zh-CN //语言改成中文
theme: stack //主题文件夹同名
title: 长眠动物的白天 //博客主题？
copyright: wsw //页脚的网站版权声明，写自己，也可以留空，更多自定义可以修改layouts/partials/footer.html
```

#### 默认语言、优化中日韩语

```
# Theme i18n support
# Available values: ar, bn, ca, de, el, en, es, fr, hu, id, it, ja, ko, nl, pt-br, th, uk, zh-cn, zh-hk, zh-tw //可以选择的语言
DefaultContentLanguage: zh-cn //默认语言，改成简体中文

# Set hasCJKLanguage to true if DefaultContentLanguage is in [zh-cn ja ko] // 中日韩语下面要改成ture
# This will make .Summary and .WordCount behave correctly for CJK languages.//  为了让摘要和字数统计正常运行
hasCJKLanguage: ture //改这里
```

#### hugo站点多语言设置

```
languages: 
    en:
        languageName: English
        title: Example Site
        weight: 3 
        params:
            sidebar:
                subtitle: Example description
    zh-cn:
        languageName: 中文（简体）
        title: 长眠动物的白天
        weight: 1 //权重，权重越小优先级越高，排在更前面
        params:
            sidebar: //侧边栏
                subtitle: 不作诗则做诗 //描述
    ar: //阿拉伯语，不需要这个所以我会删掉
        languageName: عربي
        languagedirection: rtl
        title: موقع تجريبي
        weight: 
        params:
            sidebar:
                subtitle: وصف تجريبي
     zh-tw: //繁体中文，我自己加上的           
        languageName: 中文（繁体）
        title: 長眠動物的白天
        weight: 2
        params:
            sidebar:
                subtitle: 不作詩則做詩       
```

#### 第三方服务，目前包含评论系统和谷歌分析（已经单独记录怎么配置waline评论，所以这段跳过）

```
services: 
    # Change it to your Disqus shortname before using
    disqus:
        shortname: "hugo-theme-stack"
    # GA Tracking ID
    googleAnalytics:
        id:
```

#### 文章分页和永久链接

```
pagination: //每页显示几个分页链接，比如1 2 3 … 10
    pagerSize: 3

permalinks: //slug是文章别名，可以在属性中设置
    post: /p/:slug/ //生成文章网址http://博客名.com/p/别名/，p可以随意替换，比如改成page
    page: /:slug/ //生成独立页面网址http://博客名.com/别名/
```

#### params //主题配置自定义参数

##### 文章分类、特色图片、RSS、站点图标、页脚信息

```
mainSections: //主页展示的主要内容分类
        - post //主页显示post目录下的文章
        - new //可以自己加，这是举个例子，这样主页就会显示这两个目录
    featuredImageField: image //
    rssFullContent: true //订阅RSS的用户可以看到全文，改成false则只显示摘要，需访问网站才能阅读全文
    favicon: # e.g.: favicon placed in `static/favicon.ico` of your site folder, then set this field to `/favicon.ico` (`/` is necessary) //网站图标，要把favicon.ico文件放到static/目录下，如果图片是png那这里也要改

    footer: //页脚
        since: 2025 //网站的起始年份，改成博客创建年份
        customText: 早上中午晚上好~ //自定义文本，可以留空
```

##### 日期格式、侧边栏、文章

```
dateFormat: //日期格式
    published: Jan 02, 2006 //文章发布日期
    lastUpdated: Jan 02, 2006 15:04 MST //最后更新日期

sidebar: //侧边栏
    emoji: 🦊 //侧边栏顶部表情，表情符号列表：getemoji.com
    subtitle: Lorem ipsum dolor sit amet, consectetur adipiscing elit. //副标题，可以自定义替换
    avatar: //头像
        enabled: true //是否启用，false表示不启用
        local: true // 是否使用本地储存图片
        src: img/avatar.png //图片路径

article: //文章
    math: false //是否启用数学公式支持
    toc: true // 是否启用文章目录
    readingTime: true //是否显示阅读时间（根据字数估算）
    license: //文章版权信息
        enabled: true //是否启用
        default: Licensed under CC BY-NC-SA 4.0 //默认的版权许可协议
```

##### comments //评论

###### 多个评论系统的集成配置展示 //未启用，跳过

```
 enabled: true //是否启用评论功能
        provider: waline //评论系统，这里是自己选的waline

        disqusjs: //未启用
            shortname:
            apiUrl:
            apiKey:
            admin:
            adminLabel:

        utterances: //未启用
            repo:
            issueTerm: pathname
            label:

        beaudar: //未启用
            repo:
            issueTerm: pathname
            label:
            theme:

        remark42: //未启用
            host:
            site:
            locale:

        vssue: //未启用
            platform:
            owner:
            repo:
            clientId:
            clientSecret:
            autoCreateIssue: false
```

###### waline评论系统的设置

```
# Waline client configuration see: https://waline.js.org/en/reference/component.html //网站指路
        waline:
            serverURL: https://liuyan-ochre.vercel.app //服务端的url，自己部署的
            lang: zh-CN //语言
            pageview: ture //查看计数功能，可以留空不启用
            emoji: //表情包
                - https://unpkg.com/@waline/emojis@1.0.1/weibo //一个微博表情包链接
            requiredMeta: //评论是需要的元数据，用户必须提供的
                - name //姓名
                - email //电子邮件
                - url //个人网站链接
            locale:
                admin: 博主
                placeholder:你好~ //评论区占位符文本，可留空
```

###### 多种评论系统的配置

```
twikoo: //未启用
      envId:
      region:
      path:
      lang:
            
# See https://cactus.chat/docs/reference/web-client/#configuration for description of the various options
cactus: //未启用
       defaultHomeserverUrl: "https://matrix.cactus.chat:8448"
       serverName: "cactus.chat"
       siteName: "" # You must insert a unique identifier here matching the one you registered (See https://cactus.chat/docs/getting-started/quick-start/#register-your-site)

giscus: //未启用
       repo:
       repoID:
       category:
       categoryID:
       mapping:
       lightTheme:
       darkTheme:
       reactionsEnabled: 1
       emitMetadata: 0

gitalk: //未启用
       owner:
       admin:
       repo:
       clientID:
       clientSecret:
       proxy:
        
cusdis: //未启用
       host:
       id:
```

##### 小部件配置

```
widgets: //小部件
      homepage: //首页
            - type: search //搜索框
            - type: archives //归档 准备改名文章并保留左边，所以这里我会删除
              params:
                  limit: 5 //最多显示5个项目
            - type: categories //分类 这个也准备保留左边，删除
              params:
                  limit: 10 //最多显示10个项目
            - type: tag-cloud //标签云 保留左边，删除
              params:
                  limit: 10 //最多显示10个项目
        page: //文章
            - type: toc //文章页面显示目录
```

##### 自定义在Twitter等平台分享博客链接时的显示效果

```
opengraph:
        twitter:
            # Your Twitter username
            site: //用户名，填写格式为@name

            # Available values: summary, summary_large_image
            card: summary_large_image //卡片类型，这里是包含大图的摘要卡片

defaultImage:
        opengraph:
            enabled: false //是否开启Open Graph图片功能
            local: false //是否使用本地图片
            src: //如果启用，在这里放图片源链接
```

##### 颜色模式切换、主题优化图片

```
colorScheme: //颜色模式
        # Display toggle
        toggle: true //启用切换

        # Available values: auto, light, dark
        default: auto //根据操作系统调整

imageProcessing: //主题能否处理封面、文章中的1图片
        cover: //封面
            enabled: true
        content: //文章内容
            enabled: true
```

#### menu

```
### Custom menu
### See https://stack.jimmycai.com/config/menu
### To remove about, archive and search page menu item, remove `menu` field from their FrontMatter  //从菜单中移除about、archive和search：在FrontMatter中删除对应的menu：main字段
menu:
    main: [] //主要导航菜单

    social: //社交媒体菜单
        - identifier: github  //identifier是标识符
          name: GitHub //鼠标移动到图标上时显示的文本
          url: https://github.com/wbzddwsw/hugo //点击跳转到这里
          params:
              icon: brand-github //图标名称
          weight: 1 //权重，数字越小排越前面，这是自己加的

        - identifier: twitter
          name: Twitter
          url: https://twitter.com
          params:
              icon: brand-twitter
          weight: 2     
         
         - identifier: stelpolva  //星屑主页，自己加的
          name: stelpolva
          url: https://stelpolva.moe/@donbro
          params:
              icon: "star-regular"
          weight: 3
```
> 怎么给链接改图标，以及为新建链接添加图标：（这里只记录最简单的方法）
>
> 1. 打开[https://fontawesome.com](https://fontawesome.com/)，点击上方第三个`Icons`，进入图标页
> 2. 输入你想要的图标的关键词，比如我这里输入`star`，点开想要的图标
> 3. 弹出框右上角有个下载图标，是**Download SVG File**，点击下载
> 4. 将下载好的SVG文件移动到博客文件夹下的**xx\themes\stack\assets\icons**
> 5. 复制这个SVG文件名，粘贴到上面的对应的**icon: **后面（英文冒号+空格）
#### 相关文章推荐

```
related:
    includeNewer: true //是否包含比当前文章更新的内容
    threshold: 60 //最低相关度得分
    toLower: true //ture忽略大小写，false严格区分大小写
    indices:
        - name: tags
          weight: 100 //标签匹配权重

        - name: categories
          weight: 200 //分类匹配权重，权重越高越容易被推荐
          
        - name: name //还可以自己增加按名字相似度推荐等
          weight: 200 
```

#### markdown解析器设置

```
markup:
    goldmark:
        extensions:
            passthrough:
                enable: true //开启特殊标记的直通功能
                delimiters:
                    block:
                        - - \[
                          - \] //允许 `$begin:math:display$ ... $end:math:display$` 作为数学公式的块级分隔符
                        - - $$
                          - $$ //允许 `$$ ... $$` 作为数学公式的块级分隔符
                    inline:
                        - - \(
                          - \) //允许 `$begin:math:text$ ... $end:math:text$` 作为数学公式的行内分隔符
        renderer:
            ## Set to true if you have HTML content inside Markdown
            unsafe: true //允许使用html代码
    tableOfContents: //目录设置
        endLevel: 6 //目录包含的最大级别
        ordered: true //是否使用有序列表
        startLevel: 1 //目录起始标题级别
    highlight: //代码高亮
        noClasses: false //使用CSS类
        codeFences: true //使用markdown代码块
        guessSyntax: true //自动检测代码语言
        lineNoStart: 1 //行号从1开始
        lineNos: true //启用行号
        lineNumbersInTable: true //行号放在表格里
        tabWidth: 4 //Tab键的宽度
```
