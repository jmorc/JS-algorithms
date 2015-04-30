(function() {
  if ( typeof JSAlgorithms === 'undefined' ) {
  	window.JSAlgorithms = {};
  }

  var Node = JSAlgorithms.Node = function(name) {
  	this.name = name;
  	this.edges = [];
  	this.explored = false;
  };

  Node.prototype.neighborNodes = function() {
  	var nodes = [];
  	this.edges.forEach(function(edge) {
  		edge.nodes.forEach(function(node) {
  			if ( node !== this ) {
  				nodes.push(node)
  			}
  		}, this)
  	}, this)
  
  	return nodes;
  };