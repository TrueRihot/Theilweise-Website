gsap.registerPlugin(ScrollTrigger);

let sections = gsap.utils.toArray('section');

sections.forEach(element => {

let miniElemnts = element.querySelectorAll('.sub-content');
let timeline = gsap.timeline();
let elementheight = 0;

miniElemnts.forEach(mini => {
    console.log(mini.offsetHeight)
    elementheight +=  mini.offsetHeight;

    timeline.to(
        mini,
        {
            top:0,
            duration: 2
        }
    )
});


    ScrollTrigger.create({
        trigger: element,
        animation: timeline,
        start: 'top top',
        end: '+=' + elementheight ,
        pin: element,
        scrub: 1,
        markers:true
    });
});

