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
    
}