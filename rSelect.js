var rSelect = function( A, n, i ) {
	if ( n === 1 ) return A[0];
	var A = pivot(A, n);
	var pivotLocation = A.pop();

	if ( pivotLocation === i ) {
		return A[ pivotLocation - 1 ];
	} else if ( pivotLocation > i) {
		return rSelect(A.slice(0, pivotLocation - 1, i), pivotLocation - 1, i)
	} else {
		return rSelect(A.slice(pivotLocation, n), n - pivotLocation, i - pivotLocation)
	}
};

var pivot = function( A, n ) {
	var pivotEl = A[0];
	var i = 1;
	for (var j = 1; j < n; j++) {
		if ( A[j] < pivotEl ) {
			A = swap(A, i, j);
			i++;
		}
	};
	var p = i - 1;
	A = swap(A, 0, p)
	A.push(i)
	return A;
};

var swap = function( A, i, j ) {
	var temp = A[i];
	A[i] = A[j];
	A[j] = temp;

	return A;
};
