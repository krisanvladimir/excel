import { $ } from "../../core/dom"

export class Excel { // экспортирует новый коснтурктор Excel 
  constructor(selector, options) { // констурктор с двумя параментрами(первый отвечает за css selector, второй массив в который его вставляют)
    this.$el = document.querySelector(selector) // элемент селектора
    this.components = options.components || [] // элемент массива
  }

  getRoot() { // функция в которую входит:
    const $root = $.create('div', 'excel') // изпользую свой фреймворк из DOM
    // const $root = document.createElement('div') //создана переменная, которая даёт елементу div
    // $root.classList.add('excel') // добавление корневого класса элемента div

    this.components = this.components.map(Component => { // создан components которые идет по перебору списка Компонента(функции)
      // const $el = document.createElement('div') // добавляет в переменную selector элемент div
      // $el.classList.add(Component.className) // добавляет созданный класс из Компонента className
      const $el = $.create('div', Component.className) // изпользую свой фреймворк из DOM

      const component = new Component($el) // в нем создана переменная которая создает новый Компонент(переменной $el)
      // DEBUG
      if (component.name) {
        window['c' + component.name] = component
      }
      $el.html(component.toHTML()) // добавляем привязанность компонента к HTML
       // $root.insertAdjacentHTML('beforeend', component.toHTML()) элемент $root, который добавляет div, добавляет его в HTML через toHTML()
      $root.append($el)
      return component
    })

    return $root // возвращает div
  }

  render() { // функция вставления
    this.$el.append(this.getRoot().$el) // вставляет в selector функцию getRoot
    this.components.forEach(component =>component.init())
  }
}
