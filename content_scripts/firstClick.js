function startClick() {
  if (window.location.pathname.includes('detail')) {
    var ticketPath = window.location.pathname.replace('detail', 'game')
    var ticketTag = 'a[href=\"' + ticketPath + '\"]'
    var ticketElement = document.querySelector(ticketTag)
    if ( ticketElement != null) {
      ticketElement.click();
    }
  }
}

startClick()