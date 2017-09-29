---
title: "MithrilJS căn bản: Phần 1"
slug: mithril-can-ban-phan-1
date: 2015-10-22
layout: post.html
language: vi
---
## Linh tinh một chút
Mình không phải là dân viết JS chuyên nghiệp nên gần như không có dùng framework nào hết. Vài năm trước có nghía sơ qua Backbone, cũng có thử dùng chung với RequireJS này nọ. Cảm nhận thì Backbone đơn giản, dễ học, vào thẳng vấn đề, nhưng cũng vì đơn giản quá nên rất khó để viết cho đúng. Sau này có [MarionetteJS](http://marionettejs.com/) là framework dựa trên nền Backbone cải tiến lên. Mình chỉ nghe tiếng chứ công việc cũng không yêu cầu nên cũng không tìm hiểu nhiều. Rồi Ember, Knockout, Angular, etc. nổi lên. Rằng hay thì thật là hay, mà tính mình không thích cái gì ai cũng xài nên vẫn jQuery (có gì đó không đúng).

Sau này do công việc, viết jQuery mải miết cũng cảm thấy đời đen tối. Code trở nên rối nùi, khó bảo trì, và phát triển tính năng mới quá nản. Mình quyết định tìm một framework/library dung lượng nhỏ, có thể gắn vào một phần nào đó của trang HTML (HTML là do back-end trả về). Đặc biệt hỗ trợ virtual DOM thì tốt (nghĩ chắc là nhanh, haha).

## Mithril?
JavaScript framework mình đang làm thuốc, sử dụng gần như hàng ngày. Dung lượng nhỏ gọn (7KB gzip), dễ học, hỗ trợ chia code thành components, virtual DOM, và hoàn toàn JS. Chắc do mình rảnh nên cảm thấy viết cái gì đó nửa nạc nửa mỡ không vui : ) Một điểm đặc biệt nữa là Mithril khuyến khích áp dụng phong cách functional programming (FP - lập trình hàm) nên code viết bằng Mithril khá *dễ hiểu*.

