class Dom { // создаем собственный класс констурктор для взаимодействия с DOM деревом
    constructor(selector) {
        this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }
    clear() {
        this.html('')
        return this
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)
    }

    // Element
append(node) {
    if (node instanceof Dom) {
        node = node.$el
    }
    if (Element.prototype.append) {
        this.$el.append(node)
    } else {
        this.$el.appendChild(node)
    }
    return this
    }
}




// event.target
export function $(selector) { // экспортирую от сюда функцию $
    return new Dom(selector) // возвращаю новый контруктор Dom
}

$.create = (tagname, classes = '') => { // создаю функию create для $ со значениями название тэга и класса по умонлчанию пустым
    const el = document.createElement(tagname) // новая переменная создающая новый элемент названия тэга
    if (classes) { // если в $ есть класс
        el.classList.add(classes) // переменная el добавляет класс с с классом 
    }
    return $(el) // возвращаю el
}