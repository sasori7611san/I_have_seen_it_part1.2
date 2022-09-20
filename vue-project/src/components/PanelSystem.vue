<template>
    <p>{{ message }}</p>
    <div class ="panel">
        <button id="1" class="gray" v-on:click="action(1);">1</button><button id="2" class="gray" v-on:click="action(2);">2</button><button id="3" class="gray" v-on:click="action(3);">3</button><button id="4" class="gray" v-on:click="action(4);">4</button><button id="5" class="gray" v-on:click="action(5);">5</button><br />
        <button id="6" class="gray" v-on:click="action(6);">6</button><button id="7" class="gray" v-on:click="action(7);">7</button><button id="8" class="gray" v-on:click="action(8);">8</button><button id="9" class="gray" v-on:click="action(9);">9</button><button id="10" class="gray" v-on:click="action(10);">10</button><br />
        <button id="11" class="gray" v-on:click="action(11);">11</button><button id="12" class="gray" v-on:click="action(12);">12</button><button id="13" class="gray" v-on:click="action(13);">13</button><button id="14" class="gray" v-on:click="action(14);">14</button><button id="15" class="gray" v-on:click="action(15);">15</button><br />
        <button id="16" class="gray" v-on:click="action(16);">16</button><button id="17" class="gray" v-on:click="action(17);">17</button><button id="18" class="gray" v-on:click="action(18);">18</button><button id="19" class="gray" v-on:click="action(19);">19</button><button id="20" class="gray" v-on:click="action(20);">20</button><br />
        <button id="21" class="gray" v-on:click="action(21);">21</button><button id="22" class="gray" v-on:click="action(22);">22</button><button id="23" class="gray" v-on:click="action(23);">23</button><button id="24" class="gray" v-on:click="action(24);">24</button><button id="25" class="gray" v-on:click="action(25);">25</button><br />
    </div>
    <br />
    {{ warning }}
    <p>選択中の色：{{ strColor }}</p>
    <p>取れる番号は、{{ PanelNo }}</p>
    {{ result }}
    <div class="choice">
        <button id="buttonRed" v-on:click="choiceColor(2);"></button>
        <button id="buttonGreen" v-on:click="choiceColor(3);"></button>
        <button id="buttonWhite" v-on:click="choiceColor(4);"></button>
        <button id="buttonBlue" v-on:click="choiceColor(5);"></button><br />
        <button id="buttonYellow" v-on:click="choiceColor(1);"></button>
    </div>
    <p>更新で最初からに戻ります。</p>
</template>

<script>
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
    BLUE: 5
}

