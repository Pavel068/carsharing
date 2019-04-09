var Map = {
    myMap: {},
    map: {
        center: [52.7, 41.5],
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
            Map.myMap.geoObjects.add(item);
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
    addPlacemark: (coords, props, options) => {
        let placemark = new ymaps.Placemark(coords, props, options);
        Map.objects.push(placemark);
    }
};

$(document).ready(function () {
    const socket = io();

    // init vue chat
    var chat = new Vue({
        delimiters: ['${', '}'],
        el: '#modalChat',
        data: {
            chat: [],
            message: ''
        },
        methods: {
            getMessages: function () {
                $.get('/api/chat/0', response => {
                    if (response !== undefined) {
                        chat.$data.chat = response;
                    }
                });
            },
            sendMessage: function () {
                $.post('/api/chat/', {
                    msg: this.message
                }, response => {
                    if (response.status !== undefined && response.status) {
                        socket.emit('chat', this.message);
                        this.message.msg = '';
                    }
                });
            }
        },
        beforeMount() {
            this.getMessages();
        }
    });

    // socket events
    socket.on('chat', msg => {
        chat.methods.getMessages();
    });

    /* Add cars to map */
    if ($("#map").length > 0) {
        ymaps.ready(() => {
            // Get user location
            navigator.geolocation.getCurrentPosition(position => {
                Map.map.center = [position.coords.latitude, position.coords.longitude];

                // Add self
                Map.addPlacemark(Map.map.center, null, {
                    iconLayout: 'default#image',
                    iconImageHref: '/images/nav-me-icon.png',
                    iconImageSize: [40, 40],
                    iconImageOffset: [-20, -20],
                });

                // Add map objects
                Map.getCarsList()
                    .then(response => {
                        response.forEach(item => {
                            Map.addPlacemark([item.lat, item.lng], {
                                iconContent: `${item.mark} ${item.model}`,
                                balloonContentHeader: 'Арендовать этот автомобиль',
                                balloonContentBody: `${item.mark} ${item.model} - <b>${item.price} руб./мин.</b><br>Гос. номер: ${item.gos_number}<br><button class="btn btn-success">Арендовать</button>`
                            }, {
                                preset: "islands#icon",
                                iconColor: '#ff0000'
                            });
                        });
                        Map.init();
                    })
                    .catch(error => {
                        console.log(error);
                        Map.init();
                    });
            });
        });
    }

});
