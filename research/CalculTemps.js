/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var date_heure = function (id) {
    date = new Date;
    annee = date.getFullYear();
    mois = date.getMonth();
    moistxt = new Array('Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre');
    j = date.getDate();
    jour = date.getDay();
    jourstxt = new Array('Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche');
    s = date.getSeconds();
    m = date.getMinutes();
    h = date.getHours();
    mls = date.getMilliseconds();

    sInMls = (s * 1000) + mls;
    mInMls = (m * 60 * 1000) + sInMls;
    hInMls = (h * 60 * 60 * 1000) + mInMls;
    mInS = (m * 60) + s;
    hInS = (h * 60 * 60) + mInS;
    dateInS = ((j - 1) * 24 * 60 * 60) + hInS;
    daysInS = ((jour > 0 ? jour -= 1 : jour = 6) * 24 * 60 * 60) + hInS;
    dateInH = ((j-1)*24)+h;

    resultat = annee + ' ' + moistxt[mois] + ' ' + j + ' - ' + h + ' : ' + m + ' : ' + s + ' : ' + mls
            +'<br> Date en heure : ' + dateInH
            + '<br> taille en % d\'un mois : ' + 1*(100/12)
            + '<br> taille en % d\'un mois en fonction de la date : ' + ( j * ( (100/12)/daysInMonth(annee, mois) ) )
            + '<br> taille de la div month : ' + $('#drawMin div').css('width');
    //document.getElementById(id).innerHTML = resultat;
    //drawMillisecondes(mls);
    drawSecondes(sInMls);
    drawMinutes(mInMls);
    drawHours(hInS);
    drawDate(dateInS);
    drawDays(daysInS);
    drawMonths(mois,dateInH);
    setTimeout('date_heure("' + id + '");', '30');
};

var drawMillisecondes = function (mls) {
    $('#drawMls').empty();
    var divWidth = 0;
    divWidth = mls * (100 / 1000);
    var div = drawDiv(divWidth, 'blue');
    $('#drawMls').append(div);
};

var drawSecondes = function (s) {
    $('#drawS').empty();
    var divWidth = 0;
    divWidth = s * (100 / 60000);
    var div = drawDiv(divWidth, 'orange', (Math.floor(s / 1000)) + ' secondes');
    $('#drawS').append(div);
};

var drawMinutes = function (m) {
    $('#drawMin').empty();
    var divWidth = 0;
    divWidth = m * (100 / (60 * 60 * 1000));
    var div = drawDiv(divWidth, 'red', (Math.floor(m / 60000)) + ' minutes');
    $('#drawMin').append(div);
};

var drawHours = function (h) {
    $('#drawH').empty();
    var divWidth = 0;
    divWidth = h * (100 / (24 * 60 * 60));
    var div = drawDiv(divWidth, 'blue', (Math.floor(h / 3600)) + ' heures');
    $('#drawH').append(div);
};

var drawDate = function (d) {
    $('#drawDate').empty();
    var divWidth = 0;
    var daysMax = daysInMonth(annee, mois);
    divWidth = d * (100 / (daysMax * 24 * 60 * 60));
    var div = drawDiv(divWidth, 'purple', (Math.floor(d / 86400) + 1));
    $('#drawDate').append(div);
};

var drawDays = function (d) {
    $('#drawDays').empty();
    var divWidth = 0;
    divWidth = d * (100 / (7 * 24 * 60 * 60));
    var div = drawDiv(divWidth, 'fuchsia', jourstxt[jour]);
    $('#drawDays').append(div);
};

var drawMonths = function (month,date) {
    $('#drawMonth').empty();
    var divWidth = 0;
    var daysMax = daysInMonth(annee, mois);
    divWidth = (month * (100/12) ) + ( date * ( (100/12) / (daysMax*24) ) );
    var div = drawDiv(divWidth, 'Lime', moistxt[month]);
    $('#drawMonth').append(div);
};



var drawDiv = function (divWidth, color, time) {
    var div = $('<div>').css('height', '14px').css('width', divWidth + '%').css('background-color', color).css('margin', '1px 0px')
            .text(time).css('text-align', 'right').css('color', 'white').css('font-family', 'arial').css('padding-right', '2px');
    return div;
};

var daysInMonth = function (year, month) {
    return new Date(year, month + 1, 0).getDate();
};