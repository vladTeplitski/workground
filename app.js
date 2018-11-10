var app = angular.module("chartsApp", []);

app.controller('mainController', function ($scope) {
    $scope.showval = true;
    $scope.hideval = true;
    $scope.hideval2 = true;

    $scope.showHideFunc = function (param) {

        if (param == "showWeek") {
            $scope.showval = true;
            $scope.hideval = true;
            $scope.hideval2 = true;
        }
        else if (param == "showMonth") {
            $scope.showval = false;
            $scope.hideval = false;
            $scope.hideval2 = true;
        }
        else if (param == "showYear") {
            $scope.showval = false;
            $scope.hideval = true;
            $scope.hideval2 = false;
        }
        else {
            $scope.showval = true;
            $scope.hideval = false;
            $scope.hideval2 = false;
        }

    //END showHideFunc
    }


//END mainController
});