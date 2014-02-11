var ProgressDonut = function(embed_container, size, css) {
  var svg, complete, path;
  
  // these methods are exposed to the user,
  this.createElement = function(name, opt, parent) {
    var node = document.createElementNS('http://www.w3.org/2000/svg', name);
    for (var key in opt) {
      node.setAttribute(key, opt[key]);
    }
    return parent ? parent.appendChild(node) : svg.appendChild(node);
  };
  
  this.update = function(percentage) {
    var radian = (2 * Math.PI) * percentage;
    var x = (Math.cos(radian) * 25) + 50;
    var y = ((Math.sin(radian) - 1e-5) * 25) + 50;
    return path.setAttribute('d', "M75,50A25,25 0 " + (y < 50 ? 1 : 0) + "1 " + x + "," + y);
  };

  svg = this.createElement('svg', {
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    version: 1.1,
    height: size,
    width: size,
    style: css,
    viewBox: '0 0 110 110'
  }, embed_container);

  complete = this.createElement('circle', {
    'cx': 50,
    'cy': 50,
    'r': 25,
    'style': 'stroke:#f8f8f8;stroke-width:10;fill:none'
  });

  path = this.createElement('path', {
    'd': 'M50,50',
    'transform': 'rotate(-90 50 50)',
    'style': 'stroke:green;stroke-width:20;fill:none'
  });

  return this;
};