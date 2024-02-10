import Propiedad from "./Propiedad.js";
import Precio from "./Precio.js";
import Categoria from "./Categoria.js";
import Usuario from "./Usuario.js";

//* Aqui hacemos las relaciones entre tablas

// Relacion 1 a 1
// 1 Propiedad tiene 1 Precio
// Precio.hasOne(Propiedad)

// Relacion 1 a 1
// 1 Propiedad tiene 1 Precio
Propiedad.belongsTo(Precio, {foreignKey: 'priceId'})
// 1 Propiedad tiene 1 Categoria
Propiedad.belongsTo(Categoria, {foreignKey: 'categoryId'})
// 1 Propiedad tiene 1 Usuario
Propiedad.belongsTo(Usuario, {foreignKey: 'userId'})

export {
    Propiedad,
    Precio, 
    Categoria,
    Usuario
}