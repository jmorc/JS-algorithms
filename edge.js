(function(){
  if ( typeof window.JSAlgorithms === 'undefined') {
    window.JSAlgorithms = {};
  };

  var Edge = JSAlgorithms.Edge = function(node1, node2) {
  	this.nodes = [ node1, node2 ];
  	this.directed = false;
  };

  var directedEdge = JSAlgorithms.directedEdge = function(node1, node2) {
  	this.nodes = [ node1, node2 ];
  	this.directed = true;
  };
})();