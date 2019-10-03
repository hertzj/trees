// Our representation of the DOM as a JS object.
const root = document.getElementById('root');

const ourTree = {
  type: 'div',
  children: [
    {
      type: 'div',
      style: {backgroundColor: 'red'},
      children: [
        {
          type: 'span',
          textContent: 'hello there'
        },
        {
          type: 'button',
          textContent: 'click me plz'
        },
        {
          type: 'div',
          style: {
            backgroundColor: 'green',
            width: '50%',
            height: '300px'
          },
          children: [
            {
              type: 'span',
              textContent: 'im a green box'
            },
            {
              type: 'div',
              style: {
                display: "flex",
                width: '100%',
                height: '100px'
              },
              children: [
                {
                  type: 'div',
                  style: {
                    backgroundColor:'blue',
                    flexGrow: '1'
                  }
                },
                {
                  type: 'div',
                  style: {
                    backgroundColor: 'purple',
                    flexGrow: '1'
                  }
                },
                {
                  type: 'div',
                  style: {
                    backgroundColor: 'yellow',
                    flexGrow: '2'
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

  // tree.children.filter(x => {
  //   // console.log(x)
  //   if (x.type === 'div') {
  //     console.log(renderer.create(x.type));
  //   }
  // })

const DOMRenderer = {
  append: (node, child) => node.appendChild(child),
  create: type => document.createElement(type),
  createText: str => document.createTextNode(str),
  remove: el => el.parentNode.removeChild(el),
};

// The function that uses the rendering API object above (DOMRenderer) to build the page as expected!
const treeMaker = (soil, tree, renderer) => {


  const element = renderer.create(tree.type)
  if (tree.hasOwnProperty('textContent')) {
    const text = tree.textContent;
    const textNode = renderer.createText(text);
    renderer.append(element, textNode);
  }
  if (tree.hasOwnProperty('style')) {
    const styling = tree.style;
    // eslint-disable-next-line guard-for-in
    for (const k in styling) {
      element.style[k] = styling[k];
    }
  }

  renderer.append(soil, element)
  
  if (tree.hasOwnProperty('children')) {
    const children = tree.children;
    children.forEach(child => {
      treeMaker(element, child, renderer);
    })
  }
  
};

// DONT TOUCH BELOW
treeMaker(root, ourTree, DOMRenderer);

window.treeMaker = treeMaker;
window.ourTree = ourTree;
window.DOMRenderer = DOMRenderer;
