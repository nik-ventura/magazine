

var app = angular.module('magazineApp', [
    'ngRoute',
    'ngSanitize'
]);


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
//        .when('/', {templateUrl: 'templates/home.html', controller: 'HomeCtrl'})
        .when('/home', {templateUrl: 'templates/home.html', controller: 'HomeCtrl'})
        .when('/koti', {templateUrl: 'templates/home.html', controller: 'HomeCtrl'})
        .when('/ruoka', {templateUrl: 'templates/home.html', controller: 'HomeCtrl'})
        .when('/lahjaideat', {templateUrl: 'templates/home.html', controller: 'HomeCtrl'})
        .when('/kodin', {templateUrl: 'templates/home.html', controller: 'HomeCtrl'})
        .when('/vapaa-aika', {templateUrl: 'templates/home.html', controller: 'HomeCtrl'})
        .when('/:category/article/:articleId', {templateUrl: 'templates/article.html', controller:'ArticleCtrl'})
        .otherwise({redirectTo:"/home"});
//        .otherwise('/404.html')
}]);

app.controller('HomeCtrl', function($scope, $location,  $http) {

    $scope.sortCategory = function(article) {
        var getPath = $location.path().replace('/', '');
        if (getPath === "home") {
            return article
        }
        else {
            return article.category === getPath;
        }
    };

    $http.get('pages/articles.json')
        .success(function(data) {
            $scope.articlesList = data;

        })
        .error(function(data) {
            alert('Something is wrong with JSON')
        })

});

app.controller('ConfigCtrl', function($scope, $location, $http) {
    $scope.setRoute = function(route) {
        $location.path(route);
    };
    $scope.getClass = function(path) {
        if ($location.path().substr(0, path.length) == path) {
            return "active"
        } else {
            return ""
        }
    }
    $http.get('pages/config.json')
        .success(function(data) {
            $scope.config = data;
        })
        .error(function(data) {
            alert('Something is wrong with JSON')
        })
});
app.controller('FeaturedCtrl', function($scope, $location, $http) {
    $scope.sortFeatured = function(article) {
        var getPath = $location.path().replace('/', '');
        if (article.category === getPath && article.featured_stat === true) {
            return article.category === getPath;
        }
        else if (getPath === "home") {
            return article.featured_stat === true
        }
        else {
//            return article;
        }
    };
    $http.get('pages/articles.json')
        .success(function(data) {
            $scope.featured = data;
        })
        .error(function(data) {
            alert('Something is wrong with JSON')
        })
});
app.controller('ArticleCtrl', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
        $http.get('pages/articles/' + $routeParams.articleId + '.json')
            .success(function(data) {
                $scope.article = data;
            });

}]);

// Filters

app.filter('reverse', function(){
    return function(text) {
        return text.split("").reverse().join("");
    }
})