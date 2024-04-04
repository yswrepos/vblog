---
title: GO实现主要排序算法
date: 2024-03-01 00:09:14
tags:
 - 算法
 - 排序
 - go 
categories: go
---

## 排序算法介绍和示例

以下是对冒泡排序、选择排序、插入排序和快速排序的简要介绍，并附带使用Go语言实现的代码示例：

### 冒泡排序（Bubble Sort）：
冒泡排序是一种简单的排序算法，它重复地遍历要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。

**Go语言实现：**
```go
package main

import "fmt"

func bubbleSort(arr []int) {
    n := len(arr)
    for i := 0; i < n-1; i++ {
        for j := 0; j < n-i-1; j++ {
            if arr[j] > arr[j+1] {
                arr[j], arr[j+1] = arr[j+1], arr[j]
            }
        }
    }
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    fmt.Println("Unsorted array:", arr)
    bubbleSort(arr)
    fmt.Println("Sorted array:", arr)
}
```

### 选择排序（Selection Sort）：
选择排序是一种简单直观的排序算法。它的工作原理是每一次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，然后再从剩余的未排序元素中寻找最小（或最大）的元素，然后放到已排序序列的末尾。

**Go语言实现：**
```go
package main

import "fmt"

func selectionSort(arr []int) {
    n := len(arr)
    for i := 0; i < n-1; i++ {
        minIndex := i
        for j := i + 1; j < n; j++ {
            if arr[j] < arr[minIndex] {
                minIndex = j
            }
        }
        arr[i], arr[minIndex] = arr[minIndex], arr[i]
    }
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    fmt.Println("Unsorted array:", arr)
    selectionSort(arr)
    fmt.Println("Sorted array:", arr)
}
```

### 插入排序（Insertion Sort）：
插入排序是一种简单直观的排序算法。它的工作原理是构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。

**Go语言实现：**
```go
package main

import "fmt"

func insertionSort(arr []int) {
    n := len(arr)
    for i := 1; i < n; i++ {
        key := arr[i]
        j := i - 1
        for j >= 0 && arr[j] > key {
            arr[j+1] = arr[j]
            j = j - 1
        }
        arr[j+1] = key
    }
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    fmt.Println("Unsorted array:", arr)
    insertionSort(arr)
    fmt.Println("Sorted array:", arr)
}
```

### 快速排序（Quick Sort）：
快速排序是一种分治思想的排序算法。它的基本思想是通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有元素都比另外一部分的所有元素都小，然后再按此方法对这两部分数据分别进行快速排序。

**Go语言实现：**
```go
package main

import "fmt"

func quickSort(arr []int, low, high int) {
    if low < high {
        pi := partition(arr, low, high)
        quickSort(arr, low, pi-1)
        quickSort(arr, pi+1, high)
    }
}

func partition(arr []int, low, high int) int {
    pivot := arr[high]
    i := low - 1
    for j := low; j < high; j++ {
        if arr[j] < pivot {
            i++
            arr[i], arr[j] = arr[j], arr[i]
        }
    }
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1
}

func main() {
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    fmt.Println("Unsorted array:", arr)
    quickSort(arr, 0, len(arr)-1)
    fmt.Println("Sorted array:", arr)
}
```
<!-- more -->

## 时间复杂度

下面是对冒泡排序、选择排序、插入排序和快速排序的时间复杂度以及如何计算的简要说明：

### 冒泡排序（Bubble Sort）：
- 时间复杂度：最好情况下为O(n)，平均和最坏情况下为O(n^2)。
- 计算方法：在最好情况下，如果列表已经是有序的，冒泡排序只需遍历一次即可确定列表已排序。在平均和最坏情况下，需要遍历n-1次，每次遍历需要比较n-1次，因此总的比较次数为(n-1) * (n-1) = n^2 - 2n + 1，时间复杂度为O(n^2)。

