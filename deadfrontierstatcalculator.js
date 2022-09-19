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
let w1 = {spread: false, explosive: false, burst: false, crit: false, sAngle: 0, pellets: 0, pDph: 0, dph: 0, critF: 0, critS: 0, reload: 0, accuracy: 0, pen: 0, dps: 0};
let w2 = {spread: false, explosive: false, burst: false, crit: false, sAngle: 0, pellets: 0, pDph: 0, dph: 0, critF: 0, critS: 0, reload: 0, accuracy: 0, pen: 0, dps: 0};
let w3 = {spread: false, explosive: false, burst: false, crit: false, sAngle: 0, pellets: 0, pDph: 0, dph: 0, critF: 0, critS: 0, reload: 0, accuracy: 0, pen: 0, dps: 0};
let imp1 = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let imp2 = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let imp3 = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let imp4 = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let imp5 = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let imp6 = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let imp7 = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let imp8 = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let imp9 = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let imp10 = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let imp11 = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let imp12 = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let imp13 = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let imp14 = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let imp15 = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let imp16 = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let ub = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let gm = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let clan = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
let impBlock = {imp1: "none", imp2: "none", imp3: "none", imp4: "none", imp5: "none", imp6: "none", imp7: "none", imp8: "none", imp9: "none", imp10: "none", imp11: "none", imp12: "none", imp13: "none", imp14: "none", imp15: "none", imp16: "none"}
let impUBlock = {imp1: false, imp2: false, imp3: false, imp4: false, imp5: false, imp6: false, imp7: false, imp8: false, imp9: false, imp10: false, imp11: false, imp12: false, imp13: false, imp14: false, imp15: false, imp16: false}
let expBoost = 0;
let pvpBoost = 0;
let damageBoost = 0;
let speedBoost = 0;
let idrBoost = 0;
let weaponBoost = 0;
let armorBoost = 0;
let cashBoost = 0;
let ammoBoost = 0;
let sSpeedBoost = 0;
let spotsBoost = 0;
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
                mainSelect[i].appendChild(option);
            });
        });
    };
};

function parseOutImplantArray(data) //Weapons parse function (Credit to Awoo 4: Come Back When You're a Little Mmmm... Awooier!)
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
                mainSelect[i].appendChild(option);
            });
        });
    };
};

makeForeignRequest("classes.json", parseOutClassArray); //Pull JSON & parse
makeForeignRequest("armors.json", parseOutArmorArray);
makeForeignRequest("weapons.json", parseOutWeaponArray);
makeForeignRequest("implants.json", parseOutImplantArray);

