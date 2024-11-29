import express from 'express';

import { 
    //obtenerSuperheroeMayoresDe30Controller,
    obtenerTodosLosSuperheroesController,
    obtenerSuperheroePorIdController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroeMayoresDe30Controller,
    nuevoSuperHeroController,
    //obtenerSuperheroesMayoresDe30YConFiltrosController,
    actualizarSuperHeroController,
    eliminarSuperHeroController,
    eliminarSuperHeroPorNombreController
    
} from '../controllers/superheroesController.mjs';

const router = express.Router();

router.get('/heroes/mayores-30', obtenerSuperheroeMayoresDe30Controller),
router.get('/heroes', obtenerTodosLosSuperheroesController),
router.get('/heroes/:id', obtenerSuperheroePorIdController),
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

//router.get('/superheroes/filtros', obtenerSuperheroesMayoresDe30YConFiltrosController)

router.post('/heroes/nuevo', nuevoSuperHeroController );

router.put('/heroes/actualizar/:id', actualizarSuperHeroController);
router.delete('/heroes/eliminar/:id', eliminarSuperHeroController);
router.delete('/heroes/eliminarpornombre/:nombreReal', eliminarSuperHeroPorNombreController);

export default router;
