function showTab(event, tabId) {
  var i, tabContent, tabLinks;
  tabContent = document.getElementsByClassName("retro-tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  tabLinks = document.getElementsByClassName("retro-tab");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" retro-tab--active", "");
  }
  document.getElementById(tabId).style.display = "block";
  event.currentTarget.className += " retro-tab--active";
}

function openModal() {
  document.getElementById("retroModal").style.display = "block";
}

function closeModal() {
  document.getElementById("retroModal").style.display = "none";
}

function showToast() {
  var toast = document.getElementById("retroToast");
  toast.className = "retro-toast show";
  setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}

document.addEventListener("DOMContentLoaded", function() {
  var acc = document.getElementsByClassName("retro-accordion__button");
  for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
});