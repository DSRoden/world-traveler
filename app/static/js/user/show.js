/*global google:true */

(function(){
  'use strict';

  var map;

  $(document).ready(function(){
    var positions = getPosition();
    initMap(positions.lat, positions.lng, 7);
    addMarker(positions.lat,positions.lng, positions.name);
  });

 function addMarker(lat, lng, name){
    var latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, animation: google.maps.Animation.DROP, icon: '/img/bird.png'});
  }

  function getPosition(){
      var name = $('#data').attr('data-name'),
          lat = $('#data').attr('data-lat'),
          lng = $('#data').attr('data-lng'),
          pos = {name:name, lat:parseFloat(lat), lng:parseFloat(lng)};
      console.log(pos);
      return pos;
  }

  function initMap(lat, lng, zoom){
    var styles = [{'featureType':'water','stylers':[{'color':'#46bcec'},{'visibility':'on'}]},{'featureType':'landscape','stylers':[{'color':'#f2f2f2'}]},{'featureType':'road','stylers':[{'saturation':-100},{'lightness':45}]},{'featureType':'road.highway','stylers':[{'visibility':'simplified'}]},{'featureType':'road.arterial','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'administrative','elementType':'labels.text.fill','stylers':[{'color':'#444444'}]},{'featureType':'transit','stylers':[{'visibility':'off'}]},{'featureType':'poi','stylers':[{'visibility':'off'}]}],
        mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: styles }; //can be ROADMAP
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }
})();