function selectUpdate()
{
    for(let i = 0; i < selectColl.length; i++)
    {
        let elem = selectColl[i];
        if(elem.id == "classSelect")
        {
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
        } else if(elem.id == "armorSelect")
        {
            durability = parseInt(elem.options[elem.selectedIndex].dataset.durability);
            absorption = parseFloat(elem.options[elem.selectedIndex].dataset.absorption);
        } else if(elem.id.includes("weaponSelect") == true)
        {
            let spread = (elem.options[elem.selectedIndex].dataset.spread === "true");
            let explosive = (elem.options[elem.selectedIndex].dataset.explosive === "true");
            let burst = (elem.options[elem.selectedIndex].dataset.burst === "true");
            let sAngle = elem.options[elem.selectedIndex].dataset.sAngle;
            let pellets = elem.options[elem.selectedIndex].dataset.pellets;
            let pelletDph = elem.options[elem.selectedIndex].dataset.dph * (1 + (damageBoost / 100));
            let dph = 0;
            if(spread == true)
            {
                dph = (elem.options[elem.selectedIndex].dataset.dph * pellets) * (1 + (damageBoost / 100));
            } else
            {
                dph = elem.options[elem.selectedIndex].dataset.dph * (1 + (damageBoost / 100));
            };
            let shotTime = elem.options[elem.selectedIndex].dataset.shotTime;
            let capacity = elem.options[elem.selectedIndex].dataset.capacity;
            let weaponCrit = elem.options[elem.selectedIndex].dataset.weaponCrit;
            let baseCrit = (5 + Math.round((critTotal - 25) / 2.5)) * weaponCrit;
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
            let reloadFrame = 15 + (((124 - relTotal) * weaponReload) / 100);
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
            w["pDph"] = pelletDph;
            w["dph"] = dph;
            w["critF"] = critFail;
            w["critS"] = critSuccess;
            w["reload"] = reloadTime;
            w["accuracy"] = accuracy;
            w["pen"] = pen;
            w["dps"] = dps;
        } else if(elem.id.includes("implantSelect"))
        {
            let currSlot = elem.id;
            let impName = elem.options[elem.selectedIndex].value;
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
            let impUnique = elem.options[elem.selectedIndex].dataset.unique;
            if(elem.id == "implantSelect1")
            {
                imp1 = {exp: impExp, pvp: impPvp, damage: impDamage, speed: impSpeed, idr: impIdr, weapon: impWeapon, armor: impArmor, cash: impCash, ammo: impAmmo, sSpeed: impSSpeed, spots: impSpots};
                impBlock["imp1"] = impCantUse;
                if(impUnique == true)
                {
                    impUBlock["imp1"] = impName;
                };
            } else if(elem.id == "implantSelect2")
            {
                imp2 = {exp: impExp, pvp: impPvp, damage: impDamage, speed: impSpeed, idr: impIdr, weapon: impWeapon, armor: impArmor, cash: impCash, ammo: impAmmo, sSpeed: impSSpeed, spots: impSpots};
                impBlock["imp2"] = impCantUse;
                if(impUnique == true)
                {
                    impUBlock["imp2"] = impName;
                };
            } else if(elem.id == "implantSelect3")
            {
                imp3 = {exp: impExp, pvp: impPvp, damage: impDamage, speed: impSpeed, idr: impIdr, weapon: impWeapon, armor: impArmor, cash: impCash, ammo: impAmmo, sSpeed: impSSpeed, spots: impSpots};
                impBlock["imp3"] = impCantUse;
                if(impUnique == true)
                {
                    impUBlock["imp3"] = impName;
                };
            } else if(elem.id == "implantSelect4")
            {
                imp4 = {exp: impExp, pvp: impPvp, damage: impDamage, speed: impSpeed, idr: impIdr, weapon: impWeapon, armor: impArmor, cash: impCash, ammo: impAmmo, sSpeed: impSSpeed, spots: impSpots};
                impBlock["imp4"] = impCantUse;
                if(impUnique == true)
                {
                    impUBlock["imp4"] = impName;
                };
            } else if(elem.id == "implantSelect5")
            {
                imp5 = {exp: impExp, pvp: impPvp, damage: impDamage, speed: impSpeed, idr: impIdr, weapon: impWeapon, armor: impArmor, cash: impCash, ammo: impAmmo, sSpeed: impSSpeed, spots: impSpots};
                impBlock["imp5"] = impCantUse;
                if(impUnique == true)
                {
                    impUBlock["imp5"] = impName;
                };
            } else if(elem.id == "implantSelect6")
            {
                imp6 = {exp: impExp, pvp: impPvp, damage: impDamage, speed: impSpeed, idr: impIdr, weapon: impWeapon, armor: impArmor, cash: impCash, ammo: impAmmo, sSpeed: impSSpeed, spots: impSpots};
                impBlock["imp6"] = impCantUse;
                if(impUnique == true)
                {
                    impUBlock["imp6"] = impName;
                };
            } else if(elem.id == "implantSelect7")
            {
                imp7 = {exp: impExp, pvp: impPvp, damage: impDamage, speed: impSpeed, idr: impIdr, weapon: impWeapon, armor: impArmor, cash: impCash, ammo: impAmmo, sSpeed: impSSpeed, spots: impSpots};
                impBlock["imp7"] = impCantUse;
                if(impUnique == true)
                {
                    impUBlock["imp7"] = impName;
                };
            } else if(elem.id == "implantSelect8")
            {
                imp8 = {exp: impExp, pvp: impPvp, damage: impDamage, speed: impSpeed, idr: impIdr, weapon: impWeapon, armor: impArmor, cash: impCash, ammo: impAmmo, sSpeed: impSSpeed, spots: impSpots};
                impBlock["imp8"] = impCantUse;
                if(impUnique == true)
                {
                    impUBlock["imp8"] = impName;
                };
            } else if(elem.id == "implantSelect9")
            {
                imp9 = {exp: impExp, pvp: impPvp, damage: impDamage, speed: impSpeed, idr: impIdr, weapon: impWeapon, armor: impArmor, cash: impCash, ammo: impAmmo, sSpeed: impSSpeed, spots: impSpots};
                impBlock["imp9"] = impCantUse;
                if(impUnique == true)
                {
                    impUBlock["imp9"] = impName;
                };
            } else if(elem.id == "implantSelect10")
            {
                imp10 = {exp: impExp, pvp: impPvp, damage: impDamage, speed: impSpeed, idr: impIdr, weapon: impWeapon, armor: impArmor, cash: impCash, ammo: impAmmo, sSpeed: impSSpeed, spots: impSpots};
                impBlock["imp10"] = impCantUse;
                if(impUnique == true)
                {
                    impUBlock["imp10"] = impName;
                };
            } else if(elem.id == "implantSelect11")
            {
                imp11 = {exp: impExp, pvp: impPvp, damage: impDamage, speed: impSpeed, idr: impIdr, weapon: impWeapon, armor: impArmor, cash: impCash, ammo: impAmmo, sSpeed: impSSpeed, spots: impSpots};
                impBlock["imp11"] = impCantUse;
                if(impUnique == true)
                {
                    impUBlock["imp11"] = impName;
                };
            } else if(elem.id == "implantSelect12")
            {
                imp12 = {exp: impExp, pvp: impPvp, damage: impDamage, speed: impSpeed, idr: impIdr, weapon: impWeapon, armor: impArmor, cash: impCash, ammo: impAmmo, sSpeed: impSSpeed, spots: impSpots};
                impBlock["imp12"] = impCantUse;
                if(impUnique == true)
                {
                    impUBlock["imp12"] = impName;
                };
            } else if(elem.id == "implantSelect13")
            {
                imp13 = {exp: impExp, pvp: impPvp, damage: impDamage, speed: impSpeed, idr: impIdr, weapon: impWeapon, armor: impArmor, cash: impCash, ammo: impAmmo, sSpeed: impSSpeed, spots: impSpots};
                impBlock["imp13"] = impCantUse;
                if(impUnique == true)
                {
                    impUBlock["imp13"] = impName;
                };
            } else if(elem.id == "implantSelect14")
            {
                imp14 = {exp: impExp, pvp: impPvp, damage: impDamage, speed: impSpeed, idr: impIdr, weapon: impWeapon, armor: impArmor, cash: impCash, ammo: impAmmo, sSpeed: impSSpeed, spots: impSpots};
                impBlock["imp14"] = impCantUse;
                if(impUnique == true)
                {
                    impUBlock["imp14"] = impName;
                };
            } else if(elem.id == "implantSelect15")
            {
                imp15 = {exp: impExp, pvp: impPvp, damage: impDamage, speed: impSpeed, idr: impIdr, weapon: impWeapon, armor: impArmor, cash: impCash, ammo: impAmmo, sSpeed: impSSpeed, spots: impSpots};
                impBlock["imp15"] = impCantUse;
                if(impUnique == true)
                {
                    impUBlock["imp15"] = impName;
                };
            } else if(elem.id == "implantSelect16")
            {
                imp16 = {exp: impExp, pvp: impPvp, damage: impDamage, speed: impSpeed, idr: impIdr, weapon: impWeapon, armor: impArmor, cash: impCash, ammo: impAmmo, sSpeed: impSSpeed, spots: impSpots};
                impBlock["imp16"] = impCantUse;
                if(impUnique == true)
                {
                    impUBlock["imp16"] = impName;
                };
            };
            /* //Need to figure this out
            if (impCantUse != "none") {
                document.querySelectorAll("[value=" + CSS.escape(impCantUse) + "]").forEach(element => element.disabled = true);
            };
            if (impUnique != false) {
                document.querySelectorAll("[value=" + CSS.escape(impName) + "]").forEach(element => element.disabled = true);
            };
            */
        };
    };
};

