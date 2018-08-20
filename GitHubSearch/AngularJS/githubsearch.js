(function () {
    var app = angular.module('GithubSearchApp', []);
    app.controller('homeController',
       function homeController($scope, $http) {
           $scope.searchText = "";
           $scope.results = [];
           $scope.bookmarks = [];
           $scope.bookmarksDisabled = true;
           $scope.searchResultDisabled = true;
           $scope.bookmarksDisabledList = true;
           $scope.searchResultDisabledList = true;

           $scope.Search = function (searchText) {
               $http({
                   method: "GET",
                   url: '/Home/SearchGitHubResult?search=' + searchText
               }).then(function mySuccess(response) {
                   $scope.results = response.data.Items;
                   $scope.bookmarksDisabled = true;
                   $scope.searchResultDisabled = false;
                   $scope.bookmarksDisabledList = true;
                   $scope.searchResultDisabledList = false;
               }, function myError(response) {
                   $scope.myWelcome = response.statusText;
               });
           };

           $scope.toBookmark = function (name, avatar) {
               $http({
                   method: "Post",
                   url: '/Home/SetBookmark',
                   data: { name: name, avatar: avatar }
               }).then(function mySuccess() {
                   $scope.bookmarksDisabled = false;
                   $scope.searchResultDisabled = false;
               }, function myError(response) {
                   $scope.myWelcome = response.statusText;
               });
           };

           
           $scope.ShowSavedBookmarks = function () {
               $http({
                   method: "GET",
                   url: '/Home/GetBookmarks'
               }).then(function mySuccess(response) {
                   $scope.bookmarks = response.data;
                   $scope.bookmarksDisabled = false;
                   $scope.searchResultDisabled = false;
                   $scope.bookmarksDisabledList = false;
                   $scope.searchResultDisabledList = true;
               }, function myError(response) {
                   $scope.myWelcome = response.statusText;
               });
           };


           $scope.ShowSearchResults = function () {
               $scope.bookmarksDisabled = false;
               $scope.searchResultDisabled = false;
               $scope.bookmarksDisabledList = true;
               $scope.searchResultDisabledList = false; 
           };











           //$scope.limitItemsPerReq = 10;
           //$scope.searchString = "";
           //$scope.curentItemsArray = [];
           //$scope.beforeName = "";      // image first
           //$scope.afterName = "";       // image last
           //$scope.countOfPage = 0;      // count of pages
           //$scope.prevBtnDisabled = true;   // for using before btn use limit before count
           //$scope.nextBtnDisabled = true;   // for using next btn use limit after count
           //$scope.countAfterBefore = 0;
           //$scope.BtnSearch = function (searchStr) {
           //    $scope.SearchItems(searchStr, $scope.limitItemsPerReq);
           //}

           //$scope.NextBtnSearch = function (searchStr) {
           //    $scope.SearchItemsAfter(searchStr, $scope.limitItemsPerReq, $scope.afterName, $scope.countAfterBefore);
           //}

           //$scope.PrevBtnSearch = function (searchStr) {
           //    $scope.SearchItemsBefore(searchStr, $scope.limitItemsPerReq, $scope.beforeName, $scope.countAfterBefore);
           //}

           //// Service methods
           //$scope.SearchItems = function (searchStr, limit) {
           //    $scope.searchString = searchStr;
           //    reddit.search($scope.searchString).t("all").limit(limit).fetch(function (res) {
           //        $scope.FillItemsToArray(res);
           //    });
           //    $scope.countAfterBefore = 0;
           //    $scope.countOfPage = 0;
           //    $scope.nextBtnDisabled = false;
           //    $scope.prevBtnDisabled = true;
           //}

           //$scope.SearchItemsAfter = function (searchStr, limit, after, count) {
           //    $scope.nextBtnDisabled = true;
           //    $scope.searchString = searchStr;
           //    reddit.search($scope.searchString).t("all").limit(limit).after(after).count(count).fetch(function (res) {
           //        $scope.FillItemsToArray(res);
           //    });
           //    $scope.countAfterBefore += limit;
           //    $scope.countOfPage++;
           //    $scope.prevBtnDisabled = false;
           //    $scope.nextBtnDisabled = false;
           //}

           //$scope.SearchItemsBefore = function (searchStr, limit, before, count) {
           //    $scope.prevBtnDisabled = true;
           //    $scope.searchString = searchStr;
           //    reddit.search($scope.searchString).t("all").limit(limit).before(before).count(count).fetch(function (res) {
           //        $scope.FillItemsToArray(res);
           //    });
           //    if ($scope.countOfPage > 0) {
           //        $scope.countOfPage--;
           //        $scope.countAfterBefore -= limit;
           //    }
           //    if ($scope.countOfPage === 0) {
           //        $scope.prevBtnDisabled = true;
           //    } else {
           //        $scope.prevBtnDisabled = false;
           //    }
           //}

           //$scope.GetTopItems = function (limit) {
           //    reddit.top("aww").t("day").limit(limit).fetch(function (res) {
           //        $scope.FillItemsToArray(res);
           //    });
           //};

           //$scope.FillItemsToArray = function (result) {
           //    $scope.curentItemsArray = [];
           //    $scope.beforeName = result.data.before;
           //    $scope.afterName = result.data.after;
           //    for (var i = 0; i < result.data.children.length; i++) {
           //        var resultItemData = result.data.children[i].data;
           //        if (resultItemData.post_hint === "image") {
           //            $scope.curentItemsArray.push(resultItemData);
           //        }
           //    }
           //    $scope.$apply();
           //}

           //$scope.GetTopItems($scope.limitItemsPerReq);
       });
}());










