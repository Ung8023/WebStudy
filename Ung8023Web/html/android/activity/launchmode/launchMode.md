# Activity的启动模式
* [1. 四种启动模式](#1)
    * [1.1 standard模式](#11)
    * [1.2 singleTop模式](#12)
    * [1.3 singleTask模式](#13)
        * [1.3.1 singleTask特殊情况](#131)
            * [1.3.1.1 前提条件](#1311)
            * [1.3.1.2 特殊情况1](#1312)
            * [1.3.1.3 特殊情况2](#1313)
    * [1.4 singleInstance模式](#14)
* [2. 需要的任务栈](#2)
    * [2.1 查看任务栈](#21)
    * [2.2 指定任务栈](#22)
    * [2.3 `TaskAffinity`与`singleTask`启动模式配对使用](#23)

<a id="1"></a>
## 1. 四种启动模式
| 启动模式 | 释 |
| :---: | :--- |
| `standard` | `默认模式`,每次启动一个`Activity`都会创建新的实例，一个任务栈中可以有多个此`Activity`实例，当启动`standard`模式的`Activity`时，被启动的`Activity`会进入启动它的那个`Activity`所在的任务栈，所以这个启动模式的`Activity`不能直接用`ApplicationContext`启动(`ApplicationContext`没有任务栈)。 |
| `singleTop` | `栈顶复用模式`，如果此`Activity`已经在栈中有一个实例，并且处于栈顶，那么再次启动此`Activity`，`Activity`不会被重建，同时它的`onNewIntent`方法会被回调。 如果`Activity`不在栈顶，则会重新创建|
| `singleTask` | `栈内复用模式`，只要栈中有这个`Activity`,那么就不会重新创建，只会回调`onNewIntent` ,启动此`Activity`时，会先寻找是否存在它想要的任务栈，如果不存在，就重新创建这个任务栈，然后创建实例入栈。如果存在任务栈，看是否存在实例，如果存在实例则调到栈顶(会清除此`Activity`上面的所有`Activity`)，并回调`onNewIntent`,如果不存在实例，则创建实例并入栈|
| `singleInstance` | `单实例模式`，此模式的`Activity`单独位于一个任务栈中，系统会为它创建一个新的任务栈，后续的请求不会创建新的Activity |

<a id="11"></a>
### 1.1 `standard`模式

![](/assets/standard.png)

<a id="12"></a>
### 1.2 `singleTop`模式

![](/assets/singletop不在栈顶.png)

![](/assets/singletop在栈顶.png)

<a id="13"></a>
### 1.3 `singleTask`模式

![](/assets/SingleTask.png)

<a id="131"></a>
#### 1.3.1 `singleTask`特殊情况

##### 1.3.1.1 前提条件

![](/assets/singleTask特殊情况前提.png)

##### 1.3.1.2 特殊情况1

![](/assets/singleTask特殊情况1.png)

##### 1.3.1.3 特殊情况2

![](/assets/singleTask特殊情况2.png)

<a id="14"></a>
### 1.4 `singleInstance`模式

![](/assets/singleInstance.png)

<a id="2"></a>
## 2. 需要的任务栈
一个`Activity`默认需要的任务栈是以`App`包名定义的,但是可以通过`TaskAffinity`指定，它标识了`Activity`需要的任务栈。主要与`singleTask`启动模式或者`allowTaskReparenting`属性配对使用，其他情况下没有意义。任务栈分为**前台任务栈**和**后台任务栈**,后台任务栈中的`Activity`，处于暂停状态。

<a id="21"></a>
### 2.1 查看任务栈
```shell
adb shell dumpsys activity
```
<a id="22"></a>
### 2.2 指定任务栈
#### 2.2.1 Manifest中指定

```xml
<activity
    android:name="xxx.xxx.XActivity"
    android:taskAffinity="aaaaa"
    android:theme="@style/AppTheme">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

<a id="23"></a>
### 2.3 `TaskAffinity`与`singleTask`启动模式配对使用
`TaskAffinity`是具有`singleTask`模式的`Activity`的目前任务栈的名字，待启动的`Activity`会运行在名字和`TaskAffinity`相同的任务栈中。