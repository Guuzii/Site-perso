$(function() {
	$(window).ready(function(e) {
		$("header").css("height", $(window).height());
		if ($(window).width() > 568) {
			$(".js_slide").toggle();
		}
		else {
			$("#start_button").hide();
		}		
	});

	function StopAnime(anime) {
		clearInterval(anime);
	};

	function DisplayProjects(category) {
		$("#projects a").each(function() {
			if ($(this).hasClass(category)) {
				$(this).show(500);
			}
			else {
				$(this).hide(500);
			}			
		});
		$("#projects li").each(function() {
			$(this).removeClass("active");
		});
		$("#projects .menu").slideUp(function() {
			$("#projects_displayed").slideDown();
		});
	};

	// gestion du click du burger_button
	$("#burger_button").click(function(e) {
		$(this).css({"border-radius": "5px 5px 0 0"});
		$("#burger_button").each(function() {
			if ($(this).hasClass("change")) {
				$(this).removeClass("change");
			}
			else {
				$(this).addClass("change");
			}			
		});			
		$("header .menu").toggle(300);
			
	});

	// gestion de l'event qui gére le clic de l'élément start_button
	$("#start_button").click(function(e) {
		$(".js_slide").toggle();
		$("html, body").animate({scrollTop: $("#habit").position().top - 60}, 800);
		$("#start_button").toggle();
		if ($(window).width() < 568) {
			$("#mobile_menu").toggle(300);
		}
		else {
			$("header .menu").toggle(300);
		}
		StopAnime(startButtonAnime);
	});

	var startButtonAnime = setInterval(function() {
		$("#start_button").animate({"bottom": "0px"}, 200).animate({"bottom": "10px"}, 200);
	}, 1800);

	// gestion de l'event au clique des éléments des menus.
	$("header .menu, #projects .menu").each(function() {
		$(this).click(function(e) {
			switch(e.target.textContent) {
				case "Habitudes":
					$("html, body").animate({scrollTop: $("#habit").position().top - 60}, 800);
					if ($(window).width() < 568) {
						$("header .menu").toggle(300);
					}
					$("#burger_button").each(function() {
						$(this).removeClass("change");
					});
					break;
				case "Compétences":
					$("html, body").animate({scrollTop: $("#skills").position().top - 60}, 800);
					if ($(window).width() < 568) {
						$("header .menu").toggle(300);
					}
					$("#burger_button").each(function() {
						$(this).removeClass("change");
					});
					break;
				case "Réalisations":
					$("html, body").animate({scrollTop: $("#projects").position().top - 60}, 800);
					if ($(window).width() < 568) {
						$("header .menu").toggle(300);
					}
					$("#burger_button").each(function() {
						$(this).removeClass("change");
					});
					break;
				case "Contact":
					$("html, body").animate({scrollTop: $("footer").position().top - 60}, 800);
					if ($(window).width() < 568) {
						$("header .menu").toggle(300);
					}
					$("#burger_button").each(function() {
						$(this).removeClass("change");
					});
					break;
				case "Toutes":
					DisplayProjects("project");
					$("#projects li:contains(Toutes)").addClass("active");
					$("#projects_displayed").text(e.target.textContent);
					break;
				case "Formations":
					DisplayProjects("formation");
					$("#projects li:contains(Formations)").addClass("active");
					$("#projects_displayed").text(e.target.textContent);					
					break;
				case "Personnelles":
					DisplayProjects("perso");
					$("#projects li:contains(Personnels)").addClass("active");
					$("#projects_displayed").text(e.target.textContent);
					break;
				case "Professionnelles": 
					DisplayProjects("pro");
					$("#projects li:contains(Professionnels)").addClass("active");
					$("#projects_displayed").text(e.target.textContent);
					break;					
			}
		});
	});
	
	// gestion clique menu projets
	$("#projects_displayed").click(function(e) {
		$("#projects_displayed").slideUp(function() {
			$("#projects .menu").slideDown();	

		});	
	});

	// Effet de slide de la gauche pour affichage des élément lors d'un scroll de page et affichage du bouton de header menu associé.
	$(".js_slide").each(function() {
		$(this).css({"position": "relative", "left": $(window).width() * -1});
	});

	$(window).scroll(function(e) {
		if ((window.pageYOffset >= (document.querySelector("#habit").offsetTop - 400)) && ($("#habit").css("left") !== "0px")) {			
			$("#habit").animate({
				"left": "0px"				
			}, 500);
			$("header .menu .habit").slideDown();
			if ($(window).width() < 568) {
				$("#mobile_menu").show();
			}			
		}
		else if ((window.pageYOffset >= (document.querySelector("#skills").offsetTop - 400)) && ($("#skills").css("left") !== "0px")) {
			$("#skills").animate({
				"left": "0px"				
			}, 500, function() {
				$(".html").animate({"width": "75%"}, 800);
				$(".wordpress").animate({"width": "65%"}, 800);
				$(".javascript").animate({"width": "50%"}, 800);
				$(".jquery").animate({"width": "50%"}, 800);				
			});
			$("header .menu .skills").slideDown();
		}
		else if ((window.pageYOffset >= (document.querySelector("#projects").offsetTop - 400)) && ($("#projects").css("left") !== "0px")) {			
			$("#projects").animate({
				"left": "0px"				
			}, 500);
			$("header .menu .projects").slideDown();
			DisplayProjects("project");
		}
		else if ((window.pageYOffset >= (document.querySelector("footer").offsetTop - 400)) && ($("footer").css("left") !== "0px")) {			
			$("footer").animate({
				"left": "0px"				
			}, 500);
			$("header .menu .contact").slideDown();
			$("#to_top_button").show(500);
		}

		// rend le header menu fix lorsqu'on atteint un Yoffset particulier.
		if ((window.pageYOffset >= document.querySelector("#menu_pos").offsetTop) && ($(window).width() > 568)) { 
			$("header .menu").css({
				"position": "fixed",
				"top": "0px",
				"background": "rgba(0,0,0,0.8)",
				"border-radius": "0 0 5px 5px"
			});
			$("header .menu ul").css({"margin": "unset"});
		}
		else if ((window.pageYOffset <= document.querySelector("#menu_pos").offsetTop) && ($(window).width() > 568)) {
			$("header .menu").css({
				"position": "absolute",
				"top": "unset",
				"background": "unset"
			});
			$("header .menu ul").css({"margin": "15px 0 15px 0"});
		}		
	});

	// gestion de l'event du bouton de retour vers la haut de page.
	$("#to_top_button").click(function(e) {
		$("html, body").animate({scrollTop: 0}, 800);
		StopAnime(toTopAnime);
	});	
		
	var toTopAnime = setInterval(function() {
		$("#to_top_button").animate({"bottom": "30px"}, 300).animate({"bottom": "15px"}, 300);
	}, 5000);
	
});
