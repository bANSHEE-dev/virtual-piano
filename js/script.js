const piano = document.querySelector('.piano');
const pianoКeys = document.querySelectorAll('.piano-key');
const audio = document.querySelector('audio');
const button = document.querySelector('button');
const fullScreenBtn = document.querySelector('.openfullscreen');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');
const keys = document.querySelectorAll(".key");


// Переключение с букв на ноты. *****************************************

btnNotes.addEventListener('click', (btn) => {
  btn.target.classList.add('btn-active');
  btnLetters.classList.remove('btn-active');
  pianoКeys.forEach(key => {
    key.classList.remove('piano-list-letters')
    key.classList.remove('letters')
  })
});

btnLetters.addEventListener('click', (btn) => {
  btn.target.classList.add('btn-active');
  btnNotes.classList.remove('btn-active');
  pianoКeys.forEach(key => {
    key.classList.remove('piano-list-letters')
    key.classList.add('letters')
  })

});
//**********************************************************************

//Действия при нажатии/зажатии мышки.
const startSound = (event) => {
  event.target.classList.add("active");
};
const stopSound = (event) => {
  event.target.classList.remove("active");
};

const startCorrespondOver = (event) => {
  event.target.classList.add("active");
  pianoКeys.forEach((elem) => {
    elem.addEventListener("mouseover", startSound)
    elem.addEventListener("mouseout", stopSound)
  });
}

const stopCorrespondOver = () => {
  pianoКeys.forEach((elem) => {
    elem.classList.remove("active");
    elem.removeEventListener("mouseover", startSound)
    elem.removeEventListener("mouseout", stopSound)
  });
}



//******************************************************************************************************

//Fullscreen method
document.querySelector('.openfullscreen').addEventListener("click", toggleScreen);
function toggleScreen() {
  if (document.fullscreenElement === null) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
  }
}
//*******************************************************************************************************



//Играем по нотам

keys.forEach(pianoКeys => {
  pianoКeys.addEventListener("click", () => playNote(pianoКeys))
})

function playNote(pianoКeys) {
  const noteAudio = document.getElementById(pianoКeys.dataset.note)
  noteAudio.currentTime = 0;
  noteAudio.play(pianoКeys);

}


// Используем кнопки клавы

function noteAudio() {
  audio.currentTime = 0;
  audio.play();
}
// piano.addEventListener('click', noteAudio);



window.addEventListener('keydown', (event) => {
  if (event.code === 'KeyD' || event.code === 'KeyF' || event.code === 'KeyG' || event.code === 'KeyH' || event.code === 'KeyJ' || event.code === 'KeyK' || event.code === 'KeyL'
    || event.code === 'KeyR' || event.code === 'KeyT' || event.code === 'KeyU' || event.code === 'KeyI' || event.code === 'KeyO') {
    const note = event.target.dataset.note;
    const src = `./assets/audio/${note}.mp3`;
    noteAudio(src);
    event.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
  }
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

//подсвет клавиш
piano.addEventListener('click', (event) => {
  if (event.target.classList.contains('piano-key')) {
    pianoКeys.forEach((el) => {
      if (el.classList.contains('active')) {
      } else {
        el.classList.remove('piano-key-active');
      }
    });
    event.target.classList.add('piano-key-active');
  }
});





//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//************************************************************************

piano.addEventListener("mousedown", startCorrespondOver, false);
piano.addEventListener("mouseup", stopCorrespondOver);