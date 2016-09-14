app.controller("mainController", function ($http, $scope, NgMap, yelpData, foursqureData, $location) {

    $scope.menus = ["Foods","LifeStyle","Fun","Bar","Coffee","Restaurants"];

    NgMap.getMap().then(function (map) {
        $scope.map = map;
    });

    $scope.showCity = function (event, city, flag) {
        if (flag) {
            $scope.cityName = city;
            $scope.map.showInfoWindow('myInfoWindow', this);
        } else {
            $scope.map.hideInfoWindow('myInfoWindow', this);
        }
    };

    $scope.hideCity = function () {
        $scope.map.hideInfoWindow('myInfoWindow', this);
    };
    $scope.icon = {
        "scaledSize": [20, 40],
        "url": "assets/images/myMarker.png"
    };
    function dataRequest(cityName, ItemName) {
        var margeData;
        $scope.personalData = [];
        $http({
            method: 'GET',
            url: '/search?location=' + cityName + '&term=' + ItemName + ''
        }).then(function successCallback(response) {
            var responceDataBoth = response.data;
            var yelpFiltereddata = yelpData.yelpFilterData(responceDataBoth.ydata);
            var foresqFilteredData = foursqureData.foursqureFilterData(responceDataBoth.venues);
            var i = 0;
            if (responceDataBoth.error != true) {
                margeData = _.unionBy(yelpFiltereddata, foresqFilteredData);
                while (i < 25) {
                    $scope.personalData.push({
                        name: margeData[i].name,
                        address: margeData[i].address,
                        ratingImage: margeData[i].ratingImage,
                        image: margeData[i].image,
                        phone: margeData[i].phone,
                        lat: margeData[i].lat,
                        lan: margeData[i].lan,
                        url: margeData[i].url
                    });
                    i++
                }
            } else {
                alert('Data Not Found');
                $location.path('/home');
            }

        }, function errorCallback(response) {
            console.log('error', response);
        });
    }

    $scope.onclickMenuItem = function (event) {
        var itemName = event.target.id;
        var cityName = 'sydney';
        dataRequest(cityName, itemName);
    };
    $scope.onSubmitClick = function (event) {
        if (!_.isUndefined($scope.city) && !_.isUndefined($scope.menuItem)) {
            dataRequest($scope.city, $scope.menuItem);
            $location.path('/business');
        }else {
            alert('Please select item');
        }
    };
});
