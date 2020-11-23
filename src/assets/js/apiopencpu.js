
var mysession;
var essai = 0;

async function openCPUchargedata(parcelle) {
    ocpu.seturl("https://cloud.opencpu.org/ocpu/apps/vallooy/pica/R");
    return req = ocpu.call("importMathDist", {parcelle : parcelle}, function(session){
        mysession = session;
    }).fail(function(){
        alert(req.responseText);
    });
}

async function calculdistance(parcelle, millesime, points) {
    await openCPUchargedata(parcelle);
    //console.log(mysession);
    console.log(millesime + parcelle);
    var resultat;
    return req = ocpu.call("Calcul_fourmis_distance", {
        dist_mat : mysession,
        parcelle : parcelle,
        millesime : millesime,
        selected : points,
        }, function(session){
        mysession = session;
        session.getObject(function(data){          
        resultat = data;
        });
        }).fail(function(){
            essai += 1;
            console.log(req.responseText);
            restarrequest(req.responseText,parcelle);
        });
}

async function algoresultat() {
    var resultat ;
    await mysession.getObject(function(data){
        resultat = data;
    });
    return resultat;
}

function restarrequest(response, parcelle) {
    if (essai < 2) {
        calculdistance(parcelle);
    }
}