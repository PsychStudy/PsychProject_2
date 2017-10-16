var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update});

var s1 = [
  "Instructions:",
  "You will be generated a number between 0 and 100, with 0 being unlucky,",
  "50 being average, and 100 being lucky.",
  "To win, you must choose to keep your number, or re-roll for the chance",
  "of a higher number.",
  "Your number will be compared to another random number; If your number is higher,",
  "then you win. Your luck will be calculated at the end.",
  " ",
  "Good Luck!"
];

var gradLeft;
var gradRight;
var okayT;
var line = [];
var wordIndex = 0;
var lineIndex = 0;
var wordDelay = 20;
var lineDelay = 100;
var stage1 = 0;
var stage1Check = 0;
var stage1Int = 0;
var stage2 = 0;
var stage2Check = 0;
var stage2Int = 0;
var stage3 = 0;
var beginButton;

var pNum;
var pNumInt;
var keepText;
var rollText;
var newIntText;
var newIntText2;
var choice = 0;
var choice1Text;
var choice2Text;

var winText;
var luckText;
var continueButton;
var contText;
var endPic;
var replayButton;
var replayText;

function preload() {

   game.load.image('button', 'resources/pButton.png');
   game.load.image('hat', 'resources/hat2.png');
   game.load.image('gradiant', 'resources/gradiant.png');

}

function create() {
  game.stage.backgroundColor = '#ff770f';

  gradLeft = game.add.sprite(1180, 0, 'gradiant');
  gradRight = game.add.sprite(0, 0, 'gradiant');
  gradRight.anchor.set(0.5, 0.5);
  gradRight.scale.x *= -1;
  gradRight.scale.y *= -1;

  gradRight.anchor.set(1, 1);


  intro = game.add.text(132, 32, '', {font:"30px Arial", fill: "#000000"});
    nextLine();

  beginButton = game.add.button(game.world.centerX - 175, game.world.centerY + 100, 'button', hideIntro, this, 1, 1, 1, 1);


  okayT = game.add.text(game.world.centerX - 30, game.world.centerY + 150, 'Okay', {font: "30px Ariel", fill: "#000000"});


  keepButton = game.add.button(100, game.world.centerY + 100, 'button', hold, this, 1, 1, 1, 1);
  rollButton = game.add.button(830 , game.world.centerY + 100, 'button', reroll, this, 1, 1, 1, 1)
  keepButton.visible = false;
  rollButton.visible = false;
  keepText = game.add.text(155, game.world.centerY + 150, "Keep This Amount", {font: "30px Ariel", fill: "#000000"});
  rollText = game.add.text(880, game.world.centerY + 150, "Roll A New Amount", {font: "30px Ariel", fill: "#000000"});
  keepText.visible = false;
  rollText.visible = false;

  continueButton = game.add.button(game.world.centerX, game.world.centerY + 260, 'button', cont, this, 1, 1, 1, 1);
  continueButton.anchor.set(0.5);
  continueButton.visible = false;

  replayButton = game.add.button(game.world.centerX, game.world.centerY + 260, 'button', resetInts, this, 1, 1, 1, 1);
  replayButton.anchor.set(0.5);
  replayText = game.add.text(game.world.centerX, game.world.centerY + 250, "Replay", {font: "30px Ariel", fill: "#000000"});
  replayText.anchor.set(0.5);
  replayButton.visible = false;
  replayText.visible = false;

  choice1Text = game.add.text(100, 10, "You chose to hold:", {font: "30px Ariel", fill: "#000000"});
  choice1Text.visible = false;
  choice2Text = game.add.text(100, 10, "You chose to roll again:", {font: "30px Ariel", fill: "#000000"});
  choice2Text.visible = false;

}



