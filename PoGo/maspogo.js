"use strict";

//Namespace
var MaS = MaS || {};
MaS.PoGo = MaS.PoGo || {};

MaS.PoGo.Settings = {
    showToasterBtn: true,
    showSideBarBtn: true,
    showRemoveToastersBtn: true,
    showSideBarOnLoad: true,
    autoRefresh: true,
    refreshInterval: 15, //sec 
    sideBarType: "table", //card or table
    sortType: "Lvl", //Prop to sort view by
    localStorageKey: "MaSPoGo",
    localStorageSettingsKey: "MaSPoGoSettings",
    highValuePokeSet: [7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 60, 61, 62, 69, 70, 71, 72, 73, 77, 78, 79, 80, 81, 82, 84, 85, 86, 87, 88, 90, 91, 92, 93, 95, 96, 97, 98, 99, 100, 101, 104, 105, 106, 107, 108, 109, 110, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 137, 138, 139, 140, 141, 142, 152, 153, 158, 159, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 198, 199, 200, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 215, 216, 218, 219, 220, 221, 223, 224, 226, 227, 228, 229, 230, 231, 233, 234, 236, 237, 238, 239, 240, 241],
    mediumValuePokeSet: [10, 11, 12, 13, 14, 16, 17, 19, 20, 21, 22, 29, 32, 33, 35, 41, 43, 46, 48, 50, 54, 55, 60, 61, 69, 72, 77, 79, 81, 90, 96, 98, 100, 116, 118, 120, 122, 161, 162, 163, 164, 165, 166, 167, 177, 178, 183, 190, 194, 198, 202, 215, 218, 220, 223],
    defaultNotifySet: [3, 6, 65, 68, 76, 94, 103, 113, 128, 143, 149, 214, 242, 248],
    massiveNotifySet: [1, 2, 3, 4, 5, 6, 7, 8, 9, 59, 63, 64, 65, 66, 67, 68, 74, 75, 76, 94, 102, 103, 111, 112, 113, 128, 134, 135, 139, 143, 147, 148, 149, 160, 196, 214, 222, 225, 228, 229, 235, 242, 246, 247, 248],
    showOnlySettings: {},
    scoutPokes: false,
    showLoadData: false,
    overrideNotifyToaster: true,
    addRegularPokesToNotifyMinLvl: 28,
    addRegularPokesToNotifyMinIv: 70,
    showLogData: false
};

