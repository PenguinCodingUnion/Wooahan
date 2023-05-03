package com.penguin.hangul

import android.app.Activity
import android.content.pm.ActivityInfo
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import java.util.Timer
import kotlin.concurrent.timerTask


class MainActivity : AppCompatActivity() {

    private var myWebView: WebView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE

        myWebView = findViewById(R.id.myWebView)

        myWebView?.apply {
            webViewClient = WebViewClient()
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
        }

        var myJSCC = JavascriptCallbackClient(this, myWebView!!)

        // addJavascriptInterface 를 통해 이름을 정해서 함수를 넘겨줄 수 있음..
        // js 쪽에서는 window.myData 형식으로 데이터를 받을 수 있음
        myWebView?.addJavascriptInterface(MyJavaScriptInterFace(MyData()), "myData")
        myWebView?.addJavascriptInterface(myJSCC, "android")

//        myWebView?.loadUrl("https://www.naver.co.kr")
        myWebView?.loadUrl("http://10.0.2.2:3000")

        val timer = Timer()

        timer.scheduleAtFixedRate(timerTask {
            runOnUiThread {
                myWebView?.evaluateJavascript("javascript:window.doJump();", null)
            }
        }, 0, 15000)
    }

    override fun onBackPressed() {
        if (myWebView?.canGoBack() == true) {
            myWebView?.goBack()
        } else {
            finish()
        }
    }
}

// 변수 관련 클래스를 만들고 인터페이스를 통해(getValue 등) 전달..
class MyData {
    var value : String = "My Data 입니당"
}

// 변수 관련 클래스를 만들고 인터페이스를 통해(getValue 등) 전달..
class MyJavaScriptInterFace(private  val myData: MyData){
    @JavascriptInterface
    fun getValue():String{
        return myData.value
    }
}


// evaluateJavascript와 dispatchEvent를 통해 함수를 실행시킬 수 있음
class JavascriptCallbackClient(private val mContext: Activity, private var webView: WebView) {
    val myName = "최희수"
    private fun publishEvent(functionName: String, data: String): String {
        val buffer = StringBuffer()
            .append("window.dispatchEvent(\n")
            .append("   new CustomEvent(\"").append(functionName).append("\", {\n")
            .append("           detail: {\n")
            .append("               data: ").append(data).append("\n")
            .append("           }\n")
            .append("       }\n")
            .append("   )\n")
            .append(");")
        return buffer.toString()
    }

    @JavascriptInterface
    fun showToastMessage(message: String?) {
        Toast.makeText(mContext, message, Toast.LENGTH_SHORT).show()
    }

    @JavascriptInterface
    fun callJavaScriptFunction() {
        webView.postDelayed({
            webView.evaluateJavascript(
                publishEvent(
                    "javascriptFunction",
                    "\"Hello, I'm message from Android\""
                )
            ) { result: String? ->
                Toast.makeText(
                    mContext,
                    result,
                    Toast.LENGTH_SHORT
                ).show()
            }
        }, 5000)
    }
}