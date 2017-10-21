function date(start) {
  for (el of document.getElementsByClassName('fcTxt')) {
    if (el.firstElementChild.innerHTML === start) {
      var dateTag = 'input[name=\"' + el.lastElementChild.firstElementChild.getAttribute('name') + '\"]'
      document.querySelector(dateTag).click();
      break;
    }
  }
}

function actions(start) {
  if (window.location.pathname.includes('detail')) {
    var ticketPath = window.location.pathname.replace('detail', 'game')
    var ticketTag = 'a[href=\"' + ticketPath + '\"]'
    document.querySelector(ticketTag).click();
    var checkExist = setInterval(function () {
      if (document.getElementById('gameListContainer').children.length) {
        date(start)
        clearInterval(checkExist);
      }
    }, 100); // check every 100ms
  } else {
    date(start)
  }
}


chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "startActions") {
    actions(request.date)
  }
});
