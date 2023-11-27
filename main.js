//registrando a service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      let reg;
      reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });

      console.log('Service worker registrada! 😎', reg);
      postNews();
    } catch (err) {
      console.log('😥 Service worker registro falhou: ', err);
    }
  });
}

let posicaoInicial;
const capturandoLocalizacao = document.getElementById('localizacao');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');
const map = document.getElementById('gmap_canvas');

const sucesso = (posicao) => {
  posicaoInicial = posicao;
  latitude.innerHTML = posicaoInicial.coords.latitude;
  longitude.innerHTML = posicaoInicial.coords.longitude;
  map.src = "http://www.google.com/maps?q=" + posicaoInicial.coords.latitude + "," + posicaoInicial.coords.longitude + "&z = 16&output=embed";

};

const erro = (erro) => {
  let errorMessage;
  switch (erro.code) {
    case 0:
      errorMessage = 'Erro desconhecido';
      break;
      case 1: 
      errorMessage = 'Permissão negada para geolocalização';
      break;
      case 2:
        errorMessage = 'Dispositivo sem GPS';
        break;
        case 3:
          errorMessage = 'Tempo de requisição expirado';
          break;
  }
  console.log('Ocorreu um erro' + errorMessage);
};
capturandoLocalizacao.addEventListener('click', () => {
 navigator.geolocation.getCurrentPosition(sucesso, erro);
});