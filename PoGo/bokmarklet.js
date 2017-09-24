(function () {
    function loadMaSPoGo() {

        var s = document.createElement("script");
        s.src = "https://rawgit.com/afsandeberg/misc/master/PoGo/maspogo.js";
        s.onload = s.onreadystatechange = function (a, b, c) {
            if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {

                // Handle memory leak in IE
                s.onload = s.onreadystatechange = null;
                toastr.info("MaSPogo loaded", "", {positionClass: "toast-bottom-right", progressBar:true});
                
                console.log("MaSPoGo loaded")
            }
        }
        document.getElementsByTagName("head")[0].appendChild(s)
    }
    if(1===1 || $("SCRIPT[src*='maspogo.js']").length === 0){
        loadMaSPoGo();
    }
    else
    {
        toastr.warning("MaSPogo already loaded", "", {positionClass: "toast-bottom-right", progressBar:true});
        console.log("MaSPogo already loaded");
    }
})();




//http://bookmarklets.org/maker/
//javascript:(function(){function loadMaSPoGo(){var s=document.createElement("script");s.src="http://localhost/maspogo.js",s.onload=s.onreadystatechange=function(a,b,c){this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(s.onload=s.onreadystatechange=null,toastr.info("MaSPogo loaded","",{positionClass:"toast-bottom-right",progressBar:!0}),console.log("MaSPoGo loaded"))},document.getElementsByTagName("head")[0].appendChild(s)}0===0?loadMaSPoGo():(toastr.warning("MaSPogo already loaded","",{positionClass:"toast-bottom-right",progressBar:!0}),console.log("MaSPogo already loaded"))})();
//javascript:(function(){function loadMaSPoGo(){var s=document.createElement("script");s.src="https://rawgit.com/afsandeberg/misc/master/PoGo/maspogo.js",s.onload=s.onreadystatechange=function(a,b,c){this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(s.onload=s.onreadystatechange=null,toastr.info("MaSPogo loaded","",{positionClass:"toast-bottom-right",progressBar:!0}),console.log("MaSPoGo loaded"))},document.getElementsByTagName("head")[0].appendChild(s)}0===$("SCRIPT[src*='maspogo.js']").length?loadMaSPoGo():(toastr.warning("MaSPogo already loaded","",{positionClass:"toast-bottom-right",progressBar:!0}),console.log("MaSPogo already loaded"))})();
//javascript:(function(){var allPoke=$.map(mapData.pokemons,function(p,k){return p}),notifyPoke=allPoke.filter(function(p){return isNotifyPoke(p)}).sort(function(a,b){return a.pokemon_id-b.pokemon_id}),tostTxt="<div>";$.each(notifyPoke,function(i,p){var iv;try{iv=getIv(this.individual_attack,this.individual_defense,this.individual_stamina).toFixed(1)}catch(a){iv="???"}var txt="Name:"+this.pokemon_name+" CP:"+this.cp+" Lvl:"+getPokemonLevel(this.cp_multiplier)+" Iv:"+iv+"% Tid:"+moment(this.disappear_time).format("HH:mm");console.log(txt),tostTxt+="<div><div style='display: inline-block; width: 200px;'>"+txt.replace(/ /g,"</div><div style='display: inline-block; width: 100px;'>")+"</div></div>"}),tostTxt+="</div>",toastr.info(tostTxt,"Prio Pokemons",{"positionClass":"toast-top-full-width"})})();
//javascript:(function(){var allPoke=$.map(mapData.pokemons,function(p,k){return p}),notifyPoke=allPoke.filter(function(p){return isNotifyPoke(p)}).sort(function(a,b){return a.pokemon_id-b.pokemon_id}),containerDiv=$("<div class='gm-style'>");containerDiv.append("<center><h3>Prio Pokemons</h3></center>"),$.each(notifyPoke,function(i,p){var iv;try{iv=getIv(this.individual_attack,this.individual_defense,this.individual_stamina).toFixed(1)}catch(a){iv="???"}var txt="Name:"+p.pokemon_name+" CP:"+this.cp+" Lvl:"+getPokemonLevel(this.cp_multiplier)+" Iv:"+iv+"% Tid:"+moment(this.disappear_time).format("HH:mm");console.log(txt);var pokeDiv=$("<div style='padding-left:20px; padding-top:5px;'>");pokeDiv.append(pokemonLabel(this)),pokeDiv.find("SPAN.pokemon.links.notify A").text("Show").attr("href","javascript:").click(function(){p.marker.infoWindow.open(map,p.marker),clearSelection(),updateLabelDiffTime(),p.marker.persist=!0,p.marker.infoWindowIsOpen=!0,p.marker.setAnimation(null),p.marker.animationDisabled=!0}),pokeDiv.find("SPAN.pokemon.links.exclude A").text("Zoom").attr("href","javascript:"),containerDiv.append(pokeDiv)}),$("#gym-details").empty().append(containerDiv).append('<a href="#" class="close" tabindex="0"></a>'),$("#gym-details").addClass("visible"),$("#gym-details").on("click",".close",function(){$("#gym-details").removeClass("visible")})})();