function displayUpdate()
{
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
    const w1PenSelector = document.getElementById('w1PenValue');
    const w2DphSelector = document.getElementById('w2DPHValue');
    const w2PDphSelector = document.getElementById('w2PDPHValue');
    const w2PelletSelector = document.getElementById('w2PelletValue');
    const w2CritDphSelector = document.getElementById('w2CritValue');
    const w2PatternSelector = document.getElementById('w2PatternValue');
    const w2ReloadSelector = document.getElementById('w2ReloadValue');
    const w2DpsSelector = document.getElementById('w2DPSValue');
    const w2AccuracySelector = document.getElementById('w2AccuracyValue');
    const w2SpreadSelector = document.getElementById('w2SpreadValue');
    const w2PenSelector = document.getElementById('w2PenValue');
    const w3DphSelector = document.getElementById('w3DPHValue');
    const w3PDphSelector = document.getElementById('w3PDPHValue');
    const w3PelletSelector = document.getElementById('w3PelletValue');
    const w3CritDphSelector = document.getElementById('w3CritValue');
    const w3PatternSelector = document.getElementById('w3PatternValue');
    const w3ReloadSelector = document.getElementById('w3ReloadValue');
    const w3DpsSelector = document.getElementById('w3DPSValue');
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
    for(let i = 0; i < rangeColl.length; i++)
    {
        let elem = rangeColl[i];
        const content = elem.nextElementSibling;
        var statValue = parseInt(elem.value);
        var boostValue;
        if(elem.id == "str")
        {
            boostValue = statValue + strBoost;
            strTotal = boostValue;
            content.textContent = boostValue + " (" + statValue + " + " + strBoost + ")";
        } else if(elem.id == "end")
        {
            boostValue = statValue + endBoost;
            endTotal = boostValue;
            content.textContent = boostValue + " (" + statValue + " + " + endBoost + ")";
        } else if(elem.id == "agi")
        {
            boostValue = statValue + agiBoost;
            agiTotal = boostValue;
            content.textContent = boostValue + " (" + statValue + " + " + agiBoost + ")";
        } else if(elem.id == "acc")
        {
            boostValue = statValue + accBoost;
            accTotal = boostValue;
            content.textContent = boostValue + " (" + statValue + " + " + accBoost + ")";
        } else if(elem.id == "crit")
        {
            boostValue = statValue + critBoost;
            critTotal = boostValue;
            content.textContent = boostValue + " (" + statValue + " + " + critBoost + ")";
        } else if(elem.id == "rel")
        {
            boostValue = statValue + relBoost;
            relTotal = boostValue;
            content.textContent = boostValue + " (" + statValue + " + " + relBoost + ")";
        } else if(elem.id == "melee")
        {
            boostValue = statValue + meleeBoost;
            content.textContent = boostValue + " (" + statValue + " + " + meleeBoost + ")";
        } else if(elem.id == "pistol")
        {
            boostValue = statValue + pistolBoost;
            content.textContent = boostValue + " (" + statValue + " + " + pistolBoost + ")";
        } else if(elem.id == "rifle")
        {
            boostValue = statValue + rifleBoost;
            content.textContent = boostValue + " (" + statValue + " + " + rifleBoost + ")";
        } else if(elem.id == "shotgun")
        {
            boostValue = statValue + shotgunBoost;
            content.textContent = boostValue + " (" + statValue + " + " + shotgunBoost + ")";
        } else if(elem.id == "mg")
        {
            boostValue = statValue + mgBoost;
            content.textContent = boostValue + " (" + statValue + " + " + mgBoost + ")";
        } else if(elem.id == "explo")
        {
            boostValue = statValue + exploBoost;
            content.textContent = boostValue + " (" + statValue + " + " + exploBoost + ")";
        };
    };
    expBoost = +imp1["exp"] + +imp2["exp"] + +imp3["exp"] + +imp4["exp"] + +imp5["exp"] + +imp6["exp"] + +imp7["exp"] + +imp8["exp"] + +imp9["exp"] + +imp10["exp"] + +imp11["exp"] + +imp12["exp"] + +imp13["exp"] + +imp14["exp"] + +imp15["exp"] + +imp16["exp"] + +ub["exp"] + +gm["exp"] + +clan["exp"];
    expSelector.textContent = expBoost + "%";
    pvpBoost = +imp1["pvp"] + +imp2["pvp"] + +imp3["pvp"] + +imp4["pvp"] + +imp5["pvp"] + +imp6["pvp"] + +imp7["pvp"] + +imp8["pvp"] + +imp9["pvp"] + +imp10["pvp"] + +imp11["pvp"] + +imp12["pvp"] + +imp13["pvp"] + +imp14["pvp"] + +imp15["pvp"] + +imp16["pvp"] + +ub["pvp"] + +gm["pvp"] + +clan["pvp"];
    pvpSelector.textContent = pvpBoost + "%";
    damageBoost = +imp1["damage"] + +imp2["damage"] + +imp3["damage"] + +imp4["damage"] + +imp5["damage"] + +imp6["damage"] + +imp7["damage"] + +imp8["damage"] + +imp9["damage"] + +imp10["damage"] + +imp11["damage"] + +imp12["damage"] + +imp13["damage"] + +imp14["damage"] + +imp15["damage"] + +imp16["damage"] + +ub["damage"] + +gm["damage"] + +clan["damage"];
    damageSelector.textContent = damageBoost + "%";
    speedBoost = +imp1["speed"] + +imp2["speed"] + +imp3["speed"] + +imp4["speed"] + +imp5["speed"] + +imp6["speed"] + +imp7["speed"] + +imp8["speed"] + +imp9["speed"] + +imp10["speed"] + +imp11["speed"] + +imp12["speed"] + +imp13["speed"] + +imp14["speed"] + +imp15["speed"] + +imp16["speed"] + +ub["speed"] + +gm["speed"] + +clan["speed"];
    speedSelector.textContent = speedBoost + "%";
    idrBoost = +imp1["idr"] + +imp2["idr"] + +imp3["idr"] + +imp4["idr"] + +imp5["idr"] + +imp6["idr"] + +imp7["idr"] + +imp8["idr"] + +imp9["idr"] + +imp10["idr"] + +imp11["idr"] + +imp12["idr"] + +imp13["idr"] + +imp14["idr"] + +imp15["idr"] + +imp16["idr"] + +ub["idr"] + +gm["idr"] + +clan["idr"];
    idrSelector.textContent = idrBoost + "%";
    weaponBoost = +imp1["weapon"] + +imp2["weapon"] + +imp3["weapon"] + +imp4["weapon"] + +imp5["weapon"] + +imp6["weapon"] + +imp7["weapon"] + +imp8["weapon"] + +imp9["weapon"] + +imp10["weapon"] + +imp11["weapon"] + +imp12["weapon"] + +imp13["weapon"] + +imp14["weapon"] + +imp15["weapon"] + +imp16["weapon"] + +ub["weapon"] + +gm["weapon"] + +clan["weapon"];
    weaponSelector.textContent = weaponBoost + "%";
    armorBoost = +imp1["armor"] + +imp2["armor"] + +imp3["armor"] + +imp4["armor"] + +imp5["armor"] + +imp6["armor"] + +imp7["armor"] + +imp8["armor"] + +imp9["armor"] + +imp10["armor"] + +imp11["armor"] + +imp12["armor"] + +imp13["armor"] + +imp14["armor"] + +imp15["armor"] + +imp16["armor"] + +ub["armor"] + +gm["armor"] + +clan["armor"];
    armorSelector.textContent = armorBoost + "%";
    cashBoost = +imp1["cash"] + +imp2["cash"] + +imp3["cash"] + +imp4["cash"] + +imp5["cash"] + +imp6["cash"] + +imp7["cash"] + +imp8["cash"] + +imp9["cash"] + +imp10["cash"] + +imp11["cash"] + +imp12["cash"] + +imp13["cash"] + +imp14["cash"] + +imp15["cash"] + +imp16["cash"] + +ub["cash"] + +gm["cash"] + +clan["cash"];
    cashSelector.textContent = cashBoost + "%";
    ammoBoost = +imp1["ammo"] + +imp2["ammo"] + +imp3["ammo"] + +imp4["ammo"] + +imp5["ammo"] + +imp6["ammo"] + +imp7["ammo"] + +imp8["ammo"] + +imp9["ammo"] + +imp10["ammo"] + +imp11["ammo"] + +imp12["ammo"] + +imp13["ammo"] + +imp14["ammo"] + +imp15["ammo"] + +imp16["ammo"] + +ub["ammo"] + +gm["ammo"] + +clan["ammo"];
    ammoSelector.textContent = ammoBoost + "%";
    sSpeedBoost = +imp1["sSpeed"] + +imp2["sSpeed"] + +imp3["sSpeed"] + +imp4["sSpeed"] + +imp5["sSpeed"] + +imp6["sSpeed"] + +imp7["sSpeed"] + +imp8["sSpeed"] + +imp9["sSpeed"] + +imp10["sSpeed"] + +imp11["sSpeed"] + +imp12["sSpeed"] + +imp13["sSpeed"] + +imp14["sSpeed"] + +imp15["sSpeed"] + +imp16["sSpeed"] + +ub["sSpeed"] + +gm["sSpeed"] + +clan["sSpeed"];
    sSpeedSelector.textContent = sSpeedBoost + "%";
    spotsBoost = +imp1["spots"] + +imp2["spots"] + +imp3["spots"] + +imp4["spots"] + +imp5["spots"] + +imp6["spots"] + +imp7["spots"] + +imp8["spots"] + +imp9["spots"] + +imp10["spots"] + +imp11["spots"] + +imp12["spots"] + +imp13["spots"] + +imp14["spots"] + +imp15["spots"] + +imp16["spots"] + +ub["spots"] + +gm["spots"] + +clan["spots"];
    spotsSelector.textContent = spotsBoost + "%";
    healthSelector.textContent = endBase * 2;
    walkSelector.textContent = (((2.2 * 1.2) * ((agiTotal * 0.0043) + 1.1)) * (1 + (speedBoost / 100))).toFixed(4);
    sprintSelector.textContent = (((3.5 * 1.2) * ((agiTotal * 0.0043) + 1.1)) * (1 + (speedBoost / 100))).toFixed(4);
    durationSelector.textContent = ((endTotal - 25) / 6.1875 + 24).toFixed(0) + " s";
    regenSelector.textContent = ((endTotal - 25) / 6.1875 + 24).toFixed(0) + " s";
    //duraSelector.textContent = (durability + (durability * absorption))+" ("+durability+" + "+durability+" * "+absorption+")"; //Need to figure this out
    if(document.getElementById("armorSelect").value != "Please Select an Option")
    {
        duraSelector.textContent = durability;
        absorbSelector.textContent = (absorption * 100) + "%";
    };
    if(document.getElementById("weaponSelect1").value != "Please Select an Option")
    {
        w1DphSelector.textContent = w1["dph"];
        w1PDphSelector.textContent = w1["pDph"];
        w1PelletSelector.textContent = w1["pellets"];
        w1CritDphSelector.textContent = (w1["dph"] * 5).toFixed(2);
        if(w1["critS"] < 1)
        {
            w1PatternSelector.textContent = w1["critF"] + " NC";
        } else
        {
            w1PatternSelector.textContent = w1["critF"] + " NC > " + w1["critS"] + " C";
        };
        w1ReloadSelector.textContent = w1["reload"].toFixed(2) + " s";
        w1DpsSelector.textContent = w1["dps"].toFixed(2);
        if(w1["accuracy"] == "melee")
        {
            w1AccuracySelector.textContent = "Skill Issue";
        } else if(w1["accuracy"] == "1")
        {
            if(accTotal < 124)
            {
                w1AccuracySelector.style.backgroundColor = "lightcoral";
                w1AccuracySelector.textContent = "Inaccurate";
            } else if(accTotal >= 124)
            {
                w1AccuracySelector.style.backgroundColor = "khaki";
                w1AccuracySelector.textContent = "Reliable Onscreen";
            };
        } else if(w1["accuracy"] == "2")
        {
            if(accTotal < 100)
            {
                w1AccuracySelector.style.backgroundColor = "lightcoral";
                w1AccuracySelector.textContent = "Inaccurate";
            } else if(accTotal < 124)
            {
                w1AccuracySelector.style.backgroundColor = "khaki";
                w1AccuracySelector.textContent = "Reliable Onscreen";
            } else if(accTotal >= 124)
            {
                w1AccuracySelector.style.backgroundColor = "lightgreen";
                w1AccuracySelector.textContent = "Reliable Offscreen";
            };
        } else if(w1["accuracy"] == "3")
        {
            if(accTotal < 80)
            {
                w1AccuracySelector.style.backgroundColor = "lightcoral";
                w1AccuracySelector.textContent = "Inaccurate";
            } else if(accTotal < 100)
            {
                w1AccuracySelector.style.backgroundColor = "coral";
                w1AccuracySelector.textContent = "Reliable Onscreen";
            } else if(accTotal < 119)
            {
                w1AccuracySelector.style.backgroundColor = "khaki";
                w1AccuracySelector.textContent = "Reliable Offscreen";
            } else if(accTotal >= 119)
            {
                w1AccuracySelector.style.backgroundColor = "lightgreen";
                w1AccuracySelector.textContent = "Pinpoint";
            };
        } else if(w1["accuracy"] == "4")
        {
            if(accTotal < 60)
            {
                w1AccuracySelector.style.backgroundColor = "lightcoral";
                w1AccuracySelector.textContent = "Inaccurate";
            } else if(accTotal < 70)
            {
                w1AccuracySelector.style.backgroundColor = "coral";
                w1AccuracySelector.textContent = "Reliable Onscreen";
            } else if(accTotal < 79)
            {
                w1AccuracySelector.style.backgroundColor = "khaki";
                w1AccuracySelector.textContent = "Reliable Offscreen";
            } else if(accTotal >= 79)
            {
                w1AccuracySelector.style.backgroundColor = "lightgreen";
                w1AccuracySelector.textContent = "Pinpoint";
            };
        } else if(w1["accuracy"] == "5")
        {
            if(accTotal < 35)
            {
                w1AccuracySelector.style.backgroundColor = "lightcoral";
                w1AccuracySelector.textContent = "Inaccurate";
            } else if(accTotal < 40)
            {
                w1AccuracySelector.style.backgroundColor = "coral";
                w1AccuracySelector.textContent = "Reliable Onscreen";
            } else if(accTotal < 44)
            {
                w1AccuracySelector.style.backgroundColor = "khaki";
                w1AccuracySelector.textContent = "Reliable Offscreen";
            } else if(accTotal >= 44)
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
        } else
        {
            w1PDphSelector.textContent = "No Pellets";
            w1PelletSelector.textContent = "No Pellets";
            w1SpreadSelector.textContent = "No Pellets";
            if(w1["burst"] == true)
            {
                w1DphSelector.textContent = (w1["dph"] * 0.12).toFixed(2) + " + " + (w1["dph"] * 0.28).toFixed(2) + " + " + (w1["dph"] * 0.60).toFixed(2);
                w1CritDphSelector.textContent = ((w1["dph"] * 0.12) * 5).toFixed(2) + " + " + ((w1["dph"] * 0.28) * 5).toFixed(2) + " + " + ((w1["dph"] * 0.60) * 5).toFixed(2);
            } else if(w1["accuracy"] == "melee")
            {
                w1ReloadSelector.textContent = "Doesn't Reload";
            };
        };
        w1PenSelector.textContent = w1["pen"] + "%";
    };
    if(document.getElementById("weaponSelect2").value != "Please Select an Option")
    {
        w2DphSelector.textContent = w2["dph"];
        w2PDphSelector.textContent = w2["pDph"];
        w2PelletSelector.textContent = w2["pellets"];
        w2CritDphSelector.textContent = (w2["dph"] * 5).toFixed(2);
        if(w2["critS"] < 1)
        {
            w2PatternSelector.textContent = w2["critF"] + " NC";
        } else
        {
            w2PatternSelector.textContent = w2["critF"] + " NC > " + w2["critS"] + " C";
        };
        w2ReloadSelector.textContent = w2["reload"].toFixed(2) + " s";
        w2DpsSelector.textContent = w2["dps"].toFixed(2);
        if(w2["accuracy"] == "melee")
        {
            w2AccuracySelector.textContent = "Skill Issue";
        } else if(w2["accuracy"] == "1")
        {
            if(accTotal < 124)
            {
                w2AccuracySelector.style.backgroundColor = "lightcoral";
                w2AccuracySelector.textContent = "Inaccurate";
            } else if(accTotal >= 124)
            {
                w2AccuracySelector.style.backgroundColor = "khaki";
                w2AccuracySelector.textContent = "Reliable Onscreen";
            };
        } else if(w2["accuracy"] == "2")
        {
            if(accTotal < 100)
            {
                w2AccuracySelector.style.backgroundColor = "lightcoral";
                w2AccuracySelector.textContent = "Inaccurate";
            } else if(accTotal < 124)
            {
                w2AccuracySelector.style.backgroundColor = "khaki";
                w2AccuracySelector.textContent = "Reliable Onscreen";
            } else if(accTotal >= 124)
            {
                w2AccuracySelector.style.backgroundColor = "lightgreen";
                w2AccuracySelector.textContent = "Reliable Offscreen";
            };
        } else if(w2["accuracy"] == "3")
        {
            if(accTotal < 80)
            {
                w2AccuracySelector.style.backgroundColor = "lightcoral";
                w2AccuracySelector.textContent = "Inaccurate";
            } else if(accTotal < 100)
            {
                w2AccuracySelector.style.backgroundColor = "coral";
                w2AccuracySelector.textContent = "Reliable Onscreen";
            } else if(accTotal < 119)
            {
                w2AccuracySelector.style.backgroundColor = "khaki";
                w2AccuracySelector.textContent = "Reliable Offscreen";
            } else if(accTotal >= 119)
            {
                w2AccuracySelector.style.backgroundColor = "lightgreen";
                w2AccuracySelector.textContent = "Pinpoint";
            };
        } else if(w2["accuracy"] == "4")
        {
            if(accTotal < 60)
            {
                w2AccuracySelector.style.backgroundColor = "lightcoral";
                w2AccuracySelector.textContent = "Inaccurate";
            } else if(accTotal < 70)
            {
                w2AccuracySelector.style.backgroundColor = "coral";
                w2AccuracySelector.textContent = "Reliable Onscreen";
            } else if(accTotal < 79)
            {
                w2AccuracySelector.style.backgroundColor = "khaki";
                w2AccuracySelector.textContent = "Reliable Offscreen";
            } else if(accTotal >= 79)
            {
                w2AccuracySelector.style.backgroundColor = "lightgreen";
                w2AccuracySelector.textContent = "Pinpoint";
            };
        } else if(w2["accuracy"] == "5")
        {
            if(accTotal < 35)
            {
                w2AccuracySelector.style.backgroundColor = "lightcoral";
                w2AccuracySelector.textContent = "Inaccurate";
            } else if(accTotal < 40)
            {
                w2AccuracySelector.style.backgroundColor = "coral";
                w2AccuracySelector.textContent = "Reliable Onscreen";
            } else if(accTotal < 44)
            {
                w2AccuracySelector.style.backgroundColor = "khaki";
                w2AccuracySelector.textContent = "Reliable Offscreen";
            } else if(accTotal >= 44)
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
        } else
        {
            w2PDphSelector.textContent = "No Pellets";
            w2PelletSelector.textContent = "No Pellets";
            w2SpreadSelector.textContent = "No Pellets";
            if(w2["burst"] == true)
            {
                w2DphSelector.textContent = (w2["dph"] * 0.12).toFixed(2) + " + " + (w2["dph"] * 0.28).toFixed(2) + " + " + (w2["dph"] * 0.60).toFixed(2);
                w2CritDphSelector.textContent = ((w2["dph"] * 0.12) * 5).toFixed(2) + " + " + ((w2["dph"] * 0.28) * 5).toFixed(2) + " + " + ((w2["dph"] * 0.60) * 5).toFixed(2);
            } else if(w2["accuracy"] == "melee")
            {
                w2ReloadSelector.textContent = "Doesn't Reload";
            };
        };
        w2PenSelector.textContent = w2["pen"] + "%";
    };
    if(document.getElementById("weaponSelect3").value != "Please Select an Option")
    {
        w3DphSelector.textContent = w3["dph"];
        w3PDphSelector.textContent = w3["pDph"];
        w3PelletSelector.textContent = w3["pellets"];
        w3CritDphSelector.textContent = (w3["dph"] * 5).toFixed(2);
        if(w3["critS"] < 1)
        {
            w3PatternSelector.textContent = w3["critF"] + " NC";
        } else
        {
            w3PatternSelector.textContent = w3["critF"] + " NC > " + w3["critS"] + " C";
        };
        w3ReloadSelector.textContent = w3["reload"].toFixed(2) + " s";
        w3DpsSelector.textContent = w3["dps"].toFixed(2);
        if(w3["accuracy"] == "melee")
        {
            w3AccuracySelector.textContent = "Skill Issue";
        } else if(w3["accuracy"] == "1")
        {
            if(accTotal < 124)
            {
                w3AccuracySelector.style.backgroundColor = "lightcoral";
                w3AccuracySelector.textContent = "Inaccurate";
            } else if(accTotal >= 124)
            {
                w3AccuracySelector.style.backgroundColor = "khaki";
                w3AccuracySelector.textContent = "Reliable Onscreen";
            };
        } else if(w3["accuracy"] == "2")
        {
            if(accTotal < 100)
            {
                w3AccuracySelector.style.backgroundColor = "lightcoral";
                w3AccuracySelector.textContent = "Inaccurate";
            } else if(accTotal < 124)
            {
                w3AccuracySelector.style.backgroundColor = "khaki";
                w3AccuracySelector.textContent = "Reliable Onscreen";
            } else if(accTotal >= 124)
            {
                w3AccuracySelector.style.backgroundColor = "lightgreen";
                w3AccuracySelector.textContent = "Reliable Offscreen";
            };
        } else if(w3["accuracy"] == "3")
        {
            if(accTotal < 80)
            {
                w3AccuracySelector.style.backgroundColor = "lightcoral";
                w3AccuracySelector.textContent = "Inaccurate";
            } else if(accTotal < 100)
            {
                w3AccuracySelector.style.backgroundColor = "coral";
                w3AccuracySelector.textContent = "Reliable Onscreen";
            } else if(accTotal < 119)
            {
                w3AccuracySelector.style.backgroundColor = "khaki";
                w3AccuracySelector.textContent = "Reliable Offscreen";
            } else if(accTotal >= 119)
            {
                w3AccuracySelector.style.backgroundColor = "lightgreen";
                w3AccuracySelector.textContent = "Pinpoint";
            };
        } else if(w3["accuracy"] == "4")
        {
            if(accTotal < 60)
            {
                w3AccuracySelector.style.backgroundColor = "lightcoral";
                w3AccuracySelector.textContent = "Inaccurate";
            } else if(accTotal < 70)
            {
                w3AccuracySelector.style.backgroundColor = "coral";
                w3AccuracySelector.textContent = "Reliable Onscreen";
            } else if(accTotal < 79)
            {
                w3AccuracySelector.style.backgroundColor = "khaki";
                w3AccuracySelector.textContent = "Reliable Offscreen";
            } else if(accTotal >= 79)
            {
                w3AccuracySelector.style.backgroundColor = "lightgreen";
                w3AccuracySelector.textContent = "Pinpoint";
            };
        } else if(w3["accuracy"] == "5")
        {
            if(accTotal < 35)
            {
                w3AccuracySelector.style.backgroundColor = "lightcoral";
                w3AccuracySelector.textContent = "Inaccurate";
            } else if(accTotal < 40)
            {
                w3AccuracySelector.style.backgroundColor = "coral";
                w3AccuracySelector.textContent = "Reliable Onscreen";
            } else if(accTotal < 44)
            {
                w3AccuracySelector.style.backgroundColor = "khaki";
                w3AccuracySelector.textContent = "Reliable Offscreen";
            } else if(accTotal >= 44)
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
        } else
        {
            w3PDphSelector.textContent = "No Pellets";
            w3PelletSelector.textContent = "No Pellets";
            w3SpreadSelector.textContent = "No Pellets";
            if(w3["burst"] == true)
            {
                w3DphSelector.textContent = (w3["dph"] * 0.12).toFixed(2) + " + " + (w3["dph"] * 0.28).toFixed(2) + " + " + (w3["dph"] * 0.60).toFixed(2);
                w3CritDphSelector.textContent = ((w3["dph"] * 0.12) * 5).toFixed(2) + " + " + ((w3["dph"] * 0.28) * 5).toFixed(2) + " + " + ((w3["dph"] * 0.60) * 5).toFixed(2);
            } else if(w3["accuracy"] == "melee")
            {
                w3ReloadSelector.textContent = "Doesn't Reload";
            };
        };
        w3PenSelector.textContent = w3["pen"] + "%";
    };
};

