"use strict";

//Namespace
var MaS = MaS || {};
MaS.PoGo = MaS.PoGo || {};

MaS.PoGo.Settings = {
    showToasterBtn: true,
    showSideBarBtn: true,
    showMapReshBtn: true,
    showSideBarOnLoad: false,
    autoRefresh: true,
    refreshInterval: 30, //sec 
    sideBarType: "card", //card or table
    sortType: "Nr" //Prop to sort table view by
};

MaS.PoGo.fn = (function () {
    var allPoke;
    var notifyPoke;
    var intervalID = null;

    //Const
    var btnStyle = 'float: right; border-left: solid 1px rgba(255,255,255,.15); border-right: solid 1px rgba(255,255,255,.15); padding-left: 1.25em; padding-right: 1.25em; margin-left:-1px;';
    var toastOptFull = {
        positionClass: "toast-top-full-width",
        progressBar: true,
        closeButton: true
    };
    var toastOptBotRig = {
        positionClass: "toast-bottom-right",
        progressBar: true,
        closeButton: true
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
            p.Lvl = getPokemonLevel(p.cp_multiplier);
            p.Time = moment(p.disappear_time).format("HH:mm")
            try {
                p.Iv = getIv(p.individual_attack, p.individual_defense, p.individual_stamina).toFixed(1);
            } catch (a) {
                p.Iv = "???";
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
            if (sortType === "Iv") {
                return a.Iv > b.Iv ? -1 : a.Iv < b.Iv ? 1 : 0;
            }
            if (sortType === "Time") {
                return a.Time > b.Time ? -1 : a.Time < b.Time ? 1 : 0;
            }
            return a.pokemon_id - b.pokemon_id
        });
    }

    function autoRefresh() {
        console.log("autoRefresh");
        if (MaS.PoGo.autoRefresh && intervalID === null) {
            console.log("a1");
            intervalID = setInterval(showSideBar, MaS.PoGo.Settings.refreshInterval * 1000);
        } else if (!MaS.PoGo.autoRefresh && intervalID !== null) {
            console.log("a2");
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

    function addToasterBtn() {
        $("HEADER#header A#toasterToggle").remove();
        var toasterBtn = $('<a href="javascript:" id="toasterToggle" class="statsNav" style="' + btnStyle + '"><span class="label">Toast</span></a>');
        toasterBtn.click(function () {
            showToaster();
        });
        $("HEADER#header").append(toasterBtn);
    }

    function addSideBarBtn() {
        $("HEADER#header A#sideBarToggle").remove();
        var sideBarBtn = $('<a href="javascript:" id="sideBarToggle" class="statsNav" style="' + btnStyle + '"><span class="label">SideBar</span></a>');
        sideBarBtn.click(function () {
            showSideBar();
        });
        $("HEADER#header").append(sideBarBtn);
    }

    function addMapRefreshBtn() {}


    //Public
    function showToaster() {
        loadPokeData();

        var tostTxt = "<div>";
        $.each(notifyPoke, function (i, p) {
            var txt = "Name:" + this.pokemon_name + " CP:" + this.cp + " Lvl:" + this.Lvl + " Iv:" + this.Iv + "%" + " Time:" + this.Time;
            console.log(txt);
            tostTxt += "<div><div style='display: inline-block; width: 200px;'>" + txt.replace(/ /g, "</div><div style='display: inline-block; width: 100px;'>") + "</div></div>";
        });
        tostTxt += "</div>"
        toastr.info(tostTxt, "Prio Pokemons", toastOptFull);
    }

    function showSideBar() {
        //toastr.info("(Re)Loading sidebar...",{progressBar: true, timeOut:1000})  
        console.log("Load sidebar");
        loadPokeData();

        var containerDiv = $("<div class='gm-style'>");
        containerDiv.append("<center><h3>Prio Pokemons</h3></center>");
        var settingsDiv = $("<div id='settings' style='padding-left:20px; padding-bottom:10px; margin-top:-15px; border-bottom:1px solid black;'>");
        settingsDiv.append("Auto-reload <input id='autoRefresh' type='checkbox'> | ")
        settingsDiv.append("<a href='javascript:' id='stopBounce'>Stop bounce</a> | ")
        settingsDiv.append("<a href='javascript:' id='reloadData'>Reload data</a> | ")
        settingsDiv.append("<a href='javascript:' id='resetData'>Reset data</a> | ")
        settingsDiv.append("<br/>")
        settingsDiv.append("Sort by <select id='sortBy' style='font-size: xx-small;'><option>Nr</option><option>Name</option><option>CP</option><option>Lvl</option><option>Iv</option><option>Time</option></select> ");
        settingsDiv.append("Sidebar type: Card <input type='radio' name='sidebarType' value='card'> Table <input type='radio' name='sidebarType' value='table'>");

        if (MaS.PoGo.Settings.autoRefresh) {
            settingsDiv.find("INPUT#autoRefresh").prop('checked', true);
            autoRefresh();
        }
        settingsDiv.find("INPUT#autoRefresh").click(function () {
            MaS.PoGo.Settings.autoRefresh = $(this).prop('checked');
            console.log("kalle");
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

        containerDiv.append(settingsDiv);

        $.each(notifyPoke, function (i, p) {
            var txt = "Name:" + this.pokemon_name + " CP:" + this.cp + " Lvl:" + this.Lvl + " Iv:" + this.Iv + "%" + " Time:" + this.Time;
            console.log(txt);

            var pokeDiv = $("<div style='padding-left:50px; padding-top:10px; border-bottom:1px solid black; position:relative;'>");
            pokeDiv.append(pokemonLabel(this));
            pokeDiv.find("SPAN.pokemon.links.notify A").text("Show").attr("href", "javascript:").click(function () {
                p.marker.infoWindow.open(map, p.marker);
                clearSelection();
                updateLabelDiffTime();
                p.marker.persist = true;
                p.marker.infoWindowIsOpen = true;
                p.marker.setAnimation(null);
                p.marker.animationDisabled = true;
            });
            pokeDiv.find("SPAN.pokemon.links.exclude A").text("Zoom").attr("href", "javascript:")
            //ToDo Zoom in

            pokeDiv.find("SPAN.pokemon.links.remove A").click(function () {
                pokeDiv.remove();
            });

            var closeBtn = $('<div style="width: 13px; height: 13px; overflow: hidden; position: absolute; right: 12px; top: 10px; z-index: 10000; cursor: pointer; opacity: 0.7; font-size:14px;">X</div>');
            closeBtn.click(function () {
                pokeDiv.remove();
            });

            pokeDiv.append(closeBtn);
            containerDiv.append(pokeDiv);
        });

        $("#gym-details").empty().append(containerDiv).append('<a href="#" class="close" tabindex="0"></a>');
        $("#gym-details").addClass("visible");
        $("#gym-details").on("click", ".close", function () {
            $("#gym-details").removeClass("visible")
        });

    }

    function init() {
        if (MaS.PoGo.Settings.showToasterBtn) addToasterBtn();
        if (MaS.PoGo.Settings.showSideBarBtn) addSideBarBtn();
        if (MaS.PoGo.Settings.showMapReshBtn) addMapRefreshBtn();
        if (MaS.PoGo.Settings.showSideBarOnLoad) showSideBar();
    }


    return {
        Init: init,
        ShowToaster: showToaster,
        ShowSideBar: showSideBar
    }
})();

//Run Init
MaS.PoGo.fn.Init();