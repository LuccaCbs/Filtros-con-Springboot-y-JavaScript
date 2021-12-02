
/*<![CDATA[*/

/*]]>*/

//=============================================
//Arrays contenedores de los valores de filtros
//=============================================
var brands = [];
var petTypes = [];
var petSizes = [];
var petAges = [];

//=======================================
//Array contenedor de los tipos de filtro
//=======================================
var filters = [];

//==================================
//Map contenedor del os tipos de filtros
//==================================
const map = new Map();

var filterList = [brands, petTypes, petSizes, petAges];

var productView = document.getElementsByName('productView');

$(document).ready(function () {


    // AGREGANDO CLASE ACTIVE AL PRIMER ENLACE ====================
    $('.category_list .category_item[category="all"]').addClass('ct_item-active');

    //================================
    //Función "onclick" de los filtros
    //================================
    $('.category_item').click(function () {
        var filter = $(this).attr('category');
        var name = $(this).attr('name')
        const equals = (el) => el == name;

        //===========================
        //Agregado del tipo de filtro
        //===========================
        if (filter !== 'all') {
            if (!filters.includes(filter)) {
                filters.push(filter);
            }
        }

        //arreglar esta garcha*comentario motivacional*

        //======================================================================
        //Agregado y eliminación de "tipo de filtro" y "valor del filtro" al map
        //======================================================================

        switch (filter) {
            case 'brand':
                if (brands.some(equals)) {
                    removeItemFromArr(brands, name);

                    if (brands.length === 0) {
                        removeItemFromArr(filters, filter);
                    }

                    map.delete(name);
                } else {
                    brands.push(name)
                    map.set(name, filter);
                }
                break;
            case 'petType':
                if (petTypes.some(equals)) {
                    removeItemFromArr(petTypes, name);

                    if (petTypes.length === 0) {
                        removeItemFromArr(filters, filter);
                    }

                    map.delete(name);
                } else {
                    petTypes.push(name);
                    map.set(name, filter);
                }
                break;
            case 'petSize':
                if (petSizes.some(equals)) {
                    removeItemFromArr(petSizes, name);

                    if (petSizes.length === 0) {
                        removeItemFromArr(filters, filter);
                    }

                    map.delete(name);
                } else {
                    petSizes.push(name);
                    map.set(name, filter);
                }
                break;
            case 'petAge':
                if (petAges.some(equals)) {
                    removeItemFromArr(petAges, name);

                    if (petAges.length === 0) {
                        removeItemFromArr(filters, filter);
                    }

                    map.delete(name);
                } else {
                    petAges.push(name);
                    map.set(name, filter);
                }
                break;
        }

        //===============================================================================================
        //Chequeo por consola de las entradas del map, del contenedor de filtros y de la lista de filtros
        //===============================================================================================
        map.forEach(function (key, value) {
            console.log(key);
            console.log(value);
        });
        console.log(filters);
        console.log(filterList);

        //====================
        // Ocultando productos
        //====================
        $('.product-item').css('transform', 'scale(0)');
        function hideProduct() {
            $('.product-item').hide();
        } setTimeout(hideProduct, 150);

        //=============================================================
        //Filtrado de productos--*Información detallada en el "case 2"*
        //=============================================================

        if (filters.length !== 0) {
            function showProduct() {
                //====================================================================================================
                //Se realiza filtra por la cantidad de tipos de filtro (brand, petType, petSize, petAge)*ACTUALMENTE*
                //====================================================================================================
                switch (filters.length) {
                    case 1:
                        //========================================================================================================
                        //Itera el mapa y agrega el tipo de filtro contenido en el key y el valor del filtro contenido en el value
                        //========================================================================================================
                        map.forEach(function (key, value) {
                            $('.product-item[' + key + '="' + value + '"]').show();
                            $('.product-item[' + key + '="' + value + '"]').css('transform', 'scale(1)');
                        });
                        break;

                    case 2:
                        //*****************************************************************//
                        //*************Información sobre el método de filtrado*************//
                        //*****************************************************************//

                        //=============================================================================
                        //Crea variables para trabajar de forma ordenada el numero de filtros y su tipo
                        //=============================================================================
                        var filter1 = filters[0];
                        var filter2 = filters[1];

                        map.forEach(function (key, value) {
                            //============================================================================================
                            //Itera el mapa y busca coicidencias en los tipos de filtro para acceder al siguiente filtrado
                            //============================================================================================
                            if (filter1 == key) {
                                //==========================================================
                                //Cuando encuentra coincidencias captura el valor del filtro
                                //==========================================================
                                var value1 = value;
                                map.forEach(function (key, value) {
                                    //=======================================================================
                                    //Vuelve a iterar para encontrar el proximo argumento por el cual filtrar
                                    //=======================================================================
                                    //=======================================================================
                                    //Cuando encuentra coincidencias va a usar el valor del filtro almacenado
                                    //=======================================================================
                                    var value2 = value;
                                    if (filter2 == key) {
                                        //=====================================================================================
                                        //Aplica la función .show() y la propiedad css "transform" a las etiquetas con la clase 
                                        //'.product-item' que cumplan los requisitos del filtrado
                                        //=====================================================================================
                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"]').show();
                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"]').css('transform', 'scale(1)');
                                    }
                                });

                            } else if (filter2 == key) {
                                var value2 = value;
                                map.forEach(function (key, value) {
                                    var value1 = value;
                                    if (filter1 == key) {
                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"]').show();
                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"]').css('transform', 'scale(1)');
                                    }
                                });
                            }

                        });

                        break;

                    case 3:
                        //===========================================================================================================
                        //Reproduce el método de filtrado agregando las condiciones necesarias según la cantidad de "tipos de filtro"
                        //===========================================================================================================

                        var filter1 = filters[0];
                        var filter2 = filters[1];
                        var filter3 = filters[2];

                        map.forEach(function (key, value) {
                            if (filter1 == key) {
                                var value1 = value;
                                map.forEach(function (key, value) {
                                    if (filter2 == key) {
                                        var value2 = value;
                                        map.forEach(function (key, value) {
                                            var value3 = value;
                                            if (filter3 == key) {
                                                $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"]').show();
                                                $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"]').css('transform', 'scale(1)');
                                            }
                                        });

                                    } else if (filter3 == key) {
                                        var value3 = value;
                                        map.forEach(function (key, value) {
                                            var value2 = value;
                                            if (filter2 == key) {
                                                $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"]').show();
                                                $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"]').css('transform', 'scale(1)');
                                            }
                                        });
                                    }
                                });
                            } else if (filter2 == key) {
                                var value2 = value;
                                map.forEach(function (key, value) {
                                    if (filter1 == key) {
                                        var value1 = value;
                                        map.forEach(function (key, value) {
                                            var value3 = value;
                                            if (filter3 == key) {
                                                $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"]').show();
                                                $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"]').css('transform', 'scale(1)');
                                            }
                                        });

                                    } else if (filter3 == key) {
                                        var value3 = value;
                                        map.forEach(function (key, value) {
                                            var value1 = value;
                                            if (filter1 == key) {
                                                $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"]').show();
                                                $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"]').css('transform', 'scale(1)');
                                            }
                                        });
                                    }
                                });
                            } else if (filter3 == key) {
                                var value3 = value;
                                map.forEach(function (key, value) {
                                    if (filter1 == key) {
                                        var value1 = value;
                                        map.forEach(function (key, value) {
                                            var value2 = value;
                                            if (filter2 == key) {
                                                $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"]').show();
                                                $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"]').css('transform', 'scale(1)');
                                            }
                                        });

                                    } else if (filter2 == key) {
                                        var value2 = value;
                                        map.forEach(function (key, value) {
                                            var value1 = value;
                                            if (filter1 == key) {
                                                $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"]').show();
                                                $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"]').css('transform', 'scale(1)');
                                            }
                                        });
                                    }
                                });

                            }

                        });

                        break;

                    case 4:
                        //===========================================================================================================
                        //Reproduce el método de filtrado agregando las condiciones necesarias según la cantidad de "tipos de filtro"
                        //===========================================================================================================
                        var filter1 = filters[0];
                        var filter2 = filters[1];
                        var filter3 = filters[2];
                        var filter4 = filters[3];

                        map.forEach(function (key, value) {
                            if (filter1 == key) {
                                var value1 = value;
                                map.forEach(function (key, value) {
                                    if (filter2 == key) {
                                        var value2 = value;
                                        map.forEach(function (key, value) {
                                            if (filter3 == key) {
                                                var value3 = value;
                                                map.forEach(function (key, value) {
                                                    value4 = value;
                                                    if (filter4 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            } else if (filter4 == key) {
                                                var value4 = value;
                                                map.forEach(function (key, value) {
                                                    value3 = value;
                                                    if (filter3 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            }
                                        });

                                    } else if (filter3 == key) {
                                        var value3 = value;
                                        map.forEach(function (key, value) {
                                            if (filter2 == key) {
                                                var value2 = value;
                                                map.forEach(function (key, value) {
                                                    value4 = value;
                                                    if (filter4 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            } else if (filter4 == key) {
                                                var value4 = value;
                                                map.forEach(function (key, value) {
                                                    value2 = value;
                                                    if (filter2 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            }
                                        });
                                    } else if (filter4 == key) {
                                        var value4 = value;
                                        map.forEach(function (key, value) {
                                            if (filter2 == key) {
                                                var value2 = value;
                                                map.forEach(function (key, value) {
                                                    value3 = value;
                                                    if (filter3 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            } else if (filter3 == key) {
                                                var value3 = value;
                                                map.forEach(function (key, value) {
                                                    value2 = value;
                                                    if (filter2 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });

                            } else if (filter2 == key) {
                                var value2 = value;
                                map.forEach(function (key, value) {
                                    if (filter1 == key) {
                                        var value1 = value;
                                        map.forEach(function (key, value) {
                                            if (filter3 == key) {
                                                var value3 = value;
                                                map.forEach(function (key, value) {
                                                    value4 = value;
                                                    if (filter4 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            } else if (filter4 == key) {
                                                var value4 = value;
                                                map.forEach(function (key, value) {
                                                    value3 = value;
                                                    if (filter3 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            }
                                        });

                                    } else if (filter3 == key) {
                                        var value3 = value;
                                        map.forEach(function (key, value) {
                                            if (filter1 == key) {
                                                var value1 = value;
                                                map.forEach(function (key, value) {
                                                    value4 = value;
                                                    if (filter4 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            } else if (filter4 == key) {
                                                var value4 = value;
                                                map.forEach(function (key, value) {
                                                    value1 = value;
                                                    if (filter1 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            }
                                        });
                                    } else if (filter4 == key) {
                                        var value4 = value;
                                        map.forEach(function (key, value) {
                                            if (filter1 == key) {
                                                var value1 = value;
                                                map.forEach(function (key, value) {
                                                    value3 = value;
                                                    if (filter3 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            } else if (filter3 == key) {
                                                var value3 = value;
                                                map.forEach(function (key, value) {
                                                    value1 = value;
                                                    if (filter1 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });

                            } else if (filter3 == key) {
                                var value3 = value;
                                map.forEach(function (key, value) {
                                    if (filter1 == key) {
                                        var value1 = value;
                                        map.forEach(function (key, value) {
                                            if (filter2 == key) {
                                                var value2 = value;
                                                map.forEach(function (key, value) {
                                                    value4 = value;
                                                    if (filter4 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            } else if (filter4 == key) {
                                                var value4 = value;
                                                map.forEach(function (key, value) {
                                                    value2 = value;
                                                    if (filter2 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            }
                                        });

                                    } else if (filter2 == key) {
                                        var value2 = value;
                                        map.forEach(function (key, value) {
                                            if (filter1 == key) {
                                                var value1 = value;
                                                map.forEach(function (key, value) {
                                                    value4 = value;
                                                    if (filter4 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            } else if (filter4 == key) {
                                                var value4 = value;
                                                map.forEach(function (key, value) {
                                                    value1 = value;
                                                    if (filter1 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            }
                                        });
                                    } else if (filter4 == key) {
                                        var value4 = value;
                                        map.forEach(function (key, value) {
                                            if (filter1 == key) {
                                                var value1 = value;
                                                map.forEach(function (key, value) {
                                                    value2 = value;
                                                    if (filter2 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            } else if (filter2 == key) {
                                                var value2 = value;
                                                map.forEach(function (key, value) {
                                                    value1 = value;
                                                    if (filter1 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });

                            } else if (filter4 == key) {
                                var value4 = value;
                                map.forEach(function (key, value) {
                                    if (filter1 == key) {
                                        var value1 = value;
                                        map.forEach(function (key, value) {
                                            if (filter2 == key) {
                                                var value2 = value;
                                                map.forEach(function (key, value) {
                                                    value3 = value;
                                                    if (filter3 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            } else if (filter3 == key) {
                                                var value3 = value;
                                                map.forEach(function (key, value) {
                                                    value2 = value;
                                                    if (filter2 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            }
                                        });

                                    } else if (filter2 == key) {
                                        var value2 = value;
                                        map.forEach(function (key, value) {
                                            if (filter1 == key) {
                                                var value1 = value;
                                                map.forEach(function (key, value) {
                                                    value3 = value;
                                                    if (filter3 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            } else if (filter3 == key) {
                                                var value3 = value;
                                                map.forEach(function (key, value) {
                                                    value1 = value;
                                                    if (filter1 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            }
                                        });
                                    } else if (filter3 == key) {
                                        var value3 = value;
                                        map.forEach(function (key, value) {
                                            if (filter1 == key) {
                                                var value1 = value;
                                                map.forEach(function (key, value) {
                                                    value2 = value;
                                                    if (filter2 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            } else if (filter2 == key) {
                                                var value2 = value;
                                                map.forEach(function (key, value) {
                                                    value1 = value;
                                                    if (filter1 == key) {
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').show();
                                                        $('.product-item[' + filter1 + '="' + value1 + '"][' + filter2 + '="' + value2 + '"][' + filter3 + '="' + value3 + '"][' + filter4 + '="' + value4 + '"]').css('transform', 'scale(1)');
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });

                            };


                        });

                        break;
                }

            } setTimeout(showProduct, 250);
        };




        // MOSTRANDO TODOS LOS PRODUCTOS =======================

        $('.category_item[category="all"]').click(function () {
            function showAll() {
                $('.product-item').show();
                $('.product-item').css('transform', 'scale(1)');
            } setTimeout(showAll, 400);
        });

    });

});



function removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);

    if (i !== -1) {
        arr.splice(i, 1);
    }
};



