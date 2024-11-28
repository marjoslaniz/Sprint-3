import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';
import mongoose from "mongoose";

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id){
        return await SuperHero.findById(id);
    }

    async obtenerTodos() {
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor) {
        try{
          if(atributo!='edad'){
            const query = {[atributo]: new RegExp(valor, 'i')};
            return await SuperHero.find(query);
          }else{
            const query = {[atributo]: valor};
            return await SuperHero.find(query);
          }
        }catch(error){
          console.log('Error al obtener heroes: ', error);
          throw error;
        }
   
    }
    
    async obtenerMayoresDe30(){
          try {
            return await SuperHero.find({
              edad: { $gt: 30 }, // Filtra por edad
              planetaOrigen: 'Tierra', // También filtra por planeta de origen
              //poderes: { $size: 2} //{$gte: 2} } // esto da = a 2 Poderes. 
              $and: [             
                { poderes: { $exists: true, $type: "array" } }, // Verifica que "poderes" sea un arreglo
                                   { $expr: { $gte: [{ $size: "$poderes" }, 2] } } // Condición de tamaño mínimo
               ]
            });
          } catch (error) {
            console.error('Error al obtener superhéroes mayores de 30:', error);
            throw error;
          }
    }

    async nuevoSuperHero(datosSuperHero){
        const nuevoSuperheroe = new SuperHero(datosSuperHero);
        return await nuevoSuperheroe.save();
    }

    async actualizarSuperHero(id, datosActualizados){
      return await SuperHero.updateOne(
          {_id: id},
          {$set: datosActualizados}
      );
    }

    async eliminarSuperHero(id){
      return await SuperHero.deleteOne({_id: id});
    }

    async eliminarSuperHeroPorNombre(nombreReal){
      return await SuperHero.findOneAndDelete({nombreReal: new RegExp(nombreReal, 'i') });
    }



}
    

export default new SuperHeroRepository();
