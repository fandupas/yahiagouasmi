angular.module('PasControllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    })
    .controller('VideosCtrl', function ($scope, VideoService, $stateParams) {
        var listIds;
        var id = $stateParams.playlistID;
        var promise = VideoService.getVideosByPlaylist(id);
        promise.then(function (response) {
            console.log("Videos");
            console.log(response);
            var listVideos = response.items;
            var listIds = VideoService.getListIDs(listVideos);
            var subpromise = VideoService.getListVideosByIDs(listIds);
            subpromise.then(function (response){
                console.log('Details Videos');
                console.log(response);
                $scope.videos = response;

                VideoService.videos[(id)] = response.items;
            });
        });
    })
    .controller('VideoCtrl', function ($scope, VideoService, $stateParams) {
        var videoID = $stateParams.videoID;
        var playID = $stateParams.playID;
        $scope.video = VideoService.getVideoByIDLocal(playID,videoID);
    })
    .controller('MainCtrl', function ($scope, VideoService, $stateParams, PASLinfoChannel) {
        var promise = VideoService.getChannelInfo(PASLinfoChannel);
        promise.then(function (response) {
            var list = response.items[0];
            VideoService.uploadedID = list.contentDetails.relatedPlaylists.uploads;
            var promise = VideoService.getVideosByPlaylist(VideoService.uploadedID);
            promise.then(function (response) {
                var listVideos = response.items;
                var listIds = VideoService.getListIDs(listVideos);
                var subpromise = VideoService.getListVideosByIDs(listIds);
                subpromise.then(function (response){
                    VideoService.uploadedVideos = response.items;
                    $scope.video = VideoService.uploadedVideos[0];
                    VideoService.videos[(VideoService.uploadedID)] = response.items;
                });
            });

        });
    })
    .controller('MenuCtrl', function ($scope, VideoService, PASLinfoChannel) {
        var promise = VideoService.getPlaylistsByChannel(PASLinfoChannel);
        promise.then(function (response) {
            $scope.playlists = response;
            VideoService.playlists = response.items;
        });
    })
    .controller('ShareCtrl', function ($scope, $cordovaSocialSharing, YoutubeUrl) {
        $scope.shareVideo = function(videoId){
            var videoUrl = YoutubeUrl+videoId;
            console.log(videoUrl);
            $cordovaSocialSharing
                .share(null, null, null, videoUrl) // Share via native share sheet
                .then(function(result) {})
        };
    })
    .controller('PlaylistCtrl', function ($scope,$stateParams, VideoService) {
        var id = $stateParams.playlistID;
        $scope.playlist = VideoService.getPlaylistsByIDLocal(id);
        $scope.title = $scope.playlist.snippet.title;
        console.log("Playlists");
        console.log($scope.playlist);
    });
