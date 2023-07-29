//Smooth Scroll

var navMenuAnchorTags = document.querySelectorAll(".nav-menu a");
var interval;

for (var i = 0; i < navMenuAnchorTags.length; i++) {
  navMenuAnchorTags[i].addEventListener("click", function (event) {
    event.preventDefault();

    var targetSectionID = this.textContent.trim().toLowerCase();
    var targetSection = document.getElementById(targetSectionID);

    // interval = setInterval(scrollVertically, 20, targetSection);
    interval = setInterval(function () {
      scrollVertically(targetSection);
    }, 20);
  });
}

function scrollVertically(targetSection) {
  var targetSectionCoordinates = targetSection.getBoundingClientRect();

  if (
    targetSectionCoordinates.top <= 0 ||
    (targetSection.getAttribute("id") === "contact" &&
      targetSectionCoordinates.top <= 350)
  ) {
    clearInterval(interval);
    return;
  }

  window.scrollBy(0, 50);
}

//Skill Bar Animation
//Handle scroll event on window
//Check if skills section container is visible
//Ensure that initial width of colored skill divs is 0 -> Initialized/Reset to 0
//Start animation on every skill -> Increase skill width from 0 to skill level at regular intervals
//Store skill level -> HTML with the help of data attribute

var progressBars = document.querySelectorAll(".skill-progress > div");
var skillsContainer = document.getElementById("skills-container");
var animationDone = false;
window.addEventListener("scroll", checkScroll);
// window.addEventListener('scroll', checkScrollIndividual);

function initializeBars() {
  for (let bar of progressBars) {
    bar.style.width = 0 + "%";
  }
}

initializeBars();

function fillBars() {
  for (let bar of progressBars) {
    let targetWidth = bar.getAttribute("data-bar-width");
    let currentWidth = 0;
    let interval = setInterval(function () {
      if (currentWidth > targetWidth) {
        clearInterval(interval);
        return;
      }

      currentWidth++;
      bar.style.width = currentWidth + "%";
    }, 3);
  }
}

// function fillIndividualBar(bar) {
//     let targetWidth = bar.getAttribute('data-bar-width');
//     let currentWidth = 0;
//     let interval = setInterval(function() {
//         if(currentWidth > targetWidth) {
//                 clearInterval(interval);
//                 return;
//         }

//         currentWidth++;
//         bar.style.width = currentWidth + '%';
//     }, 5);
// }

//For complete skills section
function checkScroll() {
  //Check whether skills section container is visible
  var coordinates = skillsContainer.getBoundingClientRect();

  if (!animationDone && coordinates.top <= window.innerHeight) {
    fillBars();
    animationDone = true;
  } else if (coordinates.top > window.innerHeight) {
    animationDone = false;
    initializeBars();
  }
}

//For individual skill bar
// function checkScrollIndividual() {
//     //Check whether individual skill bar is visible
//     for(let bar of progressBars) {
//         let coordinates = bar.getBoundingClientRect();

//         if(!animationDone && coordinates.top <= window.innerHeight) {
//             fillIndividualBar(bar);
//             //animationDone = true;
//         }
//         // else if(coordinates.top > window.innerHeight) {
//         //     animationDone = false;
//         // }
//         else if(skillsContainer.getBoundingClientRect().top > window.innerHeight) {
//             animationDone = false;
//             initializeBars();
//         }
//     }
// }
