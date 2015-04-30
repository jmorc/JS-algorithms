(function() {
  if ( typeof JSAlgorithms === 'undefined' ) {
  	window.JSAlgorithms = {};
  }

  var Graph = JSAlgorithms.Graph;

  Graph.prototype.DFS_basic = function(startName, endName) {
  	// this is for directed graphs
  	this.mustBeDirectional();

    // fetch the starting node, place in stack
    var startNode = this.getNode(startName);
    startNode.explored = true;
    var searchStack = [ startNode ];

    while ( searchStack.length > 0 ) {
    	node = searchStack.pop();
    	if ( node.name === endName) {
    		return node;
    	}
    	node.neighborNodes().forEach(function(currentNode) { 
    	// need to re-write neighbor Nodes for directed graph
    		if ( !currentNode.explored ) {
    			currentNode.explored = true;
    			searchStack.push(currentNode);
    		}
    	});
    }
  }
})();