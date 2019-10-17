window.dom = {
  /**
   * 创建元素
   * @param {string} string 描述element的字符串
   * @return {HTMLElement} 创建的element
   */
  create(string) {
    const container = document.createElement('template')
    container.innerHTML = string.trim()
    return container.content.firstChild
  },
  /**
   * 将元素插入第一个参数元素之后
   * @param {HTMLElement} currNode 当前元素
   * @param {HTMLElement} aftertNode 要插入的元素
   */
  after(currNode, aftertNode) {
    currNode.parentNode.insertBefore(aftertNode, currNode.nextSibling)
  },
  /**
   * 将元素插入第一个参数元素之前
   * @param {HTMLElement} currNode 当前元素
   * @param {HTMLElement} prevNode 要插入的元素
   */
  before(currNode, prevNode) {
    currNode.parentNode.insertBefore(prevNode, currNode)
  },
  /**
   * 将第二个参数追加为第一个参数的子元素
   * @param {HTMLElement} parentNode 父元素
   * @param {HTMLElement} childNode 要添加的子元素
   */
  append(parentNode, childNode) {
    parentNode.appendChild(childNode)
  },
  /**
   * 将第二个参数作为第一个参数的父级元素包裹第一个参数
   * @param {HTMLElement} node 被包裹的元素
   * @param {HTMLElement} wrapNode 包裹元素
   */
  wrap(node, wrapNode) {
    dom.before(wrapNode, node)
    dom.append(node, wrapNode)
  },

  /**
   * 删除元素并返回删除的元素
   * @param {HTMLElement} node 要删除的元素
   * @return {HTMLElement} 被删除的元素
   */
  remove(node) {
    node.parentNode.removeChild(node)
    return node
  },
  /**
   * 删除元素的所有子元素,并返回被删除的子元素
   * @param {HTMLElement} parentNode 要删除子元素的元素
   * @returns {HTMLElement[]} 所有被删除的子元素组成的数组
   */
  empty(parentNode) {
    const childNodes = []
    while (parentNode && parentNode.firstChild) {
      if (parentNode.firstChild.nodeType !== 3) {
        childNodes.push(parentNode.firstChild)
      }
      dom.remove(parentNode.firstChild)
    }
    return childNodes
  },
  /**
   * 给指定元素添加属性及值，如果不指定第三个参数，返回元素对应的属性的值
   * @param {HTMLElement} node 指定的元素
   * @param {string} attr 属性
   * @param {string} [value] 可选，指定的属性值
   */
  attr(node, attr, value) {
    if (value !== undefined) {
      node.setAttribute(attr, value)
    }
    return node.getAttribute(attr)
  },
  /**
   * 返回指定元素的文本内容或设置其文本内容为第二个参数
   * @param {HTMLElement} node 指定元素
   * @param {string} [string] 可选参数，指定参数时将元素的文本设置为参数内容
   */
  text(node, string) {
    if (string !== undefined) {
      if (node.innerText) {
        node.innerText = string
      } else {
        node.textContent = string
      }
    } else {
      if (node.innerText) return node.innerText
      return node.textContent
    }
  },
  /**
   * 返回指定元素的HTML内容，或设置指定元素的HTML内容
   * @param {HTMLElement} node 指定的元素
   * @param {string} [string] 可选，要设置的HTML内容
   */
  html(node, string) {
    if (string !== undefined) {
      node.innerHTML = string
    } else {
      return node.innerHTML
    }
  },
  /**
   * 设置指定元素的样式或返回对应的样式值
   * @param {HTMLElement} node 指定元素
   * @param {string| {styleName: string} } name 样式对象或样式名称
   * @param {string} [value] 指定样式的值
   * @returns {string} 当只传入前两个参数且第二个为字符串时，返回对应的样式的值
   */
  style(node, name, value) {
    if (value !== undefined) {
      node.style[name] = value
    } else {
      if (typeof name === 'string') {
        return node.style[name]
      }
      if (name instanceof Object) {
        const obj = name
        Object.keys(obj).forEach((key) => {
          node.style[key] = obj[key]
        })
      }
    }
  },
  /**
   * 样式操作
   */
  class: {
    /**
     * 给指定元素添加class
     * @param {HTMLElement} node 指定元素
     * @param {string} className 要添加的class名称
     */
    add(node, className) {
      node.classList.add(className)
    },
    /**
     * 删除指定元素的class
     * @param {HTMLElement} node 指定元素
     * @param {string} className 要删除的class名称
     */
    remove(node, className) {
      node.classList.remove(className)
    },
  },
  /**
   * 给指定元素添加监听事件
   * @param {HTMLElement} node 指定元素
   * @param {string} eventName 监听事件名称
   * @param {() => void} eventHandler 回调函数
   */
  on(node, eventName, eventHandler) {
    node.addEventListener(eventName, eventHandler)
  },
  /**
   * 给指定元素移除监听事件
   * @param {HTMLElement} node 指定元素
   * @param {string} eventName 监听事件名称
   * @param {() => void} eventHandler 回调函数
   */
  off(node, eventName, eventHandler) {
    node.removeEventListener(eventName, eventHandler)
  },

  /**
   * 选择出符合条件的元素，并返回有其组成的数组
   * @param {string} selector css选择器
   * @param {HTMLElement} [scope] 可选参数，要查找元素的所属元素
   * @returns {HTMLElement[]} 符合条件的元素组成的数组
   */
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector)
  },
  /**
   * 获取父节点
   * @param {Node} node 指定节点
   * @returns {Node} 指定节点的父节点
   */
  parent(node) {
    return node.parentNode
  },
  /**
   * 获取指定节点的子节点
   * @param {Node} node 指定节点
   * @return {NodeList} 子节点伪数组
   */
  children(node) {
    return node.childNodes
  },
  /**
   * 获取兄弟元素
   * @param {Node} node 指定节点
   * @returns {Node[]} 兄弟元素数组
   */
  siblings(node) {
    return Array.prototype.filter.call(
      node.parentNode.children,
      (sibling) => sibling !== node,
    )
  },
  /**
   * 获取下一个元素
   * @param {Node} node 指定节点
   * @returns {HTMLElement} 节点的下一个元素
   */
  next(node) {
    let nextNode = node.nextSibling
    while (nextNode && nextNode.nodeType === 3) {
      nextNode = nextNode.nextSibling
    }
    return nextNode
  },
  /**
   * 获取指定节点的前一个元素
   * @param {Node} node 指定节点
   * @returns {HTMLElement} 指定节点的前一个元素
   */
  previous(node) {
    let prevNode = node.previousSibling
    while (prevNode && prevNode.nodeType === 3) {
      prevNode = prevNode.previousSibling
    }
    return prevNode
  },
  /**
   * 遍历所有节点
   * @param {NodeList} nodeList 节点伪数组
   * @param {() => void} fn 回调函数
   */
  each(nodeList, fn) {
    Array.prototype.forEach.call(nodeList, fn)
  },
  /**
   * 获取节点所在伪数组的下标
   * @param {Node} node 指定节点
   * @returns {number} 所在伪数组下标
   */
  index(node) {
    let index = 0
    const nodeList = node.parentNode.children
    while (index < nodeList.length) {
      if (node === nodeList[index]) {
        return index
      }
      index++
    }
    return undefined
  },
}
