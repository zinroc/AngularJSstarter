var app = angular.module("ArenaApp");



app.directive('bsTooltip', function (){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){


                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
}).controller("ArenaCtrl", function arenaCtrl ($scope, api_service, $timeout) {
    "use strict";
    $scope.email = utils.getCookie("email");
    $scope.name = utils.getCookie("name");

    console.log($scope.email, $scope.name);

    /** Loading Screen Parameters **/ 
    $scope.loadedItemsArr = ['player'];
    $scope.loadedItemsObj = {};
    

    /** ------------- Loading START ------------- **/
    /**
     * Load player Info
     * If player does not yet exist, write into db
     */
    $scope.loadPlayerInfo = function () {
        api_service.getPlayer($scope.email, $scope.name)
        .then(function (response) {
            console.log("Got player state:");
            console.log(response.data);
            $scope.loadedItemsObj['player'] = true;
        });
    };


    $scope.loading = function (){
        for (var i=0; i<$scope.loadedItemsArr.length; i++){
            var index = $scope.loadedItemsArr[i];
            $scope.loadedItemsObj[index] = false;
        }
    };

    $scope.load = function (){

        $scope.loadPlayerInfo();
    };

    $scope.checkLoad = function (){
        for (var i=0; i<$scope.loadedItemsArr.length; i++){
            var index = $scope.loadedItemsArr[i];
            if ($scope.loadedItemsObj[index] === false){
                return false;
            }
        }
        return true;
    };

    /*** ---------- Loading END ------------ ***/

    /*** ----------- Game State ------------ ***/


    $scope.loading();
    $scope.load();

    /*** -------------- Run END ------------- ***/

});
