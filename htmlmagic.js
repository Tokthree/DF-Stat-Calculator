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
function collapse()
{
  this.classList.toggle("active");
  const content = this.nextElementSibling;
  if(content.style.maxHeight)
  {
    content.style.maxHeight = null;
  } else
  {
    content.style.maxHeight = content.scrollHeight + "px";
  };
};
function buildHelp()
{
  switch(this.id)
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
function classHelp()
{
  switch(this.id)
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
function resetHandler()
{
  switch (this.id)
  {
    case 'dialogueCancel':
      document.getElementById("dialogue").style.visibility = "collapse";
      break;
    case 'dialogueConfirm':
      document.getElementById("dialogue").style.visibility = "collapse";
      reset();
      break;
    default:
      dialogueOpen = this.id;
      document.getElementById("dialogue").style.visibility = "visible";
      break;
  };
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
//#endregion
//#region Listeners
for(let i = 0; i < collapseColl.length; i++)
{
  collapseColl[i].addEventListener("click", function()
  {
    collapse.call(this);
  });
};
for(let i = 0; i < buttonColl.length; i++)
{
  buttonColl[i].addEventListener("click", function()
  {
    if(this.id == "buildHelpOpen" || this.id == "buildHelpClose")
    {
      buildHelp.call(this);
    } else if(this.id == "classHelpOpen" || this.id == "classHelpClose")
    {
      classHelp.call(this);
    } else if(this.id.includes("Reset") || this.id == "dialogueCancel" || this.id == "dialogueConfirm")
    {
      resetHandler.call(this);
    } else if(this.id == "impLock")
    {
      imps();
    };
  });
};
//#endregion