var speech = new SpeechSynthesisUtterance();
var voices = [];

function populateVoices() {
  voices = window.speechSynthesis.getVoices();
  var voiceSelect = document.querySelector("#voiceSelect");
  voiceSelect.innerHTML = '';

  voices.forEach((voice, i) => {
    var option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.setAttribute("data-index", i);
    voiceSelect.appendChild(option);
  });
}

populateVoices();
window.speechSynthesis.onvoiceschanged = populateVoices;

document.querySelector("button").addEventListener("click", () => {
  var textArea = document.querySelector("textarea");
  if (textArea.value.trim() === '') {
    alert("Please enter some text to speak.");
    return;
  }

  var selectedVoiceIndex = parseInt(document.querySelector("#voiceSelect").selectedOptions[0].getAttribute("data-index"));
  speech.voice = voices[selectedVoiceIndex];
  speech.text = textArea.value;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
});
