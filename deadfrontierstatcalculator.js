$(document).ready(function () {
    //#region Selectors
    const rangeColl = document.querySelectorAll('input[type=range]');
    const numColl = document.querySelectorAll('input[type=number]');
    const pointsReqSel = document.getElementById('freePoints');
    const pointsPReqSel = document.getElementById('freePPoints');
    const levelReqSel = document.getElementById('reqLevel');
    //#endregion

    //#region Global Variables
    let i;
    let level = 1;
    let levelReq = 1;
    let statTotal = 150;
    let pointsTotal = 0;
    let pointsReq = 0;
    let profTotal = 10;
    let pointsPTotal = 0;
    let pointsPReq = 0;
    let strBase = 25;
    let strBoost = 0;
    let strClass = 0;
    let endBase = 25;
    let endBoost = 0;
    let endClass = 0;
    let armEnd = 0;
    let agiBase = 25;
    let agiBoost = 0;
    let agiClass = 0;
    let armAgi = 0;
    let accBase = 25;
    let accBoost = 0;
    let accClass = 0;
    let w1AccBoost = 0;
    let w2AccBoost = 0;
    let w3AccBoost = 0;
    let critBase = 25;
    let critBoost = 0;
    let critClass = 0;
    let w1CritBoost = 0;
    let w2CritBoost = 0;
    let w3CritBoost = 0;
    let relBase = 25;
    let relBoost = 0;
    let relClass = 0;
    let w1RelBoost = 0;
    let w2RelBoost = 0;
    let w3RelBoost = 0;
    let meleeBase = 5;
    let meleeBoost = 0;
    let pistolBase = 5;
    let pistolBoost = 0;
    let rifleBase = 0;
    let rifleBoost = 0;
    let shotgunBase = 0;
    let shotgunBoost = 0;
    let mgBase = 0;
    let mgBoost = 0;
    let exploBase = 0;
    let exploBoost = 0;
    //#endregion

    //#region Functions
    function makeForeignRequest(url, callback) //JSON pull function (credit to awoo, tyvm fren)
    {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function()
        {
            if(this.readyState === 4)
            {
                if(this.status === 200)
                {
                    callback(this.responseText);
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.send();
    }
    
    function parseOutClassArray(data) //Class parse function (Credit to Awoo 2: Credit Harder)
    {
        let jsonData = JSON.parse(data);
        let mainSelect = document.getElementById("classSelect");
        jsonData.forEach((val) =>
        {
            let option = document.createElement("option"); //Create <option> elements
            option.value = val["name"];
            option.textContent = val["name"];
            option.dataset.exp = val["exp"];
            option.dataset.str = val["str"];
            option.dataset.end = val["end"];
            option.dataset.agi = val["agi"];
            option.dataset.acc = val["acc"];
            option.dataset.crit = val["crit"];
            option.dataset.rel = val["rel"];
            option.dataset.melee = val["melee"];
            option.dataset.pistol = val["pistol"];
            option.dataset.rifle = val["rifle"];
            option.dataset.shotgun = val["shotgun"];
            option.dataset.mg = val["mg"];
            option.dataset.explo = val["explo"];
            mainSelect.appendChild(option);
        });
    }

    makeForeignRequest("classes.json", parseOutClassArray); //Pull JSON & parse

    function classUpdate() { //Armor update function
        strClass = parseInt(this.options[this.selectedIndex].dataset.str); //Set values
        endClass = parseInt(this.options[this.selectedIndex].dataset.end);
        agiClass = parseInt(this.options[this.selectedIndex].dataset.agi);
        accClass = parseInt(this.options[this.selectedIndex].dataset.acc);
        critClass = parseInt(this.options[this.selectedIndex].dataset.crit);
        relClass = parseInt(this.options[this.selectedIndex].dataset.rel);
        meleeBoost = parseInt(this.options[this.selectedIndex].dataset.melee);
        pistolBoost = parseInt(this.options[this.selectedIndex].dataset.pistol);
        rifleBoost = parseInt(this.options[this.selectedIndex].dataset.rifle);
        shotgunBoost = parseInt(this.options[this.selectedIndex].dataset.shotgun);
        mgBoost = parseInt(this.options[this.selectedIndex].dataset.mg);
        exploBoost = parseInt(this.options[this.selectedIndex].dataset.explo);

        strBoost = strClass;
        endBoost = endClass + armEnd;
        agiBoost = agiClass + armAgi;
        accBoost = accClass + w1AccBoost + w2AccBoost + w3AccBoost;
        critBoost = critClass + w1CritBoost + w2CritBoost + w3RelBoost;
        relBoost = relClass + w1RelBoost + w2RelBoost + w3RelBoost;
    };

    function displayUpdate () {
        for (i = 0; i < rangeColl.length; i++) {
            let elem = rangeColl[i];
            const content = elem.nextElementSibling;
            var statValue = parseInt(elem.value);
            var boostValue;
            if (elem.id == "str") {
                boostValue = statValue + strBoost
                content.textContent = boostValue+" ("+statValue+" + "+strBoost+")";
            } else if (elem.id == "end") {
                boostValue = statValue + endBoost
                content.textContent = boostValue+" ("+statValue+" + "+endBoost+")";
            } else if (elem.id == "agi") {
                boostValue = statValue + agiBoost
                content.textContent = boostValue+" ("+statValue+" + "+agiBoost+")";
            } else if (elem.id == "acc") {
                boostValue = statValue + accBoost
                content.textContent = boostValue+" ("+statValue+" + "+accBoost+")";
            } else if (elem.id == "crit") {
                boostValue = statValue + critBoost
                content.textContent = boostValue+" ("+statValue+" + "+critBoost+")";
            } else if (elem.id == "rel") {
                boostValue = statValue + relBoost
                content.textContent = boostValue+" ("+statValue+" + "+relBoost+")";
            } else if (elem.id == "melee") {
                boostValue = statValue + meleeBoost
                content.textContent = boostValue+" ("+statValue+" + "+meleeBoost+")";
            } else if (elem.id == "pistol") {
                boostValue = statValue + pistolBoost
                content.textContent = boostValue+" ("+statValue+" + "+pistolBoost+")";
            } else if (elem.id == "rifle") {
                boostValue = statValue + rifleBoost
                content.textContent = boostValue+" ("+statValue+" + "+rifleBoost+")";
            } else if (elem.id == "shotgun") {
                boostValue = statValue + shotgunBoost
                content.textContent = boostValue+" ("+statValue+" + "+shotgunBoost+")";
            } else if (elem.id == "mg") {
                boostValue = statValue + mgBoost
                content.textContent = boostValue+" ("+statValue+" + "+mgBoost+")";
            } else if (elem.id == "explo") {
                boostValue = statValue + exploBoost
                content.textContent = boostValue+" ("+statValue+" + "+exploBoost+")";
            };
        };
    };

    function statEntry () {
        const content = this.nextElementSibling;
        var statValue = parseInt(this.value);
        var boostValue;
        let maxAdjust;
        if (this.id == "str") {
            strBase = statValue;
            boostValue = statValue + strBoost;
            if (strBoost > 0) {
                maxAdjust = 100 - strBoost;
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 100);
            };
            content.textContent = boostValue+" ("+statValue+" + "+strBoost+")";
        } else if (this.id == "end") {
            endBase = statValue;
            boostValue = statValue + endBoost;
            if (endBoost > 24) {
                maxAdjust = 100 - (endBoost - 24);
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 100);
            };
            content.textContent = boostValue+" ("+statValue+" + "+endBoost+")";
        } else if (this.id == "agi") {
            agiBase = statValue;
            boostValue = statValue + agiBoost;
            if (agiBoost > 24) {
                maxAdjust = 100 - (agiBoost - 24);
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 100);
            };
            content.textContent = boostValue+" ("+statValue+" + "+agiBoost+")";
        } else if (this.id == "acc") {
            accBase = statValue;
            boostValue = statValue + agiBoost;
            if (accBoost > 24) {
                maxAdjust = 100 - (accBoost - 24);
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 100);
            };
            content.textContent = boostValue+" ("+statValue+" + "+accBoost+")";
        } else if (this.id == "crit") {
            critBase = statValue;
            boostValue = statValue + critBoost;
            if (critBoost > 24) {
                maxAdjust = 100 - (critBoost - 24);
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 100);
            };
            content.textContent = boostValue+" ("+statValue+" + "+critBoost+")";
        } else if (this.id == "rel") {
            relBase = statValue;
            boostValue = statValue + relBoost;
            if (relBoost > 24) {
                maxAdjust = 100 - (relBoost - 24);
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 100);
            };
            content.textContent = boostValue+" ("+statValue+" + "+relBoost+")";
        } else if (this.id == "melee") {
            meleeBase = statValue;
            boostValue = statValue + meleeBoost;
            if (meleeBoost > 0) {
                maxAdjust = 120 - meleeBoost;
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 120);
            };
            content.textContent = boostValue+" ("+statValue+" + "+meleeBoost+")";
        } else if (this.id == "pistol") {
            pistolBase = statValue;
            boostValue = statValue + pistolBoost;
            if (pistolBoost > 0) {
                maxAdjust = 120 - pistolBoost;
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 120);
            };
            content.textContent = boostValue+" ("+statValue+" + "+pistolBoost+")";
        } else if (this.id == "rifle") {
            rifleBase = statValue;
            boostValue = statValue + rifleBoost;
            if (rifleBoost > 0) {
                maxAdjust = 120 - rifleBoost;
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 120);
            };
            content.textContent = boostValue+" ("+statValue+" + "+rifleBoost+")";
        } else if (this.id == "shotgun") {
            shotgunBase = statValue;
            boostValue = statValue + shotgunBoost;
            if (shotgunBoost > 0) {
                maxAdjust = 120 - shotgunBoost;
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 120);
            };
            content.textContent = boostValue+" ("+statValue+" + "+shotgunBoost+")";
        } else if (this.id == "mg") {
            mgBase = statValue;
            boostValue = statValue + mgBoost;
            if (mgBoost > 0) {
                maxAdjust = 120 - mgBoost;
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 120);
            };
            content.textContent = boostValue+" ("+statValue+" + "+mgBoost+")";
        } else if (this.id == "explo") {
            exploBase = statValue;
            boostValue = statValue + exploBoost;
            if (exploBoost > 0) {
                maxAdjust = 120 - exploBoost;
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 120);
            };
            content.textContent = boostValue+" ("+statValue+" + "+exploBoost+")";
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
        profTotal = meleeBase + pistolBase + rifleBase + shotgunBase + mgBase + exploBase;
        pointsPReq = profTotal - 10;
        if (level <= 50 && level > 0) {
            pointsPTotal = (level - 1) * 5;
        } else if (level <= 220 && level > 0) {
            pointsPTotal = ((level - 50) * 2) + 245;
        } else if (level <= 325) {
            pointsPTotal = (level - 220) + 585;
        } else {
            pointsPTotal = 0;
        };
        pointsTotal = pointsTotal - pointsReq;
        pointsReqSel.textContent = pointsTotal;
        pointsPTotal = pointsPTotal - pointsPReq;
        pointsPReqSel.textContent = pointsPTotal;
        if (pointsReq == pointsPReq || pointsReq > pointsPReq) {
            if (pointsReq > 415 || pointsPReq > 690) {
                levelReqSel.textContent = "Impossible";
            } else if (pointsReq <= 245 && pointsReq > 0) {
                levelReq = Math.ceil((pointsReq / 5) + 1);
                levelReqSel.textContent = levelReq;
            } else if (pointsReq <= 415 && pointsReq > 0) {
                levelReq = (pointsReq - 245) + 50;
                levelReqSel.textContent = levelReq;
            } else {
                levelReq = 1;
                levelReqSel.textContent = levelReq;
            };
        } else if (pointsPReq > pointsReq) { 
            if (pointsPReq > 690 || pointsReq > 415) {
                levelReqSel.textContent = "Impossible";
            } else if (pointsPReq <= 245 && pointsPReq > 0) {
                levelReq = Math.ceil((pointsPReq / 5) + 1);
                levelReqSel.textContent = levelReq;
            } else if (pointsPReq <= 585 && pointsPReq > 0) {
                levelReq = Math.ceil(((pointsPReq - 245) / 2) + 50);
                levelReqSel.textContent = levelReq;
            } else if (pointsPReq <= 690 && pointsPReq > 0) {
                levelReq = (pointsPReq - 585) + 220;
                levelReqSel.textContent = levelReq;
            } else {
                levelReq = 1;
                levelReqSel.textContent = levelReq;
            };
        };
    };

    function boostEntry () {
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
                pointsPTotal = ((level - 1) * 5) - pointsPReq;
            } else if (level <= 220 && level > 0) {
                pointsTotal = ((level - 50) + 245) - pointsReq;
                pointsPTotal = (((level - 50) * 2) + 245) - pointsPReq;
            } else if (level <= 325) {
                pointsTotal = 415 - pointsReq;
                pointsPTotal = ((level - 220) + 585) - pointsPReq;
            } else {
                pointsTotal = 0 - pointsReq;
                pointsPTotal = 0 - pointsReq;
            };
            pointsReqSel.textContent = pointsTotal;
            pointsPReqSel.textContent = pointsPTotal;
        } else if (this.id == "armAgi") {
            if (inputValue > 24) {
                this.value = 24;
                armAgi = 24;
            } else if (inputValue < 0) {
                this.value = 0;
                armAgi = 0;
            } else {
                armAgi = inputValue;
            };
        } else if (this.id == "armEnd") {
            if (inputValue > 24) {
                this.value = 24;
                armEnd = 24;
            } else if (inputValue < 0) {
                this.value = 0;
                armEnd = 0;
            } else {
                armEnd = inputValue;
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
        agiBoost = agiClass + armAgi;
        endBoost = endClass + armEnd;
        accBoost = accClass + w1AccBoost + w2AccBoost + w3AccBoost;
        relBoost = relClass + w1RelBoost + w2RelBoost + w3RelBoost;
        critBoost = critClass + w1CritBoost + w2CritBoost + w3RelBoost;
    };
    //#endregion

    //#region Listeners
    for (i = 0; i < rangeColl.length; i++) {
    rangeColl[i].addEventListener("input", function () {
        statEntry.call(this);
    });
    };

    for (i = 0; i < numColl.length; i++) {
    numColl[i].addEventListener("input", function () {
        boostEntry.call(this);
        displayUpdate();
    });
    };

    $("#classSelect").on('change', function() { //Weapon selection change function
        classUpdate.call(this);
        displayUpdate();
    });
    //#endregion
});