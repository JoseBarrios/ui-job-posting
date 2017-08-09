/**
 * Created by ernest on 7/17/2017.
 */


$(document).ready(function (s) {
    var inpsToMonitor = $("form.f-edit input[type='text'], form.f-edit input[type='password'], form.f-edit textarea");

    for (var J = inpsToMonitor.length - 1; J >= 0; --J) {
        inpsToMonitor[J].addEventListener("change", adjustStyling, false);
        inpsToMonitor[J].addEventListener("keyup", adjustStyling, false);
        inpsToMonitor[J].addEventListener("focus", adjustStyling, false);
        inpsToMonitor[J].addEventListener("blur", adjustStyling, false);
        inpsToMonitor[J].addEventListener("mousedown", adjustStyling, false);

        //-- Initial update. note that IE support is NOT needed.
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        inpsToMonitor[J].dispatchEvent(evt);
    }
});

function adjustStyling (zEvent) {
    var inpVal  = zEvent.target.value;
    if (inpVal  &&  inpVal.replace (/^\s+|\s+$/g, "") )
        zEvent.target.style.background = "#fafafa";
    else
        zEvent.target.style.background = "inherit";
}
