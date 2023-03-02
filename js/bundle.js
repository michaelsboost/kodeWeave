const elm = document.querySelector(`#heading`);
let i = 0
let txt = elm.textContent
let speed = 50

typeWriter = (elm) => {
  if (i < txt.length) {
    document.querySelector(`#heading`).textContent += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed)
  }
}
elm.textContent = '';
typeWriter();