function statEntry()
{
    const content = this.nextElementSibling;
    var statValue = parseInt(this.value);
    var boostValue;
    let maxAdjust;
    if(this.id == "str")
    {
        if(strBoost > 0)
        {
            maxAdjust = 100 - strBoost;
            this.setAttribute("max", maxAdjust);
        } else
        {
            this.setAttribute("max", 100);
        };
        strBase = statValue;
        boostValue = statValue + strBoost;
        strTotal = boostValue;
        content.textContent = boostValue + " (" + statValue + " + " + strBoost + ")";
    } else if(this.id == "end")
    {
        if(endBoost > 24)
        {
            maxAdjust = 100 - (endBoost - 24);
            this.setAttribute("max", maxAdjust);
        } else
        {
            this.setAttribute("max", 100);
        };
        endBase = statValue;
        boostValue = statValue + endBoost;
        endTotal = boostValue;
        content.textContent = boostValue + " (" + statValue + " + " + endBoost + ")";
    } else if(this.id == "agi")
    {
        if(agiBoost > 24)
        {
            maxAdjust = 100 - (agiBoost - 24);
            this.setAttribute("max", maxAdjust);
        } else
        {
            this.setAttribute("max", 100);
        };
        agiBase = statValue;
        boostValue = statValue + agiBoost;
        agiTotal = boostValue;
        content.textContent = boostValue + " (" + statValue + " + " + agiBoost + ")";
    } else if(this.id == "acc")
    {
        if(accBoost > 24)
        {
            maxAdjust = 100 - (accBoost - 24);
            this.setAttribute("max", maxAdjust);
        } else
        {
            this.setAttribute("max", 100);
        };
        accBase = statValue;
        boostValue = statValue + agiBoost;
        accTotal = boostValue;
        content.textContent = boostValue + " (" + statValue + " + " + accBoost + ")";
    } else if(this.id == "crit")
    {
        if(critBoost > 24)
        {
            maxAdjust = 100 - (critBoost - 24);
            this.setAttribute("max", maxAdjust);
        } else
        {
            this.setAttribute("max", 100);
        };
        critBase = statValue;
        boostValue = statValue + critBoost;
        critTotal = boostValue;
        content.textContent = boostValue + " (" + statValue + " + " + critBoost + ")";
    } else if(this.id == "rel")
    {
        if(relBoost > 24)
        {
            maxAdjust = 100 - (relBoost - 24);
            this.setAttribute("max", maxAdjust);
        } else
        {
            this.setAttribute("max", 100);
        };
        relBase = statValue;
        boostValue = statValue + relBoost;
        relTotal = boostValue;
        content.textContent = boostValue + " (" + statValue + " + " + relBoost + ")";
    } else if(this.id == "melee")
    {
        if(meleeBoost > 0)
        {
            maxAdjust = 120 - meleeBoost;
            this.setAttribute("max", maxAdjust);
        } else
        {
            this.setAttribute("max", 120);
        };
        meleeBase = statValue;
        boostValue = statValue + meleeBoost;
        content.textContent = boostValue + " (" + statValue + " + " + meleeBoost + ")";
    } else if(this.id == "pistol")
    {
        if(pistolBoost > 0)
        {
            maxAdjust = 120 - pistolBoost;
            this.setAttribute("max", maxAdjust);
        } else
        {
            this.setAttribute("max", 120);
        };
        pistolBase = statValue;
        boostValue = statValue + pistolBoost;
        content.textContent = boostValue + " (" + statValue + " + " + pistolBoost + ")";
    } else if(this.id == "rifle")
    {
        if(rifleBoost > 0)
        {
            maxAdjust = 120 - rifleBoost;
            this.setAttribute("max", maxAdjust);
        } else
        {
            this.setAttribute("max", 120);
        };
        rifleBase = statValue;
        boostValue = statValue + rifleBoost;
        content.textContent = boostValue + " (" + statValue + " + " + rifleBoost + ")";
    } else if(this.id == "shotgun")
    {
        if(shotgunBoost > 0)
        {
            maxAdjust = 120 - shotgunBoost;
            this.setAttribute("max", maxAdjust);
        } else
        {
            this.setAttribute("max", 120);
        };
        shotgunBase = statValue;
        boostValue = statValue + shotgunBoost;
        content.textContent = boostValue + " (" + statValue + " + " + shotgunBoost + ")";
    } else if(this.id == "mg")
    {
        if(mgBoost > 0)
        {
            maxAdjust = 120 - mgBoost;
            this.setAttribute("max", maxAdjust);
        } else
        {
            this.setAttribute("max", 120);
        };
        mgBase = statValue;
        boostValue = statValue + mgBoost;
        content.textContent = boostValue + " (" + statValue + " + " + mgBoost + ")";
    } else if(this.id == "explo")
    {
        if(exploBoost > 0)
        {
            maxAdjust = 120 - exploBoost;
            this.setAttribute("max", maxAdjust);
        } else
        {
            this.setAttribute("max", 120);
        };
        exploBase = statValue;
        boostValue = statValue + exploBoost;
        content.textContent = boostValue + " (" + statValue + " + " + exploBoost + ")";
    };
    statTotal = strBase + endBase + agiBase + accBase + critBase + relBase;
    pointsReq = statTotal - 150;
    if(50 >= level > 0)
    {
        pointsTotal = (level - 1) * 5;
    } else if(level <= 220 && level > 0)
    {
        pointsTotal = (level - 50) + 245;
    } else if(level > 220)
    {
        pointsTotal = 415;
    } else
    {
        pointsTotal = 0;
    };
    profTotal = meleeBase + pistolBase + rifleBase + shotgunBase + mgBase + exploBase;
    pointsPReq = profTotal - 10;
    if(50 >= level > 0)
    {
        pointsPTotal = (level - 1) * 5;
    } else if(level <= 220 && level > 0)
    {
        pointsPTotal = ((level - 50) * 2) + 245;
    } else if(level <= 325)
    {
        pointsPTotal = (level - 220) + 585;
    } else
    {
        pointsPTotal = 0;
    };
    pointsTotal = pointsTotal - pointsReq;
    pointsReqSel.textContent = pointsTotal;
    pointsPTotal = pointsPTotal - pointsPReq;
    pointsPReqSel.textContent = pointsPTotal;
    if(pointsReq == pointsPReq || pointsReq > pointsPReq)
    {
        if(pointsReq > 415 || pointsPReq > 690)
        {
            levelReqSel.textContent = "Impossible";
        } else if(245 >= pointsReq > 0)
        {
            levelReq = Math.ceil((pointsReq / 5) + 1);
            levelReqSel.textContent = levelReq;
        } else if(pointsReq <= 415 && pointsReq > 0)
        {
            levelReq = (pointsReq - 245) + 50;
            levelReqSel.textContent = levelReq;
        } else
        {
            levelReq = 1;
            levelReqSel.textContent = levelReq;
        };
    } else if(pointsPReq > pointsReq)
    {
        if(pointsPReq > 690 || pointsReq > 415)
        {
            levelReqSel.textContent = "Impossible";
        } else if(245 >= pointsPReq > 0)
        {
            levelReq = Math.ceil((pointsPReq / 5) + 1);
            levelReqSel.textContent = levelReq;
        } else if(585 >= pointsPReq > 0)
        {
            levelReq = Math.ceil(((pointsPReq - 245) / 2) + 50);
            levelReqSel.textContent = levelReq;
        } else if(690 >= pointsPReq > 0)
        {
            levelReq = (pointsPReq - 585) + 220;
            levelReqSel.textContent = levelReq;
        } else
        {
            levelReq = 1;
            levelReqSel.textContent = levelReq;
        };
    };
};

