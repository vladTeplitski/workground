var app = angular.module("chartsApp", []);

app.controller('mainController', function ($scope) {
    $scope.showval = true;
    $scope.hideval = false;
    
    $scope.showHideFunc = function (param) {

        if (param == "show") {
            $scope.showval = true;
            $scope.hideval = true;
        }
        else if (param == "hide") {
            $scope.showval = false;
            $scope.hideval = false;
        }
        else {
            $scope.showval = true;
            $scope.hideval = false;
        }

    //END showHideFunc
    }


//END mainController
});