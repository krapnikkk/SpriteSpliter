SpriteSpliter 合图分割的小工具【nodejs】
==============================

采用nodejs编写的用于合图分割的小工具,需要分割表文件.

本工具分割表使用Texture Merger导出的json格式，可自行调整json结构或者工具使用
json文件格式如下：

```sh
{"file":"button.png","frames":{
"sound_normal":{"x":1,"y":1,"w":227,"h":92,"offX":0,"offY":0,"sourceW":227,"sourceH":92},
"custom_down":{"x":230,"y":1,"w":96,"h":92,"offX":0,"offY":0,"sourceW":96,"sourceH":92}
}
```
## 依赖库

依赖gm库【需要安装ImageMagick】

```sh
npm i gm -D
```

## 启动命令

$ node app.js [json文件相对路径]

```sh
$ node app.js ./src/button.json
```

## 关于其他

在写这个工具之前搜索了相关的其他大图分图工具，分别如下：

###检测透明像素矩阵切割工具

#### Sprite Editor【Unity3D】

 Unity3D Sprite Editor 自动切割（Automatic）[点击查看](https://blog.csdn.net/qq_37712328/article/details/78254455) 

#### SpriteSplit【Java】

Java编写的用于合图分割的小工具,不需要分割表文件. [点击查看](https://github.com/scvax/SpriteSplit)

#### gm + get-pixels【nodejs】

nodejs 使用 gm + get-pixels 库可以编写

```sh
上述工具方案要求大图切割后的原小图不能存在间隙（比如标题【title】的字符存在间隙的话，会被切割成【t,i,t,l,e】）
```


###根据分割表工具裁剪

#### BigShear

图片分割、PNG纹理合并一应俱全 [点击查看](https://www.fancynode.com.cn/bigshear)

#### PIL + xml + dom 【python】(分割表要求：TexturePacker => plist)

TexturePacker反向工具 [点击查看](https://www.cnblogs.com/BigFeng/p/4659261.html)

```sh
上述工具方案要求对分割表文件有要求，按需调整
```
