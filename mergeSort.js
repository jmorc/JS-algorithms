var mergeSort = function(A) {
	if (A.length === 1) return A;

	var midpoint = A.length / 2;
	var leftHalf = A.slice(0, midpoint);
	var rightHalf = A.slice(midpoint, A.length);

	leftHalf = mergeSort(leftHalf);
	rightHalf = mergeSort(rightHalf);

	return merge(leftHalf, rightHalf);
};

var merge = function(arr1, arr2) {
	var mergedArr = [];
	var i = 0;
	var j = 0;

	while ( i < arr1.length && j < arr2.length ) {
		if ( arr1[i] > arr2[j] ) {
			mergedArr.push(arr2[j]);
			j++;
		} else {
			mergedArr.push(arr1[i]);
			i++;
		}
	};
	return mergedArr.concat(arr1.slice(i, arr1.length))
					.concat(arr2.slice(j, arr2.length));
};
