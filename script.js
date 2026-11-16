const lista = document.getElementById("lista");
const salida = document.getElementById("salida");
const total = document.getElementById("total");

function escribir(texto, clase) {
  const linea = document.createElement("span");
  linea.className = clase || "";
  linea.textContent = `${texto}\n`;
  salida.appendChild(linea);
  salida.scrollTop = salida.scrollHeight;
}

function dibujarLista(resaltar) {
  lista.innerHTML = "";
  listaDeSuper.forEach((item, indice) => {
    const fila = document.createElement("li");
    fila.innerHTML = `<span class="indice">${indice}</span><span>${item}</span>`;
    if (indice === resaltar) fila.classList.add("nuevo");
    fila.addEventListener("click", () => ejecutar(`borrar ${indice}`));
    lista.appendChild(fila);
  });
  total.textContent = listaDeSuper.length;
}

function ejecutar(texto) {
  const partes = texto.trim().split(" ");
  const comando = (partes.shift() || "").toLowerCase();
  const argumento = partes.join(" ").trim();
  escribir(`> ${texto}`, "eco");

  if (comando === "nuevo") {
    if (!argumento) {
      escribir("Decime qué producto agregar: nuevo pan", "error");
      return;
    }
    listaDeSuper.push(argumento);
    escribir(`${argumento} se agregó a la lista`, "ok");
    dibujarLista(listaDeSuper.length - 1);
  } else if (comando === "listar") {
    listaDeSuper.forEach((item, indice) => escribir(`${indice}: ${item}`));
    logItems(listaDeSuper);
  } else if (comando === "borrar") {
    const indice = Number(argumento);
    if (argumento !== "" && Number.isInteger(indice) && indice >= 0 && indice < listaDeSuper.length) {
      const fila = lista.children[indice];
      fila.classList.add("saliendo");
      const eliminado = listaDeSuper.splice(indice, 1);
      escribir(`${eliminado[0]} se eliminó de la lista`, "ok");
      setTimeout(() => dibujarLista(), 350);
    } else {
      escribir("Ese índice no existe", "error");
    }
  } else if (comando === "salir") {
    escribir("¡Hasta la próxima compra! 🛍️", "ok");
    document.getElementById("comando").disabled = true;
    setTimeout(() => {
      document.getElementById("comando").disabled = false;
      escribir("(la caja volvió a abrir)", "eco");
    }, 2500);
  } else {
    escribir("Comando no reconocido", "error");
  }
}

document.getElementById("formComando").addEventListener("submit", (evento) => {
  evento.preventDefault();
  const campo = document.getElementById("comando");
  if (campo.value.trim()) ejecutar(campo.value);
  campo.value = "";
});

document.querySelectorAll("[data-comando]").forEach((boton) => boton.addEventListener("click", () => ejecutar(boton.dataset.comando)));
document.getElementById("btnPrompt").addEventListener("click", () => {
  superApp();
  dibujarLista();
});

const formato = (valor) => JSON.stringify(valor, (clave, v) => (typeof v === "function" ? "ƒ ()" : v)).replace(/,/g, ", ");

const ejercicios = [
  {
    titulo: "¿Qué devuelve este código?",
    pregunta: "forEach sobre numbers con color % 3 === 0",
    correr: () => `Imprime los múltiplos de 3:\n${queDevuelve().join("\n")}\n(el arreglo colores nunca se usa)`
  },
  {
    titulo: "Reverse",
    pregunta: "Sin modificar y modificando [1, 2, 3, 4, 5]",
    correr: () => {
      const original = [1, 2, 3, 4, 5];
      const copia = mostrarInvertido(original);
      const antes = formato(original);
      invertir(original);
      return `mostrarInvertido → ${formato(copia)}\noriginal sigue → ${antes}\ninvertir(original) → ${formato(original)}`;
    }
  },
  {
    titulo: "Poema Desordenado",
    pregunta: "Martín Fierro, con split, shift, pop y splice",
    poema: true,
    correr: () => {
      const ordenado = ordenarPoema(poemaDesordenado).join(" ");
      return `${ordenado.charAt(0).toUpperCase()}${ordenado.slice(1)}.\n\nTruco: las palabras están intercaladas, una del principio y otra del final. Al texto le faltaba "se", así que la agregué con splice.`;
    }
  },
  {
    titulo: "Desafío isUniform()",
    pregunta: "Corta apenas encuentra una diferencia",
    correr: () =>
      [[1, 1, 1, 1], [1, 2, 1, 1], ["a", "b", "p"], ["b", "b", "b"]]
        .map((caso) => `isUniform(${formato(caso)}) → ${isUniform(caso)}`)
        .join("\n")
  },
  {
    titulo: "Biggest Smallest",
    pregunta: "[111, 27, 31, 44, 101, 213, 33, 58]",
    correr: () => `Salida: ${biggest_smallest([111, 27, 31, 44, 101, 213, 33, 58]).join(", ")}`
  },
  {
    titulo: "Filter",
    pregunta: "Cuatro filtros distintos",
    correr: () =>
      `1 · mayoresOIgualesA5 → ${formato(mayoresOIgualesA5([3, 6, 8, 21]))}\n2 · pares → ${formato(pares)}\n3 · palabrasCortas → ${formato(palabrasCortas)}\n4 · soloStrings → ${formato(soloStrings)}`
  },
  {
    titulo: "Playlist",
    pregunta: "Canciones que todavía no escuchaste",
    correr: () => playlistSinEscuchar.map((cancion) => `♪ ${cancion}`).join("\n")
  },
  {
    titulo: "Fibonacci",
    pregunta: "Número en la posición X de la serie",
    entrada: true,
    correr: (posicion) => {
      const p = Math.max(1, Math.min(40, Number(posicion) || 1));
      const serie = [];
      for (let i = 1; i <= p; i++) serie.push(fibonacci(i));
      return `Fibonacci (${p}): ${fibonacci(p)}\nSerie: ${serie.join(", ")}`;
    }
  }
];

const contenedor = document.getElementById("ejercicios");
ejercicios.forEach((ejercicio, indice) => {
  const tarjeta = document.createElement("article");
  tarjeta.className = "producto";
  tarjeta.style.animationDelay = `${indice * 70}ms`;
  tarjeta.innerHTML = `
    <p class="producto__codigo">ART. ${String(indice + 1).padStart(3, "0")}</p>
    <h3>${ejercicio.titulo}</h3>
    <p class="producto__pregunta">${ejercicio.pregunta}</p>
    ${ejercicio.entrada ? '<label class="producto__entrada">Posición <input type="number" value="8" min="1" max="40"></label>' : ""}
    <button type="button">Ejecutar</button>
    <pre class="producto__salida"></pre>`;
  const boton = tarjeta.querySelector("button");
  const resultado = tarjeta.querySelector(".producto__salida");
  boton.addEventListener("click", () => {
    const valor = ejercicio.entrada ? tarjeta.querySelector("input").value : undefined;
    resultado.textContent = ejercicio.correr(valor);
    tarjeta.classList.remove("abierta");
    void tarjeta.offsetWidth;
    tarjeta.classList.add("abierta");
  });
  contenedor.appendChild(tarjeta);
});

escribir("Caja abierta. Probá: nuevo yerba", "eco");
dibujarLista();
