class GeneratorAPI {
  /**
   * @param {string} id - Id of the owner plugin
   * @param {Generator} generator - The invoking Generator instance
   * @param {object} options - generator options passed to this plugin
   */
  constructor(id, generator, options) {
    this.id = id
    this.generator = generator
    this.options = options
  }

  render(src, options) {
    console.log(src, options)
  }
}

module.exports = GeneratorAPI
