function activityContent(document_root) {
  var content = {}
  content['title'] = document.getElementsByClassName('fcSpot')[0].innerHTML;
  content['date'] = [];
  for (el of document.getElementsByClassName('fcTxt')) {
    content['date'].push(el.firstElementChild.innerHTML)
  }
  return content
}

chrome.runtime.sendMessage({
  action: "parseActivity",
  content: activityContent(document)
});