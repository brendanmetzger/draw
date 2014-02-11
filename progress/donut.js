var ProgressDonut = function(embed_container, size, css) {
  var svg, mask, mask_elem, complete, path;
  
  // these methods are exposed to the user,
  this.createElement = function(name, opt, parent) {
    var node = document.createElementNS('http://www.w3.org/2000/svg', name);
    for (var key in opt) {
      node.setAttribute(key, opt[key] instanceof SVGMaskElement ? 'url(#'+opt[key].id+')' : opt[key]);
    }
    return parent ? parent.appendChild(node) : svg.appendChild(node);
  };
  
  this.update = function(percentage) {
    var radian = (2 * Math.PI) * percentage;
    var x = (Math.cos(radian) * 50) + 55;
    var y = ((Math.sin(radian) - 1e-5) * 50) + 55;
    return path.setAttribute('d', "M55,55 l50,0 A50,50 0 " + (y < 50 ? 1 : 0) + "1 " + x + "," + y + "z");
  };

  svg = this.createElement('svg', {
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    version: 1.1,
    height: size,
    width: size,
    style: css,
    viewBox: '0 0 110 110'
  }, embed_container);

  // This is the mask for the donut shape - I've left the code terse, so please consider removing or making it your own.
  mask = this.createElement('mask', {
    'id': 'cutout'
  }, this.createElement('defs'));
  
  mask_elem = this.createElement('circle', {
    'cx': 55,
    'cy': 55,
    'r': 50,
    'style': 'fill:#000;stroke:#fff;stroke-width:50;'
  }, mask);

  complete = this.createElement('circle', {
    'cx': 55,
    'cy': 55,
    'r': 50,
    'style': 'fill:#f8f8f8',
    'mask': mask
  });

  path = this.createElement('path', {
    'd': 'M55,55',
    'transform': 'rotate(-90 55 55)',
    'mask': mask
  });

  return this;
};