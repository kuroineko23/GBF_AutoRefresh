function save_options() {
  var url = document.getElementById('redirect').value;
    chrome.storage.sync.set({
      redirect: url
    }, function() {
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}
chrome.storage.sync.get('redirect', (data) => {
  if(data.redirect != null)
    document.getElementById('redirect').value = data.redirect
})
document.getElementById('save').addEventListener('click', save_options);