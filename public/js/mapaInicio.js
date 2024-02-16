/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapaInicio.js":
/*!******************************!*\
  !*** ./src/js/mapaInicio.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n//* Añadir en webpack.config.js\r\n(function () {\r\n\r\n    const lat = 40.78693700939038;\r\n    const lng = -73.96684521097656;\r\n    const zoom = 13;\r\n    \r\n    // Agregar mapa\r\n    const mapa = L.map('mapa-inicio').setView([lat, lng ], zoom)\r\n    let markers = new L.FeatureGroup().addTo(mapa)\r\n\r\n    let propiedades = [];\r\n\r\n    const categoriasSelect = document.querySelector('#categorias')\r\n    const preciosSelect = document.querySelector('#precios')\r\n\r\n    const filtros = { categoria: '', precio: '' }\r\n\r\n    // Agregar la licencia open source\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(mapa);\r\n\r\n    // Añadir evento para filtrar por categoria\r\n    categoriasSelect.addEventListener('change', e => {\r\n        filtros.categoria =+ e.target.value\r\n        filtrarPropiedades()\r\n    })\r\n\r\n    // Añadir evento para filtrar por precios\r\n    preciosSelect.addEventListener('change', e => {\r\n        filtros.precio =+ e.target.value\r\n        filtrarPropiedades()\r\n    })\r\n\r\n    const obtenerPropiedades = async () => {\r\n\r\n        try {\r\n\r\n            const url = '/api/properties'\r\n            const respuesta = await fetch(url)\r\n            propiedades = await respuesta.json()\r\n\r\n        } catch (error) {\r\n            console.log(error)\r\n        }\r\n\r\n        if(categoriasSelect.value) {\r\n            \r\n            filtros.categoria =+ categoriasSelect.value\r\n            filtrarPropiedades()\r\n\r\n        } else if(preciosSelect.value) {\r\n\r\n            filtros.precio =+ preciosSelect.value\r\n            filtrarPropiedades()\r\n            \r\n        } else {\r\n            mostrarPropiedades(propiedades)\r\n        }\r\n\r\n    }\r\n    \r\n    const mostrarPropiedades = propiedades => {\r\n\r\n        // Limpiar los markes previos\r\n        markers.clearLayers()\r\n\r\n        propiedades.forEach(propiedad => {\r\n\r\n            // agregar los pines\r\n            // propiedad?.lat devuelve undefined si propiedad no existe\r\n            const marker = new L.marker([propiedad?.lat, propiedad?.lng ], {\r\n                autoPan: true\r\n            })\r\n            .addTo(mapa)\r\n            .bindPopup(`\r\n                <h1 class=\"text-xl font-extrabold my-5\">${propiedad?.title}</h1>\r\n\r\n                <img src=\"uploads/${propiedad?.imagen}\" alt=\"Imagen de la propiedad ${propiedad?.title}\" class=\"max-h-5\">\r\n\r\n                <p class=\"text-indigo-600 font-bold\">${propiedad?.categoria.nombre}</p>\r\n                <p class=\"text-gray-600 font-bold\">${propiedad?.precio.nombre}</p>\r\n\r\n                <a href=\"/property/${propiedad.id}\" class=\"bg-indigo-600 block p-2 text-center font-bold\">See Property</a>\r\n            `)\r\n\r\n            markers.addLayer(marker)\r\n        })\r\n    }\r\n\r\n    const filtrarPropiedades = () => {\r\n        // resultado: arreglo nuevo\r\n        const resultado = propiedades.filter( filtrarCategoria ).filter( filtrarPrecios )\r\n\r\n        mostrarPropiedades(resultado)\r\n    }\r\n\r\n    const filtrarCategoria = propiedad => {\r\n\r\n        // si hay filtros.categoria entonces...\r\n        // itera en el areglo de propiedades\r\n        // si la propiedad.categoryId es igual al id seleccionado en filtros.categoria\r\n        // retorna los elementos que coinciden\r\n        return filtros.categoria ? propiedad.categoryId === filtros.categoria : propiedad\r\n    }\r\n\r\n    const filtrarPrecios = propiedad => {\r\n        return filtros.precio ? propiedad.priceId === filtros.precio : propiedad\r\n    }\r\n\r\n    obtenerPropiedades()\r\n\r\n})()\n\n//# sourceURL=webpack://bienes-raices/./src/js/mapaInicio.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapaInicio.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;