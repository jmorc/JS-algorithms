(function() {
    if ( typeof window.JSAlgorithms === 'undefined' ) {
    	window.JSAlgorithms = {};
    }

    var Heap = JSAlgorithms.Heap = function() {
        this.heapArray = [];
    };

    Heap.prototype.insert = function( el ) {
        this.heapArray.push(el);
        var elIdx = this.heapArray.length - 1;
        if ( elIdx === 0) return;

        var parentIdx = this.findParentIdx(elIdx);

        while ( this.heapArray[elIdx] < this.heapArray[parentIdx] ) {
        //    swap these two
            this.swap(elIdx, parentIdx);
        //    reassign elIdx and parentIdx
            elIdx = parentIdx;
            parentIdx = this.findParentIdx(elIdx);
        }
    };

    Heap.prototype.findParentIdx = function( elIdx ) {
        if ( elIdx % 2 === 0 ) {
            return parentIdx = elIdx / 2;
        } else {
            return parentIdx = Math.floor( elIdx / 2.0 );
        }
    };

    Heap.prototype.swap = function( i, j ) {
        var temp = this.heapArray[i];
        this.heapArray[i] = this.heapArray[j];
        this.heapArray[j] = temp;
    };

    Heap.prototype.extractMin = function() {
        this.swap(0, this.heapArray.length - 1);
        var min = this.heapArray.pop();
        var elIdx = 0;
        // "bubble down" root element
        var lesserChildIdx = this.lesserChildIdx(elIdx);
        while ( this.heapArray[elIdx] > this.heapArray[lesserChildIdx] ) {
            this.swap(elIdx, lesserChildIdx);
            elIdx = lesserChildIdx;
            lesserChildIdx = this.lesserChildIdx(elIdx);
            if ( lesserChildIdx === -1 ) break;
        };

        return min;
    };

    Heap.prototype.lesserChildIdx = function(elIdx) { 
    // let elIdx be array idx starting at 0
        var firstChildIdx = (elIdx + 1) * 2 - 1;
        var secondChildIdx = (elIdx + 1) * 2;
    // if there are no children, return -1
        if ( this.heapArray.length <= firstChildIdx ) {
            return -1;
        }
    // if there is only one child, return that
        if ( this.heapArray.length === secondChildIdx ) {
            return firstChildIdx;
        }

        if ( this.heapArray[ firstChildIdx ] <
             this.heapArray[ secondChildIdx ] ) {
            return firstChildIdx;
        } else {
            return secondChildIdx;
        }
    };
})();

h = new JSAlgorithms.Heap()
h.insert(4)
h.insert(12)
h.insert(9)
h.insert(6)
h.insert(4)
h.insert(4)
h.insert(8)

