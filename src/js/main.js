// 使用色番号保持
let color = 0;
// パネル
let panels = [[-1, -1, -1, -1, -1, -1, -1],
    [-1, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, -1],
    [-1, -1, -1, -1, -1, -1, -1]];
// 色定数
const colors = {
    RED: 2,
    GREEN: 3,
    WHITE: 4,
    BLUE: 5
}

const app = Vue.createApp({
    data: () => ({
        message: 'I have seen it...',
        result: ''
    }),
    methods:{
        choiceColor: function(num) {
            switch(num) {
                case 2: color = 2;
                console.log("red");
                break;
                case 3: color = 3;
                console.log("green");
                break;
                case 4: color = 4;
                console.log("white");
                break;
                case 5: color = 5;
                console.log("blue");
                break;
                case 1: color = 1;
                console.log("yellow");
                break;
                default: color = 0;
                console.log("gray");
                break;
            }
        },
        action: function(num) {
            // 縦要素番号
            let verNo = 0;
            // 横要素番号
            let sideNo = 0;
            // パネルID
            let panelId = num;
            if (num <= 25 && num > 0) {
            // 取得配列要素取得
            if (Math.floor(num / 5) < 5 && num % 5 !== 0) {
                verNo = Math.floor(num / 5) + 1;
            } else {
                verNo = Math.floor(num / 5)
            }
            num % 5 == 0? sideNo = 5: sideNo = num % 5;
                this.colorSet(color, panelId, verNo, sideNo);
                this.panelChange(panels, verNo, sideNo);
                this.total();
            }
        },
        colorSet: function(col, id, v, s) {
            // id文字列化
            let strId = id.toString(); 
            // パネルに色を反映
            let elem = document.getElementById(strId);
            if (elem !== null) {
                switch(col) {
                    case 1:
                        panels[v][s] = 1;
                        elem.style.backgroundColor = "yellow";
                        break;
                    case 2:
                        panels[v][s] = 2;
                        elem.style.backgroundColor = "red";
                        break;
                    case 3:
                        panels[v][s] = 3;
                        elem.style.backgroundColor = "green";
                        break;
                    case 4:
                        panels[v][s] = 4;
                        elem.style.backgroundColor = "white";
                        break;
                    case 5:
                        panels[v][s] = 5;
                        elem.style.backgroundColor = "blue";
                        break;
                    default:
                        panels[v][s] = 0; 
                        elem.style.backgroundColor = "gray";
                        break;
                }
            }
            // パネル内容
            console.log(panels);
        },
        panelChange: function(pan, v, s) {
            // 起点の色
            let cn = pan[v][s];
            console.log(cn);
            // パネル変わる可能性
            let panelPreChange = false;
            // 色判定（0:灰色、1:黄色は除外）
            if (cn >= 2) {
                // 上確認
                // 変わるパネルがあるか判定
                for (i = v - 1; i >= 0; i--) {
                    console.log(`縦:${i}`);
                    console.log(`横:${s}`);
                    console.log(pan[i][s]);
                    if (pan[i][s] !== cn && pan[i][s] > 1) {
                        panelPreChange = true;
                        console.log("上チェックあり");
                    } else if (pan[i][s] <= 1) {
                        panelPreChange = false;
                        console.log("上チェック停止1");
                        break;
                    } else {
                        if (panelPreChange) {
                            console.log("上チェック停止2");
                            break;
                        }
                    }
                }
                console.log("上チェック通過");
                // パネルを変える
                if (panelPreChange) {
                    for (i = v - 1; i >= 0; i--) {
                        if (pan[i][s] !== cn && pan[i][s] > 1) {
                            let cNum = (i - 1) * 5 + s;
                            this.colorSet(cn, cNum, i, s);
                            console.log("上チェンジ");
                        } else {
                            console.log("上チェンジ停止");
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                console.log("上完了");
                // 下確認
                // 変わるパネルがあるか判定
                for (i = v + 1; i <= 6; i++) {
                    console.log(`縦:${i}`);
                    console.log(`横:${s}`);
                    console.log(pan[i][s]);
                    if (pan[i][s] !== cn && pan[i][s] > 1) {
                        panelPreChange = true;
                        console.log("下チェックあり");
                    } else if (pan[i][s] <= 1) {
                        panelPreChange = false;
                        console.log("下チェック停止1");
                        break;
                    } else {
                        if (panelPreChange) {
                            console.log("下チェック停止2");
                            break;
                        }
                    }
                }
                console.log("下チェック通過");
                // パネルを変える
                if (panelPreChange) {
                    for (i = v + 1; i <= 6; i++) {
                        if (pan[i][s] !== cn && pan[i][s] > 1) {
                            let cNum = (i - 1) * 5 + s;
                            this.colorSet(cn, cNum, i, s);
                            console.log("下チェンジ");
                        } else {
                            console.log("下チェンジ停止");
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                console.log("下完了");
                // 左確認
                // 変わるパネルがあるか判定
                for (i = s - 1; i >= 0; i--) {
                    console.log(`縦:${v}`);
                    console.log(`横:${i}`);
                    console.log(pan[v][i]);
                    if (pan[v][i] !== cn && pan[v][i] > 1) {
                        panelPreChange = true;
                        console.log("左チェックあり");
                    } else if (pan[v][i] <= 1) {
                        panelPreChange = false;
                        console.log("左チェック停止1");
                        break;
                    } else {
                        if (panelPreChange) {
                            console.log("左チェック停止2");
                            break;
                        }
                    }
                }
                console.log("左チェック通過");
                // パネルを変える
                if (panelPreChange) {
                    for (i = s - 1; i >= 0; i--) {
                        if (pan[v][i] !== cn && pan[v][i] > 1) {
                            let cNum = (v - 1) * 5 + i;
                            this.colorSet(cn, cNum, v, i);
                            console.log("左チェンジ");
                        } else {
                            console.log("左チェンジ停止");
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                console.log("左完了");
                // 右確認
                // 変わるパネルがあるか判定
                for (i = s + 1; i <= 6; i++) {
                    console.log(`縦:${v}`);
                    console.log(`横:${i}`);
                    console.log(pan[v][i]);
                    if (pan[v][i] !== cn && pan[v][i] > 1) {
                        panelPreChange = true;
                        console.log("右チェックあり");
                    } else if (pan[v][i] <= 1) {
                        panelPreChange = false;
                        console.log("右チェック停止1");
                        break;
                    } else {
                        if (panelPreChange) {
                            console.log("右チェック停止2");
                            break;
                        }
                    }
                }
                console.log("右チェック通過");
                // パネルを変える
                if (panelPreChange) {
                    for (i = s + 1; i <= 6; i++) {
                        if (pan[v][i] !== cn && pan[v][i] > 1) {
                            let cNum = (v - 1) * 5 + i;
                            this.colorSet(cn, cNum, v, i);
                            console.log("右チェンジ");
                        } else {
                            console.log("右チェンジ停止");
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                console.log("右完了");
                // 左上確認
                // 変わるパネルがあるか判定
                for (i = v - 1, j = s - 1; i >= 0 || j >= 0; i--, j--) { 
                    console.log(`縦:${i}`);
                    console.log(`横:${j}`);
                    console.log(pan[i][j]);
                    if (pan[i][j] !== cn && pan[i][j] > 1) {
                        panelPreChange = true;
                        console.log("左上チェックあり");
                    } else if (pan[i][j] <= 1) {
                        panelPreChange = false;
                        console.log("左上チェック停止1");
                        break;
                    } else {
                        if (panelPreChange) {
                            console.log("左上チェック停止2");
                            break;
                        }
                    }
                }
                console.log("左上チェック通過");
                // パネルを変える
                if (panelPreChange) {
                    for (i = v - 1, j = s - 1; i >= 0 || j >= 0; i--, j--) {
                        if (pan[i][j] !== cn && pan[i][j] > 1) {
                            let cNum = (i - 1) * 5 + j;
                            this.colorSet(cn, cNum, i, j);
                            console.log("左上チェンジ");
                        } else {
                            console.log("左上チェンジ停止");
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                console.log("左上完了");
                // 左下確認
                // 変わるパネルがあるか判定
                for (i = v + 1, j = s - 1; i <= 6 || j >= 0; i++, j--) { 
                    console.log(`縦:${i}`);
                    console.log(`横:${j}`);
                    console.log(pan[i][j]);
                    if (pan[i][j] !== cn && pan[i][j] > 1) {
                        panelPreChange = true;
                        console.log("左下チェックあり");
                    } else if (pan[i][j] <= 1) {
                        panelPreChange = false;
                        console.log("左下チェック停止1");
                        break;
                    } else {
                        if (panelPreChange) {
                            console.log("左下チェック停止2");
                            break;
                        }
                    }
                }
                console.log("左下チェック通過");
                // パネルを変える
                if (panelPreChange) {
                    for (i = v + 1, j = s - 1; i <= 6 || j >= 0; i++, j--) {
                        if (pan[i][j] !== cn && pan[i][j] > 1) {
                            let cNum = (i - 1) * 5 + j;
                            this.colorSet(cn, cNum, i, j);
                            console.log("左下チェンジ");
                        } else {
                            console.log("左下チェンジ停止");
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                console.log("左下完了"); 
                // // 右上確認
                // 変わるパネルがあるか判定
                for (i = v - 1, j = s + 1; i >= 0 || j <= 6; i--, j++) { 
                    console.log(`縦:${i}`);
                    console.log(`横:${j}`);
                    console.log(pan[i][j]);
                    if (pan[i][j] !== cn && pan[i][j] > 1) {
                        panelPreChange = true;
                        console.log("右上チェックあり");
                    } else if (pan[i][j] <= 1) {
                        panelPreChange = false;
                        console.log("右上チェック停止1");
                        break;
                    } else {
                        if (panelPreChange) {
                            console.log("右上チェック停止2");
                            break;
                        }
                    }
                }
                console.log("右上チェック通過");
                // パネルを変える
                if (panelPreChange) {
                    for (i = v - 1, j = s + 1; i >= 0 || j <= 6; i--, j++) {
                        if (pan[i][j] !== cn && pan[i][j] > 1) {
                            let cNum = (i - 1) * 5 + j;
                            this.colorSet(cn, cNum, i, j);
                            console.log("右上チェンジ");
                        } else {
                            console.log("右上チェンジ停止");
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                console.log("右上完了");
                // 右下確認
                // 変わるパネルがあるか判定
                for (i = v + 1, j = s + 1; i <= 6 || j <= 6; i++, j++) { 
                    console.log(`縦:${i}`);
                    console.log(`横:${j}`);
                    console.log(pan[i][j]);
                    if (pan[i][j] !== cn && pan[i][j] > 1) {
                        panelPreChange = true;
                        console.log("右下チェックあり");
                    } else if (pan[i][j] <= 1) {
                        panelPreChange = false;
                        console.log("右下チェック停止1");
                        break;
                    } else {
                        if (panelPreChange) {
                            console.log("右下チェック停止2");
                            break;
                        }
                    }
                }
                console.log("右下チェック通過");
                // パネルを変える
                if (panelPreChange) {
                    for (i = v + 1, j = s + 1; i <= 6 || j <= 6; i++, j++) {
                        if (pan[i][j] !== cn && pan[i][j] > 1) {
                            let cNum = (i - 1) * 5 + j;
                            this.colorSet(cn, cNum, i, j);
                            console.log("右下チェンジ");
                        } else {
                            console.log("右下チェンジ停止");
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                console.log("右下完了"); 
            }
        },
        total: function () {
            let redCount = 0;
            let greenCount = 0;
            let whiteCount = 0;
            let blueCount = 0;
            for (x = 0; x <= 6; x++) {
                for (y = 0; y <= 6; y++) {
                    switch (panels[x][y]) {
                        case colors.RED:
                            redCount++;
                            break;
                        case colors.GREEN:
                            greenCount++;
                            break;
                        case colors.WHITE:
                            whiteCount++;
                            break;
                        case colors.BLUE:
                            blueCount++;
                            break;
                        default:
                            break;
                    }
                }
            }
            this.result = `赤:${redCount},緑:${greenCount},白:${whiteCount},青:${blueCount}`;
        }
    }
})
app.mount('#app')