---
title: "使用ffmpeg进行视频格式的无损转换"
description: "转换速度很快而且无损，部署好后可以一直使用，非常方便"
date: 2025-04-02
categories: ["数枝横斜"]
tags: [实用工具]
slug: ffmpeg
image: https://chatstorage.dvd.moe/dvdchat/dvdchat/dc679c68-35cd-4492-87cc-c3ba485219d7.jpg
---

### 下载ffmpeg

下载地址：[https://github.com/BtbN/FFmpeg-Builds/releases](https://github.com/BtbN/FFmpeg-Builds/releases)，选择[ffmpeg-master-latest-win64-gpl-shared.zip](https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl-shared.zip)版本

### 安装ffmpeg

假设已经解压，进入文件夹并且点开 **bin** 文件夹，此时文件路径为 **xx\ffmpeg\ffmpeg\bin**，在地址栏复制路径

1. <kbd>win</kbd>+<kbd>R</kbd>，输入`sysmd.cpl`，按<kbd>ENTER</kbd>回车

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

### 转换格式

假设我需要转换的文件名为 **gavv01.mkv**，并且文件路径为 **D:\resource\gavv**

1. <kbd>win</kbd>+<kbd>R</kbd>打开命提示符，输入<b>cmd
       </b>然后<kbd>ENTER</kbd>回车
1. 输入 `cd D:\resource\gavv` 导航到 gavv 文件夹
1. 单个转换：输入 `ffmpeg -i "gavv01.mkv" -c:v copy -c:a copy "gavv01.mp4"` ，按<kbd>ENTER</kbd>回车，其中 **gavv01.mkv** 是需要转换的文件，**gavv01.mp4** 是转换后的文件
1. 批量转换：输入 `for %i in (*.mkv) do ffmpeg -i "%i" -c:v copy -c:a copy "%~ni.mp4"`
1. 切换来源文件夹：输入 `cd D:新文件夹`

{{< detail "如果显示文件错误" >}}

<p>1.<kbd>win</kbd>+<kbd>R</kbd>打开命提示符，输入<b>cmd</b>然后<kbd>ENTER</kbd>回车</p>

<p>2.输入<b>D:</b>，<kbd>ENTER</kbd>回车</p>

<p>3.输入<b>cd "D:\resource\gavv"</b>（双引号确保路径正确）</p>

<p>4.输入<b>dir</b>，回车，确认该文件夹中有需要转换的文件</p>

{{< /detail >}}



{{< neodb "https://neodb.social/review/7AcUGiNj8fChCFegRKsF7t" >}}{{< /neodb >}}

