// 使用色番号保持
let color = 0;
// パネル
let panels = [
    [-1, -1, -1, -1, -1, -1, -1],
    [-1, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, -1],
    [-1, 0, 0, 0, 0, 0, -1],
    [-1, -1, -1, -1, -1, -1, -1]
];

// チェックパネル
let checkPanel = [
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false]
];

// 色定数
const colors = {
    GRAY: 0,
    YELLOW: 1,
    RED: 2,
    GREEN: 3,
    WHITE: 4,
    BLUE: 5,
    FRAME: -1
}

const app = Vue.createApp({
    data: () => ({
        message: 'I have seen it...',
        result: '赤:0,緑:0,白:0,青:0',
        strColor: '',
        warning: '',
        PanelNo: ''
    }),
    methods:{
        choiceColor: function(num) {
            switch(num) {
                case colors.RED: color = 2;
                // console.log("red");
                break;
                case colors.GREEN: color = 3;
                // console.log("green");
                break;
                case colors.WHITE: color = 4;
                // console.log("white");
                break;
                case colors.BLUE: color = 5;
                // console.log("blue");
                break;
                case colors.YELLOW: color = 1;
                // console.log("yellow");
                break;
                default: color = 0;
                // console.log("gray");
                break;
            }
            this.currentColor();
            // 入れるかチェック
            // 条件番号
            let condNo = 9;
            // 取得可能な番号
            let pNo = 0;
            let canGetPanelNo = [];
            // チェックワークパネル
            let checkPanelwk = [
                [9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9],
                [9, 9, 9, 9, 9, 9, 9]
            ];
            // チェックパネル初期化
            for (m = 0; m <= 6; m++) {
                for (n = 0; n <= 6; n++) {
                    checkPanel[m][n] = false;
                }
            }
            // 条件確認ロジック
            for (m = 0; m <= 6; m++) {
                for (n = 0; n <= 6; n++) {
                    if (panels[m][n] === colors.GRAY) {
                       // 変わる条件を判定
                        checkPanelwk[m][n] = this.canGetPanelCheck(m, n); 
                    }
                    if (checkPanelwk[m][n] < condNo) {
                        condNo = checkPanelwk[m][n];
                    }
                }
            }
            console.log(`条件内容${checkPanelwk}`);
            console.log(`適用条件${condNo}`);
            for (m = 0; m <= 6; m++) {
                for (n = 0; n <= 6; n++) {
                    if (checkPanelwk[m][n] === condNo) {
                       // 変わるパネルがあるか判定
                        checkPanel[m][n] = true;
                    }
                    if (checkPanel[m][n]) {
                        pNo = (m - 1) * 5 + n;
                        canGetPanelNo.push(pNo.toString());
                    }
                }
            }
            console.log(`変更可能${checkPanel}`);
            this.PanelNo = canGetPanelNo.join(",");
        },
        action: function(num) {
            // 縦要素番号
            let verNo = 0;
            // 横要素番号
            let sideNo = 0;
            // パネルID
            let panelId = num;
            // ロジック
            if (num <= 25 && num > 0) {
                // 取得配列要素取得
                Math.floor(num / 5) < 5 && num % 5 !== 0? verNo = Math.floor(num / 5) + 1: verNo = Math.floor(num / 5);
                num % 5 == 0? sideNo = 5: sideNo = num % 5;
                if (checkPanel[verNo][sideNo]) {
                    this.colorSet(color, panelId, verNo, sideNo);
                    this.panelChange(panels, verNo, sideNo);
                    this.total();
                    this.warning = ''
                } else {
                    this.warning = '今は取れません'
                }
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
                        panels[v][s] = colors.YELLOW;
                        elem.style.backgroundColor = "yellow";
                        break;
                    case 2:
                        panels[v][s] = colors.RED;
                        elem.style.backgroundColor = "red";
                        break;
                    case 3:
                        panels[v][s] = colors.GREEN;
                        elem.style.backgroundColor = "green";
                        break;
                    case 4:
                        panels[v][s] = colors.WHITE;
                        elem.style.backgroundColor = "white";
                        break;
                    case 5:
                        panels[v][s] = colors.BLUE;
                        elem.style.backgroundColor = "blue";
                        break;
                    default:
                        panels[v][s] = colors.GRAY; 
                        elem.style.backgroundColor = "gray";
                        break;
                }
            }
        },
        panelChange: function(pan, v, s) {
            // 起点の色
            let cn = pan[v][s];
            // console.log(cn);
            // パネル変わる可能性
            let panelPreChange = false;
            // 色判定（0:灰色、1:黄色は除外）
            if (cn >= colors.RED) {
                // 上確認
                // 変わるパネルがあるか判定
                panelPreChange = this.upSandCheck(panelPreChange, cn, v, s);
                // console.log(`${panelPreChange}:上チェック通過`);
                // パネルを変える
                if (panelPreChange) {
                    for (i = v - 1; i >= 0; i--) {
                        if (pan[i][s] !== cn && pan[i][s] > colors.YELLOW) {
                            let cNum = (i - 1) * 5 + s;
                            this.colorSet(cn, cNum, i, s);
                            // console.log("上チェンジ");
                        } else {
                            // console.log("上チェンジ停止");
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                // console.log("上完了");
                // 下確認
                // 変わるパネルがあるか判定
                panelPreChange = this.downSandCheck(panelPreChange, cn, v, s);
                // console.log(`${panelPreChange}:下チェック通過`);
                // パネルを変える
                if (panelPreChange) {
                    for (i = v + 1; i <= 6; i++) {
                        if (pan[i][s] !== cn && pan[i][s] > colors.YELLOW) {
                            let cNum = (i - 1) * 5 + s;
                            this.colorSet(cn, cNum, i, s);
                            // console.log("下チェンジ");
                        } else {
                            // console.log("下チェンジ停止");
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                // console.log("下完了");
                // 左確認
                // 変わるパネルがあるか判定
                panelPreChange = this.leftSandCheck(panelPreChange, cn, v, s);
                // console.log(`${panelPreChange}:左チェック通過`);
                // パネルを変える
                if (panelPreChange) {
                    for (i = s - 1; i >= 0; i--) {
                        if (pan[v][i] !== cn && pan[v][i] > colors.YELLOW) {
                            let cNum = (v - 1) * 5 + i;
                            this.colorSet(cn, cNum, v, i);
                            // console.log("左チェンジ");
                        } else {
                            // console.log("左チェンジ停止");
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                // console.log("左完了");
                // 右確認
                // 変わるパネルがあるか判定
                panelPreChange = this.rightSandCheck(panelPreChange, cn, v, s);
                // console.log(`${panelPreChange}:右チェック通過`);
                // パネルを変える
                if (panelPreChange) {
                    for (i = s + 1; i <= 6; i++) {
                        if (pan[v][i] !== cn && pan[v][i] > colors.YELLOW) {
                            let cNum = (v - 1) * 5 + i;
                            this.colorSet(cn, cNum, v, i);
                            // console.log("右チェンジ");
                        } else {
                            // console.log("右チェンジ停止");
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                // console.log("右完了");
                // 左上確認
                // 変わるパネルがあるか判定
                panelPreChange = this.leftUpSandCheck(panelPreChange, cn, v, s);
                // console.log(`${panelPreChange}:左上チェック通過`);
                // パネルを変える
                if (panelPreChange) {
                    for (i = v - 1, j = s - 1; i >= 0 || j >= 0; i--, j--) {
                        if (pan[i][j] !== cn && pan[i][j] > colors.YELLOW) {
                            let cNum = (i - 1) * 5 + j;
                            this.colorSet(cn, cNum, i, j);
                            // console.log("左上チェンジ");
                        } else {
                            // console.log("左上チェンジ停止");
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                // console.log("左上完了");
                // 左下確認
                // 変わるパネルがあるか判定
                panelPreChange = this.leftDownSandCheck(panelPreChange, cn, v, s);
                // console.log(`${panelPreChange}:左下チェック通過`);
                // パネルを変える
                if (panelPreChange) {
                    for (i = v + 1, j = s - 1; i <= 6 || j >= 0; i++, j--) {
                        if (pan[i][j] !== cn && pan[i][j] > colors.YELLOW) {
                            let cNum = (i - 1) * 5 + j;
                            this.colorSet(cn, cNum, i, j);
                            // console.log("左下チェンジ");
                        } else {
                            // console.log("左下チェンジ停止");
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                // console.log("左下完了"); 
                // // 右上確認
                // 変わるパネルがあるか判定
                panelPreChange = this.rightUpSandCheck(panelPreChange, cn, v, s);
                // console.log(`${panelPreChange}:右上チェック通過`);
                // パネルを変える
                if (panelPreChange) {
                    for (i = v - 1, j = s + 1; i >= 0 || j <= 6; i--, j++) {
                        if (pan[i][j] !== cn && pan[i][j] > colors.YELLOW) {
                            let cNum = (i - 1) * 5 + j;
                            this.colorSet(cn, cNum, i, j);
                            // console.log("右上チェンジ");
                        } else {
                            // console.log("右上チェンジ停止");
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                // console.log("右上完了");
                // 右下確認
                // 変わるパネルがあるか判定
                panelPreChange = this.rightDownSandCheck(panelPreChange, cn, v, s);
                // console.log(`${panelPreChange}:右下チェック通過`);
                // パネルを変える
                if (panelPreChange) {
                    for (i = v + 1, j = s + 1; i <= 6 || j <= 6; i++, j++) {
                        if (pan[i][j] !== cn && pan[i][j] > colors.YELLOW) {
                            let cNum = (i - 1) * 5 + j;
                            this.colorSet(cn, cNum, i, j);
                            // console.log("右下チェンジ");
                        } else {
                            // console.log("右下チェンジ停止");
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                // console.log("右下完了"); 
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
        },
        currentColor: function () {
            switch (color) {
                case colors.YELLOW:
                    this.strColor = "黄";
                    break;
                case colors.RED:
                    this.strColor = "赤";
                    break;
                case colors.GREEN:
                    this.strColor = "緑";
                    break;
                case colors.WHITE:
                    this.strColor = "白";
                    break;
                case colors.BLUE:
                    this.strColor = "青";
                    break;
                default:
                    this.strColor = "灰";
                    break;
            }
        },
        canGetPanelCheck: function (v, s) {
            // 取得可能フラグ（1:挟める箇所,2:次挟める箇所,3:自分や他人と隣接している箇所,9:それ以外）
            let canGetPanel = 9;
            // 最初の判定フラグ
            let beginLock = false;
            // 挟める箇所フラグ
            let sandPanel = false;
            // 最初は配列[3][3]（13番）のみ
            if (panels[3][3] === colors.GRAY) {
                beginLock = true;
                if (v === 3 && s === 3) {
                    canGetPanel = 1;
                    beginLock = false;
                }                
            }
            // 挟める箇所か
            if (canGetPanel === 9) {
                if (this.upSandCheck(sandPanel, color, v, s)) {
                    canGetPanel = 1;
                } else if (canGetPanel !== 1 && this.downSandCheck(sandPanel, color, v, s)) {
                    canGetPanel = 1;
                } else if (canGetPanel !== 1 && this.leftSandCheck(sandPanel, color, v, s)) {
                    canGetPanel = 1;
                } else if (canGetPanel !== 1 && this.rightSandCheck(sandPanel, color, v, s)) {
                    canGetPanel = 1;
                } else if (canGetPanel !== 1 && this.leftUpSandCheck(sandPanel, color, v, s)) {
                    canGetPanel = 1;
                } else if (canGetPanel !== 1 && this.leftDownSandCheck(sandPanel, color, v, s)) {
                    canGetPanel = 1;
                } else if (canGetPanel !== 1 && this.rightUpSandCheck(sandPanel, color, v, s)) {
                    canGetPanel = 1;
                } else if (canGetPanel !== 1 && this.rightDownSandCheck(sandPanel, color, v, s)) {
                    canGetPanel = 1;
                }
            }
            // console.log(`${canGetPanel}:canGetPanel確認`);
            // 次挟める箇所か
            if (canGetPanel !== 1) {
                // 上確認
                if (!beginLock) {
                    // 挟む対象判定フラグ
                    isSandTarget = false;
                    for (a = v - 1; a >= 0; a--) {
                        if (panels[a][s] !== color && panels[a][s] > colors.YELLOW) {
                            isSandTarget = true;
                        } else if (panels[a][s] === colors.GRAY || panels[a][s] === colors.YELLOW) {
                            if (isSandTarget) {
                                canGetPanel = 2;
                            }
                            break;
                        } else {
                            break;
                        }
                    }
                }
                // console.log(`${canGetPanel}:上通過`);
                // 下確認
                if (!(canGetPanel <= 2) && !beginLock) {
                    // 挟む対象判定フラグ
                    isSandTarget = false;
                    for (a = v + 1; a <= 6; a++) {
                        if (panels[a][s] !== color && panels[a][s] > colors.YELLOW) {
                            isSandTarget = true;
                        } else if (panels[a][s] === colors.GRAY || panels[a][s] === colors.YELLOW) {
                            if (isSandTarget) {
                                canGetPanel = 2;
                            }
                            break;
                        } else {
                            break;
                        }
                    }                
                }
                // console.log(`${canGetPanel}:下通過`);
                // 左確認
                if (!(canGetPanel <= 2) && !beginLock) {
                    // 挟む対象判定フラグ
                    isSandTarget = false;
                    for (a = s - 1; a >= 0; a--) {
                        if (panels[v][a] !== color && panels[v][a]  > colors.YELLOW) {
                            isSandTarget = true;
                        } else if (panels[v][a]  === colors.GRAY || panels[v][a]  === colors.YELLOW) {
                            if (isSandTarget) {
                                canGetPanel = 2;
                            }
                            break;
                        } else {
                            break;
                        }
                    }
                }
                // console.log(`${canGetPanel}:左通過`);
                // 右確認
                if (!(canGetPanel <= 2) && !beginLock) {
                    // 挟む対象判定フラグ
                    isSandTarget = false;
                    for (a = s + 1; a <= 6; a++) {
                        if (panels[v][a] !== color && panels[v][a]  > colors.YELLOW) {
                            isSandTarget = true;
                        } else if (panels[v][a]  === colors.GRAY || panels[v][a]  === colors.YELLOW) {
                            if (isSandTarget) {
                                canGetPanel = 2;
                            }
                            break;
                        } else {
                            break;
                        }
                    }              
                }
                // console.log(`${canGetPanel}:右通過`);
                // 左上確認
                if (!(canGetPanel <= 2) && !beginLock) {
                    // 挟む対象判定フラグ
                    isSandTarget = false;
                    for (a = v - 1, b = s - 1; a >= 0 || b >= 0; a--, b--) {
                        // console.log(`a:${a},b:${b}`);
                        if (panels[a][b] !== color && panels[a][b]  > colors.YELLOW) {
                            isSandTarget = true;
                        } else if (panels[a][b]  === colors.GRAY || panels[a][b]  === colors.YELLOW) {
                            if (isSandTarget) {
                                canGetPanel = 2;
                            }
                            break;
                        } else {
                            break;
                        }
                    }
                }
                // console.log(`${canGetPanel}:左上通過`);
                // 左下確認
                if (!(canGetPanel <= 2) && !beginLock) {
                    // 挟む対象判定フラグ
                    isSandTarget = false;
                    for (a = v + 1, b = s - 1; a <= 6 || b >= 0; a++, b--) {
                        if (panels[a][b] !== color && panels[a][b]  > colors.YELLOW) {
                            isSandTarget = true;
                        } else if (panels[a][b]  === colors.GRAY || panels[a][b]  === colors.YELLOW) {
                            if (isSandTarget) {
                                canGetPanel = 2;
                            }
                            break;
                        } else {
                            break;
                        }
                    }
                }
                // console.log(`${canGetPanel}:左下通過`);
                // 右上確認
                if (!(canGetPanel <= 2) && !beginLock) {
                    // 挟む対象判定フラグ
                    isSandTarget = false;
                    for (a = v - 1, b = s + 1; a >= 0 || b <= 6; a--, b++) {
                        if (panels[a][b] !== color && panels[a][b]  > colors.YELLOW) {
                            isSandTarget = true;
                        } else if (panels[a][b]  === colors.GRAY || panels[a][b]  === colors.YELLOW) {
                            if (isSandTarget) {
                                canGetPanel = 2;
                            }
                            break;
                        } else {
                            break;
                        }
                    }
                }
                // console.log(`${canGetPanel}:右上通過`);
                // 右下確認
                if (!(canGetPanel <= 2) && !beginLock) {
                    // 挟む対象判定フラグ
                    isSandTarget = false;
                    for (a = v + 1, b = s + 1; a <= 6 || b <= 6; a++, b++) {
                        if (panels[a][b] !== color && panels[a][b]  > colors.YELLOW) {
                            isSandTarget = true;
                        } else if (panels[a][b]  === colors.GRAY || panels[a][b]  === colors.YELLOW) {
                            if (isSandTarget) {
                                canGetPanel = 2;
                            }
                            break;
                        } else {
                            break;
                        }
                    }
                }
                // console.log(`${canGetPanel}:右下通過`);
                // console.log(`${canGetPanel}:canGetPanel確認`);
            }
            // 誰かのパネルに隣接しているか
            if (canGetPanel > 2) {
                if (panels[v - 1][s] >= colors.RED || panels[v + 1][s] >= colors.RED) {
                    canGetPanel = 3;
                } else if (panels[v][s - 1] >= colors.RED || panels[v][s + 1] >= colors.RED) {
                    canGetPanel = 3;                    
                } else if (panels[v - 1][s - 1] >= colors.RED || panels[v + 1][s - 1] >= colors.RED) {
                    canGetPanel = 3;
                } else if (panels[v - 1][s + 1] >= colors.RED || panels[v + 1][s + 1] >= colors.RED) {
                    canGetPanel = 3;
                }
                // console.log("隣接通過");
            }
            return canGetPanel;
        },
        upSandCheck: function (flag, cn, v, s) {
            for (i = v - 1; i >= 0; i--) {
                // console.log(`縦:${i},横:${s}`);
                if (panels[i][s] !== cn && panels[i][s] > colors.YELLOW) {
                    flag = true;
                } else if (panels[i][s] <= colors.YELLOW) {
                    flag = false;
                    break;
                } else {
                    if (flag) {
                        break;
                    }
                }
            }
            // console.log(`flag:${flag}`);
            return flag;
        },
        downSandCheck: function (flag, cn, v, s) {
            for (i = v + 1; i <= 6; i++) {
                // console.log(`縦:${i},横:${s}`);
                if (panels[i][s] !== cn && panels[i][s] > colors.YELLOW) {
                    flag = true;
                } else if (panels[i][s] <= colors.YELLOW) {
                    flag = false;
                    break;
                } else {
                    if (flag) {
                        break;
                    }
                }
            }
            // console.log(`flag:${flag}`);
            return flag;
        },
        leftSandCheck: function (flag, cn, v, s) {
            for (i = s - 1; i >= 0; i--) {
                // console.log(`縦:${v},横:${i}`);
                if (panels[v][i] !== cn && panels[v][i] > colors.YELLOW) {
                    flag = true;
                } else if (panels[v][i] <= colors.YELLOW) {
                    flag = false;
                    break;
                } else {
                    if (flag) {
                        break;
                    }
                }
            }
            // console.log(`flag:${flag}`);
            return flag;
        },
        rightSandCheck: function (flag, cn, v, s) {
            for (i = s + 1; i <= 6; i++) {
                // console.log(`縦:${v},横:${i}`);
                if (panels[v][i] !== cn && panels[v][i] > colors.YELLOW) {
                    flag = true;
                } else if (panels[v][i] <= colors.YELLOW) {
                    flag = false;
                    break;
                } else {
                    if (flag) {
                        break;
                    }
                }
            }
            // console.log(`flag:${flag}`);
            return flag;
        },
        leftUpSandCheck: function (flag, cn, v, s) {
            for (i = v - 1, j = s - 1; i >= 0 || j >= 0; i--, j--) {
                // console.log(`縦:${i},横:${j}`);
                if (panels[i][j] !== cn && panels[i][j] > colors.YELLOW) {
                    flag = true;
                } else if (panels[i][j] <= colors.YELLOW) {
                    flag  = false;
                    break;
                } else {
                    if (flag) {
                        break;
                    }
                }
            }
            // console.log(`flag:${flag}`);
            return flag;
        },
        leftDownSandCheck: function (flag, cn, v, s) {
            for (i = v + 1, j = s - 1; i <= 6 || j >= 0; i++, j--) { 
                // console.log(`縦:${i},横:${j}`);
                if (panels[i][j] !== cn && panels[i][j] > colors.YELLOW) {
                    flag = true;
                } else if (panels[i][j] <= colors.YELLOW) {
                    flag  = false;
                    break;
                } else {
                    if (flag) {
                        break;
                    }
                }
            }
            // console.log(`flag:${flag}`);
            return flag;
        },
        rightUpSandCheck: function (flag, cn, v, s) {
            for (i = v - 1, j = s + 1; i >= 0 || j <= 6; i--, j++) {
                // console.log(`縦:${i},横:${j}`); 
                if (panels[i][j] !== cn && panels[i][j] > colors.YELLOW) {
                    flag = true;
                } else if (panels[i][j] <= colors.YELLOW) {
                    flag  = false;
                    break;
                } else {
                    if (flag) {
                        break;
                    }
                }
            }
            // console.log(`flag:${flag}`);
            return flag;
        },
        rightDownSandCheck: function (flag, cn, v, s) {
            for (i = v + 1, j = s + 1; i <= 6 || j <= 6; i++, j++) {
                // console.log(`縦:${i},横:${j}`);
                if (panels[i][j] !== cn && panels[i][j] > colors.YELLOW) {
                    flag = true;
                } else if (panels[i][j] <= colors.YELLOW) {
                    flag  = false;
                    break;
                } else {
                    if (flag) {
                        break;
                    }
                }
            }
            // console.log(`flag:${flag}`);
            return flag;
        }
    }
})
app.mount('#app')