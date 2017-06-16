// @flow

const docElement = window.document.documentElement || window.document.body;
const docStyles = docElement.style;

function matchProps(props) {
  for(let i = 0, l = props.length; i < l; i++) {
    if (props[i] in docStyles) {
      return props[i];
    }
  }
  return props[0];
}

const transformProp = matchProps(['transform', 'webkitTransform']);
function setTransform(el, value) {
  el.style[transformProp] = value;
}

export {
  setTransform,
};
