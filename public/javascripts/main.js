function init() {
    var myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
    });
}

$(document).ready(() => {
    var socket = io();

    if ($("#map").length > 0) {
        ymaps.ready(init);
    }

});
