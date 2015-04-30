(function() {
  if ( typeof JSAlgorithms === 'undefined' ) {
  	window.JSAlgorithms = {};
  }

  var Graph = JSAlgorithms.Graph;

  Graph.prototype.currentLabelSort = function(node1, node2) {
  	return node1.currentLabel - node2.currentLabel;
  }

  Graph.prototype.DFSBasic = function(startName, endName) {
  	this.mustBeDirectional();
  	this.setUnexplored();

    var startNode = this.getNode(startName);
    startNode.explored = true;
    var searchStack = [ startNode ];

    while ( searchStack.length > 0 ) {
    	node = searchStack.pop();
    	if ( node.name === endName) {
    		return node;
    	}
    	node.neighborNodes().forEach(function(currentNode) { 
    		if ( !currentNode.explored ) {
    			currentNode.explored = true;
    			searchStack.push(currentNode);
    		}
    	});
    }
  };

  Graph.prototype.DFSRecursive = function(startName, endName) {
  	this.mustBeDirectional();
  	this.setUnexplored();

  	var startNode = this.getNode(startName);
  	startNode.explored = true;
    if ( startNode.name === endName ) return startNode;

    var unexploredNeighbors = startNode.neighborNodes().filter(function(node) {
    	return !node.explored;
    })

    if ( unexploredNeighbors.length > 0 ) {
    	var DFSResult;
    	unexploredNeighbors.forEach(function(currentNode) {
    		var result = this.DFSRecursive(currentNode.name, endName);
    		if ( result ) DFSResult = result;
    	}, this);
    	if ( DFSResult ) return DFSResult;
    } else {
    	return null;
    }
  };

  Graph.prototype.topologicalSort = function() {
  	this.mustBeDirectional();
  	this.setUnexplored();
  	this.currentLabel = this.nodeSize();

  	// outer for-loop through all nodes
  	this.nodes.forEach(function(node){
  		// if node is unexplored
  		if ( !node.explored ) this.DFSTopoSort(node);
  	}, this);

    return this.nodes.sort(this.currentLabelSort)
  };

  Graph.prototype.DFSTopoSort = function(startNode) {
  	// mark startNode explored
  	startNode.explored = true;
  	// for every neighbor, 
  	startNode.neighborNodes().forEach(function(node) {
  		if ( !node.explored ) this.DFSTopoSort(node);
  	}, this);

    startNode.currentLabel = this.currentLabel;
    this.currentLabel--
  }
})();