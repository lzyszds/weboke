export const config = {
  html: true,        // Enable HTML tags in source
  xhtmlOut: false,        // Use '/' to close single tags (<br />).
  // This is only for full CommonMark compatibility.
  breaks: false,        // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-',  // CSS language prefix for fenced blocks. Can be
  // useful for external highlighters.
  linkify: false,        // Autoconvert URL-like text to links
  typographer: false,
  quotes: '“”‘’',
  highlight: function (/*str, lang*/) { return ''; }
}
export const toolex = [
  {
    name: 'fa-rotate-left',
    action: '撤销',
  }, {
    name: 'fa-rotate-right',
    action: '返回',
  }, {
    name: 'fa-eraser',
    action: '清空',
    callback: function () {
      return '#'
    }
  }, {
    isPart: true,
    name: 'fa-header',
    action: '标题',
    menu: [{
      name: 'reorder-two-outline',
      action: '一级标题',
      callback: function () {

      }
    }, {
      name: 'reorder-two-outline',
      action: '二级标题',
    }, {
      name: 'reorder-three-outline',
      action: '三级标题',
    }, {
      name: 'reorder-four-outline',
      action: '四级标题',
    },]
  }
]
