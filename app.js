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
            snap: 1 / miniElemnts.length,
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
};


/* Evoking Methods*/
moePage.animateSections();
moePage.AnimateTitle(20);