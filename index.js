function sendData() {
  const data = document.getElementById('userInput').value;
  localStorage.setItem("sharedData", data);
  window.location.href = `movies.html`;
}

function clickPress(event) {
  if (event.key == "Enter") {   
    sendData();
  }
}

function openMenu() {
  document.body.classList += " menu--open"
}

function closeMenu() {
  document.body.classList.remove('menu--open')
}