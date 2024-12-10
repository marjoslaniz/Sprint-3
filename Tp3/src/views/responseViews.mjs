
export const renderizarSuperheroe = (superheroe) => {
    return {
        Nombre: superheroe.nombreSuperHeroe,
        "Nombre Real": superheroe.nombreReal, 
        Edad: superheroe.edad, 
        Debilidad: superheroe.debilidad, 
        Poderes: superheroe.poderes, 
        Aliados: superheroe.aliados, 
        Enemigos: superheroe.enemigos
    }
}

export function renderizarListaSuperHeroes(superheroes){
    return superheroes.map(superheroe => renderizarSuperheroe(superheroe));
}

export const renderizarMensajeDeOperacion = (mensaje, detalle = null) => {
    return {
        mensaje, 
        detalle
    }
}