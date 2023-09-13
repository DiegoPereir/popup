let currentSlide = 0;
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let autoSlideInterval;
let touchEventTriggered = false; // Adicionado para rastrear eventos de toque

function move(direction) {
    const slider = document.querySelector('.employee-slider');
    const cards = document.querySelectorAll('.employee-card');
    const cardWidth = cards[0].offsetWidth + 40;

    currentSlide += direction;

    if (currentSlide > cards.length - 3) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = cards.length - 3;
    }

    const moveAmount = -(currentSlide * cardWidth);
    slider.style.transform = `translateX(${moveAmount}px)`;
    previousTranslate = moveAmount;
}

function startAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    autoSlideInterval = setInterval(() => {
        move(1);
    }, 2000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
    stopAutoSlide();
    setTimeout(startAutoSlide, 3000);
}

const slider = document.querySelector('.employee-slider');

slider.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

slider.addEventListener('mousedown', (e) => {
    if (touchEventTriggered) return;
    e.preventDefault();
    isDragging = true;
    startPosition = e.clientX;
    slider.style.transition = 'none';
    resetAutoSlide();
});

slider.addEventListener('mousemove', (e) => {
    if (touchEventTriggered || !isDragging) return;
    const currentPosition = e.clientX;
    currentTranslate = previousTranslate + currentPosition - startPosition;
    slider.style.transform = `translateX(${currentTranslate}px)`;
});

slider.addEventListener('mouseup', () => {
    isDragging = false;
    slider.style.transition = 'transform 0.5s ease-out';
    const movedBy = currentTranslate - previousTranslate;

    const cardWidth = document.querySelector('.employee-card').offsetWidth + 40;
    if (Math.abs(movedBy) > cardWidth / 2) {
        if (movedBy > 0) {
            move(-1);
        } else {
            move(1);
        }
    } else {
        slider.style.transform = `translateX(${previousTranslate}px)`;
    }
});

slider.addEventListener('mouseleave', () => {
    if (isDragging) {
        isDragging = false;
        slider.style.transition = 'transform 0.5s ease-out';
        const movedBy = currentTranslate - previousTranslate;

        const cardWidth = document.querySelector('.employee-card').offsetWidth + 40;
        if (Math.abs(movedBy) > cardWidth / 2) {
            if (movedBy > 0) {
                move(-1);
            } else {
                move(1);
            }
        } else {
            slider.style.transform = `translateX(${previousTranslate}px)`;
        }
    }
});

slider.addEventListener('touchstart', (e) => {
    touchEventTriggered = true;
    e.stopPropagation();
    isDragging = true;
    startPosition = e.touches[0].clientX;
    slider.style.transition = 'none';
    resetAutoSlide();
});

slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentPosition = e.touches[0].clientX;
    currentTranslate = previousTranslate + currentPosition - startPosition;
    slider.style.transform = `translateX(${currentTranslate}px)`;
});

slider.addEventListener('touchend', () => {
    touchEventTriggered = false;
    isDragging = false;
    slider.style.transition = 'transform 0.5s ease-out';
    const movedBy = currentTranslate - previousTranslate;

    const cardWidth = document.querySelector('.employee-card').offsetWidth + 40;
    if (Math.abs(movedBy) > cardWidth / 2) {
        if (movedBy > 0) {
            move(-1);
        } else {
            move(1);
        }
    } else {
        slider.style.transform = `translateX(${previousTranslate}px)`;
    }
});

document.querySelector('.arrow.left').addEventListener('click', resetAutoSlide);
document.querySelector('.arrow.right').addEventListener('click', resetAutoSlide);

startAutoSlide();











document.addEventListener("DOMContentLoaded", function () {
  var menuIcon = document.getElementById("menuIcon");
  var menuMobile = document.querySelector(".items-menu-mobile .menu-mobile");

  function toggleMenu() {
      menuMobile.classList.toggle("show");
      if (menuMobile.classList.contains("show")) {
          menuIcon.classList.remove('fa-bars');
          menuIcon.classList.add('fa-times');
          document.body.style.overflow = 'hidden';
      } else {
          menuIcon.classList.remove('fa-times');
          menuIcon.classList.add('fa-bars');
          document.body.style.overflow = 'auto';
      }
  }

  menuIcon.addEventListener("click", toggleMenu);

  var menuMobileLinks = menuMobile.querySelectorAll("a");
  menuMobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
          menuMobile.classList.remove("show");
          menuIcon.classList.remove('fa-times');
          menuIcon.classList.add('fa-bars');
          document.body.style.overflow = 'auto';
      });
  });
});


