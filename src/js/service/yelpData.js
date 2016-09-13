/**
 * Created by M004 on 9/7/2016.
 */
angular.module('whoWhatWhere').factory('yelpData', function () {
    var image, rating, name, address, lan, lat,phone;
    return {
        "yelpFilterData": function (data) {
            if (!_.isUndefined(data)) {
                var filterYelpArray = [];
                for (var i = 0; i < data.length; i++) {
                    if (_.isUndefined(data[i].image_url)) {
                        image = 'assets/images/no_image.png';
                        console.log('vk', data[i].image_url);
                    } else {
                        image = data[i].image_url;
                    }
                    if (_.isUndefined(data[i].rating_img_url)) {
                        rating = 'Not Provided';
                    } else {
                        rating = data[i].rating_img_url;
                    }
                    if (_.isUndefined(data[i].location.display_address)) {
                        address = 'Not Provided';
                    } else {
                        address = data[i].location.display_address;
                    }
                    if (_.isUndefined(data[i].name)) {
                        name = 'Not Provided';
                    } else {
                        name = data[i].name;
                    }
                    if (_.isUndefined(data[i].location.coordinate.latitude)) {
                        lat = 'Not Provided';
                    } else {
                        lat = data[i].location.coordinate.latitude;
                    }
                    if (_.isUndefined(data[i].location.coordinate.longitude)) {
                        lan = 'Not Provided';
                    } else {
                        lan = data[i].location.coordinate.longitude;
                    }
                    if (_.isUndefined(data[i].display_phone)) {
                        phone = 'Not Provided';
                    } else {
                        phone = data[i].display_phone;
                    }
                    filterYelpArray[i] = {
                        image: image,
                        ratingImage: rating,
                        name: name,
                        address: address,
                        lat: lat,
                        lan: lan,
                        phone: phone
                    };
                }

                return filterYelpArray;
            }
        }
    }
});