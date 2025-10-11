$(function () {

    const $headers = $(".accordion .acc-header");
    const $panels = $(".accordion .acc-panel");

    // Initialize: first panel
    $panels.hide().first().show().addClass("open");
    $headers.attr("aria-expanded", "false").first().attr("aria-expanded", "true");

    function openPanel($header) {
        const $panel = $header.next(".acc-panel");

        // Close others
        $panels.not($panel).slideUp(200).removeClass("open");
        $headers.not($header).attr("aria-expanded", "false");
        // Open selected
        $panel.stop(true, true).slideDown(200).addClass("open");
        $header.attr("aria-expanded", "true");
    }

    $headers.on("click", function () { openPanel($(this)); });
        // Keyboard access: Enter/Space
        $headers.on("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openPanel($(this)); }
    });

    /* ------------------
    * Tabs
    * ------------------ */
    const $tabs = $(".tabs .tab");
    const $tabPanels = $(".tab-panels .tab-panel");

    function activateTab($tab) {
        const target = $tab.attr("aria-controls");
        // Update buttons
        $tabs.removeClass("active").attr("aria-selected", "false");
        $tab.addClass("active").attr("aria-selected", "true");
        // Show target panel, hide others
        $tabPanels.attr("hidden", true);
        $("#" + target).removeAttr("hidden");
    }

    // Init first tab
    activateTab($tabs.first());

    $tabs.on("click", function () { activateTab($(this)); });

    /* ------------------
    * Slideshow / Carousel
    * ------------------ */
    const $slides = $(".slide");
    const $dots = $(".dot");
    const $slideshow = $(".slideshow");
    const $next = $(".next");
    const $prev = $(".prev");
    let index = 0;
    let timerId = null;
    const AUTO_MS = 3500;

    function goTo(i) {
        index = (i + $slides.length) % $slides.length;
        $slides.removeClass("active").eq(index).addClass("active");
        $dots.removeClass("active").attr("aria-selected", "false").eq(index).addClass("active").attr("aria-selected", "true");
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function start() { if (!timerId) timerId = setInterval(next, AUTO_MS); }
    function stop() { clearInterval(timerId); timerId = null; }

    // Init
    goTo(0); start();

    $next.on("click", function(){ next(); });
    $prev.on("click", function(){ prev(); });
    $dots.each(function(i){ $(this).on("click", function(){ goTo(i); }); });

    // Pause on hover/focus inside slideshow
    $slideshow.on("mouseenter focusin", stop);
    $slideshow.on("mouseleave focusout", function(e){
    // Only restart if the new focus is outside the slideshow
    if (!$(e.relatedTarget).closest(".slideshow").length) start();
    });

    let slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    function plusSlides(n) {
    showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
    showSlides(slideIndex = n);
    }

    function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    }


});