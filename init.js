let thHead = document.getElementById("head");
let trName = document.getElementById("name");
let inputHex = document.getElementById("hex");
let trToggle = document.getElementById("toggle");

let bitsNames = [
    ">=", "!>=", // 23, 22
    "M", "S3", "S2", "S1", "S0", "CN", // 21, 20, 19, 18, 17, 16
    "A0", "A1", "B0", "B1", // 15, 14, 13, 12
    "OUT0", "OUT1", "OUT2", // 11, 10, 9
    "?", "?", // 8, 7
    "C", // 6
    "RD", "WD", // 5, 4
    "G?", // 3
    "JP0", "JP1", "JP2" // 2, 1, 0
];

let toggles = [];
let togglesFace = [];

function toggleToHex() {
    inputHex.value = "";
    let num = 0;
    for (let i = 0; i < toggles.length; i++) {
        num = num * 2 + (toggles[i].checked ? 1 : 0);
        togglesFace[i].style.background = (toggles[i].checked ? "#6F6" : "#666");
    }

    inputHex.value = num.toString(16).toUpperCase();
}

function hexToToggle() {
    let num = parseInt(eval("0x" + inputHex.value));
    for (let i = toggles.length - 1; i >= 0; i--) {
        toggles[i].checked = (num & 0x1 == 1);
        num = num >> 1;
        togglesFace[i].style.background = (toggles[i].checked ? "#6F6" : "#666");
    }
}

function postHistory() {
    let divHistory = document.getElementById("history");
    let buttonItem = document.createElement("button");
    let br = document.createElement("br");
    buttonItem.innerHTML = inputHex.value;
    buttonItem.addEventListener("click", (function () {
        inputHex.value = this.innerHTML.toUpperCase();
        hexToToggle();
    }), false);
    buttonItem.addEventListener("dblclick", (function () {
        inputHex.value = this.innerHTML.toUpperCase();
        hexToToggle();
        this.br.remove();
        this.remove();
    }), false);
    buttonItem.br = br;
    divHistory.append(buttonItem);
    divHistory.append(br);
}

function copyHex() {
    inputHex.select();
    navigator.clipboard.writeText(inputHex.value);
}

function clearAllBits() {
    inputHex.value = 0;
    hexToToggle();
}

(function() {
    for (let i = 0; i < bitsNames.length; i++) {
        let tdName = document.createElement("td");
        let divInName = document.createElement("div");
        divInName.innerHTML = bitsNames[i];
        tdName.append(divInName);
        trName.append(tdName);

        let tdToggle = document.createElement("td");
        let inputInToggle = document.createElement("input");
        inputInToggle.type = "checkbox";
        inputInToggle.addEventListener("change", (function () {
            toggleToHex();
        }), false);
        inputInToggle.id = "toggle_" + i;
        let labelToggle = document.createElement("label");
        labelToggle.className = "checkbox";
        labelToggle.setAttribute("for", inputInToggle.id);
        tdToggle.append(inputInToggle);
        tdToggle.append(labelToggle);
        trToggle.append(tdToggle);
        toggles.push(inputInToggle);
        togglesFace.push(labelToggle);

    }
})();

toggleToHex();