function boostEntry()
{
    var inputValue = parseInt(this.value);
    if(this.id == "level")
    {
        if(inputValue < 1)
        {
            this.value = 1;
            level = 1;
        } else if(inputValue > 325)
        {
            this.value = 325;
            level = 325;
        } else
        {
            level = inputValue;
        };
        if(50 >= level > 0)
        {
            pointsTotal = ((level - 1) * 5) - pointsReq;
            pointsPTotal = ((level - 1) * 5) - pointsPReq;
        } else if(220 >= level > 0)
        {
            pointsTotal = ((level - 50) + 245) - pointsReq;
            pointsPTotal = (((level - 50) * 2) + 245) - pointsPReq;
        } else if(level <= 325)
        {
            pointsTotal = 415 - pointsReq;
            pointsPTotal = ((level - 220) + 585) - pointsPReq;
        } else
        {
            pointsTotal = 0 - pointsReq;
            pointsPTotal = 0 - pointsReq;
        };
        pointsReqSel.textContent = pointsTotal;
        pointsPReqSel.textContent = pointsPTotal;
    } else if(this.id == "armAgi")
    {
        if(inputValue > 24)
        {
            this.value = 24;
            armAgi = 24;
        } else if(inputValue < 0)
        {
            this.value = 0;
            armAgi = 0;
        } else
        {
            armAgi = inputValue;
        };
    } else if(this.id == "armEnd")
    {
        if(inputValue > 24)
        {
            this.value = 24;
            armEnd = 24;
        } else if(inputValue < 0)
        {
            this.value = 0;
            armEnd = 0;
        } else
        {
            armEnd = inputValue;
        };
    } else if(this.id == "w1Acc")
    {
        if(inputValue > 8)
        {
            this.value = 8;
            w1AccBoost = 8;
        } else if(inputValue < 0)
        {
            this.value = 0;
            w1AccBoost = 0;
        } else
        {
            w1AccBoost = inputValue;
        };
    } else if(this.id == "w1Rel")
    {
        if(inputValue > 8)
        {
            this.value = 8;
            w1RelBoost = 8;
        } else if(inputValue < 0)
        {
            this.value = 0;
            w1RelBoost = 0;
        } else
        {
            w1RelBoost = inputValue;
        };
    } else if(this.id == "w1Crit")
    {
        if(inputValue > 8)
        {
            this.value = 8;
            w1CritBoost = 8;
        } else if(inputValue < 0)
        {
            this.value = 0;
            w1CritBoost = 0;
        } else
        {
            w1CritBoost = inputValue;
        };
    } else if(this.id == "w2Acc")
    {
        if(inputValue > 8)
        {
            this.value = 8;
            w2AccBoost = 8;
        } else if(inputValue < 0)
        {
            this.value = 0;
            w2AccBoost = 0;
        } else
        {
            w2AccBoost = inputValue;
        };
    } else if(this.id == "w2Rel")
    {
        if(inputValue > 8)
        {
            this.value = 8;
            w2RelBoost = 8;
        } else if(inputValue < 0)
        {
            this.value = 0;
            w2RelBoost = 0;
        } else
        {
            w2RelBoost = inputValue;
        };
    } else if(this.id == "w2Crit")
    {
        if(inputValue > 8)
        {
            this.value = 8;
            w2CritBoost = 8;
        } else if(inputValue < 0)
        {
            this.value = 0;
            w2CritBoost = 0;
        } else
        {
            w2CritBoost = inputValue;
        };
    } else if(this.id == "w3Acc")
    {
        if(inputValue > 8)
        {
            this.value = 8;
            w3AccBoost = 8;
        } else if(inputValue < 0)
        {
            this.value = 0;
            w3AccBoost = 0;
        } else
        {
            w3AccBoost = inputValue;
        };
    } else if(this.id == "w3Rel")
    {
        if(inputValue > 8)
        {
            this.value = 8;
            w3RelBoost = 8;
        } else if(inputValue < 0)
        {
            this.value = 0;
            w3RelBoost = 0;
        } else
        {
            w3RelBoost = inputValue;
        };
    } else if(this.id == "w3Crit")
    {
        if(inputValue > 8)
        {
            this.value = 8;
            w3CritBoost = 8;
        } else if(inputValue < 0)
        {
            this.value = 0;
            w3CritBoost = 0;
        } else
        {
            w3CritBoost = inputValue;
        };
    } else if(this.id == "clanEXP")
    {
        if(inputValue > 10)
        {
            this.value = 10;
            clan["exp"] = 10
        } else if(inputValue < 0)
        {
            this.value = 0;
            clan["exp"] = 0;
        } else
        {
            clan["exp"] = inputValue;
        };
    } else if(this.id == "clanPVP")
    {
        if(inputValue > 10)
        {
            this.value = 10;
            clan["pvp"] = 10
        } else if(inputValue < 0)
        {
            this.value = 0;
            clan["pvp"] = 0;
        } else
        {
            clan["pvp"] = inputValue;
        };
    } else if(this.id == "clanDamage")
    {
        if(inputValue > 10)
        {
            this.value = 10;
            clan["damage"] = 10
        } else if(inputValue < 0)
        {
            this.value = 0;
            clan["damage"] = 0;
        } else
        {
            clan["damage"] = inputValue;
        };
    } else if(this.id == "clanIDR")
    {
        if(inputValue > 10)
        {
            this.value = 10;
            clan["idr"] = 10
        } else if(inputValue < 0)
        {
            this.value = 0;
            clan["idr"] = 0;
        } else
        {
            clan["idr"] = inputValue;
        };
    } else if(this.id == "clanWeapon")
    {
        if(inputValue > 30)
        {
            this.value = 30;
            clan["weapon"] = 30
        } else if(inputValue < 0)
        {
            this.value = 0;
            clan["weapon"] = 0;
        } else
        {
            clan["weapon"] = inputValue;
        };
    } else if(this.id == "clanArmor")
    {
        if(inputValue > 30)
        {
            this.value = 30;
            clan["armor"] = 30
        } else if(inputValue < 0)
        {
            this.value = 0;
            clan["armor"] = 0;
        } else
        {
            clan["armor"] = inputValue;
        };
    } else if(this.id == "clanCash")
    {
        if(inputValue > 50)
        {
            this.value = 50;
            clan["cash"] = 50
        } else if(inputValue < 0)
        {
            this.value = 0;
            clan["cash"] = 0;
        } else
        {
            clan["cash"] = inputValue;
        };
    } else if(this.id == "clanAmmo")
    {
        if(inputValue > 50)
        {
            this.value = 50;
            clan["ammo"] = 50
        } else if(inputValue < 0)
        {
            this.value = 0;
            clan["ammo"] = 0;
        } else
        {
            clan["ammo"] = inputValue;
        };
    } else if(this.id == "clanSSpeed")
    {
        if(inputValue > 15)
        {
            this.value = 15;
            clan["sSpeed"] = 15
        } else if(inputValue < 0)
        {
            this.value = 0;
            clan["sSpeed"] = 0;
        } else
        {
            clan["sSpeed"] = inputValue;
        };
    } else if(this.id == "clanSpots")
    {
        if(inputValue > 10)
        {
            this.value = 10;
            clan["spots"] = 10
        } else if(inputValue < 0)
        {
            this.value = 0;
            clan["spots"] = 0;
        } else
        {
            clan["spots"] = inputValue;
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
for(let i = 0; i < rangeColl.length; i++)
{
    rangeColl[i].addEventListener("input", function()
    {
        statEntry.call(this);
        selectUpdate();
        displayUpdate();
    });
};

for(let i = 0; i < numColl.length; i++)
{
    numColl[i].addEventListener("input", function()
    {
        boostEntry.call(this);
        selectUpdate();
        displayUpdate();
    });
};

for(let i = 0; i < selectColl.length; i++)
{
    selectColl[i].addEventListener("change", function()
    {
        selectUpdate();
        displayUpdate();
    });
};

for(let i = 0; i < checkColl.length; i++)
{
    checkColl[i].addEventListener("change", function()
    {
        if(this.id == "gmCheck")
        {
            if(this.checked)
            {
                gm = {exp: 100, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 100, armor: 100, cash: 100, ammo: 100, sSpeed: 0, spots: 60};
            } else
            {
                gm = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
            };
        } else if(this.id == "ubCheck")
        {
            if(this.checked)
            {
                ub = {exp: 50, pvp: 0, damage: 35, speed: 35, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
            } else
            {
                ub = {exp: 0, pvp: 0, damage: 0, speed: 0, idr: 0, weapon: 0, armor: 0, cash: 0, ammo: 0, sSpeed: 0, spots: 0};
            };
        };
        displayUpdate();
    });
};
//#endregion
