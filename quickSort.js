var pivot = function(A, pivotIndex, startIdx, endIdx) {
	A = swap(A, startIdx, pivotIndex);
	
	var i = startIdx + 1;
	for (var j = startIdx + 1; j < endIdx; j++) {
		if (A[pivotIndex] > A[j]) { 
			A = swap(A, i, j);
			i++;
		}
	};

	A = swap(A, startIdx, i - 1);
	var pivotIndex = i - 1;
	A.push(pivotIndex);
	
	return A;
};

var swap = function(A, i, j) {
	var temp = A[i];
	A[i] = A[j];
	A[j] = temp;
	return A;
};


var quickSort = function(A, startIdx, endIdx) {
	if ( typeof startIdx === "undefined" ) var startIdx = 0;
	if ( typeof endIdx === "undefined" ) var endIdx = A.length;

	if ((endIdx - startIdx) <= 1) return A;

	var pivotIndex = startIdx;
	A = pivot(A, pivotIndex, startIdx, endIdx);

	pivotIndex = A.pop();

	var lowerEndIdx = pivotIndex - 1;
	var upperStartIdx = pivotIndex + 1;

	A = quickSort(A, startIdx, lowerEndIdx);
	A = quickSort(A, upperStartIdx);
	return A;
}