let txtName=document.getElementById("Name");
let txtNumber=document.getElementById("Number");
let btnAgregar=document.getElementById("btnAgregar");
let btnClear=document.getElementById("btnClear");
let alertValidacionesTexto=document.getElementById("alertValidacionesTexto");
let alertValidaciones=document.getElementById("alertValidaciones");
const tablaListaCompras=document.getElementById("tablaListaCompras");
const cuerpoTabla=tablaListaCompras.getElementsByTagName("tbody").item(0);
const contadorProductos=document.getElementById("contadorProductos");
const productosTotal=document.getElementById("productosTotal");
const precioTotal=document.getElementById("precioTotal");
//Se marca donde inicia la tabla

let cont=0;
let costoTotal=0;
let totalEnProductos=0;
let datos=new Array();
 
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
        let elemento={
            "cont":cont,
            "nombre":txtName.value,
            "cantidad":txtNumber.value,
            "precio":precio
        };

        datos.push(elemento);
        localStorage.setItem("datos",JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML("beforeend",row); 
        costoTotal+=precio*Number(txtNumber.value);
        totalEnProductos+=Number(txtNumber.value);
        precioTotal.innerText="$"+costoTotal.toFixed(2);
        contadorProductos.innerHTML=cont;
        productosTotal.innerHTML=totalEnProductos;

        let resumen={
            "cont":cont,
            "totalEnProductos":totalEnProductos,
            "costoTotal":costoTotal,
        };

        localStorage.setItem("resumen",JSON.stringify(resumen));

        txtName.value="";
        txtNumber.value="";
        txtName.focus();
    }


});

btnClear.addEventListener("click",function(event){
    event.preventDefault();
    localStorage.removeItem("resumen");
    localStorage.removeItem("datos");
    window.location.reload();
});

window.addEventListener("load",function(event){
    event.preventDefault();

    if (this.localStorage.getItem("datos")!=null) {
       datos = JSON.parse(this.localStorage.getItem("datos"));
    }
    datos.forEach((d)=> {
        let row=
        `<tr>
            <td>${d.cont}</td>
            <td>${d.nombre}</td>
            <td>${d.cantidad}</td>
            <td>${d.precio}</td>
        </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend",row);
    });

    if (this.localStorage.getItem("resumen")!=null) {
        let resumen=JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal=resumen.costoTotal;
        totalEnProductos=resumen.totalEnProductos;
        cont=resumen.cont;
    }

    precioTotal.innerText="$"+costoTotal.toFixed(2);
    productosTotal.innerHTML=totalEnProductos;
    contadorProductos.innerHTML=cont;

});//Se termina el windows load