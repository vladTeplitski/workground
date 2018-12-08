var app = angular.module("chartsApp", []);

app.controller('mainController', function ($scope) {
    $scope.showval = false;
    $scope.hideval = true;
    $scope.hideval2 = false;
    $scope.hideval3m = true;
    $scope.hideval6m = true;
    $scope.hideval3y = true;
    $scope.hideval5y = true;
    $scope.hidevalDaily = true;

    //Set default display properties for hard loaded components
    infoBox5yView = document.getElementById('infoBox5y');
    infoBox3yView = document.getElementById('infoBox3y');
    chart5yearView = document.getElementById('chart5Year');
    chart5yearView.style.display = 'none';
    chart5yearLoader = document.getElementById('loader5y');
    chart5yearLoader.style.display = 'none';
    chart3yearView = document.getElementById('chart3Year');
    chart3yearView.style.display = 'none';
    chart3yearLoader = document.getElementById('loader3y');
    chart3yearLoader.style.display = 'none';

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
            $scope.hidevalDaily = true;
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
            $scope.hidevalDaily = true;
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
            $scope.hidevalDaily = true;
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
            $scope.hidevalDaily = true;
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
            $scope.hidevalDaily = true;
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
            $scope.hidevalDaily = true;

            chart3yearView.style.display = 'none';
            infoBox3yView.style.display = 'none';
            chart3yearLoader.style.display = 'flex';
            var chart3yInterval = setInterval(timer3y, 4000);
            function timer3y() {
                chart3yearLoader.style.display = 'none';
                chart3yearView.style.display = 'flex';
                infoBox3yView.style.display = 'flex';
            }

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
            $scope.hidevalDaily = true;

            chart5yearView.style.display = 'none';
            infoBox5yView.style.display = 'none';
            chart5yearLoader.style.display = 'flex';
            var chart5yInterval = setInterval(timer5y, 5000);
            function timer5y() {
                chart5yearLoader.style.display = 'none';
                chart5yearView.style.display = 'flex';
                infoBox5yView.style.display = 'flex';
            }

            resetZoom5Year();
        }
        else if (param == "showDaily") {
            $scope.showval = false;
            $scope.hideval = true;
            $scope.hideval2 = true;
            $scope.hideval3m = true;
            $scope.hideval6m = true;
            $scope.hideval5y = true;
            $scope.hideval3y = true;
            $scope.hidevalDaily = false;
            resetZoomDaily();
        }
        else {
            $scope.showval = true;
            $scope.hideval = false;
            $scope.hideval2 = false;
            $scope.hideval3m = true;
            $scope.hideval6m = true;
            $scope.hideval5y = true;
            $scope.hideval3y = true;
            $scope.hidevalDaily = true;
        }

    //END showHideFunc
    }


//END mainController
});