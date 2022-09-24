//#region Selectors
const rangeColl = document.querySelectorAll('input[type=range]');
const numColl = document.querySelectorAll('input[type=number]');
const checkColl = document.querySelectorAll('input[type=checkbox]');
const selectColl = document.querySelectorAll('select');
const pointsReqSel = document.getElementById('freePoints');
const pointsPReqSel = document.getElementById('freePPoints');
const levelReqSel = document.getElementById('reqLevel');
//#endregion

//#region Global Variables
//Array maybe?
let charInfo = {level: 1, levelReq: 1, statTotal: 150, pointsTotal: 0, pointsReq: 0, profTotal: 10, pointsPTotal: 0, pointsPReq: 0};
let stat =
[ //base, boost, class, total
    [25, 0, 0, 25], //str
    [25, 0, 0, 25], //end
    [25, 0, 0, 25], //agi
    [25, 0, 0, 25], //acc
    [25, 0, 0, 25], //crit
    [25, 0, 0, 25] //rel
];
let prof =
[ //base, boost
    [5, 0], //melee
    [5, 0], //pistol
    [0, 0], //rifle
    [0, 0], //shotgun
    [0, 0], //mg
    [0, 0] //explo
];
//Array needed
let aBonus =
[ //agi, end
    0, 0
];
let wBonus =
[ //acc, rel, crit
    [0, 0, 0], //w1
    [0, 0, 0], //w2
    [0, 0, 0] //w3
];
/*
let bonus = {end: 0, agi: 0, w1Acc: 0, w1Crit: 0, w1Rel: 0, w2Acc: 0, w2Crit: 0, w2Rel: 0, w3Acc: 0, w3Crit: 0, w3Rel: 0};
*/
//Probably not worth an array
let armor = {durability: 0, absoption: 0};
//Array needed
let w1 = {spread: false, explosive: false, burst: false, crit: false, sAngle: 0, pellets: 0, cleave: 0, pDph: 0, dph: 0, exploDph: 0, cleaveDph: 0, critF: 0, critS: 0, reload: 0, accuracy: 0, pen: 0, dps: 0, exploDps: 0, cleaveDps: 0};
let w2 = {spread: false, explosive: false, burst: false, crit: false, sAngle: 0, pellets: 0, cleave: 0, pDph: 0, dph: 0, exploDph: 0, cleaveDph: 0, critF: 0, critS: 0, reload: 0, accuracy: 0, pen: 0, dps: 0, exploDps: 0, cleaveDps: 0};
let w3 = {spread: false, explosive: false, burst: false, crit: false, sAngle: 0, pellets: 0, cleave: 0, pDph: 0, dph: 0, exploDph: 0, cleaveDph: 0, critF: 0, critS: 0, reload: 0, accuracy: 0, pen: 0, dps: 0, exploDps: 0, cleaveDps: 0};
let imp = 
[ //exp, pvp, damage, speed, idr, weapon, armor, cash, ammo, sSpeed, spots
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //imp1 ...
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //... imp16
];
let impBlock =
[ //imp1 ... imp16
    ["none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none"], //Exclusive implants
    ["none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none"] //Unique implants
];
let boosts =
[ //exp, pvp, damage, speed, idr, weapon, armor, cash, ammo, sSpeed, spots
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //ub
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //gm
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //clan
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //total
]
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
    for(let i = 0; i < mainSelect.length; i++)
    {
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
                if(val2["spread"] == true)
                {
                    option.dataset.sAngle = val2["sAngle"];
                    option.dataset.pellets = val2["pellets"];
                };
                option.dataset.dph = val2["dph"];
                option.dataset.shotTime = val2["shotTime"];
                option.dataset.capacity = val2["capacity"];
                option.dataset.weaponCrit = val2["weaponCrit"];
                option.dataset.weaponReload = val2["weaponReload"];
                option.dataset.accuracy = val2["accuracy"];
                option.dataset.pen = val2["pen"];
                option.dataset.cleave = val2["cleave"];
                option.dataset.cleaveMod = val2["cleaveMod"];
                mainSelect[i].appendChild(option);
            });
        });
    };
};

function parseOutImplantArray(data) //Weapons parse function (Credit to Awoo 5: Come Back When You're a Little Mmmm... Awooier!)
{
    let jsonData = JSON.parse(data);
    let mainSelect = document.querySelectorAll("[id^='implantSelect']");
    for(let i = 0; i < mainSelect.length; i++)
    {
        jsonData.forEach((val) =>
        {
            let group = document.createElement("optgroup"); //Create <optgroup> elements
            group.label = val["cat"];
            mainSelect[i].appendChild(group);

            val["items"].forEach((val2) =>
            {
                let option = document.createElement("option"); //Create <option> elements
                option.id = val2["name"];
                option.value = val2["name"];
                option.textContent = val2["name"];
                option.dataset.exp = val2["exp"];
                option.dataset.pvp = val2["pvp"];
                option.dataset.damage = val2["damage"];
                option.dataset.speed = val2["speed"];
                option.dataset.idr = val2["idr"];
                option.dataset.weapon = val2["weapon"];
                option.dataset.armor = val2["armor"];
                option.dataset.cash = val2["cash"];
                option.dataset.ammo = val2["ammo"];
                option.dataset.sSpeed = val2["sSpeed"];
                option.dataset.spots = val2["spots"];
                option.dataset.cantUse = val2["cantUse"];
                option.dataset.unique = val2["unique"];
                mainSelect[i].appendChild(option);
            });
        });
    };
};

function parseOutBuildArray(data) //Build parse function (Credit to Awoo 6: Is this my code yet?)
{
    let jsonData = JSON.parse(data);
    let mainSelect = document.getElementById("buildSelect");
    jsonData.forEach((val) =>
    {
        let group = document.createElement("optgroup"); //Create <optgroup> elements
        group.label = val["cat"];
        mainSelect.appendChild(group);

        val["items"].forEach((val2) =>
        {
            let option = document.createElement("option"); //Create <option> elements
            option.id = val2["name"];
            option.value = val2["name"];
            option.textContent = val2["name"];
            option.dataset.level = val2["level"];
            option.dataset.class = val2["class"];
            option.dataset.str = val2["str"];
            option.dataset.end = val2["end"];
            option.dataset.agi = val2["agi"];
            option.dataset.acc = val2["acc"];
            option.dataset.crit = val2["crit"];
            option.dataset.rel = val2["rel"];
            option.dataset.melee = val2["melee"];
            option.dataset.pistol = val2["pistol"];
            option.dataset.rifle = val2["rifle"];
            option.dataset.shotgun = val2["shotgun"];
            option.dataset.mg = val2["mg"];
            option.dataset.explo = val2["explo"];
            option.dataset.armEnd = val2["armEnd"];
            option.dataset.armAgi = val2["armAgi"];
            option.dataset.w1Acc = val2["w1Acc"];
            option.dataset.w1Crit = val2["w1Crit"];
            option.dataset.w1Rel = val2["w1Rel"];
            option.dataset.w2Acc = val2["w2Acc"];
            option.dataset.w2Crit = val2["w2Crit"];
            option.dataset.w2Rel = val2["w2Rel"];
            option.dataset.w3Acc = val2["w3Acc"];
            option.dataset.w3Crit = val2["w3Crit"];
            option.dataset.w3Rel = val2["w3Rel"];
            option.dataset.desc = val2["desc"];
            mainSelect.appendChild(option);
        });
    });
};

