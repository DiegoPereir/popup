document.getElementById('menuIcon').addEventListener('click', function() {
  if (this.classList.contains('fa-bars')) {
      this.classList.remove('fa-bars');
      this.classList.add('fa-times');
      document.body.style.overflow = 'hidden'; // Impede o scroll
  } else {
      this.classList.remove('fa-times');
      this.classList.add('fa-bars');
      document.body.style.overflow = 'auto'; // Permite o scroll
  }
});

var menuBtn = document.querySelector("#itens-menu-mobile i");
menuBtn.addEventListener("click", () => {
  let itemsMenu = document.querySelector(".menu-mobile");
  if (itemsMenu.classList.contains("show")) {
    itemsMenu.classList.remove("show");
    itemsMenu.classList.add("hide");
  } else {
    itemsMenu.classList.remove("hide");
    itemsMenu.classList.add("show");
  }
});

let inputText = document.querySelector("name");
let inputEmail = document.querySelector("email");
let inputMsg = document.querySelector("mensagem");

const button = document.getElementById("enviar");
button.addEventListener("click", enviarMensagemWhatsApp);

function enviarMensagemWhatsApp() {
  const nome = encodeURIComponent(document.getElementById("nome").value);
  const email = encodeURIComponent(document.getElementById("email").value);
  const mensagem = encodeURIComponent(
    document.getElementById("mensagem").value
  );
  const numeroWhatsApp = "5588993106463";

  const mensagemFormatada = `Nome: ${nome}%0AEmail: ${email}%0AMensagem: ${mensagem}`;
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
