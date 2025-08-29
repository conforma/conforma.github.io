function createMermaidExtension() {
  return function () {
    this.block('mermaid', function () {
      const self = this
      self.named('mermaid')
      self.onContext('literal')
      self.process(function (parent, reader) {
        const source = reader.getLines().join('\n')
        const html = `<div class="mermaid">
${source}
</div>`
        return self.createBlock(parent, 'pass', html)
      })
    })
  }
}

module.exports = createMermaidExtension()
