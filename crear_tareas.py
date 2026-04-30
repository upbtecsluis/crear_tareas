def gestionar_tareas():
    tareas = []

    while True:
        print("\n--- GESTOR DE TAREAS ---")
        print("1. Crear tareas")
        print("2. Filtrar tareas (Completadas/Pendientes)")
        print("3. Salir")
        print("4. Salir del sistema")
        
        opcion = input("Seleccione una opción: ")

        if opcion == "1":
            titulo = input("Ingrese el título de la tarea: ")
            descripcion = input("Ingrese la descripción: ")
        
            nueva_tarea = {
                "titulo": titulo,
                "descripcion": descripcion,
                "completada": False
            }
            tareas.append(nueva_tarea)
            print(f"Tarea '{titulo}' creada exitosamente.")

        elif opcion == "2":
            if not tareas:
                print("No hay tareas registradas.")
                continue
            
            print("\n¿Qué estado desea filtrar?")
            print("1. Completadas")
            print("2. No completadas")
            
            filtro = input("Seleccione una opción: ")
            estado_buscado = True if filtro == "1" else False
            
            tareas_filtradas = [t for t in tareas if t["completada"] == estado_buscado]
            
            print(f"\n--- RESULTADOS ---")
            if tareas_filtradas:
                for t in tareas_filtradas:
                    estado = "Completada" if t["completada"] else "Pendiente"
                    print(f"[{estado}] {t['titulo']}: {t['descripcion']}")
            else:
                print("No se encontraron tareas con ese estado.")

        elif opcion == "3":
            print("Saliendos del programas")
            break
        
        else:
            print("Opción no válida. Intente de nuevos.")

gestionar_tareas()
