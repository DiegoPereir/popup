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
