let start_button = document.getElementById('start_button');
let restart_button = document.getElementById('restart_button');
let false_answer = document.getElementById('false_answer');
let true_answer = document.getElementById('true_answer');
let questions = document.getElementById('questions');
let answer = document.getElementById('answer');
let sound_true = document.getElementById('sound_true');
let sound_false = document.getElementById('sound_false');

let isStarted = false;

answer.setAttribute('disabled','disabled');

// Boshlash tugmasi
start_button.addEventListener('click', () => {
    isStarted = true;
    kopaytma();
    answer.removeAttribute('disabled');
    answer.focus();
});

// Qayta boshlash tugmasi
restart_button.addEventListener('click', () => {
    isStarted = true;
    true_answer.innerHTML = 0;
    false_answer.innerHTML = 0;
    kopaytma();
    answer.removeAttribute('disabled');
    answer.focus();
});

// Enter bosilganda javobni tekshirish
window.addEventListener('keyup', (e)=>{
    if(!isStarted) return; 
    if(e.code=='Enter' || e.code =='NumpadEnter'){
        if(answer.value.trim() === '') return; 

        let local_num1 = Number(localStorage.getItem('kopaytma_num1'));
        let local_num2 = Number(localStorage.getItem('kopaytma_num2'));
        let user_answer = Number(answer.value);

        if(local_num1 * local_num2 === user_answer){
            true_answer.innerHTML = +true_answer.innerHTML + 1;
            sound_true.play(); // ✅ to‘g‘ri javob ovozi
        } else {
            false_answer.innerHTML = +false_answer.innerHTML + 1;
            sound_false.play(); // ❌ noto‘g‘ri javob ovozi
        }

        answer.value = '';
        kopaytma();
    }
})

function kopaytma() {
    let num1 = Math.floor(2 + Math.random() * 9);
    let num2 = Math.floor(2 + Math.random() * 9);
    questions.innerHTML = `${num1} * ${num2}=?`;
    localStorage.setItem('kopaytma_num1', num1);
    localStorage.setItem('kopaytma_num2', num2);
}


// Sichqoncha o‘ng tugmasini bloklash
document.addEventListener("contextmenu", e => e.preventDefault());

// Sichqoncha chap tugmasini (ba’zi joylarda) bloklash
document.addEventListener("mousedown", e => {
  if (e.button === 0) e.preventDefault(); // chap tugma
});

// Tugmalarni bloklash
document.addEventListener("keydown", e => {
  // F12
  if (e.key === "F12") e.preventDefault();

  // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+U / Ctrl+S
  if (e.ctrlKey && e.shiftKey && ["I","J"].includes(e.key.toUpperCase())) e.preventDefault();
  if (e.ctrlKey && ["U","S","C"].includes(e.key.toUpperCase())) e.preventDefault();
});