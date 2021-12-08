const iframes = document.getElementsByTagName('iframe');

for(let i = 0; i < iframes.length; i++) {
  iframes[i].style.width = "100vh";
  iframes[i].style.height = "50vh";
}
