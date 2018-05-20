var enviar = document.getElementById('enviar');
var nome = document.getElementById('nome');
var email = document.getElementById('email');
enviar.addEventListener('submit', function (e) {
  if ((nome.checkValidity()==true)&&(email.checkValidity()==true)){
    window.location = 'index.html';
  }
});
