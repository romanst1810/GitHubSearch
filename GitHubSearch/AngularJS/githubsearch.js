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
                   if ($scope.bookmarks.length > 0) {
                       $scope.bookmarksDisabled = false;
                   } else {
                       $scope.bookmarksDisabled = true;
                   }
                   
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
       });
}());
