const fs = require('fs'),
    plist = require('plist'),
    gm = require('gm').subClass({ imageMagick: true });

const file = process.argv.splice(2).toString();

let frames, textureRect, frame, img_name, output_name, coordinate_x, coordinate_y, img_width, img_height, rotated, buf, img_arr = [],
    splitIdx = 0, maxSplitIdx;
if (!file) {
    console.error('缺少命令行参数！');
    return;
}
if (file.indexOf(".plist") > -1) {
    getSpritePlist(file);
} else if (file.indexOf(".json") > -1) {
    getSpriteJson(file);
} else {
    console.log('暂不支持该文件格式！');
};

async function getSpritePlist(path) {
    let json = plist.parse(fs.readFileSync(file, 'utf8'));
    if (json && json['frames'] && json['metadata']) {
        frames = json['frames'];
        img_name = json['metadata']["textureFileName"];
    } else {
        console.error('plist文件结构不符合要求！');
        return;
    }
    let version = json['metadata']['format'];
    for (let item in frames) {
        frame = frames[item];
        output_name = item.replace(".png", "");
        switch (version) {
            case 1:
                textureRect = transStr(frame['frame']);
                rotated = false;
                break;
            case 2:
                textureRect = transStr(frame['frame']);
                rotated = frame['rotated'];
                break;
            case 3:
                textureRect = transStr(frame['textureRect']);
                rotated = frame['textureRotated'];
                break;
            default:
                textureRect = transStr(frame['textureRect']);
                break;
        }
        coordinate_x = textureRect[0];
        coordinate_y = textureRect[1];
        img_width = rotated ? textureRect[3] : textureRect[2];
        img_height = rotated ? textureRect[2] : textureRect[3];

        img_arr.push({
            'img_name': img_name,
            'output_name': output_name,
            "coordinate_x": coordinate_x,
            "coordinate_y": coordinate_y,
            "img_width": img_width,
            "img_height": img_height,
            "rotated": rotated,
        });
    }
    maxSplitIdx = img_arr.length;
    for (let i = 0; i < maxSplitIdx; i++) {
        let img = img_arr[i];
        await spriteSpliter(img.img_name, img.output_name, img.img_width, img.img_height, img.coordinate_x, img.coordinate_y, img.rotated);
    }

};

async function getSpriteJson(path) {
    let json = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (json && json['frames'] && json['file']) {
        frames = json['frames'];
        img_name = json['file'];
    } else if (json && json['frames'] && json['images']) {
        frames = json['frames'];
        img_name = json['images'][0];
    } else {
        console.error('json文件结构不符合要求！');
        return;
    }

    console.log(img_name);

    if (frames instanceof Array) {
        frames.forEach((frame,index) => {
            img_arr.push({
                'img_name': img_name,
                'output_name': index,
                "coordinate_x": frame[0],
                "coordinate_y": frame[1],
                "img_width": frame[2],
                "img_height": frame[3],
                "rotated": false,
            });
        })
    } else {
        for (let item in frames) {
            frame = frames[item]
            output_name = item;
            coordinate_x = frame['x'];
            coordinate_y = frame['y'];
            img_width = frame['w'];
            img_height = frame['h'];
            rotated = frames['rotated'];
            img_arr.push({
                'img_name': img_name,
                'output_name': output_name,
                "coordinate_x": coordinate_x,
                "coordinate_y": coordinate_y,
                "img_width": img_width,
                "img_height": img_height,
                "rotated": rotated,
            });
        }
    }

    maxSplitIdx = img_arr.length;
    for (let i = 0; i < maxSplitIdx; i++) {
        let img = img_arr[i];
        await spriteSpliter(img.img_name, img.output_name, img.img_width, img.img_height, img.coordinate_x, img.coordinate_y, img.rotated);
    }
}

function transStr(string) {//"{{41,52},{11,19}}"=>["41","52","11","19"]
    return string.replace(/{|}/g, "").split(",");
}

async function spriteSpliter(img_name, output_name, width, height, x, y, rotated) {
    buf = gm(`./src/${img_name}`)
        .crop(width, height, x, y);
    if (rotated) {
        buf = buf.rotate("transparent", -90);
    }
    buf.write(`./output/${output_name}.png`, function (err) {
        if (!err) {
            splitIdx++;
            console.log(`${splitIdx}/${maxSplitIdx}=>${output_name}.png`);
            if (splitIdx == maxSplitIdx) {
                console.log("文件裁剪完成！");
            }
        } else {
            console.log(err.message || "出错了！");
        }
    });
};










