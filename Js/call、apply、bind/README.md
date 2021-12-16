## bind、apply、call 的区别？
### 语法  
> fun.call(thisArg, param1, param2, ...)  
> fun.apply(thisArg, [param1,param2,...])  
> fun.bind(thisArg, param1, param2, ...)

### 返回值
call、apply 返回的是函数结果  
bind 是拷贝fn，返回指定this和初始参数

### 参数
thisArg（可选）：
1. fun的this指向`thisArg`对象
2. 值为原始值（数字、字符串、布尔值）的this会指向他的包装类.如Number、String、Boolean

param1,param2(可选): 传给fun的参数。
1. 如果param不传或为 null/undefined，则表示不需要传入任何参数.
2. apply第二个参数为数组，数组内的值为传给fun的参数。

### 调用和作用
 调用：call、apply、bind必须是一个函数，因为挂载在Function上，只有函数才能调用。  
如`Object.prototype.toString.call(obj)`

作用：主要用来改变this指向问题

### 区别
call 和apply 的唯一的区别是参数： 
- call从第2~n的参数都是传给fun的。
- apply是第2个参数，这个参数是一个数组：传给fun参数都写在数组中。

call、apply和bind的区别:
- call/apply改变了函数的this上下文后马上**执行该函数**
- bind则是返回改变了上下文后的函数,**不执行该函数**
- call/apply 返回fun的执行结果 
- bind返回fun的拷贝，并指定了fun的this指向，保存了fun的参数。

### 核心理念
call、apply、bind的核心理念：借用方法  
借助已有的方法，改变方法中数据的this指向，减少代码重复度，节约内存

### call、apply使用那个
call,apply的效果完全一样，它们的区别也在于
- 参数数量/顺序确定就用call，参数数量/顺序不确定的话就用apply。
- 考虑可读性：参数数量不多就用call，参数数量比较多的话，把参数整合成数组，使用apply。
- 参数集合已经是一个数组的情况，用apply。
