//COLOCAR UM BG NO MENU DEPOIS DE 90PX SCROLADOS PARA BAIXO------------------------------------------------------------------------------------------------------
window.addEventListener('scroll', function() {
  var menu = document.querySelector('.menu');
  if (window.scrollY > 90) {
      menu.classList.add('scrolled');
  } else {
      menu.classList.remove('scrolled');
  }
});

//SLIDER CARD DOS FUNCIONARIOS---------------------------------------------------------------------------------------------------------------------------------
let currentSlide = 0;
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let previousTranslate = 0;
let autoSlideInterval;
let touchEventTriggered = false;

function move(direction) {
    const slider = document.querySelector('.employee-slider');
    const cards = document.querySelectorAll('.employee-card');
    const cardWidth = cards[0].offsetWidth + 5;

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


//MENU HAMBURGUER----------------------------------------------------------------------------------------------------------------------------------------------------
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

    // Adicionando o ajuste de rolagem para links âncora
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            var targetId = this.getAttribute('href').slice(1);
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - 130, // Ajuste de 90px
                    behavior: "smooth"
                });
            }
        });
    });
});


//MENSAGEM ZAP ---------------------------------------------------------------------------------------------------------------------------------------------------
let inputText = document.querySelector("name");
let inputEmail = document.querySelector("email");
let inputMsg = document.querySelector("mensagem");
let inputProposta = document.querySelector("proposta"); // Adicione esta linha

const button = document.getElementById("enviar");
button.addEventListener("click", enviarMensagemWhatsApp);

function enviarMensagemWhatsApp() {
  const nome = encodeURIComponent(document.getElementById("nome").value);
  const email = encodeURIComponent(document.getElementById("email").value);
  const mensagem = encodeURIComponent(document.getElementById("mensagem").value);
  const proposta = encodeURIComponent(document.getElementById("proposta").value); // Adicione esta linha
  const numeroWhatsApp = "5588993106463";

  const mensagemFormatada = `Nome: ${nome}%0A%0AEmail: ${email}%0A%0AProposta: ${proposta} %0A%0AMensagem: ${mensagem}`; // Atualize esta linha
  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemFormatada}`;

  window.open(urlWhatsApp, "_blank");
}

//SLIDER DE POSTS ----------------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    var stream = document.querySelector('.gallery__stream');
    var items = document.querySelectorAll('.gallery__item');

    var prev = document.querySelector('.gallery__prev');
    var next = document.querySelector('.gallery__next');
    var cooldown = false; // Flag to check if cooldown is active

    prev.addEventListener('click', function () {
        if (!cooldown) {
            stream.insertBefore(items[items.length - 1], items[0]);
            items = document.querySelectorAll('.gallery__item');
            activateCooldown();
        }
    });

    next.addEventListener('click', function () {
        if (!cooldown) {
            stream.appendChild(items[0]);
            items = document.querySelectorAll('.gallery__item');
            activateCooldown();
        }
    });

    function activateCooldown() {
        cooldown = true;
        setTimeout(function () {
            cooldown = false;
        }, 1000); // Cooldown duration of 1 second
    }

    // Set the carousel to move automatically every 1 second
    setInterval(function() {
        if (!cooldown) {
            next.click(); // Simulate a click on the next button
        }
    }, 3000);
});