makeForeignRequest("classes.json", parseOutClassArray); //Pull JSON & parse
makeForeignRequest("armors.json", parseOutArmorArray);
makeForeignRequest("weapons.json", parseOutWeaponArray);
makeForeignRequest("implants.json", parseOutImplantArray);
makeForeignRequest("builds.json", parseOutBuildArray);

function buildUpdate() //Savings maybe? - refactor tertiary priority
{
    if(this.id == "buildSelect")
    {
        const request = new XMLHttpRequest(); //Needs to be moved so it runs once the page loads.
        request.open("GET","description.json", false);
        request.send(null);
        const descArr = JSON.parse(request.responseText);

        let level = parseInt(this.options[this.selectedIndex].dataset.level);
        let profession = parseInt(this.options[this.selectedIndex].dataset.class);
        let str = parseInt(this.options[this.selectedIndex].dataset.str);
        let end = parseInt(this.options[this.selectedIndex].dataset.end);
        let agi = parseInt(this.options[this.selectedIndex].dataset.agi);
        let acc = parseInt(this.options[this.selectedIndex].dataset.acc);
        let crit = parseInt(this.options[this.selectedIndex].dataset.crit);
        let rel = parseInt(this.options[this.selectedIndex].dataset.rel);
        let melee = parseInt(this.options[this.selectedIndex].dataset.melee);
        let pistol = parseInt(this.options[this.selectedIndex].dataset.pistol);
        let rifle = parseInt(this.options[this.selectedIndex].dataset.rifle);
        let shotgun = parseInt(this.options[this.selectedIndex].dataset.shotgun);
        let mg = parseInt(this.options[this.selectedIndex].dataset.mg);
        let explo = parseInt(this.options[this.selectedIndex].dataset.explo);
        let armEnd = parseInt(this.options[this.selectedIndex].dataset.armEnd);
        let armAgi = parseInt(this.options[this.selectedIndex].dataset.armAgi);
        let w1Acc = parseInt(this.options[this.selectedIndex].dataset.w1Acc);
        let w1Crit = parseInt(this.options[this.selectedIndex].dataset.w1Crit);
        let w1Rel = parseInt(this.options[this.selectedIndex].dataset.w1Rel);
        let w2Acc = parseInt(this.options[this.selectedIndex].dataset.w2Acc);
        let w2Crit = parseInt(this.options[this.selectedIndex].dataset.w2Crit);
        let w2Rel = parseInt(this.options[this.selectedIndex].dataset.w2Rel);
        let w3Acc = parseInt(this.options[this.selectedIndex].dataset.w3Acc);
        let w3Crit = parseInt(this.options[this.selectedIndex].dataset.w3Crit);
        let w3Rel = parseInt(this.options[this.selectedIndex].dataset.w3Rel);
        let desc = parseInt(this.options[this.selectedIndex].dataset.desc);
        document.getElementById("level").value = level;
        document.getElementById("classSelect").selectedIndex = profession;
        document.getElementById("str").value = str;
        document.getElementById("end").value = end;
        document.getElementById("agi").value = agi;
        document.getElementById("acc").value = acc;
        document.getElementById("crit").value = crit;
        document.getElementById("rel").value = rel;
        document.getElementById("melee").value = melee;
        document.getElementById("pistol").value = pistol;
        document.getElementById("rifle").value = rifle;
        document.getElementById("shotgun").value = shotgun;
        document.getElementById("mg").value = mg;
        document.getElementById("explo").value = explo;
        document.getElementById("armEnd").value = armEnd;
        document.getElementById("armAgi").value = armAgi;
        document.getElementById("w1Acc").value = w1Acc;
        document.getElementById("w1Crit").value = w1Crit;
        document.getElementById("w1Rel").value = w1Rel;
        document.getElementById("w2Acc").value = w2Acc;
        document.getElementById("w2Crit").value = w2Crit;
        document.getElementById("w2Rel").value = w2Rel;
        document.getElementById("w3Acc").value = w3Acc;
        document.getElementById("w3Crit").value = w3Crit;
        document.getElementById("w3Rel").value = w3Rel;
        document.getElementById("buildHelpText").innerText = descArr[0][desc];
    };
};

