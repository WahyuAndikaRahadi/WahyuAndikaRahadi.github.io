// JavaScript Document

let textArea = document.getElementById("textArea");
let btn = document.getElementsByTagName("button")[0];
let btn2 = document.getElementsByTagName("button")[1];

btn.addEventListener("click", function () {
  if (textArea.value == "") {
    alert("Gak boleh kosong!");
  } else {
    responsiveVoice.speak(
      textArea.value,

      "Indonesian Male",
      {
        pitch: 1,
        rate: 1,
        volume: 1,
      }
    );
  }
});

btn2.addEventListener("click", function () {
  if (textArea.value == "") {
    alert("Gak boleh kosong!");
  } else {
    responsiveVoice.speak(
      textArea.value,

      "Indonesian Female",
      {
        pitch: 1,
        rate: 1,
        volume: 1,
      }
    );
  }
});