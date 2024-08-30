/**
 * Adiciona a funcionalidade de copiar o conteúdo (texto) para a memória (clipboard)
 * Importante: requer o estilo _v-clipboard.css
 */
export default {
  // called before bound element's attributes
  // or event listeners are applied
  created(el, binding, vnode) {
    // see below for details on arguments
  },
  // called right before the element is inserted into the DOM.
  beforeMount(el, binding, vnode) {},
  // called when the bound element's parent component
  // and all its children are mounted.
  mounted(el, binding, vnode) {
    el.classList.add('v-clipboard')
    el.setAttribute("title", "Clique para copiar")
    el.addEventListener('click', () => { navigator.clipboard.writeText(el?.innerText) })
  },
  // called before the parent component is updated
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // called after the parent component and
  // all of its children have updated
  updated(el, binding, vnode, prevVnode) {},
  // called before the parent component is unmounted
  beforeUnmount(el, binding, vnode) {},
  // called when the parent component is unmounted
  unmounted(el, binding, vnode) {}
}