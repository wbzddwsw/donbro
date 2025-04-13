---
title: "短代码应用"
description: ""
date: 2025-04-11T15:28:13+08:00
categories: ["未分类"]
tags: []
slug: 
image: 
draft: 
---

### 高亮标记

{{< mark text="好喜欢蓝色！" >}}

### 折叠

{{< detail "叠叠乐" >}}
<p>这是第一个段落的内容。</p>

<p>这是第二个段落的内容，位于折叠部分，实际使用别忘了双括号！</p>
{{< /detail >}}

### 模糊

<span class="blur">一些手动打码效果！<br>但总之换行的话就加个空标签。</span>

### 黑色打码

<span class="shady">数据删除！数据删除！<br>但总之换行的话就加个空标签。</span>

### 抖动

{{< shake effect="shake" >}}这是基本的摇晃效果。{{< /shake >}}
{{< shake effect="shake-hard" >}}这个段落有剧烈摇晃效果。{{< /shake >}}
{{< shake effect="shake-slow" >}}这个段落有慢速摇晃效果。{{< /shake >}}
{{< shake effect="shake-little" >}}这个段落有轻微摇晃效果。{{< /shake >}}
{{< shake effect="shake-horizontal" >}}这个段落有水平摇晃效果。{{< /shake >}}
{{< shake effect="shake-vertical" >}}这个段落有垂直摇晃效果。{{< /shake >}}
{{< shake effect="shake-rotate" >}}这个段落有旋转摇晃效果。{{< /shake >}}
{{< shake effect="shake-opacity" >}}这个段落有透明度变化摇晃效果。{{< /shake >}}
{{< shake effect="shake-crazy" >}}这个段落有疯狂摇晃效果。{{< /shake >}}
{{< shake effect="shake-freeze" >}}这个段落在悬停时冻结。{{< /shake >}}
{{< shake effect="shake-constant" >}}这个段落持续摇晃。{{< /shake >}}

### 渐变

<font class="colorfulfont"> 我挑的配色很好看吧！<br>好喜欢蓝色（再次）（再次）<br> 但总之换行的话就加个空标签。</font>

### 文字位置

{{< align left "文字居左" >}}
{{< align center "文字居中" >}}
{{< align right "文字居右" >}}

### 引用

{{< blockquote author="作者" link="也可以不加啦" title="作品名" >}}
这里写引用内容，实际使用记得换成双括号。
{{< /blockquote >}}

### 中心引用

{{< quote-center >}}
左右两边的符号可以自定义<br>使用需要双括号<br>换行需要空标签
{{< /quote-center >}}

### 键盘样式

<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd>

### 评分

{{< rating 10 7 >}}

### 卡片链接

{{< card >}}
可以在这里插入链接假装是卡片式链接。
<br>
好像不能插入图片？
<br>
换行需要空标签。实际使用需要双括号。
{{< /card >}}

### 时间轴

{{< timeline date="2025-04-01" title="新建博客" description="成功了好耶！" tags="试试"  >}}

{{< timeline date="2025-04-02" title="场吃得好" description="充不了电补充进来！" tags="到的"  >}}

### 图片轮播

{{< imgloop "https://chatstorage.dvd.moe/dvdchat/dvdchat/b1211ddb-eb79-481d-b419-7123be01831f.jpg, https://chatstorage.dvd.moe/dvdchat/dvdchat/44e51c87-6651-441d-8dc3-e188f9f30d8e.jpg, https://chatstorage.dvd.moe/dvdchat/dvdchat/dc679c68-35cd-4492-87cc-c3ba485219d7.jpg" >}}

### 对话框

{{< message from="self" accountID="twitter/昵称" images="https://chatstorage.dvd.moe/dvdchat/dvdchat/b1211ddb-eb79-481d-b419-7123be01831f.jpg" timestamp="2025-04-01" name="我" >}}这里是自定义的信息内容。 {{< /message >}}

{{< message accountID="twitter/昵称" images="https://chatstorage.dvd.moe/dvdchat/dvdchat/b1211ddb-eb79-481d-b419-7123be01831f.jpg" timestamp="2025-04-01" name="你" >}}这是恢复。 {{< /message >}} 

### neodb

{{< neodb "https://neodb.social/review/7AcUGiNj8fChCFegRKsF7t" >}}{{< /neodb >}}