function selectUpdate() //Refactored to Rebekah levels - Burst dps calculation is way wrong
{
    for(let i = 0; i < selectColl.length; i++)
    { 
        let elem = selectColl[i];
        if(elem.id == "classSelect")
        {
            stat[0][2] = parseInt(elem.options[elem.selectedIndex].dataset.str); //Set values
            stat[1][2] = parseInt(elem.options[elem.selectedIndex].dataset.end);
            stat[2][2] = parseInt(elem.options[elem.selectedIndex].dataset.agi);
            stat[3][2] = parseInt(elem.options[elem.selectedIndex].dataset.acc);
            stat[4][2] = parseInt(elem.options[elem.selectedIndex].dataset.crit);
            stat[5][2] = parseInt(elem.options[elem.selectedIndex].dataset.rel);
            prof[0][1] = parseInt(elem.options[elem.selectedIndex].dataset.melee);
            prof[1][1] = parseInt(elem.options[elem.selectedIndex].dataset.pistol);
            prof[2][1] = parseInt(elem.options[elem.selectedIndex].dataset.rifle);
            prof[3][1] = parseInt(elem.options[elem.selectedIndex].dataset.shotgun);
            prof[4][1] = parseInt(elem.options[elem.selectedIndex].dataset.mg);
            prof[5][1] = parseInt(elem.options[elem.selectedIndex].dataset.explo);
            stat[0][1] = stat[0][2]; //str
            stat[1][1] = stat[1][2] + aBonus[1]; //end
            stat[2][1] = stat[2][2] + aBonus[0]; //agi
            stat[3][1] = stat[3][2] + wBonus[0][0] + wBonus[1][0] + wBonus[2][0]; //acc
            stat[4][1] = stat[4][2] + wBonus[0][2] + wBonus[1][2] + wBonus[2][2]; //crit
            stat[5][1] = stat[5][2] + wBonus[0][1] + wBonus[1][1] + wBonus[2][1]; //rel
        } else if(elem.id == "armorSelect")
        {
            armor["durability"] = parseInt(elem.options[elem.selectedIndex].dataset.durability);
            armor["absorption"] = parseFloat(elem.options[elem.selectedIndex].dataset.absorption);
        } else if(elem.id.includes("weaponSelect"))
        {
            let spread = (elem.options[elem.selectedIndex].dataset.spread === "true");
            let explosive = (elem.options[elem.selectedIndex].dataset.explosive === "true");
            let burst = (elem.options[elem.selectedIndex].dataset.burst === "true");
            let sAngle = elem.options[elem.selectedIndex].dataset.sAngle;
            let pellets = elem.options[elem.selectedIndex].dataset.pellets;
            let cleave = parseInt(elem.options[elem.selectedIndex].dataset.cleave);
            let pelletDph = elem.options[elem.selectedIndex].dataset.dph * (1 + (boosts[3][2] / 100));
            let rawDph = parseFloat(elem.options[elem.selectedIndex].dataset.dph)
            let dph = 0;
            if(spread == true)
            {
                dph = (rawDph * pellets) * (1 + (boosts[3][2] / 100));
            } else
            {
                dph = rawDph * (1 + (boosts[3][2] / 100));
            };
            let exploDph = (rawDph * 5) * (1 + (boosts[3][2] / 100));
            let cleaveDph = 0;
            if(cleave > 0)
            {
                let cleaveMod = parseFloat(elem.options[elem.selectedIndex].dataset.cleaveMod);
                cleaveDph = (rawDph + ((rawDph * cleaveMod) * cleave)) * (1 + (boosts[3][2] / 100));
            };
            let shotTime = elem.options[elem.selectedIndex].dataset.shotTime;
            let capacity = elem.options[elem.selectedIndex].dataset.capacity;
            let weaponCrit = elem.options[elem.selectedIndex].dataset.weaponCrit;
            let baseCrit = (5 + Math.round((stat[4][3] - 25) / 2.5)) * weaponCrit;
            if(baseCrit > 80)
            {
                baseCrit = 80;
            };
            let divisor = 0;
            if(baseCrit < 5)
            {
                divisor = 1;
            } else if(baseCrit <= 9)
            {
                divisor = 2;
            } else if(baseCrit <= 15)
            {
                divisor = 5;
            } else if(baseCrit <= 79)
            {
                divisor = 10;
            } else if(baseCrit >= 80)
            {
                divisor = 20;
            };
            let critFail = Math.ceil((100 - baseCrit) / divisor);
            let critSuccess = Math.floor(baseCrit / divisor);
            let weaponReload = elem.options[elem.selectedIndex].dataset.weaponReload;
            let reloadFrame = 15 + (((124 - stat[5][3]) * weaponReload) / 100);
            let reloadTime = reloadFrame / 60;
            let accuracy = elem.options[elem.selectedIndex].dataset.accuracy;
            let pen = parseInt(elem.options[elem.selectedIndex].dataset.pen);
            let dps = 0;
            if(accuracy == "melee")
            {
                let baseDps = dph * (60 / shotTime);
                dps = baseDps * ((critFail + (critSuccess * 5)) / (critFail + critSuccess));
            } else
            {
                let baseDps = dph * (60 / shotTime);
                let critDps = baseDps * ((critFail + (critSuccess * 5)) / (critFail + critSuccess));
                let magTime = (capacity * shotTime) / 60;
                dps = critDps * (magTime / (magTime + reloadTime));
            };
            let exploDps = 0;
            if(explosive == true)
            {
                let baseDps = exploDph * (60 / shotTime);
                let critDps = baseDps * ((critFail + (critSuccess * 5)) / (critFail + critSuccess));
                let magTime = (capacity * shotTime) / 60;
                exploDps = critDps * (magTime / (magTime + reloadTime));
            }
            let cleaveDps = 0;
            if(cleave > 0)
            {
                let baseDps = cleaveDph * (60 / shotTime);
                cleaveDps = baseDps * ((critFail + (critSuccess * 5)) / (critFail + critSuccess));
            };
            let w;
            if(elem.id == "weaponSelect1") {
                w = w1;
            } else if(elem.id == "weaponSelect2") {
                w = w2;
            } else if(elem.id == "weaponSelect3") {
                w = w3;
            };
            w["spread"] = spread;
            w["explosive"] = explosive;
            w["burst"] = burst;
            if(weaponCrit > 0)
            {
                w["crit"] = true;
            } else
            {
                w["crit"] = false;
            };
            w["sAngle"] = sAngle;
            w["pellets"] = pellets;
            w["cleave"] = cleave;
            w["pDph"] = pelletDph;
            w["dph"] = dph;
            w["cleaveDph"] = cleaveDph;
            w["exploDph"] = exploDph;
            w["critF"] = critFail;
            w["critS"] = critSuccess;
            w["reload"] = reloadTime;
            w["accuracy"] = accuracy;
            w["pen"] = pen;
            w["dps"] = dps;
            w["exploDps"] = exploDps;
            w["cleaveDps"] = cleaveDps;
        };
    };
};

function impUpdate() //Refactored to Rebekah levels
{
    for(let i = 0; i < impSlots.length; i++)
    {
        impSlots[i].querySelectorAll("option").forEach(element => element.disabled = false);
    };
    for(let i = 0; i < selectColl.length; i++)
    { 
        let elem = selectColl[i];
        if(elem.id.includes("implantSelect"))
        {
            let currSlot = elem.id;
            let impName = elem.value;
            let impExp = elem.options[elem.selectedIndex].dataset.exp;
            let impPvp = elem.options[elem.selectedIndex].dataset.pvp;
            let impDamage = elem.options[elem.selectedIndex].dataset.damage;
            let impSpeed = elem.options[elem.selectedIndex].dataset.speed;
            let impIdr = elem.options[elem.selectedIndex].dataset.idr;
            let impWeapon = elem.options[elem.selectedIndex].dataset.weapon;
            let impArmor = elem.options[elem.selectedIndex].dataset.armor;
            let impCash = elem.options[elem.selectedIndex].dataset.cash;
            let impAmmo = elem.options[elem.selectedIndex].dataset.ammo;
            let impSSpeed = elem.options[elem.selectedIndex].dataset.sSpeed;
            let impSpots = elem.options[elem.selectedIndex].dataset.spots;
            let impCantUse = elem.options[elem.selectedIndex].dataset.cantUse;
            let impUnique = (elem.options[elem.selectedIndex].dataset.unique === "true");
            let slot;
            if(currSlot.slice(-2) > 9)
            {
                slot = (currSlot.slice(-2) - 1);
            } else
            {
                slot = (currSlot.slice(-1) - 1);
            };
            if(elem.disabled == true)
            {
                imp[slot] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            } else
            {
                imp[slot] = [impExp, impPvp, impDamage, impSpeed, impIdr, impWeapon, impArmor, impCash, impAmmo, impSSpeed, impSpots];
            };
            impBlock[0][slot] = impCantUse;
            if(impUnique == true)
            {
                impBlock[1][slot] = impName;
            } else
            {
                impBlock[1][slot] = "none";
            };
            for(let i = 0; i < impSlots.length; i++)
            {
                if(i !== slot)
                {
                    if(impBlock[0][slot] != "none")
                    {
                        impSlots[i].querySelector("#" + CSS.escape(impBlock[0][slot])).disabled = true;
                    };
                    if(impBlock[1][slot] != "none")
                    {
                        impSlots[i].querySelector("#" + CSS.escape(impBlock[1][slot])).disabled = true;
                    };
                };
            };
        }
    };
}

