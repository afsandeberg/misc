"use strict";

//Namespace
var MaS = MaS || {};
MaS.PoGo = MaS.PoGo || {};

MaS.PoGo.Settings = {
    showToasterBtn: true,
    showSideBarBtn: true,
    showMapReshBtn: true,
    showSideBarOnLoad: true,
    autoRefresh: true,
    refreshInterval: 30, //sec 
    sideBarType: "table", //card or table
    sortType: "Lvl" //Prop to sort view by
};

MaS.PoGo.Style = (function () {/*
    <style>
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
            padding-left:20px;
        }
        #tableRow{
            font-size:12px;
        }
        #tableRow > DIV{
            display: inline-block;
            width: 55px;
        }
        #tableRow > DIV:first-child{
             width: 100px;
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
    </style>     
 */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

MaS.PoGo.fn = (function () {
    var allPoke;
    var notifyPoke;
    var intervalID = null;

    //Const
        var toastOptFull = {
        positionClass: "toast-top-full-width",
        progressBar: true,
        closeButton: false
    };
    var toastOptBotRig = {
        positionClass: "toast-bottom-right",
        progressBar: true,
        closeButton: false
    }

    //Helpers
    function loadPokeData() {

        //Get all pokemon data
        allPoke = $.map(mapData.pokemons, function (p, k) {
            return p;
        });

        //Filter notify pokemons
        notifyPoke = allPoke.filter(function (p) {
            return isNotifyPoke(p)
        }).map(function (p, k) {
            p.Lvl = parseFloat(getPokemonLevel(p.cp_multiplier));
            p.Time = moment(p.disappear_time).format("HH:mm")
            try {
                p.Iv = parseFloat(getIv(p.individual_attack, p.individual_defense, p.individual_stamina).toFixed(1));
            } catch (a) {
                p.Iv = -1;
            }
            return p;
        }).sort(function (a, b) {
            var sortType = MaS.PoGo.Settings.sortType.toLowerCase();

            if (sortType === "name") {
                return a.pokemon_name > b.pokemon_name ? 1 : a.pokemon_name < b.pokemon_name ? -1 : 0;
            }
            if (sortType === "cp") {
                return a.cp > b.cp ? -1 : a.cp < b.cp ? 1 : 0;
            }
            if (sortType === "lvl") {
                return a.Lvl > b.Lvl ? -1 : a.Lvl < b.Lvl ? 1 : 0;
            }
            if (sortType === "iv") {
                return a.Iv > b.Iv ? -1 : a.Iv < b.Iv ? 1 : 0;
            }
            if (sortType === "time") {
                return a.disappear_time > b.disappear_time ? 1 : a.disappear_time < b.disappear_time ? -1 : 0;
            }
            return a.pokemon_id - b.pokemon_id
        });
    }

    function autoRefresh() {
        if (MaS.PoGo.Settings.autoRefresh && intervalID === null) {
            intervalID = setInterval(showSideBar, MaS.PoGo.Settings.refreshInterval * 1000);
        } else if (!MaS.PoGo.Settings.autoRefresh && intervalID !== null) {
            clearInterval(intervalID);
            intervalID = null;
        }

    }

    function stopBounce(pokes) {
        $.each(pokes, function (i, p) {
            p.marker.setAnimation(null);
            p.marker.animationDisabled = true;
        })
    }

    function unHide(pokes) {
        $.each(pokes, function (i, p) {
            p.hidden = false;
        })
    }

    function consoleData(poke) {
        var txt = "Name:" + poke.pokemon_name + ", CP:" + poke.cp + ", Lvl:" + poke.Lvl + ", Iv:" + poke.Iv + "%" + ", Time:" + poke.Time;
        //console.log(txt)
        return txt;
    }

    function showMarker(p){
        p.marker.infoWindow.open(map, p.marker);
        clearSelection();
        updateLabelDiffTime();
        p.marker.persist = true;
        p.marker.infoWindowIsOpen = true;
        p.marker.setAnimation(null);
        p.marker.animationDisabled = true;
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

    function addMapRefreshBtn() {}


    //Public
    function showToaster() {
        //console.log("Load toaster");
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
        //toastr.info("(Re)Loading sidebar...",{progressBar: true, timeOut:1000})  
        //console.log("Load sidebar");
        loadPokeData();

        //Sidebar markup
        var containerDiv = $("<div class='gm-style'>");

        //Header
        containerDiv.append("<center><h3>Prio Pokemons</h3></center>");

        //Settings markup
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
        settingsDiv.append("Settings<input type='radio' id='sideBarTypeSettings' name='sidebarType' value='settings'>");

        //Settings actions
        if (MaS.PoGo.Settings.autoRefresh) {
            settingsDiv.find("INPUT#autoRefresh").prop('checked', true);
            autoRefresh();
        }
        settingsDiv.find("INPUT#autoRefresh").click(function () {
            MaS.PoGo.Settings.autoRefresh = $(this).prop('checked');
            autoRefresh();
        });

        settingsDiv.find("SELECT#sortBy").val(MaS.PoGo.Settings.sortType);
        settingsDiv.find("SELECT#sortBy").change(function () {
            MaS.PoGo.Settings.sortType = $(this).val();
            showSideBar();
        });

        settingsDiv.find("A#stopBounce").click(function () {
            stopBounce(notifyPoke);
        });

        settingsDiv.find("A#reloadData").click(function () {
            toastr.info("Reloading map...", "", toastOptBotRig);
            updateMap();
        });

        settingsDiv.find("A#resetData").click(function () {
            toastr.info("Reseting data...", "", toastOptBotRig);
            unHide(notifyPoke);
            initMap();
        });

        if(MaS.PoGo.Settings.sideBarType==="table"){
            settingsDiv.find('input#sideBarTypeTable').prop("checked", true);
        }else{
            settingsDiv.find('input#sideBarTypeCard').prop("checked",true);
        }
        settingsDiv.find('input[name=sidebarType]').click(function(){
            MaS.PoGo.Settings.sideBarType = $(this).val();
            showSideBar();
        });

        //Append settings markup
        containerDiv.append(settingsDiv);

        var dataDiv = $("<div class='pokeData'>")

        //Pokes markup
        $.each(notifyPoke, function (i, p) {

            //check if poke should be showed
            if (!p.hidden) {

                if (MaS.PoGo.Settings.sideBarType === "table") {
                    var table = consoleData(p);
                    table = $("<div id='tableRow'><div>" + table.replace(/\, /g, "</div><div>") + "</div></div>");
                    table.click(function(){
                        showMarker(p);
                    });
                    dataDiv.append(table);

                }
                //Card markup
                else {

                    var pokeDiv = $("<div class='pokeCard'>");
                    pokeDiv.append(pokemonLabel(this));

                    //Replace notify action with show action
                    pokeDiv.find("SPAN.pokemon.links.notify A").text("Show").attr("href", "javascript:").click(function () {
                        showMarker(p);
                    });

                    //Replace exclude action with zoom action
                    pokeDiv.find("SPAN.pokemon.links.exclude A").text("Zoom").attr("href", "javascript:").click(function () {
                        centerMap(p.latitude,p.longitude,14);
                        showMarker(p);
                    });

                    //Append remove card action on regular remove action
                    pokeDiv.find("SPAN.pokemon.links.remove A").click(function () {
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
            }
        });

        containerDiv.append(dataDiv);

        //Empty and add sidebar markup, make it visable and add close action
        $("#gym-details").empty().append(containerDiv).append('<a href="#" class="close" tabindex="0"></a>');
        $("#gym-details").addClass("visible");
        $("#gym-details").attr("style", "width:360px;")
        $("#gym-details").on("click", ".close", function () {
            if(intervalID !== null){
                clearInterval(intervalID);
                intervalID = null;
            }
            $("#gym-details").removeClass("visible")
        });

    }

    function init() {
        toastr.clear();
        if (MaS.PoGo.Settings.showToasterBtn) addToasterBtn();
        if (MaS.PoGo.Settings.showSideBarBtn) addSideBarBtn();
        if (MaS.PoGo.Settings.showMapReshBtn) addMapRefreshBtn();
        if (MaS.PoGo.Settings.showSideBarOnLoad) showSideBar();
        $("HEAD").append(MaS.PoGo.Style);
    }


    return {
        Init: init,
        ShowToaster: showToaster,
        ShowSideBar: showSideBar
    }
})();

//Run Init
MaS.PoGo.fn.Init();