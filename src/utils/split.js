/**
 * @file split image into n * m pieces by upload or drag image
 * @author wxp
 */

/**
 * helper - 辅助函数
 *
 */
var util = {
    $: function (id) {
        return typeof id == 'string' ? document.getElementById(id) : null;
    },
    cancel: function (event) {
        event.preventDefault();
        event.stopPropagation();
    },
    val: function (value) {
        return value && value > 0 ? value : 1;
    }
};

/**
 * 文件预处理
 * 
 * @param {(string | File)} file 上传的文件对象或者url路径
 */
function handleFile(file) {
    if (!file) {
        return;
    }
    // 从其他页面拖拽图片，获取url路径，可能是data:url或者普通的url
    // todo: 兼容性不好,仅chrome支持
    if (typeof file === 'string') {
        // var source = file.match(/src=(?:'|")(.+jpe?g|png|gif)/);
        // if (!source) {
        //     alert('图片格式不合法！请上传jpg, png, gif, jpeg格式的图片');
        //     return;
        // }
        var imgUrl = file
        // util.$('preview').innerHTML = '<img src="' + imgUrl + '" />';
        return handlePiece(imgUrl);
    }

    if (!file.type || !file.type.match('image/')) {
        alert('图片格式不合法！请上传jpg, png, gif, jpeg格式的图片');
        return;
    }

    // 文件超过2M
    if (!file.size || !file.size > 2 * 1024 * 1024) {
        alert("请上传2M以内的图片哦，亲~~");
        return;
    }
    // /**
    //  * blob文件读取完毕时触发
    //  *
    //  * @event
    //  * @param {Object} event
    //  */
    // var reader = new FileReader();
    // reader.onload = function (event) {
    //     source = event.target.result;
    //     util.$('preview').innerHTML = '<img src="' + source + '" />';
    //     handlePiece(source);
    // };
    // reader.readAsDataURL(file);
}

/**
 * 初始化事件绑定
 * 
 */
function initFile() {
    var previewDiv = util.$('preview');
    var fileInput = util.$('imgFile');
    
    var row =  util.$('row');
    var column =  util.$('column');

    previewDiv.ondragenter = function (event) {
        util.cancel(event);
        this.style.borderColor = '#f00';
    };

    previewDiv.ondragover = function (event) {
        util.cancel(event);
    };

    previewDiv.ondragleave = function () {
        this.style.borderColor = '#00f';
    };

    previewDiv.ondrop = function (event) {
        util.cancel(event);
        
        var file = event.dataTransfer.files[0];
        var html = event.dataTransfer.getData('text/html');
        
        this.style.borderColor = '#00f';

        handleFile(file || html);
    };

    /**
     * 通过input上传的文件发生改变时触发
     * 
     * @event
     */
    fileInput.onchange = function () {
        handleFile(this.files[0]);
    };
    
    /**
     * 分割宫格行列数发生变化时触发
     * 
     * @event
     */
    row.onchange = updateRowColumn;
    column.onchange = updateRowColumn;

    function updateRowColumn() {
        var img = previewDiv.getElementsByTagName('img');

        img = img ? img[0] : null;
        handlePiece(img);
    }
}

/**
 * 图片碎片预处理
 * 
 * @param {(string | Image)} source 可以是图片路径或者图片对象
 */
function handlePiece(source) {
    return new Promise(function(resolve, reject) {
        if (!source) {
            return;
        }
        var rowVal = 2
        var columnVal =  2
        
        if (typeof source === 'string') {
            var img = new Image();
            
            img.onload = function () {
                const res = createPiece(img, rowVal, columnVal)
                if(res[0].length > 20) {
                    resolve(res);
                }
                
            };
    
            img.src = source;
        }
        else {
            resolve(createPiece(source, rowVal, columnVal));
        }
        // if (/* 异步操作成功 */){
        //   resolve(value); 	// resolve将Promise的状态由pending变为resolved
        // } else {
        //   reject(error);		// reject将Promise的状态由pending变为失败
        // }
      });
}

/**
 * 生成图片碎片
 * 
 * @param {Image} img 
 * @param {number=} row 分割宫格的行数
 * @param {number=} column 分割宫格的列数
 */
function createPiece(img, row, column) {
    img.setAttribute("crossOrigin",'Anonymous')
    row = util.val(row);
    column = util.val(column);

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    var wpiece = Math.floor(img.naturalWidth / column);
    var hpiece = Math.floor(img.naturalHeight / row);

    var src = '';
    let srcList  = [];

    canvas.width = wpiece;
    canvas.height = hpiece;

    for (var i = 0; i < row; i++) {
        // html += '<tr>';
        for (var j = 0; j < column; j++) {
            ctx.drawImage(
                img, 
                j * wpiece, i * hpiece, wpiece, hpiece, 
                0, 0, wpiece, hpiece
            );
            src = canvas.toDataURL();
            srcList.push(src)
        }
    }
    return srcList;
}
export {
    handleFile
}