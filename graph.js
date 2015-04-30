// Adjecency List structure for storing graph
(function() {
  if ( typeof JSAlgorithms === 'undefined' ) {
  	window.JSAlgorithms = {};
  }

  var Graph = JSAlgorithms.Graph = function() {
  	this.nodes = [];
  	this.edges = [];
  	this.nodeSize = this.nodes.length;
  	this.edgeSize = this.edges.length;
  };

  var Edge = JSAlgorithms.Edge = function(node1, node2) {
  	this.nodes = [ node1, node2 ];
  };
  
  Graph.prototype.addNode =  function(nodeName) {
  	var node = new Node(nodeName);
  	this.nodes.push(node)
  
  	return node
  };
  
  Graph.prototype.getNode = function(nodeName) {
  	var nodeOut
  	this.nodes.forEach(function(node) {
  		if ( node.name === nodeName ) {
  			nodeOut = node;
  		}
  	})
  	return nodeOut;
  }
  
  Graph.prototype.addEdge = function(nodeName1, nodeName2) {
  	var node1 = this.getNode(nodeName1);
  	var node2 = this.getNode(nodeName2);
  	var edge = new Edge(node1, node2);
  	this.edges.push(edge);
  	node1.edges.push(edge);
  	node2.edges.push(edge);
  
  	return edge;
  };
  
  Graph.prototype.getEdge = function(nodeName1, nodeName2) {
  	var edgeOut
  	var node1 = this.getNode(nodeName1);
  	var node2 = this.getNode(nodeName2);
  	node1.edges.forEach(function(node1Edge) {
  		if ( (node1Edge.nodes[0] === node2) ||
  			 ( node1Edge.nodes[1] === node2 )) {
  			edgeOut = node1Edge;
  		}
  	});
  
  	return edgeOut;
  }
  
  Graph.prototype.BFS = function(startNodeName, targetNodeName) {
  	var startNode = this.getNode(startNodeName);
  	startNode.explored = true;
  	var queue = [ startNode ];
  	while ( queue.length > 0 ) {
  		var node = queue.shift();
  		if ( node.name === targetNodeName ) {
  			return node;
  		} else {
  			node.neighborNodes().forEach(function(neighborNode) {
  				if ( !neighborNode.explored ) {
  					neighborNode.explored = true;
  					queue.push(neighborNode);
  				}
  			})
  		}
  
  	}
  }
  
  Graph.prototype.setUnexplored = function() {
  	this.nodes.forEach(function(node) {
  		node.explored = false;
  	})
  }
  
  Graph.prototype.shortestPath = function(startName, targetName) {
  	this.setUnexplored();
  	var startNode = this.getNode(startName);
  	startNode.dist = 0;
  	startNode.explored = true;
  	var queue = [ startNode ];
  
  	while ( queue.length > 0 ) {
  		var node = queue.shift();
  		if ( node.name === targetName ) {
  			return node.dist;
  		} else {
  			node.neighborNodes().forEach(function(neighborNode) {
  				if ( !neighborNode.explored ) {
  					neighborNode.dist = node.dist + 1; // += 1 to dist of last node
  					neighborNode.explored = true;
  					queue.push(neighborNode);
  				}
  			});
  		}
  	}
  }
  
  Graph.prototype.connectedComponents = function(nodeName) {
  	this.setUnexplored();
  	this.BFS(nodeName, "DummyName");
  	var connected = this.nodes.filter(function(node) {
  		return node.explored;
  	});
  	return connected;
  }
})();

g = new JSAlgorithms.Graph();
g.addNode("S");
g.addNode("A");
g.addNode("B");
g.addNode("C");
g.addNode("D");
g.addNode("E");

g.addNode("F");
g.addNode("G");

g.addEdge("S", "B");
g.addEdge("S", "A");
g.addEdge("A", "C");
g.addEdge("A", "B");
g.addEdge("B", "C");
g.addEdge("B", "D");
g.addEdge("C", "D");
g.addEdge("C", "E");
g.addEdge("D", "E");
g.addEdge("F", "G");








