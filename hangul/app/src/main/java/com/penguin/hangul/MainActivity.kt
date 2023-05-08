package com.penguin.hangul

import android.app.Activity
import android.content.Context
import android.content.pm.ActivityInfo
import android.hardware.*
import android.os.Build
import android.os.Bundle
import android.os.Debug
import android.provider.Settings
import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import java.util.Timer
import kotlin.concurrent.timerTask
import kotlin.math.sqrt


class MainActivity : AppCompatActivity() {

    private var myWebView: WebView? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        /**
         * 디바이스 정보 가져오기
         */

        Log.d("start", "시작")

        val deviceInformation = DeviceInformation(this)
        Log.d("-----deviceId------",
            "deviceInformation 확인 :"+deviceInformation.getDeviceId())
        Log.d("-----deviceName------",
            "deviceInformation 확인 :"+deviceInformation.getDeviceModel())


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



//        val timer = Timer()
//
//        timer.scheduleAtFixedRate(timerTask {
//            runOnUiThread {
//                myWebView?.evaluateJavascript("javascript:window.doJump();", null)
//            }
//        }, 0, 15000)

        val sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager;
        val accelermeter = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);

        val sensorEventListner = object : SensorEventListener {
            var lastAccel: Float = 0f;
            var accel: Float = 0f;
            var currentAccel = 0f;

            override fun onAccuracyChanged(p0: Sensor?, p1: Int) {
                Log.i("Android", "What are you doing")
            }

            override fun onSensorChanged(event: SensorEvent) {
                if ( event.sensor.type == Sensor.TYPE_ACCELEROMETER) {
                    lastAccel = currentAccel
                    currentAccel = sqrt((event.values[0] * event.values[0] + event.values[1] * event.values[1] + event.values[2] * event.values[2]))
                    val delta: Float = currentAccel - lastAccel
                    accel = accel * 0.9f + delta;

//                    Log.i("Android", "this is ACCELEROMETER")
                    if (accel > 2) {
                        onJumpDetected()
                    }
                }
            }
        }

        sensorManager.registerListener(sensorEventListner, accelermeter, SensorManager.SENSOR_DELAY_GAME);

        //내 커널임
//      myWebView?.loadUrl("https://8447-14-50-47-145.ngrok-free.app/")
        myWebView?.loadUrl("http://10.0.2.2:3000")


    }

    fun onJumpDetected() {
//        Log.i("Android", "Send Jump Function To Web")

        runOnUiThread {
            myWebView?.evaluateJavascript("javascript:window.doJump();", null)
        }
    }

    override fun onBackPressed() {
        if (myWebView?.canGoBack() == true) {
            myWebView?.goBack()
        } else {
            finish()
        }
    }
}

class DeviceInformation(val context: Context){

    // 해당 디바이스 기기ID
    fun getDeviceId(): String{
        return Settings.Secure.getString(context.contentResolver, Settings.Secure.ANDROID_ID);
    }

    // 해당 디바이스 모델명
    fun getDeviceModel(): String {
        return Build.MODEL;
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