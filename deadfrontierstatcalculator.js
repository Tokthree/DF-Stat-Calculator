//Web Version 4
//#region Constants
const rangeColl = document.querySelectorAll('input[type=range]');
const numColl = document.querySelectorAll('input[type=number]');
const checkColl = document.querySelectorAll('input[type=checkbox]');
const selectColl = document.querySelectorAll('select');
const pointsReqSel = document.getElementById('freePoints');
const pointsPReqSel = document.getElementById('freePPoints');
const levelReqSel = document.getElementById('reqLevel');
//#endregion
//#region Global Variables
let sessionValues =
[
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],     //Numbers
    [25, 25, 25, 25, 25, 25, 5, 5, 0, 0, 0, 0],                             //Ranges
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],     //Selects
    [false, false]                                                          //Checkboxes
];
let classDescArr = [];
let buildDescArr = [];
//Array maybe?
let charInfo = {level: 1, levelReq: 1, statTotal: 150, pointsTotal: 0, pointsReq: 0, profTotal: 10, pointsPTotal: 0, pointsPReq: 0};
let stat =
[ //base, boost, class, total
    [25, 0, 0, 25], //str
    [25, 0, 0, 25], //end
    [25, 0, 0, 25], //agi
    [25, 0, 0, 25], //acc
    [25, 0, 0, 25], //crit
    [25, 0, 0, 25]  //rel
];
let prof =
[ //base, boost
    [5, 0], //melee
    [5, 0], //pistol
    [0, 0], //rifle
    [0, 0], //shotgun
    [0, 0], //mg
    [0, 0]  //explo
];
let aBonus =
[ //agi, end
    0, 0
];
let wBonus =
[ //acc, rel, crit
    [0, 0, 0], //w1
    [0, 0, 0], //w2
    [0, 0, 0]   //w3
];
let armor =
[ //durability, absorption, str req
    0, 0, 0
];
let weapon = [];
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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  //... imp16
];
let impBlock =
[ //imp1 ... imp16
    ["none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none"], //Exclusive implants
    ["none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none", "none"]  //Unique implants
];
let boosts =
[ //exp, pvp, damage, speed, idr, weapon, armor, cash, ammo, sSpeed, spots
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //ub
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //gm
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //clan
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  //total
];
//#endregion
//#region Startup
function makeForeignRequest(url) //HTTP request function (credit to awoo, tyvm fren)
{
    let xhr = new XMLHttpRequest();
    xhr.onload = function()
    {
        let jsonData = JSON.parse(xhr.responseText); //The entire, raw JSON
        sortJson(jsonData);
    };
    xhr.open('GET', url, true);
    xhr.send();
};
makeForeignRequest("https://test2.dfprofiler.com/files/allstats_reb.php"); //HTTP for actual use
//makeForeignRequest("dfdamagecalculator.json"); //Local for HTTP-agnostic testing
function makeLocalRequest(url, callback) //JSON pull function (Credit to Awoo 2: Credit Harder)
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
};
async function sortJson(rawData)
{
    function sortStack()
    {
        makeLocalRequest("classes.json", parseOutClassArray);
        makeLocalRequest("classdescription.json", parseOutClassDescArray);
        makeLocalRequest("builds.json", parseOutBuildArray);
        makeLocalRequest("builddescription.json", parseOutBuildDescArray);
        parseOutArmorArray(rawData);
        parseOutWeaponArray(rawData);
        parseOutImplantArray(rawData);
    };
    sortStack();
    getStorage();
};
function parseOutClassArray(data)
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
        option.dataset.desc = val["desc"];
        mainSelect.appendChild(option);
    });
};
function parseOutClassDescArray(data)
{
    classDescArr = JSON.parse(data);
};
function parseOutBuildArray(data)
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
function parseOutBuildDescArray(data)
{
    buildDescArr = JSON.parse(data);
};
async function parseOutArmorArray(rawData)
{
    //#region Arrays
    let armorData = Object.values(rawData).filter(function (i)
    {
        if(i["repair_cost"])
        {
            return i;
        };
    });
    let armorArrs = [];
    //#endregion
    //#region JSON Sorting
    for(let i = 0; i < 2; i++) //Fixed i < 'x' value as the number of armor types is known
    {
        armorArrs[i] = Object.values(armorData).filter(function (i2) //Filters the base JSON for a known parameter
        {
            if(i == 0) //Compares the known parameter "str_req" to 0
            {
                if(i2["str_req"] == 0)
                {
                    return i2;
                }
            } else
            {
                if(i2["str_req"] > 0)
                {
                    return i2;
                };
            };
        });
        armorArrs[i] = armorArrs[i].sort((a,b) => a.repair_cost - b.repair_cost); //Sorts the returned items by the known parameter "repair_cost"
    };
    //#endregion
    createArmorSelection(armorArrs);
};
function createArmorSelection(armorArrs)
{
    //#region Label Array
    let label = //Category labels, also used as a proficiency descriptor
    ["Non-Strength", "Strength"];
    //#endregion
    let mainSelect = document.getElementById("armorSelect");
    let placeholder = document.createElement("option"); //Creates a placeholder option
    placeholder.textContent = "Please Select an Option";
    mainSelect.appendChild(placeholder);
    let optGroupBlank = document.createElement("optgroup"); //Creates a blank spacer
    mainSelect.appendChild(optGroupBlank);
    for(let i = 0; i < armorArrs.length; i++)
    {
        let optGroup = document.createElement("optgroup"); //Creates the weapon category
        optGroup.label = label[i]; //Order of arrays is known, so [i] is used to get the label for the category
        mainSelect.appendChild(optGroup);
        armorArrs[i].forEach((val) => //Iterates through the entries in the array 'i'
        {
            let option = document.createElement("option"); //Creates the option from the entry 'val'
            option.value = val["name"];
            option.textContent = val["name"];
            option.dataset.type = label[i];
            option.dataset.durability = val["hp"];
            option.dataset.absorption = val["str"];
            option.dataset.strReq = val["str_req"];
            mainSelect.appendChild(option);
        });
        optGroupBlank = document.createElement("optgroup"); //Creates a blank spacer after the category
        mainSelect.appendChild(optGroupBlank);
    };
};
async function parseOutWeaponArray(rawData)
{
    //#region Arrays
    const typeMatch = //Matches the raw "type" parameter for sorting
    [
        ["sword", "knife", "axe", "bat", "crowbar"],
        "chainsaw",
        ["autopistol", "revolver"],
        "rifle",
        "shotgun",
        "machinegun",
        "bigmachinegun",
        "minigun",
        "grenadelauncher"
    ];
    let weaponData = Object.values(rawData).filter(function (i) //Filters the raw JSON for entries with a known parameter
    {
        if(i["calliber_type"]) //The known parameter, used by all weapons
        {
            return i;
        };
    });
    let weaponArrs = [];
    //#endregion
    //#region JSON Sorting
    for(let i = 0; i < 9; i++) //Fixed i < 'x' value as the number of "true" weapon types are known
    {
        weaponArrs[i] = Object.values(weaponData).filter(function(i2) //Filters the base JSON for a known parameter
        {
            if(i == 0 || i == 2) //Matches the known parameter "type" against the type match array
            {
                if(typeMatch[i].includes(i2["type"]))
                {
                    return i2;
                };
            } else
            {
                if(typeMatch[i] == i2["type"])
                {
                    return i2;
                };
            };
        });
        weaponArrs[i] = weaponArrs[i].sort((a,b) => a.pro_req - b.pro_req); //Sorts the returned items by the known parameter "pro_req"
    };
    //#endregion
    createWeaponSelection(weaponArrs);
};
function createWeaponSelection(weaponArrs)
{
    //#region Label Array
    let label = //Category labels, also used as a proficiency descriptor
    ["Melee", "Chainsaws", "Pistols", "Rifles", "Shotguns", "Machineguns", "Heavy Machineguns", "Miniguns", "Explosives"];
    //#endregion
    let mainSelect = document.querySelectorAll("[id^='weaponSelect']"); //Targets the "weaponSelect*" select elements
    for(let i = 0; i < mainSelect.length; i++)
    {
        let placeholder = document.createElement("option"); //Creates a placeholder option
        placeholder.value = "none";
        placeholder.textContent = "Please Select an Option";
        placeholder.dataset.rawType = "none";
        placeholder.dataset.ammoType = "none";
        placeholder.dataset.caliberType = "none";
        placeholder.dataset.critical = "none";
        placeholder.dataset.proficiency = "none";
        placeholder.dataset.shotTime = "none";
        placeholder.dataset.shotsFired = "none";
        placeholder.dataset.bulletCapacity = "none";
        placeholder.dataset.reloadTime = "none";
        placeholder.dataset.accuracyMod = "none";
        placeholder.dataset.spread = "none";
        placeholder.dataset.uniqueParameter = "none";
        placeholder.dataset.elemental = "none";
        placeholder.dataset.elementalAmount = "none";
        placeholder.dataset.elementalDuration = "none";
        placeholder.dataset.selectiveFireSplit = "none";
        mainSelect[i].appendChild(placeholder);
        let optGroupBlank = document.createElement("optgroup"); //Creates a blank spacer
        mainSelect[i].appendChild(optGroupBlank);
        for(let i2 = 0; i2 < weaponArrs.length; i2++) //Iterates through the sorted arrays
        {
            let optGroup = document.createElement("optgroup"); //Creates the weapon category
            optGroup.label = label[i2]; //Order of arrays is known, so [i] is used to get the label for the category
            mainSelect[i].appendChild(optGroup);
            weaponArrs[i2].forEach((val) => //Iterates through the entries in the array 'i'
            {
                let option = document.createElement("option"); //Creates the option from the entry 'val'
                option.value = val["name"];
                option.textContent = val["name"];
                option.dataset.rawType = val["type"];
                if(i2 == 0) //Order of arrays is known, so [i] is used to set all non-chainsaw melee weapons to the rawType of "melee" instead of "sword"/"axe"/"bat"/etc.
                {
                    option.dataset.rawType = "melee";
                };
                option.dataset.ammoType = val["ammo_type"];
                option.dataset.caliberType = val["calliber_type"];
                option.dataset.critical = val["critical"];
                option.dataset.reqProficiency = val["pro_req"];
                option.dataset.proficiency = val["pro_req"]+" "+label[i2]; //Label 'i' is used as a descriptor for required proficiency
                if(val["pro_req"] == "0") //For weapons with no required proficiency, override as "None"
                {
                    option.dataset.proficiency = "None";
                };
                option.dataset.shotTime = val["shot_time"];
                option.dataset.shotsFired = val["shots_fired"];
                option.dataset.bulletCapacity = val["bullet_capacity"];
                option.dataset.reloadTime = val["reload_time"];
                option.dataset.accuracyMod = val["accuracy_mod"];
                option.dataset.spread = val["spread"];
                option.dataset.uniqueParameter = val["unique_parameters"];
                option.dataset.elemental = val["elemental"];
                option.dataset.elementalAmount = val["elementalamount"];
                option.dataset.elementalDuration = val["elementalduration"];
                option.dataset.selectiveFireSplit = val["selective_fire_split"];
                mainSelect[i].appendChild(option);
            });
            optGroupBlank = document.createElement("optgroup"); //Creates a blank spacer after the category
            mainSelect[i].appendChild(optGroupBlank);
        };
    };
};
async function parseOutImplantArray(rawData)
{
    //#region Arrays
    let typeMatch =
    [
        ["Experience Implant", "Rage Implant", "Agility Implant", "Survival Implant", "Notoriety Implant", "Hunter Implant", "Scavenger Implant", "Ingenuity Implant", "Wealth Implant"],
        ["Perception Implant", "Violence Implant", "Hyper Implant", "Ironskin Implant", "Salvage Implant"],
        ["X-Perception Implant", "X-Violence Implant", "X-Hyper Implant", "X-Ironskin Implant", "X-Salvage Implant"],
        ["Devils Implant", "Volatile Implant", "X-Dusk Implant", "Dawn Implant"],
        ["Scrutiny Implant", "Ghastly Implant", "Trinity Implant", "Celerity Implant", "Lethality Implant", "Versatility Implant", "Mastery Implant", "Prosperity Implant", "Mortality Implant", "Calamity Implant"],
        ["MOTL Implant", "Destruction Implant", "Genius Implant", "Haste Implant", "Looter Implant", "Jack Of All Implant", "Murder Implant", "Data Implant", "Havoc Implant", "Ghost Implant", "Golden Rabbit Implant", "Dark Pumpkin Implant", "Jingle Bell Implant", "Infinya Implant", "Amber Implant", "Orangejack Implant"],
        ["Easter Implant", "Halloween Implant", "Christmas Implant", "Naughty Implant", "Nice Implant", "Rabbit Foot Implant", "Golden Pumpkin Implant", "Snow Globe Implant", "Cat Eye Implant", "Whitejack Implant"]
    ]
    let implantData = Object.values(rawData).filter(function (i)
    {
        if(i["implant"])
        {
            return i;
        };
    });
    let implantArrs = [];
    //#endregion
    //#region JSON Sorting
    for(let i = 0; i < 7; i++) //Fixed i < 'x' value as the number of armor types is known
    {
        implantArrs[i] = Object.values(implantData).filter(function (i2) //Filters the base JSON for a known parameter
        {
            if(typeMatch[i].includes(i2["name"])) //Compares the known parameter "str_req" to 0
            {
                return i2;
            };
        });
        implantArrs[i] = implantArrs[i].sort((a,b) => a.level - b.level); //Sorts the returned items by the known parameter "repair_cost"
    };
    //#endregion
    createImplantSelection(implantArrs);
};
function createImplantSelection(implantArrs)
{
    //#region Label Array
    let label = //Category labels
    ["Tier-1", "Tier-2", "Tier-3", "Special", "Credit Shop", "Unique", "Seasonal"];
    //#endregion
    let mainSelect = document.querySelectorAll("[id^='implantSelect']"); //Targets the "implantSelect*" select elements
    for(let i = 0; i < mainSelect.length; i++)
    {
        let placeholder = document.createElement("option"); //Creates a placeholder option
        placeholder.value = "noimplant";
        placeholder.textContent = "No Implant";
        placeholder.dataset.ammo = 0;
        placeholder.dataset.armor = 0;
        placeholder.dataset.cash = 0;
        placeholder.dataset.damage = 0;
        placeholder.dataset.idr = 0;
        placeholder.dataset.exp = 0;
        placeholder.dataset.spots = 0;
        placeholder.dataset.pvp = 0;
        placeholder.dataset.sSpeed = 0;
        placeholder.dataset.speed = 0;
        placeholder.dataset.weapon = 0;
        placeholder.dataset.block = "none";
        placeholder.dataset.unique = false;
        mainSelect[i].appendChild(placeholder);
        let optGroupBlank = document.createElement("optgroup"); //Creates a blank spacer
        mainSelect[i].appendChild(optGroupBlank);
        for(let i2 = 0; i2 < implantArrs.length; i2++) //Iterates through the sorted arrays
        {
            let optGroup = document.createElement("optgroup"); //Creates the weapon category
            optGroup.label = label[i2]; //Order of arrays is known, so [i] is used to get the label for the category
            mainSelect[i].appendChild(optGroup);
            implantArrs[i2].forEach((val) => //Iterates through the entries in the array 'i'
            {
                let option = document.createElement("option"); //Creates the option from the entry 'val'
                option.value = val["code"];
                option.id = val["code"];
                option.textContent = val["name"].slice(0, -8);
                option.dataset.ammo = val["implant_ammolootboostmod"];
                option.dataset.armor = val["implant_armourlootboostmod"];
                option.dataset.cash = val["implant_cashlootboostmod"];
                option.dataset.damage = val["implant_damageboostmod"];
                option.dataset.idr = val["implant_damagereductionboostmod"];
                option.dataset.exp = val["implant_expboostmod"];
                option.dataset.spots = val["implant_lootspotboostmod"];
                option.dataset.pvp = val["implant_pvppointsboostmod"];
                option.dataset.sSpeed = val["implant_searchspeedboostmod"];
                option.dataset.speed = val["implant_speedboostmod"];
                option.dataset.weapon = val["implant_weaponlootboostmod"];
                option.dataset.block = val["implant_block"];
                option.dataset.unique = val["implant_unique"];
                mainSelect[i].appendChild(option);
            });
            optGroupBlank = document.createElement("optgroup"); //Creates a blank spacer after the category
            mainSelect[i].appendChild(optGroupBlank);
        };
    };
};
//#endregion
//#region Functions
    //#region Local Storage
    function getStorage() //Gets values from localStorage, defaults to setStorage if empty
    {
        console.log(`Getting stored values`);
        if(JSON.parse(localStorage.getItem('df3dStatCalc_userSettings')))
        {
            console.log(`Stored values OK; setting global values`);
            sessionValues = JSON.parse(localStorage.getItem('df3dStatCalc_userSettings'));
        } else
        {
            console.log(`No stored values; defaulting`);
            setStorage();
        };
        setValues();
    };
    function setStorage() //Sets values in localStorage, uses variable declaration if defaulted
    {
        console.log(`Setting stored values`);
        localStorage.setItem('df3dStatCalc_userSettings', JSON.stringify(sessionValues));
    };
    function getValues() //Gets values from elements then calls setStorage
    {
        for(let i = 0; i < numColl.length; i++)
        {
        sessionValues[0][i] = numColl[i].value;
        };
        for(let i = 0; i < rangeColl.length; i++)
        {
        sessionValues[1][i] = rangeColl[i].value;
        };
        for(let i = 0; i < selectColl.length; i++)
        {
        sessionValues[2][i] = selectColl[i].selectedIndex;
        };
        for(let i = 0; i < checkColl.length; i++)
        {
        sessionValues[3][i] = checkColl[i].checked;
        };
        setStorage();
    };
    function setValues() //Sets element values then calls all update functions
    {
    for(let i = 0; i < numColl.length; i++)
    {
        numColl[i].value = sessionValues[0][i];
    };
    for(let i = 0; i < rangeColl.length; i++)
    {
        rangeColl[i].value = sessionValues[1][i];
    };
    for(let i = 0; i < selectColl.length; i++)
    {
        selectColl[i].selectedIndex = sessionValues[2][i];
    };
    for(let i = 0; i < checkColl.length; i++)
    {
        checkColl[i].checked = sessionValues[3][i];
    };
    buildUpdate();
    impUpdate();
    specialEntry();
    bonusEntry();
    boostUpdate();
    statEntry();
    selectUpdate();
    displayUpdate();
    };
    //#endregion
