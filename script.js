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

escribir("Caja abierta. Probá: nuevo yerba", "eco");
dibujarLista();
