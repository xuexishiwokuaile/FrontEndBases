//排序算法：

//1.冒泡排序
public int[] BubbleSort(int[] arr)
{
    if(arr.length==0)
        return arr;
    for(int i=0;i<arr.length;i++)
    {
        for(int j=0;j<arr.length-1-i;j++)
        {
            if(arr[j]>arr[j+1])
            {
                int temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

//2.选择排序
public int[] SelectionSort(int[] arr)
{
    if(arr.length==0)
        return arr;
    for(int i=0;i<arr.length;i++)
    {
        int minIndex = i;
        for(int j=i;j<arr.length;j++)
        {
            if(arr[j]<arr[minIndex])
                minIndex=arr[j];
        }
        int temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

//3.插入排序
public int[] InsertSort(int arr[])
{
    if(arr.length==0)
        return arr;
    int current;
    for(int i=0;i<arr.length-1;i++)
    {
        current = arr[i+1];
        int preIndex = i;
        while(preIndex>=0&&arr[preIndex]>current)
        {
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
    return arr;
}

//4.希尔排序
public int[] ShellSort(int[] arr)
{
    int len = arr.length;
    int temp,gap = len/2;
    while(gap>0)
    {
        for(int i=0;i<len;i++)
        {
            temp = arr[i];
            preIndex = i - gap;
            while(preIndex>=0&&arr[preIndex]>temp)
            {
                arr[preIndex+gap] = arr[preIndex];
                preIndex -= gap;
            }
            arr[preIndex+gap] = temp;
        }
        gap /= 2;
    }
    return arr;
}

//5.归并排序
public int[] MergeSort(int arr[])
{
    if(arr.length<2)
        return arr;
    int mid = arr.length/2;
    int[] left = Arrays.copyOfRange(arr,0,mid);
    int[] right = Arrays.copyOfRange(arr,mid,arr.length);
    return merge(MergeSort(left),MergeSort(right));
}

public int[] merge(int[] left,int[] right)
{
    int[] result = new int[left.length+right+length];
    //二路归并
    for(int index=0,i=0,j=0;index<result.length;index++)
    {
        if(i>=left.length)
            result[index] = right[j++];
        else if(j>=right.length)
            result[index] = left[i++];
        else if(left[i] > right[j])
            result[index] = right[j++];
        else
            result[index] = left[i++];
    }
    return result;
}

//6.快速排序
public void QuickSort(int[] arr,int low,int high)
{
    if(low<high)
    {
        int middleIndex = partition(arr,low,high);
        //左子序列排序
        QuickSort(arr,low,middle-1);
        //右子序列排序
        QuickSort(arr,middle+1,high);
    }
}

public int partition(int[] arr,int low,int high)
{
    int temp = arr[low];
    while(low<high)
    {
        while(low<high&&temp<=arr[high])
            high--;
        arr[low] = arr[high];
        while(low<high&&temp>=arr[low])
            low++;
        arr[high] = arr[low]
    }
    //此时low=high
    arr[low] = temp;
    return low;
}

//7.堆排序
public void HeapSort(int[] arr)
{
    int len = arr.length;
    //构建大顶堆
    for(int i=len/2-1;i>=0;i--)
    {
        adjustHeap(arr,i,arr.length);
    }
    //调整堆结构，交换堆顶元素与末尾元素
    for(int j=arr.length-1;j>0;j--)
    {
        swap(arr,0,j);
        adjustHeap(arr,0,j);
    }
}

public void adjustHeap(int[] arr,int i,int length)
{
    int temp = arr[i];
    for(int k=2*i+1;k<length;k=2*k+1)
    {
        if(k+1<length&&arr[k+1]>arr[k])
            k++;
        if(arr[i]<arr[k])
            arr[i] = arr[k];
            i = k;
        else
            break;
    }
    arr[i] = temp;
}

public void swap(int[] arr,int a,int b)
{
    int temp = arr[b];
    arr[b] = arr[a];
    arr[a] = temp;
}