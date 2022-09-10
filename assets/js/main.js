(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  new Swiper('.testimonials-slider', {
    speed: 800,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()






// test2

var questions = [{
  question: "1. How old are you?",
  answer: "D) I am 27 years old",
  options: [
    "A) I have 27 years old",
    "B) I have 27 years",
    "C) I am fine",
    "D) I am 27 years old",
  ]
},
{
  question: "2. He went to the Stadium .....",
  answer: "B) by taxi",
  options: [
    "A) with taxi",
    "B) by taxi",
    "C) on taxi",
    "D) in taxi",
  ]
}, {
  question: "3. How long have you been living in London?",
  answer: "A) for 7 years",
  options: [
    "A) for 7 years",
    "B) at least 7 years",
    "C) since 7 years",
    "D) 7 years ago",
  ]
}, {
  question: "4. We haven't got ..... money.",
  answer: "C) any",
  options: [
    "A) a lot",
    "B) some",
    "C) any",
    "D) many",
  ]
}, {
  question: "5. FIND CORRECT ANSWER",
  answer: "B) He likes going to the movies",
  options: [
    "A) He like going to the movies",
    "B) He likes going to the movies",
    "C) He liked go to the movies",
    "D)  He like the movies",
  ]
}, {
  question: "6. Peter ..... fly to San Francisco tomorrow.",
  answer: "C) is going to",
  options: [
    "A) to going",
    "B) goes to",
    "C) is going to",
    "D) go to",
  ]
}, {
  question: "7. He plays soccer .....",
  answer: "A) on Wednesdays",
  options: [
    "A) on Wednesdays",
    "B) in Wednesdays",
    "C) at Wednesdays",
    "D) by Wednesdays",
  ]
}, {
  question: "8. .... some more coffee?",
  answer: "D) Would you like?",
  options: [
    "A) Do you?",
    "B) Do you like?",
    "C) You'd like",
    "D) Would you like?",
  ]
},

]
questions_temp = {
  question: "",
  answer: "",
  options: ""
}

var quizHeader = document.getElementById("quizHeader")
var quizBody = document.getElementById("quizBody")
var qNum = 0
var answers = [] //array to show the correct answers and false ones
var minutes = 0
var seconds = 0
var formattedMinutes = 0
var formattedSeconds = 0
var interval = 0

function startQuiz() {
  document.getElementById("mainBody").style.display = "flex"
  document.getElementById("startBtn").style.display = "none"

  appendQuestion()
  interval = setInterval(function () {
    if (seconds < 59) seconds++
    else {
      seconds = 0
      if (minutes < 59) minutes++
      else {
        minutes = 0
        clearInterval(interval)
      }
    }
    formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    document.getElementById("timer").innerHTML = `${formattedMinutes}:${formattedSeconds}`
  }, 1000)
}

function appendQuestion() {
  quizHeader.innerHTML = `<h6 class='quizHeader'>${qNum + 1}/${questions.length}</h6><span id='timer'${minutes}:${seconds}</span>`
  var divBody = `<h6 class='quizHeader'>Question: ${questions[qNum].question}</h6>`
  divBody += "<ul class='option_group' id='option_group'>"
  for (var i = 0; i < questions[qNum].options.length; i++)
    divBody += `<li class='option' onclick='activeOpt(this)'>${questions[qNum].options[i]}</li>`
  divBody += "</ul>"
  divBody += "<button class='btn btn-primary nxtBtn' onclick='nxtQuestion()'>Next question</button>"
  quizBody.innerHTML = divBody
}

function activeOpt(id) {
  var ul = document.getElementById("option_group")
  for (var i = 0; i < questions[qNum].options.length; i++) {
    if (ul.childNodes[i].className === 'active')
      ul.childNodes[i].classList.remove('active')
    ul.childNodes[i].className = 'option'
  }
  id.className = 'active'
  if (id.innerHTML === questions[qNum].answer) answers[qNum] = true
  else answers[qNum] = false
}

function nxtQuestion() {
  if (!(typeof answers[qNum] === 'undefined')) {
    if (qNum < questions.length - 1) {
      qNum++
      appendQuestion()
    } else {
      qNum = 0
      appendResult()
    }
  } else alert("Iltimos javoblardan birini tanglang!")
}

function appendResult() {
  var correctQuestions = 0
  document.getElementById("exitBtn").style.display = "none"
  clearInterval(interval)
  quizHeader.innerHTML = "<h3>Result</h3>"
  quizHeader.style.justifyContent = "center"
  var divBody = "<Table class='table table-bordered'><thead class='thead-dark'>"
  for (var i = 0; i < questions.length; i++) divBody += `<th>${i + 1}</th>`
  divBody += "</thead><tbody>"
  for (var i = 0; i < questions.length; i++) {
    if (answers[i]) {
      divBody += "<td><img style='width:20px' src='./assets/img/correct.png'></td>"
      correctQuestions++
    } else divBody += "<td><img style='width:20px' src='./assets/img/mistake.jpeg'></td>"
  }
  divBody += "</tbody></table>"
  divBody += "<Table class='table table-bordered'><thead class='thead-dark'>"
  divBody += "<th>Points</th>"
  divBody += "<th>Percentage</th>"
  divBody += "<th>Time</th>"
  divBody += "</thead></tbody>"
  divBody += `<td>${correctQuestions}/${questions.length}</td>`
  divBody += `<td>${(correctQuestions / questions.length) * 100}%</td>`
  divBody += `<td>${formattedMinutes}:${formattedSeconds}</td>`
  divBody += "</tbody></table>"
  divBody += "<button class='btn btn-primary rstBtn' onclick='window.location.reload()'>MAIN</button>"
  quizBody.innerHTML = divBody
}







// {
//   question: "9. I wanted a green shirt but they only had .....",
//   answer: " ",
//   options: [
//     "A) a one white",
//     "B) one white",
//     "C) a white",
//     "D) a white one",
//   ]
// }, {
//   question: "10. He ..... never been to America.",
//   answer: " ",
//   options: [
//     "A) does",
//     "B) has",
//     "C) haven't",
//     "D) hadn't",
//   ]
// }, {
//   question: "11. FIND CORRECT ANSWER",
//   answer: " ",
//   options: [
//     "A) Richard usually arrives late",
//     "B)  Richard late arrives usually",
//     "C)  Richard late usually arrives",
//     "D)  Richard usually late arrives",
//   ]
// }, {
//   question: "12. The house was empty. There ..... there.",
//   answer: " ",
//   options: [
//     "A) wasn't nobody",
//     "B)  was anybody",
//     "C)  was somebody",
//     "D)  was nobody",
//   ]
// }, {
//   question: "13. If I were rich, I ..... buy a house on the beach.",
//   answer: " ",
//   options: [
//     "A) will",
//     "B) would",
//     "C) should",
//     "D) wish",
//   ]
// }, {
//   question: "14. When she arrived, he .....",
//   answer: " ",
//   options: [
//     "A) already left",
//     "B)  has already left",
//     "C)  had already left",
//     "D)  left",
//   ]
// }, {
//   question: "15. I forgot ..... the lights before I left.",
//   answer: " ",
//   options: [
//     "A)to turn off",
//     "B) put off",
//     "C) turning off",
//     "D) shot",
//   ]
// }, {
//   question: "16. By the time you finish the class I .....",
//   answer: " ",
//   options: [
//     "A) will have left",
//     "B)  leave",
//     "C)  going to leave",
//     "D)  would left",
//   ]
// }, {
//   question: "17. The room can't be dirty she .....",
//   answer: " ",
//   options: [
//     "A) is just clean it.",
//     "B) have just cleaned it.",
//     "C) just clean it.",
//     "D) has just cleaned it.",
//   ]
// }, {
//   question: "18. He plays soccer, ..... ?",
//   answer: " ",
//   options: [
//     "A) don't he?",
//     "B) does he?",
//     "C) isn't he?",
//     "D) doesn't he?",
//   ]
// }, {
//   question: "19. If only I ..... to the party instead of staying at home.",
  // answer: " ",
  // options: [
  //   "A)  went",
  //   "B)  had gone",
  //   "C)  did go",
  //   "D)  have gone",
//   ]
// }
// {
//   question: "20. Has Mrs. Smith arrived ..... ?",
//   answer: " ",
//   options: [
//     "A) yet",
//     "B)  still",
//     "C)  now",
//     "D)  already",
//   ]
// }, {
//   question: "21. Wendy is ..... Paul to get up now.",
//   answer: " ",
//   options: [
//     "A) telling",
//     "B) saying",
//     "C) saying to",
//     "D) telling to",
//   ]
// }, {
//   question: "22. Have you sent that letter to Mr. Taylor? Yes, I've ..... done that.",
//   answer: " ",
//   options: [
//     "A) still",
//     "B)  yet",
//     "C)  already",
//     "D)  now",
//   ]
// }, {
//   question: "23. It's no use ..... to him. He doesn't listen.",
//   answer: " ",
//   options: [
//     "A) speaking",
//     "B) to speak",
//     "C) spoke",
//     "D) have spoken",
//   ]
// }, {
//   question: "24. This is the girl ..... I met on Thursday.",
//   answer: " ",
//   options: [
//     "A) whom",
//     "B)  which",
//     "C)  what",
//     "D)  -----",
//   ]
// }, {
//   question: "25. ..... is your house from here?",
//   answer: " ",
//   options: [
//     "A) How much",
//     "B) How long",
//     "C) How far",
//     "D) How many",
//   ]
// }, {
//   question: "26. You can watch TV ..... you like.",
//   answer: " ",
//   options: [
//     "A) whenever",
//     "B) soon",
//     "C) always",
//     "D) whatever",
//   ]
// }, {
//   question: "27. This house is quite old. It ..... in 1910.",
//   answer: " ",
//   options: [
//     "A) built",
//     "B)  was built",
//     "C)  build",
//     "D)  has built",
//   ]
// }, {
//   question: "28. She ..... go to school yesterday.",
//   answer: " ",
//   options: [
//     "A) must",
//     "B) had to",
//     "C) ought to",
//     "D) should have",
//   ]
// }, {
//   question: "29. That's the ..... of my worries, it'll never happen.",
//   answer: " ",
//   options: [
//     "A) fewer",
//     "B)  less",
//     "C)  last",
//     "D)  least",
//   ]
// }, {
//   question: "30. Don't ..... me. I'll be back late.",
//   answer: " ",
//   options: [
//     "A) hope for",
//     "B)  waiting for",
//     "C)  expect",
//     "D)  wait for",
//   ]
// }, {
//   question: "31. The lady ..... in the corner is my aunt.",
//   answer: " ",
//   options: [
//     "A) whose",
//     "B)  is sitting",
//     "C)  sits",
//     "D)  sitting",
//   ]
// }, {
//   question: "32. FIND CORRECT ANSWER",
//   answer: " ",
//   options: [
//     "A) He used to play chess very often",
//     "B)  He uses play chess very often",
//     "C)  He was played chess very often",
//     "D)  He didn't playing chess very often",
//   ]
// }, {
//   question: "33. He doesn't like ..... what to do.",
//   answer: " ",
//   options: [
//     "A) told",
//     "B) said",
//     "C) having said",
//     "D) being told",
//   ]
// }, {
//   question: "34. I ..... it doesn't rain tomorrow, I'm going for a picnic.",
//   answer: " ",
//   options: [
//     "A) wait",
//     "B) expect",
//     "C) hope",
//     "D) wish",
//   ]
// }, {
//   question: "35. I thought you .....",
//   answer: " ",
//   options: [
//     "A) will come to the party",
//     "B)  were coming to the party",
//     "C)  come to the party",
//     "D)  have come to the party",
//   ]
// }, {
//   question: "36. He remembers being ..... to the fair as a child.",
//   answer: " ",
//   options: [
//     "A) visited",
//     "B)  brought",
//     "C) taken",
//     "D)  shown",
//   ]
// }, {
//   question: "37. Finishing a course is always .....",
//   answer: " ",
//   options: [
//     "A) satisfying",
//     "B)  satisfaction",
//     "C)  satisfies",
//     "D)  satisfied",
//   ]
// }, {
//   question: "38. She worked hard yesterday and ..... finish everything.",
//   answer: " ",
//   options: [
//     "A) can",
//     "B)  was able to",
//     "C)  is hard",
//     "D)  let",
//   ]
// }, {
//   question: "39. FIND CORRECT ANSWER",
//   answer: " ",
//   options: [
//     "A) Ask her when will be ready the food",
//     "B) Ask her when the food will be ready",
//     "C) Ask her when will the food ready be",
//     "D) Ask her when will be the food ready",
//   ]
// }, {
//   question: "40. FIND CORRECT ANSWER",
//   answer: " ",
//   options: [
//     "A) That's a little beige British proud bulldog",
//     "B)  That's a proud beige little British bulldog",
//     "C)  That's a little proud beige British bulldog",
//     "D)  That's a proud little beige British bulldog",
//   ]
// }, {
//   question: "41. I wish I ..... a car, I'm tired of catching the bus.",
//   answer: " ",
//   options: [
//     "A) have",
//     "B)  had",
//     "C)  would have",
//     "D)  had had",
//   ]
// }, {
//   question: "42. Peter can eat ..... as twenty oranges in one sitting.",
//   answer: " ",
//   options: [
//     "A) so many",
//     "B) so much",
//     "C) as many",
//     "D) as much",
//   ]
// }, {
//   question: "43. I know he didn't thank you, but he .... have done so.",
//   answer: " ",
//   options: [
//     "A) should",
//     "B)  may",
//     "C)  must",
//     "D)  would",
//   ]
// }, {
//   question: "44. I won't go to the cinema ..... you come with me.",
//   answer: " ",
//   options: [
//     "A) except",
//     "B)  otherwise",
//     "C)  unless",
//     "D)  therefore",
//   ]
// }, {
//   question: "45. He wrote the letter ..... , he didn't need anybody's help.",
//   answer: " ",
//   options: [
//     "A) on his own",
//     "B)  by his own",
//     "C)  on himself",
//     "D)  by his ownership",
//   ]
// }, {
//   question: "46. Hotel rooms must be ..... by noon.",
//   answer: " ",
//   options: [
//     "A) vacated",
//     "B)  evacuated",
//     "C)  abandoned",
//     "D)  leave",
//   ]
// }, {
//   question: "47. You can take the book with you ..... you give it back.",
//   answer: " ",
//   options: [
//     "A) as well as",
//     "B)  as time as",
//     "C)  as far as",
//     "D)  as long as",
//   ]
// }, {
//   question: "48. Let's go watch the game, .....",
//   answer: " ",
//   options: [
//     "A) will we?",
//     "B)  shall we?",
//     "C)  let us?",
//     "D)  don't we?",
//   ]
// }, {
//   question: "49. I need to finish this ..... Friday.",
//   answer: " ",
//   options: [
//     "A) during",
//     "B)  by",
//     "C)  until",
//     "D)  at",
//   ]
// }, {
//   question: "50. After many years of research, they found the solution .....",
//   answer: " ",
//   options: [
//     "A) at the end",
//     "B)  at last",
//     "C)  by the end",
//     "D)  on the end",
//   ]
// }