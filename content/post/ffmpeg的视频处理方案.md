---
title: "ffmpeg的视频处理方案"
description: "制作cut的天选工具！强烈安利！"
date: 2025-04-02
categories: ["数枝横斜"]
tags: [工具]
slug: ffmpeg
image: 
---

## 准备工作

### 下载ffmpeg

下载地址：[https://github.com/BtbN/FFmpeg-Builds/releases](https://github.com/BtbN/FFmpeg-Builds/releases)，选择[ffmpeg-master-latest-win64-gpl-shared.zip](https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl-shared.zip)版本

### 安装ffmpeg

假设已经解压，进入文件夹并且点开 **bin** 文件夹，此时文件路径为 **xx\ffmpeg\ffmpeg\bin**，在地址栏复制路径

1. <kbd>win</kbd>+<kbd>R</kbd>，输入`sysdm.cpl`，按<kbd>ENTER</kbd>回车

2. 进入**高级**选项卡，点击`环境变量`

3. 在**系统变量**部分，找到**Path变量**，点击`编辑`

4. 在**编辑环境变量**窗口中，点击`新建`，然后将上面的路径粘贴到这里

5. 依次点**确定**关闭所有窗口

{{< detail "测试是否成功" >}}

<p><kbd>win</kbd>+<kbd>R</kbd>打开命提示符，输入<b>cmd
    </b>然后<kbd>ENTER</kbd>回车，弹出框中输入<b>ffmpeg</b>，如果步骤无误会显示ffmpeg相关信息：</p>

<pre><code class="code-highlight"><span class="code-line line-number" line="1">ffmpeg version 2024-10-27-git-bb57b78013-full_build-www.gyan.dev Copyright (c) 2000-2024 the FFmpeg developers
built with gcc 14.2.0 (Rev1, Built by MSYS2 project)
configuration: --enable-gpl --enable-version3 --enable-static --disable-w32threads --disable-autodetect --enable-fontconfig --enable-iconv --enable-gnutls --enable-libxml2 --enable-gmp --enable-bzlib --enable-lzma --enable-libsnappy --enable-zlib --enable-librist --enable-libsrt --enable-libssh --enable-libzmq --enable-avisynth --enable-libbluray --enable-libcaca --enable-sdl2 --enable-libaribb24 --enable-libaribcaption --enable-libdav1d --enable-libdavs2 --enable-libopenjpeg --enable-libquirc --enable-libuavs3d --enable-libxevd --enable-libzvbi --enable-libqrencode --enable-librav1e --enable-libsvtav1 --enable-libvvenc --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxavs2 --enable-libxeve --enable-libxvid --enable-libaom --enable-libjxl --enable-libvpx --enable-mediafoundation --enable-libass --enable-frei0r --enable-libfreetype --enable-libfribidi --enable-libharfbuzz --enable-liblensfun --enable-libvidstab --enable-libvmaf --enable-libzimg --enable-amf --enable-cuda-llvm --enable-cuvid --enable-dxva2 --enable-d3d11va --enable-d3d12va --enable-ffnvcodec --enable-libvpl --enable-nvdec --enable-nvenc --enable-vaapi --enable-libshaderc --enable-vulkan --enable-libplacebo --enable-opencl --enable-libcdio --enable-libgme --enable-libmodplug --enable-libopenmpt --enable-libopencore-amrwb --enable-libmp3lame --enable-libshine --enable-libtheora --enable-libtwolame --enable-libvo-amrwbenc --enable-libcodec2 --enable-libilbc --enable-libgsm --enable-liblc3 --enable-libopencore-amrnb --enable-libopus --enable-libspeex --enable-libvorbis --enable-ladspa --enable-libbs2b --enable-libflite --enable-libmysofa --enable-librubberband --enable-libsoxr --enable-chromaprint
libavutil      59. 46.100 / 59. 46.100
libavcodec     61. 22.100 / 61. 22.100
libavformat    61.  9.100 / 61.  9.100
libavdevice    61.  4.100 / 61.  4.100
libavfilter    10.  6.100 / 10.  6.100
libswscale      8.  9.101 /  8.  9.101
libswresample   5.  4.100 /  5.  4.100
libpostproc    58.  4.100 / 58.  4.100
Universal media converter
usage: ffmpeg [options] [[infile options] -i infile]... {[outfile options] outfile}...
Use -h to get full help or, even better, run 'man ffmpeg'
</span></code></pre>

{{< /detail >}}

## 实际运用

需要自己修改文件路径与内容。

### 转换格式

假设我需要转换的文件名为 **gavv01.mkv**，并且文件路径为 **D:\resource\gavv**

<kbd>win</kbd>+<kbd>R</kbd>打开命提示符，输入<b>cmd
       </b>然后<kbd>ENTER</kbd>回车，输入 `cd D:\resource\gavv` 导航到 gavv 文件夹；或者直接在对应文件夹打开命令提示符

#### 单个转换

输入 `ffmpeg -i "gavv01.mkv" -c:v copy -c:a copy "gavv01.mp4"` ，按<kbd>ENTER</kbd>回车，其中 **gavv01.mkv** 是需要转换的文件，**gavv01.mp4** 是转换后的文件

#### 批量转换

输入`for %i in (*.mkv) do ffmpeg -i "%i" -c:v copy -c:a copy "%~ni.mp4"`，按<kbd>ENTER</kbd>回车，这个命令会转换对应文件夹中的所有文件


{{< detail "如果显示文件错误" >}}

<p>1.<kbd>win</kbd>+<kbd>R</kbd>打开命提示符，输入<b>cmd</b>然后<kbd>ENTER</kbd>回车</p>

<p>2.输入<b>D:</b>，<kbd>ENTER</kbd>回车</p>

<p>3.输入<b>cd "D:\resource\gavv"</b>（双引号确保路径正确）</p>

<p>4.输入<b>dir</b>，回车，确认该文件夹中有需要转换的文件</p>

{{< /detail >}}

### 压缩视频

crf值越高压缩得越严重，视频体积也越小，20接近无损，22为高质量，24中高画质推荐用，28有明显压缩痕迹。

假设我需要压缩的文件名为 **gavv01.mp4**，并且文件路径为 **D:\resource\gavv**

<kbd>win</kbd>+<kbd>R</kbd>打开命提示符，输入<b>cmd
       </b>然后<kbd>ENTER</kbd>回车，输入 `cd D:\resource\gavv` 导航到 gavv 文件夹；或者直接在对应文件夹打开命令提示符

#### 单个压缩

输入`ffmpeg -i "D:\resource\gavv\gavv01.mp4" -c:v libx265 -crf 23 -c:a copy "D:\resource\gavv\gavv01 压缩后.mp4"`，按<kbd>ENTER</kbd>回车

<span id="big"></span>

#### 批量压缩

1. 新建文本文档，用记事本打开，将以下内容粘贴进去：

   ```
   @echo off
   set "input_dir=D:\resource\gavv"
   set "output_dir=D:D:\resource\gavv\压缩后"
   
   for %%F in ("%input_dir%\*.mp4") do (
       echo 正在压缩：%%~nxF
       ffmpeg -i "%%F" -c:v libx265 -crf 23 -c:a copy "%output_dir%\%%~nxF"
   )
   echo 全部完成！
   pause
   ```

   第2行 input 是视频所在地址，第3行 output 是输出地址，我这里新建了一个“压缩后”文件夹

2. 点击`另存为`，修改文件名为 `xx.bat`，保存类型选择`所有文件(*.*)`，编码选择 `ANSI`，保存地址与需要转换的文件在同一文件夹

   ![1](https://chatstorage.dvd.moe/dvdchat/dvdchat/92e9129a-4c6c-47bf-9744-a037b4723736.jpg)

3. 双击此 bat 文件即可运行

### 裁剪视频

假设我需要裁剪的文件名为 **gavv01.mp4**，文件路径为 **D:\resource\gavv**，裁剪开始时间为 **00:01:20**，结束时间为 **00:03:20**，

新建 bat 文档，步骤同<span><a href="#big" style="text-decoration: underline;">批量压缩</a></span>，文档内容如下：

```
@echo off
setlocal

set "input=D:\resource\gavv\gavv01.mp44"

echo 正在裁剪片段1：出场
ffmpeg -y -i "%input%" -ss 00:01:20 -to 00:03:20 -avoid_negative_ts 1 -b:v 4000k -c:v libx264 -pass 1 -an -f mp4 NUL
ffmpeg -y -i "%input%" -ss 00:01:20 -to 00:03:20 -avoid_negative_ts 1 -b:v 4000k -c:v libx264 -c:a copy -pass 2 "D:\resource\gavv\出场.mp4"

del ffmpeg2pass-0.log
echo 所有片段已完成。
pause
```

