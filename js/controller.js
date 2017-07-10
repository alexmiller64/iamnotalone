angular.module('RouteControllers', [])
    .controller('HomeController', function($scope) {
        $scope.relindtitle = "I Am Not Alone";
    })
        .controller('RegisterController', function($scope, UserAPIService, store) {
 
        $scope.registrationUser = {};
        var URL = "https://morning-castle-91468.herokuapp.com/";
        $scope.login = function() {
            UserAPIService.registerUser(URL + "accounts/api-token-auth/", $scope.data).then(function(results) {
                $scope.token = results.data.token;
                store.set('username', $scope.registrationUser.username);
                store.set('authToken', $scope.token);
            }).catch(function(err) {
                console.log(err);
            });
        }
        $scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;

                UserAPIService.registerUser(URL + "accounts/register/", $scope.registrationUser).then(function(results) {
                    $scope.data = results.data;
                    alert("Hurrah! You are now registered, welcome to the gang.");
                    $scope.login();
                }).catch(function(err) {
                    alert("Uh oh....Something's not right.");
                    console.log(err);
                });
            }
 
            console.log($scope.registrationUser.username + " " + $scope.registrationUser.password);
        }
    })

        .controller('ReviewsController',function($scope, $location, store) {
    if (!store.get('authToken')) {
        $location.path("/accounts/register");
    }
})
        .controller('FirstReviewsController',function($scope, $location, store) {
    if (!store.get('authToken')) {
        $scope.lockicon = "glyphicon glyphicon-lock";}
    });