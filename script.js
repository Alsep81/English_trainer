function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
/*Загружаем массив слов
*/
async function load (){
let response = await fetch('db.json');
let dict= await response.json();

answ_btns = document.querySelectorAll('.varbtns');
questtion_div = document.getElementById('question');
corr_answ_counter = document.getElementById('corr_answ');
total_counter = document.getElementById('total');
//Getting random word index
numberOfWords = Object.keys(dict['english_word']).length;
CurrQuestIndex = String(randomInteger(1, numberOfWords));
//Showing english word in question_div
questtion_div.innerHTML = dict['english_word'][CurrQuestIndex];

//Creating array of answers
CorrectAnswer = dict['rus_translation'][CurrQuestIndex];
CorrectAnswerBtnIndex =  randomInteger(1, 4) - 1;
CurMassIndex = 0;
AnswMass = [];
while (CurMassIndex <= 3) {
  CurrVarInd =  String(randomInteger(1, numberOfWords));
  //console.log(CurrVarInd);
  if (CurrVarInd !== CurrQuestIndex &&  AnswMass.indexOf(dict['rus_translation'][CurrVarInd]) == -1){
   if (CurMassIndex  !== CorrectAnswerBtnIndex){
    AnswMass[CurMassIndex] = dict['rus_translation'][CurrVarInd];
    CurMassIndex = CurMassIndex + 1;
  }else{

    AnswMass[CurMassIndex] = CorrectAnswer;
    CurMassIndex = CurMassIndex + 1
  }
  }
}

/* console.log(AnswMass);
console.log(CurrQuestIndex);
console.log(dict['rus_translation'][CurrQuestIndex]) */

var s=0;
answ_btns.forEach(function(x) {
x.innerHTML =AnswMass[s]
s++;
})

varbtn_div = document.getElementById('varbtn_div');
varbtn_div.onclick = function(event) {
  let target = event.target; // где был клик?

  if (target.tagName != 'BUTTON') return; // не на button? тогда не интересует
  //Analizing current Answer
  total_counter.innerHTML = Number(total_counter.innerHTML) + 1;
  CurAnswer = target.innerHTML;
  if (CurAnswer == CorrectAnswer) {
        corr_answ_counter.innerHTML = Number(corr_answ_counter.innerHTML) + 1;
  }

  load();
}
};



load();
