/**
 * Created by M004 on 9/7/2016.
 */
angular.module('whoWhatWhere').factory('foursquareData', function () {
    var image, name, address, lan, lat;
    return {
        "foursquareFilterData": function (data) {
            if (!_.isUndefined(data)) {
                var filterFoursquareArray = [];
                for (var i = 0; i < data.length; i++) {
                    if (_.isUndefined(data[i].image_url)) {
                        image = 'assets/images/no_image.png';
                        console.log('vk', data[i].image_url);
                    } else {
                        image = data[i].image_url;
                    }
                    if (_.isUndefined(data[i].location.formattedAddress)) {
                        address = 'Not Provided';
                    } else {
                        address = data[i].location.formattedAddress;
                    }
                    if (_.isUndefined(data[i].name)) {
                        name = 'Not Provided';
                    } else {
                        name = data[i].name;
                    }
                    if (_.isUndefined(data[i].location.lat)) {
                        lat = 'Not Provided';
                    } else {
                        lat = data[i].location.lat;
                    }
                    if (_.isUndefined(data[i].location.lng)) {
                        lan = 'Not Provided';
                    } else {
                        lan = data[i].location.lng;
                    }
                    if (_.isUndefined(data[i].display_phone)) {
                        phone = 'Not Provided';
                    } else {
                        phone = data[i].display_phone;
                    }
                    filterFoursquareArray[i] = {image: image, name: name, address: address, lat: lat, lan: lan};
                }

                return filterFoursquareArray;
            }
        }
    }
});