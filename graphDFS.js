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

  Graph.prototype.DFSKasaraju = function(node, options) {
      node.explored = true;
      node.leader = this.currentSourceNode.name;

      if ( options.reversed ) {
          var neighbors = node.reverseNeighbors();
      } else {
          var neighbors = node.neighborNodes();
      }

      var unexploredNeighbors = neighbors.filter(function(node) {
          return !node.explored;
      });

      unexploredNeighbors.forEach(function(node) {
          this.DFSKasaraju(node, options);
      }, this);

      if ( options.reversed ) {
          this.finishingTime += 1;
          node.finishingTime = this.finishingTime;
      }
  };

  Graph.prototype.getNodeByFinishingTime = function(t) {
  	var targetNode;
    this.nodes.forEach(function(node) {
      if ( node.finishingTime === t ) targetNode = node;
    });
    return targetNode;
  };

  Graph.prototype.resetFinishingTimes = function(){
      this.nodes.forEach(function(node) {
          node.finishingTime = null;
      });
  };

  Graph.prototype.DFSLoop = function( options ) {
    this.finishingTime = 0;
    var n = this.nodeSize();

    for (var i = n; i > 0; i--) {
        if ( options.ordered ) {
            var node = this.getNodeByFinishingTime(i)
        } else {
            var node = this.getNode(i);
        }

        if ( !node.explored ) {
          this.currentSourceNode = node;
          this.DFSKasaraju(node, { reversed: options.reversed });
        }
    }
  };

  Graph.prototype.topologicalSort = function() {
  	this.mustBeDirectional();
  	this.setUnexplored();
  	this.resetFinishingTimes();
  	this.currentLabel = this.nodeSize();

  	this.nodes.forEach(function(node){
  		if ( !node.explored ) this.DFSTopoSort(node);
  	}, this);

    return this.nodes.sort(this.currentLabelSort)
  };

  Graph.prototype.DFSTopoSort = function(startNode) {
  	startNode.explored = true;
  	startNode.neighborNodes().forEach(function(node) {
  		if ( !node.explored ) this.DFSTopoSort(node);
  	}, this);

    startNode.currentLabel = this.currentLabel;
    this.currentLabel--
  };

  Graph.prototype.Kasaraju = function() {
    this.setUnexplored();
    this.DFSLoop({ reversed: true,
                   ordered: false });
    this.DFSLoop({ reversed: false,
                   ordered: true });
    return 
  }
})();

g2 = new JSAlgorithms.Graph({ directed: true });

for (var i = 1; i < 10; i++) {
    g2.addNode(i);
}

g2.addEdge(7, 1);
g2.addEdge(4, 1);
g2.addEdge(7, 9);
g2.addEdge(9, 6);
g2.addEdge(6, 3);
g2.addEdge(3, 9);
g2.addEdge(6, 8);
g2.addEdge(8, 2);
g2.addEdge(2, 5);
g2.addEdge(5, 8);
