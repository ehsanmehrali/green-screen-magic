var foregroundImage = null;
var backgroundImage = null;
var ctxfr = null;
var ctxbg = null;
var fgpixel = null;
var bgpixel = null;
var x = null;
var y = null;
var canForeground = document.getElementById("canfore");
var canBackground = document.getElementById("canback");

function loadForegroundImage() {
  var input = document.getElementById("fgfile");
  foregroundImage = new SimpleImage(input);
  foregroundImage.drawTo(canForeground);
}

function loadBackgroundImage() {
  var input = document.getElementById("bgfile");
  backgroundImage = new SimpleImage(input);
  backgroundImage.drawTo(canBackground);
}

function doGreenScreen() {
  if (foregroundImage == null || !foregroundImage.complete()) {
    alert("Foreground image not loaded");
  }
  if (backgroundImage == null || !backgroundImage.complete()) {
    alert("Background image not loaded");
  }

  if (
    foregroundImage.getWidth() == backgroundImage.getWidth() &&
    foregroundImage.getHeight() == backgroundImage.getHeight()
  ) {
    for (fgpixel of foregroundImage.values()) {
      if (fgpixel.getGreen() > fgpixel.getRed() + fgpixel.getBlue()) {
        x = fgpixel.getX();
        y = fgpixel.getY();
        bgpixel = backgroundImage.getPixel(x, y);
        foregroundImage.setPixel(x, y, bgpixel);
      } else {
        foregroundImage.setPixel(x, y, fgpixel);
      }
    }
    foregroundImage.drawTo(canForeground);
    ctxbg = canBackground.getContext("2d");
    ctxbg.clearRect(0, 0, canBackground.width, canBackground.height);
  } else {
    alert("the Images size are not the same");
  }
}

function clearCanvas() {
  ctxfr = canForeground.getContext("2d");
  ctxbg = canBackground.getContext("2d");
  ctxfr.clearRect(0, 0, canForeground.width, canForeground.height);
  ctxbg.clearRect(0, 0, canBackground.width, canBackground.height);
  var foregroundImage = null;
  backgroundImage = null;
  ctxfr = null;
  ctxbg = null;
  fgpixel = null;
  bgpixel = null;
  x = null;
  y = null;
  canForeground = document.getElementById("canfore");
  canBackground = document.getElementById("canback");
}
