function step2Action(seat) {
  for (el of document.getElementsByClassName('select_form_b')) {
    if (el.firstElementChild.innerText.includes(seat)) {
      var id = el.firstElementChild.getAttribute('id')
      document.getElementById(id).click();
    }
  }
}

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "step2Action") {
    step2Action(request.seat)
  }
});
