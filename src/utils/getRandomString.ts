// Función para generar un string aleatorio de longitud especificada sin utilizar crypto
export async function getRandomString(longitud : number = 6 ) :Promise<string> {
  const caracteresPermitidos = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let stringAleatorio = '';

  for (let i = 0; i < longitud; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
    stringAleatorio += caracteresPermitidos.charAt(indiceAleatorio);
  }

  return stringAleatorio;
}


