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
      if ( !edge.directed ) {
  		  edge.nodes.forEach(function(node) {
  			if ( node !== this ) {
  				nodes.push(node);
  			}
      }, this)
      } else {
        if ( edge.nodes[1] !== this ) {
          nodes.push(edge.nodes[1]);
        }
      }
  	}, this)
  
  	return nodes;
  };

  Node.prototype.reverseNeighbors = function(){
    var reversedNeighbors = [];

    this.edges.forEach(function(edge){
      if ( edge.nodes[1] === this ) {
        reversedNeighbors.push(edge.nodes[0]);
      }
    }, this);
    
    return reversedNeighbors;
  }
})();