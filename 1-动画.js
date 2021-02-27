// const options = {
//     root:document.querySelector('#viewport'),
//     rootMargin:'0px',
//     threshold:1.0
// }

const scrollImations = (entries,observer) =>{
    entries.forEach(entry=>{
        console.log(111,entry.isIntersecting,entry.intersectionRatio)

        if(entry.isIntersecting&&entry.intersectionRatio>=1){
            entry.target.classList.add('box--visible')
        }else {
            entry.target.classList.remove('box--visible')
        }
    })
}

const options = {
    threshold:1.0
}

const observer = new IntersectionObserver(scrollImations,options)

const box = document.querySelectorAll('.box')

box.forEach(box=> {
    observer.observe(box)
})
