let listaDeSuper = ["Sal", "Leche", "Arroz"];

function logItems(arreglo) {
  arreglo.forEach(function (item, indice) {
    console.log(indice + ": " + item);
  });
}

function superApp() {
  let comando = "";
  while (comando !== "salir") {
    comando = prompt("Comandos: nuevo, listar, borrar o salir");
    if (comando === null) {
      comando = "salir";
    }
    comando = comando.trim().toLowerCase();
    if (comando === "nuevo") {
      let item = prompt("¿Qué producto querés agregar?");
      if (item !== null && item.trim() !== "") {
        listaDeSuper.push(item.trim());
        console.log(item.trim() + " se agregó a la lista");
      }
    } else if (comando === "listar") {
      logItems(listaDeSuper);
    } else if (comando === "borrar") {
      let indice = Number(prompt("Ingresá el índice del producto a eliminar"));
      if (Number.isInteger(indice) && indice >= 0 && indice < listaDeSuper.length) {
        let eliminado = listaDeSuper.splice(indice, 1);
        console.log(eliminado[0] + " se eliminó de la lista");
      } else {
        console.log("Ese índice no existe");
      }
    } else if (comando === "salir") {
      console.log("¡Hasta la próxima compra!");
    } else {
      console.log("Comando no reconocido");
    }
  }
}

function queDevuelve() {
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let colores = ["Rojo", "Azul", "Verde", "Amarillo"];
  let salida = [];
  numbers.forEach(function (color) {
    if (color % 3 === 0) {
      console.log(color);
      salida.push(color);
    }
  });
  return salida;
}

function mostrarInvertido(arreglo) {
  let invertido = [];
  for (let i = arreglo.length - 1; i >= 0; i--) {
    invertido.push(arreglo[i]);
  }
  console.log(invertido);
  return invertido;
}

function invertir(arreglo) {
  for (let i = 0; i < Math.floor(arreglo.length / 2); i++) {
    let temporal = arreglo[i];
    arreglo[i] = arreglo[arreglo.length - 1 - i];
    arreglo[arreglo.length - 1 - i] = temporal;
  }
  return arreglo;
}

let poemaDesordenado = "los sean porque es ley tengan verdadera cualquier que porque entre pelean devoran de ajuera los los ellos si sea tiempo en unión primera la ésa unidos hermanos";

function ordenarPoema(texto) {
  let palabras = texto.split(" ");
  let ordenado = [];
  let delPrincipio = true;
  while (palabras.length > 0) {
    if (delPrincipio) {
      ordenado.push(palabras.shift());
    } else {
      ordenado.push(palabras.pop());
    }
    delPrincipio = !delPrincipio;
  }
  ordenado.splice(ordenado.indexOf("pelean"), 0, "se");
  return ordenado;
}

function isUniform(arreglo) {
  for (let i = 1; i < arreglo.length; i++) {
    if (arreglo[i] !== arreglo[0]) {
      return false;
    }
  }
  return true;
}

function biggest_smallest(numeros) {
  let menor = numeros[0];
  let mayor = numeros[0];
  numeros.forEach(function (numero) {
    if (numero < menor) {
      menor = numero;
    }
    if (numero > mayor) {
      mayor = numero;
    }
  });
  console.log([menor, mayor]);
  return [menor, mayor];
}

let mayoresOIgualesA5 = (arr) => arr.filter((numero) => numero >= 5);

let numeros = [3, 7, 6, 13, 2, 24, 99];
let pares = numeros.filter((numero) => numero % 2 === 0);

let palabras = ["Et", "Voluptua", "Sed", "At", "Diam", "Lorem"];
const palabrasCortas = palabras.filter((palabra) => palabra.length <= 3);

const mix = [
  "Ut vero.",
  2,
  function () { console.log("hola mundo!"); },
  56,
  "Diam rebum nonumy et.",
  true,
  false,
  "Kasd stet.",
  "Sit et dolor.",
  null,
  null,
  [1, 2, 3],
  "Dolore."
];
const soloStrings = mix.filter((elemento) => typeof elemento === "string");

let playlist = ["Smells Like Teen Spirit", "Everlong", "Come As You Are", "The Pretender", "Heart-Shaped Box", "Learn to Fly", "Lithium"];
let playlistEscuchada = ["The Pretender", "Lithium", "Come As You Are"];
let playlistSinEscuchar = playlist.filter((cancion) => !playlistEscuchada.includes(cancion));

function fibonacci(posicion) {
  let serie = [0, 1];
  while (serie.length < posicion) {
    serie.push(serie[serie.length - 1] + serie[serie.length - 2]);
  }
  return serie[posicion - 1];
}

console.log("Lista de Súper:");
logItems(listaDeSuper);
console.log("¿Qué devuelve este código?", queDevuelve());
console.log("Invertido sin modificar:", mostrarInvertido([1, 2, 3, 4, 5]));
console.log("Invertido modificando:", invertir([1, 2, 3, 4, 5]));
console.log(ordenarPoema(poemaDesordenado).join(" "));
console.log(isUniform([1, 1, 1, 1]), isUniform([1, 2, 1, 1]), isUniform(["a", "b", "p"]), isUniform(["b", "b", "b"]));
biggest_smallest([111, 27, 31, 44, 101, 213, 33, 58]);
console.log(mayoresOIgualesA5([3, 6, 8, 21]));
console.log(pares);
console.log(palabrasCortas);
console.log(soloStrings);
console.log(playlistSinEscuchar);
console.log("Fibonacci (2):", fibonacci(2), "Fibonacci (5):", fibonacci(5), "Fibonacci (8):", fibonacci(8));
