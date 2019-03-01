var Map = {
    myMap: {},
    map: {
        center: [55.76, 37.64],
        zoom: 14,
        props: {
            searchControlProvider: 'yandex#search'
        }
    },
    objects: [],
    init: () => {
        Map.myMap = new ymaps.Map("map", {
            center: Map.map.center,
            zoom: Map.map.zoom
        }, Map.map.props);
        Map.objects.forEach(item => {
            let o = new ymaps.GeoObject(item);
            Map.myMap.geoObjects.add(o);
        });
    },
    getCarsList: () => {
        return new Promise((resolve, reject) => {
            $.get('/api/cars/', response => {
                if (response.status === undefined || response.status) {
                    resolve(response);
                } else {
                    reject(response);
                }
            });
        });
    },
    addGeoObject: (item, options = {}) => {
        if (item.model === undefined)
            item.model = '';
        if (item.mark === undefined)
            item.mark = '';

        Map.objects.push({
            geometry: {
                type: "Point",
                coordinates: [item.lat, item.lng]
            },
            properties: {
                iconContent: `${item.mark} ${item.model}`,
            },
            options: options
        });
    }
};

$(document).ready(function () {
    // var socket = io();

    /* Add cars to map */
    if ($("#map").length > 0) {

        // Get user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                Map.map.center = [position.coords.latitude, position.coords.longitude];
            });
        }

        // Add self
        Map.addGeoObject({
            lat: Map.map.center[0],
            lng: Map.map.center[1]
        }, {
            fill: true,
            fillColor: 'red'
        });

        // Add maps
        Map.getCarsList()
            .then(response => {
                response.forEach(item => {
                    Map.addGeoObject(item);
                });
                ymaps.ready(Map.init);
            })
            .catch(error => {
                console.log(error);
                ymaps.ready(Map.init);
            });
    }


});
