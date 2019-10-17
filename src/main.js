const divTest = dom.find('#test')[0]

console.log(dom)

const newDiv = dom.create('<div>第一个div</div>')

console.log(newDiv)

const tr = dom.create('<tr><td>td1</td></tr>')

console.log(tr)

const divAfter = dom.create('<div>后一个div</div>')

dom.after(divTest, divAfter)

const divBefore = dom.create('<div>前一个div</div>')

dom.before(divTest, divBefore)

const divChild = dom.create('<div>子div</div>')

dom.append(divTest, divChild)

const divWrap = dom.create('<div>包裹div</div>')

dom.wrap(divWrap, divChild)

const firstDiv = dom.find('.test1')[0]

dom.remove(firstDiv)

console.log(dom.empty(divTest))

console.log(dom.attr(divTest, 'title', '我是标题'))

console.log(dom.attr(divTest, 'title'))

console.log(dom.text(divTest, '我是text'))

console.log(
  dom.html(
    divTest,
    `<div class="test1">
    子元素1
    </div>
    <div class="test2">
    子元素2
    </div>
    <div class="test3">子元素3</div>`,
  ),
)

dom.style(divTest, { color: 'red', border: '1px solid green' })
dom.style(divTest, 'background', '#333')

console.log(dom.style(divTest, 'background'))

dom.class.add(divTest, 'blue')

dom.class.remove(divTest, 'blue')

const clickHandler = (() => {
  let count = 0
  return () => {
    console.log(`点击了${++count}次`)
  }
})()

dom.on(divTest, 'click', clickHandler)

dom.off(divTest, 'click', clickHandler)

console.log(dom.parent(dom.find('.test1')[0]))

console.log(dom.children(divTest))

console.log(dom.siblings(dom.find('.test1')[0]))

console.log(dom.next(dom.find('.test1')[0]))
console.log(dom.previous(dom.find('.test2')[0]))

const childs = dom.children(divTest)
console.log(childs)
console.log(
  dom.each(childs, (node) => {
    if (node.nodeType !== 3) {
      dom.style(node, 'color', '#ff0')
    }
  }),
)

console.log(dom.index(dom.find('.test3')[0]))

dom.each(childs, (n) => {
  console.log(n)
})
