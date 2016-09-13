app.controller("mainController", function ($http, $scope, NgMap, yelpData, foursqureData,$location) {

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

    $scope.hide = function () {
        $scope.map.showInfoWindow('myInfoWindow', this);
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
            if(_.isUndefined(yelpFiltereddata)){
                 margeData =  foresqFilteredData;
            }else{
                 margeData = _.unionBy(yelpFiltereddata, foresqFilteredData);
            }
            console.log('margeData',yelpFiltereddata);
            var i = 0;
            while (i < 25) {
                $scope.personalData.push({
                    name: margeData[i].name,
                    address: margeData[i].address,
                    ratingImage: margeData[i].ratingImage,
                    image: margeData[i].image,
                    phone: margeData[i].phone,
                    lat: margeData[i].lat,
                    lan: margeData[i].lan
                });
                i++
            }
        }, function errorCallback(response) {
            console.log('error', response);
        });

        $scope.infoPage = function (evt, info) {
            $scope.info = [];
            $scope.info.push(info);
        };
    }

    $scope.clickItem = function (event) {
        var clickId = event.target.id;
        var itemName = clickId.split('#')[1];
        var cityName = 'sydney';
        dataRequest(cityName, itemName);
    };
    $scope.onSubmitClick = function (event) {
        if (!_.isUndefined($scope.getCity) && !_.isUndefined($scope.getItems)) {
            $location.path('/business');
            dataRequest($scope.getCity, $scope.getItems);
        }
    };
});