function displayUpdate() //The big saving - refactor priority - Reload duration being updated one step behind equipment bonus
{
    const healthSelector = document.getElementById('healthValue');
    const walkSelector = document.getElementById('walkValue');
    const sprintSelector = document.getElementById('sprintValue');
    const durationSelector = document.getElementById('durationValue');
    const regenSelector = document.getElementById('regenValue');
    const duraSelector = document.getElementById('durabilityValue');
    const absorbSelector = document.getElementById('absorptionValue');
    const w1DphSelector = document.getElementById('w1DPHValue');
    const w1ExploDphSelector = document.getElementById('w1ExploDPHValue');
    const w1CleaveDphSelector = document.getElementById('w1CleaveDPHValue');
    const w1PDphSelector = document.getElementById('w1PDPHValue');
    const w1PelletSelector = document.getElementById('w1PelletValue');
    const w1CleaveSelector = document.getElementById('w1CleaveValue');
    const w1CritDphSelector = document.getElementById('w1CritValue');
    const w1CleaveCritDphSelector = document.getElementById('w1CleaveCritValue');
    const w1PatternSelector = document.getElementById('w1PatternValue');
    const w1ReloadSelector = document.getElementById('w1ReloadValue');
    const w1DpsSelector = document.getElementById('w1DPSValue');
    const w1ExploDpsSelector = document.getElementById('w1ExploDPSValue');
    const w1CleaveDpsSelector = document.getElementById('w1CleaveDPSValue');
    const w1AccuracySelector = document.getElementById('w1AccuracyValue');
    const w1SpreadSelector = document.getElementById('w1SpreadValue');
    const w1PenSelector = document.getElementById('w1PenValue');
    const w2DphSelector = document.getElementById('w2DPHValue');
    const w2ExploDphSelector = document.getElementById('w2ExploDPHValue');
    const w2CleaveDphSelector = document.getElementById('w2CleaveDPHValue');
    const w2PDphSelector = document.getElementById('w2PDPHValue');
    const w2PelletSelector = document.getElementById('w2PelletValue');
    const w2CleaveSelector = document.getElementById('w2CleaveValue');
    const w2CritDphSelector = document.getElementById('w2CritValue');
    const w2CleaveCritDphSelector = document.getElementById('w2CleaveCritValue');
    const w2PatternSelector = document.getElementById('w2PatternValue');
    const w2ReloadSelector = document.getElementById('w2ReloadValue');
    const w2DpsSelector = document.getElementById('w2DPSValue');
    const w2ExploDpsSelector = document.getElementById('w2ExploDPSValue');
    const w2CleaveDpsSelector = document.getElementById('w2CleaveDPSValue');
    const w2AccuracySelector = document.getElementById('w2AccuracyValue');
    const w2SpreadSelector = document.getElementById('w2SpreadValue');
    const w2PenSelector = document.getElementById('w2PenValue');
    const w3DphSelector = document.getElementById('w3DPHValue');
    const w3ExploDphSelector = document.getElementById('w3ExploDPHValue');
    const w3CleaveDphSelector = document.getElementById('w3CleaveDPHValue');
    const w3PDphSelector = document.getElementById('w3PDPHValue');
    const w3PelletSelector = document.getElementById('w3PelletValue');
    const w3CleaveSelector = document.getElementById('w3CleaveValue');
    const w3CritDphSelector = document.getElementById('w3CritValue');
    const w3CleaveCritDphSelector = document.getElementById('w3CleaveCritValue');
    const w3PatternSelector = document.getElementById('w3PatternValue');
    const w3ReloadSelector = document.getElementById('w3ReloadValue');
    const w3DpsSelector = document.getElementById('w3DPSValue');
    const w3ExploDpsSelector = document.getElementById('w3ExploDPSValue');
    const w3CleaveDpsSelector = document.getElementById('w3CleaveDPSValue');
    const w3AccuracySelector = document.getElementById('w3AccuracyValue');
    const w3SpreadSelector = document.getElementById('w3SpreadValue');
    const w3PenSelector = document.getElementById('w3PenValue');
    const expSelector = document.getElementById('expValue');
    const pvpSelector = document.getElementById('pvpValue');
    const damageSelector = document.getElementById('damageValue');
    const speedSelector = document.getElementById('speedValue');
    const idrSelector = document.getElementById('idrValue');
    const weaponSelector = document.getElementById('weaponValue');
    const armorSelector = document.getElementById('armorValue');
    const cashSelector = document.getElementById('cashValue');
    const ammoSelector = document.getElementById('ammoValue');
    const sSpeedSelector = document.getElementById('sSpeedValue');
    const spotsSelector = document.getElementById('spotsValue');
    expSelector.textContent = boosts[3][0] + "%";
    pvpSelector.textContent = boosts[3][1] + "%";
    damageSelector.textContent = boosts[3][2] + "%";
    speedSelector.textContent = boosts[3][3] + "%";
    idrSelector.textContent = boosts[3][4] + "%";
    weaponSelector.textContent = boosts[3][5] + "%";
    armorSelector.textContent = boosts[3][6] + "%";
    cashSelector.textContent = boosts[3][7] + "%";
    ammoSelector.textContent = boosts[3][8] + "%";
    sSpeedSelector.textContent = boosts[3][9] + "%";
    spotsSelector.textContent = boosts[3][10] + "%";
    healthSelector.textContent = stat[1][1] * 2;
    walkSelector.textContent = (((2.2 * 1.2) * ((stat[2][3] * 0.0043) + 1.1)) * (1 + (boosts[3][3] / 100))).toFixed(4);
    sprintSelector.textContent = (((3.5 * 1.2) * ((stat[2][3] * 0.0043) + 1.1)) * (1 + (boosts[3][3] / 100))).toFixed(4);
    durationSelector.textContent = ((stat[1][3] - 25) / 6.1875 + 24).toFixed(0) + " s";
    regenSelector.textContent = ((stat[1][3] - 25) / 6.1875 + 24).toFixed(0) + " s";
    //duraSelector.textContent = (durability + (durability * absorption))+" ("+durability+" + "+durability+" * "+absorption+")"; //Need to figure this out
    if(document.getElementById("armorSelect").value != "Please Select an Option")
    {
        duraSelector.textContent = armor["durability"];
        absorbSelector.textContent = (armor["absoption"] * 100) + "%";
    };
    if(document.getElementById("weaponSelect1").value != "Please Select an Option")
    {
        w1DphSelector.textContent = w1["dph"].toFixed(2);
        w1ExploDphSelector.textContent = "Not Explosive"
        w1CleaveDphSelector.textContent = "Not Melee"
        w1PDphSelector.textContent = w1["pDph"].toFixed(2);
        w1PelletSelector.textContent = w1["pellets"];
        w1CleaveSelector.textContent = "Not Melee"
        w1CritDphSelector.textContent = (w1["dph"] * 5).toFixed(2);
        w1CleaveCritDphSelector.textContent = "Not Melee";
        if(w1["critS"] < 1)
        {
            w1PatternSelector.textContent = w1["critF"] + " NC";
        } else
        {
            w1PatternSelector.textContent = w1["critF"] + " NC > " + w1["critS"] + " C";
        };
        w1ReloadSelector.textContent = w1["reload"].toFixed(2) + " s";
        w1DpsSelector.textContent = w1["dps"].toFixed(2);
        w1ExploDpsSelector.textContent = "Not Explosive"
        w1CleaveDpsSelector.textContent = "Not Melee"
        if(w1["accuracy"] == "melee")
        {
            w1AccuracySelector.textContent = "Skill Issue";
        } else if(w1["accuracy"] == "1")
        {
            if(stat[3][3] < 124)
            {
                w1AccuracySelector.style.backgroundColor = "lightcoral";
                w1AccuracySelector.textContent = "Inaccurate";
            } else if(stat[3][3] >= 124)
            {
                w1AccuracySelector.style.backgroundColor = "khaki";
                w1AccuracySelector.textContent = "Reliable Onscreen";
            };
        } else if(w1["accuracy"] == "2")
        {
            if(stat[3][3] < 100)
            {
                w1AccuracySelector.style.backgroundColor = "lightcoral";
                w1AccuracySelector.textContent = "Inaccurate";
            } else if(stat[3][3] < 124)
            {
                w1AccuracySelector.style.backgroundColor = "khaki";
                w1AccuracySelector.textContent = "Reliable Onscreen";
            } else if(stat[3][3] >= 124)
            {
                w1AccuracySelector.style.backgroundColor = "lightgreen";
                w1AccuracySelector.textContent = "Reliable Offscreen";
            };
        } else if(w1["accuracy"] == "3")
        {
            if(stat[3][3] < 80)
            {
                w1AccuracySelector.style.backgroundColor = "lightcoral";
                w1AccuracySelector.textContent = "Inaccurate";
            } else if(stat[3][3] < 100)
            {
                w1AccuracySelector.style.backgroundColor = "coral";
                w1AccuracySelector.textContent = "Reliable Onscreen";
            } else if(stat[3][3] < 119)
            {
                w1AccuracySelector.style.backgroundColor = "khaki";
                w1AccuracySelector.textContent = "Reliable Offscreen";
            } else if(stat[3][3] >= 119)
            {
                w1AccuracySelector.style.backgroundColor = "lightgreen";
                w1AccuracySelector.textContent = "Pinpoint";
            };
        } else if(w1["accuracy"] == "4")
        {
            if(stat[3][3] < 60)
            {
                w1AccuracySelector.style.backgroundColor = "lightcoral";
                w1AccuracySelector.textContent = "Inaccurate";
            } else if(stat[3][3] < 70)
            {
                w1AccuracySelector.style.backgroundColor = "coral";
                w1AccuracySelector.textContent = "Reliable Onscreen";
            } else if(stat[3][3] < 79)
            {
                w1AccuracySelector.style.backgroundColor = "khaki";
                w1AccuracySelector.textContent = "Reliable Offscreen";
            } else if(stat[3][3] >= 79)
            {
                w1AccuracySelector.style.backgroundColor = "lightgreen";
                w1AccuracySelector.textContent = "Pinpoint";
            };
        } else if(w1["accuracy"] == "5")
        {
            if(stat[3][3] < 35)
            {
                w1AccuracySelector.style.backgroundColor = "lightcoral";
                w1AccuracySelector.textContent = "Inaccurate";
            } else if(stat[3][3] < 40)
            {
                w1AccuracySelector.style.backgroundColor = "coral";
                w1AccuracySelector.textContent = "Reliable Onscreen";
            } else if(stat[3][3] < 44)
            {
                w1AccuracySelector.style.backgroundColor = "khaki";
                w1AccuracySelector.textContent = "Reliable Offscreen";
            } else if(stat[3][3] >= 44)
            {
                w1AccuracySelector.style.backgroundColor = "lightgreen";
                w1AccuracySelector.textContent = "Pinpoint";
            };
        };
        w1SpreadSelector.textContent = w1["sAngle"] + "\xB0";
        if(w1["spread"] == true)
        {
            w1DphSelector.textContent = w1["dph"].toFixed(2);
            if(w1["crit"] == false)
            {
                w1CritDphSelector.textContent = "Can't Crit";
                w1PatternSelector.textContent = "Can't Crit";
            };
        } else if(w1["explosive"] == true)
        {
            w1CritDphSelector.textContent = "Can't Crit";
            w1PatternSelector.textContent = "Can't Crit";
            w1PDphSelector.textContent = "No Pellets";
            w1PelletSelector.textContent = "No Pellets";
            w1SpreadSelector.textContent = "No Pellets";
            w1ExploDphSelector.textContent = w1["exploDph"].toFixed(2)
            w1ExploDpsSelector.textContent = w1["exploDps"].toFixed(2)
        } else if(w1["cleave"] > 0)
        {
            w1PDphSelector.textContent = "No Pellets";
            w1PelletSelector.textContent = "No Pellets";
            w1SpreadSelector.textContent = "No Pellets";
            w1ReloadSelector.textContent = "Doesn't Reload";
            w1CleaveDphSelector.textContent = w1["cleaveDph"].toFixed(2);
            w1CleaveCritDphSelector.textContent = (w1["cleaveDph"] * 5).toFixed(2);
            w1CleaveDpsSelector.textContent = w1["cleaveDps"].toFixed(2);
            w1CleaveSelector.textContent = w1["cleave"];
        } else
        {
            w1PDphSelector.textContent = "No Pellets";
            w1PelletSelector.textContent = "No Pellets";
            w1SpreadSelector.textContent = "No Pellets";
            if(w1["burst"] == true)
            {
                w1DphSelector.textContent = (w1["dph"] * 0.12).toFixed(2) + " + " + (w1["dph"] * 0.28).toFixed(2) + " + " + (w1["dph"] * 0.60).toFixed(2);
                w1CritDphSelector.textContent = ((w1["dph"] * 0.12) * 5).toFixed(2) + " + " + ((w1["dph"] * 0.28) * 5).toFixed(2) + " + " + ((w1["dph"] * 0.60) * 5).toFixed(2);
            };
        };
        w1PenSelector.textContent = w1["pen"] + "%";
    };
    if(document.getElementById("weaponSelect2").value != "Please Select an Option")
    {
        w2DphSelector.textContent = w2["dph"].toFixed(2);
        w2ExploDphSelector.textContent = "Not Explosive"
        w2CleaveDphSelector.textContent = "Not Melee"
        w2PDphSelector.textContent = w2["pDph"].toFixed(2);
        w2PelletSelector.textContent = w2["pellets"];
        w2CleaveSelector.textContent = "Not Melee"
        w2CritDphSelector.textContent = (w2["dph"] * 5).toFixed(2);
        w2CleaveCritDphSelector.textContent = "Not Melee";
        if(w2["critS"] < 1)
        {
            w2PatternSelector.textContent = w2["critF"] + " NC";
        } else
        {
            w2PatternSelector.textContent = w2["critF"] + " NC > " + w2["critS"] + " C";
        };
        w2ReloadSelector.textContent = w2["reload"].toFixed(2) + " s";
        w2DpsSelector.textContent = w2["dps"].toFixed(2);
        w2ExploDpsSelector.textContent = "Not Explosive"
        w2CleaveDpsSelector.textContent = "Not Melee"
        if(w2["accuracy"] == "melee")
        {
            w2AccuracySelector.textContent = "Skill Issue";
        } else if(w2["accuracy"] == "1")
        {
            if(stat[3][3] < 124)
            {
                w2AccuracySelector.style.backgroundColor = "lightcoral";
                w2AccuracySelector.textContent = "Inaccurate";
            } else if(stat[3][3] >= 124)
            {
                w2AccuracySelector.style.backgroundColor = "khaki";
                w2AccuracySelector.textContent = "Reliable Onscreen";
            };
        } else if(w2["accuracy"] == "2")
        {
            if(stat[3][3] < 100)
            {
                w2AccuracySelector.style.backgroundColor = "lightcoral";
                w2AccuracySelector.textContent = "Inaccurate";
            } else if(stat[3][3] < 124)
            {
                w2AccuracySelector.style.backgroundColor = "khaki";
                w2AccuracySelector.textContent = "Reliable Onscreen";
            } else if(stat[3][3] >= 124)
            {
                w2AccuracySelector.style.backgroundColor = "lightgreen";
                w2AccuracySelector.textContent = "Reliable Offscreen";
            };
        } else if(w2["accuracy"] == "3")
        {
            if(stat[3][3] < 80)
            {
                w2AccuracySelector.style.backgroundColor = "lightcoral";
                w2AccuracySelector.textContent = "Inaccurate";
            } else if(stat[3][3] < 100)
            {
                w2AccuracySelector.style.backgroundColor = "coral";
                w2AccuracySelector.textContent = "Reliable Onscreen";
            } else if(stat[3][3] < 119)
            {
                w2AccuracySelector.style.backgroundColor = "khaki";
                w2AccuracySelector.textContent = "Reliable Offscreen";
            } else if(stat[3][3] >= 119)
            {
                w2AccuracySelector.style.backgroundColor = "lightgreen";
                w2AccuracySelector.textContent = "Pinpoint";
            };
        } else if(w2["accuracy"] == "4")
        {
            if(stat[3][3] < 60)
            {
                w2AccuracySelector.style.backgroundColor = "lightcoral";
                w2AccuracySelector.textContent = "Inaccurate";
            } else if(stat[3][3] < 70)
            {
                w2AccuracySelector.style.backgroundColor = "coral";
                w2AccuracySelector.textContent = "Reliable Onscreen";
            } else if(stat[3][3] < 79)
            {
                w2AccuracySelector.style.backgroundColor = "khaki";
                w2AccuracySelector.textContent = "Reliable Offscreen";
            } else if(stat[3][3] >= 79)
            {
                w2AccuracySelector.style.backgroundColor = "lightgreen";
                w2AccuracySelector.textContent = "Pinpoint";
            };
        } else if(w2["accuracy"] == "5")
        {
            if(stat[3][3] < 35)
            {
                w2AccuracySelector.style.backgroundColor = "lightcoral";
                w2AccuracySelector.textContent = "Inaccurate";
            } else if(stat[3][3] < 40)
            {
                w2AccuracySelector.style.backgroundColor = "coral";
                w2AccuracySelector.textContent = "Reliable Onscreen";
            } else if(stat[3][3] < 44)
            {
                w2AccuracySelector.style.backgroundColor = "khaki";
                w2AccuracySelector.textContent = "Reliable Offscreen";
            } else if(stat[3][3] >= 44)
            {
                w2AccuracySelector.style.backgroundColor = "lightgreen";
                w2AccuracySelector.textContent = "Pinpoint";
            };
        };
        w2SpreadSelector.textContent = w2["sAngle"] + "\xB0";
        if(w2["spread"] == true)
        {
            w2DphSelector.textContent = w2["dph"].toFixed(2);
            if(w2["crit"] == false)
            {
                w2CritDphSelector.textContent = "Can't Crit";
                w2PatternSelector.textContent = "Can't Crit";
            };
        } else if(w2["explosive"] == true)
        {
            w2CritDphSelector.textContent = "Can't Crit";
            w2PatternSelector.textContent = "Can't Crit";
            w2PDphSelector.textContent = "No Pellets";
            w2PelletSelector.textContent = "No Pellets";
            w2SpreadSelector.textContent = "No Pellets";
            w2ExploDphSelector.textContent = w2["exploDph"].toFixed(2)
            w2ExploDpsSelector.textContent = w2["exploDps"].toFixed(2)
        } else if(w2["cleave"] > 0)
        {
            w2PDphSelector.textContent = "No Pellets";
            w2PelletSelector.textContent = "No Pellets";
            w2SpreadSelector.textContent = "No Pellets";
            w2ReloadSelector.textContent = "Doesn't Reload";
            w2CleaveDphSelector.textContent = w2["cleaveDph"].toFixed(2);
            w2CleaveCritDphSelector.textContent = (w2["cleaveDph"] * 5).toFixed(2);
            w2CleaveDpsSelector.textContent = w2["cleaveDps"].toFixed(2);
            w2CleaveSelector.textContent = w2["cleave"];
        } else
        {
            w2PDphSelector.textContent = "No Pellets";
            w2PelletSelector.textContent = "No Pellets";
            w2SpreadSelector.textContent = "No Pellets";
            if(w2["burst"] == true)
            {
                w2DphSelector.textContent = (w2["dph"] * 0.12).toFixed(2) + " + " + (w2["dph"] * 0.28).toFixed(2) + " + " + (w2["dph"] * 0.60).toFixed(2);
                w2CritDphSelector.textContent = ((w2["dph"] * 0.12) * 5).toFixed(2) + " + " + ((w2["dph"] * 0.28) * 5).toFixed(2) + " + " + ((w2["dph"] * 0.60) * 5).toFixed(2);
            };
        };
        w2PenSelector.textContent = w2["pen"] + "%";
    };
    if(document.getElementById("weaponSelect3").value != "Please Select an Option")
    {
        w3DphSelector.textContent = w3["dph"].toFixed(2);
        w3ExploDphSelector.textContent = "Not Explosive"
        w3CleaveDphSelector.textContent = "Not Melee"
        w3PDphSelector.textContent = w3["pDph"].toFixed(2);
        w3PelletSelector.textContent = w3["pellets"];
        w3CleaveSelector.textContent = "Not Melee"
        w3CritDphSelector.textContent = (w3["dph"] * 5).toFixed(2);
        w3CleaveCritDphSelector.textContent = "Not Melee";
        if(w3["critS"] < 1)
        {
            w3PatternSelector.textContent = w3["critF"] + " NC";
        } else
        {
            w3PatternSelector.textContent = w3["critF"] + " NC > " + w3["critS"] + " C";
        };
        w3ReloadSelector.textContent = w3["reload"].toFixed(2) + " s";
        w3DpsSelector.textContent = w3["dps"].toFixed(2);
        w3ExploDpsSelector.textContent = "Not Explosive"
        w3CleaveDpsSelector.textContent = "Not Melee"
        if(w3["accuracy"] == "melee")
        {
            w3AccuracySelector.textContent = "Skill Issue";
        } else if(w3["accuracy"] == "1")
        {
            if(stat[3][3] < 124)
            {
                w3AccuracySelector.style.backgroundColor = "lightcoral";
                w3AccuracySelector.textContent = "Inaccurate";
            } else if(stat[3][3] >= 124)
            {
                w3AccuracySelector.style.backgroundColor = "khaki";
                w3AccuracySelector.textContent = "Reliable Onscreen";
            };
        } else if(w3["accuracy"] == "2")
        {
            if(stat[3][3] < 100)
            {
                w3AccuracySelector.style.backgroundColor = "lightcoral";
                w3AccuracySelector.textContent = "Inaccurate";
            } else if(stat[3][3] < 124)
            {
                w3AccuracySelector.style.backgroundColor = "khaki";
                w3AccuracySelector.textContent = "Reliable Onscreen";
            } else if(stat[3][3] >= 124)
            {
                w3AccuracySelector.style.backgroundColor = "lightgreen";
                w3AccuracySelector.textContent = "Reliable Offscreen";
            };
        } else if(w3["accuracy"] == "3")
        {
            if(stat[3][3] < 80)
            {
                w3AccuracySelector.style.backgroundColor = "lightcoral";
                w3AccuracySelector.textContent = "Inaccurate";
            } else if(stat[3][3] < 100)
            {
                w3AccuracySelector.style.backgroundColor = "coral";
                w3AccuracySelector.textContent = "Reliable Onscreen";
            } else if(stat[3][3] < 119)
            {
                w3AccuracySelector.style.backgroundColor = "khaki";
                w3AccuracySelector.textContent = "Reliable Offscreen";
            } else if(stat[3][3] >= 119)
            {
                w3AccuracySelector.style.backgroundColor = "lightgreen";
                w3AccuracySelector.textContent = "Pinpoint";
            };
        } else if(w3["accuracy"] == "4")
        {
            if(stat[3][3] < 60)
            {
                w3AccuracySelector.style.backgroundColor = "lightcoral";
                w3AccuracySelector.textContent = "Inaccurate";
            } else if(stat[3][3] < 70)
            {
                w3AccuracySelector.style.backgroundColor = "coral";
                w3AccuracySelector.textContent = "Reliable Onscreen";
            } else if(stat[3][3] < 79)
            {
                w3AccuracySelector.style.backgroundColor = "khaki";
                w3AccuracySelector.textContent = "Reliable Offscreen";
            } else if(stat[3][3] >= 79)
            {
                w3AccuracySelector.style.backgroundColor = "lightgreen";
                w3AccuracySelector.textContent = "Pinpoint";
            };
        } else if(w3["accuracy"] == "5")
        {
            if(stat[3][3] < 35)
            {
                w3AccuracySelector.style.backgroundColor = "lightcoral";
                w3AccuracySelector.textContent = "Inaccurate";
            } else if(stat[3][3] < 40)
            {
                w3AccuracySelector.style.backgroundColor = "coral";
                w3AccuracySelector.textContent = "Reliable Onscreen";
            } else if(stat[3][3] < 44)
            {
                w3AccuracySelector.style.backgroundColor = "khaki";
                w3AccuracySelector.textContent = "Reliable Offscreen";
            } else if(stat[3][3] >= 44)
            {
                w3AccuracySelector.style.backgroundColor = "lightgreen";
                w3AccuracySelector.textContent = "Pinpoint";
            };
        };
        w3SpreadSelector.textContent = w3["sAngle"] + "\xB0";
        if(w3["spread"] == true)
        {
            w3DphSelector.textContent = w3["dph"].toFixed(2);
            if(w3["crit"] == false)
            {
                w3CritDphSelector.textContent = "Can't Crit";
                w3PatternSelector.textContent = "Can't Crit";
            };
        } else if(w3["explosive"] == true)
        {
            w3CritDphSelector.textContent = "Can't Crit";
            w3PatternSelector.textContent = "Can't Crit";
            w3PDphSelector.textContent = "No Pellets";
            w3PelletSelector.textContent = "No Pellets";
            w3SpreadSelector.textContent = "No Pellets";
            w3ExploDphSelector.textContent = w3["exploDph"].toFixed(2)
            w3ExploDpsSelector.textContent = w3["exploDps"].toFixed(2)
        } else if(w3["cleave"] > 0)
        {
            w3PDphSelector.textContent = "No Pellets";
            w3PelletSelector.textContent = "No Pellets";
            w3SpreadSelector.textContent = "No Pellets";
            w3ReloadSelector.textContent = "Doesn't Reload";
            w3CleaveDphSelector.textContent = w3["cleaveDph"].toFixed(2);
            w3CleaveCritDphSelector.textContent = (w3["cleaveDph"] * 5).toFixed(2);
            w3CleaveDpsSelector.textContent = w3["cleaveDps"].toFixed(2);
            w3CleaveSelector.textContent = w3["cleave"];
        } else
        {
            w3PDphSelector.textContent = "No Pellets";
            w3PelletSelector.textContent = "No Pellets";
            w3SpreadSelector.textContent = "No Pellets";
            if(w3["burst"] == true)
            {
                w3DphSelector.textContent = (w3["dph"] * 0.12).toFixed(2) + " + " + (w3["dph"] * 0.28).toFixed(2) + " + " + (w3["dph"] * 0.60).toFixed(2);
                w3CritDphSelector.textContent = ((w3["dph"] * 0.12) * 5).toFixed(2) + " + " + ((w3["dph"] * 0.28) * 5).toFixed(2) + " + " + ((w3["dph"] * 0.60) * 5).toFixed(2);
            };
        };
        w3PenSelector.textContent = w3["pen"] + "%";
    };
};