MaS.PoGo.Style = (function () {/*
                <style>
                    #gym-details H5, #gym-details H6, #gym-details H4{
                        margin: 0 0 0 0
                    }
                    .btnStyle{
                        float: right; 
                        border-left: solid 1px rgba(255,255,255,.15); 
                        border-right: solid 1px rgba(255,255,255,.15); 
                        padding-left: 1.25em; 
                        padding-right: 1.25em; 
                        margin-left:-1px;
                    }
                    .toasterContainer{
                        font-size:12px;
                    }
                    .toasterRow > DIV{
                        display: inline-block; 
                        width: 100px;
                    }
                    .toasterRow > DIV:first-child{
                        width: 200px;
                    }
                    .settingsContainer{
                        padding-left:20px;
                        padding-bottom:5px;
                        margin-top:-15px;
                        margin-bottom:5px;
                        border-bottom:1px solid black;
                    }
                    .settingsContainer SELECT{
                        font-size: xx-small;
                    }
                    .smallTime
                    {
                        font-size:9px;
                    }
                    .pokeData{
                        padding-left:15px;
                        xpadding-right:10px;
                    }
                    #tableRow{
                        font-size:12px;
                    }
                    #tableRow:hover{
                        background-color:#dddddd;
                    }
                    #tableRow > DIV{
                        display: inline-block;
                        width: 65px;
                    }
                    #tableRow > DIV:first-child{
                         width: 80px;
                    }
                    #tableRow > DIV.pokeLvl{
                         width: 50px;
                    }
                    .pokeCard{
                        padding-left:50px;
                        margin-left:-30px;
                        padding-top:10px;
                        border-bottom:1px solid black;
                        position:relative;
                    }
                    .pokeCardClose{
                        width: 13px;
                        height: 13px;
                        overflow: hidden;
                        position: absolute;
                        right: 12px;
                        top: 10px;
                        z-index: 10000;
                        cursor: pointer;
                        opacity: 0.7;
                        font-size:14px;
                    }
                    .quick{
                        margin-top:10px;
                    }
                    .quickShowOnly LABEL{
                        display:inline-block;
                        width:100px;
                    }
                    .quickShowOnly LABEL:last-child{
                        padding-top:10px;
                    }
                    .quickShowOnly INPUT[type=text]{
                        font-size:9px; 
                        width:300px;
                    }
                    .quickShowSaved>DIV DIV{
                        display:inline-block;
                        margin-left:10px;
                    }
                    .quickShowSaved>DIV DIV:first-child{
                        width: 120px;
                    }
                    .timeout INPUT[type=text]{
                        font-size:9px; 
                        width:30px;
                        height:14px;
                        display:inline-block;
                    }
                    #pogoLastUpdate, #pogoData{
                        font-size:9px;
                    }
                </style>     
             */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];


MaS.PoGo.fn = (function () {

    //Internal Variables
    var allPoke;
    var notifyPoke;
    var intervalID = null;
    var allPokeData = $.map(idToPokemon, function (a, b) { a.id = b; return a; });
    var allPokeNumbers = (function () { var all = []; for (var i = 1; i <= 493; i++) { all.push(i); } return all; })(); //all Poke numbers
    var settings = $.extend(true, {}, MaS.PoGo.Settings);
    var reloadCounter = 0;
    var loadRawDataFunc;
    var pogoLastUpdateText = "No fetch has occurred"

    //Const
    var toastOptFull = {
        positionClass: "toast-top-full-width",
        progressBar: true,
        closeButton: false
    };
    var toastOptBotRig = {
        positionClass: "toast-bottom-left",
        progressBar: true,
        closeButton: false,
        timeout: "1000"
    }

    //Poke Helpers
    function loadPokeData() {

        var t0 = performance.now();

        //Get all pokemon data
        allPoke = $.map(mapData.pokemons, function (p, k) {
            p.Lvl = (p.cp_multiplier !== null) ? parseFloat(getPokemonLevel(p.cp_multiplier)) : -1;
            p.Time = moment(p.disappear_time).format("HH:mm")
            try {
                if (p.individual_attack !== null && p.individual_defense !== null && p.individual_stamina !== null) {
                    p.Iv = parseFloat(getIv(p.individual_attack, p.individual_defense, p.individual_stamina).toFixed(1));
                } else{
                    p.Iv = -1;
                }
            } catch (a) {
                p.Iv = -1;
            }
            return p;
        });

        //Filter notify pokemons
        notifyPoke = allPoke.filter(function (p) {
            return isNotifyPoke(p) || (p.Lvl >= settings.addRegularPokesToNotifyMinLvl && p.Iv >= settings.addRegularPokesToNotifyMinIv);
        }).sort(function (a, b) {
            var sortType = settings.sortType.toLowerCase();

            //Lv: (a.Iv > b.Iv ? -1 : a.Iv < b.Iv ? 1 : 0)
            //Lvl: (a.Lvl > b.Lvl ? -1 : a.Lvl < b.Lvl ? 1 : 0)
            //CP: (a.cp > b.cp ? -1 : a.cp < b.cp ? 1 : 0)
            //Time: (a.Time > b.Time ? 1 : a.Time < b.Time ? -1 : 0)
            //Id: (a.pokemon_id > b.pokemon_id ? 1 : a.pokemon_id < b.pokemon_id ? -1 : 0) 

            if (sortType === "name") {
                return a.pokemon_name > b.pokemon_name ? 1 : a.pokemon_name < b.pokemon_name ? -1 : (a.Lvl > b.Lvl ? -1 : a.Lvl < b.Lvl ? 1 : (a.Iv > b.Iv ? -1 : a.Iv < b.Iv ? 1 : 0));
            }
            if (sortType === "cp") {
                return a.cp > b.cp ? -1 : a.cp < b.cp ? 1 : (a.Iv > b.Iv ? -1 : a.Iv < b.Iv ? 1 : 0);
            }
            if (sortType === "lvl") {
                return a.Lvl > b.Lvl ? -1 : a.Lvl < b.Lvl ? 1 : (a.Iv > b.Iv ? -1 : a.Iv < b.Iv ? 1 : 0);
            }
            if (sortType === "iv") {
                return a.Iv > b.Iv ? -1 : a.Iv < b.Iv ? 1 : (a.Lvl > b.Lvl ? -1 : a.Lvl < b.Lvl ? 1 : 0);
            }
            if (sortType === "time") {
                return a.Time > b.Time ? 1 : a.Time < b.Time ? -1 : (a.Lvl > b.Lvl ? -1 : a.Lvl < b.Lvl ? 1 : (a.Iv > b.Iv ? -1 : a.Iv < b.Iv ? 1 : 0));
            }
            return a.pokemon_id > b.pokemon_id ? 1 : a.pokemon_id < b.pokemon_id ? -1 : (a.Lvl > b.Lvl ? -1 : a.Lvl < b.Lvl ? 1 : (a.Iv > b.Iv ? -1 : a.Iv < b.Iv ? 1 : 0));
        });

        var t1 = performance.now();
        console.log2("Assemble pokemons took " + (t1 - t0) + " milliseconds.");
    }

    function autoRefresh() {
        if (settings.autoRefresh && intervalID === null) {
            intervalID = setInterval(showSideBar, settings.refreshInterval * 1000);
        } else if (!settings.autoRefresh && intervalID !== null) {
            clearInterval(intervalID);
            intervalID = null;
        }

    }

    function stopBounce(pokes) {
        $.each(pokes, function (i, p) {
            p.marker.setAnimation(null);
            p.marker.animationDisabled = true;
        });
    }

    function unHide(pokes) {
        $.each(pokes, function (i, p) {
            p.hidden = false;
        })
    }

    function toggleMarker(p) {
        if (p.marker.infoWindowIsOpen && p.marker.infoWindow.anchor !== null) {
            p.marker.persist = false;
            p.marker.infoWindow.close();
            p.marker.infoWindowIsOpen = false;
        } else {
            if (p.marker.map === null) {
                p.marker.setMap(map);
                markerCluster.redraw();
            }
            p.marker.infoWindow.open(map, p.marker);
            clearSelection();
            updateLabelDiffTime();
            p.marker.persist = true;
            p.marker.infoWindowIsOpen = true;
            p.marker.setAnimation(null);
            p.marker.animationDisabled = true;
        }
    }

    function scoutPokes(pokes) {
        var counter = 0;
        $.each(pokes, function (i, p) {
            if (p.Iv === -1) {
                scout(p.encounter_id);
                counter++;
            }
        });

        var msg = (counter > 0) ? "Scouting for " + counter + " pokemons" : "No pokemons to scout for";
        console.log2(msg);
        toastr.info(msg, "", toastOptBotRig);
    }

    function refreshMap() {
        redrawPokemon(mapData.pokemons);
        redrawPokemon(mapData.lurePokemons);
        markerCluster.repaint();
        updateMap();
    }

    //Output Helpers
    function consoleData(poke) {
        var txt = "Name:" + poke.pokemon_name + ", CP:" + poke.cp + ", Lvl:" + poke.Lvl + ", Iv:" + poke.Iv + "%" + ", Time:" + poke.Time;
        return txt;
    }

    window.console.log2 = function (msg) {
        if (settings.showLogData) {
            console.log(msg);
        }
    }

    function addToasterBtn() {
        $("HEADER#header A#toasterToggle").remove();
        var toasterBtn = $('<a href="javascript:" id="toasterToggle" class="statsNav btnStyle"><span class="label">Toast</span></a>');
        toasterBtn.click(function () {
            showToaster();
        });
        $("HEADER#header").append(toasterBtn);
    }

    function addSideBarBtn() {
        $("HEADER#header A#sideBarToggle").remove();
        var sideBarBtn = $('<a href="javascript:" id="sideBarToggle" class="statsNav btnStyle"><span class="label">SideBar</span></a>');
        sideBarBtn.click(function () {
            showSideBar();
        });
        $("HEADER#header").append(sideBarBtn);
    }

    function addRemoveToastersBtn() {
        $("HEADER#header A#removeToasters").remove();
        var removeToastersBtn = $('<a href="javascript:" id="removeToasters" class="statsNav btnStyle"><span class="label">Remove Toasters</span></a>');
        removeToastersBtn.click(function () {
            toastr.clear();
        });
        $("HEADER#header").append(removeToastersBtn);
    }

    //Overrides
    function overrideLoadRwaData(overwrite) {
        if (overwrite && !loadRawDataFunc) {
            loadRawDataFunc = window.loadRawData;
            window.loadRawData = function () {
                return loadRawDataFunc().done(function (e) {
                    pogoLastUpdateText = "Fetched " + e.pokemons.length + " pokemons at " + moment(e.timestamp).format("HH:mm:ss");
                    console.log2(pogoLastUpdateText);
                    $("#pogoLastUpdate").html(pogoLastUpdateText);
                });
            }
        } else if (!!loadRawDataFunc) {
            window.loadRawData = loadRawDataFunc;
            loadRawDataFunc = undefined;
        }
    }

    function overrideNotifyToaster() {
        window.sendToastrPokemonNotification = function (e, t, n, a, o) {
            var i = toastr.info(t, e, {
                closeButton: !0,
                positionClass: "toast-top-left",
                preventDuplicates: !0,
                onclick: function e() {
                    centerMap(a, o, 20)
                },
                showDuration: "300",
                hideDuration: "500",
                timeOut: "3000",
                extendedTimeOut: "1500",
                showEasing: "swing",
                hideEasing: "linear",
                showMethod: "fadeIn",
                hideMethod: "fadeOut"
            });
            i.removeClass("toast-info"),
                i.css({
                    "padding-left": "74px",
                    "background-image": "url('./" + n + "')",
                    "background-size": "48px",
                    "background-color": "#0c5952"
                })
        }
    }

    //PokeSet Helpers
    function saveCurrentExcludePoke(name) {
        var mpStore = JSON.parse(localStorage.getItem(settings.localStorageKey) || '{"auto":[], "manual":[]}');

        if (typeof name === "undefined") {
            name = "auto-" + (new Date()).getTime();
            if (mpStore.auto.length > 4) {
                mpStore.auto.pop();
            }
            mpStore.auto.unshift({
                "name": name,
                "excludedPoke": excludedPokemon
            })
        } else {
            mpStore.manual.unshift({
                "name": name,
                "excludedPoke": excludedPokemon
            })
        }

        localStorage.setItem(settings.localStorageKey, JSON.stringify(mpStore));
    }

    function removeExcludePokeSet(name) {
        var mpStore = JSON.parse(localStorage.getItem(settings.localStorageKey) || '{"auto":[], "manual":[]}');
        mpStore.manual = mpStore.manual.filter(function (a) {
            return a.name.toLowerCase() !== name.toLowerCase();
        });
        mpStore.auto = mpStore.auto.filter(function (a) {
            return a.name.toLowerCase() !== name.toLowerCase();
        });
        localStorage.setItem(settings.localStorageKey, JSON.stringify(mpStore));
    }

    function applyExcludePokeSet(name) {
        name = name.toLowerCase();
        if (name === "default") {
            $selectExclude.val(StoreOptions.remember_select_exclude.default.filter(function (a) {
                return a !== 74;
            })).change();
            refreshMap();
            return;
        }
        if (name === "no") {
            $selectExclude.val([]).change();
            refreshMap();
            return;
        }
        if (name === "high") {
            $selectExclude.val(settings.highValuePokeSet).change();
            refreshMap();
            return;
        }
        if (name === "medium") {
            $selectExclude.val(settings.mediumValuePokeSet).change();
            refreshMap();
            return;
        }


        var mpStore = JSON.parse(localStorage.getItem(settings.localStorageKey) || '{"auto":[], "manual":[]}');
        var excludeSet = mpStore.manual.filter(function (a) {
            return a.name.toLowerCase() === name;
        });
        if (excludeSet.length < 1) {
            excludeSet = mpStore.auto.filter(function (a) {
                return a.name.toLowerCase() === name;
            });
        }
        if (excludeSet.length > 0) {
            $selectExclude.val(excludeSet[0].excludedPoke).change();
            refreshMap();
        } else {
            console.log2("Error-applyExcludePokeSet: no saved exclude set with name " + name + " found");
        }
    }

    function reapplyLastSavedExcludePoke() {
        var mpStore = JSON.parse(localStorage.getItem(settings.localStorageKey) || '{"auto":[], "manual":[]}');
        if (mpStore.auto.length > 0) {
            $selectExclude.val(mpStore.auto.slice(-1)[0].excludedPoke).change();
            refreshMap();
        } else {
            console.log2("Error-reaplyLastSavedExcludePoke: no saved exclude set")
        }
    }

    //Sidebar Helpers
    function sidebarSettings(containerDiv) {

        var settingsDiv = $("<div id='settings' class='settingsContainer'>");
        settingsDiv.append("Auto-reload <input id='autoRefresh' type='checkbox'> | ")
        settingsDiv.append("<a href='javascript:' id='stopBounce'>Stop bounce</a> | ")
        settingsDiv.append("<a href='javascript:' id='reloadData'>Reload map</a> | ")
        settingsDiv.append("<a href='javascript:' id='resetData'>Reset map</a> | ")
        settingsDiv.append("<span class='smallTime'>" + moment(moment.now()).format("HH:mm:ss") + "</span>");
        settingsDiv.append("<br/>");
        settingsDiv.append("Sort by <select id='sortBy'><option>Nr</option><option>Name</option><option>CP</option><option>Lvl</option><option>Iv</option><option>Time</option></select> ");
        settingsDiv.append("Sidebar type: Card<input type='radio' id='sideBarTypeCard' name='sidebarType' value='card'> ");
        settingsDiv.append("Table<input type='radio' id='sideBarTypeTable' name='sidebarType' value='table'> ");
        settingsDiv.append("Quick<input type='radio' id='sideBarTypeQuick' name='sidebarType' value='quick'>");

        //Settings actions
        if (settings.autoRefresh) {
            settingsDiv.find("INPUT#autoRefresh").prop('checked', true);
            autoRefresh();
        }
        settingsDiv.find("INPUT#autoRefresh").click(function () {
            settings.autoRefresh = $(this).prop('checked');
            autoRefresh();
        });

        settingsDiv.find("SELECT#sortBy").val(settings.sortType);
        settingsDiv.find("SELECT#sortBy").change(function () {
            settings.sortType = $(this).val();
            showSideBar();
        });

        settingsDiv.find("A#stopBounce").click(function () {
            stopBounce(notifyPoke);
        });

        settingsDiv.find("A#reloadData").click(function () {
            toastr.info("Reloading map...", "", toastOptBotRig);
            refreshMap();
        });

        settingsDiv.find("A#resetData").click(function () {
            toastr.info("Reseting data...", "", toastOptBotRig);
            settings = $.extend(true, {}, MaS.PoGo.Settings);
            //unHide(notifyPoke);
            mapData.pokemons = {};
            timestamp = undefined;
            refreshMap();
        });

        if (settings.sideBarType === "table") {
            settingsDiv.find('input#sideBarTypeTable').prop("checked", true);
        } else if (settings.sideBarType === "quick") {
            settingsDiv.find('input#sideBarTypeQuick').prop("checked", true);
        } else {
            settingsDiv.find('input#sideBarTypeCard').prop("checked", true);
        }
        settingsDiv.find('input[name=sidebarType]').click(function () {
            settings.sideBarType = $(this).val();
            showSideBar();
        });

        // //Fetch scout data
        // if(settings.scoutPokes){
        //     scoutPokes(notifyPoke);
        // }

        containerDiv.append(settingsDiv);
    }

    function sidebarQuick(dataDiv) {

        //Show only markup
        var showOnly = $("<div class='quick quickShowOnly'>");
        showOnly.append('<h4>Show only <input type="checkbox" value="showonly" id="showonly"></h4>');
        showOnly.append('<label><input type="checkbox" value="shownotify">Notify</label>');
        showOnly.append('<label><input type="checkbox" value="1,2,3">1-Bulbasaur+</label>');
        showOnly.append('<label><input type="checkbox" value="4,5,6">4-Charmander+</label>');
        showOnly.append('<label><input type="checkbox" value="58,59">58-Growlithe+</label>');
        showOnly.append('<label><input type="checkbox" value="63,64,65">63-Abra+</label>');
        showOnly.append('<label><input type="checkbox" value="66,67,68">66-Machop+</label>');
        showOnly.append('<label><input type="checkbox" value="74,75,76">74-Geodude+</label>');
        showOnly.append('<label><input type="checkbox" value="92,93,94">92-Gastly+</label>');
        showOnly.append('<label><input type="checkbox" value="102,103">102-Exeggcute+</label>');
        showOnly.append('<label><input type="checkbox" value="111,112">111-Rhyhorn+</label>');
        showOnly.append('<label><input type="checkbox" value="113,242">113-Chansey+</label>');
        showOnly.append('<label><input type="checkbox" value="131">131-Lapras</label>');
        showOnly.append('<label><input type="checkbox" value="133,134,135,136,196,197">133-Eevee+</label>');
        showOnly.append('<label><input type="checkbox" value="138,139">138-Omanyte+</label>');
        showOnly.append('<label><input type="checkbox" value="143">143-Snorlax</label>');
        showOnly.append('<label><input type="checkbox" value="147,148,149">147-Dratini+</label>');
        showOnly.append('<label><input type="checkbox" value="228,229">228-Houndour+</label>');
        showOnly.append('<label><input type="checkbox" value="246,247,248">246-Larvitar+</label>');
        
        showOnly.append('<label>Custom<input type="text"></label>');

        //Apply show only settings
        showOnly.find("INPUT[type=checkbox]").each(function () {
            var box = $(this);
            box.prop("checked", !!settings.showOnlySettings[box.val()]);
        });
        showOnly.find("INPUT[type=text]").val(!settings.showOnlySettings["custom"] ? "" : settings.showOnlySettings["custom"]);

        //Show only actions
        showOnly.on("change", "INPUT", function () {
            var isShowOnlyOn = showOnly.find("#showonly").prop("checked");
            var showOnlyNumbers = [];

            //If master switch changed
            if ($(this).val() == "showonly") {
                if (isShowOnlyOn) {
                    saveCurrentExcludePoke();
                } else {
                    reapplyLastSavedExcludePoke();
                }
            }

            //if master switch on (and sub switch changed)
            if (isShowOnlyOn) {
                showOnly.find("LABEL INPUT[type=checkbox]:checked").each(function () {
                    var valArray = $(this).val().split(",");
                    valArray.forEach(function(val,i){
                        if (isNaN(val) && val === "shownotify") {
                            showOnlyNumbers = showOnlyNumbers.concat(notifiedPokemon);
                        } else if (!isNaN(val)) {
                            showOnlyNumbers.push(Number(val));
                        }
                    });
                });

                var customN = showOnly.find("INPUT[type=text]").val().split(",").map(Number).filter(function (a) {
                    return !isNaN(a) && a !== 0
                });
                showOnlyNumbers = showOnlyNumbers.concat(customN);

                showOnlyNumbers = showOnlyNumbers.slice() // slice makes copy of array before sorting it
                    .sort(function (a, b) { //Sort
                        return a - b;
                    })
                    .reduce(function (a, b) { //Remove duplicates
                        if (a.slice(-1)[0] !== b) a.push(b); // slice(-1)[0] means last item in array without removing it (like .pop())
                        return a;
                    }, []); // this empty array becomes the starting value for a
            }

            //Apply exclude numbers if any
            if (showOnlyNumbers.length > 0) {
                var excludeNumbers = allPokeNumbers.filter(function (a) {
                    return showOnlyNumbers.indexOf(a) === -1;
                });

                //apply excluded poke at sorce
                $selectExclude.val(excludeNumbers).change();
                refreshMap();
            }

            //Save showonly settings
            var showOnlySettings = {};
            showOnly.find("INPUT[type=checkbox]").each(function () {
                var box = $(this);
                showOnlySettings[box.val()] = box.prop("checked");
            });
            showOnlySettings["custom"] = showOnly.find("INPUT[type=text]").val();
            settings.showOnlySettings = showOnlySettings;
            showSideBar();
        });
        dataDiv.append(showOnly);

        //Saved exclude set markup
        var showSaved = $("<div class='quick quickShowSaved'>");
        var mpStore = JSON.parse(localStorage.getItem(settings.localStorageKey) || '{"auto":[], "manual":[]}');

        showSaved.append('<h4>Exclude sets</h4>');
        showSaved.append('<div><div>Default + Geodude</div><div><a href="javascript:" data-action="apply" data-setname="default">Apply</a></div></div>');
        showSaved.append('<div><div>High value only</div><div><a href="javascript:" data-action="apply" data-setname="high">Apply</a></div></div>');
        showSaved.append('<div><div>Medium</div><div><a href="javascript:" data-action="apply" data-setname="medium">Apply</a></div></div>');
        showSaved.append('<div><h5 style="display:inline-block;">Saved</h5> | <a href="javascript:" data-action="save">Save current</a></div>');
        mpStore.manual.forEach(function (i) {
            showSaved.append('<div><div>' + i.name + '</div><div><a href="javascript:" data-action="apply" data-setname="' + i.name + '">Apply</a></div><div><a href="javascript:" data-action="remove" data-setname="' + i.name + '">Remove</a></div></div>');
        });
        showSaved.append('<h5>Auto</h5>');
        mpStore.auto.forEach(function (i) {
            var nameDate = i.name.substring(5)
            if (!isNaN(nameDate)) {
                nameDate = moment(Number(nameDate)).format("YYYY-MM-DD HH:mm:ss");
            } else {
                nameDate = i.name;
            }
            showSaved.append('<div><div>' + nameDate + '</div><div><a href="javascript:" data-action="apply" data-setname="' + i.name + '">Apply</a></div><div><a href="javascript:" data-action="remove" data-setname="' + i.name + '">Remove</a></div></div>');
        });

        //Exclude set actions
        showSaved.find("A").click(function () {
            var anchor = $(this);
            if (anchor.data("action") === "apply") {
                applyExcludePokeSet(anchor.data("setname"));
            } else if (anchor.data("action") === "remove") {
                removeExcludePokeSet(anchor.data("setname"));
                showSideBar();
            } else if (anchor.data("action") === "save") {
                var setName = prompt("ExcludeSetName");
                setName = setName.replace(/[^\d\w]*/, "");
                if (setName.length > 0) {
                    saveCurrentExcludePoke(setName);
                    showSideBar();
                } else {
                    console.log2("Error: exclude set name must be longer than zero");
                }

            }
        });
        dataDiv.append(showSaved);

        //Default notify set
        var notifySet = $("<div class='quick'><h4>Notify sets</h4></div>");
        notifySet.append("<a href='javascript:' data-notifyset='default'>Apply my default notify set</a><br/>");
        notifySet.append("<a href='javascript:' data-notifyset='massive'>Apply massive notify set</a>");
        notifySet.find("A").click(function () {
            var notifyset = $(this).data("notifyset");
            if (notifyset === "default") {
                $selectPokemonNotify.val(settings.defaultNotifySet).trigger("change");
            } else if (notifyset === "massive") {
                $selectPokemonNotify.val(settings.massiveNotifySet).trigger("change");
            }

            refreshMap();
        });
        dataDiv.append(notifySet);

        //Reload timmeout
        var timeout = $("<div class='quick timeout'><b>Reload timeout</b> <input type='text'></div>");
        timeout.find("INPUT").val(settings.refreshInterval).change(function () {
            if (!isNaN($(this).val())) {
                settings.refreshInterval = Number($(this).val());
            } else {
                $(this).val(settings.refreshInterval)
            }
        });
        dataDiv.append(timeout);

        //Level adds to notify
        var lvlAdds = $("<div class='quick2 timeout'><b>Lvl adds</b> <input type='text'></div>");
        lvlAdds.find("INPUT").val(settings.addRegularPokesToNotifyMinLvl).change(function () {
            if (!isNaN($(this).val())) {
                settings.addRegularPokesToNotifyMinLvl = Number($(this).val());
            } else {
                $(this).val(settings.addRegularPokesToNotifyMinLvl)
            }
        });
        dataDiv.append(lvlAdds);

        //Iv adds to notify
        var ivAdds = $("<div class='quick2 timeout'><b>Iv adds</b> <input type='text'></div>");
        ivAdds.find("INPUT").val(settings.addRegularPokesToNotifyMinIv).change(function () {
            if (!isNaN($(this).val())) {
                settings.addRegularPokesToNotifyMinIv = Number($(this).val());
            } else {
                $(this).val(settings.addRegularPokesToNotifyMinIv)
            }
        });
        dataDiv.append(ivAdds);

        //Set max zoom (when to cluster pokes)
        var maxZoom = $("<div class='quick2 timeout'><b>Zoom level to start clustering</b> <input type='text'> (current zoom level: " + map.getZoom() +  ")</div>");
        maxZoom.find("INPUT").val(markerCluster.getMaxZoom()).change(function () {
            if (!isNaN($(this).val())) {
                markerCluster.setMaxZoom(Number($(this).val()));
                markerCluster.repaint();
            }else {
                $(this).val(markerCluster.getMaxZoom())
            }
        });
        dataDiv.append(maxZoom);

        //Show sidebar on load
        var showSidebarOnLoad = $("<div class='quick2'><b>Show sidebar onload</b> <input type='checkbox'></div>");
        showSidebarOnLoad.find("INPUT").prop("checked", settings.showSideBarOnLoad).change(function () {
            settings.showSideBarOnLoad = $(this).prop("checked");
        });
        dataDiv.append(showSidebarOnLoad);

        //Show loaded data
        var showLoadData = $("<div class='quick'><h4 style='display:inline-block;'>Show pokedata</h4> <input type='checkbox'></div>");
        if (settings.showLoadData) {
            showLoadData.append("<div id='pogoLastUpdate'>" + pogoLastUpdateText + "</div>");
            showLoadData.append("<div id='pogoData'>TotalPokes: " + allPoke.length + ", NotifyPokes: " + notifyPoke.length + "</div>");
        }
        showLoadData.find("INPUT").prop("checked", settings.showLoadData).change(function () {
            settings.showLoadData = $(this).prop("checked")
            settings.showLogData = $(this).prop("checked")
            overrideLoadRwaData(settings.showLoadData);
            showSideBar();
        });
        overrideLoadRwaData(settings.showLoadData);
        dataDiv.append(showLoadData);

        //Scout pokes
        var shouldScoutPokes = $("<div class='quick'><h4 style='display:inline-block;'>Scout pokemons with no Iv</h4></div>");
        shouldScoutPokes.append(" <a href='javascript:'>Scout now >></a>");
        shouldScoutPokes.find("A").click(function () {
            scoutPokes(notifyPoke);
        });

        //  shouldScoutPokes.append("<input type='checkbox'>")
        //  shouldScoutPokes.find("INPUT").prop("checked", settings.scoutPokes).change(function(){
        //      settings.scoutPokes = $(this).prop("checked");
        //      showSideBar();
        //  });
        dataDiv.append(shouldScoutPokes);

        //Zoom levels
        var zoomLvl = $("<div class='quick'><h4>Zoom level</h4></div>");
        zoomLvl.append("<div><a href='javascript:' data-zoomlvl='-'>Zoom--</a></div>")
        zoomLvl.append("<div><a href='javascript:' data-zoomlvl='+'>Zoom++</a></div>")
        zoomLvl.append("<div><a href='javascript:' data-zoomlvl='10'>Zoom out (lvl 10)</a></div>")
        zoomLvl.append("<div><a href='javascript:' data-zoomlvl='14'>Zoom in (lvl 14)</a></div>")
        zoomLvl.append("<div><a href='javascript:' data-zoomlvl='16' data-latlng='59.3250458369,18.070779102100005'>Default zoom and default center</a></div>")
        zoomLvl.append("<div><a href='javascript:' data-zoomlvl='10' data-latlng='59.32758578719692,18.07140137459146'>Stor Sthlm zoom and center</a></div>")
        zoomLvl.append("<div><a href='javascript:' data-zoomlvl='14' data-latlng='59.32758578719692,18.071401374591446'>Sthlm city zoom and center</a></div>")
        zoomLvl.append("<div><a href='javascript:' data-zoomlvl='16' data-latlng='59.37156059938661,18.003938453448868'>MoS zoom and center</a></div>")
        zoomLvl.find("A").click(function () {
            var zLvl = $(this).data("zoomlvl");
            var latlng = $(this).data("latlng");
            latlng = (typeof latlng === "undefined") ? [] : latlng.split(",");
            if (isNaN(zLvl)) {
                if (zLvl === "+") {
                    map.setZoom(map.getZoom() + 1);
                }
                if (zLvl === "-") {
                    map.setZoom(map.getZoom() - 1);
                }
            } else {
                if (latlng.length === 2) {
                    centerMap(Number(latlng[0]), Number(latlng[1]), Number(zLvl));
                    map.setZoom(Number(zLvl));
                } else {
                    map.setZoom(Number(zLvl));
                }
            }
        });
        dataDiv.append(zoomLvl);
    }

    function sidebarCard(dataDiv, p) {
        var pokeDiv = $("<div class='pokeCard'>");
        pokeDiv.append(pokemonLabel(p));

        //Replace notify action with show action
        pokeDiv.find("DIV.pokemon.links > A[href*='notify']").text("Show").attr("href", "javascript:").click(function () {
            toggleMarker(p);
        });

        //Replace exclude action with zoom action
        pokeDiv.find("DIV.pokemon.links > A[href*='exclude']").text("Zoom").attr("href", "javascript:").click(function () {
            centerMap(p.latitude, p.longitude, 14);
            toggleMarker(p);
        });

        //Append remove card action on regular remove action
        pokeDiv.find("DIV.pokemon.links > A[href*='remove']").click(function () {
            pokeDiv.remove();
        });

        //Add close (remove card) button
        var closeBtn = $('<div class="pokeCardClose">X</div>');
        closeBtn.click(function () {
            pokeDiv.remove();
        });
        pokeDiv.append(closeBtn);

        //Add card to sidebar
        dataDiv.append(pokeDiv);
    }

    function sidebarTable(dataDiv, poke) {
        var row = $("<div id='tableRow'>");
        row.append("<div class='pokeName'>" + poke.pokemon_name + "</div>");
        row.append("<div class='pokeCP'>CP: " + poke.cp + "</div>");
        row.append("<div class='pokeLvl'>Lvl: " + poke.Lvl + "</div>");
        row.append("<div class='pokeIv'>Iv: " + poke.Iv + "%</div>");
        row.append("<div class='pokeTime'>Time: " + poke.Time + "</div>");

        row.click(function () {
            toggleMarker(poke);
        }).find(".pokeTime").click(function () {
            centerMap(poke.latitude, poke.longitude, 14);
        });
        dataDiv.append(row);
    }

    //Public
    function showToaster() {
        console.log2("Load toaster");
        loadPokeData();

        var tostTxt = "<div class='toasterContainer'>";
        $.each(notifyPoke, function (i, p) {
            var txt = consoleData(p);
            tostTxt += "<div class='toasterRow'><div>" + txt.replace(/, /g, "</div><div>") + "</div></div>";
        });
        tostTxt += "</div>"
        toastr.info(tostTxt, "Prio Pokemons", toastOptFull);
    }

    function showSideBar() {
        var t0 = performance.now();

        //Refresh map evry 10 run
        if (reloadCounter > 9) {
            reloadCounter = 0;
            refreshMap();
        } else {
            reloadCounter++
        }

        //toastr.info("(Re)Loading sidebar...",{progressBar: true, timeOut:1000})  
        console.log2("Load sidebar");

        //Load and sort data
        loadPokeData();

        //Sidebar markup
        var containerDiv = $("<div class='gm-style'>");

        //Header
        containerDiv.append("<center><h3>Prio Pokemons</h3></center>");

        //Append settings markup
        sidebarSettings(containerDiv);

        //Data
        var dataDiv = $("<div class='pokeData'>");

        //QuickStuff markup
        if (settings.sideBarType === "quick") {
            sidebarQuick(dataDiv);

        } else {

            //dataDiv.append("<div></div>");

            //Pokes markup
            $.each(notifyPoke, function (i, p) {

                //check if poke should be showed
                if (!p.hidden) {

                    //Table markup
                    if (settings.sideBarType === "table") {
                        sidebarTable(dataDiv, p);
                    }
                    //Card markup
                    else {
                        sidebarCard(dataDiv, p);
                    }
                }
            });
        }

        containerDiv.append(dataDiv);

        //Empty and add sidebar markup, make it visable and add close action
        $("#gym-details").empty().append(containerDiv).append('<a href="#" class="close" style="line-height: inherit; padding-right: 5px; width:auto; height:auto;" tabindex="0"></a>');
        $("#gym-details").addClass("visible");
        $("#gym-details").attr("style", "width:360px;")
        $("#gym-details").on("click", ".close", function () {
            if (intervalID !== null) {
                clearInterval(intervalID);
                intervalID = null;
            }
            $("#gym-details").removeClass("visible")
        });

        var t1 = performance.now();
        console.log2("Load sidebar took " + (t1 - t0) + " milliseconds.")
    }

    function init() {
        var storeSetting = JSON.parse(localStorage.getItem(settings.localStorageSettingsKey));
        if (!!storeSetting) {
            settings = $.extend(true, settings, storeSetting);
        }
        //toastr.clear();
        if (settings.showToasterBtn) addToasterBtn();
        if (settings.showSideBarBtn) addSideBarBtn();
        if (settings.showRemoveToastersBtn) addRemoveToastersBtn();
        if (settings.showSideBarOnLoad) showSideBar();
        if (settings.overrideNotifyToaster) overrideNotifyToaster();
        $("HEAD").append(MaS.PoGo.Style);
    }

    window.onbeforeunload = function () {
        localStorage.setItem(settings.localStorageSettingsKey, JSON.stringify(settings));
    };

    return {
        Init: init,
        ShowToaster: showToaster,
        ShowSideBar: showSideBar,
        CurrentSettings: settings
    }
})();

//Run Init
MaS.PoGo.fn.Init();