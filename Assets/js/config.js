/*
salida tx 15 
perdida -3
antenarx 24
cables y conectores -3db
sensibilidad -95
distancia 5km
4.8Ghz
*/

const boton=document.getElementById('btn');
const dist,frec,salidatx,perdida,arx,cables,sensibilidad;
boton.addEventListener('click',()=>{
    dist=parseFloat(document.getElementById('dist').value);
    frec=parseFloat(document.getElementById('frecGhz').value);
    salidatx=parseFloat(document.getElementById('salidatx').value);
    perdida=parseFloat(document.getElementById('perdida').value);
    arx=parseFloat(document.getElementById('arx').value);
    cables=parseFloat(document.getElementById('cab').value);
    sensibilidad=parseFloat(document.getElementById('sens').value);
    texto=document.getElementById('texto');
    if(dist!=''&&frec!=''&&salidatx!=''&&perdida!=''&&arx!=''&&cables!=''&&sensibilidad){
        fsl(dist,frec);
        //fsl(5,4.8)
        enlace(salidatx,perdida,arx,bfsl(dist,frec),arx,cables);
        //enlace(15,3,24,120,24,3)
        margen(benlace(salidatx,perdida,arx,bfsl(dist,frec),arx,cables),sensibilidad);
        pire(salidatx,perdida,arx);
        fresnel(dist,frec);
    }else{
        document.getElementById('iniciop').innerHTML="Ingresa valores correctos c:";
    }

    //enlace
    // margen
    // pire
    // fresnel
    /*
    let contenedor=document.getElementById("contenedor-general");
    elemento.appendChild(texto);
    contenedor.appendChild(elemento);
    */
});

//FSL
//20log(Dist KM)+ 20log(Frec (MHZ))+ 32.45
fsl=function (distKm,FrecGhz){
    let res=((20*Math.log10(distKm)+20*Math.log10(FrecGhz*1000))+32.45).toFixed(3);
    texto.textContent+=`Para una distancia de ${dist} Km y una frecuencia de ${frec} Ghz \n`;
    texto.textContent+="\nHallando FSL \n";
    texto.textContent+="FSl=20log(Dist KM)+ 20log(Frec (MHZ))+ 32.45 \n";
    texto.textContent+=`(20*log(${distKm})+20*log(${FrecGhz*1000}))+32.45= ${res} dB \n`;
}
//console.log(fsl(5,4.8));
//ENLACE
//(Pot tx)+ (-P tx)+ (G Atx)+ (-FSL)+ (G Rtx)+ (-P Rx)
enlace=function(potx,ptx,gtx,fsl,grx,prx){
    let res=(potx+ptx+gtx+(-1*fsl)+grx+prx).toFixed(3);
    document.getElementById('iniciop').innerHTML='';
    texto.textContent+="\nHallando ENLACE \n";
    texto.textContent+="ENLACE=(Pot tx)+ (-P tx)+ (G Atx)+ (-FSL)+ (G Rtx)+ (-P Rx) \n";
    texto.textContent+=`Enlace =(${potx})+ (${ptx})+ (${gtx})+ (-${fsl})+ (${grx})+ (+${prx})= ${res} dB \n`;
}
//console.log(enlace(15,3,24,125.319,24,3));
//MARGEN
//Enlace- Sensib
margen=function(enlace,sensibilidad){
    let res=(enlace-sensibilidad).toFixed(3);
    texto.textContent+="\nHallando MARGEN \n";
    texto.textContent+="MARGEN=Enlace-Sensibilidad \n";
    texto.textContent+=`${enlace}-(${sensibilidad})= ${res} dB \n`;
};
//console.log(margen(-68.319,-95));
//PIRE
//(Pot tx)+ (-Perd tx)+ (Gana tx)
pire=function(potx,ptx,gtx){    
    let res=(potx+ptx+gtx).toFixed(3);
    texto.textContent+="\nHallando PIRE \n";
    texto.textContent+="PIRE=(Pot tx)+ (-Perd tx)+ (Gana tx) \n";
    texto.textContent+=`${potx}+(${ptx})+ (${gtx}) = ${res} dB \n`;
}
//console.log(pire(15,3,24));
//FRESNEL
//17.32(dKM/4F(GHZ))^1/2
fresnel=function(dkm,frecGhz){
    let res=(17.32*(Math.sqrt(dkm/(4*frecGhz)))).toFixed(3);
    texto.textContent+="\nHallando FRESNEL \n";
    texto.textContent+="FRESNEL= 17.32(dKM/4F(GHZ))^1/2\n";
    texto.textContent+=`17.32(${dkm}/4F(${frecGhz}))^1/2 =${res} m \n`;
    texto.textContent+="============================================================ \n";
    return res;
}
//console.log(fresnel(8,5.5));
bfsl=function (distKm,FrecGhz){
    let res=((20*Math.log10(distKm)+20*Math.log10(FrecGhz*1000))+32.45).toFixed(3);
    return res;
}
benlace=function(potx,ptx,gtx,fsl,grx,prx){
    let res=(potx+ptx+gtx+(-1*fsl)+grx+prx).toFixed(3);
    return res;
}
bmargen=function(enlace,sensibilidad){
    let res=(enlace-sensibilidad).toFixed(3);
    return res;
};
bpire=function(potx,ptx,gtx){
    let res=(potx+ptx+gtx).toFixed(3);
    return res;
}
bfresnel=function(dkm,frecGhz){
    let res=(17.32*(Math.sqrt(dkm/(4*frecGhz)))).toFixed(3);
    return res;
}