$(document).ready(function() {
    $("#show-pronunciation").on("click", function() {
        $(".pronunciation").slideToggle();
    });
    $("li").on("click", function() {
        $(this).find("dl").slideToggle();
    });
});