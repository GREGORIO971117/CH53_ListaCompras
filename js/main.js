let txtName=document.getElementById("Name");
let txtNumber=document.getElementById("Number");
let btnAgregar=document.getElementById("btnAgregar");
let alertValidacionesTexto=document.getElementById("alertValidacionesTexto");
let alertValidaciones=document.getElementById("alertValidaciones");
const tablaListaCompras=document.getElementById("tablaListaCompras");
const cuerpoTabla=tablaListaCompras.getElementsByTagName("tbody").item(0);
const contadorProductos=document.getElementById("contadorProductos");
const productoTotal=document.getElementById("productoTotal");
const precioTotal=document.getElementById("precioTotal");
//Se marca donde inicia la tabla

let cont=0;
let costoTotal=0;
let totalProductos=0;
 
function validarCantidad() {

    if (txtNumber.value.trim().length<=0) {
        return false;
    }
    if (isNaN(txtNumber.value)) {   
        return false;
    }
    if (Number(txtNumber.value) <=0) {
        return false;
    }
    return true;
}//Validar cantidad

function getPrecio() {
    return Math.round((Math.random() * 10000))/100;
}


btnAgregar.addEventListener("click",function(event){
    event.preventDefault();
    let isValid=true;

    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    txtName.style.border="";
    txtNumber.style.border="";

    txtName.value=txtName.value.trim();
    txtNumber.value=txtNumber.value.trim();

    if(txtName.value.length<3){
        txtName.style.border="solid 3px red";
        alertValidacionesTexto.innerHTML+="<br/><strong>El nombre debe tener al menos 3 caracteres.</strong>";
        alertValidaciones.style.display="block";
        isValid=false;
    }

    if(! validarCantidad()){
        txtNumber.style.border="solid 3px red";
        alertValidacionesTexto.innerHTML+="<br/><strong>El numero no es valido</strong>";
        alertValidaciones.style.display="block";
        isValid=false;
    }

    if (isValid) {//Se hace el recuento de todas las validaciones
        cont++;
        let precio=getPrecio();
        let row=
        `<tr>
            <td>${cont}</td>
            <td>${txtName.value}</td>
            <td>${txtNumber.value}</td>
            <td>${precio}</td>
        </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend",row); 
        costoTotal+=precio*Number(txtNumber.value);
        precioTotal.innerText="$"+costoTotal.toFixed(2);
        productosTotal+=Number(txtNumber.value);
        contadorProductos.innerHTML=cont;
        productosTotal.innerHTML=totalProductos;

        txtName.value="";
        txtNumber.value="";
        txtName.focus();
    }


});