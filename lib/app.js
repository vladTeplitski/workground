var app = angular.module("chartsApp", []);

app.controller('mainController', function ($scope) {
    $scope.showval = false;
    $scope.hideval = true;
    $scope.hideval2 = false;
    $scope.hideval3m = true;
    $scope.hideval6m = true;
    $scope.hideval3y = true;
    $scope.hideval5y = true;

    //Loader
    $scope.loaderStatus = true; //show on start


    $scope.toggleLoader = function (param) {
        if (param == "hideLoader") {
            $scope.loaderStatus = false;
        }
        if (param == "showLoader") {
            $scope.loaderStatus = true;
        }
    }

    $scope.showHideFunc = function (param) {

        if (param == "showWeek") {
            $scope.showval = true;
            $scope.hideval = true;
            $scope.hideval2 = true;
            $scope.hideval3m = true;
            $scope.hideval6m = true;
            $scope.hideval5y = true;
            $scope.hideval3y = true;
            resetZoomWeek();
        }
        else if (param == "showMonth") {
            $scope.showval = false;
            $scope.hideval = false;
            $scope.hideval2 = true;
            $scope.hideval3m = true;
            $scope.hideval6m = true;
            $scope.hideval5y = true;
            $scope.hideval3y = true;
            resetZoomMonth();
        }
        else if (param == "show3Month") {
            $scope.showval = false;
            $scope.hideval = true;
            $scope.hideval2 = true;
            $scope.hideval3m = false;
            $scope.hideval6m = true;
            $scope.hideval5y = true;
            $scope.hideval3y = true;
            resetZoom3Month();
        }
        else if (param == "show6Month") {
            $scope.showval = false;
            $scope.hideval = true;
            $scope.hideval2 = true;
            $scope.hideval3m = true;
            $scope.hideval6m = false;
            $scope.hideval5y = true;
            $scope.hideval3y = true;
            resetZoom6Month();
        }
        else if (param == "showYear") {
            $scope.showval = false;
            $scope.hideval = true;
            $scope.hideval2 = false;
            $scope.hideval3m = true;
            $scope.hideval6m = true;
            $scope.hideval5y = true;
            $scope.hideval3y = true;
            resetZoomYear();
        }
        else if (param == "show3year") {
            $scope.showval = false;
            $scope.hideval = true;
            $scope.hideval2 = true;
            $scope.hideval3m = true;
            $scope.hideval6m = true;
            $scope.hideval5y = true;
            $scope.hideval3y = false;
            resetZoom3Year();
        }
        else if (param == "show5year") {
            $scope.showval = false;
            $scope.hideval = true;
            $scope.hideval2 = true;
            $scope.hideval3m = true;
            $scope.hideval6m = true;
            $scope.hideval5y = false;
            $scope.hideval3y = true;
            resetZoom5Year();
        }
        else {
            $scope.showval = true;
            $scope.hideval = false;
            $scope.hideval2 = false;
            $scope.hideval3m = true;
            $scope.hideval6m = true;
            $scope.hideval5y = true;
            $scope.hideval3y = true;
        }

    //END showHideFunc
    }


//END mainController
});