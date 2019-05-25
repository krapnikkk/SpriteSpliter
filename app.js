const fs = require('fs'), gm = require('gm').subClass({imageMagick: true});


const file = process.argv.splice(2).toString();

let json, frames, frame, img_name, output_name, coordinate_x, coordinate_y, img_width, img_height, buf, img_arr = [],
    splitIdx = 0, maxSplitIdx;
if (!file) {
    console.error('缺少命令行参数！');
    return;
}

function getSpriteJson(path) {
    fs.readFile(path, function (err, data) {
        if (err) {
            console.error(err);
            return;
        }
        json = JSON.parse(data.toString());
        if (json && json['frames'] && json['file']) {
            frames = json['frames'];
            img_name = json['file'];
        } else {
            console.error('json文件结构不符合要求！');
            return;
        }

        // console.log(json);
        for (let item in frames) {
            frame = frames[item]
            output_name = item;
            coordinate_x = frame['x'];
            coordinate_y = frame['y'];
            img_width = frame['w'];
            img_height = frame['h'];
            img_arr.push({
                'img_name': img_name,
                'output_name':output_name,
                "coordinate_x": coordinate_x,
                "coordinate_y": coordinate_y,
                "img_width": img_width,
                "img_height": img_height
            });
        }
        maxSplitIdx = img_arr.length;
        spriteSpliter(img_arr[splitIdx].img_name, img_arr[splitIdx].output_name, img_arr[splitIdx].img_width, img_arr[splitIdx].img_height, img_arr[splitIdx].coordinate_x, img_arr[splitIdx].coordinate_y);
    })
}

getSpriteJson(file);

function spriteSpliter(img_name, output_name, width, height, x, y) {
    buf = gm(`./src/${img_name}`)
        .crop(width, height, x, y);
    buf.write(`./output/${output_name}.png`, function (err) {
        if (!err) {
            console.log(`${splitIdx+1}/${maxSplitIdx}=>${output_name}.png`);
            splitIdx++;
            if (splitIdx < maxSplitIdx) {
                spriteSpliter(img_arr[splitIdx].img_name, img_arr[splitIdx].output_name, img_arr[splitIdx].img_width, img_arr[splitIdx].img_height, img_arr[splitIdx].coordinate_x, img_arr[splitIdx].coordinate_y);
            }
        } else {
            console.log(err.message || "出错了！");
        }
    });
}










