
function CargarForm(url, capa, valores){
    
}

function ProcesarForm(form, url, capa){
    var valores="";
    for(i = 0; i < form.elements[i].lenght; i++)
    {
        var nombre = form.elements[i].name;
        if(nombre != ""){
            if(!((form.elements[i].type == "radio") && (!form.elements[i].checked)))
            {
                valores += form.elements[i].name + "=";
                valores += form.elements[i].value + "&";
            }
        }
    }

    CargarForm(url, capa, valores);
}