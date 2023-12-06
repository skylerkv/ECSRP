
var x = 0;
var backup = {};
backup.fontWeight = document.getElementById("textarea1").style.fontWeight = "normal";
backup.fontStyle = document.getElementById("textarea1").style.fontStyle = "normal";

function f1(){
  if (x == 0) {
    document.getElementById("textarea1").style.fontWeight = "bold";
    x = 1;
  } else {
    document.getElementById("textarea1").style.fontWeight = "normal";
    x = 0;
  }
  
  }
  function f2(){
  if (x == 0) {
    document.getElementById("textarea1").style.fontStyle = "italic";
    x = 1;
  } else {
    document.getElementById("textarea1").style.fontStyle = "normal";
    x = 0;
  }
  
  }
  function f3(){
  
    document.getElementById("textarea1").style.textAlign = "left";
  
  }
  function f4(){
  
    document.getElementById("textarea1").style.textAlign = "center";
  
  }
  function f5(){
  
    document.getElementById("textarea1").style.textAlign = "right";
  
  }
  
  function f6(){
  
    document.getElementById("textarea1").style.textTransform = "uppercase";
  
  }
  function f7(){
  
    document.getElementById("textarea1").style.textTransform = "lowercase";
  
  }
  function f8(){
  
    document.getElementById("textarea1").style.textTransform = "capitalize";
  
  }
  function f9(){
  
    document.getElementById("textarea1").style.fontWeight = "normal";
    document.getElementById("textarea1").style.textAlign = "left";
    document.getElementById("textarea1").style.fontStyle = "normal";
    document.getElementById("textarea1").style.textTransform = "capitalize";
    document.getElementById("textarea1").value=" ";
  
  }
  
  function f10() {
    const content = document.getElementById("textarea1").value;
    var save = document.createElement("a");
    save.setAttribute("href", "data:text/plain;charset=umenttttf-8," + encodeURI(content));
    save.setAttribute("download", content.slice(0, 17) + ".txt");
  
    document.body.appendChild(save);
    save.click();
    document.body.removeChild(save);
  }