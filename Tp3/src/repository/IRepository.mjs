class IRepository{
    
    obtenerPorId(id){
        throw new Error("Metodo 'obtenerPoId()' no implementado");
    }
    
    obtenerTodos(){
        throw new Error("Metodo 'obtenerTodos()' no implementado");
    }

    buscarPorAtributo(atributo, valor) {
        throw new Error("Metodo 'buscarPorAtributo' no implementado");
    }

    obtenerMayoresDe30(){
        throw new Error("Metodo 'obtenerMayoresDe30()' no implementado");
    }

    nuevoSuperHero(datosSuperHero){
        throw new Error("Método 'nuevoSuperheroe(datosSuperHero)' no implementado");
    }

    actualizarSuperHero(id, datosActualizados){
        throw new Error("Método 'actualizarsuperHero(id, datosActualizados)' no implementado");
    }

    eliminarSuperHero(id){
        throw new Error("Método 'eliminarSuperHero(id)' no implementado");
    }
    
    eliminarSuperHeroPorNombre(nombreReal){
        throw new Error("Método 'eliminarSuperHeroPorNombre(nombreReal)' no implementado");
    }

}

export default IRepository;