export default {
    name: "PanelSystem",
    data: () => {
        return {
            message: 'I have seen it...',
            result: '赤:0,緑:0,白:0,青:0',
            strColor: '',
            warning: '',
            PanelNo: ''
        }
    },
    methods:{
        // 色選択
        choiceColor: function(num) {
            switch(num) {
                case colors.RED: color = 2;
                break;
                case colors.GREEN: color = 3;
                break;
                case colors.WHITE: color = 4;
                break;
                case colors.BLUE: color = 5;
                break;
                case colors.YELLOW: color = 1;
                break;
                default: color = 0;
                break;
            }
            this.currentColor();
            // 取得可能な番号
            let pNo = 0;
            let canGetPanelNo = [];
            // for文用変数
            let m = 0;
            let n = 0;
            // 黄色（チャンスの場合は違うロジック）
            if (color == colors.YELLOW) {
                // チェックパネル初期化
                for (m = 0; m <= 6; m++) {
                    for (n = 0; n <= 6; n++) {
                        checkPanel[m][n] = false;
                    }
                }
                for (m = 0; m <= 6; m++) {
                    for (n = 0; n <= 6; n++) {
                        if (panels[m][n] >= colors.RED) {
                        // 変わる条件を判定
                            checkPanel[m][n] = true;
                        }
                        if (checkPanel[m][n]) {
                            pNo = (m - 1) * 5 + n;
                            canGetPanelNo.push(pNo.toString());
                        }
                    }
                }
            } else {
                // 取れるか否かチェック
                // 条件番号
                let condNo = 9;
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
                        if (panels[m][n] === colors.GRAY || panels[m][n] === colors.YELLOW) {
                        // 変わる条件を判定
                            checkPanelwk[m][n] = this.canGetPanelCheck(m, n); 
                        }
                        if (checkPanelwk[m][n] < condNo) {
                            condNo = checkPanelwk[m][n];
                        }
                    }
                }
                console.log(checkPanelwk);
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
            }
            this.PanelNo = canGetPanelNo.join(",");
        },

        // パネル取得
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

        // パネル色の設定
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

        // パネル変化ロジック
        panelChange: function(pan, v, s) {
            // 起点の色
            let cn = pan[v][s];
            // パネル変わる可能性
            let panelPreChange = false;
            // 色判定（0:灰色、1:黄色は除外）
            if (cn >= colors.RED) {
                // 上確認
                // 変わるパネルがあるか判定
                panelPreChange = this.upSandCheck(panelPreChange, cn, v, s);
                // for文用変数
                let i = 0;
                let j = 0;
                // パネルを変える
                if (panelPreChange) {
                    for (i = v - 1; i >= 0; i--) {
                        if (pan[i][s] !== cn && pan[i][s] > colors.YELLOW) {
                            let cNum = (i - 1) * 5 + s;
                            this.colorSet(cn, cNum, i, s);
                        } else {
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                // 下確認
                // 変わるパネルがあるか判定
                panelPreChange = this.downSandCheck(panelPreChange, cn, v, s);
                // パネルを変える
                if (panelPreChange) {
                    for (i = v + 1; i <= 6; i++) {
                        if (pan[i][s] !== cn && pan[i][s] > colors.YELLOW) {
                            let cNum = (i - 1) * 5 + s;
                            this.colorSet(cn, cNum, i, s);
                        } else {
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                // 左確認
                // 変わるパネルがあるか判定
                panelPreChange = this.leftSandCheck(panelPreChange, cn, v, s);
                // パネルを変える
                if (panelPreChange) {
                    for (i = s - 1; i >= 0; i--) {
                        if (pan[v][i] !== cn && pan[v][i] > colors.YELLOW) {
                            let cNum = (v - 1) * 5 + i;
                            this.colorSet(cn, cNum, v, i);
                        } else {
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                // 右確認
                // 変わるパネルがあるか判定
                panelPreChange = this.rightSandCheck(panelPreChange, cn, v, s);
                // パネルを変える
                if (panelPreChange) {
                    for (i = s + 1; i <= 6; i++) {
                        if (pan[v][i] !== cn && pan[v][i] > colors.YELLOW) {
                            let cNum = (v - 1) * 5 + i;
                            this.colorSet(cn, cNum, v, i);
                        } else {
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                // 左上確認
                // 変わるパネルがあるか判定
                panelPreChange = this.leftUpSandCheck(panelPreChange, cn, v, s);
                // パネルを変える
                if (panelPreChange) {
                    for (i = v - 1, j = s - 1; i >= 0 || j >= 0; i--, j--) {
                        if (pan[i][j] !== cn && pan[i][j] > colors.YELLOW) {
                            let cNum = (i - 1) * 5 + j;
                            this.colorSet(cn, cNum, i, j);
                        } else {
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                // 左下確認
                // 変わるパネルがあるか判定
                panelPreChange = this.leftDownSandCheck(panelPreChange, cn, v, s);
                // パネルを変える
                if (panelPreChange) {
                    for (i = v + 1, j = s - 1; i <= 6 || j >= 0; i++, j--) {
                        if (pan[i][j] !== cn && pan[i][j] > colors.YELLOW) {
                            let cNum = (i - 1) * 5 + j;
                            this.colorSet(cn, cNum, i, j);
                        } else {
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                // // 右上確認
                // 変わるパネルがあるか判定
                panelPreChange = this.rightUpSandCheck(panelPreChange, cn, v, s);
                // パネルを変える
                if (panelPreChange) {
                    for (i = v - 1, j = s + 1; i >= 0 || j <= 6; i--, j++) {
                        if (pan[i][j] !== cn && pan[i][j] > colors.YELLOW) {
                            let cNum = (i - 1) * 5 + j;
                            this.colorSet(cn, cNum, i, j);
                         } else {
                            break;
                        }
                    }
                    panelPreChange = false;
                }
                // 右下確認
                // 変わるパネルがあるか判定
                panelPreChange = this.rightDownSandCheck(panelPreChange, cn, v, s);
                // パネルを変える
                if (panelPreChange) {
                    for (i = v + 1, j = s + 1; i <= 6 || j <= 6; i++, j++) {
                        if (pan[i][j] !== cn && pan[i][j] > colors.YELLOW) {
                            let cNum = (i - 1) * 5 + j;
                            this.colorSet(cn, cNum, i, j);
                           } else {
                            break;
                        }
                    }
                    panelPreChange = false;
                }
            }
        },

        // 集計ロジック
        total: function () {
            let redCount = 0;
            let greenCount = 0;
            let whiteCount = 0;
            let blueCount = 0;
            // for文用変数
            let x = 0;
            let y = 0;
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

        // 選択中の色表示
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

        // 取得可能か確認する関数
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
            // 次挟める箇所か
            // for文用変数
            let a = 0;
            let b = 0;
            if (canGetPanel !== 1) {
                // 上確認
                if (!beginLock) {
                    // 挟む対象判定フラグ
                    let isSandTarget = false;
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
                // 下確認
                if (!(canGetPanel <= 2) && !beginLock) {
                    // 挟む対象判定フラグ
                    let isSandTarget = false;
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
                // 左確認
                if (!(canGetPanel <= 2) && !beginLock) {
                    // 挟む対象判定フラグ
                    let isSandTarget = false;
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
                // 右確認
                if (!(canGetPanel <= 2) && !beginLock) {
                    // 挟む対象判定フラグ
                    let isSandTarget = false;
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
                // 左上確認
                if (!(canGetPanel <= 2) && !beginLock) {
                    // 挟む対象判定フラグ
                    let isSandTarget = false;
                    for (a = v - 1, b = s - 1; a >= 0 || b >= 0; a--, b--) {
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
                // 左下確認
                if (!(canGetPanel <= 2) && !beginLock) {
                    // 挟む対象判定フラグ
                    let isSandTarget = false;
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
                // 右上確認
                if (!(canGetPanel <= 2) && !beginLock) {
                    // 挟む対象判定フラグ
                    let isSandTarget = false;
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
                // 右下確認
                if (!(canGetPanel <= 2) && !beginLock) {
                    // 挟む対象判定フラグ
                    let isSandTarget = false;
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
            }
            return canGetPanel;
        },

        // 挟めるか確認（上）
        upSandCheck: function (flag, cn, v, s) {
            // for文用変数
            let i = 0;
            for (i = v - 1; i >= 0; i--) {
                if (panels[i][s] !== cn && panels[i][s] > colors.YELLOW) {
                    flag = true;
                } else if (panels[i][s] <= colors.YELLOW) {
                    flag = false;
                    break;
                } else {
                    break;
                }
            }
            return flag;
        },

        // 挟めるか確認（下）
        downSandCheck: function (flag, cn, v, s) {
            // for文用変数
            let i = 0;
            for (i = v + 1; i <= 6; i++) {
                if (panels[i][s] !== cn && panels[i][s] > colors.YELLOW) {
                    flag = true;
                } else if (panels[i][s] <= colors.YELLOW) {
                    flag = false;
                    break;
                } else {
                    break;
                }
            }
            return flag;
        },

        // 挟めるか確認（左）
        leftSandCheck: function (flag, cn, v, s) {
            // for文用変数
            let i = 0;
            for (i = s - 1; i >= 0; i--) {
                if (panels[v][i] !== cn && panels[v][i] > colors.YELLOW) {
                    flag = true;
                } else if (panels[v][i] <= colors.YELLOW) {
                    flag = false;
                    break;
                } else {
                    break;
                }
            }
            return flag;
        },

        // 挟めるか確認（右）
        rightSandCheck: function (flag, cn, v, s) {
            // for文用変数
            let i = 0;
            for (i = s + 1; i <= 6; i++) {
                if (panels[v][i] !== cn && panels[v][i] > colors.YELLOW) {
                    flag = true;
                } else if (panels[v][i] <= colors.YELLOW) {
                    flag = false;
                    break;
                } else {
                    break;
                }
            }
            return flag;
        },

        // 挟めるか確認（左上）
        leftUpSandCheck: function (flag, cn, v, s) {
            // for文用変数
            let i = 0;
            let j = 0;
            for (i = v - 1, j = s - 1; i >= 0 || j >= 0; i--, j--) {
                if (panels[i][j] !== cn && panels[i][j] > colors.YELLOW) {
                    flag = true;
                } else if (panels[i][j] <= colors.YELLOW) {
                    flag  = false;
                    break;
                } else {
                    break;
                }
            }
            return flag;
        },

        // 挟めるか確認（左下）
        leftDownSandCheck: function (flag, cn, v, s) {
            // for文用変数
            let i = 0;
            let j = 0;
            for (i = v + 1, j = s - 1; i <= 6 || j >= 0; i++, j--) { 
                if (panels[i][j] !== cn && panels[i][j] > colors.YELLOW) {
                    flag = true;
                } else if (panels[i][j] <= colors.YELLOW) {
                    flag  = false;
                    break;
                } else {
                    break;
                }
            }
            return flag;
        },

        // 挟めるか確認（右上）
        rightUpSandCheck: function (flag, cn, v, s) {
            // for文用変数
            let i = 0;
            let j = 0;
            for (i = v - 1, j = s + 1; i >= 0 || j <= 6; i--, j++) {
                if (panels[i][j] !== cn && panels[i][j] > colors.YELLOW) {
                    flag = true;
                } else if (panels[i][j] <= colors.YELLOW) {
                    flag  = false;
                    break;
                } else {
                    break;
                }
            }
            return flag;
        },

        // 挟めるか確認（右下）
        rightDownSandCheck: function (flag, cn, v, s) {
            // for文用変数
            let i = 0;
            let j = 0;
            for (i = v + 1, j = s + 1; i <= 6 || j <= 6; i++, j++) {
                if (panels[i][j] !== cn && panels[i][j] > colors.YELLOW) {
                    flag = true;
                } else if (panels[i][j] <= colors.YELLOW) {
                    flag  = false;
                    break;
                } else {
                    break;
                }
            }
            return flag;
        }
    }
}
</script>

<style scoped>
    .panel > button {
    width: 60px;
    height: 60px;
}

.choice > button {
    margin: 5px;
    width: 50px;
    height: 50px;
}

.gray {
    background-color: gray;
}

.red {
    background-color: red;
}

.green {
    background-color: green;
}

.white {
    background-color: white;
}

.blue {
    background-color: blue;
}

.yellow {
    background-color: yellow;
}

#buttonGray {
    background-color: gray;
}

#buttonRed {
    background-color: red;
}

#buttonGreen {
    background-color: green;
}

#buttonWhite {
    background-color: white;
}

#buttonBlue {
    background-color: blue;
}

#buttonYellow {
    background-color: yellow;
}
</style>