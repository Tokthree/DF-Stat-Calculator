$(document).ready(function () {
    //#region Selectors
    const rangeColl = document.querySelectorAll('input[type=range]');
    const numColl = document.querySelectorAll('input[type=number]');
    const pointsReqSel = document.getElementById('freePoints');
    const levelReqSel = document.getElementById('reqLevel');
    //#endregion

    //#region Global Variables
    let i;
    let level = 1;
    let levelReq = 1;
    let statTotal = 150;
    let pointsTotal = 0;
    let pointsReq = 0;
    //let strValue = 25;
    let strBase = 25;
    let strBoost = 0;
    //let endValue = 25;
    let endBase = 25;
    let endBoost = 0;
    //let agiValue = 25;
    let agiBase = 25;
    let agiBoost = 0;
    //let accValue = 25;
    let accBase = 25;
    let accBoost = 0;
    let w1AccBoost = 0;
    let w2AccBoost = 0;
    let w3AccBoost = 0;
    //let critValue = 25;
    let critBase = 25;
    let critBoost = 0;
    let w1CritBoost = 0;
    let w2CritBoost = 0;
    let w3CritBoost = 0;
    //let relValue = 25;
    let relBase = 25;
    let relBoost = 0;
    let w1RelBoost = 0;
    let w2RelBoost = 0;
    let w3RelBoost = 0;
    //#endregion

    //#region Functions
    function statUpdate () {
        var content = this.nextElementSibling;
        var statValue = parseInt(this.value);
        var boostValue;
        var boostSValue;
        if (this.id == "str") {
            strBase = statValue;
            boostValue = strBoost;
            boostSValue = statValue + boostValue;
            //strValue = boostSValue;
            content.textContent = boostSValue+" ("+statValue+" + "+strBoost+")";
        } else if (this.id == "end") {
            endBase = statValue;
            boostValue = endBoost;
            boostSValue = statValue + boostValue;
            //endValue = boostSValue;
            content.textContent = boostSValue+" ("+statValue+" + "+endBoost+")";
        } else if (this.id == "agi") {
            agiBase = statValue;
            boostValue = agiBoost;
            boostSValue = statValue + boostValue;
            //agiValue = boostSValue;
            content.textContent = boostSValue+" ("+statValue+" + "+agiBoost+")";
        } else if (this.id == "acc") {
            accBase = statValue;
            boostValue = accBoost;
            boostSValue = statValue + boostValue;
            //accValue = boostSValue;
            content.textContent = boostSValue+" ("+statValue+" + "+accBoost+")";
        } else if (this.id == "crit") {
            critBase = statValue;
            boostValue = critBoost;
            boostSValue = statValue + boostValue;
            //critValue = boostSValue;
            content.textContent = boostSValue+" ("+statValue+" + "+critBoost+")";
        } else if (this.id == "rel") {
            relBase = statValue;
            boostValue = relBoost;
            boostSValue = statValue + boostValue;
            //relValue = boostSValue;
            content.textContent = boostSValue+" ("+statValue+" + "+relBoost+")";
        };
        statTotal = strBase + endBase + agiBase + accBase + critBase + relBase;
        pointsReq = statTotal - 150;
        if (level <= 50 && level > 0) {
            pointsTotal = (level - 1) * 5;
        } else if (level <= 220 && level > 0) {
            pointsTotal = (level - 50) + 245;
        } else if (level > 220) {
            pointsTotal = 415;
        } else {
            pointsTotal = 0;
        };
        pointsTotal = pointsTotal - pointsReq;
        pointsReqSel.textContent = pointsTotal;
        if (pointsReq <= 245 && pointsReq > 0) {
            levelReq = Math.ceil((pointsReq / 5) + 1);
            levelReqSel.textContent = levelReq;
        } else if (pointsReq <= 415 && pointsReq > 0) {
            levelReq = (pointsReq - 245) + 50;
            levelReqSel.textContent = levelReq;
        } else if (pointsReq > 415) {
            levelReqSel.textContent = "Impossible";
        } else {
            levelReq = 1;
            levelReqSel.textContent = levelReq;
        };
    };

    function boostUpdate () {
        var inputValue = parseInt(this.value);
        if (this.id == "level") {
            if (inputValue < 1) {
                this.value = 1;
                level = 1;
            } else if (inputValue > 325) {
                this.value = 325;
                level = 325;
            } else {
                level = inputValue;
            };
            if (level <= 50 && level > 0) {
                pointsTotal = ((level - 1) * 5) - pointsReq;
            } else if (level <= 220 && level > 0) {
                pointsTotal = ((level - 50) + 245) - pointsReq;
            } else if (level > 220) {
                pointsTotal = 415 - pointsReq;
            } else {
                pointsTotal = 0 - pointsReq;
            };
            pointsReqSel.textContent = pointsTotal;
        } else if (this.id == "armAgi") {
            if (inputValue > 24) {
                this.value = 24;
                agiBoost = 24;
            } else if (inputValue < 0) {
                this.value = 0;
                agiBoost = 0;
            } else {
                agiBoost = inputValue;
            };
        } else if (this.id == "armEnd") {
            if (inputValue > 24) {
                this.value = 24;
                endBoost = 24;
            } else if (inputValue < 0) {
                this.value = 0;
                endBoost = 0;
            } else {
                endBoost = inputValue;
            };
        } else if (this.id == "w1Acc") {
            if (inputValue > 8) {
                this.value = 8;
                w1AccBoost = 8;
            } else if (inputValue < 0) {
                this.value = 0;
                w1AccBoost = 0;
            } else {
                w1AccBoost = inputValue;
            };
        } else if (this.id == "w1Rel") {
            if (inputValue > 8) {
                this.value = 8;
                w1RelBoost = 8;
            } else if (inputValue < 0) {
                this.value = 0;
                w1RelBoost = 0;
            } else {
                w1RelBoost = inputValue;
            };
        } else if (this.id == "w1Crit") {
            if (inputValue > 8) {
                this.value = 8;
                w1CritBoost = 8;
            } else if (inputValue < 0) {
                this.value = 0;
                w1CritBoost = 0;
            } else {
                w1CritBoost = inputValue;
            };
        } else if (this.id == "w2Acc") {
            if (inputValue > 8) {
                this.value = 8;
                w2AccBoost = 8;
            } else if (inputValue < 0) {
                this.value = 0;
                w2AccBoost = 0;
            } else {
                w2AccBoost = inputValue;
            };
        } else if (this.id == "w2Rel") {
            if (inputValue > 8) {
                this.value = 8;
                w2RelBoost = 8;
            } else if (inputValue < 0) {
                this.value = 0;
                w2RelBoost = 0;
            } else {
                w2RelBoost = inputValue;
            };
        } else if (this.id == "w2Crit") {
            if (inputValue > 8) {
                this.value = 8;
                w2CritBoost = 8;
            } else if (inputValue < 0) {
                this.value = 0;
                w2CritBoost = 0;
            } else {
                w2CritBoost = inputValue;
            };
        } else if (this.id == "w3Acc") {
            if (inputValue > 8) {
                this.value = 8;
                w3AccBoost = 8;
            } else if (inputValue < 0) {
                this.value = 0;
                w3AccBoost = 0;
            } else {
                w3AccBoost = inputValue;
            };
        } else if (this.id == "w3Rel") {
            if (inputValue > 8) {
                this.value = 8;
                w3RelBoost = 8;
            } else if (inputValue < 0) {
                this.value = 0;
                w3RelBoost = 0;
            } else {
                w3RelBoost = inputValue;
            };
        } else if (this.id == "w3Crit") {
            if (inputValue > 8) {
                this.value = 8;
                w3CritBoost = 8;
            } else if (inputValue < 0) {
                this.value = 0;
                w3CritBoost = 0;
            } else {
                w3CritBoost = inputValue;
            };
        };
    };
    //#endregion

    //#region Listeners
    for (i = 0; i < rangeColl.length; i++) {
    rangeColl[i].addEventListener("input", function () {
        statUpdate.call(this);
    });
    };

    for (i = 0; i < numColl.length; i++) {
    numColl[i].addEventListener("input", function () {
        boostUpdate.call(this);
    });
    };
    //#endregion
});