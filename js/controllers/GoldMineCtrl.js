parkease.controller('GoldMineCtrl',['$scope','$location','$http',function($scope,$location,$http) {
	//$scope.selectedAreaMapMarkers = []
	//$scope.linkMindNearMapMarkers = []

	$http.get('data/goldMineData.json').success(function(response){
		if(response.success) {
			$scope.info = response.data;
			//$scope.generateMap('selectedAreaMap', [$scope.info.position]);
			$scope.generateMap('linkMindNearMap', $scope.info.linkMind);
		}
	}).error(function(){
		alert('Error')
	});	

	$scope.generateMap = function(mapName, data) {
		var g = google.maps;
		//var data = $scope.linkMind;
		
		var opts_map = {
			center: new g.LatLng(50, 8),
			zoom: 5,
			mapTypeId: g.MapTypeId.ROADMAP,
			scaleControl: true,
			streetViewControl: false,
			mapTypeControlOptions: {
				mapTypeIds: [ g.MapTypeId.ROADMAP, g.MapTypeId.SATELLITE, g.MapTypeId.TERRAIN]
			}
		};
		$scope[mapName] = new g.Map(document.getElementById(mapName), opts_map);
		$scope[mapName+ '_iw'] = new g.InfoWindow();
		// v2 behaviour
		g.event.addListener($scope[mapName], "click", function() {
			if ($scope[mapName+ '_iw']) $scope[mapName+ '_iw'].close();
		});

		// Load all markers
		for (var i = 0, n; n = data[i]; i++) {
			var point = new g.LatLng(parseFloat(n.lat), parseFloat(n.lng));
			$scope.createMarker(point, n.top, n.left, n.name, i, mapName);
		}
	};
	
	$scope.createMarker = function(point, top, left, name, i, mapName) {
		var g = google.maps;
		var base = "http://sites.google.com/site/mxamples/icons-dot.png";
		
		var image = { 
			url: base,
			size: new g.Size(32, 32),
			origin: new g.Point(top, left),
			anchor: new g.Point(15, 32) 
		};

		/* shadows are deprecated since API version 3.14
		var shadow = { url: base,
		size: new g.Size(59, 32),
		origin: new g.Point(192, 32),
		anchor: new g.Point(15, 32) };
		*/
		var marker = new g.Marker({ 
			position: point,
			map: $scope[mapName], 
			title: name, 
			clickable: true,
			draggable: false, 
			icon: image,
			index: i
		});

		var html ="<div class='infowindow'>" +
		"<span style='font-weight:bold'>"+ name + "<\/span>" +
		"<\/p><\/div>";

		// Store markers content as property of gmarkers
		marker.content = html;
		//$scope[mapName + 'Markers'].push(marker);

		g.event.addListener(marker, "click", function() {
			$scope[mapName+ '_iw'].setContent(marker.content);
			$scope[mapName+ '_iw'].open($scope[mapName], this);
		});
	};

	
}]);