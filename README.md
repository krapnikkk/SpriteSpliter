SpriteSpliter 合图分割的小工具【nodejs】
==============================

采用nodejs编写的用于合图分割的小工具,需要分割表文件.

本工具分割表使用Texture Merger导出的json格式和TexturePacker导出的plist格式文件【兼容format 1 & 2 & 3】~

json文件格式如下：

```sh
{"file":"button.png","frames":{
"sound_normal":{"x":1,"y":1,"w":227,"h":92,"offX":0,"offY":0,"sourceW":227,"sourceH":92},
"custom_down":{"x":230,"y":1,"w":96,"h":92,"offX":0,"offY":0,"sourceW":96,"sourceH":92}
}
```

新增json文件格式如下：

```sh
{"images": ["loading_atlas_P_.png"], "frames": [[82,203,39,38],[176,190,39,38],[53,112,39,38],[106,110,52,51],[0,112,51,51],[106,56,51,52],[0,0,52,54],[54,0,52,54],[108,0,52,54],[162,0,52,53],[162,55,52,53],[0,56,51,54],[53,56,51,54],[53,152,39,38],[0,165,39,38],[160,110,39,38],[160,150,39,38],[94,163,39,38],[41,192,39,38],[0,205,39,38],[135,190,39,38]]}
```
plist文件格式如下【format 3】：

```sh
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>frames</key>
        <dict>
            <key>0.png</key>
            <dict>
                <key>aliases</key>
                <array/>
                <key>spriteOffset</key>
                <string>{0,0}</string>
                <key>spriteSize</key>
                <string>{17,19}</string>
                <key>spriteSourceSize</key>
                <string>{25,25}</string>
                <key>textureRect</key>
                <string>{{1,1},{17,19}}</string>
                <key>textureRotated</key>
                <false/>
            </dict>
        </dict>
        <key>metadata</key>
        <dict>
            <key>format</key>
            <integer>3</integer>
            <key>pixelFormat</key>
            <string>RGBA8888</string>
            <key>premultiplyAlpha</key>
            <false/>
            <key>realTextureFileName</key>
            <string>timer.png</string>
            <key>size</key>
            <string>{63,64}</string>
            <key>smartupdate</key>
            <string>$TexturePacker:SmartUpdate:2700a4a2a1237330c975194e03f6b4bf:55d2c1b6f8efc174e53937c7178b2a01:33cdb2b0e2dffa2daf25ed89cc76fe4c$</string>
            <key>textureFileName</key>
            <string>timer.png</string>
        </dict>
    </dict>
</plist>

```

## 依赖库

依赖gm库【需要安装ImageMagick】
依赖plist库

```sh
npm i gm --save
npm i plist --save
```

## 启动命令

$ node app.js [json文件相对路径|plist文件相对路径](ps.图集文件需要在同一目录)

```sh
$ node app.js ./src/button.json

$ node app.js ./src/timer.plist

$ node app.js ./src/loading_atlas_P_.json

```

## 关于其他

在写这个工具之前搜索了相关的其他大图分图工具，分别如下：

### 检测透明像素矩阵切割工具

#### Sprite Editor【Unity3D】

 Unity3D Sprite Editor 自动切割（Automatic）[点击查看](https://blog.csdn.net/qq_37712328/article/details/78254455) 

#### SpriteSplit【Java】

Java编写的用于合图分割的小工具,不需要分割表文件. [点击查看](https://github.com/scvax/SpriteSplit)

#### gm + get-pixels【nodejs】

nodejs 使用 gm + get-pixels 库可以编写

```sh
上述工具方案要求大图切割后的原小图不能存在间隙（比如标题【title】的字符存在间隙的话，会被切割成【t,i,t,l,e】）
```


### 根据分割表工具裁剪

#### BigShear

图片分割、PNG纹理合并一应俱全 [点击查看](https://www.fancynode.com.cn/bigshear)

#### PIL + xml + dom 【python环境】(分割表要求：TexturePacker => plist)

TexturePacker反向工具 [点击查看](https://www.cnblogs.com/BigFeng/p/4659261.html)

```sh
上述工具方案要求对分割表文件有要求，按需调整
```

```sh
-- 2019112 新增TexturePacker导出的plist格式文件【兼容format 1 & 2 & 3】
```
