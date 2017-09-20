"use strict";

//Namespace
var MaS = MaS || {};
MaS.PoGo = MaS.PoGo || {};

MaS.PoGo.Settings = {
    showToasterButton: true,
    showSideBarButton: true,
    showMapReshButton: true,
    showSideBarOnLoad: false,
    autorefresh: true,
    refreshInterval: 30, //sec 
    sideBarType: "card", //card or table
    tableSort: "name", //Prop to sort table view by
    tableColumns: ["Name", "CP", "Lvl", "Iv", "Tid"]
};

MaS.PoGo.fn = (function () {
    var allPoke;
    var notifyPoke;


    //Helpers
    function loadPokeData() {

        //Get all pokemon data
        allPoke = $.map(mapData.pokemons, function (p, k) {
            return p;
        });

        //Filter notify pokemons
        notifyPoke = allPoke.filter(function (p) {
            return isNotifyPoke(p)
        }).sort(function (a, b) {
            return a.pokemon_id - b.pokemon_id
        });
    }

    function addToasterbutton() {
        var toasterBtn = $('<a href="javascript:" id="toasterToggle" class="statsNav" style="float: right; border-left: solid 1px rgba(255,255,255,.15); padding-left: 1.25em; margin-left: .5em;"><span class="label">Toast</span></a>');
        toasterBtn.click(function () {
            showToaster();
        });
        $("HEADER#header").append(toasterBtn);
    }

    function addSideBarButton() {
        var toasterBtn = $('<a href="javascript:" id="toasterToggle" class="statsNav" style="float: right; border-left: solid 1px rgba(255,255,255,.15); padding-left: 1.25em; margin-left: .5em;"><span class="label">Toast</span></a>');
        toasterBtn.click(function () {
            showToaster();
        });
        $("HEADER#header").append(toasterBtn);
    }

    function addMapRefreshButton() {}


    //Public
    function showToaster() {
        loadPokeData();

        var tostTxt = "<div>";
        $.each(notifyPoke, function (i, p) {
            var iv;
            try {
                iv = getIv(this.individual_attack, this.individual_defense, this.individual_stamina).toFixed(1);
            } catch (a) {
                iv = "???";
            }
            var txt = "Name:" + this.pokemon_name + " CP:" + this.cp + " Lvl:" + getPokemonLevel(this.cp_multiplier) + " Iv:" + iv + "%" + " Tid:" + moment(this.disappear_time).format("HH:mm");
            console.log(txt);
            tostTxt += "<div><div style='display: inline-block; width: 200px;'>" + txt.replace(/ /g, "</div><div style='display: inline-block; width: 100px;'>") + "</div></div>";
        });
        tostTxt += "</div>"
        toastr.info(tostTxt, "Prio Pokemons", {
            "positionClass": "toast-top-full-width"
        });
    }

    function showSideBar() {
        loadPokeData();

        var containerDiv = $("<div class='gm-style'>");
        containerDiv.append("<center><h3>Prio Pokemons</h3></center>");

        $.each(notifyPoke, function (i, p) {
            var iv;
            try {
                iv = getIv(this.individual_attack, this.individual_defense, this.individual_stamina).toFixed(1);
            } catch (a) {
                iv = "???";
            }
            var txt = "Name:" + p.pokemon_name + " CP:" + this.cp + " Lvl:" + getPokemonLevel(this.cp_multiplier) + " Iv:" + iv + "%" + " Tid:" + moment(this.disappear_time).format("HH:mm");
            console.log(txt);

            var pokeDiv = $("<div style='padding-left:20px; padding-top:5px;'>");
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

            containerDiv.append(pokeDiv);
        });

        $("#gym-details").empty().append(containerDiv).append('<a href="#" class="close" tabindex="0"></a>');
        //$("#gym-details").remove(".links");
        $("#gym-details").addClass("visible");
        $("#gym-details").on("click", ".close", function () {
            $("#gym-details").removeClass("visible")
        });

    }



    function init() {}


    return {
        Init: init,
        ShowToaster: showToaster,
        ShowSideBar: showSideBar,
        Context: this //Access to private context
    }
})();