
## 0410
    - 아이디어 회의 진행
    - react native 학습


## 0411
### 안드로이드 스튜디오 설치

[AndroidStudio 설치 사이트](https://developer.android.com/studio)에서 PC에 맞게 다운로드 및 설치

### 프로젝트 생성

- 기본적으로 사용할 템플릿을 선택하고, 프로젝트명과 패키지명 사용언어(Kotlin)과 SDK 버전을 선택하여 프로젝트 생성

### 프로젝트 구조

- 기본적으로 프로젝트를 생성하면 app 폴더안에 java 폴더와 res 폴더 생성
- java 폴더에는 기능, res에는 인터페이스 관련 파일로 구분

### 에뮬레이터 설치

- AVD(Android Virtual Device) 설치 후 원하는 가상 장치를 선택하여 연결
- 사용하는 PC에 맞게 맞게 에뮬레이터 선택 후 구성 설치
- 기타 세부 설정( latency, 코어 수, RAM 크기 등)

### Hello World 출력

```java
MainActivity.kt
    // R 은 res 폴더를 가리킨다.
    setContentView(R.layout.activity_main)
```

## 0412
### Click Counter

### 요소 추가

- layout 에서 요소(TextView, Button 등) 추가시 Constraints 추가 필요
  - Infer constraints를 통해 추가
- 추가한 요소의 ID를 설정

### 요소 접근 및 사용

- 요소의 ID에 findViewById<>() 로 접근

```kotlin
    val btnClickMe = findViewById<Button>(R.id.myButton)
    val myTextView = findViewById<TextView>(R.id.textView)
    var timesClicked = 0
```

### 요소에 이벤트 함수 설정

- 원하는 이벤트리스너 함수를 정해준다.

- 클릭이벤트 설정 시

```kotlin
    btnClickMe.setOnClickListener {
        timesClicked += 1

        myTextView.text = timesClicked.toString()
    }
```

### Toast

- Toast는 안내 메세지가 나오고 일정 시간이 지나면 사라지는 팝업 메세지
- 인자
  1. context
  2. 메세지 내용
  3. 노출 시간(Toast.LENGTH_SHORT or Toast.LENGTH_LONG)

```kotlin
    Toast.makeText(this,"This is Toast!", Toast.LENGTH_LONG).show()
```


## 0413
```kotlin

fun main() {
    // TODO : kotlin variable study
    /* 주석 */

    // immutable variable
    val yourName = "Android"
    println("Hello " + yourName)

    // mutable variable
    var myName = "Studio"
    println("Hello " + myName)
    myName = "Kotlin"
    println("Hello " + myName)

    // type string
    val myString = "Hello"

    // Integer Types : Byte(8bit), Short (16bit), Int (32bit), Long (64bit)
    // _ 를 통해 가독성을 높일 수 있다.
    // 콜론 뒤에 타입을 지정하여 선언할 수 있다.
    val myByte: Byte = 127
    val myShort: Short = 125
    val myInt: Int = 123_123_123
    val myLong: Long = 12_039_812_302_123_564_12

    // type inference finds out the type from context
    // 타입을 지정하지 않아도 코틀린이 알아서 타입을 지정해주기도 한다.(타입 추론)
    val myNewInt = 123412

    // Floating Point number Types : Float(32bit) , Double (64bit)
    val myFloat: Float = 13.33F
    val myDouble: Double = 3.2123342343

    println(
        "My String : $myString \n" +
                "My Byte : $myByte \n" +
                "My Short : $myShort \n" +
                "My Int : $myInt \n" +
                "My Long : $myLong \n" +
                "My Float : $myFloat \n" +
                "My Double : $myDouble"
    )

    // Booleans type
    var myBoolean : Boolean = true
    myBoolean = false

    // Characters
    val myChar : Char = 'A'

    // Strings
    val myStr = "Hello World"
    val firstChatInString = myStr[0]
    val lastChatInString = myStr[myStr.length - 1]

    print(firstChatInString +""+ lastChatInString)
}
```

##0414
- 아이디어 회의
