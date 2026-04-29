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
  console.log('\n╔══════════════════════════════════╗');
  console.log('║      CREAR NUEVA TAREA           ║');
  console.log('╚══════════════════════════════════╝\n');
  
  const titulo = await pregunta('Ingrese el título de la tarea: ');
  const descripcion = await pregunta('Ingrese la descripción de la tarea: ');
  
  const tarea = {
    id: idCounter++,
    titulo: titulo,
    descripcion: descripcion,
    completada: false
  };
  
  tareas.push(tarea);
  console.log(`\n✓ Tarea "${titulo}" creada exitosamente (Estado: No completada)\n`);
}

// Función para filtrar tareas por estado
async function filtrarPorEstado() {
  console.log('\n╔══════════════════════════════════╗');
  console.log('║      FILTRAR TAREAS              ║');
  console.log('╚══════════════════════════════════╝\n');
  
  let filtro = await pregunta('¿Desea ver tareas completadas o no completadas? (completadas/no completadas): ');
  
  let completadaBuscada;
  if (filtro.toLowerCase() === 'completadas' || filtro.toLowerCase() === 'c') {
    completadaBuscada = true;
  } else if (filtro.toLowerCase() === 'no completadas' || filtro.toLowerCase() === 'n') {
    completadaBuscada = false;
  } else {
    console.log('\n✗ Opción no válida.\n');
    return;
  }
  
  const tareasFiltradas = tareas.filter(tarea => tarea.completada === completadaBuscada);
  
  if (tareasFiltradas.length === 0) {
    console.log(`\n✗ No hay tareas ${completadaBuscada ? 'completadas' : 'no completadas'}.\n`);
  } else {
    console.log(`\n╔══════════════════════════════════╗`);
    console.log(`║  TAREAS ${completadaBuscada ? 'COMPLETADAS' : 'NO COMPLETADAS'.padEnd(19)} ║`);
    console.log(`╚══════════════════════════════════╝\n`);
    
    tareasFiltradas.forEach((tarea, index) => {
      console.log(`[${index + 1}] ID: ${tarea.id}`);
      console.log(`    Título: ${tarea.titulo}`);
      console.log(`    Descripción: ${tarea.descripcion}`);
      console.log(`    Estado: ${tarea.completada ? '✓ Completada' : '✗ No completada'}\n`);
    });
  }
}

// Función para mostrar todas las tareas
function mostrarTodasLasTareas() {
  if (tareas.length === 0) {
    console.log('\n✗ No hay tareas registradas.\n');
  } else {
    console.log('\n╔══════════════════════════════════╗');
    console.log('║      TODAS LAS TAREAS            ║');
    console.log('╚══════════════════════════════════╝\n');
    
    tareas.forEach((tarea, index) => {
      console.log(`[${index + 1}] ID: ${tarea.id}`);
      console.log(`    Título: ${tarea.titulo}`);
      console.log(`    Descripción: ${tarea.descripcion}`);
      console.log(`    Estado: ${tarea.completada ? '✓ Completada' : '✗ No completada'}\n`);
    });
  }
}

// Función principal del menú
async function menu() {
  console.log('\n╔══════════════════════════════════╗');
  console.log('║   GESTOR DE TAREAS - CONSOLA     ║');
  console.log('╚══════════════════════════════════╝');
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
      console.log('\n✗ Opción no válida. Intente de nuevo.\n');
      await menu();
  }
}

// Iniciar la aplicación
console.log('\n');
menu();