Bạn có thể download Mithril ở trang chủ [http://mithril.js.org/](http://mithril.js.org/), sử dụng [npm](https://www.npmjs.com/package/mithril) hay [CDNJS](https://cdnjs.com/libraries/mithril) cũng được.

>[Mithril](https://en.wikipedia.org/wiki/Mithril) là tên một kim loại quý thường xuất hiện trong game RPG. Từ này do tác giả J. R. R. Tolkien nghĩ ra và nó xuất hiện lần đầu tiên trong tác phẩm Chúa tể những chiếc nhẫn : D

Thay vì làm [TodoMVC](https://github.com/tastejs/todomvc/tree/gh-pages/examples/mithril), trong bài hướng dẫn này, mình sẽ giới thiệu và làm một trang bán hàng bằng Mithril (thích hen, sinh viên IT nào ở VN mà chưa từng làm trang bán hàng?). Nhưng để cho đúng tinh thần + đang chơi lại Final Fantasy IX nên shop này sẽ bán [items](http://finalfantasy.wikia.com/wiki/Black_Mage_Village#No._163.27s_Medicine_Shop) ở Black Mage Village thôi nghen.

## Khái niệm
Về căn bản, một ứng dụng viết bằng Mithril sẽ được gắn vào element trong DOM tree bằng hàm `m.mount(el, app)`. `app` ở đây có thể là một hoặc nhiều component lồng vào nhau. Với Mithril, component chỉ đơn giản là một plain-old JavaScript object (POJO) có hai thuộc tính `controller` và `view`.

```javascript
var HelloWorld = {
  controller: function () {
    this.getText = function () {
      return 'Hello World'
    }
  },
  view: function (ctrl) {
    return m('h1', ctrl.getText())
  }
}

m.mount(document.body, m.component(HelloWorld))
```
Khi component được mount vào `body`, một biến `var ctrl = new component.controller()` sẽ được khởi tạo và pass vào `component.view()`. `m()` chính là hàm để khởi tạo virtual element để Mithril có thể render vào `body`, có signature như sau:

### m(selector, attributes, children)

* `selector`: string thể hiện đối tượng DOM, viết theo syntax của CSS, ví dụ như `a.btn.btn-primary[href=#][title="Click me"]`. Nếu bạn không khai báo tên tag thì mặc định là `DIV`.
* `attributes`: *(không bắt buộc)* object khai báo các thuộc tính của HTML tag và giá trị tương ứng. Thường dùng để thiết lập các thuộc tính động và gắn event handlers.
* `children`: *(không bắt buộc)* khai báo các children nodes của đối tượng DOM này. Giá trị có thể là:
  * string: `'Click me'`
  * array: `[m('i.fa.fa-close'), m('span', 'Click me')]`
  * component: `m.component(MySubcomponent)`

Bạn có thể chạy thử đoạn code trên [ở đây](http://jsfiddle.net/kcjpop/rzk90oy0/1/). Đơn giản vậy thôi, căn bản Mithril là vậy đó :)

## Code thôi
Để bắt đầu làm thì mình làm sơ qua giao diện.

```javascript
var App = {}
App.view = function (ctrl) {
  return m('.wrapper', [
    m('table.pure-table', [
      m('thead', [
        m('tr', [
          m('td', 'Item'),
          m('td', 'Cost'),
          m('td')
        ])
      ]),
      m('tbody', [
        m('tr', [
          m('td', 'Potion'),
          m('td', '50'),
          m('td', [m('button.pure-button', 'Buy')])
        ]),
        m('tr', [
          m('td', 'Hi-Potion'),
          m('td', '200'),
          m('td', [m('button.pure-button', 'Buy')])
        ]),
        m('tr', [
          m('td', 'Phoenix Down'),
          m('td', '150'),
          m('td', [m('button.pure-button', 'Buy')])
        ])
      ])
    ]),
    m('p', [m('a.pure-button[href=#]', 'View Cart')])
  ])
}

m.mount(document.body, m.component(App))
```
[Full code](http://jsfiddle.net/kcjpop/9t176qkd/1/)

Hoàn toàn không có gì đặc biệt, chỉ là tạo HTML bằng virtual DOM của Mithril. Một lưu ý là bạn cũng có thể không cần khai báo `controller` trong component object, vì Mithril sẽ tạo một controller mặc định (do nothing) cho bạn. Nếu bạn đã có sẵn template HTML, có thể sử dụng [template converter](http://mithril.js.org/tools/template-converter.html) để chuyển thành Mithril virtual DOM. Hoặc nếu thích có thể dùng [MSX](https://github.com/insin/msx) để viết "nửa nạc nửa mỡ" cho giống React :)

OK, bây giờ mình có một array các item, và muốn render nó lên view. Để làm điều này, mình sẽ pass một biến `args` kiểu object vào hàm `m.component()`. Biến này sẽ là đối số thứ 2 của hàm `view()`.
```javascript
var args = {
  items: [
    {name: 'Potion', price: 50},
    {name: 'Hi-Potion', price: 200},
    {name: 'Phoenix Down', price: 150},
    {name: 'Echo Screen', price: 50},
    {name: 'Soft', price: 100},
    {name: 'Antidote', price: 50},
    {name: 'Eye Drops', price: 50},
    {name: 'Remedy', price: 300},
    {name: 'Annoyntment', price: 150},
    {name: 'Tent', price: 800}
  ]
}
m.component(App, args)

App.view = function (ctrl, args) {
  return m('.wrapper', [
    //...
    
      // Dùng hàm map() để loop qua array các items
      // và tạo ra một array mới chứa các virtual DOM
      m('tbody', args.items.map(function (item) {
        return m('tr', [
          m('td', item.name),
          m('td', item.price),
          m('td', [m('button.pure-button', 'Buy')])
        ])
      }))
    ])
    
    //...
  ])
}
```
[Full code](http://jsfiddle.net/kcjpop/9t176qkd/2/)


Sweet! Tiếp theo mình muốn khi click vào nút `Buy` sẽ có prompt hiện ra để nhập số lượng. Bây giờ là lúc đụng tới controller đây. Mình sẽ viết một hàm `addToCart()` trong controller để xử lý sự kiện click.
```javascript
// args là biến được pass vào m.component()
App.controller = function (args) {
  // Chứa các item trong cart
  this.cart = []
  
  /**
   * Hàm xử lý khi click vào nút Buy
   *
   * @param {object} item
   * @param {EventObject} e
   */
  this.addToCart = function (item, e) {
    e.preventDefault()
    var quantity = parseInt(window.prompt('Enter quantity'), 10)
    if (isNaN(quantity) || quantity <= 0) {
      alert('Bigger than zero please')
      return
    }

    this.cart.push({
      quantity: quantity,
      item: item
    })
  }
}
```
Để gắn event handler này vào view, mình sửa lại hàm `map` như sau
```javascript
m('tbody', args.items.map(function (item) {
  return m('tr', [
    m('td', item.name),
    m('td', item.price),
    m('td', [
      m('button.pure-button', {
        onclick: ctrl.addToCart.bind(ctrl, item)
      }, 'Buy')
    ])
  ])
}))
```
[Full code](http://jsfiddle.net/kcjpop/9t176qkd/3/)

Bạn có thể xem thêm [ở đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) nếu không hiểu hàm `bind()`.

Tiếp theo, hãy hiển thị các item trong cart. Lần này mình sẽ lấy data từ controller, chính xác là `ctrl.cart` để hiển thị lên view.

```javascript
m('h3', 'Cart'),
m('table.pure-table', [
  m('thead', [
    m('tr', [
      m('td', 'Item'),
      m('td', 'Price * Quantity'),
      m('td', 'Sum')
    ])
  ]),
  // Loop qua các items trong cart
  m('tbody', ctrl.cart.map(function (obj) {
    return m('tr', [
      m('td', obj.item.name),
      // Dùng m.trurst() để hiển thị HTML entity
      m('td', m.trust(obj.item.price + ' &times; ' + obj.quantity)),
      m('td', obj.item.price * obj.quantity)
    ])
  }))
```
[Full code](http://jsfiddle.net/kcjpop/9t176qkd/4/)


Thử xem, bạn có thể click nút Buy và nhập số lượng. Nội dung trong cart sẽ thay đổi và tự động update lên view :) Một chút lưu ý là về mặc định, `m()` sẽ tự động escape HTML entities, cũng như phòng ngừa các thể loại invalid markup hay tìm cách chèn *mã độc* vào chương trình. Do đó chúng ta sẽ dùng `m.trust()` nếu chắc chắn rằng nội dung hiển thị là an toàn (chết thì chịu).

Trong phần hiển thị cart, mình muốn có thêm một dòng *Total* để xem tổng giá trị của cart. Mình sẽ viết thêm một hàm nữa trong controller để làm chuyện này.
```javascript
// controller
  this.getCartTotal = function () {
    if (this.cart.length === 0) {return 0}
  
    return this.cart.reduce(function (acc, obj) {
      return acc + obj.quantity * obj.item.price
    }, 0)
  }
// view
  m('tfooter', m('tr', [
    m('td[colspan=2]', m('strong', 'Total')),
    m('td', ctrl.getCartTotal())
  ]))
```
[Full code](http://jsfiddle.net/kcjpop/9t176qkd/5/)

Chỉ muốn khoe chút về hàm `reduce()` rất phổ biến trong lập trình hàm thôi :p

Đến đây thì có thể coi như xong căn bản về Mithril rồi. Dĩ nhiên là cart này còn nhiều điểm cần cải tiến, ví dụ như xóa item ra khỏi cart, tự động update số lượng của item nếu đã có sẵn trong cart, etc. nhưng mình sẽ để cho phần sau.

## Tạm kết
Hi vọng qua bài hướng dẫn này bạn sẽ thấy một lựa chọn khác, nhỏ gọn, code dễ thương, khuyến khích FP và hiệu suất tốt. 

Nếu có thắc mắc bạn có thể tham gia hỏi đáp trên [Gitter của Mithril](https://gitter.im/lhorie/mithril.js) (khuyến khích vì ở đây có rất nhiều người giỏi) hoặc tìm mình trên Twitter.
