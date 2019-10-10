# Tutoriel pour mettre une animation avec ScrollMagic

## Animation avec un avion qui vole dans une section

### Liste des liens pour l'animation  

* CDN : https://cdnjs.com/libraries/ScrollMagic
* Documentation pour ScrollMagic : http://scrollmagic.io/docs/  
* Documentation pour GSAP : https://greensock.com/scrollmagic/  

### Etape 1 HTML et CSS :

Pour commencer il vous faut faire un fichier "index.html" comme ci-dessous :  

    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="style.css">
    </head>

    <body>
        <header>
            <h1>Scroll Annimation</h1>
        </header>
        <section class="annimation">
            <img class="paper-plane" src="paper.png" alt="" srcset="">
        </section>
        <footer>
            <h1>cool</h1>
        </footer>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js"
            integrity="sha256-2p2tRZlPowp3P/04Pw2rqVCSbhyV/IB7ZEVUglrDS/c=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.js"
            integrity="sha256-31FC/OT6XpfjAhj9FuXjw5/wPXXawCAjJQ29E23/XPk=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/animation.gsap.min.js"
            integrity="sha256-+9YNuItWuR4sbqeaNiJOxG0BvptYz4fbUXbIZoH5Jwo=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenLite.min.js"
            integrity="sha256-VV47uJSoHZUeiBcCs3FcBOQLMn++yeG/zqZvaUkvGZM=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TimelineLite.min.js"
            integrity="sha256-nuhNsfXzBFR6G1lKP8bK77dakkQDqdHcQ4OCFZvk6Qo=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/plugins/CSSPlugin.min.js"
            integrity="sha256-LBjlnpPrM6Aig8LDFc9PJctPHLGUc6RaUvnmXE4hV5Y=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/plugins/BezierPlugin.min.js"
            integrity="sha256-5jxCMRC1PYU02qJn+fj+DPuxcQZCh0DR8GRwi4iKoRc=" crossorigin="anonymous"></script>
        <script src="app.js"></script>
    </body>

    </html>

Nous remarquerons qu'il y a une class à la section et sur l'image, nous allons en avoir besoin pour la suite avec le fichier CSS.  
Surtout n'oubliez les différents links CDN, ceux-ci nous servent à pouvoir effectuer cette animation.

Passons au fichier "style.css" que nous avons linker sur notre fichier HTML :

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    header, footer{
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Roboto', Arial, sans-serif;
    }

    header h1{
        font-size: 60px;
    }
    /*font d'écran de la section de l'animation*/
    .animation{
        height: 100vh;
        background-image: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
        position: relative;
        overflow: hidden;
    }
    /*positionnement et taille de l'image utilisée pour l'animation*/
    .paper-plane{
        height: 100px;/*taille de l'image*/
        position: relative;/*position par rapport au container .animation*/
        top: 50%;/*position de l'image en haut par rapport au container .animation*/
        left: 0%;/*position de l'image à gauche par rapport au container .animation*/
    }

Je vous ai mis en commentaire à quoi servaient les class que nous avons mis dans le HTML.

### Etape 2 JS :

Là nous allons rentrer dans le dur du sujet, le fichier "app.js".

Dans celui-ci nous allons tout d'abord paramétrer le bezier, voici la documentation (en anglais) sur le bezier (GSAP) : https://greensock.com/docs/v2/Plugins/BezierPlugin  
Le bezier contient différents pramètres qui vont nous servir à créer notre animation.  
Voici à quoi cela va ressembler :  

    //création des paramètres de la séquence avec une autorotation, 
    //et un tableau de positionnnement de l'image (correspond au bezier)
    const flightPath = {
        //courbure entre 2 points
        curviness: 1.25,
        //autorotation
        autoRotate: true,
        //positionnement de l'image au fur et à mesure du scroll
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

(en commentaires, vous trouverez à quoi servent les différentes méthodes traduites du site)

Dans un second temps, nous allons initier la séquence de l'animation ainsi que de la création de cette séquence  

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

Voici la documentation :  
TimelineLite (GSAP) : https://greensock.com/docs/v2/TimelineLite  
Tweenlite (GSAP) : https://greensock.com/docs/v2/TweenLite  
Tween (GSAP) : https://greensock.com/docs/v2/Plugins/TweenPlugin  
De même que pour la 1ère étape, je vous ai les tarduction en commentaires

Maintenant, nous allons initier notre controller ScrollMagic pour ainsi créer notre scène pour notre animation.  

    //initiation du controller
    const controller = new ScrollMagic.Controller();
    //création de la scène
    const scene = new ScrollMagic.Scene({
        triggerElement: '.animation',//container de l'élément utiliser pour la scène
        duration: 500,//distance (hauteur) de l'animation (ici 500px) lors du scroll
        triggerHook: 0.4//point de départ de la scène
    })
        .setTween(tween)//sélection de la séquence
        //.addIndicators() //optionel, indicateur
        .addTo(controller);//assignation de la scene  

Documentation ScrollMagic : http://scrollmagic.io/docs/  
(Traduction en commentaires)

Vous pouvez visualiser le resultat sur cette page :  https://ti-k-sper.github.io/Tuto_scrollmagic/  
Et directement cloner les fichier sur : https://github.com/ti-k-sper/Tuto_scrollmagic.git  