function step3Action(ticketNum) {
  document.querySelector('[id^="TicketForm_ticketPrice_"]').value = ticketNum;
  document.getElementById('TicketForm_agree').checked = true;
  document.getElementById('TicketForm_verifyCode').focus();
}

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "step3Action") {
    step3Action(request.ticketNum)
  }
});
