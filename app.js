const readline = require('readline');

// Array para almacenar tareas
let tareas = [];
let idCounter = 1;

// Crear interfaz de lectura
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para hacer preguntas al usuario
function pregunta(texto) {
  return new Promise((resolve) => {
    rl.question(texto, (respuesta) => {
      resolve(respuesta);
    });
  });
}

// Función para crear una tarea
async function crearTarea() {
  console.log('\n--- CREAR NUEVA TAREA ---');
  
  const titulo = await pregunta('Ingrese el título de la tarea: ');
  const descripcion = await pregunta('Ingrese la descripción de la tarea: ');
  
  let estado = false;
  let estadoIngresado = await pregunta('¿La tarea está disponible? (si/no): ');
  
  if (estadoIngresado.toLowerCase() === 'si' || estadoIngresado.toLowerCase() === 's') {
    estado = true;
  }
  
  const tarea = {
    id: idCounter++,
    titulo: titulo,
    descripcion: descripcion,
    estado: estado
  };
  
  tareas.push(tarea);
  console.log(`\n✓ Tarea "${titulo}" creada exitosamente.\n`);
}

// Función para filtrar tareas por estado
async function filtrarPorEstado() {
  console.log('\n--- FILTRAR TAREAS ---');
  
  let estadoFiltro = await pregunta('¿Filtrar por tareas disponibles o no disponibles? (disponible/no disponible): ');
  
  let estadoBuscado;
  if (estadoFiltro.toLowerCase() === 'disponible' || estadoFiltro.toLowerCase() === 'd') {
    estadoBuscado = true;
  } else if (estadoFiltro.toLowerCase() === 'no disponible' || estadoFiltro.toLowerCase() === 'n') {
    estadoBuscado = false;
  } else {
    console.log('Opción no válida.\n');
    return;
  }
  
  const tareasFiltradas = tareas.filter(tarea => tarea.estado === estadoBuscado);
  
  if (tareasFiltradas.length === 0) {
    console.log('\nNo hay tareas con ese estado.\n');
  } else {
    console.log(`\n--- TAREAS (${estadoBuscado ? 'DISPONIBLES' : 'NO DISPONIBLES'}) ---`);
    tareasFiltradas.forEach(tarea => {
      console.log(`
ID: ${tarea.id}
Título: ${tarea.titulo}
Descripción: ${tarea.descripcion}
Estado: ${tarea.estado ? '✓ Disponible' : '✗ No disponible'}
      `);
    });
  }
}

// Función para mostrar todas las tareas
function mostrarTodasLasTareas() {
  if (tareas.length === 0) {
    console.log('\nNo hay tareas registradas.\n');
  } else {
    console.log('\n--- TODAS LAS TAREAS ---');
    tareas.forEach(tarea => {
      console.log(`
ID: ${tarea.id}
Título: ${tarea.titulo}
Descripción: ${tarea.descripcion}
Estado: ${tarea.estado ? '✓ Disponible' : '✗ No disponible'}
      `);
    });
  }
}

// Función principal del menú
async function menu() {
  console.log('\n╔════════════════════════════════╗');
  console.log('║   GESTOR DE TAREAS - CONSOLA   ║');
  console.log('╚════════════════════════════════╝');
  console.log('\n¿Qué desea hacer?');
  console.log('1. Crear tarea');
  console.log('2. Filtrar tareas por estado');
  console.log('3. Ver todas las tareas');
  console.log('4. Salir');
  
  const opcion = await pregunta('\nIngrese su opción (1-4): ');
  
  switch (opcion) {
    case '1':
      await crearTarea();
      await menu();
      break;
    
    case '2':
      await filtrarPorEstado();
      await menu();
      break;
    
    case '3':
      mostrarTodasLasTareas();
      await menu();
      break;
    
    case '4':
      console.log('\n¡Hasta luego!\n');
      rl.close();
      break;
    
    default:
      console.log('\nOpción no válida. Intente de nuevo.\n');
      await menu();
  }
}

// Iniciar la aplicación
menu();
