var processStep = 0;

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('refresh').onclick = parseWebPage;
  document.getElementById('start').onclick = startActions;
});

function parseWebPage() {
  processStep = 0;
  chrome.tabs.executeScript(null, {
    file: "content_scripts/parseActivity.js"
  });
}

function startActions() {
  chrome.tabs.executeScript(null, { file: 'content_scripts/step1.js' } );
  var date = document.getElementById('activity-date').value
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "startActions",
    date: date });
    processStep = 1;
  });

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === "complete" && processStep === 1) {
      chrome.tabs.executeScript(null, { file: 'content_scripts/step2.js' } );
      var seat = document.getElementById('activity-seat').value
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "step2Action",
        seat: seat });
        processStep = 2;
      });
      
    }
  
    if (changeInfo.status === "complete" && processStep === 2) {
      chrome.tabs.executeScript(null, { file: 'content_scripts/step3.js' } );
      var ticketNum = document.getElementById('activity-ticketNum').value
  
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "step3Action",
        ticketNum: ticketNum });
      });
    }
  });
}



chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "parseActivity") {
    fillContent(request.content)
  }
});

function fillContent(content) {
  var title = document.getElementById('activity-title');
  var dateOptions = document.getElementById('activity-date');
  title.innerText = content.title;
  for (date of content.date) {
    var aOption = new Option(date);
    dateOptions.options.add(aOption);
  }
}

