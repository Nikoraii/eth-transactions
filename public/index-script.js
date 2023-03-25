$(document).ready(function () {
  const showNavbar = (toggleId, navId, bodyId, headerId) => {
    const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId)

    // Validate that all variables exist
    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener('click', () => {
        // show navbar
        nav.classList.toggle('show')
        // change icon
        toggle.classList.toggle('bx-x')
        // add padding to body
        bodypd.classList.toggle('body-pd')
        // add padding to header
        headerpd.classList.toggle('body-pd')
      })
    }
  }

  showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header')

  /*===== LINK ACTIVE =====*/
  const linkColor = document.querySelectorAll('.nav_link')

  function colorLink() {
    if (linkColor) {
      linkColor.forEach(l => l.classList.remove('active-nav'))
      this.classList.add('active-nav')
    }
  }
  linkColor.forEach(l => l.addEventListener('click', colorLink))

  // Your code to run since DOM is loaded and ready

  new FinisherHeader({
    "count": 10,
    "size": {
      "min": 2,
      "max": 40,
      "pulse": 0
    },
    "speed": {
      "x": {
        "min": 0,
        "max": 0.8
      },
      "y": {
        "min": 0,
        "max": 0.2
      }
    },
    "colors": {
      "background": "#f7f6fb",
      "particles": [
        "#4723d9",
        "#afa5d9",
        "#acaaff",
        "#1bffc2",
        "#f9a5fe"
      ]
    },
    "blending": "overlay",
    "opacity": {
      "center": 1,
      "edge": 1
    },
    "skew": 0,
    "shapes": [
      "c",
      "s",
      "t"
    ]
  });

  $("button.nav_link").click(function () {
    $("button.nav_link").removeClass("active");
  })
})