function statEntry() //Refactored to Rebekah levels
{
    for(let i = 0; i < rangeColl.length; i++)
    {
        let elem = rangeColl[i];
        const content = elem.nextElementSibling;
        let statValue = parseInt(elem.value);
        let boostValue;
        let maxAdjust;
        if(elem.id.includes("Stat"))
        {
            if(elem.id == "strStat")
            {
                if(stat[i][1] > 0)
                {
                    maxAdjust = 100 - stat[i][1];
                    elem.setAttribute("max", maxAdjust);
                } else
                {
                    elem.setAttribute("max", 100);
                }
            } else
            {
                if(stat[i][1] > 24)
                {
                    maxAdjust = 124 - stat[i][1];
                    elem.setAttribute("max", maxAdjust);
                } else
                {
                    elem.setAttribute("max", 100);
                }
            };
            stat[i][0] = statValue;
            boostValue = statValue + stat[i][1];
            stat[i][3] = boostValue;
            content.textContent = boostValue + " (" + statValue + " + " + stat[i][1] + ")";
        };
        let i2 = i - 6;
        if(elem.id.includes("Prof"))
        {
            if(prof[i2][1] > 24)
            {
                maxAdjust = 124 - prof[i2][1];
                elem.setAttribute("max", maxAdjust);
            } else
            {
                elem.setAttribute("max", 100);
            };
            prof[i2][0] = statValue;
            boostValue = statValue + prof[i2][1];
            content.textContent = boostValue + " (" + statValue + " + " + prof[i2][1] + ")";
        };
        charInfo["statTotal"] = stat[0][0] + stat[1][0] + stat[2][0] + stat[3][0] + stat[4][0] + stat[5][0];
        charInfo["pointsReq"] = charInfo["statTotal"] - 150;
        if(50 >= charInfo["level"] > 0)
        {
            charInfo["pointsTotal"] = (charInfo["level"] - 1) * 5;
        } else if(charInfo["level"] <= 220 && charInfo["level"] > 0)
        {
            charInfo["pointsTotal"] = (charInfo["level"] - 50) + 245;
        } else if(charInfo["level"] > 220)
        {
            charInfo["pointsTotal"] = 415;
        } else
        {
            charInfo["pointsTotal"] = 0;
        };
        charInfo["profTotal"] = prof[0][0] + prof[1][0] + prof[2][0] + prof[3][0] + prof[4][0] + prof[5][0];
        charInfo["pointsPReq"] = charInfo["profTotal"] - 10;
        if(50 >= charInfo["level"] > 0)
        {
            charInfo["pointsPTotal"] = (charInfo["level"] - 1) * 5;
        } else if(charInfo["level"] <= 220 && charInfo["level"] > 0)
        {
            charInfo["pointsPTotal"] = ((charInfo["level"] - 50) * 2) + 245;
        } else if(charInfo["level"] <= 325)
        {
            charInfo["pointsPTotal"] = (charInfo["level"] - 220) + 585;
        } else
        {
            charInfo["pointsPTotal"] = 0;
        };
        charInfo["pointsTotal"] = charInfo["pointsTotal"] - charInfo["pointsReq"];
        pointsReqSel.textContent = charInfo["pointsTotal"];
        charInfo["pointsPTotal"] = charInfo["pointsPTotal"] - charInfo["pointsPReq"];
        pointsPReqSel.textContent = charInfo["pointsPTotal"];
        if(charInfo["pointsReq"] == charInfo["pointsPReq"] || charInfo["pointsReq"] > charInfo["pointsPReq"])
        {
            if(charInfo["pointsReq"] > 415 || charInfo["pointsPReq"] > 690)
            {
                levelReqSel.textContent = "Impossible";
            } else if(245 >= charInfo["pointsReq"] > 0)
            {
                charInfo["levelReq"] = Math.ceil((charInfo["pointsReq"] / 5) + 1);
                levelReqSel.textContent = charInfo["levelReq"];
            } else if(charInfo["pointsReq"] <= 415 && charInfo["pointsReq"] > 0)
            {
                charInfo["levelReq"] = (charInfo["pointsReq"] - 245) + 50;
                levelReqSel.textContent = charInfo["levelReq"];
            } else
            {
                charInfo["levelReq"] = 1;
                levelReqSel.textContent = charInfo["levelReq"];
            };
        } else if(charInfo["pointsPReq"] > charInfo["pointsReq"])
        {
            if(charInfo["pointsPReq"] > 690 || charInfo["pointsReq"] > 415)
            {
                levelReqSel.textContent = "Impossible";
            } else if(245 >= charInfo["pointsPReq"] > 0)
            {
                charInfo["levelReq"] = Math.ceil((charInfo["pointsPReq"] / 5) + 1);
                levelReqSel.textContent = charInfo["levelReq"];
            } else if(585 >= charInfo["pointsPReq"] > 0)
            {
                charInfo["levelReq"] = Math.ceil(((charInfo["pointsPReq"] - 245) / 2) + 50);
                levelReqSel.textContent = charInfo["levelReq"];
            } else if(690 >= charInfo["pointsPReq"] > 0)
            {
                charInfo["levelReq"] = (charInfo["pointsPReq"] - 585) + 220;
                levelReqSel.textContent = charInfo["levelReq"];
            } else
            {
                charInfo["levelReq"] = 1;
                levelReqSel.textContent = charInfo["levelReq"];
            };
        };
    };
};

