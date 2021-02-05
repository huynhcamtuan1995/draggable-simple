var vue = new Vue({
    el: '#app',
    data: {
    },
    computed: {
    },
    methods: {
        getListElement: function () {
            endGetInfoEvent();
        },
        addElement: function (tag) {
            var parentNode = $('.parent-frame');
            var childNodes = parentNode.children();
            var childLenght = childNodes.length;

            switch (tag) {
                case "button":
                    var node = `<a href="#"><button >text</button></a>`;
                    break;
                case "a":
                    var node = `<a href="#">text</a>`;
                    break;
                default:
                    var node = `<span>text</span>`;
                    break;
            }

            var newChild = `<div v-on:click="configElement($event)" class="draggable" id="drag-${childLenght + 1}">${node}</div>`;
            parentNode.append(newChild);
        },
        configElement: function (event) {

        },
        applyConfig: function (tag) {
        },
        setPopup: function () {
            //<div class="modal show" style="">
            //<div class="modal-content">
            //        <span class="close" ></span>
            //        <div >

            //        </div>
            //    </div>
            //</div>
        }
    }
})
interact('.draggable')
    .resizable({
        // resize from all edges and corners
        edges: { left: false, right: true, bottom: true, top: false },
        maxPerElement: 1,
        onmove: function (event) {
            var target = event.target
            var x = (parseFloat(target.getAttribute('data-x')) || 0)
            var y = (parseFloat(target.getAttribute('data-y')) || 0)

            target.style.width = event.rect.width + 'px'
            target.style.height = event.rect.height + 'px'
        },
        modifiers: [
            // keep the edges inside the parent
            interact.modifiers.restrictEdges({
                outer: 'parent'
            }),

            // minimum size
            interact.modifiers.restrictSize({
                min: { width: 35, height: 35 }
            })

        ],

        inertia: false
    })
    .draggable({
        // enable inertial throwing
        inertia: false,
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: false
            })
        ],
        // enable autoScroll
        autoScroll: false,
        onmove: dragMoveListener,
        onend: function (event) {
            var textEl = event.target.querySelector('p')

            textEl && (textEl.textContent =
                'moved a distance of ' +
                (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                    Math.pow(event.pageY - event.y0, 2) | 0))
                    .toFixed(2) + 'px')
        }

    })

function dragMoveListener(event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
    target.style.left = x + 'px';
    target.style.top = y + 'px';
    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}
function setPopup() {
    var showEl = document.querySelector('textarea.show-obj')
    var rawContent = showEl.value = JSON.stringify(popupInfo)

    var popupContent = "";

    var modal = `<div class="modal show" style="">
            <div class="modal-content">
                    <span class="close" ></span>
                    <div>
                        ${popupContent}
                    </div>
                </div>
            </div>`;
    var showEl = document.querySelector('#popup');
    showEl.appendChild(modal);

}
function endGetInfoEvent() {
    var popupInfo = {
        parentStyles: $('.parent-frame').attr("style"),
        listNodes: [],
    }
    var listObj = [];
    var parent = $('.parent-frame');
    var childs = parent.children();

    childs.each(function (i, e) {
        var dragEle = $(e);
        var childPos = dragEle.offset();
        var parentPos = dragEle.parent().offset();
        var childInfo = dragEle.children()[0];
        //get data-hover to set hoverStyle
        //get data-href to set hrefUrl
        var childInspect = {
            nodeInner: childInfo.outerHTML,
            hoverStyle: '',
            hrefUrl: '',
            top: childPos.top - parentPos.top,
            left: childPos.left - parentPos.left,
            width: dragEle[0].clientWidth,
            height: dragEle[0].clientHeight
        }
        listObj.push(childInspect);

        dragEle.text =
            `${childInspect.top}
            ${childInspect.left}
            ${childInspect.width}
            ${childInspect.height}`

    });
    var showEl = document.querySelector('textarea.show-obj')
    popupInfo.listNodes = listObj
    showEl.value = JSON.stringify(popupInfo)
}