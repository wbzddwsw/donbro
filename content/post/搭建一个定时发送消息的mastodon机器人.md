---
title: "搭建一个定时发送消息的mastodon机器人"
description: "用来建设家产轰炸tl也是极好的（不是）"
date: 2025-06-21T21:25:34+08:00
categories: ["数枝横斜"]
tags: [mastodon]
slug: mastodonbot
image: 
---

## 一些唠叨

很久很久之前就对首页刷到的 bot 感兴趣，以前还把自己的账号标记成机器人玩（大家不要学），今天我终于拥有机器人账号了 `@w3w@o3o.ca` ！是发送特摄相关内容的，欢迎大家来玩！！！~~这篇博客不是教程吗怎么还夹带私货~~

做事情有时候真的看缘分的，前两天突然就这么灵光一闪开始捣腾，刚开始做的是 misskey 的文字 bot，而且因为是从本地发帖，操作起来也相当简单。之后 kon酱给我发了[一个Firefish/Misskey上的定时发图bot](https://me.ag925.top/archives/6fcf4471.html)，再加上特摄真的很多表情包，勾起了我做图片bot的心，但是！我根本看不懂！！！

天呐我真的对代码一无所知，何况还是 json 这种一听就吓得我退避三舍的东西，所以我选择直接对 gpt 提要求，它给出的方案是在本地建一个图片文件夹并加入随机列表。

misskey 是有网盘的，kon 酱那个方案就是读取网盘里的图片列表并且直接从网盘上传，这样就不会占用太多资源。我还想加上定时删除功能，这样未免太过复杂。

但 mastodon 有自带的定时删除，而且由于我技术力不够显然也是不太用得上网盘的，于是最终决定在 mastodon 上运营这个账号。我的诉求是：

1. 文字和图片中随机选一条
2. 每天上午和晚上9点自动发送
3. 半年之前的帖子自动删除

1 和 2 都请 gpt 老师帮我实现了，3 依靠 mastodon 实现了，于是我美美入睡满心期待等第二天的帖子，然后一觉醒来什么都没有……

这才知道本地的发帖程序只有电脑保持开机才可以运行，上午我没开电脑程序的发送请求就被系统拒绝了！！！

询问 gpt 后无奈接受了部署云端的建议，又是一个我听都没听过的操作方案，经过一整天的不断调整，好歹是弄出来了，因此特意写这篇记录 ~~绝对不是因为太久没写博客了手痒~~

## 正式部署

这个操作流程，我大概描述一下就是，在本地准备好文件，推送到 github 仓库，再把这个仓库部署到 railway ，让 railway 根据文件里写的脚本自动运行。

听起来不是很难，问题不大我一步一步写。

### 下载与注册

1. 安装 Python：https://www.python.org/downloads

   下载自己电脑型号对应的版本，安装的时候下方有个 `Add Python to PATH` 必须勾选 

   <details>
   <summary>检查是否安装成功</summary>
       1.在电脑上按<kbd>win</kbd>+<kbd>R</kbd><br>
       2.输入<code>cmd</code>然后按<kbd>enter</kbd>回车，打开命令提示符<br>
       3.输入<code>python --version</code><br>
       4.如果看到类似<code>Python 3.12.3</code>说明安装成功
   </details>

2. 获取 API Token

   - 登录准备用来作为 bot 的 mastodon 账号，打开`设置`-`开发`，点击`创建新应用`

   - 给应用取个名字，这个名字之后会出现在帖子下方用作发帖来源

   - 勾选权限，`write:media 上传媒体文件`和`write:statuses 发表嘟文`，再点击`提交`

   - 点开应用，复制“你的访问令牌”，也就是 Token

     ![1](https://chatstorage.dvd.moe/dvdchat/dvdchat/55cd005c-9394-4824-b325-aac52d5e4297.jpg)

3. 注册一个 github 账号，下载 Github Desktop 、Git 和 VScode

   具体操作可以参考这篇文章：[Hugo-小白博客部署记录](https://donbro.vercel.app/p/hugo/)

4. 注册railway：https://railway.com/

   点击右上角 `Sign in` ，选择用 github 账号登录

### 准备文件

在 D 盘新建一个mastodon_bot 文件夹，在其中准备以下6个文件：

#### 1.bot.py

最主要的运行脚本。先新建一个 txt 文档，然后另存为 `bot.py` 就好了

```
import random
import requests
from datetime import datetime, timezone, timedelta
import os
import schedule
import time

# 从环境变量读取 Mastodon 访问令牌和实例地址
ACCESS_TOKEN = os.getenv('ACCESS_TOKEN')
INSTANCE = os.getenv('INSTANCE_URL')

# 如果环境变量未设置，则程序退出并提示用户
if not ACCESS_TOKEN or not INSTANCE:
    print("请设置环境变量 ACCESS_TOKEN 和 INSTANCE_URL")
    exit(1)

# 存放文本内容的文件路径
TEXT_FILE = "sentences.txt"
# 存放图片的文件夹路径
IMAGE_FOLDER = "images"

def get_random_content():
    """
    随机获取待发送的内容（文字或图片路径）
    1. 先从文本文件读取非空行，加入候选列表
    2. 再从图片文件夹读取所有支持格式的图片路径，加入候选列表
    3. 如果候选列表为空，返回 None
    4. 否则返回随机选中的一条内容
    """
    content_list = []

    # 检查文本文件是否存在并读取内容
    if os.path.exists(TEXT_FILE):
        with open(TEXT_FILE, "r", encoding="utf-8") as f:
            # 读取每一行并去除空白字符，过滤空行
            lines = [line.strip() for line in f if line.strip()]
            content_list.extend(lines)

    # 检查图片文件夹是否存在并读取支持的图片文件
    if os.path.isdir(IMAGE_FOLDER):
        for file in os.listdir(IMAGE_FOLDER):
            # 支持 png, jpg, jpeg, gif, webp 格式（不区分大小写）
            if file.lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".webp")):
                # 拼接完整路径加入候选列表
                content_list.append(os.path.join(IMAGE_FOLDER, file))

    # 如果没有任何可用内容，打印提示并返回 None
    if not content_list:
        print("没有可发送的文字或图片。")
        return None

    # 从候选内容中随机选择一条返回
    return random.choice(content_list)

def upload_media(image_path):
    """
    上传图片到 Mastodon 实例，返回媒体 ID 以供发帖时引用
    失败时打印错误并返回 None
    """
    url = f"{INSTANCE}/api/v2/media"
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}"
    }
    try:
        # 以二进制方式打开图片文件
        with open(image_path, "rb") as img:
            files = {"file": img}
            # 发送 POST 请求上传图片
            response = requests.post(url, headers=headers, files=files)
        if response.status_code == 200:
            # 成功返回媒体 ID
            return response.json()["id"]
        else:
            print(f"图片上传失败：{response.text}")
            return None
    except Exception as e:
        print(f"上传图片异常：{e}")
        return None

def post_status(content):
    """
    发帖函数
    - 如果传入的是图片路径，先调用 upload_media 上传，再发空文字附带图片的帖子
    - 如果是普通文字，则直接发文字帖子
    发送完成后打印响应状态码和内容
    """
    url = f"{INSTANCE}/api/v1/statuses"
    headers = {
        "Authorization": f"Bearer {ACCESS_TOKEN}"
    }
    try:
        if os.path.isfile(content):  # 判断是否为文件（图片）
            media_id = upload_media(content)  # 上传图片，获取媒体 ID
            if not media_id:
                return  # 上传失败，跳过发帖
            data = {
                "status": "",            # 不附带文字
                "media_ids[]": [media_id]  # 附带上传成功的图片 ID
            }
        else:
            # 普通文字直接发帖
            data = {
                "status": content
            }
        # 发送发帖请求
        r = requests.post(url, headers=headers, data=data)
        # 打印当前 UTC 时间（带时区），响应状态码和返回内容，方便调试
        print(f"{datetime.now(timezone.utc)} 状态码: {r.status_code}")
        print(r.text)
    except Exception as e:
        print(f"发帖异常：{e}")

def job():
    """
    定时任务执行函数
    - 获取一条随机内容（文字或图片）
    - 如果有内容，调用发帖函数发送
    - 如果没有，打印提示信息
    """
    print(f"{datetime.now(timezone.utc)} 开始执行定时任务")
    selected = get_random_content()
    if selected:
        print("将发送：", selected)
        post_status(selected)
    else:
        print("没有内容发送")

def heartbeat():
    """
    心跳函数，用于每隔一段时间打印日志，防止容器被平台判定为空闲自动休眠。
    使用带时区的 UTC 时间打印，避免弃用警告。
    """
    now_utc = datetime.now(timezone.utc)  # 获取当前UTC时间，带时区信息
    print(f"{now_utc} 心跳：程序仍在运行... 防止容器休眠")

if __name__ == "__main__":
    print("机器人启动，等待定时发送...")

    # 由于服务器时区是 UTC，我们要把北京时间 09:00 和 21:00 转换为 UTC 时间
    # 北京时间 = UTC +8小时
    # 所以北京时间 09:00 = UTC 01:00
    # 北京时间 21:00 = UTC 13:00
    schedule.every().day.at("01:00").do(job)  # UTC 时间 01:00 -> 北京时间 09:00
    schedule.every().day.at("13:00").do(job)  # UTC 时间 13:00 -> 北京时间 21:00

    # 每 5 分钟执行一次心跳打印，防止容器因无日志输出被休眠
    schedule.every(5).minutes.do(heartbeat)

    # 主循环，持续运行等待任务执行
    while True:
        schedule.run_pending()
        time.sleep(1)
```



#### 2.Procfile

python 后面就是那个脚本名字，也是新建 txt 文档，另存为命名的时候一定要注意这个文件是<mark>没有后缀名</mark>的

```
worker: python bot.py
```



#### 3.sentences.txt

```
这个文件里就是
随机发送的帖子内容
用换行来区分
一行一个帖子内容
行与行之间不要空格
```



#### 4.images/                   

图片文件夹（.jpg/.png/.webp），用来放随机发送的图片

#### 5.requirements.txt     

Python 依赖列表

```
requests
schedule
```



#### 6.railway.json            

Railway 配置

```
{
  "build": {
    "env": {
      "PYTHONUNBUFFERED": "1"
    }
  },
  "start": "python bot.py"
}
```



### 新建github仓库

1. 登录后点击右上角  `+` → `New repository`

2. 填写信息：

   Repository name: mastodon-bot（或其他名字）

   Description（可选）

   选择 Public 或 Private

   不要勾选 README 等初始化选项（我们用自己已有的文件）

3. 点击 `Create repository`

### 将本地代码上传到github

在D:\mastodon_bot 中任意空白处**右键**，点击 **Open Git Bash Here**，在弹出的命令行界面中输入：

```
cd /d D:\mastodon_bot

git init
git add .
git commit -m "Initial commit"
```

<kbd>enter</kbd>回车，再输入：

```
git remote add origin https://github.com/你的用户名/mastodon-bot.git
git branch -M main
git push -u origin main
```

`https://github.com/你的用户名/mastodon-bot.git` 就是你的仓库地址，可以在这里直接复制：

![1](https://chatstorage.dvd.moe/dvdchat/dvdchat/dd108686-f49c-4d1c-b41c-9567a0fd6cdd.jpg)

成功后可以在github仓库看到本地的代码文件

### 部署railway

点击新建项目，选择刚刚建立的 github 仓库

![1](https://chatstorage.dvd.moe/dvdchat/dvdchat/c64b17d7-8607-441d-99dd-104ac6465fb7.jpg)

点击左边 worker 召唤出右边面板，点击 `Varibles` ，点击 `+ New Varibles` 

在 `VARIABLE_NAME` 中分别输入 **ACCESS_TOKEN** 和 **INSTANCE_URL**，对应的 `VALUE or ${{REF}}` 中分别输入 **TOKEN** 和**实例地址**

![1](https://chatstorage.dvd.moe/dvdchat/dvdchat/78b21690-a5b2-4e4f-8c9a-5eb613af881c.jpg)

## 后续维护更新

打开 Github Desktop，登录 Github 账号，点击添加已经存在的仓库，并且在本地选择对应的文件夹

![1](https://chatstorage.dvd.moe/dvdchat/dvdchat/46f9cb12-ec23-49c7-a99f-1c929f164151.jpg)

修改内容后，点击左边 `Changes` 栏，点击文件名可以看到具体内容，`勾选要同步的文件`，下方 `Summary(required)` 为本次更新行为命名，再点击最下面 `Commit to main` 提交，最后点击上方第三个大黑框 `Push origin` 进行推送即可，推送成功后rail会自动更新部署无需手动操作。

## 结语

不出意外的话这样就是成功了！中间其实还有一个步骤是 github 的授权没有给到 railway，导致新建项目的时候首页看不到那个 github 仓库，我记得自己重新搞了个什么授权操作，但是不记得具体操作步骤是什么了，也没有办法复刻这一步……

总之如果有人根据我这个流程设置bot遇到了这个问题的话，可以评论留言或者从fedi联系我，看到界面我应该能想起来吧（大概

本文到此结束了，感谢gpt老师对此做出的重大贡献，祝大家都能玩上喜欢的bot！！！
