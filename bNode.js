(function() {
    if ( typeof window.JSAlgorithms === 'undefined' ) {
        window.JSAlgorithms = {};
    }

    var bNode = JSAlgorithms.bNode = function(key) {
        this.parent = null;
        this.leftChild = null;
        this.rightChild = null;
        this.key = key;
    };

    bNode.prototype.remove = function() {
        if ( !this.parent ) {
            delete this;
            return;
        }

        if ( this.key > this.parent.key ) {
            this.parent.rightChild = null;
            delete this;
            return;
        }

        if ( this.key < this.parent.key ) {
            this.parent.leftChild = null;
            delete this;
            return;
        }
    }

    bNode.prototype.isRightChild = function() {
        if ( this.key > this.parent.key ) return true;
        return false;
    }

    bNode.prototype.fixChildren = function() {
        if ( this.leftChild ) {
            this.leftChild.parent = this;
        }

        if ( this.rightChild ) {
            this.rightChild.parent = this;
        }
    }

})();