function bonusEntry() //Refactored to Rebekah levels
{
    for (let i = 0; i < numColl.length; i++)
    {
        let elem = numColl[i];
        var inputValue = parseInt(elem.value);
        if(isNaN(inputValue)) //Default value issues, yay.
        {
            inputValue = 0;
        };
        if(elem.id == "level")
        {
            if(inputValue < elem.min)
            {
                elem.value = parseInt(elem.min);
                charInfo["level"] = parseInt(elem.min);
            } else if(inputValue > elem.max)
            {
                elem.value = parseInt(elem.max);
                charInfo["level"] = parseInt(elem.max);
            } else
            {
                charInfo["level"] = inputValue;
            };
            if(50 >= charInfo["level"] > 0)
            {
                charInfo["pointsTotal"] = ((charInfo["level"] - 1) * 5) - charInfo["pointsReq"];
                charInfo["pointsPTotal"] = ((charInfo["level"] - 1) * 5) - charInfo["pointsPReq"];
            } else if(220 >= charInfo["level"] > 0)
            {
                charInfo["pointsTotal"] = ((charInfo["level"] - 50) + 245) - charInfo["pointsReq"];
                charInfo["pointsPTotal"] = (((charInfo["level"] - 50) * 2) + 245) - charInfo["pointsPReq"];
            } else if(charInfo["level"] <= 325)
            {
                charInfo["pointsTotal"] = 415 - charInfo["pointsReq"];
                charInfo["pointsPTotal"] = ((charInfo["level"] - 220) + 585) - charInfo["pointsPReq"];
            } else
            {
                charInfo["pointsTotal"] = 0 - charInfo["pointsReq"];
                charInfo["pointsPTotal"] = 0 - charInfo["pointsPReq"];
            };
            pointsReqSel.textContent = charInfo["pointsTotal"];
            pointsPReqSel.textContent = charInfo["pointsPTotal"];
            let openSlots = 0;
            if(impLock)
            {
              for(let i2 = 0; i2 < impSlots.length; i2++)
              {
                impSlots[i2].disabled = true;
              };
              for(let i2 = 0; i2 < slotLevel.length; i2++)
              {
                if(charInfo["level"] >= slotLevel[i2])
                {
                  openSlots = i2 + 1;
                };
              };
              for(let i2 = 0; i2 < openSlots; i2++)
              {
                impSlots[i2].disabled = false;
              };
            };
        } else if(elem.id.includes("arm"))
        {
            let i2 = i - 1

            if(inputValue > 24)
            {
                elem.value = 24;
                aBonus[i2] = 24;
            } else if(inputValue < 0)
            {
                elem.value = 0;
                aBonus[i2] = 0;
            } else
            {
                aBonus[i2] = inputValue;
            };
        } else if(elem.id.includes("w"))
        {
            let i2 = 0;
            let i3 = 0;
            if(i >= 9)
            {
                i2 = i - 9;
                i3 = 2;
            } else if(i >= 6)
            {
                i2 = i - 6;
                i3 = 1;
            } else if(i >= 3)
            {
                i2 = i - 3;
            };
            if(inputValue > elem.max)
            {
                elem.value = parseInt(elem.max);
                inputValue = parseInt(elem.max);
            } else if(inputValue < elem.min)
            {
                elem.value = parseInt(elem.min);
                inputValue = parseInt(elem.min);
            };
            wBonus[i3][i2] = inputValue;
            console.log(wBonus);
        } else if(elem.id.includes("clan"))
        {
            let i2 = 0;
            if(i >= 15) //Remove if clan speed boost becomes public, replace let i2 = 0; with let i2 = i - 12;
            {
                i2 = i - 11;
            } else
            {
                i2 = i - 12;
            };
            if(inputValue > elem.max)
            {
                elem.value = parseInt(elem.max);
                inputValue = parseInt(elem.max)
            } else if(inputValue < elem.min)
            {
                elem.value = parseInt(elem.min);
                inputValue = parseInt(elem.min)
            };
            boosts[2][i2] = inputValue;
        };
    };
    stat[0][1] = stat[0][2]; //str
    stat[1][1] = stat[1][2] + aBonus[1]; //end
    stat[2][1] = stat[2][2] + aBonus[0]; //agi
    stat[3][1] = stat[3][2] + wBonus[0][0] + wBonus[1][0] + wBonus[2][0]; //acc
    stat[4][1] = stat[4][2] + wBonus[0][2] + wBonus[1][2] + wBonus[2][2]; //crit
    stat[5][1] = stat[5][2] + wBonus[0][1] + wBonus[1][1] + wBonus[2][1]; //rel
};

