angular.module('NewsPlate', ['ui.router'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
     url: '/posts/{id}',
     templateUrl: '/posts.html',
     controller: 'PostsCtrl'
   });

    $urlRouterProvider.otherwise('home');
  }])
.factory('postsService', [function(){
  var o = {
    posts: []
  };
  return o;
}])
.controller('MainCtrl', [
  '$scope','postsService',
  function($scope, postsService){
   $scope.posts = postsService.posts;
   $scope.addPost = function(){
     if(!$scope.title || $scope.title === '') { return; }
     $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      upvotes: 0,
      comments: []
    });
     $scope.title = '';
     $scope.link = '';
   };
   $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  };
}])
.controller('PostsCtrl', [
  '$scope','$stateParams','postsService',
  function($scope, $stateParams, postsService){
    $scope.post = postsService.posts[$stateParams.id];
    $scope.addComment = function(){
    if($scope.body === '') { return; }
    $scope.post.comments.push({
      body: $scope.body,
      author: 'user',
      upvotes: 0
    });
    $scope.body = '';
  };
  }]);
