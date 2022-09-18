$(document).ready(function () {
    const collapseColl = document.getElementsByClassName("collapsible");
    const buttonColl = document.querySelectorAll('input[type=button]');
    let i;
    let buildOpen = false;
    let classOpen = false;

    for (i = 0; i < collapseColl.length; i++) {
      collapseColl[i].addEventListener("click", function() {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        };
    });
    };

    for (i = 0; i < buttonColl.length; i++) {
      buttonColl[i].addEventListener("click", function() {
        if (this.id == "buildHelpOpen") {
          if (buildOpen == true) {
            document.getElementById("buildHelp").style.visibility = "collapse";
            buildOpen = false;
          } else {
            document.getElementById("classHelp").style.visibility = "collapse";
            classOpen = false;
            document.getElementById("buildHelp").style.visibility = "visible";
            buildOpen = true;
          };
        } else if (this.id == "buildHelpClose") {
          document.getElementById("buildHelp").style.visibility = "collapse";
          classOpen = false;
        } else if (this.id == "classHelpOpen") {
          if (classOpen == true) {
            document.getElementById("classHelp").style.visibility = "collapse";
            classOpen = false;
          } else {
            document.getElementById("buildHelp").style.visibility = "collapse";
            buildOpen = false;
            document.getElementById("classHelp").style.visibility = "visible";
            classOpen = true;
          };
        } else if (this.id == "classHelpClose") {
          document.getElementById("classHelp").style.visibility = "collapse";
          classOpen = false;
        };
      });
    };
});