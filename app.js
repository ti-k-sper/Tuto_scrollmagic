//création des paramètres de la séquence avec une autorotation,
//et un tableau de positionnnement de l'image (correspond au bezier)
const flightPath = {
    //courbure entre 2 points
    curviness: 1.25,
    //autorotation
    autoRotate: true,
    //positionnement au fur et à mesure du scroll
    values: [
        { x: 100, y: -20 },
        { x: 300, y: 10 },
        { x: 500, y: 100 },
        { x: 750, y: -100 },
        { x: 350, y: -50 },
        { x: 600, y: 100 },
        { x: 800, y: 0 },
        { x: window.innerWidth, y: -250 }
    ]
}
//initiation gestion séquence
const tween = new TimelineLite();
//création de la séquence d'animation
tween.add(
    //définition de la section, sélection de la classe oùest l'image, temps de la course (ici 1 secondes)
    TweenLite.to(".paper-plane", 1, {
        //sélection des paramètres de la séquence, ici positionnement et autorotation en fonction de la position
        bezier: flightPath,
        //sélection effets de changement de vitesses de l'animation
        ease: Power1.easeInOut
    })
);

//initiation du controller
const controller = new ScrollMagic.Controller();
//création de la scène
const scene = new ScrollMagic.Scene({
    triggerElement: '.animation',//container de l'élément utiliser pour la scène
    duration: 500,//distance (hauteur) de l'animation (ici 500px) lors du scroll
    triggerHook: 0.4//point de départ de la scène
})
    .setTween(tween)//sélection de la séquence
    //.addIndicators() //optionel indicateur
    .addTo(controller);//assignation de la scene