let inputText = document.querySelector("name");
let inputEmail = document.querySelector("email");
let inputMsg = document.querySelector("mensagem");

const button = document.getElementById("enviar");
button.addEventListener("click", enviarMensagemWhatsApp);

function enviarMensagemWhatsApp() {
  const nome = encodeURIComponent(document.getElementById("nome").value);
  const email = encodeURIComponent(document.getElementById("email").value);
  const mensagem = encodeURIComponent(document.getElementById("mensagem").value);
  const numeroWhatsApp = "5588993106463";

  const mensagemFormatada = `nome: ${nome}%0A%0Aemail: ${email}%0A%0Amensagem: ${mensagem}`;
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemFormatada}`;

  window.open(urlWhatsApp, "_blank");
}





class SlideStories {
  constructor(id) {
    this.slide = document.querySelector(`[data-slide="${id}"]`);
    this.active = 0;
    this.init();
  }

  activeSlide(index) {
    this.active = index;
    this.items.forEach((item) => item.classList.remove("active"));
    this.items[index].classList.add("active");
    this.thumbItems.forEach((item) => item.classList.remove("active"));
    this.thumbItems[index].classList.add("active");
    this.autoSlide();
  }

  prev() {
    if (this.active > 0) {
      this.activeSlide(this.active - 1);
    } else {
      this.activeSlide(this.items.length - 1);
    }
  }

  next() {
    if (this.active < this.items.length - 1) {
      this.activeSlide(this.active + 1);
    } else {
      this.activeSlide(0);
    }
  }

  addNavigation() {
    const nextBtn = this.slide.querySelector(".slide-next");
    const prevBtn = this.slide.querySelector(".slide-prev");
    nextBtn.addEventListener("click", this.next);
    prevBtn.addEventListener("click", this.prev);
  }

  addThumbItems() {
    this.items.forEach(() => (this.thumb.innerHTML += `<span></span>`));
    this.thumbItems = Array.from(this.thumb.children);
  }

  autoSlide() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.next, 5000);
  }

  init() {
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.items = this.slide.querySelectorAll(".slide-items > *");
    this.thumb = this.slide.querySelector(".slide-thumb");
    this.addThumbItems();
    this.activeSlide(0);
    this.addNavigation();
  }
}

new SlideStories("slide");

//current position
var pos = 0;
//number of slides
var totalSlides = $("#slider-wrap ul li").length;
//get the slide width
var sliderWidth = $("#slider-wrap").width();

$(document).ready(function () {
  /*****************
   BUILD THE SLIDER
  *****************/
  //set width to be 'x' times the number of slides
  $("#slider-wrap ul#slider").width(sliderWidth * totalSlides);

  //next slide
  $("#next").click(function () {
    slideRight();
  });

  //previous slide
  $("#previous").click(function () {
    slideLeft();
  });

  /*************************
   //*> OPTIONAL SETTINGS
  ************************/
  //automatic slider
  var autoSlider = setInterval(slideRight, 3000);

  //for each slide
  $.each($("#slider-wrap ul li"), function () {
    //set its color
    var c = $(this).attr("data-color");
    $(this).css("background", c);

    //create a pagination
    var li = document.createElement("li");
    $("#pagination-wrap ul").append(li);
  });

  //counter
  countSlides();

  //pagination
  pagination();

  //hide/show controls/btns when hover
  //pause automatic slide when hover
  $("#slider-wrap").hover(
    function () {
      $(this).addClass("active");
      clearInterval(autoSlider);
    },
    function () {
      $(this).removeClass("active");
      autoSlider = setInterval(slideRight, 3000);
    }
  );
}); //DOCUMENT READY

/***********
 SLIDE LEFT
************/
function slideLeft() {
  pos--;
  if (pos == -1) {
    pos = totalSlides - 1;
  }
  $("#slider-wrap ul#slider").css("left", -(sliderWidth * pos));

  //*> optional
  countSlides();
  pagination();
}

/************
 SLIDE RIGHT
*************/
function slideRight() {
  pos++;
  if (pos == totalSlides) {
    pos = 0;
  }
  $("#slider-wrap ul#slider").css("left", -(sliderWidth * pos));

  //*> optional
  countSlides();
  pagination();
}

/************************
 //*> OPTIONAL SETTINGS
************************/
function countSlides() {
  $("#counter").html(pos + 1 + " / " + totalSlides);
}

function pagination() {
  $("#pagination-wrap ul li").removeClass("active");
  $("#pagination-wrap ul li:eq(" + pos + ")").addClass("active");
}
