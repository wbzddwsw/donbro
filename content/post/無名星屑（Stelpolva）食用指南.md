---
title: "無名星屑（Stelpolva）食用指南"
description: "之前用星屑的页面功能写过，为了更加方便看所以搬过来（等等星屑不要科学上网但是博客要，这样真的会更方便吗……）"
date: 2025-04-09T09:52:03+08:00
categories: ["小径指北"]
tags: ["Misskey"]
slug:  Stelpolva
image: 
---

> 本文发出以后没多久，得知 sharky 进行了一个大版本的更新，因此顺势改了一些……
>
> 本指南适用于<mark>2025.5.0-dev-stelpolva</mark>

我所在的星屑站有很多“魔改”代码，许多新来的朋友对于一些没见过的功能难免摸不着头脑，我自己也用得迷迷糊糊，因此最开始萌生了写一篇食用指南的想法。

经过几次修改，目前 misskey 的基础功能介绍放在[Misskey食用指南](https://donbro.vercel.app/p/misskey/)，本文是星屑专属的进阶版，如果是第一次使用 misskey 的朋友，推荐先看那篇哦。

### 邀请码

![好耶好耶](https://chatstorage.dvd.moe/dvdchat/dvdchat/3dacf8dc-391e-4a8c-8e86-8890f13a99a7.png)

如果你的主页有“好耶好耶”，则表示你可以点击`左上角站点图标-邀请`生成邀请码，达成要求有两条：

1. 注册星屑账号7天
2. 发布了100个帖子

每30天最多拥有1个邀请码，每个邀请码有效时间1个月，如果旧的邀请码没用或者没过期，30天后也不会生成新的

### 投稿窗口

![发帖框](https://chatstorage.dvd.moe/dvdchat/dvdchat/9078e710-bca4-44e5-bfeb-d9bacda55b50.JPG)

1. 定时发帖


2. 预定的帖子列表：查看编辑已定时的帖子
3. MFM语法使用说明书：查看 MFM 语法具体效果，可以直接复制
4. 插件

### 导航栏

**一、时间线**

1. **Bubble**：推荐时间线，显示站长选择的部分 misskey 系实例的公开帖子。相当于阉割版的全局时间线
2. **关注中**：显示“你关注的人”、“关注你的人”、“你的互关”的最新一条帖子。「只显示原创帖子」的简洁版主页，用户顺序按照最新帖子的发布时间排序，无法搜索
3. **更多**：时光机在这里，可以显示指定时间的帖子，另外个人主页也有单独的时光机

**二、网盘** 支持搜索。不支持多选，想使用多选功能可以使用第三方app【Aria】

**三、预定的帖子** 设置了定时发送的帖子

**四、play** 有非常多好玩的，比如抽签、扫雷、数独，还有各种转盘

**五、频道** 星屑的频道对站外是公开的

1. 频道帖子在星屑内只有关注频道的人才能刷到，外站的朋友则不影响

   - 频道帖子在时间线上表现为帖子左边带有颜色条，帖子下方带有频道名，从外站看没有颜色条，频道名也会会变成对应 tag
   - 如果修改频道名，之前的帖子在外站看依然是之前的 tag 并不会更改

2. 发布频道帖子理论上要点进频道内，但没关系我们有很多快捷办法

   - <span id="big">**右侧小部件1**：支持跳转到任意链接</span>

     点击`编辑部件`、`增加AiScript APP`、`设置`，把下面的css粘贴进去并修改内容：

     ```
     Ui:render([
         Ui:C:mfm({ text: `[倾情推荐](https://pari.cafe)
     [这里填显示的内容](这里填跳转的链接，可以自己复制更多，站外的链接也可以跳转哦)
     ` })
     ])
     ```

   - **右侧小部件2**：显示全部已关注频道

     点击`编辑部件`、`增加AiScript APP`、`设置`，把下面的css粘贴进去：

     ```
     /// @ 0.12.4
     // チャンネル一覧ウィジェット
     
     let channels = Mk:api("channels/followed" {limit: 100})
     var chStrArr = []
     let newLine = `
     `
     
     each let ch channels {
       chStrArr.push("･ ")
     	chStrArr.push(`[{ch.name}](https://stelpolva.moe/channels/{ch.id})`)
     	chStrArr.push(newLine)
     }
     
     Ui:render([
     	Ui:C:mfm({text: chStrArr.join()})
     ])
     ```

   - **发帖框插件**：投稿窗口部分有介绍这个内容，使用的时候直接点击就可以发布到对应频道了

     复制下面的 css 到“设置-插件-安装插件”：

     ```
     /// @ 0.12.4
     
     ### {
       name: '追加频道发帖按钮'
       version: '1.1'
       author: '@piga@misskey.io'
       description: '在发帖窗口增加发帖到所关注的频道的按钮。'
       permissions: ["read:channels"]
       config: {
         limit: {
           type: 'number'
           label: '能读取的频道上限'
           description: '如果关注的频道增加了记得改这里哦'
           default: 30
         }
       }
     }
     
     var CH_ARR = []
     
     // objのnullなプロパティを再帰的に除去 https://qiita.com/saki-lere/items/851c4500d56659d15c9c
     @remove_null_property(object) {
       if Core:type(object) != 'obj' {
         return object
       }
       let new_obj = {}
       each let kv Obj:kvs(object) {
         let v = remove_null_property(kv[1])
         if Core:type(v) != 'null' {
           Obj:set(new_obj kv[0] v)
         }
       }
       return new_obj
     }
     
     // 投稿先をidのチャンネルへ切り替える
     @switch_destination(id) {
       var new_arr = []
     
       each(let i, CH_ARR) {
         if i.id == id { i.is_post = true }
         else { i.is_post = false }
         new_arr.push(i)
       }
       CH_ARR = new_arr
     }
     
     // 投稿先のチャンネルIDを取得
     @get_destination_id() {
       var r_id = null
       var new_arr = []
     
       each(let i, CH_ARR) {
         if i.is_post {
           i.is_post = false
           r_id = i.id
         }
         new_arr.push(i)
       }
       CH_ARR = new_arr
     
       return r_id
     }
     
     // フォロー中のチャンネルを取得し投稿フォームにボタンを作る
     let channels = Mk:api('channels/followed' {limit: Plugin:config.limit})
     each(let i, channels) {
       let ch = {
         id: i.id
         is_post: false
       }
       CH_ARR.push(ch)
     
       Plugin:register_post_form_action(`发至{i.name}`, @(form update) {
         switch_destination(i.id)
         Mk:dialog('' `现在发帖位置变成📺[{i.name}]了哦`)
       })
     }
     Plugin:register_post_form_action(`发至时间线`, @(form update) {
       switch_destination('')
       Mk:dialog('' `现在发帖位置变成🌐时间线了哦`)
     })
     
     // 投稿時に投稿先のチャンネルIDを書き換える
     // チャンネルの投稿フォームを使っている場合、チャンネルIDは書き換えない
     Plugin:register_note_post_interruptor(@(note) {
       if note.channelId == null {
         note.channelId = get_destination_id()
       }
       return remove_null_property(note)
     })
     ```

3. 把频道内的帖子转发到频道外

   - 需要频道管理员打开“允许在频道外转帖及引用”

   - 复制帖子链接后，粘贴到新的发帖框，在弹出来的“是否引用此链接”框中选择<mark>取消</mark>，不要直接点原帖子的转发/引用键


**六、清除缓存** 表情无法正常显示的时候使用

### 设置

**一、个人资料** 

1. 可以叠加8个头像挂件，可重复；
2. 设置被关注时显示的消息，会同时展示在个人主页
3. 高级设置“喵！”：如果把账号设置成猫，头像会出现猫耳朵，你发的“na”会变成“nya”（可以在【设置-常规设置-】中打开“关闭像喵一样说话功能”）

**二、设置** 

1. **时间线和帖子** 自动折叠被回复帖子、自动折叠文件、时间线上的帖子分开显示、帖子风格（misskey 风格的头像会跟随帖子上下滚动）、设置回应大小、显示帖子服务器来源
2. **辅助功能** 在帖子上点击会打开该帖子（关闭时要点击帖子右上角时间戳才能打开帖子）
3. **其他** 一只猫猫朋友（非常可爱
4. **导航栏** 完全的自定义，随自己喜好修改，未选中的内容显示在“更多”里
5. **自定义css** 进阶设置

**三、 Stelpolva Plus** 

1. 设置字体
2. 表情回应选择器大小
3. 禁用时间线
4. 高级发帖框：给帖子添加前缀或后缀，打开后在发帖框添加，添加好后除非你删掉不然每条帖子都会带上
5. 批量化私密帖子

**四、主题** 在星屑本地搜主题有很多，也可以自己制作

关于怎么把普通主题改成半透明：（教程来自星友`@bidyy` ）

1. 进入设置-主题-看你现在用的主题是哪个
2. 进入主题管理，选择你现在使用的主题
3. 复制主题代码
4. 进入安装主题，粘贴代码
5. 将代码里bg的颜色从 hex 转换 rgba（可以使用在线转换网站，搜一下就有），例如：#FF5733->rgba(255, 87, 51, 1.0)
6. 调整rgba中的最后一位，这个是控制透明度的，例：rgba(255, 87, 51, 0.45)
7. 修改 id 和 name，不要和已有主题重复，点击安装
8. 在使用的主题里选择你刚刚安装的主题

**五、表情符号调色板** 可以分别设置发帖表情和回应表情，以及修改默认的爱心表情

**六、插件**  目前星屑的插件大多是转换用的

- 安装：复制插件代码，进入“设置-插件-安装插件”，粘贴并安装

- 更新：必须删除原来的版本再重新安装
- 使用：在发帖框点击对应的插件即可

这里贴两个博主码的插件：[一键活字乱刷](https://stelpolva.moe/notes/9zzd9sp2sejj2a5j)、[花里胡哨（气泡版）](https://stelpolva.moe/notes/a00dlrrysejj32qa)，感兴趣的朋友可以试试

### 小部件

**AiScript APP**：<span><a href="#big" style="text-decoration: underline;">本人用来实现多种跳转功能</a></span>

## 拯救信息过载

> 以下内容来自站长和kon酱
>
> 使用方法：复制代码，粘贴到【设置-自定义css】

1. **隐藏气泡**：

   ```
   /* 帖文详情之外 不显示 文字背景、边框、特殊颜色 */
   .SkNote-text-9t7i span, .SkNoteSub-text-VAZL span, .SkNoteSimple-text-5RJB span, .SkNote-collapsedRenoteTargetText-pNlm span {
       background: transparent !important;
       border: none !important;
       color: unset !important;
   }
   ```

2. **通知页不显示头像装饰**

   ```
   /* 通知页 不显示 头像装饰 */
   .pages-notifications-notifications-tfIf .MkAvatar-decoration-1fJq {display: none;}
   ```

3. **时间轴不显示头像装饰**

   ```
   /* 时间轴 不显示 头像装饰 */
   .pages-timeline-tl-jptQ .MkAvatar-decoration-1fJq {display: none;}
   ```

4. **时间轴不显示帖子下方回应**

   ```
   /* 时间轴 不显示 帖子下方回应 */
   .pages-timeline-tl-jptQ .MkReactionsViewer-root-lT1y {display: none;}
   ```

5. **在Bubble、全局时间轴上隐藏本地内容**

   ```
   /* Bubble时间轴 不显示 本实例内容 */
   [data-timeline-src="bubble"] .d-is-local {
       display: none !important;
   }
   /* 全局时间轴 不显示 本实例内容 */
   [data-timeline-src="global"] .d-is-local {
       display: none;
   }
   ```

6. **时间轴不显示被回复帖子**

   ```
   /* 时间轴 不显示 被回复帖子 */
   .SkNote-replyTo-De1I {
       display:none;
   }
   ```

7. **时间轴不显示频道内容**

   ```
   /* 时间轴 不显示 频道内容 */
   .pages-timeline-tl-jptQ .SkNote-root-1aC8:has(a.SkNote-channel-wQdW) {
       display:none;
   }
   ```

8. **修改被回复原帖的外观**

   ```
   /* 时间轴、个人资料 被回复原帖的外观修改 */
   .SkNote-replyTo-De1I {
       font-size: 90%;
       opacity: 0.75; /* 修改字体大小和透明度 */
   }
   .SkNote-replyTo-De1I .MkMediaList-container-bIzI {
       height: 10em; /* 修改原帖媒体栏大小 */
   }
   .SkNote-replyTo-De1I .MkReactionsViewer-root-lT1y {
       display: none; /* 不显示原帖收到的表情回应 */
   }
   .SkNote-replyTo-De1I .MkSubNoteContent-reply-8ivL {
       display: none; /* 不显示原帖内容开头的箭头 */
   }
   .SkNote-replyTo-De1I .SkNoteSub-footer-8Mdq {
       display: none; /* 不显示原帖下方操作菜单 */
   }
   ```

**另：设置背景图片**（方法来自站长）

网盘找到你想要的图片的 URL，复制，然后在【设置-自定义css】里加入：

 deck 模式：

    .deck-root-4X6J {
        background-image: url("图片链接地址")  !important;
    }

默认模式：

```
.universal-root-EN98 {
    background-image: url("图片链接地址")  !important;
}
```

好了，这篇啰里吧嗦的介绍/安利到这里终于结束了，总之欢迎大家来星屑玩！

