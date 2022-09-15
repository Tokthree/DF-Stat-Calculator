$(document).ready(function () {
    //#region Selectors
    const rangeColl = document.querySelectorAll('input[type=range]');
    const numColl = document.querySelectorAll('input[type=number]');
    const selectColl = document.querySelectorAll('select');
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
    let strTotal = 25;
    let strBase = 25;
    let strBoost = 0;
    let strClass = 0;
    let endTotal = 25;
    let endBase = 25;
    let endBoost = 0;
    let endClass = 0;
    let armEnd = 0;
    let agiTotal = 25;
    let agiBase = 25;
    let agiBoost = 0;
    let agiClass = 0;
    let armAgi = 0;
    let accTotal = 25;
    let accBase = 25;
    let accBoost = 0;
    let accClass = 0;
    let w1AccBoost = 0;
    let w2AccBoost = 0;
    let w3AccBoost = 0;
    let critTotal = 25;
    let critBase = 25;
    let critBoost = 0;
    let critClass = 0;
    let w1CritBoost = 0;
    let w2CritBoost = 0;
    let w3CritBoost = 0;
    let relTotal = 25;
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

    let durability = 0;
    let absorption = 0;
    let w1Spread = "false";
    let w1Explosive = "false";
    let w1Burst = "false";
    let w1Crit = "false";
    let w1sAngle = 0;
    let w1Pellets = 0;
    let w1PelletDph = 0;
    let w1Dph = 0;
    let w1Dph1 = 0;
    let w1Dph2 = 0;
    let w1Dph3 = 0;
    let w1CritFail = 0;
    let w1CritSuccess = 0;
    let w1ReloadTime = 0;
    let w1Accuracy = 0;
    let w1Pen = 0;
    let w1Dps = 0;
    let w2Spread = "false";
    let w2Explosive = "false";
    let w2Burst = "false";
    let w2Crit = "false";
    let w2sAngle = 0;
    let w2Pellets = 0;
    let w2PelletDph;
    let w2Dph = 0;
    let w2Dph1 = 0;
    let w2Dph2 = 0;
    let w2Dph3 = 0;
    let w2CritFail = 0;
    let w2CritSuccess = 0;
    let w2ReloadTime = 0;
    let w2Accuracy = 0;
    let w2Pen = 0;
    let w2Dps = 0;
    let w3Spread = "false";
    let w3Explosive = "false";
    let w3Burst = "false";
    let w3Crit = "false";
    let w3sAngle = 0;
    let w3Pellets = 0;
    let w3PelletDph;
    let w3Dph = 0;
    let w3Dph1 = 0;
    let w3Dph2 = 0;
    let w3Dph3 = 0;
    let w3CritFail = 0;
    let w3CritSuccess = 0;
    let w3ReloadTime = 0;
    let w3Accuracy = 0;
    let w3Pen = 0;
    let w3Dps = 0;

    let damageBoost = 0;
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
    
    function parseOutArmorArray(data) //Armors parse function (Credit to Awoo 3: Credit Harderer)
    {
        let jsonData = JSON.parse(data);
        let mainSelect = document.getElementById("armorSelect");
        jsonData.forEach((val) =>
        {
            let group = document.createElement("optgroup"); //Create <optgroup> elements
            group.label = val["cat"];
            mainSelect.appendChild(group);
    
            val["items"].forEach((val2) =>
            {
                let option = document.createElement("option"); //Create <option> elements
                option.value = val2["name"];
                option.textContent = val2["name"];
                option.dataset.durability = val2["durability"];
                option.dataset.absorption = val2["absorption"];
                mainSelect.appendChild(option);
            });
        });
    };
    
    function parseOutWeaponArray(data) //Weapons parse function (Credit to Awoo 4: Sorry Awoo, I Can't Give Credit)
    {
        let jsonData = JSON.parse(data);
        let mainSelect = document.querySelectorAll("[id^='weaponSelect']");
        for (i = 0; i < mainSelect.length; i++) {
            jsonData.forEach((val) =>
            {
                let group = document.createElement("optgroup"); //Create <optgroup> elements
                group.label = val["cat"];
                mainSelect[i].appendChild(group);
        
                val["items"].forEach((val2) =>
                {
                    let option = document.createElement("option"); //Create <option> elements
                    option.value = val2["name"];
                    option.textContent = val2["name"];
                    option.dataset.spread = val2["spread"];
                    option.dataset.explosive = val2["explosive"];
                    option.dataset.burst = val2["burst"];
                    if (val2["spread"] == "true") {
                        option.dataset.sAngle = val2["sAngle"];
                        option.dataset.pellets = val2["pellets"];
                    };
                    if (val2["burst"] == "true") {
                        option.dataset.dph1 = val2["dph1"];
                        option.dataset.dph2 = val2["dph2"];
                        option.dataset.dph3 = val2["dph3"];
                    } else {
                        option.dataset.dph = val2["dph"];
                    };
                    option.dataset.shotTime = val2["shotTime"];
                    option.dataset.capacity = val2["capacity"];
                    option.dataset.weaponCrit = val2["weaponCrit"];
                    option.dataset.weaponReload = val2["weaponReload"];
                    option.dataset.accuracy = val2["accuracy"];
                    option.dataset.pen = val2["pen"];
                    mainSelect[i].appendChild(option);
                });
            });
        };
    };
    
    makeForeignRequest("classes.json", parseOutClassArray); //Pull JSON & parse
    makeForeignRequest("armors.json", parseOutArmorArray);
    makeForeignRequest("weapons.json", parseOutWeaponArray);

    function selectUpdate() {
        for (i = 0; i < selectColl.length; i++) {
            let elem = selectColl[i];
            if (elem.id == "classSelect") {
                strClass = parseInt(elem.options[elem.selectedIndex].dataset.str); //Set values
                endClass = parseInt(elem.options[elem.selectedIndex].dataset.end);
                agiClass = parseInt(elem.options[elem.selectedIndex].dataset.agi);
                accClass = parseInt(elem.options[elem.selectedIndex].dataset.acc);
                critClass = parseInt(elem.options[elem.selectedIndex].dataset.crit);
                relClass = parseInt(elem.options[elem.selectedIndex].dataset.rel);
                meleeBoost = parseInt(elem.options[elem.selectedIndex].dataset.melee);
                pistolBoost = parseInt(elem.options[elem.selectedIndex].dataset.pistol);
                rifleBoost = parseInt(elem.options[elem.selectedIndex].dataset.rifle);
                shotgunBoost = parseInt(elem.options[elem.selectedIndex].dataset.shotgun);
                mgBoost = parseInt(elem.options[elem.selectedIndex].dataset.mg);
                exploBoost = parseInt(elem.options[elem.selectedIndex].dataset.explo);
                strBoost = strClass;
                endBoost = endClass + armEnd;
                agiBoost = agiClass + armAgi;
                accBoost = accClass + w1AccBoost + w2AccBoost + w3AccBoost;
                critBoost = critClass + w1CritBoost + w2CritBoost + w3RelBoost;
                relBoost = relClass + w1RelBoost + w2RelBoost + w3RelBoost;
            } else if (elem.id == "armorSelect") {
                durability = parseInt(elem.options[elem.selectedIndex].dataset.durability);
                absorption = parseFloat(elem.options[elem.selectedIndex].dataset.absorption);
            } else if (elem.id.includes("weaponSelect") == true) {
                let spread = elem.options[elem.selectedIndex].dataset.spread;
                let explosive = elem.options[elem.selectedIndex].dataset.explosive;
                let burst = elem.options[elem.selectedIndex].dataset.burst;
                let sAngle = elem.options[elem.selectedIndex].dataset.sAngle;
                let pellets = elem.options[elem.selectedIndex].dataset.pellets;
                let pelletDph = elem.options[elem.selectedIndex].dataset.dph * (1 + damageBoost);
                let dph = 0;
                if (spread == "true") {
                    dph = (elem.options[elem.selectedIndex].dataset.dph * pellets) * (1 + damageBoost);
                } else {
                    dph = elem.options[elem.selectedIndex].dataset.dph * (1 + damageBoost);
                };
                let dph1 = elem.options[elem.selectedIndex].dataset.dph1 * (1 + damageBoost);
                let dph2 = elem.options[elem.selectedIndex].dataset.dph2 * (1 + damageBoost);
                let dph3 = elem.options[elem.selectedIndex].dataset.dph3 * (1 + damageBoost);
                let shotTime = elem.options[elem.selectedIndex].dataset.shotTime;
                let capacity = elem.options[elem.selectedIndex].dataset.capacity;
                let weaponCrit = elem.options[elem.selectedIndex].dataset.weaponCrit;
                let baseCrit = (5 + Math.round((critTotal - 25) / 2.5)) * weaponCrit;
                if (baseCrit > 80) {
                    baseCrit = 80;
                };
                let divisor = 0;
                if (baseCrit < 5) {
                    divisor = 1;
                } else if (baseCrit <= 9) {
                    divisor = 2;
                } else if (baseCrit <= 15) {
                    divisor = 5;
                } else if (baseCrit <= 79) {
                    divisor = 10;
                } else if (baseCrit >= 80) {
                    divisor = 20;
                };
                let critFail = Math.ceil((100 - baseCrit) / divisor);
                let critSuccess = Math.floor(baseCrit / divisor);
                let weaponReload = elem.options[elem.selectedIndex].dataset.weaponReload;
                let reloadFrame = 15 + (((124 - relTotal) * weaponReload) / 100);
                let reloadTime = reloadFrame / 60;
                let accuracy = elem.options[elem.selectedIndex].dataset.accuracy;
                let pen = elem.options[elem.selectedIndex].dataset.pen;
                let dps = 0;
                if (burst == "true") {
                    let baseDps = ((dph1 + dph2) + dph3) * (60 / shotTime);
                    let critDps = baseDps * ((critFail + (critSuccess * 5)) / (critFail + critSuccess));
                    let magTime = (capacity * shotTime) / 60;
                    dps = critDps * (magTime / (magTime + reloadTime));
                } else if (accuracy == "melee") {
                    let baseDps = dph * (60 / shotTime);
                    dps = baseDps * ((critFail + (critSuccess * 5)) / (critFail + critSuccess));
                } else {
                    let baseDps = dph * (60 / shotTime);
                    let critDps = baseDps * ((critFail + (critSuccess * 5)) / (critFail + critSuccess));
                    let magTime = (capacity * shotTime) / 60;
                    dps = critDps * (magTime / (magTime + reloadTime));
                };
                if (elem.id == "weaponSelect1") {
                    w1Spread = spread;
                    w1Explosive = explosive;
                    w1Burst = burst;
                    if (weaponCrit > 0) {
                        w1Crit = "true";
                    } else {
                        w1Crit = "false";
                    };
                    w1sAngle = sAngle;
                    w1Pellets = pellets;
                    w1PelletDph = pelletDph;
                    w1Dph = dph;
                    w1Dph1 = dph1;
                    w1Dph2 = dph2;
                    w1Dph3 = dph3;
                    w1CritFail = critFail;
                    w1CritSuccess = critSuccess;
                    w1ReloadTime = reloadTime;
                    w1Accuracy = accuracy;
                    w1Pen = pen;
                    w1Dps = dps;
                } else if (elem.id == "weaponSelect2") {
                    w2Spread = spread;
                    w2Explosive = explosive;
                    w2Burst = burst;
                    if (weaponCrit > 0) {
                        w2Crit = "true";
                    } else {
                        w2Crit = "false";
                    };
                    w2sAngle = sAngle;
                    w2pellets = pellets;
                    w2PelletDph = pelletDph;
                    w2Dph = dph;
                    w2Dph1 = dph1;
                    w2Dph2 = dph2;
                    w2Dph3 = dph3;
                    w2CritFail = critFail;
                    w2CritSuccess = critSuccess;
                    w2ReloadTime = reloadTime;
                    w2Accuracy = accuracy;
                    w2Pen = pen;
                    w2Dps = dps;
                } else if (elem.id == "weaponSelect3") {
                    w3Spread = spread;
                    w3Explosive = explosive;
                    w3Burst = burst;
                    if (weaponCrit > 0) {
                        w3Crit = "true";
                    } else {
                        w3Crit = "false";
                    };
                    w3sAngle = sAngle;
                    w3Pellets = pellets;
                    w3PelletDph = pelletDph;
                    w3Dph = dph;
                    w3Dph1 = dph1;
                    w3Dph2 = dph2;
                    w3Dph3 = dph3;
                    w3CritFail = critFail;
                    w3CritSuccess = critSuccess;
                    w3ReloadTime = reloadTime;
                    w3Accuracy = accuracy;
                    w3Pen = pen;
                    w3Dps = dps;
                };
            };
        };
    };

    function displayUpdate () {
        const healthSelector = document.getElementById('healthValue');
        const walkSelector = document.getElementById('walkValue');
        const sprintSelector = document.getElementById('sprintValue');
        const durationSelector = document.getElementById('durationValue');
        const regenSelector = document.getElementById('regenValue');
        const duraSelector = document.getElementById('durabilityValue');
        const absorbSelector = document.getElementById('absorptionValue');
        const w1DphSelector = document.getElementById('w1DPHValue');
        const w1PDphSelector = document.getElementById('w1PDPHValue');
        const w1PelletSelector = document.getElementById('w1PelletValue');
        const w1CritDphSelector = document.getElementById('w1CritValue');
        const w1PatternSelector = document.getElementById('w1PatternValue');
        const w1ReloadSelector = document.getElementById('w1ReloadValue');
        const w1DpsSelector = document.getElementById('w1DPSValue');
        const w1AccuracySelector = document.getElementById('w1AccuracyValue');
        const w1SpreadSelector = document.getElementById('w1SpreadValue');
        const w2DphSelector = document.getElementById('w2DPHValue');
        const w2PDphSelector = document.getElementById('w2PDPHValue');
        const w2PelletSelector = document.getElementById('w2PelletValue');
        const w2CritDphSelector = document.getElementById('w2CritValue');
        const w2PatternSelector = document.getElementById('w2PatternValue');
        const w2ReloadSelector = document.getElementById('w2ReloadValue');
        const w2DpsSelector = document.getElementById('w2DPSValue');
        const w2AccuracySelector = document.getElementById('w2AccuracyValue');
        const w2SpreadSelector = document.getElementById('w2SpreadValue');
        const w3DphSelector = document.getElementById('w3DPHValue');
        const w3PDphSelector = document.getElementById('w3PDPHValue');
        const w3PelletSelector = document.getElementById('w3PelletValue');
        const w3CritDphSelector = document.getElementById('w3CritValue');
        const w3PatternSelector = document.getElementById('w3PatternValue');
        const w3ReloadSelector = document.getElementById('w3ReloadValue');
        const w3DpsSelector = document.getElementById('w3DPSValue');
        const w3AccuracySelector = document.getElementById('w3AccuracyValue');
        const w3SpreadSelector = document.getElementById('w3SpreadValue');
        for (i = 0; i < rangeColl.length; i++) {
            let elem = rangeColl[i];
            const content = elem.nextElementSibling;
            var statValue = parseInt(elem.value);
            var boostValue;
            if (elem.id == "str") {
                boostValue = statValue + strBoost;
                strTotal = boostValue;
                content.textContent = boostValue+" ("+statValue+" + "+strBoost+")";
            } else if (elem.id == "end") {
                boostValue = statValue + endBoost;
                endTotal = boostValue;
                content.textContent = boostValue+" ("+statValue+" + "+endBoost+")";
            } else if (elem.id == "agi") {
                boostValue = statValue + agiBoost;
                agiTotal = boostValue;
                content.textContent = boostValue+" ("+statValue+" + "+agiBoost+")";
            } else if (elem.id == "acc") {
                boostValue = statValue + accBoost;
                accTotal = boostValue;
                content.textContent = boostValue+" ("+statValue+" + "+accBoost+")";
            } else if (elem.id == "crit") {
                boostValue = statValue + critBoost;
                critTotal = boostValue;
                content.textContent = boostValue+" ("+statValue+" + "+critBoost+")";
            } else if (elem.id == "rel") {
                boostValue = statValue + relBoost;
                relTotal = boostValue;
                content.textContent = boostValue+" ("+statValue+" + "+relBoost+")";
            } else if (elem.id == "melee") {
                boostValue = statValue + meleeBoost;
                content.textContent = boostValue+" ("+statValue+" + "+meleeBoost+")";
            } else if (elem.id == "pistol") {
                boostValue = statValue + pistolBoost;
                content.textContent = boostValue+" ("+statValue+" + "+pistolBoost+")";
            } else if (elem.id == "rifle") {
                boostValue = statValue + rifleBoost;
                content.textContent = boostValue+" ("+statValue+" + "+rifleBoost+")";
            } else if (elem.id == "shotgun") {
                boostValue = statValue + shotgunBoost;
                content.textContent = boostValue+" ("+statValue+" + "+shotgunBoost+")";
            } else if (elem.id == "mg") {
                boostValue = statValue + mgBoost;
                content.textContent = boostValue+" ("+statValue+" + "+mgBoost+")";
            } else if (elem.id == "explo") {
                boostValue = statValue + exploBoost;
                content.textContent = boostValue+" ("+statValue+" + "+exploBoost+")";
            };
        };
        healthSelector.textContent = endBase * 2;
        walkSelector.textContent = ((2.2 * 1.2) * ((agiTotal * 0.0043) + 1.1)).toFixed(4);
        sprintSelector.textContent = ((3.5 * 1.2) * ((agiTotal * 0.0043) + 1.1)).toFixed(4);
        durationSelector.textContent = ((endTotal - 25) / 6.1875 + 24).toFixed(0)+" s";
        regenSelector.textContent = ((endTotal - 25) / 6.1875 + 24).toFixed(0)+" s";
        //duraSelector.textContent = (durability + (durability * absorption))+" ("+durability+" + "+durability+" * "+absorption+")";
        if (document.getElementById("armorSelect").value != "Please Select an Option") {
            duraSelector.textContent = durability;
            absorbSelector.textContent = (absorption * 100)+"%";
        };
        if (document.getElementById("weaponSelect1").value != "Please Select an Option") {
            w1PDphSelector.parentElement.style.display = "none";
            w1PelletSelector.parentElement.style.display = "none";
            w1CritDphSelector.parentElement.style.display = "inline-flex";
            w1PatternSelector.parentElement.style.display = "inline-flex";
            w1ReloadSelector.parentElement.style.display = "inline-flex";
            w1AccuracySelector.parentElement.style.display = "inline-flex";
            w1SpreadSelector.parentElement.style.display = "none";
            w1DphSelector.textContent = w1Dph;
            w1PDphSelector.textContent = w1PelletDph;
            w1PelletSelector.textContent = w1Pellets;
            w1CritDphSelector.textContent = (w1Dph * 5).toFixed(2);
            w1PatternSelector.textContent = w1CritFail+" NC > "+w1CritSuccess+" C";
            w1ReloadSelector.textContent = w1ReloadTime.toFixed(2)+" s";
            w1DpsSelector.textContent = w1Dps.toFixed(2);
            if (w1Accuracy == "melee") {
                w1AccuracySelector.parentElement.style.display = "none"
            } else if (w1Accuracy == "1") {
                if (accTotal < 124) {
                    w1AccuracySelector.style.backgroundColor = "lightcoral"
                    w1AccuracySelector.textContent = "Inaccurate"
                } else if (accTotal >= 124) {
                    w1AccuracySelector.style.backgroundColor = "khaki"
                    w1AccuracySelector.textContent = "Reliable Onscreen"
                };
            } else if (w1Accuracy == "2") {
                if (accTotal < 100) {
                    w1AccuracySelector.style.backgroundColor = "lightcoral"
                    w1AccuracySelector.textContent = "Inaccurate"
                } else if (accTotal < 124) {
                    w1AccuracySelector.style.backgroundColor = "khaki"
                    w1AccuracySelector.textContent = "Reliable Onscreen"
                } else if (accTotal >= 124) {
                    w1AccuracySelector.style.backgroundColor = "lightgreen"
                    w1AccuracySelector.textContent = "Reliable Offscreen"
                };
            } else if (w1Accuracy == "3") {
                if (accTotal < 80) {
                    w1AccuracySelector.style.backgroundColor = "lightcoral"
                    w1AccuracySelector.textContent = "Inaccurate"
                } else if (accTotal < 100) {
                    w1AccuracySelector.style.backgroundColor = "coral"
                    w1AccuracySelector.textContent = "Reliable Onscreen"
                } else if (accTotal < 119) {
                    w1AccuracySelector.style.backgroundColor = "khaki"
                    w1AccuracySelector.textContent = "Reliable Offscreen"
                } else if (accTotal >= 119) {
                    w1AccuracySelector.style.backgroundColor = "lightgreen"
                    w1AccuracySelector.textContent = "Pinpoint"
                };
            } else if (w1Accuracy == "4") {
                if (accTotal < 60) {
                    w1AccuracySelector.style.backgroundColor = "lightcoral"
                    w1AccuracySelector.textContent = "Inaccurate"
                } else if (accTotal < 70) {
                    w1AccuracySelector.style.backgroundColor = "coral"
                    w1AccuracySelector.textContent = "Reliable Onscreen"
                } else if (accTotal < 79) {
                    w1AccuracySelector.style.backgroundColor = "khaki"
                    w1AccuracySelector.textContent = "Reliable Offscreen"
                } else if (accTotal >= 79) {
                    w1AccuracySelector.style.backgroundColor = "lightgreen"
                    w1AccuracySelector.textContent = "Pinpoint"
                };
            } else if (w1Accuracy == "5") {
                if (accTotal < 35) {
                    w1AccuracySelector.style.backgroundColor = "lightcoral"
                    w1AccuracySelector.textContent = "Inaccurate"
                } else if (accTotal < 40) {
                    w1AccuracySelector.style.backgroundColor = "coral"
                    w1AccuracySelector.textContent = "Reliable Onscreen"
                } else if (accTotal < 44) {
                    w1AccuracySelector.style.backgroundColor = "khaki"
                    w1AccuracySelector.textContent = "Reliable Offscreen"
                } else if (accTotal >= 44) {
                    w1AccuracySelector.style.backgroundColor = "lightgreen"
                    w1AccuracySelector.textContent = "Pinpoint"
                };
            };
            w1SpreadSelector.textContent = w1sAngle+"\xB0"
            if (w1Spread == "true") {
                w1PDphSelector.parentElement.style.display = "inline-flex";
                w1PelletSelector.parentElement.style.display = "inline-flex";
                w1SpreadSelector.parentElement.style.display = "inline-flex";
                w1DphSelector.textContent = w1Dph.toFixed(2);
                if (w1Crit == "false") {
                    w1CritDphSelector.parentElement.style.display = "none";
                    w1PatternSelector.parentElement.style.display = "none";
                };
            } else if (w1Burst == "true") {
                w1DphSelector.textContent = w1Dph1+" + "+w1Dph2+" + "+w1Dph3;
                w1CritDphSelector.textContent = (w1Dph1 * 5).toFixed(2)+" + "+(w1Dph2 * 5).toFixed(2)+" + "+(w1Dph3 * 5).toFixed(2);
            } else if (w1Accuracy == "melee") {
                w1ReloadSelector.parentElement.style.display = "none";
            };
        };
        if (document.getElementById("weaponSelect2").value != "Please Select an Option") {
            w2PDphSelector.parentElement.style.display = "none";
            w2PelletSelector.parentElement.style.display = "none";
            w2CritDphSelector.parentElement.style.display = "inline-flex";
            w2PatternSelector.parentElement.style.display = "inline-flex";
            w2ReloadSelector.parentElement.style.display = "inline-flex";
            w2AccuracySelector.parentElement.style.display = "inline-flex";
            w2SpreadSelector.parentElement.style.display = "none";
            w2DphSelector.textContent = w2Dph;
            w2PDphSelector.textContent = w2PelletDph;
            w2PelletSelector.textContent = w2Pellets;
            w2CritDphSelector.textContent = (w2Dph * 5).toFixed(2);
            w2PatternSelector.textContent = w2CritFail+" NC > "+w2CritSuccess+" C";
            w2ReloadSelector.textContent = w2ReloadTime.toFixed(2)+" s";
            w2DpsSelector.textContent = w2Dps.toFixed(2);
            if (w2Accuracy == "melee") {
                w2AccuracySelector.parentElement.style.display = "none"
            } else if (w2Accuracy == "1") {
                if (accTotal < 124) {
                    w2AccuracySelector.style.backgroundColor = "lightcoral"
                    w2AccuracySelector.textContent = "Inaccurate"
                } else if (accTotal >= 124) {
                    w2AccuracySelector.style.backgroundColor = "khaki"
                    w2AccuracySelector.textContent = "Reliable Onscreen"
                };
            } else if (w2Accuracy == "2") {
                if (accTotal < 100) {
                    w2AccuracySelector.style.backgroundColor = "lightcoral"
                    w2AccuracySelector.textContent = "Inaccurate"
                } else if (accTotal < 124) {
                    w2AccuracySelector.style.backgroundColor = "khaki"
                    w2AccuracySelector.textContent = "Reliable Onscreen"
                } else if (accTotal >= 124) {
                    w2AccuracySelector.style.backgroundColor = "lightgreen"
                    w2AccuracySelector.textContent = "Reliable Offscreen"
                };
            } else if (w2Accuracy == "3") {
                if (accTotal < 80) {
                    w2AccuracySelector.style.backgroundColor = "lightcoral"
                    w2AccuracySelector.textContent = "Inaccurate"
                } else if (accTotal < 100) {
                    w2AccuracySelector.style.backgroundColor = "coral"
                    w2AccuracySelector.textContent = "Reliable Onscreen"
                } else if (accTotal < 119) {
                    w2AccuracySelector.style.backgroundColor = "khaki"
                    w2AccuracySelector.textContent = "Reliable Offscreen"
                } else if (accTotal >= 119) {
                    w2AccuracySelector.style.backgroundColor = "lightgreen"
                    w2AccuracySelector.textContent = "Pinpoint"
                };
            } else if (w2Accuracy == "4") {
                if (accTotal < 60) {
                    w2AccuracySelector.style.backgroundColor = "lightcoral"
                    w2AccuracySelector.textContent = "Inaccurate"
                } else if (accTotal < 70) {
                    w2AccuracySelector.style.backgroundColor = "coral"
                    w2AccuracySelector.textContent = "Reliable Onscreen"
                } else if (accTotal < 79) {
                    w2AccuracySelector.style.backgroundColor = "khaki"
                    w2AccuracySelector.textContent = "Reliable Offscreen"
                } else if (accTotal >= 79) {
                    w2AccuracySelector.style.backgroundColor = "lightgreen"
                    w2AccuracySelector.textContent = "Pinpoint"
                };
            } else if (w2Accuracy == "5") {
                if (accTotal < 35) {
                    w2AccuracySelector.style.backgroundColor = "lightcoral"
                    w2AccuracySelector.textContent = "Inaccurate"
                } else if (accTotal < 40) {
                    w2AccuracySelector.style.backgroundColor = "coral"
                    w2AccuracySelector.textContent = "Reliable Onscreen"
                } else if (accTotal < 44) {
                    w2AccuracySelector.style.backgroundColor = "khaki"
                    w2AccuracySelector.textContent = "Reliable Offscreen"
                } else if (accTotal >= 44) {
                    w2AccuracySelector.style.backgroundColor = "lightgreen"
                    w2AccuracySelector.textContent = "Pinpoint"
                };
            };
            w2SpreadSelector.textContent = w2sAngle+"\xB0"
            if (w2Spread == "true") {
                w2PDphSelector.parentElement.style.display = "inline-flex";
                w2PelletSelector.parentElement.style.display = "inline-flex";
                w2SpreadSelector.parentElement.style.display = "inline-flex";
                w2DphSelector.textContent = w2Dph.toFixed(2);
                if (w2Crit == "false") {
                    w2CritDphSelector.parentElement.style.display = "none";
                    w2PatternSelector.parentElement.style.display = "none";
                };
            } else if (w2Burst == "true") {
                w2DphSelector.textContent = w2Dph1+" + "+w2Dph2+" + "+w2Dph3;
                w2CritDphSelector.textContent = (w2Dph1 * 5).toFixed(2)+" + "+(w2Dph2 * 5).toFixed(2)+" + "+(w2Dph3 * 5).toFixed(2);
            } else if (w2Accuracy == "melee") {
                w2ReloadSelector.parentElement.style.display = "none";
            };
        };
        if (document.getElementById("weaponSelect3").value != "Please Select an Option") {
            w3PDphSelector.parentElement.style.display = "none";
            w3PelletSelector.parentElement.style.display = "none";
            w3CritDphSelector.parentElement.style.display = "inline-flex";
            w3PatternSelector.parentElement.style.display = "inline-flex";
            w3ReloadSelector.parentElement.style.display = "inline-flex";
            w3AccuracySelector.parentElement.style.display = "inline-flex";
            w3SpreadSelector.parentElement.style.display = "none";
            w3DphSelector.textContent = w3Dph;
            w3PDphSelector.textContent = w3PelletDph;
            w3PelletSelector.textContent = w3Pellets;
            w3CritDphSelector.textContent = (w3Dph * 5).toFixed(2);
            w3PatternSelector.textContent = w3CritFail+" NC > "+w3CritSuccess+" C";
            w3ReloadSelector.textContent = w3ReloadTime.toFixed(2)+" s";
            w3DpsSelector.textContent = w3Dps.toFixed(2);
            if (w3Accuracy == "melee") {
                w3AccuracySelector.parentElement.style.display = "none"
            } else if (w3Accuracy == "1") {
                if (accTotal < 124) {
                    w3AccuracySelector.style.backgroundColor = "lightcoral"
                    w3AccuracySelector.textContent = "Inaccurate"
                } else if (accTotal >= 124) {
                    w3AccuracySelector.style.backgroundColor = "khaki"
                    w3AccuracySelector.textContent = "Reliable Onscreen"
                };
            } else if (w3Accuracy == "2") {
                if (accTotal < 100) {
                    w3AccuracySelector.style.backgroundColor = "lightcoral"
                    w3AccuracySelector.textContent = "Inaccurate"
                } else if (accTotal < 124) {
                    w3AccuracySelector.style.backgroundColor = "khaki"
                    w3AccuracySelector.textContent = "Reliable Onscreen"
                } else if (accTotal >= 124) {
                    w3AccuracySelector.style.backgroundColor = "lightgreen"
                    w3AccuracySelector.textContent = "Reliable Offscreen"
                };
            } else if (w3Accuracy == "3") {
                if (accTotal < 80) {
                    w3AccuracySelector.style.backgroundColor = "lightcoral"
                    w3AccuracySelector.textContent = "Inaccurate"
                } else if (accTotal < 100) {
                    w3AccuracySelector.style.backgroundColor = "coral"
                    w3AccuracySelector.textContent = "Reliable Onscreen"
                } else if (accTotal < 119) {
                    w3AccuracySelector.style.backgroundColor = "khaki"
                    w3AccuracySelector.textContent = "Reliable Offscreen"
                } else if (accTotal >= 119) {
                    w3AccuracySelector.style.backgroundColor = "lightgreen"
                    w3AccuracySelector.textContent = "Pinpoint"
                };
            } else if (w3Accuracy == "4") {
                if (accTotal < 60) {
                    w3AccuracySelector.style.backgroundColor = "lightcoral"
                    w3AccuracySelector.textContent = "Inaccurate"
                } else if (accTotal < 70) {
                    w3AccuracySelector.style.backgroundColor = "coral"
                    w3AccuracySelector.textContent = "Reliable Onscreen"
                } else if (accTotal < 79) {
                    w3AccuracySelector.style.backgroundColor = "khaki"
                    w3AccuracySelector.textContent = "Reliable Offscreen"
                } else if (accTotal >= 79) {
                    w3AccuracySelector.style.backgroundColor = "lightgreen"
                    w3AccuracySelector.textContent = "Pinpoint"
                };
            } else if (w3Accuracy == "5") {
                if (accTotal < 35) {
                    w3AccuracySelector.style.backgroundColor = "lightcoral"
                    w3AccuracySelector.textContent = "Inaccurate"
                } else if (accTotal < 40) {
                    w3AccuracySelector.style.backgroundColor = "coral"
                    w3AccuracySelector.textContent = "Reliable Onscreen"
                } else if (accTotal < 44) {
                    w3AccuracySelector.style.backgroundColor = "khaki"
                    w3AccuracySelector.textContent = "Reliable Offscreen"
                } else if (accTotal >= 44) {
                    w3AccuracySelector.style.backgroundColor = "lightgreen"
                    w3AccuracySelector.textContent = "Pinpoint"
                };
            };
            w3SpreadSelector.textContent = w3sAngle+"\xB0"
            if (w3Spread == "true") {
                w3PDphSelector.parentElement.style.display = "inline-flex";
                w3PelletSelector.parentElement.style.display = "inline-flex";
                w3SpreadSelector.parentElement.style.display = "inline-flex";
                w3DphSelector.textContent = w3Dph.toFixed(2);
                if (w3Crit == "false") {
                    w3CritDphSelector.parentElement.style.display = "none";
                    w3PatternSelector.parentElement.style.display = "none";
                };
            } else if (w3Burst == "true") {
                w3DphSelector.textContent = w3Dph1+" + "+w3Dph2+" + "+w3Dph3;
                w3CritDphSelector.textContent = (w3Dph1 * 5).toFixed(2)+" + "+(w3Dph2 * 5).toFixed(2)+" + "+(w3Dph3 * 5).toFixed(2);
            } else if (w3Accuracy == "melee") {
                w3ReloadSelector.parentElement.style.display = "none";
            };
        };
    };

    function statEntry () {
        const content = this.nextElementSibling;
        var statValue = parseInt(this.value);
        var boostValue;
        let maxAdjust;
        if (this.id == "str") {
            if (strBoost > 0) {
                maxAdjust = 100 - strBoost;
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 100);
            };
            strBase = statValue;
            boostValue = statValue + strBoost;
            strTotal = boostValue;
            content.textContent = boostValue+" ("+statValue+" + "+strBoost+")";
        } else if (this.id == "end") {
            if (endBoost > 24) {
                maxAdjust = 100 - (endBoost - 24);
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 100);
            };
            endBase = statValue;
            boostValue = statValue + endBoost;
            endTotal = boostValue;
            content.textContent = boostValue+" ("+statValue+" + "+endBoost+")";
        } else if (this.id == "agi") {
            if (agiBoost > 24) {
                maxAdjust = 100 - (agiBoost - 24);
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 100);
            };
            agiBase = statValue;
            boostValue = statValue + agiBoost;
            agiTotal = boostValue;
            content.textContent = boostValue+" ("+statValue+" + "+agiBoost+")";
        } else if (this.id == "acc") {
            if (accBoost > 24) {
                maxAdjust = 100 - (accBoost - 24);
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 100);
            };
            accBase = statValue;
            boostValue = statValue + agiBoost;
            accTotal = boostValue;
            content.textContent = boostValue+" ("+statValue+" + "+accBoost+")";
        } else if (this.id == "crit") {
            if (critBoost > 24) {
                maxAdjust = 100 - (critBoost - 24);
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 100);
            };
            critBase = statValue;
            boostValue = statValue + critBoost;
            critTotal = boostValue;
            content.textContent = boostValue+" ("+statValue+" + "+critBoost+")";
        } else if (this.id == "rel") {
            if (relBoost > 24) {
                maxAdjust = 100 - (relBoost - 24);
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 100);
            };
            relBase = statValue;
            boostValue = statValue + relBoost;
            relTotal = boostValue;
            content.textContent = boostValue+" ("+statValue+" + "+relBoost+")";
        } else if (this.id == "melee") {
            if (meleeBoost > 0) {
                maxAdjust = 120 - meleeBoost;
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 120);
            };
            meleeBase = statValue;
            boostValue = statValue + meleeBoost;
            content.textContent = boostValue+" ("+statValue+" + "+meleeBoost+")";
        } else if (this.id == "pistol") {
            if (pistolBoost > 0) {
                maxAdjust = 120 - pistolBoost;
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 120);
            };
            pistolBase = statValue;
            boostValue = statValue + pistolBoost;
            content.textContent = boostValue+" ("+statValue+" + "+pistolBoost+")";
        } else if (this.id == "rifle") {
            if (rifleBoost > 0) {
                maxAdjust = 120 - rifleBoost;
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 120);
            };
            rifleBase = statValue;
            boostValue = statValue + rifleBoost;
            content.textContent = boostValue+" ("+statValue+" + "+rifleBoost+")";
        } else if (this.id == "shotgun") {
            if (shotgunBoost > 0) {
                maxAdjust = 120 - shotgunBoost;
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 120);
            };
            shotgunBase = statValue;
            boostValue = statValue + shotgunBoost;
            content.textContent = boostValue+" ("+statValue+" + "+shotgunBoost+")";
        } else if (this.id == "mg") {
            if (mgBoost > 0) {
                maxAdjust = 120 - mgBoost;
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 120);
            };
            mgBase = statValue;
            boostValue = statValue + mgBoost;
            content.textContent = boostValue+" ("+statValue+" + "+mgBoost+")";
        } else if (this.id == "explo") {
            if (exploBoost > 0) {
                maxAdjust = 120 - exploBoost;
                this.setAttribute("max", maxAdjust);
            } else {
                this.setAttribute("max", 120);
            };
            exploBase = statValue;
            boostValue = statValue + exploBoost;
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
        critBoost = critClass + w1CritBoost + w2CritBoost + w3CritBoost;
    };
    //#endregion

    //#region Listeners
    for (i = 0; i < rangeColl.length; i++) {
        rangeColl[i].addEventListener("input", function () {
            statEntry.call(this);
            selectUpdate();
            displayUpdate();
        });
    };

    for (i = 0; i < numColl.length; i++) {
        numColl[i].addEventListener("input", function () {
            boostEntry.call(this);
            selectUpdate();
            displayUpdate();
        });
    };

    for (i = 0; i < selectColl.length; i++) {
        selectColl[i].addEventListener("change", function () {
            selectUpdate();
            displayUpdate();
        });
    };

    /*
    $("#classSelect").on('change', function() {
        classUpdate.call(this);
        displayUpdate();
    });
    */
    //#endregion
});