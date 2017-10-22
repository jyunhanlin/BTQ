chrome.runtime.onMessage.addListener(function (request, sender) {
  switch (request.action) {
    case 'parseActivityReq':
      activityContent()
      break;
    case 'startActions':
      switch (request.processStep) {
        case 0:
          step1Actions(request.data)
          break;
        case 1:
          step2Actions(request.data)
          break;
        case 2:
          step3Actions(request.data)
          break;
        default:
          break;
      }
      break;
    default:
     break;
  }
});

function activityContent() {
  var content = {}
  content['title'] = document.getElementsByClassName('fcSpot')[0].innerHTML;
  content['date'] = [];
  for (el of document.getElementsByClassName('fcTxt')) {
    content['date'].push(el.firstElementChild.innerHTML)
  }
  chrome.runtime.sendMessage({
    action: "parseActivityRes",
    data: content
  });
}


function step1Actions(activityDate) {
  function date(activityDate) {
    for (el of document.getElementsByClassName('fcTxt')) {
      if (el.firstElementChild.innerHTML === activityDate) {
        var dateTag = 'input[name=\"' + el.lastElementChild.firstElementChild.getAttribute('name') + '\"]'
        document.querySelector(dateTag).click();
        break;
      }
    }
  }

  if (window.location.pathname.includes('detail')) {
    var ticketPath = window.location.pathname.replace('detail', 'game')
    var ticketTag = 'a[href=\"' + ticketPath + '\"]'
    document.querySelector(ticketTag).click();
    var checkExist = setInterval(function () {
      if (document.getElementById('gameListContainer').children.length) {
        date(activityDate)
        clearInterval(checkExist);
      }
    }, 100); // check every 100ms
  } else {
    date(activityDate)
  }
}

function step2Actions(activitySeat) {
  for (el of document.querySelectorAll('[class^="select_form_"]')) {
    if (el.firstElementChild.innerText.includes(activitySeat)) {
      var id = el.firstElementChild.getAttribute('id')
      document.getElementById(id).click();
    }
  }
}

function step3Actions(activityTicketNum) {
  document.querySelector('[id^="TicketForm_ticketPrice_"]').value = activityTicketNum;
  document.getElementById('TicketForm_agree').checked = true;
  document.getElementById('TicketForm_verifyCode').focus();
}
