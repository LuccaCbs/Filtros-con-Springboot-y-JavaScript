
/*<![CDATA[*/

/*]]>*/

//=============================================
//Arrays contenedores de los valores de filtros
//=============================================
var brands = [];
var petTypes = [];
var petSizes = [];
var petAges = [];
var productType = "";
var price = 0;
var all = [];


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

    $.get("/products", function (data) {
        $('#products').find('.product-content').html(data);
        loadModal();
    });
    

    // AGREGANDO CLASE ACTIVE AL PRIMER ENLACE ====================
    $('.category_list .category_item[category="all"]').addClass('ct_item-active');

    $('#price').change(function() {
            
        $('#price').val($(this).val());
        $('#priceValue').val($(this).val());
        });

    //================================
    //Función "onclick" de los filtros
    //================================
    $('.category_item').click(function () {
        var filter = $(this).attr('category');
        var value = $(this).attr('value')
        const equals = (el) => el == value;

        if (filter == 'price') {
            price = $('#price').val();
        }

        if (filter == 'productType') {
            if (productType !== value) {
                productType = value;
            }else{
                productType = "";
            }
        }
        //===========================
        //Agregado del tipo de filtro
        //===========================
        if (filter !== 'all') {
            if (!filters.includes(filter)) {
                filters.push(filter);
            }
        }else{
            if (!all.includes(filter)) {
                all.push(filter);
            }else{
                removeItemFromArr(all, filter);
            }
            productType = "";
            price = 0;
        }

        //arreglar esta garcha*comentario motivacional*

        //======================================================================
        //Agregado y eliminación de "tipo de filtro" y "valor del filtro" al map
        //======================================================================

        switch (filter) {
            case 'brand':
                if (brands.some(equals)) {
                    removeItemFromArr(brands, value);

                    if (brands.length === 0) {
                        removeItemFromArr(filters, filter);
                    }

                    map.delete(value);
                } else {
                    brands.push(value)
                    map.set(value, filter);
                }
                break;
            case 'petType':
                if (petTypes.some(equals)) {
                    removeItemFromArr(petTypes, value);

                    if (petTypes.length === 0) {
                        removeItemFromArr(filters, filter);
                    }

                    map.delete(value);
                } else {
                    petTypes.push(value);
                    map.set(value, filter);
                }
                break;
            case 'petSize':
                if (petSizes.some(equals)) {
                    removeItemFromArr(petSizes, value);

                    if (petSizes.length === 0) {
                        removeItemFromArr(filters, filter);
                    }

                    map.delete(value);
                } else {
                    petSizes.push(value);
                    map.set(value, filter);
                }
                break;
            case 'petAge':
                if (petAges.some(equals)) {
                    removeItemFromArr(petAges, value);

                    if (petAges.length === 0) {
                        removeItemFromArr(filters, filter);
                    }

                    map.delete(value);
                } else {
                    petAges.push(value);
                    map.set(value, filter);
                }
                break;
        }

        //===============================================================================================
        //Chequeo por consola de las entradas del map, del contenedor de filtros y de la lista de filtros
        //===============================================================================================
        console.log(filter);
        console.log(value);
        console.log(filters);
        console.log(filterList);

        //====================
        // Ocultando productos
        //====================
        $('.product-item').css('transform', 'scale(0)');
        function hideProduct() {
            $('.product-item').hide();
        } setTimeout(hideProduct, 175);

        

        function showProduct(){
            $.get("/listFilter?brands=" + brands + "&petTypes=" + petTypes + "&petSizes=" + petSizes + "&petAges=" + petAges + "&all=" + all + "&price=" + price + "&productType=" + productType, function (data) {
                $('#products').find('.product-content').html(data);
                loadModal()
            $('.product-item').show();
            $('.product-item').css('transform', 'scale(1)');
            });
        }  setTimeout(showProduct, 300);

        


        // MOSTRANDO TODOS LOS PRODUCTOS =======================

        // $('.category_item[category="all"]').click(function () {
        //     function showAll() {
        //         $('.product-item').show();
        //         $('.product-item').css('transform', 'scale(1)');
        //     } setTimeout(showAll, 400);
        // });

    });

});

function loadModal(){
    $('.idButton').click(function () {
        var productId = $(this).attr('productId');

        $.get("/modalProduct?productId=" + productId, function (data) {
            $('#modalProduct').find('.modal-body').html(data);
        });
    });
};

function removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);

    if (i !== -1) {
        arr.splice(i, 1);
    }
};



