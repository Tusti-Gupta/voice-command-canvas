screen_width = 0;
screen_height = 0;
var apple, speak_data, to_number;

x = 0;
y = 0;

draw_apple = "";

function preload() {
  apple = loadImage("apple.png");
}

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 

 content = event.results[0][0].transcript;

 to_number = Number(content);

document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 

if (Number.isInteger(to_number)) {
  document.getElementById("status").innerHTML = "Started drawing apple";
  draw_apple = "set";
} else {
  document.getElementById("status").innerHTML = "Speech has not recognized number";
}

}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas = createCanvas(screen_width, screen_height - 150);
  canvas.position(0, 150)
}

function draw() {
  if(draw_apple == "set")
  {
    for (i=1; i<=to_number; i++) {
      x = Math.floor(Math.random(screen_width));
      y = Math.floor(Math.random(screen_height));
      image(apple, x, y, 50, 50);
      speak_data = to_number + "apples are drawn";
      speak();
  }
  document.getElementById("status").innerHTML = to_number + " Apples drawn";
  draw_apple = "";
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