### 选择排序（Selection Sort）：
- 时间复杂度：不管什么情况下，都为O(n^2)。
- 计算方法：在选择排序中，每次遍历列表找到最小值需要比较n-1次，总共需要进行n-1次这样的操作。因此，总的比较次数为(n-1) * (n-1) = n^2 - 2n + 1，时间复杂度为O(n^2)。

### 插入排序（Insertion Sort）：
- 时间复杂度：最好情况下为O(n)，平均和最坏情况下为O(n^2)。
- 计算方法：在最好情况下，如果列表已经是有序的，插入排序只需遍历一次即可确定列表已排序。在平均和最坏情况下，需要遍历n-1次，每次遍历最多需要比较n次，因此总的比较次数为(n-1) * n / 2 = (n^2 - n) / 2，时间复杂度为O(n^2)。

### 快速排序（Quick Sort）：
- 时间复杂度：平均情况下为O(nlogn)，最坏情况下为O(n^2)。
- 计算方法：快速排序采用分治策略，平均情况下每次划分都可以将列表分成两部分，每部分的规模约为原列表的一半，因此需要logn次划分。在每次划分时，需要线性时间来进行比较和交换。因此，总的时间复杂度为O(nlogn)。在最坏情况下，每次划分只能将列表分成一部分和空列表两部分，需要进行n次划分，因此总的时间复杂度为O(n^2)。


## 快速排序和归并排序

快速排序和归并排序都是常见的高效排序算法，它们的主要区别在于其实现方式和性能特点：

### 区别：

1. **实现方式**：
   - 快速排序采用分治策略，通过在数据集合中选择一个基准元素，将数据分割成两个子集，一个子集中的所有元素小于基准元素，另一个子集中的所有元素大于基准元素，然后对这两个子集递归地进行排序。
   - 归并排序也采用分治策略，但是它的思想是先将数据分割成单个元素的子集，然后逐步合并相邻的子集，并在合并的过程中进行排序。

2. **性能特点**：
   - 快速排序在平均情况下具有较好的性能，时间复杂度为O(nlogn)，但在最坏情况下可能会退化为O(n^2)，例如在每次划分时选择的基准元素都是最大或最小元素的情况下。
   - 归并排序的时间复杂度稳定，始终为O(nlogn)，但它需要额外的空间来存储临时数组，在空间复杂度上可能不如快速排序。

### 性能比较：

- 在大多数情况下，快速排序的性能比归并排序更好，因为它具有较小的常数因子和更好的空间局部性。但是，在处理大规模数据时，归并排序可能更可靠，因为它的时间复杂度稳定且不受数据分布的影响。

总的来说，如果对排序算法的平均性能更为关注，并且可以接受在最坏情况下性能下降的情况，快速排序是一个不错的选择；而如果需要保证稳定的性能表现，并且可以承受额外的空间开销，归并排序可能更合适。

## 归并排序示例


归并排序（Merge Sort）是一种经典的分治算法，它将待排序的数组分成两部分，分别对这两部分进行排序，然后再将两部分合并成一个有序数组。归并排序的基本思想是先递归地将数组分成更小的部分，直到每个部分只有一个元素，然后再将这些部分合并成一个有序数组。

```go 
package main

import (
	"fmt"
)

func mergeSort(arr []int) []int {
	if len(arr) <= 1 {
		return arr
	}

	mid := len(arr) / 2
	left := mergeSort(arr[:mid])
	right := mergeSort(arr[mid:])

	return merge(left, right)
}

func merge(left, right []int) []int {
	result := make([]int, 0, len(left)+len(right))
	i, j := 0, 0

	for i < len(left) && j < len(right) {
		if left[i] <= right[j] {
			result = append(result, left[i])
			i++
		} else {
			result = append(result, right[j])
			j++
		}
	}

	result = append(result, left[i:]...)
	result = append(result, right[j:]...)

	return result
}

func main() {
	arr := []int{12, 11, 13, 5, 6, 7}
	fmt.Println("Original array:", arr)

	sortedArr := mergeSort(arr)
	fmt.Println("Sorted array:", sortedArr)
}
```