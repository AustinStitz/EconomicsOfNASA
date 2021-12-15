const iframes = document.getElementsByTagName('iframe');

for(let i = 0; i < iframes.length; i++) {
  iframes[i].style.width = "100vh";
  iframes[i].height = (window.innerHeight / 2);//.style.height = "50vh";
}

const imgs = document.getElementsByTagName('img');

for(let i = 0; i < imgs.length; i++) {
  imgs[i].style.width = "100vh";
  imgs[i].height = (window.innerHeight / 2);//.style.height = "50vh";
}
