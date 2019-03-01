var Map = {
    myMap: {},
    map: {
        center: [55.76, 37.64],
        zoom: 10,
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
    }
};

$(document).ready(function () {
    // var socket = io();

    /* Add cars to map */
    if ($("#map").length > 0) {
        Map.getCarsList()
            .then(response => {
                response.forEach(item => {
                    let geoObject = {
                        geometry: {
                            type: "Point",
                            coordinates: [item.lat, item.lng]
                        },
                        properties: {
                            iconContent: `${item.mark} ${item.model}`,
                        }
                    };
                    Map.objects.push(geoObject);
                });
                ymaps.ready(Map.init);
            })
            .catch(error => {
                console.log(error);
                ymaps.ready(Map.init);
            });
    }



});
