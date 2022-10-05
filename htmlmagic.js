const collapseColl = document.getElementsByClassName("collapsible");
const buttonColl = document.querySelectorAll('input[type=button]');
const impSlots = document.querySelectorAll("[id^='implantSelect']");
let i;
let buildOpen = false;
let classOpen = false;
let dialogueOpen = "none";
let impLock = true;
for(i = 0; i < impSlots.length; i++)
{
  impSlots[i].disabled = true;
};
const slotLevel = [15, 25, 35, 50, 65, 80, 95, 120, 145, 170, 195, 220, 245, 270, 295, 325];

//#region Functions
function reset()
{
  switch(dialogueOpen)
  {
    case 'allReset':
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
}
//#endregion

for(i = 0; i < collapseColl.length; i++)
{
  collapseColl[i].addEventListener("click", function()
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
  });
};
for(i = 0; i < buttonColl.length; i++)
{
  buttonColl[i].addEventListener("click", function()
  {
    if(this.id == "buildHelpOpen")
    {
      if(buildOpen == true)
      {
        document.getElementById("buildHelp").style.visibility = "collapse";
        buildOpen = false;
      } else
      {
        document.getElementById("classHelp").style.visibility = "collapse";
        classOpen = false;
        document.getElementById("buildHelp").style.visibility = "visible";
        buildOpen = true;
      };
    } else if(this.id == "buildHelpClose")
    {
      document.getElementById("buildHelp").style.visibility = "collapse";
      classOpen = false;
    } else if(this.id == "classHelpOpen")
    {
      if(classOpen == true)
      {
        document.getElementById("classHelp").style.visibility = "collapse";
        classOpen = false;
      } else
      {
        document.getElementById("buildHelp").style.visibility = "collapse";
        buildOpen = false;
        document.getElementById("classHelp").style.visibility = "visible";
        classOpen = true;
      };
    } else if(this.id == "classHelpClose")
    {
      document.getElementById("classHelp").style.visibility = "collapse";
      classOpen = false;
    } else if(this.id.includes("Reset"))
    {
      dialogueOpen = this.id;
      document.getElementById("dialogue").style.visibility = "visible";
    } else if(this.id == "dialogueCancel")
    {
      document.getElementById("dialogue").style.visibility = "collapse";
    } else if(this.id == "dialogueConfirm")
    {
      document.getElementById("dialogue").style.visibility = "collapse";
      reset();
    } else if(this.id == "impLock")
    {
      let openSlots = 0;
      if(impLock)
      {
        for(i = 0; i < impSlots.length; i++)
        {
          impSlots[i].disabled = false;
        };
        impLock = false;
      } else
      {
        for(i = 0; i < impSlots.length; i++)
        {
          impSlots[i].disabled = true;
        };
        for(i = 0; i < slotLevel.length; i++)
        {
          if(charInfo["level"] >= slotLevel[i])
          {
            openSlots = i + 1;
          };
        };
        for(i = 0; i < openSlots; i++)
        {
          impSlots[i].disabled = false;
        };
        impLock = true;
      };
      impUpdate();
      boostUpdate();
      selectUpdate();
      displayUpdate();
    };
  });
};