function buildUpdate() //Savings maybe? - refactor tertiary priority
{
    let elem = document.getElementById("buildSelect");
    if(elem.selectedIndex != 0)
    {
        let level = parseInt(elem.options[elem.selectedIndex].dataset.level);
        let profession = parseInt(elem.options[elem.selectedIndex].dataset.class);
        let str = parseInt(elem.options[elem.selectedIndex].dataset.str);
        let end = parseInt(elem.options[elem.selectedIndex].dataset.end);
        let agi = parseInt(elem.options[elem.selectedIndex].dataset.agi);
        let acc = parseInt(elem.options[elem.selectedIndex].dataset.acc);
        let crit = parseInt(elem.options[elem.selectedIndex].dataset.crit);
        let rel = parseInt(elem.options[elem.selectedIndex].dataset.rel);
        let melee = parseInt(elem.options[elem.selectedIndex].dataset.melee);
        let pistol = parseInt(elem.options[elem.selectedIndex].dataset.pistol);
        let rifle = parseInt(elem.options[elem.selectedIndex].dataset.rifle);
        let shotgun = parseInt(elem.options[elem.selectedIndex].dataset.shotgun);
        let mg = parseInt(elem.options[elem.selectedIndex].dataset.mg);
        let explo = parseInt(elem.options[elem.selectedIndex].dataset.explo);
        let armEnd = parseInt(elem.options[elem.selectedIndex].dataset.armEnd);
        let armAgi = parseInt(elem.options[elem.selectedIndex].dataset.armAgi);
        let w1Acc = parseInt(elem.options[elem.selectedIndex].dataset.w1Acc);
        let w1Crit = parseInt(elem.options[elem.selectedIndex].dataset.w1Crit);
        let w1Rel = parseInt(elem.options[elem.selectedIndex].dataset.w1Rel);
        let w2Acc = parseInt(elem.options[elem.selectedIndex].dataset.w2Acc);
        let w2Crit = parseInt(elem.options[elem.selectedIndex].dataset.w2Crit);
        let w2Rel = parseInt(elem.options[elem.selectedIndex].dataset.w2Rel);
        let w3Acc = parseInt(elem.options[elem.selectedIndex].dataset.w3Acc);
        let w3Crit = parseInt(elem.options[elem.selectedIndex].dataset.w3Crit);
        let w3Rel = parseInt(elem.options[elem.selectedIndex].dataset.w3Rel);
        let desc = parseInt(elem.options[elem.selectedIndex].dataset.desc);
        document.getElementById("level").value = level;
        document.getElementById("classSelect").selectedIndex = profession;
        document.getElementById("strStat").value = str;
        document.getElementById("endStat").value = end;
        document.getElementById("agiStat").value = agi;
        document.getElementById("accStat").value = acc;
        document.getElementById("critStat").value = crit;
        document.getElementById("relStat").value = rel;
        document.getElementById("meleeProf").value = melee;
        document.getElementById("pistolProf").value = pistol;
        document.getElementById("rifleProf").value = rifle;
        document.getElementById("shotgunProf").value = shotgun;
        document.getElementById("mgProf").value = mg;
        document.getElementById("exploProf").value = explo;
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
        document.getElementById("buildHelpText").innerText = buildDescArr[desc];
    };
};
function selectUpdate() //Refactored to Rebekah levels
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
            let desc = elem.options[elem.selectedIndex].dataset.desc;
            document.getElementById("classHelpText").innerText = classDescArr[desc];
        } else if(elem.id == "armorSelect")
        {
            armor[0] = parseInt(elem.options[elem.selectedIndex].dataset.durability);
            armor[1] = parseFloat(elem.options[elem.selectedIndex].dataset.absorption);
            armor[2] = parseInt(elem.options[elem.selectedIndex].dataset.strReq);
        } else if(elem.id.includes("weaponSelect"))
        {
            //#region Conversion Arrays
            let ammoConversion = //For converting 'data-ammoType' into more descriptive text
            {
                "": "none",
                "10gaugeammo": "10 Gauge",
                "127rifleammo": "12.7mm Rifle",
                "12gaugeammo": "12 Gauge",
                "14rifleammo": "14mm Rifle",
                "16gaugeammo": "16 Gauge",
                "20gaugeammo": "20 Gauge",
                "20rifleammo": "20mm Rifle",
                "32ammo": ".32 Handgun",
                "357ammo": ".357 Handgun",
                "35ammo": "9mm Handgun",
                "38ammo": ".38 Handgun",
                "40ammo": ".40 Handgun",
                "45ammo": ".45 Handgun",
                "50ammo": ".50 Handgun",
                "55ammo": ".55 Handgun",
                "55rifleammo": "5.5mm Rifle",
                "75rifleammo": "7.5mm Rifle",
                "9rifleammo": "9mm Rifle",
                "fuelammo": "Gasoline",
                "grenadeammo": "Grenades",
                "heavygrenadeammo": "Heavy Grenades"
            }
            let relConversion = //For converting 'data-reloadTime' into more descriptive text
            {
                "0": "none",
                "60": "(Super) Fast",
                "90": "(Very) Fast",
                "120": "Fast",
                "180": "Slow",
                "240": "Very Slow"
            };
            let attConversion = //For converting 'data-shotTime' into more descriptive text
            {
                "2": "Insanely Fast!",
                "3.5": "Insanely Fast!",
                "4.9": "F***king Fast!",
                "5": "Super Fast",
                "7": "Very Fast",
                "10": "Very Fast",
                "20": "Fast",
                "25": "Fast",
                "30": "Average",
                "40": "Slow",
                "40.0": "Slow",
                "60": "Very Slow",
                "120": "Super Slow",
            };
            let accConversion = //For converting 'data-accuracyMod' into more descriptive text
            {
                "-15": "Very High",
                "-12": "Very High",
                "-8": "High",
                "0": "Average",
                "8": "Low",
                "10": "Low",
                "15": "Very Low",
                "21": "Ultra Low"
            };
            let critConversion = //For converting 'data-critical' into more descriptive text
            {
                "0": "Zero",
                "0.05": "Very Low (Minigun)",
                "0.1": "Very Low",
                "0.5": "Low",
                "2": "High",
                "3": "Very High",
            };
            //#endregion
            //#region Get values
            let name = elem.value;
            let ammo = ammoConversion[elem.options[elem.selectedIndex].dataset.ammoType]; //Converts 'data-ammoType' using conversion array
            let reload = relConversion[elem.options[elem.selectedIndex].dataset.reloadTime]; //Converts 'data-reloadTime' using conversion array
            let attack = attConversion[elem.options[elem.selectedIndex].dataset.shotTime]; //Converts 'data-shotTime' using conversion array
            let accuracy = accConversion[parseInt(elem.options[elem.selectedIndex].dataset.accuracyMod)]; //Converts 'data-accuracyMod' using conversion array
            let effAccuracy = parseInt(elem.options[elem.selectedIndex].dataset.accuracyMod);
            let critical = critConversion[parseFloat(elem.options[elem.selectedIndex].dataset.critical)]; //Converts 'data-critical' using conversion array
            let reqProficiency = parseInt(elem.options[elem.selectedIndex].dataset.reqProficiency);
            let proficiency = elem.options[elem.selectedIndex].dataset.proficiency;
            let bulletCapacity = parseInt(elem.options[elem.selectedIndex].dataset.bulletCapacity);
            let rawType = elem.options[elem.selectedIndex].dataset.rawType;
            let caliberType = parseFloat(elem.options[elem.selectedIndex].dataset.caliberType);
            let weaponCrit = parseFloat(elem.options[elem.selectedIndex].dataset.critical);
            let shotTime = parseFloat(elem.options[elem.selectedIndex].dataset.shotTime) + 2; //Adds 2 to 'data-shotTime' to account for server lag in calculations
            let shotsFired = parseFloat(elem.options[elem.selectedIndex].dataset.shotsFired);
            if(shotsFired == 0) //If shotsFired, overrides as '1'
            {
                shotsFired = 1;
            };
            let weaponReload = parseFloat(elem.options[elem.selectedIndex].dataset.reloadTime);
            let spread = parseFloat(elem.options[elem.selectedIndex].dataset.spread);
            let cleave = 2;
            if(elem.options[elem.selectedIndex].dataset.uniqueParameter == "MeleeHitCountAmount") //If weapon has a cleave modifier, overrides as '4'
            {
                cleave = 4;
            };
            let uniqueParameter = elem.options[elem.selectedIndex].dataset.uniqueParameter;
            let elementalType = elem.options[elem.selectedIndex].dataset.elemental;
            let elementalAmount = parseFloat(elem.options[elem.selectedIndex].dataset.elementalAmount);
            let elementalDuration = parseFloat(elem.options[elem.selectedIndex].dataset.elementalDuration);
            let selectiveFireSplit = elem.options[elem.selectedIndex].dataset.selectiveFireSplit.split(";"); //Splits the 'selectiveFireSplit' string into an array
            //#endregion
            //#region Math - All formulae sourced or adapted from the Dead Frontier 3D Official Wiki
                //#region Initials
                let typeMultiplier = 1; //Default values
                let kbTypeMultiplier = 1;
                let bmgBuff = 1;
                switch(rawType) //If weapon has non-default values, overrides as appropriate
                {
                    case `melee`:
                        typeMultiplier = 1.2;
                        kbTypeMultiplier = 1.2;
                        break;
                    case `revolver`:
                        typeMultiplier = 1.5;
                        kbTypeMultiplier = 1.5;
                        break;
                    case `autopistol`:
                        typeMultiplier = 1.35;
                        kbTypeMultiplier = 1.35;
                        break;
                    case `rifle`:
                        typeMultiplier = 2;
                        kbTypeMultiplier = 2;
                        break;
                    case `shotgun`:
                        typeMultiplier = 1.15;
                        kbTypeMultiplier = 1.15;
                        break;
                    case `machinegun`:
                        typeMultiplier = 1.2;
                        kbTypeMultiplier = 1.2;
                        break;
                    case `bigmachinegun`:
                        typeMultiplier = 1.45;
                        kbTypeMultiplier = 1.45;
                        bmgBuff = 1.2;
                        break;
                    case `minigun`:
                        kbTypeMultiplier = 0.5;
                        break;
                    default: //For weapons with all values matching default
                        break;
                };
                //#endregion
                //#region Critical
                let baseCrit = (5 + Math.round((stat[4][3] - 25) / 2.5)) * weaponCrit;
                if(baseCrit > 80)
                {
                    baseCrit = 80
                };
                let divisor;
                if(baseCrit < 5)
                {
                    divisor = 1;
                } else if(baseCrit < 9)
                {
                    divisor = 2;
                } else if(baseCrit < 19)
                {
                    divisor = 5;
                } else if(baseCrit < 79)
                {
                    divisor = 10;
                } else if(baseCrit >= 80)
                {
                    divisor = 20;
                };
                let critFail = Math.ceil((100 - baseCrit) / divisor);
                let critSuccess = Math.floor(baseCrit / divisor);
                //#endregion
                //#region Reload
                let reloadFrame = 15 + (((124 - stat[5][3]) * weaponReload) / 100);
                let reloadTime = reloadFrame / 60;
                //#endregion
                //#region Damage
                let dph = (caliberType + 1) * typeMultiplier * bmgBuff * shotsFired * (1 + boosts[3][2]);
                let pelletDph = Math.round((((caliberType + 1) * typeMultiplier * bmgBuff * (1 + boosts[3][2])) + Number.EPSILON) * 100) / 100;
                let cleaveDph = (dph * 0.125) * cleave;
                let critDph = dph * 5;
                let cleaveCritDph = (cleaveDph * 5);
                let dps = dph * (60 / shotTime);
                let explosiveDps = critDph * (60 / shotTime);
                let cleaveDps = (dph + cleaveDph) * (60 / shotTime);
                let critDps = dps * ((critFail + (critSuccess * 5)) / (critFail + critSuccess));
                let cleaveCritDps = Math.round((cleaveDps * ((critFail + (critSuccess * 5)) / (critFail + critSuccess)) + Number.EPSILON) * 100) / 100;
                let magTime = (bulletCapacity * shotTime) / 60;
                let dpsWithReload = Math.round(((dps * (magTime / (magTime + reloadTime))) + Number.EPSILON) * 100) / 100;
                let explosiveDpsWithReload = Math.round(((explosiveDps * (magTime / (magTime + reloadTime))) + Number.EPSILON) * 100) / 100;
                let critDpsWithReload = Math.round(((critDps * (magTime / (magTime + reloadTime))) + Number.EPSILON) * 100) / 100;
                //#endregion
                //#region Knockback
                let kbBase;
                if(shotsFired == 1)
                {
                    kbBase = 2;
                } else
                {
                    kbBase = 1;
                };
                let pelletKb = kbBase + ((caliberType * kbTypeMultiplier) / 5);
                if(pelletKb > 4)
                {
                    pelletKb = 4;
                };
                if(rawType == "shotgun")
                {
                    pelletKb = pelletKb * 0.85;
                };
                let atkKb = pelletKb * shotsFired;
                if(selectiveFireSplit[0] !== "undefined")
                {
                    atkKb = pelletKb * 3;
                };
                let critKb = atkKb * 2;
                let kbsBase = Math.round(((atkKb * (60 / shotTime)) + Number.EPSILON) * 100) / 100;
                let critKbs = kbsBase * ((critFail + (critSuccess * 2)) / (critFail + critSuccess));
                let kbs = Math.round(((critKbs * (magTime / (magTime + reloadTime))) + Number.EPSILON) * 100) / 100;
                if(rawType == "melee" || rawType == "chainsaw")
                {
                    kbs = Math.round((critKbs + Number.EPSILON) * 100) / 100;
                } else if(weaponCrit == 0)
                {
                    kbs = Math.round(((kbsBase * (magTime / (magTime + reloadTime))) + Number.EPSILON) * 100) / 100;
                };
                //#endregion
            //#endregion
            //#region Push to Array
                //#region Initials
                let i = parseInt(elem.id.slice(-1)) - 1;
                let tempArr = [];
                //#endregion
                //#region Push Stack
                if(elem.value != "none")
                {
                    //#region Info Card Stats
                    tempArr[0] = name; //Weapon name
                    tempArr[1] = ammo; //Ammo used
                    if(ammo == "none")
                    {
                        tempArr[1] = "none";
                    };
                    tempArr[2] = bulletCapacity; //Magazine capacity
                    if(bulletCapacity == 0)
                    {
                        tempArr[2] = "none";
                    };
                    tempArr[3] = reload; //Reload descriptor
                    if(reload == "none")
                    {
                        tempArr[3] = "none";
                    };
                    tempArr[4] = attack; //Attack speed descriptor
                    tempArr[5] = accuracy; //Accuracy descriptor
                    tempArr[6] = critical; //Critical descriptor
                    tempArr[7] = proficiency; //Proficiency required
                    tempArr[8] = "0%" //Armor penetration
                    if(rawType == "melee" || rawType == "chainsaw" || rawType == "grenadelauncher")
                    {
                        tempArr[8] = "100%"
                    } else if (elementalType == "armourpenetration")
                    {
                        tempArr[8] = elementalAmount+"%"
                    };
                    tempArr[9] = "No Ability"; //Ability descriptor
                    if(uniqueParameter == "MeleeHitCountAmount")
                    {
                        tempArr[9] = "5 Enemies Hit, Enhanced Melee Damage Radius";
                    } else if (elementalType == "cryo")
                    {
                        tempArr[9] = "Slows Infected by "+(elementalAmount * 100)+"% for "+elementalDuration+" Seconds per Hit";
                    };
                    //#endregion
                    //#region Damage Stats
                    tempArr[10] = Math.round((dph + Number.EPSILON) * 100) / 100; //DPH
                    tempArr[11] = Math.round((critDph + Number.EPSILON) * 100) / 100; //Crit DPH
                    if(selectiveFireSplit[0] !== "undefined")
                    {
                        tempArr[10] = //DPH
                            Math.round((dph + Number.EPSILON) * 100) / 100+" ("
                            +Math.round(((dph * selectiveFireSplit[0]) + Number.EPSILON) * 100) / 100+" + "
                            +Math.round(((dph * selectiveFireSplit[1]) + Number.EPSILON) * 100) / 100+" + "
                            +Math.round(((dph * selectiveFireSplit[2]) + Number.EPSILON) * 100) / 100+")";
                        tempArr[11] = //Crit DPH
                            Math.round((critDph + Number.EPSILON) * 100) / 100+" ("
                            +Math.round(((critDph * selectiveFireSplit[0]) + Number.EPSILON) * 100) / 100+" + "
                            +Math.round(((critDph * selectiveFireSplit[1]) + Number.EPSILON) * 100) / 100+" + "
                            +Math.round(((critDph * selectiveFireSplit[2]) + Number.EPSILON) * 100) / 100+")";
                    } else if(weaponCrit == 0) //Crit DPH
                    {
                        tempArr[11] = "none";
                    };
                    tempArr[12] = dpsWithReload+" ("+critDpsWithReload+")"; //DPS
                    if(rawType == "melee")
                    {
                        tempArr[12] = Math.round((dps + Number.EPSILON) * 100) / 100+" ("+Math.round((critDps + Number.EPSILON) * 100) / 100+")";
                    };
                    if(weaponCrit == 0)
                    {
                        tempArr[12] = dpsWithReload;
                    };
                    //#endregion
                    //#region Type Specific Stats
                    tempArr[13] = pelletDph+" x "+shotsFired; //Pellet DPH
                    if(shotsFired == 1)
                    {
                        tempArr[13] = "none";
                    };
                    tempArr[14] = //Cleave DPH
                        Math.round(((dph + cleaveDph) + Number.EPSILON) * 100) / 100+" ("
                        +Math.round(((dph) + Number.EPSILON) * 100) / 100+" + "
                        +Math.round(((cleaveDph / cleave) + Number.EPSILON) * 100) / 100+" + "
                        +Math.round(((cleaveDph / cleave) + Number.EPSILON) * 100) / 100+")";
                    if(cleave == 4)
                    {
                        tempArr[14] =
                            Math.round(((dph + cleaveDph) + Number.EPSILON) * 100) / 100+" ("
                            +Math.round(((dph) + Number.EPSILON) * 100) / 100+" + "
                            +Math.round(((cleaveDph / cleave) + Number.EPSILON) * 100) / 100+" + "
                            +Math.round(((cleaveDph / cleave) + Number.EPSILON) * 100) / 100+" + "
                            +Math.round(((cleaveDph / cleave) + Number.EPSILON) * 100) / 100+" + "
                            +Math.round(((cleaveDph / cleave) + Number.EPSILON) * 100) / 100+")";
                    } else if(rawType != "melee" && rawType != "chainsaw")
                    {
                        tempArr[14] = "none"
                    };
                    tempArr[15] = //Cleave Crit DPH
                        Math.round(((critDph + cleaveCritDph) + Number.EPSILON) * 100) / 100+" ("
                        +Math.round(((critDph) + Number.EPSILON) * 100) / 100+" + "
                        +Math.round(((cleaveCritDph / cleave) + Number.EPSILON) * 100) / 100+" + "
                        +Math.round(((cleaveCritDph / cleave) + Number.EPSILON) * 100) / 100+")";
                    if(cleave == 4)
                    {
                        tempArr[15] =
                            Math.round(((critDph + cleaveDph) + Number.EPSILON) * 100) / 100+" ("
                            +Math.round(((critDph) + Number.EPSILON) * 100) / 100+" + "
                            +Math.round(((cleaveCritDph / cleave) + Number.EPSILON) * 100) / 100+" + "
                            +Math.round(((cleaveCritDph / cleave) + Number.EPSILON) * 100) / 100+" + "
                            +Math.round(((cleaveCritDph / cleave) + Number.EPSILON) * 100) / 100+" + "
                            +Math.round(((cleaveCritDph / cleave) + Number.EPSILON) * 100) / 100+")";
                    } else if(rawType != "melee" && rawType != "chainsaw")
                    {
                        tempArr[15] = "none"
                    };
                    tempArr[16] = cleaveCritDps; //Cleave DPS
                    if(rawType != "melee" && rawType != "chainsaw")
                    {
                        tempArr[16] = "none"
                    };
                    tempArr[17] = critDph; //Explosive DPH
                    tempArr[18] = explosiveDpsWithReload; //Explosive DPS
                    if(rawType != "grenadelauncher")
                    {
                        tempArr[17] = "none";
                        tempArr[18] = "none";
                    };
                    //#endregion
                    //#region Soft Stats
                    if(name == "fists")
                    {
                        tempArr[19] = "Skill Issue";
                    } else
                    {
                        if(rawType == "melee")
                        {
                            tempArr[19] = "Melee";
                        } else
                        {
                            if(effAccuracy == -15 || effAccuracy == -12)
                            {
                                if(stat[3][3] < 35)
                                {
                                    //wColl[i][14].style.backgroundColor = "lightcoral";
                                    tempArr[19] = "Inaccurate";
                                } else if(stat[3][3] < 40)
                                {
                                    //wColl[i][14].style.backgroundColor = "coral";
                                    tempArr[19] = "Reliable Onscreen";
                                } else if(stat[3][3] < 44)
                                {
                                    //wColl[i][14].style.backgroundColor = "khaki";
                                    tempArr[19] = "Reliable Offscreen";
                                } else if(stat[3][3] >= 44)
                                {
                                    //wColl[i][14].style.backgroundColor = "lightgreen";
                                    tempArr[19] = "Pinpoint";
                                };
                            } else if(effAccuracy == -8)
                            {
                                if(stat[3][3] < 60)
                                {
                                    //wColl[i][14].style.backgroundColor = "lightcoral";
                                    tempArr[19] = "Inaccurate";
                                } else if(stat[3][3] < 70)
                                {
                                    //wColl[i][14].style.backgroundColor = "coral";
                                    tempArr[19] = "Reliable Onscreen";
                                } else if(stat[3][3] < 79)
                                {
                                    //wColl[i][14].style.backgroundColor = "khaki";
                                    tempArr[19] = "Reliable Offscreen";
                                } else if(stat[3][3] >= 79)
                                {
                                    //wColl[i][14].style.backgroundColor = "lightgreen";
                                    tempArr[19] = "Pinpoint";
                                };
                            } else if(effAccuracy == 0)
                            {
                                if(stat[3][3] < 80)
                                {
                                    //wColl[i][14].style.backgroundColor = "lightcoral";
                                    tempArr[19] = "Inaccurate";
                                } else if(stat[3][3] < 100)
                                {
                                    //wColl[i][14].style.backgroundColor = "coral";
                                    tempArr[19] = "Reliable Onscreen";
                                } else if(stat[3][3] < 119)
                                {
                                    //wColl[i][14].style.backgroundColor = "khaki";
                                    tempArr[19] = "Reliable Offscreen";
                                } else if(stat[3][3] >= 119)
                                {
                                    //wColl[i][14].style.backgroundColor = "lightgreen";
                                    tempArr[19] = "Pinpoint";
                                };
                            } else if(effAccuracy == 8 || effAccuracy == 10)
                            {
                                if(stat[3][3] < 100)
                                {
                                    //wColl[i][14].style.backgroundColor = "lightcoral";
                                    tempArr[19] = "Inaccurate";
                                } else if(stat[3][3] < 124)
                                {
                                    //wColl[i][14].style.backgroundColor = "khaki";
                                    tempArr[19] = "Reliable Onscreen";
                                } else if(stat[3][3] >= 124)
                                {
                                    //wColl[i][14].style.backgroundColor = "lightgreen";
                                    tempArr[19] = "Reliable Offscreen";
                                };
                            } else if(effAccuracy == 15 || effAccuracy == 21)
                            {
                                if(stat[3][3] < 124)
                                {
                                    //wColl[i][14].style.backgroundColor = "lightcoral";
                                    tempArr[19] = "Inaccurate";
                                } else if(stat[3][3] >= 124)
                                {
                                    //wColl[i][14].style.backgroundColor = "khaki";
                                    tempArr[19] = "Reliable Onscreen";
                                };
                            };
                        };
                    };
                    tempArr[20] = Math.round(((60 / shotTime) + Number.EPSILON) * 100) / 100; //Hits per second
                    tempArr[21] = critFail+" > "+critSuccess; //Crit pattern
                    if(weaponCrit == 0)
                    {
                        tempArr[21] = "none";
                    };
                    tempArr[22] = (spread * 3)+"\xB0"; //Spread radius
                    if(spread == 0)
                    {
                        tempArr[22] = "none";
                    };
                    //#endregion
                    //#region Knockback Stats
                    tempArr[23] = Math.round((atkKb + Number.EPSILON) * 100) / 100; //Knockback per hit
                    if(weaponCrit != 0)
                    {
                        tempArr[23] = Math.round((atkKb + Number.EPSILON) * 100) / 100+" ("+Math.round((critKb + Number.EPSILON) * 100) / 100+")";
                    };
                    tempArr[24] = Math.round((pelletKb + Number.EPSILON) * 100) / 100; //Knockback per pellet
                    if(shotsFired == 1)
                    {
                        tempArr[24] = "none";
                    } else if(weaponCrit != 0)
                    {
                        tempArr[24] = Math.round((pelletKb + Number.EPSILON) * 100) / 100+" ("+Math.round(((pelletKb * 2) + Number.EPSILON) * 100) / 100+")";
                    };
                    tempArr[25] = kbs; //Knockback per second
                    if(rawType == "grenadelauncher")
                    {
                        tempArr[23] = "none"; //Knockback per hit
                        tempArr[24] = "none"; //Knockback per pellet
                        tempArr[25] = "none"; //Knockback per second
                    };
                    //#endregion
                    //#region Miscellaneous
                    tempArr[26] = reqProficiency;
                    tempArr[27] = rawType;
                    //#endregion
                } else
                {
                    for(let i2 = 0; i2 < 28; i2++)
                    {
                        tempArr[i2] = "none";
                    };
                };
                weapon[i] = tempArr;
                //#endregion
            //#endregion
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
            let impCantUse = elem.options[elem.selectedIndex].dataset.block;
            let impUnique = (elem.options[elem.selectedIndex].dataset.unique == "1");
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
                for(let i = 0; i < imp[slot].length; i++)
                {
                    if(imp[slot][i] === "undefined")
                    {
                        imp[slot][i] = 0;
                    };
                };
            };
            if(impCantUse === "undefined")
            {
                impBlock[0][slot] = "none";
            } else
            {
                impBlock[0][slot] = impCantUse;
            };
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
};
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
        //Need to figure this out
        let baseDura = armor[0] / (armor[1] / 100);
        let idr = boosts[3][4];
        let baseDmg = Math.round(((baseDura * (1 - idr)) + Number.EPSILON) * 100) / 100;
        let effDura = Math.round(((baseDura * (baseDura / baseDmg)) + Number.EPSILON) * 100) / 100;
        armorColl[0].textContent = armor[0];
        armorColl[1].textContent = effDura;
        armorColl[2].textContent = armor[1]+"%";
        armorColl.forEach(element => element.style.display = "block");
        armorColl.forEach(element => element.previousElementSibling.style.display = "block");
        document.getElementById("none").style.display = "none";
    } else
    {
        armorColl.forEach(element => element.style.display = "none");
        armorColl.forEach(element => element.previousElementSibling.style.display = "none");
        document.getElementById("none").style.display = "block";
    };
};
function weaponDisplay() //Magnum opus refactor 2.0, part of above refactor
{
    //#region Arrays
    const wColl =
    [
        document.querySelectorAll("p[id^='w1Val']"),
        document.querySelectorAll("p[id^='w2Val']"),
        document.querySelectorAll("p[id^='w3Val']")
    ];
    const wNone =
    [
        "w1None",
        "w2None",
        "w3None",
    ];
    const wSome =
    [
        "#w1Some",
        "#w2Some",
        "#w3Some"
    ];
    //#endregion
    //#region Display
    for(let i = 0; i < wColl.length; i++)
    {
        if(weapon[i][0] == "none")
        {
            document.getElementById(wNone[i]).style.display = "block";
            document.querySelectorAll(wSome[i]).forEach(elem => elem.style.display = "none");
            for(let i2 = 0; i2 < wColl[i].length; i2++)
            {
                wColl[i][i2].style.display = "none";
                wColl[i][i2].previousElementSibling.style.display = "none";
            };
        } else
        {
            document.getElementById(wNone[i]).style.display = "none";
            document.querySelectorAll(wSome[i]).forEach(elem => elem.style.display = "block");
            for(let i2 = 0; i2 < wColl[i].length; i2++)
            {
                wColl[i][i2].textContent = weapon[i][i2];
                if(weapon[i][i2] == "none")
                {
                    wColl[i][i2].style.display = "none";
                    wColl[i][i2].previousElementSibling.style.display = "none";
                } else
                {
                    wColl[i][i2].style.display = "block";
                    wColl[i][i2].previousElementSibling.style.display = "block";
                };
            };
        };
    };
    //#endregion
};
function boostDisplay() //Part of above refactor
{
    const boost = document.querySelectorAll("p[id^='boostVal']");
    for(let i = 0; i < boost.length; i++)
    {
        let elem = boost[i];
        elem.textContent = Math.abs(Math.round(((boosts[3][i] * 100) + Number.EPSILON) * 100) / 100) + "%";
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
                elem.setAttribute("max", 120);
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
            boosts[2][i2] = Math.round(((inputValue / 100) + Number.EPSILON) * 100) / 100;
        };
    };
    stat[0][1] = stat[0][2]; //str
    stat[1][1] = stat[1][2] + aBonus[1]; //end
    stat[2][1] = stat[2][2] + aBonus[0]; //agi
    stat[3][1] = stat[3][2] + wBonus[0][0] + wBonus[1][0] + wBonus[2][0]; //acc
    stat[4][1] = stat[4][2] + wBonus[0][2] + wBonus[1][2] + wBonus[2][2]; //crit
    stat[5][1] = stat[5][2] + wBonus[0][1] + wBonus[1][1] + wBonus[2][1]; //rel
};
function specialEntry() //Moved checkbox code here
{
    for(let i = 0; i < checkColl.length; i++)
    {
        let elem = checkColl[i];
        if(elem.id == "gmCheck")
        {
            if(elem.checked == true)
            {
                boosts[1] = [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0.6];
            } else if(elem.checked == false)
            {
                boosts[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            };
        } else if(elem.id == "ubCheck")
        {
            if(elem.checked == true)
            {
                boosts[0] = [0.5, 0, 0.35, 0.35, 0, 0, 0, 0, 0, 0, 0];
            } else if(elem.checked == false)
            {
                boosts[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            };
        };
    };
}
function boostUpdate() //Rebekah's magnum opus refactor
{
    for(let i = 0; i < boosts[3].length; i++)
    {
        let total = 0;
        for(let j = 0; j < imp.length; j++)
        {
            if(i === 4)
            {
                total += Math.abs(Math.round(((parseFloat(imp[j][i])) + Number.EPSILON) * 100) / 100);
            } else
            {
                total += Math.round(((parseFloat(imp[j][i])) + Number.EPSILON) * 100) / 100;
            };
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
        statEntry();
        selectUpdate();
        displayUpdate();
        getValues();
    });
};
for(let i = 0; i < numColl.length; i++)
{
    numColl[i].addEventListener("input", function()
    {
        bonusEntry();
        boostUpdate();
        statEntry();
        selectUpdate();
        displayUpdate();
        getValues();
    });
};
for(let i = 0; i < selectColl.length; i++)
{
    selectColl[i].addEventListener("change", function()
    {
        buildUpdate();
        impUpdate();
        boostUpdate();
        selectUpdate();
        bonusEntry();
        statEntry();
        displayUpdate();
        getValues();
    });
};
for(let i = 0; i < checkColl.length; i++)
{
    checkColl[i].addEventListener("change", function()
    {
        specialEntry();
        boostUpdate();
        selectUpdate();
        displayUpdate();
        getValues();
    });
};
//#endregion