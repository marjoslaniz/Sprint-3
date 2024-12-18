/*Es esta capa se definen los controladores, que determinan como se obtienen parametros 
de las url y llama a la funciones que los van a utiliar. Tambien invoca la renderizacion de la capa View*/


import { 
    obtenerSuperheroePorId, 
    obtenerTodosLosSuperheroes, 
    buscarSuperheroesPorAtributo, 
    obtenerSuperheroesMayoresDe30, 
    nuevoSuperHero,  /*obtenerSuperheroesMayoresDe30YconFiltros*/
    actualizarSuperHero,
    eliminarSuperHero, 
    eliminarSuperHeroPorNombre
} from '../services/superheroesService.mjs';

import { renderizarSuperheroe, renderizarListaSuperHeroes,  renderizarMensajeDeOperacion } from '../views/responseViews.mjs';

export async function obtenerSuperheroePorIdController(req, res){
    const {id} = req.params;
    const superheroe = await obtenerSuperheroePorId(id);

    if(superheroe){
        res.send(renderizarSuperheroe(superheroe));
    }else{
        res.status(404).send({mensaje: "Superheroe no encontrado"});
    }
}


export async function obtenerTodosLosSuperheroesController(req, res){
    const superheroes = await obtenerTodosLosSuperheroes();
    res.send(renderizarListaSuperHeroes(superheroes));
}


export async function buscarSuperheroesPorAtributoController(req, res){
    const {atributo, valor} = req.params;
    const superheroe = await buscarSuperheroesPorAtributo(atributo, valor);
    if(superheroe.length > 0){
        res.send(renderizarListaSuperHeroes(superheroe));
    }else{
        res.status(404).send({mesaje: "No se encontraron superheroes con ese atributo"});
    }
}

export async function obtenerSuperheroeMayoresDe30Controller(req, res){
    const superheroe = await obtenerSuperheroesMayoresDe30(); //falto el await. Por eso daba error en mayores-30
    res.send(renderizarListaSuperHeroes(superheroe));
}

export const nuevoSuperHeroController = async (req, res) => {
    try {
        const datosSuperHero = req.body;
        const superheroe = await nuevoSuperHero(datosSuperHero);
        if(superheroe){
            res.send(renderizarSuperheroe(superheroe));
        }else{
            res.status(400).send({mensaje: "No se puede insertar el superhéroe", error: error.message});
        }
        
    } catch (error) {
        res.status(400).send({mensaje: "error al insertar el nuevo superhéroe", error: error.message});     
    }
}

export const actualizarSuperHeroController = async (req, res) => {
    const { id } = req.params;
    const datosActualizados = req.body;
    const superheroe = await actualizarSuperHero(id, datosActualizados);
    if(superheroe){
        res.send(renderizarSuperheroe(superheroe));
    } else {
        res.status(404).send({mensaje: "error al actualizar el super heroe"});
    }
}

export const eliminarSuperHeroController = async (req, res) => {
    const { id } = req.params;
    const superHeroe = await obtenerSuperheroePorId(id);
    if(superHeroe){
        await eliminarSuperHero(id);
        res.send(renderizarMensajeDeOperacion("El superheroe ha sido eliminado", renderizarSuperheroe(superHeroe)));
    } else {
        res.status(404).send(renderizarMensajeDeOperacion("Superheroe no encontrado"));
    }
}

export const eliminarSuperHeroPorNombreController = async (req, res) => {
    const { nombreReal } = req.params;
    console.log(nombreReal);
    const resultado = await eliminarSuperHeroPorNombre(nombreReal);
    if(resultado){
        res.send(renderizarMensajeDeOperacion("El superheroe ha sido eliminado", renderizarSuperheroe(resultado)));
    } else {
        res.status(404).send(renderizarMensajeDeOperacion("Superheroe no encontrado"));
    }
}