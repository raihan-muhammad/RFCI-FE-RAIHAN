void main() {
  List<int> number = [4, 9, 7, 5, 8, 9, 3];
  List<int> sortedNumber = sorting(number);
  print(sortedNumber);
}

sorting(List<int> array) {
  int swab=1;
  int length = array.length;
  int temp;
  for (int i = 0; i < length - 1; i++) {
    for (int j = 0; j < length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        print(
            '${swab++}. [${array[j]}, ${array[j + 1]}] --> ${array}');
      }
    }
  }
  return print('Jumlah swab: ${swab-1}');
}