function boostUpdate() //Rebekah's magnum opus refactor
{
    for(let i = 0; i < boosts[3].length; i++)
    {
        let total = 0;
        for(let j = 0; j < imp.length; j++)
        {
            total = total + parseInt(imp[j][i]);
        };
        boosts[3][i] = total + boosts[0][i] + boosts[1][i] + boosts[2][i];
    };
};
//#endregion

//#region Listeners
for(let i = 0; i < rangeColl.length; i++)
{
    rangeColl[i].addEventListener("input", function()
    {
        bonusEntry();
        selectUpdate();
        statEntry();
        displayUpdate();
    });
};

for(let i = 0; i < numColl.length; i++)
{
    numColl[i].addEventListener("input", function()
    {
        bonusEntry();
        boostUpdate();
        selectUpdate();
        statEntry();
        displayUpdate();
    });
};

for(let i = 0; i < selectColl.length; i++)
{
    selectColl[i].addEventListener("change", function()
    {
        buildUpdate.call(this);
        impUpdate();
        boostUpdate();
        selectUpdate();
        bonusEntry();
        statEntry();
        displayUpdate();
    });
};

for(let i = 0; i < checkColl.length; i++)
{
    checkColl[i].addEventListener("change", function()
    {
        if(this.id == "gmCheck")
        {
            if(this.checked == true)
            {
                boosts[1] = [100, 0, 0, 0, 0, 100, 100, 100, 100, 0, 60];
            } else if(this.checked == false)
            {
                boosts[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            };
        } else if(this.id == "ubCheck")
        {
            if(this.checked == true)
            {
                boosts[0] = [50, 0, 35, 35, 0, 0, 0, 0, 0, 0, 0];
            } else if(this.checked == false)
            {
                boosts[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            };
        };
        boostUpdate();
        selectUpdate();
        displayUpdate();
    });
};
//#endregion
