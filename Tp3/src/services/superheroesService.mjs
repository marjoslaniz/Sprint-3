
import SuperHeroRepository from '../repository/SuperHeroRepository.mjs';
//import superHeroRepository from '../repository/SuperHeroRepository.mjs'


export async function obtenerSuperheroePorId(id){
    return await SuperHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes() {
    //return await superHeroRepository.obtenerTodos();
    return await SuperHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor){
    return await SuperHeroRepository.buscarPorAtributo(atributo, valor);
}
export async function obtenerSuperheroesMayoresDe30(param){
    return await SuperHeroRepository.obtenerMayoresDe30();
}

export const nuevoSuperHero = async (datosSuperHero) => {
    return await SuperHeroRepository.nuevoSuperHero(datosSuperHero);
}
//agregada para probar ahora
/*export async function obtenerSuperheroesMayoresDe30YconFiltros() {
    const heroes = await superHeroRepository.obtenerTodos();
    return heroes.filter(hero => hero.edad > 30); 
  }*/

export const actualizarSuperHero = async (id, datosActualizados) => {
    return await SuperHeroRepository.actualizarSuperHero(id, datosActualizados);
}

export const eliminarSuperHero = async (id) => {
    return await SuperHeroRepository.eliminarSuperHero(id);
}

export const eliminarSuperHeroPorNombre = async (nombreReal) => {
    return await SuperHeroRepository.eliminarSuperHeroPorNombre(nombreReal);
}
