/*Es esta capa se definen los controladores, que determinan como se obtienen parametros 
de las url y llama a la funciones que los van a utiliar. Tambien invoca la renderizacion de la capa View*/


import { 
    obtenerSuperheroePorId, //aca puede ser la diferencia
    obtenerTodosLosSuperheroes, 
    buscarSuperheroesPorAtributo, 
    obtenerSuperheroesMayoresDe30, 
    nuevoSuperHero,  /*obtenerSuperheroesMayoresDe30YconFiltros*/
    actualizarSuperHero,
    eliminarSuperHero, 
    eliminarSuperHeroPorNombre
} from '../services/superheroesService.mjs';

import { renderizarSuperheroe, 
        renderizarListaSuperHeroes,  
        renderizarMensajeDeOperacion 
} from '../views/responseViews.mjs';

import { navBarLinks } from '../config/navabarLinks.mjs';

export async function obtenerSuperheroePorIdController(req, res){
    const {id} = req.params;
    const superheroe = await obtenerSuperheroePorId(id);

    if(superheroe){
        res.send(renderizarSuperheroe(superheroe));
    }else{
        res.status(404).send({mensaje: "Superheroe no encontrado"});
    }
}

export const renderizarQuinesSomosController = async (req, res) => {
    res.render(
        'quienessomoslayout', 
        {
            layout: 'layout',
            navbarLinks: navBarLinks,
            title: 'Quienes somos', 
            message: req.query.message || '', 
        }   
    );
};

export const renderizarInicioController = async (req, res) => {
    res.render(
        'indexlayout', 
        {
            layout: 'layout',
            navbarLinks: navBarLinks,
            title: 'Inicio', 
            message: req.query.message || '', 
        }   
    );
};

/*export async function obtenerTodosLosSuperheroesController(req, res){
    const superheroes = await obtenerTodosLosSuperheroes();
    //res.send(renderizarListaSuperHeroes(superheroes));
    res.render('dashboard',{ superheroes });
}*/

export const renderizarTodosLosSuperHeroesController = async (req, res) => {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        if(superheroes && superheroes.length > 0){
            //console.log(superheroes);
            res.render(
                'dashboard', 
                {
                    layout: 'layout',
                    navbarLinks: navBarLinks,
                    title: 'Todos los superheroes',
                    message: req.query.message || '', 
                    superheroes
                });
            //res.send(renderizarListaSuperHeroes(superheroes));
        } else {
            res.render(
                'dashboard', 
                {
                    title: 'Todos los superheroes',  
                    message: req.query.message || '',
                    superheroes: []
                }
            );
            //res.status(404).send({mensaje: "Superheroes no encontrados"});
        }
    } catch (error) {
        res.status(500).send({mensaje: 'Error al obtener todos los superhéroes', error: error.message});
    }
};

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

export const renderizarAddSuperheroController = (req, res) => {
    //res.render('addsuperhero', {title: 'Agregar superhéroe'});

    res.render(
        'addSuperhero', 
        {
            layout: 'layout',
            title: 'Agregar superheroe', 
            navbarLinks: navBarLinks,
            errors: [], 
            message: req.query.message || ''
        });
}

export const renderizarEditSuperheroController = async (req, res) => {
    
    try {

        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if(!superheroe){
            return res.status(404).render('error', {
                title: 'Error', 
                message: 'Superhéroe no encontrado'
            });
        }

        superheroe.poderes = Array.isArray(superheroe.poderes) ? superheroe.poderes : [];

        console.log(superheroe);
        res.render('editSuperhero', {
            layout: 'layout',
            title: 'Editar superhéroe', 
            navbarLinks: navBarLinks,
            superheroe, 
            errors: [],
            oldInputs: superheroe 
        });

    } catch (error) {
        res.status(500).render('error', {
            title: 'Error', 
            message: 'Ocurrió un error al cargar la vista de edición', 
            error: error.message
        });
    }

};

export const renderizarDeleteSuperHeroController = async (req, res) => {
    const { id } = req.params;
    try {
        const superheroe = await obtenerSuperheroePorId(id);
        if(superheroe){
            res.render('eliminarSuperhero', {
            layout: 'layout', 
            title: 'Desea eliminar el superhéroe?', 
            navbarLinks: navBarLinks,    
            superheroe
            }); 
        } else {
            res.status(404).send({mensaje: 'Superhéroe no encontrado'});
        }
    } catch (error) {
        res.status(500).send({mensaje: 'no se pudo encontrar el super héroe'});
        console.error('No se pudo encontrar el superhéroe', error);
    }
};



export const nuevoSuperHeroController = async (req, res) => {
    try {
        /*const datosSuperHero = req.body;
        const {nombreSuperHeroe, nombreReal, edad, planetaOrigen} = req.body;
        const superheroe = await nuevoSuperHero(datosSuperHero);
        if(superheroe){
            res.send(renderizarSuperheroe(superheroe));
        }else{
            res.status(400).send({mensaje: "No se puede insertar el superhéroe", error: error.message});
        }*/
        const {nombreSuperHeroe, nombreReal, edad, planetaOrigen} = req.body;
        
        //const poderes = Array.isArray(req.body.poderes) ? req.body.poderes : [req.body.poderes];
        let poderes = req.body.poderes; 
        if (poderes) {
            poderes = poderes.split(',').map(poder => poder.trim());
        }
        

        const datosSuperHero = {
            nombreSuperHeroe, nombreReal, edad: parseInt(edad), planetaOrigen, poderes
        };
        console.log(datosSuperHero);
        const superHero = await nuevoSuperHero(datosSuperHero);

        if(superHero){
            //res.send(renderizarSuperHeroe(superHero));
            res.redirect('/api/heroes/dashboard');
        } else {
            res.status(400).send({mensaje: "No se puedo insertar el superhéroe", error: error.message});    
        }
        
    } catch (error) {
        res.status(400).send({mensaje: "error al insertar el nuevo superhéroe", error: error.message});     
    }
}

export const actualizarSuperHeroController = async (req, res) => {
    const { id } = req.params;
    //const datosActualizados = req.body;
    //const superheroe = await actualizarSuperHero(id, datosActualizados);
    const { nombreSuperHeroe, nombreReal, edad, planetaOrigen } = req.body;
    const poderes = Array.isArray(req.body.poderes) ? req.body.poderes : [req.body.poderes];
    const datosActualizados = {
        nombreSuperHeroe, 
        nombreReal, 
        edad: parseInt(edad), 
        planetaOrigen, 
        poderes
    }
    const superheroe = await actualizarSuperHero(id, datosActualizados);
    if(superheroe){
        //res.send(renderizarSuperheroe(superheroe));
        const superheroes = await obtenerTodosLosSuperHeroes();
        res.redirect('/api/heroes/dashboard');
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