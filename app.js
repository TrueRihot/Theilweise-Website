gsap.registerPlugin(ScrollTrigger);

let moePage = {};

moePage.animateSections = () => {
    let sections = gsap.utils.toArray('section');
    sections.forEach(element => {
        let miniElemnts = element.querySelectorAll('.sub-content');
        let timeline = gsap.timeline();
        let elementheight = 0;
        const dir = element.getAttribute('animation-dir');

        miniElemnts.forEach((mini, j) => {
            let inhalt = mini.querySelectorAll(`.animate-wrap[animate-property="${j}"] > *`);
            let animation = gsap.timeline();

            if(dir === 'down') {
                elementheight += mini.offsetHeight;
                timeline.to(
                    mini,
                    {
                        top: 0,
                        duration: 2,
                    }
                )
            }else {
                elementheight += mini.offsetWidth;
                timeline.to(
                    mini,
                    {
                        left: 0,
                        duration: 2,
                    }
                )
            }

            inhalt.forEach((inhalt, i) => {
                animation.to(inhalt,
                    {
                        x: "0",
                        duration: 1.2,
                        ease: Power3.easeInOut,
                        delay: i === 0 ? 0 : -0.9
                    });

                ScrollTrigger.create({
                    trigger: mini,
                    start: "top center",
                    animation: animation,
                })
            });
        });

        ScrollTrigger.create({
            trigger: element,
            animation: timeline,
            start: 'top top',
            end: '+=' + elementheight,
            pin: element,
            scrub: 1,
            invalidateOnRefresh: true
        });
    });
}

moePage.AnimateTitle = (val) => {

    const title = document.querySelector('h1');
    let words = title.childNodes;
    let tl = gsap.timeline({delay: 1});
    let offset = val / 2;
    let width = words[0].offsetWidth;
    let subline = document.querySelector('#start-page span');
    let mousedot = document.querySelector('#lets-go');
    let mouseTimeline = gsap.timeline();
    mouseTimeline.paused(true);
    if(window.screen.width <= 939) {

        mouseTimeline.to(mousedot,{
            bottom: "-=30",
            duration: 1,
            ease: Power3.easeInOut,
            yoyo: true,
            repeat: 5,
            delay:0
        });

            tl.to(words[0], {
            bottom: 0,
            duration: 1,
            ease: Power3.easeOut,
        })
        .to(words[1],{
            bottom: '35%',
            duration: 1,
            delay: -1,
            ease: Power3.easeInOut,
        })
        .to(subline,{
            top: "50%",
            duration: 1,
            delay: 0.25,
            rotate:0,
            ease: Power3.easeInOut,
            onComplete: function(){
                gsap.to(mousedot,{
                    opacity: "1",
                    duration: 1
                })
                
                mouseTimeline.play()}
        });



    }else {
    mouseTimeline.to(mousedot,{
        bottom: "-=30",
        duration: 1,
        ease: Power3.easeInOut,
        yoyo: true,
        repeat: 5,
        delay:3
    });

    tl.to(words, {
        bottom: 0,
        duration: 1,
        ease: Power3.easeOut,
    })
    .add(
        'end'
    )
    .to(words[0],{
        left: `calc(50% + ${width/2 + offset}px)`,
        duration: 1,
        ease: Power3.easeInOut,
    },'end')
    .to(words[1],{
        right: `calc(50% - ${width/2 + offset}px)`,
        duration: 1,
        ease: Power3.easeInOut,
    },'end')
    .to(subline,{
        top: "50%",
        duration: 1,
        delay: 0.25,
        rotate:0,
        ease: Power3.easeInOut,
        onComplete: function(){
            gsap.to(mousedot,{
                opacity: "1",
                duration: 1
            })
            
            mouseTimeline.play()}
    });
}
};


/* Evoking Methods*/
moePage.animateSections();
moePage.AnimateTitle(20);

console.log('---------------------------------------');
console.log('Moin');
console.log('Interessiert dich wie irgendetwas hier gebaut ist? Oder bist du nur neugierig?');
console.log('Wie auch immer, wenn du fragen hast, schreib mir ne Nachricht auf Instagram oder Xing wenn es um berufliche Anfragen geht.');
console.log('Ansonsten gibts den Code zu dieser Seite auch in meinem Github repository');
console.log('---------------------------------------');