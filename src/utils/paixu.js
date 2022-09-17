// 封装排序函数

const insertsort = (arr) => {
  let len = arr.length
  let preindex,current,temp
  for(let i = 1;i<len;i++)
  {
    preindex = i-1
    temp = arr[i]
    current = arr[i].prob
    while(preindex>=0&&arr[preindex].prob<current)
    {
      arr[preindex+1] = arr[preindex]
      preindex--
    }
    arr[preindex+1] = temp
  }
  return arr
}

export const sortItem = (arr) => {
  // // 在数据量小的时候用插入排序
  return insertsort(arr)

}