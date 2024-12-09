import express from 'express';
import { validarSuperHeroe } from '../validators/superHeroeValidator.mjs';
import { handleValidationErrors } from '../validators/errorMiddleware.mjs';
import { 
    //obtenerSuperheroeMayoresDe30Controller,
    //obtenerTodosLosSuperheroesController,
    obtenerSuperheroePorIdController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroeMayoresDe30Controller,
    nuevoSuperHeroController,
    //obtenerSuperheroesMayoresDe30YConFiltrosController,
    actualizarSuperHeroController,
    eliminarSuperHeroController,
    eliminarSuperHeroPorNombreController,
    renderizarTodosLosSuperHeroesController,
    renderizarAddSuperheroController,
    renderizarEditSuperheroController, 
    renderizarDeleteSuperHeroController,
    renderizarInicioController, 
    renderizarQuinesSomosController
    
} from '../controllers/superheroesController.mjs';

const router = express.Router();

/*router.get("/", (req, res) => {
    res.render("dashboard")
})*/

const heroAuthMiddleware = (req, res, next) => {
    console.log('Hero Authentication Middleware');
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized');
    }
    next();
};

router.get('/heroes/dashboard', renderizarTodosLosSuperHeroesController),
router.get('/heroes/quienessomos', renderizarQuinesSomosController);
router.get('/heroes/mayores-30', obtenerSuperheroeMayoresDe30Controller),

router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

//router.get('/superheroes/filtros', obtenerSuperheroesMayoresDe30YConFiltrosController)
router.get('/heroes/agregar', renderizarAddSuperheroController);

router.get('/heroes/:id/editar', renderizarEditSuperheroController);
router.get('/heroes/:id/eliminar', renderizarDeleteSuperHeroController);

//ruta general
router.get('/heroes', renderizarInicioController);

router.get('/heroes/:id', obtenerSuperheroePorIdController),

router.post('/heroes/nuevo', validarSuperHeroe, handleValidationErrors, nuevoSuperHeroController );
router.post('/heroes/:id/editar', validarSuperHeroe, handleValidationErrors, actualizarSuperHeroController);
router.post('/heroes/:id/eliminar', eliminarSuperHeroController);
router.delete('/heroes/eliminar/:id', eliminarSuperHeroController);
router.put('/heroes/actualizar/:id', validarSuperHeroe, handleValidationErrors, actualizarSuperHeroController);
router.delete('/heroes/eliminarpornombre/:nombreReal', eliminarSuperHeroPorNombreController);

export default router;
