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
})();