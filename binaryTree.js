(function() {
    if ( typeof window.JSAlgorithms === 'undefined' ) {
        window.JSAlgorithms = {};
    };

    var bTree = JSAlgorithms.bTree = function() {
        this.rootNode = null;
    };

// for a binary tree, functions include:
//    search for node with key k
//    insert node with key k
//    find the min and max nodes
//    identify the predecessor of node with key k
//    identify the successor of node with key k
//    delete node with key k
//    rank
//    select
//    print out all keys in sorted order
//    assume no duplicate keys for now

    bTree.prototype.insert = function(key) {
        var newNode = new JSAlgorithms.bNode(key);
        if ( !this.rootNode ) {
            this.rootNode = newNode;
        }

        var parentNode = this.findParent(this.rootNode, key)
        newNode.parent = parentNode


        if ( key > parentNode.key ) {
            parentNode.rightChild = newNode;
        }

        if ( key < parentNode.key ) {
            parentNode.leftChild = newNode;
        }
    }

    bTree.prototype.findParent = function(start_node, key_value) {
        if ( key_value > start_node.key ) {
            if ( !start_node.rightChild ) return start_node;
            return this.findParent(start_node.rightChild, key_value)
        } else {
            if ( !start_node.leftChild ) return start_node;
            return this.findParent(start_node.leftChild, key_value)
        }
    }
})();

b = new JSAlgorithms.bTree()
b.insert(3)
b.insert(1)
b.insert(5)
b.insert(2)
b.insert(4)
