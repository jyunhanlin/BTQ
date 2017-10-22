document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('refresh').onclick = activityContent;
  document.getElementById('start').onclick = startActions;
});


function activityContent() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'parseActivityReq'
    });
  });

  chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "parseActivityRes") {
      fillContent(request.data);
    }
  });
}


function startActions() {
  var processStep = 0;
  var activityDate = document.getElementById('activity-date').value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "startActions",
      processStep: processStep,
      data: activityDate
    });
    processStep = 1;
  });

  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && processStep === 1) {
      var activitySeat = document.getElementById('activity-seat').value
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "startActions",
          processStep: processStep,
          data: activitySeat
        });
        processStep = 2;
      });

    }

    if (changeInfo.status === "complete" && processStep === 2) {
      var activityTicketNum = document.getElementById('activity-ticketNum').value
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "startActions",
          processStep: processStep,
          data: activityTicketNum
        });
      });
    }
  });
}

function fillContent(content) {
  var title = document.getElementById('activity-title');
  var dateOptions = document.getElementById('activity-date');
  title.innerText = content.title;
  for (date of content.date) {
    var aOption = new Option(date);
    dateOptions.options.add(aOption);
  }
}

