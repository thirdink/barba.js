/**
 * Dom object
 * @namespace Barba.Pjax.Dom
 * @type {Object}
 */
var Dom = {
  /**
   * Parse the responseText obtained from the xhr call
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {String} responseText
   * @return {HTMLElement}
   */
  parseResponse: function(responseText) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = responseText;

    var titleEl = wrapper.querySelector('title');

    if (titleEl)
      document.title = titleEl.textContent;

    return this.getContainer(wrapper);
  },

  /**
   * get the container on the current DOM,
   * or from an HTMLElement passed via argument
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {HTMLElement} [element]
   * @return {HTMLElement}
   */
  getContainer: function(element) {
    if (!element)
      element = document.body;

    if (!element)
      throw new Error('Barba.js: DOM not ready!');

    var container = this.parseContainer(element);

    if (container && container.jquery)
      container = container[0];

    if (!container)
      throw new Error('Barba.js: no container found');

    return container;
  },

  /**
   * The name of the data attribute on the container
   *
   * @memberOf Barba.Pjax.Dom
   * @static
   * @type {String}
   */
  dataNamespace: 'namespace',

  /**
   * Id of the main wrapper
   *
   * @memberOf Barba.Pjax.Dom
   * @static
   * @type {String}
   */
  wrapperId: 'barba-wrapper',

  /**
   * Class name used to identify the containers
   *
   * @memberOf Barba.Pjax.Dom
   * @static
   * @type {String}
   */
  containerClass: 'barba-container',

  /**
   * Get the namespace of the container
   * @memberOf Barba.Pjax.Dom
   * @param  {HTMLElement}
   * @return {String}
   */
  getNamespace: function(element) {
    if (element && element.dataset) {
      return element.dataset[this.dataNamespace];
    } else if (element) {
      return element.getAttribute('data-' + this.dataNamespace);
    }

    return null;
  },

  /**
   * Put the container on the page
   * @memberOf Barba.Pjax.Dom
   * @param  {HTMLElement} element
   */
  putContainer: function(element) {
    element.style.visibility = 'hidden';
    document.getElementById(this.wrapperId).appendChild(element);
  },

  /**
   * Get container selector
   * @memberOf Barba.Pjax.Dom
   * @param  {HTMLElement} element
   * @return {HTMLElement} element
   */
  parseContainer: function(element) {
    return element.querySelector('.' + this.containerClass);
  }
};

module.exports = Dom;
