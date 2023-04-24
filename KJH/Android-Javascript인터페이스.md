## Android -> Javascrpit

### 방법 1

- 1. (front) 네이티브에서 호출하기 위한 함수를 CustomEvent로 만들고 window.함수명으로 할당

```
useEffect(() => {
    window.sayHello = new CustomEvent("NativeEvent");
    const nativeEventCallback = (event) => {
      alert(`event receive from Native`);
    };

    window.addEventListener("NativeEvent", nativeEventCallback);

    // event listener clean up
    return () => {
      window.removeEventListener("NativeEvent", nativeEventCallback);
    };
 }, []);
```

- 2.  (native) 네이티브에서는 webView가 제공하는 evaluateJavascript 함수로 아래와 같이 window.dispatchEvent로 웹에 생성한 함수를 호출.

```
webView.evaulateJavascript("window.dispatchEvent(sayHello)")
```

### 방법 2

- 1. (front) 네이티브에서 호출하기 위한 모듈을 정의하고, 전역 scope에 해당하는 모듈 또는 파일에 import.

```
window.NativeInterface = {
  helloWorld: () => {
    // your javascript code
  },
  ...
}
```

- 2. (native) 네이티브에서는 webView가 제공하는 evaluateJavascript 또는 loadUrl을 이용하여 웹에 생성된 함수를 호출.

```
webView.evaluateJavascript("window.NativeInterface.helloWorld()")
// or
webView.loadUrl("javascript:window.NativeInterface.helloWorld()")
```

## Javascript -> Android

- 1. (native) 웹에서 호출하기 위한 함수들을 하나의 클래스로 만들고 웹에서 호출화려는 함수에는 @JavascriptInterface 어노테이션을 붙인다.

```
class JSInterface(private val context: Context) {
	@JavascriptInterface
	fun showToast(message: String) {
		// your native code
		Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
	}
	...
}
```

- 2. (native) 1번 과정에서 만든 클래스를 webView에 연결한다.

```
webView.addJavascriptInterface(JSInterface(applicationContext), "InterfaceName")
```

- 3. (front) 웹에서는 window.클래스명.함수명과 같은 방법으로 Native에 선언된 함수를 호출할 수 있다.

```
window.InterfaceName.showToast("Hello Android")
```
