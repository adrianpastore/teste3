
var map;
var infoWindow;
var markersData = [{
      lat: -32.0337292,
      lng: -52.0937374,
      nome: "Frozen Café",
      endereco:"R. Silva Paes, 253 - Centro, Rio Grande - RS, 96200-340",
      telefone: "(53) 3204-4050",
      horaFuncionamento: "Abre às 11:30"
   },
   {
      lat: -32.0371003,
      lng: -52.0989915,
      nome: "De Gale Café",
      endereco:"Rua Barão de Cotegipe, 443, sala 1408. Edifício Porto de Gale Business Center, 96200-290",
      telefone: "(53) 2125-7186",
      horaFuncionamento: "Abre às 08:00"
   },
   {
      lat: -32.04064,
      lng: -52.088499,
      nome: "IFRS Campus Rio Grande",
      endereco:"Rua dos Infernos, esquina céu",
      telefone: "--",
      horaFuncionamento: "25hrs por dia"
  },
  {
      lat:-32.0631944,
      lng:-52.150501,
      nome: "Gold Coffe",
      endereco:"Av. Itália, s/n - Vila Maria Jose, Rio Grande - RS",
      telefone: "--",
      horaFuncionamento: "Abre às 07:00"
  },
  {
      lat:-32.0310055,
      lng:-52.0997415,
      nome: "Cafeteria & Doçaria Doce Café",
      endereco:"R. Vinte e Quatro de Maio, 49 C - Centro, Rio Grande - RS, 96200-006",
      telefone: "(53)3717-0217",
      horaFuncionamento: "Abre às 08:30"
  },
  {
      lat:-32.0324373,
      lng:-52.0960391,
      nome: "Além do Grão",
      endereco:"R. Luiz Lorea, 374 - Centro, Rio Grande - RS, 96200-350",
      telefone: "(53)3204-3725",
      horaFuncionamento: "Abre às 10:00"
  }
];
function initMap() {
   var mapOptions = {
     center: new google.maps.LatLng(-32.0332,-52.0986),
      zoom: 9,
      mapTypeId: 'roadmap',
   };
   map = new google.maps.Map(document.getElementById('map'), mapOptions);
   infoWindow = new google.maps.InfoWindow({map: map});
   if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
       var pos = {
         lat: position.coords.latitude,
         lng: position.coords.longitude
       };
       infoWindow.setPosition(pos);
       infoWindow.setContent('Você está aqui.');
       map.setCenter(pos);
       var voce = pos;
       var marker = new google.maps.Marker({
         position: voce,
         map: map,
         draggable: true,
         animation: google.maps.Animation.DROP
       });
       marker.addListener('click', toggleBounce);
       function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      }
     }, function() {
       handleLocationError(true, infoWindow, map.getCenter());
     });
   } else {
     // Browser doesn't support Geolocation
     handleLocationError(false, infoWindow, map.getCenter());
   }
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });
   displayMarkers();
}
google.maps.event.addDomListener(window, 'load', initMap);
//criação de marcadores
function displayMarkers(){
   var bounds = new google.maps.LatLngBounds();
   for (var i = 0; i < markersData.length; i++){
      var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
      var nome = markersData[i].nome;
      var endereco = markersData[i].endereco;
      var telefone = markersData[i].telefone;
      var horaFuncionamento = markersData[i].horaFuncionamento;
      createMarker(latlng, nome, endereco, telefone, horaFuncionamento);
      bounds.extend(latlng);
   }
   map.fitBounds(bounds);
}
function createMarker(latlng, nome, endereco, telefone, horaFuncionamento){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: nome
   });
   google.maps.event.addListener(marker, 'click', function() {
      var iwContent = '<div id="iw_container">' +
            '<div class="iw_title">' + nome + '</div>' +
         '<div class="iw_content">' + endereco + '<br />' +
         telefone + '<br />' +
         horaFuncionamento + '</div></div>';
      infoWindow.setContent(iwContent);
      infoWindow.open(map, marker);
   });
}
