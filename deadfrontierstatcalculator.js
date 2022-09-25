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
let armor = 
[ //durability, absorption
    0, 0
];
let weapon =
[ //spread, explosive, burst, crit, sAngle, pellets, cleave, pDph, dph, exploDph, cleaveDph, critF, critS, reload, accuracy, pen, dps, exploDps, cleaveDps
    [false, false, false, false, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //w1
    [false, false, false, false, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //w2
    [false, false, false, false, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] //w3
];
/*
let w1 = {spread: false, explosive: false, burst: false, crit: false, sAngle: 0, pellets: 0, cleave: 0, pDph: 0, dph: 0, exploDph: 0, cleaveDph: 0, critF: 0, critS: 0, reload: 0, accuracy: 0, pen: 0, dps: 0, exploDps: 0, cleaveDps: 0};
let w2 = {spread: false, explosive: false, burst: false, crit: false, sAngle: 0, pellets: 0, cleave: 0, pDph: 0, dph: 0, exploDph: 0, cleaveDph: 0, critF: 0, critS: 0, reload: 0, accuracy: 0, pen: 0, dps: 0, exploDps: 0, cleaveDps: 0};
let w3 = {spread: false, explosive: false, burst: false, crit: false, sAngle: 0, pellets: 0, cleave: 0, pDph: 0, dph: 0, exploDph: 0, cleaveDph: 0, critF: 0, critS: 0, reload: 0, accuracy: 0, pen: 0, dps: 0, exploDps: 0, cleaveDps: 0};
*/
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
            armor[0] = parseInt(elem.options[elem.selectedIndex].dataset.durability);
            armor[1] = parseFloat(elem.options[elem.selectedIndex].dataset.absorption);
        } else if(elem.id.includes("weaponSelect"))
        {
            let spread = (elem.options[elem.selectedIndex].dataset.spread === "true");
            let explosive = (elem.options[elem.selectedIndex].dataset.explosive === "true");
            let burst = (elem.options[elem.selectedIndex].dataset.burst === "true");
            let sAngle = elem.options[elem.selectedIndex].dataset.sAngle;
            let pellets = elem.options[elem.selectedIndex].dataset.pellets;
            let cleave = parseInt(elem.options[elem.selectedIndex].dataset.cleave);
            let pelletDph = 0;
            if(spread != false)
            {
                pelletDph = elem.options[elem.selectedIndex].dataset.dph * (1 + (boosts[3][2] / 100));
            };
            let rawDph = parseFloat(elem.options[elem.selectedIndex].dataset.dph)
            let dph = 0;
            if(spread == true)
            {
                dph = (rawDph * pellets) * (1 + (boosts[3][2] / 100));
            } else
            {
                dph = rawDph * (1 + (boosts[3][2] / 100));
            };
            let exploDph = 0;
            if(explosive == true)
            {
                exploDph = (rawDph * 5) * (1 + (boosts[3][2] / 100));
            };
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
            let weaponReload = parseInt(elem.options[elem.selectedIndex].dataset.weaponReload);
            let reloadTime = 0;
            if(weaponReload != 0)
            {
                let reloadFrame = 15 + (((124 - stat[5][3]) * weaponReload) / 100);
                reloadTime = reloadFrame / 60;
            };
            let accuracy;
            if(elem.value == "Fists")
            {
                accuracy = "Skill Issue";
            } else
            {
                accuracy = elem.options[elem.selectedIndex].dataset.accuracy;
            };
            let pen = parseInt(elem.options[elem.selectedIndex].dataset.pen);
            let dps = 0;
            if(accuracy == "melee" || accuracy == "Skill Issue")
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
                w = weapon[0];
            } else if(elem.id == "weaponSelect2") {
                w = weapon[1];
            } else if(elem.id == "weaponSelect3") {
                w = weapon[2];
            };
            w[0] = spread;
            w[1] = explosive;
            w[2] = burst;
            if(weaponCrit > 0)
            {
                w[3] = true;
            } else
            {
                w[3] = false;
            };
            w[4] = sAngle;
            w[5] = pellets;
            w[6] = cleave;
            w[7] = pelletDph;
            w[8] = dph;
            w[9] = exploDph;
            w[10] = cleaveDph;
            w[11] = critFail;
            w[12] = critSuccess;
            w[13] = reloadTime;
            w[14] = accuracy;
            w[15] = pen;
            w[16] = dps;
            w[17] = exploDps;
            w[18] = cleaveDps;
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

function displayUpdate() //Refactored to Rebekah levels
{
    boostDisplay();
    charDisplay();
    armorDisplay();
    weaponDisplay();
};

function charDisplay() //Part of above refactor
{
    const char = document.querySelectorAll("p[id^='charVal']");
    char[0].textContent = stat[1][0] * 2;
    char[1].textContent = (((2.2 * 1.2) * ((stat[2][3] * 0.0043) + 1.1)) * (1 + (boosts[3][3] / 100))).toFixed(4);
    char[2].textContent = (((3.5 * 1.2) * ((stat[2][3] * 0.0043) + 1.1)) * (1 + (boosts[3][3] / 100))).toFixed(4);
    char[3].textContent = ((stat[1][3] - 25) / 6.1875 + 24).toFixed(0) + " s";
    char[4].textContent = ((stat[1][3] - 25) / 6.1875 + 24).toFixed(0) + " s";
};

function armorDisplay() //Part of above refactor
{
    const armorColl = document.querySelectorAll("p[id^='aVal']");
    if(document.getElementById("armorSelect").value != "Please Select an Option")
    {
        //duraSelector.textContent = (durability + (durability * absorption))+" ("+durability+" + "+durability+" * "+absorption+")"; //Need to figure this out
        armorColl[0].textContent = armor[0];
        armorColl[1].textContent = (armor[1] * 100) + "%";
    };
};

function weaponDisplay() //Part of above refactor, needs stress testing. Need to reset values when "Please Select an Option" chosen.
{
    const wColl = document.querySelectorAll("p[id^='w']")
    const w1 = document.querySelectorAll("p[id^='w1Val']")
    const w2 = document.querySelectorAll("p[id^='w2Val']")
    const w3 = document.querySelectorAll("p[id^='w3Val']")
    for(let i = 0; i < wColl.length; i++)
    {
        let elem = wColl[i];
        let coll;
        let w;
        if(elem.id.includes("w1") && document.getElementById("weaponSelect1").value != "Please Select an Option")
        {
            coll = w1;
            w = weapon[0];
        } else if(elem.id.includes("w2") && document.getElementById("weaponSelect2").value != "Please Select an Option")
        {
            coll = w2;
            w = weapon[1];
        } else if(elem.id.includes("w3") && document.getElementById("weaponSelect3").value != "Please Select an Option")
        {
            coll = w3;
            w = weapon[2];
        } else
        {
            break;
        };
        if(w[2] == true) //Burst dph
        {
            coll[0].textContent = (w[8] * 0.12).toFixed(2) + " + " + (w[8] * 0.28).toFixed(2) + " + " + (w[8] * 0.60).toFixed(2);
        } else //dph
        {
            coll[0].textContent = w[8].toFixed(2);
        };
        coll[1].textContent = w[9].toFixed(2); //exploDph
        coll[2].textContent = w[10].toFixed(2); //cleaveDph
        coll[3].textContent = w[7].toFixed(2); //pDph
        coll[4].textContent = w[5]; //pellets
        coll[5].textContent = w[6]; //cleave
        if(w[0] != true) //Spread check
        {
            if(w[2] == true) //Burst critDph
            {
                coll[6].textContent = ((w[8] * 0.12) * 5).toFixed(2) + " + " + ((w[8] * 0.28) * 5).toFixed(2) + " + " + ((w[8] * 0.60) * 5).toFixed(2);
            } else //critDph
            {
                coll[6].textContent = w[8] * 5;
            };
            coll[7].textContent = w[10] * 5; //cleaveCrit
            if(w[12] < 1) //critPattern
            {
                coll[8].textContent = w[11] + " NC";
            } else
            {
                coll[8].textContent = w[11] + " NC > " + w[12] + " C";
            };
        } else if(w[3] == true) //Heat Pit check
        {
            coll[6].textContent = w[8] * 5;
        };
        coll[9].textContent = w[16].toFixed(2); //dps
        coll[10].textContent = w[17].toFixed(2); //exploDps
        coll[11].textContent = w[18].toFixed(2); //cleaveDps
        coll[12].textContent = w[15] + "%"; //pen
        coll[13].textContent = w[13].toFixed(2) + " s"; //reload
        if(w[14] != "melee") //accuracy
        {
            if(w[14] == "Skill Issue")
            {
                coll[14].textContent = w[14];
            } else if(w[14] == "1")
            {
                if(stat[3][3] < 124)
                {
                    coll[14].style.backgroundColor = "lightcoral";
                    coll[14].textContent = "Inaccurate";
                } else if(stat[3][3] >= 124)
                {
                    coll[14].style.backgroundColor = "khaki";
                    coll[14].textContent = "Reliable Onscreen";
                };
            } else if(w[14] == "2")
            {
                if(stat[3][3] < 100)
                {
                    coll[14].style.backgroundColor = "lightcoral";
                    coll[14].textContent = "Inaccurate";
                } else if(stat[3][3] < 124)
                {
                    coll[14].style.backgroundColor = "khaki";
                    coll[14].textContent = "Reliable Onscreen";
                } else if(stat[3][3] >= 124)
                {
                    coll[14].style.backgroundColor = "lightgreen";
                    coll[14].textContent = "Reliable Offscreen";
                };
            } else if(w[14] == "3")
            {
                if(stat[3][3] < 80)
                {
                    coll[14].style.backgroundColor = "lightcoral";
                    coll[14].textContent = "Inaccurate";
                } else if(stat[3][3] < 100)
                {
                    coll[14].style.backgroundColor = "coral";
                    coll[14].textContent = "Reliable Onscreen";
                } else if(stat[3][3] < 119)
                {
                    coll[14].style.backgroundColor = "khaki";
                    coll[14].textContent = "Reliable Offscreen";
                } else if(stat[3][3] >= 119)
                {
                    coll[14].style.backgroundColor = "lightgreen";
                    coll[14].textContent = "Pinpoint";
                };
            } else if(w[14] == "4")
            {
                if(stat[3][3] < 60)
                {
                    coll[14].style.backgroundColor = "lightcoral";
                    coll[14].textContent = "Inaccurate";
                } else if(stat[3][3] < 70)
                {
                    coll[14].style.backgroundColor = "coral";
                    coll[14].textContent = "Reliable Onscreen";
                } else if(stat[3][3] < 79)
                {
                    coll[14].style.backgroundColor = "khaki";
                    coll[14].textContent = "Reliable Offscreen";
                } else if(stat[3][3] >= 79)
                {
                    coll[14].style.backgroundColor = "lightgreen";
                    coll[14].textContent = "Pinpoint";
                };
            } else if(w[14] == "5")
            {
                if(stat[3][3] < 35)
                {
                    coll[14].style.backgroundColor = "lightcoral";
                    coll[14].textContent = "Inaccurate";
                } else if(stat[3][3] < 40)
                {
                    coll[14].style.backgroundColor = "coral";
                    coll[14].textContent = "Reliable Onscreen";
                } else if(stat[3][3] < 44)
                {
                    coll[14].style.backgroundColor = "khaki";
                    coll[14].textContent = "Reliable Offscreen";
                } else if(stat[3][3] >= 44)
                {
                    coll[14].style.backgroundColor = "lightgreen";
                    coll[14].textContent = "Pinpoint";
                };
            };
        } else
        {
            coll[14].textContent = "";
        };
        coll[15].textContent = w[4] + "\xB0"; //spread
        if(elem.textContent == "" || elem.textContent == "0" || elem.textContent == "0.00" || elem.textContent == "0.00 s" || elem.textContent == "0%" || elem.textContent == "NaN" || elem.textContent == "undefined\xB0")
        {
            wColl[i].style.display = "none";
            wColl[i].previousElementSibling.style.display = "none";
        } else
        {
            wColl[i].style.display = "block";
            wColl[i].previousElementSibling.style.display = "block";
        };
    };
};

function boostDisplay() //Part of above refactor
{
    const boost = document.querySelectorAll("p[id^='boostVal']");
    for(let i = 0; i < boost.length; i++)
    {
        let elem = boost[i];
        elem.textContent = boosts[3][i] + "%";
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
