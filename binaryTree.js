(function() {
    if ( typeof window.JSAlgorithms === 'undefined' ) {
        window.JSAlgorithms = {};
    };

    var bTree = JSAlgorithms.bTree = function() {
        this.rootNode = null;
    };

// for a binary tree, functions include:
//    assume no duplicate keys for now
//
//    
//    delete node with key k
//    rank
//    select
//    

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

    bTree.prototype.deleteNode = function(key) {
        var targetNode = this.search(key);
        // first case: if k has no children, just delete it
        if ( !targetNode.leftChild && !targetNode.rightChild ) {
        // set pointer from parent to null and delete node
            targetNode.remove();
            return;
        }

        if ( targetNode.key > targetNode.parent.key ) {
            targetNode.isRightChild = true;
        } else {
            targetNode.isRightChild = false;
        }

        // second case: k has only one child
        // k has only a rightChild
        if ( !targetNode.leftChild && targetNode.rightChild ) {
            // set k's child to point to parent
            targetNode.rightChild.parent = targetNode.parent;
            // set k's parent to point to rightChild
            if ( targetNode.isRightChild ) {
                targetNode.parent.rightChild = targetNode.rightChild;
            } else {
                targetNode.parent.leftChild = targetNode.rightChild;
            }

            delete targetNode;
            return;
        }

        if ( !targetNode.rightChild && targetNode.leftChild ) {
            targetNode.leftChild.parent = targetNode.parent;

            if ( targetNode.isRightChild ) {
                targetNode.parent.rightChild = targetNode.leftChild;
            } else {
                targetNode.parent.leftChild = targetNode.leftChild;
            }

            delete targetNode;
            return;
        }

        // third case: k has two parents
        // find the predecessor
        var predecessorNode = this.predecessor(key);
        this.swap(predecessorNode, targetNode);

        if ( !targetNode.leftChild ) {
            delete targetNode;
            return;
        } else {
            targetNode.leftChild.parent = targetNode.parent;
            delete targetNode;
            return;
        }
    }

    bTree.prototype.swap = function(node1, node2) {
        if ( node1.parent === node2 ) {
            this.swapParentNode(node1, node2);
            return;
        }

        if ( node2.parent === node1 ) {
            this.swapParentNode(node2, node1)
            return;
        }

        // re-wire node1 parent
        if ( node1.isRightChild() ) {
            node1.parent.rightChild = node2;
        } else {
            node1.parent.leftChild = node2;
        }

        // re-wire node2 parent
        if ( node2.isRightChild() ) {
            node2.parent.rightChild = node1;
        } else {
            node2.parent.leftChild = node1;
        }

        var node1Parent = node1.parent;
        var node1LeftChild = node1.leftChild;
        var node1RightChild = node1.rightChild;

        node1.parent = node2.parent;
        node1.leftChild = node2.leftChild;
        node1.rightChild = node2.rightChild;

        node2.rightChild = node1RightChild;
        node2.leftChild = node1LeftChild;
        node2.parent = node1Parent;

        node1.fixChildren();
        node2.fixChildren();
    }

    bTree.prototype.swapParentNode = function(childNode, parentNode) {
        var childNodeLeftChild = childNode.leftChild;
        var childNodeRightChild = childNode.rightChild;

        if ( childNode.isRightChild() ) {
            childNode.rightChild = parentNode;
            childNode.leftChild = parentNode.leftChild;
        } else {
            childNode.leftChild = parentNode;
            childNode.rightChild = parentNode.rightChild;
        }

        childNode.parent = parentNode.parent;
        parentNode.leftChild = childNodeLeftChild;
        parentNode.rightChild = childNodeRightChild;
        parentNode.parent = childNode;

        parentNode.fixChildren();
        childNode.fixChildren();
    }

    bTree.prototype.search = function(key, startNode) {
        if ( typeof startNode === 'undefined' ) {
            startNode = this.rootNode;
        }
        if ( startNode.key === key ) return startNode;
        if ( startNode.key > key ) {
            return this.search(key, startNode.leftChild);
        } else {
            return this.search(key, startNode.rightChild);
        }
    }

    bTree.prototype.min = function(startNode) {
        if ( typeof startNode ===  'undefined' ) {
            startNode = this.rootNode;
        }

        if ( !startNode.leftChild ) return startNode;

        return this.min(startNode.leftChild);
    }

    bTree.prototype.max = function(startNode) {
        if ( typeof startNode ===  'undefined' ) {
            startNode = this.rootNode;
        }

        if ( !startNode.rightChild ) return startNode;

        return this.max(startNode.rightChild);
    }

    bTree.prototype.findParent = function(startNode, key_value) {
        if ( key_value > startNode.key ) {
            if ( !startNode.rightChild ) return startNode;
            return this.findParent(startNode.rightChild, key_value)
        } else {
            if ( !startNode.leftChild ) return startNode;
            return this.findParent(startNode.leftChild, key_value)
        }
    }

    bTree.prototype.predecessor = function(key) {
        var startNode = this.search(key);
        if ( startNode.leftChild ) return this.max(startNode.leftChild);

        return this.checkParent(startNode, key)
    }

    bTree.prototype.checkParent = function(startNode, key) {
        if ( startNode.parent.key < key ) return startNode.parent;
        return this.checkParent(startNode.parent, key);
    }

    bTree.prototype.printSortedNodes = function(startNode) {
        if ( typeof startNode === 'undefined') startNode = this.rootNode;
        if ( startNode.leftChild ) {
            this.printSortedNodes(startNode.leftChild);
        }

        console.log(startNode.key);

        if ( startNode.rightChild ) {
            this.printSortedNodes(startNode.rightChild);
        }
    }
})();

b = new JSAlgorithms.bTree()
b.insert(7)
b.insert(5)
b.insert(11)
b.insert(4)
b.insert(6)
b.insert(9)
b.insert(13)
