let smartNav = function(elements,options) {
    let defaults = {
        nav:null
    }

    let params = {...defaults,...options}

    if(typeof elements ==='string'){
        elements = document.querySelectorAll(elements)
    }

    if(!elements.forEach){
        return
    }

    // 导航栏创建
    if(!params.nav){
        params.nav = document.createElement('div')
        params.nav.className = 'title-nav-ul'
        document.body.appendChild(params.nav)
    }

    let lastScrollTop = document.scrollingElement.scrollTop
    
    let  zxxObserver = new IntersectionObserver(entries=>{
        if(params.isAvoid) {
            return
        }

        entries.reverse().forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.active()
            }else if(entry.target.isActived) {
                entry.target.unactive()
            }
        })

        lastScrollTop = document.scrollingElement.scrollTop
    })

    elements.forEach((element,index)=>{
        let id = element.id || ('smartNav' + Math.random()).replace('0.','')
        element.id = id

        // 导航元素创建
        let eleNav = document.createElement('a')
        eleNav.href='#'+ id
        eleNav.className = 'title-nav-li'
        eleNav.innerHTML = element.textConent
        params.nav.appendChild(eleNav)

        element.active = function(){
            eleNav.parentElement.querySelectorAll('.active').forEach(eleActive=>{
                eleNav.isActived = false
                eleActive.classList.remove('active')
            })
            eleNav.classList.add('active')
            element.isActived = true
        }

        eleNav.unactive = function(){
            if(document.scrollingElement.scrollTop>lastScrollTop){
                elements[index+1]&&elements[index+1].active()
            }else{
                elements[index-1]&&elements[index-1].active()
            }

            element.isActived = false
        }

        zxxObserver.observe(ele)
    })

    params.nav.addEventListener('click',event=>{
        let eleLink = event.target.closest('a')

        let eleTarget = eleLink &&document.querySelector(eleLink.getAttribute('href'))
        if(eleTarget){
            event.preventDefault()
            
            // Safari不支持平滑滚动
            eleTarget.scrollIntoView({
                behavior: "smooth",
                block: 'center'
            })

            if (CSS.supports('scroll-behavior: smooth')) {
                params.isAvoid = true;
                setTimeout(function () {
                    eleTarget.active();
                    params.isAvoid = false;
                }, Math.abs(eleTarget.getBoundingClientRect().top  - window.innerHeight / 2) / 2);
            } else {
                eleTarget.active();
            }            
        }
    })    
}