//var GithubSearchApp = angular.module("GithubSearchApp", ['ngRoute', 'truncate', 'ui.bootstrap']);


//GithubSearchApp.controller("HomeController",
//    function HomeController($scope, $http, $location, $modal) {
//        //$scope.id = $location.search().srid;
//        //$scope.reset = $location.search().reset;
//        //$scope.loading = false;
//        //$scope.hideForm = false;
//        //$scope.showSubmit = false;
//        //$scope.showException = false;
//        //$scope.ExceptionMessageText = "Request not found.";

//        $scope.search = "";
//        $scope.searchResults = [];
//        $scope.bookmarks = [];

//        $scope.Search = function (search) {
//            $scope.loading = true;
//            angular.element.ajax({
//                type: 'Get',
//                url: '/Home/SearchGitHubResult?search=' + $scope.search,
//                //data: { search: $scope.search},
//                success: function (data) {
//                    if (data.ExceptionMessage != "") {

//                        //$scope.ExceptionMessageText = data.ExceptionMessage;
//                        //$scope.showException = true;
//                        $scope.$apply();
//                    }
//                    else {
//                        $scope.bookmarks = data;
//                        //$scope.Response = data.RmaInfoItem;
//                        //$scope.loading = false;
//                        $scope.$apply();
//                    }

//                },
//                error: function (data) {
//                    $scope.ExceptionMessageText = data.ExceptionMessage;//data.responseJSON.ExceptionMessage;
//                    //$scope.hideForm = true;
//                    //$scope.showException = true;
//                    //$scope.loading = false;
//                    $scope.$apply();
//                }
//            });
//        };

//        //$scope.Submit = function () {
//        //    $scope.loading = true;

//        //    var item = $scope.Response;
//        //    angular.element.ajax({
//        //        type: 'Post',
//        //        url: '/Radware/Api/Rma/Update',
//        //        data: item,
//        //        success: function () {
//        //            $scope.hideForm = true;
//        //            $scope.showSubmit = true;
//        //            $scope.showException = false;
//        //            $scope.loading = false;
//        //            $scope.$apply();
//        //        },
//        //        error: function () {

//        //            $scope.hideForm = true;
//        //            $scope.showException = true;
//        //            $scope.showSubmit = false;
//        //            $scope.loading = false;
//        //            $scope.$apply();
//        //        }
//        //    });

//        //};

//        //$scope.GetCountries = function () {

//        //    angular.element.ajax({
//        //        type: 'Get',
//        //        url: '/Radware/Api/Rma/GetCountries',
//        //        success: function (data) {
//        //            $scope.CountriesList = data;

//        //            $scope.$apply();
//        //        },
//        //        error: function () {

//        //            $scope.$apply();
//        //        }
//        //    });

//        //};

//        //$scope.Init();
//        //$scope.GetCountries();
//    }
//);