import express from 'express';
import { validarSuperHeroe } from '../validators/superHeroeValidator.mjs';
import { handleValidationErrors } from '../validators/errorMiddleware.mjs';
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

router.get("/", (req, res) => {
    res.render("dashboard")
})

router.get('/heroes/mayores-30', obtenerSuperheroeMayoresDe30Controller),
router.get('/heroes', obtenerTodosLosSuperheroesController),
router.get('/heroes/:id', obtenerSuperheroePorIdController),
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

//router.get('/superheroes/filtros', obtenerSuperheroesMayoresDe30YConFiltrosController)

router.post('/heroes/nuevo', validarSuperHeroe, handleValidationErrors, nuevoSuperHeroController );

router.put('/heroes/actualizar/:id', validarSuperHeroe, handleValidationErrors, actualizarSuperHeroController);
router.delete('/heroes/eliminar/:id', eliminarSuperHeroController);
router.delete('/heroes/eliminarpornombre/:nombreReal', eliminarSuperHeroPorNombreController);

export default router;
