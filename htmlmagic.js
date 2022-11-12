//#region Selectors
const collapseColl = document.getElementsByClassName("collapsible");
const buttonColl = document.querySelectorAll('input[type=button]');
const impSlots = document.querySelectorAll("[id^='implantSelect']");
//#endregion
//#region Global Variables
const slotLevel = [15, 25, 35, 50, 65, 80, 95, 120, 145, 170, 195, 220, 245, 270, 295, 325];
let buildOpen = false;
let classOpen = false;
let dialogueOpen = "none";
let impLock = true;
//#endregion
//#region Startup
for(let i = 0; i < impSlots.length; i++)
{
  impSlots[i].disabled = true;
};
//#endregion
//#region Functions
function collapse(elem)
{
  elem.classList.toggle("active");
  const content = elem.nextElementSibling;
  if(content.style.maxHeight)
  {
    content.style.maxHeight = null;
  } else
  {
    content.style.maxHeight = content.scrollHeight + "px";
  };
};
function buildHelp(elem)
{
  switch(elem.id)
  {
    case 'buildHelpOpen':
      switch(buildOpen)
      {
        case true:
          document.getElementById("buildHelp").style.visibility = "collapse";
          buildOpen = false;
          break;
        case false:
          document.getElementById("classHelp").style.visibility = "collapse";
          classOpen = false;
          document.getElementById("buildHelp").style.visibility = "visible";
          buildOpen = true;
          break;
      };
      break;
    case 'buildHelpClose':
      document.getElementById("buildHelp").style.visibility = "collapse";
      classOpen = false;
      break;
  };
};
function classHelp(elem)
{
  switch(elem.id)
  {
    case 'classHelpOpen':
      switch(classOpen)
      {
        case true:
          document.getElementById("classHelp").style.visibility = "collapse";
          classOpen = false;
          break;
        case false:
          document.getElementById("buildHelp").style.visibility = "collapse";
          buildOpen = false;
          document.getElementById("classHelp").style.visibility = "visible";
          classOpen = true;
          break;
      };
      break;
    case 'classHelpClose':
      document.getElementById("classHelp").style.visibility = "collapse";
      classOpen = false;
      break;
  };
};
function imps()
{
  let openSlots = 0;
  switch(impLock)
  {
    case true:
      for(let i = 0; i < impSlots.length; i++)
      {
        impSlots[i].disabled = false;
      };
      impLock = false;
      break;
    case false:
      for(let i = 0; i < impSlots.length; i++)
      {
        impSlots[i].disabled = true;
      };
      for(let i = 0; i < slotLevel.length; i++)
      {
        if(charInfo["level"] >= slotLevel[i])
        {
          openSlots = i + 1;
        };
      };
      for(let i = 0; i < openSlots; i++)
      {
        impSlots[i].disabled = false;
      };
      impLock = true;
      break;
  };
  impUpdate();
  boostUpdate();
  selectUpdate();
  displayUpdate();
};
function resetHandler(elem)
{
  let title = "";
  let content = "";
  switch(elem.id)
  {
    case 'dialogueCancel':
      document.getElementById("dialogue").style.visibility = "collapse";
      break;
    case 'dialogueConfirm':
      document.getElementById("dialogue").style.visibility = "collapse";
      reset();
      break;
    default:
      dialogueOpen = elem.id;
      document.getElementById("dialogue").style.visibility = "visible";
      break;
  };
  switch(dialogueOpen)
  {
    case `statsReset`:
      title = "Reset Stats?";
      content = "Please note that this will reset the 'Stats' panel.";
      break;
    case `equipmentReset`:
      title = "Reset Equipment?";
      content = "Please note that this will reset the 'Equipment' panel.";
      break;
    case `impReset`:
      title = "Reset Implants?";
      content = "Please note that this will reset the 'Implants' panel.";
      break;
    case `boostReset`:
      title = "Reset Boosts?";
      content = "Please note that this will reset the 'Boost Values' panel.";
      break;
    case `allReset`:
      title = "Reset Everything?";
      content = "Please note that this will reset everything and clear your session storage.";
      break;
  };
  document.getElementById("dialogueTitle").textContent = title;
  document.getElementById("dialogueContent").textContent = content;
};
function reset()
{
  switch(dialogueOpen)
  {
    case 'allReset':
      console.log(`Removing stored values`);
      localStorage.removeItem('df3dStatCalc_userSettings');
      window.location.reload();
      break;
    default:
      let parent = document.getElementById(dialogueOpen).nextElementSibling;
      if(parent == null)
      {
        let grandparent = document.getElementById(dialogueOpen).parentElement;
        parent = grandparent.nextElementSibling;
      };
      let elem = parent.querySelectorAll("*");
      for(let i = 0; i < elem.length; i++)
      {
        let type = elem[i].nodeName;
        switch(type)
        {
          case 'INPUT':
            switch(elem[i].type)
            {
              case 'number':
                elem[i].value = "";
                break;
              case 'range':
                elem[i].value = elem[i].min;
                break;
            };
          case 'SELECT':
            elem[i].selectedIndex = 0;
            break;
        };
      };
  };
  impUpdate();
  boostUpdate();
  selectUpdate();
  bonusEntry();
  statEntry();
  displayUpdate();
};
async function save() //Is this even worth the security risk?
{
  let data = new Blob( //Here be dragons
    [
      "Level: "+sessionValues[0][0]+
      "\nProfession: "+document.getElementById("classSelect").value+
      "\n\nStats:\n    Strength: "+stat[0][3]+
      "\n    Endurance: "+stat[1][3]+
      "\n    Agility: "+stat[2][3]+
      "\n    Accuracy: "+stat[3][3]+
      "\n    Critical: "+stat[4][3]+
      "\n    Reloading: "+stat[5][3]+
      "\n\nProficiencies:\n    Melee: "+(prof[0][0] + prof[0][1])+
      "\n    Pistols: "+(prof[1][0] + prof[1][1])+
      "\n    Rifles: "+(prof[2][0] + prof[2][1])+
      "\n    Shotguns: "+(prof[3][0] + prof[3][1])+
      "\n    Machineguns: "+(prof[4][0] + prof[4][1])+
      "\n    Explosives: "+(prof[5][0] + prof[5][1])+
      "\n\nEquipment:\n    Armor: "+document.getElementById("armorSelect").value+
      "\n        Bonuses:\n            Agility: "+aBonus[0]+
      "\n            Endurance: "+aBonus[1]+
      "\n    Weapon 1: "+document.getElementById("weaponSelect1").value+
      "\n        Bonuses:\n            Accuracy: "+wBonus[0][0]+
      "\n            Reloading: "+wBonus[0][1]+
      "\n            Critical: "+wBonus[0][2]+
      "\n    Weapon 2: "+document.getElementById("weaponSelect2").value+
      "\n        Bonuses:\n            Accuracy: "+wBonus[1][0]+
      "\n            Reloading: "+wBonus[1][1]+
      "\n            Critical: "+wBonus[1][2]+
      "\n    Weapon 3: "+document.getElementById("weaponSelect3").value+
      "\n        Bonuses:\n            Accuracy: "+wBonus[2][0]+
      "\n            Reloading: "+wBonus[2][1]+
      "\n            Critical: "+wBonus[2][2]+
      "\n\nImplants:\n    "+document.getElementById("implantSelect1").value+
      "\n    "+document.getElementById("implantSelect2").value+
      "\n    "+document.getElementById("implantSelect3").value+
      "\n    "+document.getElementById("implantSelect4").value+
      "\n    "+document.getElementById("implantSelect5").value+
      "\n    "+document.getElementById("implantSelect6").value+
      "\n    "+document.getElementById("implantSelect7").value+
      "\n    "+document.getElementById("implantSelect8").value+
      "\n    "+document.getElementById("implantSelect9").value+
      "\n    "+document.getElementById("implantSelect10").value+
      "\n    "+document.getElementById("implantSelect11").value+
      "\n    "+document.getElementById("implantSelect12").value+
      "\n    "+document.getElementById("implantSelect13").value+
      "\n    "+document.getElementById("implantSelect14").value+
      "\n    "+document.getElementById("implantSelect15").value+
      "\n    "+document.getElementById("implantSelect16").value+
      "\n\nBoosts:\n    Special Boosts:\n        Gold Membership: "+sessionValues[3][0]+
      "\n        Ultra Boost: "+sessionValues[3][1]+
      "\n    Clan Boosts:\n        Experience: "+sessionValues[0][12]+
      "%\n        PVP Points: "+sessionValues[0][13]+
      "%\n        Damage: "+sessionValues[0][14]+
      "%\n        Incoming Damage Reduction: "+sessionValues[0][15]+
      "%\n        Weapon Loot Chance: "+sessionValues[0][16]+
      "%\n        Armor Loot Chance: "+sessionValues[0][17]+
      "%\n        Cash Loot Amount: "+sessionValues[0][18]+
      "%\n        Ammo Loot Amount: "+sessionValues[0][19]+
      "%\n        Search Speed: "+sessionValues[0][20]+
      "%\n        Loot Spots: "+sessionValues[0][21]+
      "\n\nTotal Boosts:\n    Experience: "+boosts[3][0]+
      "%\n    PVP Points: "+boosts[3][1]+
      "%\n    Damage: "+boosts[3][2]+
      "%\n    Speed: "+boosts[3][3]+
      "%\n    Incoming Damage Reduction: "+boosts[3][4]+
      "%\n    Weapon Loot Chance: "+boosts[3][5]+
      "%\n    Armor Loot Chance: "+boosts[3][6]+
      "%\n    Cash Loot Amount: "+boosts[3][7]+
      "%\n    Ammo Loot Amount: "+boosts[3][8]+
      "%\n    Search Speed: "+boosts[3][9]+
      "%\n    Loot Spots: "+boosts[3][10]+"%"
    ], {type: "text/plain"});
  const fileHandle = await window.showSaveFilePicker(
    {
      types:[
        {
          description: "Text file",
          accept: {"text/plain": [".txt"]}
        }
      ]
    }
  );
  const fileStream = await fileHandle.createWritable();
  await fileStream.write(data);
  await fileStream.close();
};
//#endregion
//#region Listeners
for(let i = 0; i < collapseColl.length; i++)
{
  collapseColl[i].addEventListener("click", function()
  {
    collapse(this);
  });
};
for(let i = 0; i < buttonColl.length; i++)
{
  buttonColl[i].addEventListener("click", function()
  {
    if(this.id == "buildHelpOpen" || this.id == "buildHelpClose")
    {
      buildHelp(this);
    } else if(this.id == "classHelpOpen" || this.id == "classHelpClose")
    {
      classHelp(this);
    } else if(this.id.includes("Reset") || this.id == "dialogueCancel" || this.id == "dialogueConfirm")
    {
      resetHandler(this);
    } else if(this.id == "impLock")
    {
      imps();
    } else if(this.id == "save")
    {
      save();
    };
  });
};
//#endregion