function update() {
  //Set Stage 1 Number
  if(stage1 === 1){
    stage1Int = game.rnd.integerInRange(90, 98);
    stage1 = 2;
  }

  //Get Stage 1 Number
  if(stage1 === 2 && stage1Check === 1){
        pNum = game.add.text(game.world.centerX, game.world.centerY - 300, 'Your Number', {font: "60px Ariel", fill: "#000000"});
        pNum.anchor.set(0.5);
        pNumInt = game.add.text(game.world.centerX, game.world.centerY - 230, stage1Int, {font: "110px Ariel", fill: "#000000"});
        pNumInt.anchor.set(0.5);
        keepButton.visible = true;
        rollButton.visible = true;
        keepText.visible = true;
        rollText.visible = true;
        stage1Check = 2;
        stage2Check = 1;
  }
  //Report Win
  if(stage2 === 1 && stage2Check === 2){
      keepButton.visible = false;
      rollButton.visible = false;
      keepText.visible = false;
      rollText.visible = false;

      if(choice === 1){
        choice1Text.visible = true;
      }else if(choice === 2){
        choice2Text.visible = true;
      }

      newIntText = game.add.text(game.world.centerX, game.world.centerY - 30, "New Number", {font: "60px Ariel", fill: "#000000"});
      newIntText.anchor.set(0.5);
      newIntText2 = game.add.text(game.world.centerX, game.world.centerY + 40, stage2Int, {font: "110px Ariel", fill: "#000000"});
      newIntText2.anchor.set(0.5);
      continueButton.visible = true;
      contText = game.add.text(game.world.centerX, game.world.centerY + 250, "Continue", {font: "30px Ariel", fill: "#000000"});
      contText.anchor.set(0.5);

      stage2 = 2;
  }



}

function nextLine(){
  if(lineIndex === s1.length){
    return;
    showBegin = 1;
  }

  line = s1[lineIndex].split('');
  wordIndex = 0;

  game.time.events.repeat(wordDelay, line.length, nextWord, this);

  lineIndex++;
}

function nextWord(){
  intro.text = intro.text.concat(line[wordIndex] + '');

  wordIndex++;

  if(wordIndex === line.length){
    intro.text = intro.text.concat("\n");

    game.time.events.add(lineDelay, nextLine, this);
  }
}

function hideIntro(){
    beginButton.visible = false;
    okayT.destroy();
    intro.visible = false;
    stage1 = 1;
    stage1Check = 1;
}

  function hold(){
    choice = 1;
    stage2Int = game.rnd.integerInRange(95, 99);
    while(stage2Int > stage1Int || stage2Int === stage1Int){
      stage2Int = game.rnd.integerInRange(50, 98);
    }
    stage2 = 1;
    stage2Check = 2;
  }

  function reroll(){
    choice = 2;
    stage2Int = game.rnd.integerInRange(95, 98);
    while(stage2Int < stage1Int || stage2Int === stage1Int){
      stage2Int = game.rnd.integerInRange(stage1Int, 99);
    }
    stage2 = 1;
    stage2Check = 2;
  }

  function cont(){
    continueButton.visible = false;
    pNum.visible = false;
    pNumInt.visible = false;
    newIntText.visible = false;
    newIntText2.visible = false;
    contText.visible = false;
    choice1Text.visible = false;
    choice2Text.visible = false;

    winText = game.add.text(game.world.centerX , game.world.centerY - 300, "You Win!", {font: "80px Ariel", fill: "#000000"});
    winText.anchor.set(0.5);
    luckText = game.add.text(game.world.centerX, game.world.centerY - 150, "Your are Very Lucky", {font: "60px Ariel", fill: "#000000"});
    luckText.anchor.set(0.5);
    endPic = game.add.sprite(game.world.centerX, game.world.centerY + 30, 'hat');
    endPic.anchor.set(0.5);

    replayButton.visible = true;
    replayText.visible = true;
  }

  function resetInts(){
    winText.visible = false;
    luckText.visible = false;
    endPic.visible = false;
    replayText.visible = false;
    replayButton.visible = false;
    stage1 = 1;
    stage1Check = 1;
    stage2 = 0;
    stage2Check = 0;
    stage3 = 0;
  }
