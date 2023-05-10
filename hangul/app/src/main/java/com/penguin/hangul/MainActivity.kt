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
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import kotlin.math.sqrt


class MainActivity : AppCompatActivity() {

    private var myWebView: WebView? = null

    val deviceInformation = DeviceInformation(this)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        /**
         * 디바이스 정보 가져오기
         */

        Log.d("start", "시작")

        Log.d("-----deviceId------",
            "deviceInformation 확인 :"+deviceInformation.getDeviceId())

        requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE

        myWebView = findViewById(R.id.myWebView)

        myWebView?.apply {
            webViewClient = WebViewClient()
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
        }


        val sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager;
        val accelermeter = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        val gravity = sensorManager.getDefaultSensor(Sensor.TYPE_GRAVITY);

        val sensorEventListner = object : SensorEventListener {
            var lastAccel: Float = 0f;
            var accel: Float = 0f;
            var currentAccel = 0f;

            override fun onAccuracyChanged(p0: Sensor?, p1: Int) {
            }

            override fun onSensorChanged(event: SensorEvent) {
                if (event.sensor.type == Sensor.TYPE_ACCELEROMETER) {
                    lastAccel = currentAccel
                    currentAccel =
                        sqrt((event.values[0] * event.values[0] + event.values[1] * event.values[1] + event.values[2] * event.values[2]))
                    val delta: Float = currentAccel - lastAccel
                    accel = accel * 0.9f + delta;

//                    Log.i("Android", "this is ACCELEROMETER")
                    if (accel > 2) {
                        onJumpDetected()
                    }
                }

                if (event.sensor.type == Sensor.TYPE_GRAVITY) {
                    val y = event.values[1]

                    if (y > 2) {
                        onMoveDetected(1)
                    } else if (y < -2) {
                        onMoveDetected(-1)
                    } else {
                        onMoveDetected(0)
                    }
                }
            }
        }

        myWebView?.addJavascriptInterface(MySensorManager(sensorManager, sensorEventListner, gravity), "sleigh")

        myWebView?.addJavascriptInterface(
            MySensorManager(
                sensorManager,
                sensorEventListner,
                accelermeter
            ), "jump"
        )

        myWebView?.addJavascriptInterface(
            WarningManager(
                this,
                deviceInformation.getDeviceId()
            )
            ,"react_toast"
        )

        myWebView?.loadUrl("http://10.0.2.2:3000")
    }


    fun onJumpDetected() {
        runOnUiThread {
            myWebView?.evaluateJavascript("javascript:window.doJump();", null)
        }
    }

    fun onMoveDetected(value: Int) {
        if (value == 0) {
            runOnUiThread {
                myWebView?.evaluateJavascript("javascript:window.stopMove()", null)
            }
        } else {
            runOnUiThread {
                myWebView?.evaluateJavascript("javascript:window.doMove(${value})", null)
            }
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

class DeviceInformation(private val context: Context) {
    fun getDeviceId(): String {
        return Settings.Secure.getString(context.contentResolver, Settings.Secure.ANDROID_ID)
    }

    fun getDeviceModel(): String {
        return Build.MODEL;
    }

}

class MySensorManager(private val sensorManager: SensorManager,private val sensorEventListener: SensorEventListener,private val sensor:Sensor){
    @JavascriptInterface
    fun resumeSensor(){
        sensorManager.registerListener(
            sensorEventListener,
            sensor,
            SensorManager.SENSOR_DELAY_NORMAL
        );
    }
    @JavascriptInterface
    fun pauseSensor(){
        sensorManager.unregisterListener(sensorEventListener,sensor);
    }
}

class WarningManager(private val mContext: Context, private val device: String){

    @JavascriptInterface
    fun showToast(toast: String) {
        Toast.makeText(mContext, toast, Toast.LENGTH_LONG).show();
    }

    @JavascriptInterface
    fun sendDeviceID(): String {
        return device;
    }

    @JavascriptInterface
    fun axiosCheck(res: String): String {
        Log.d("gg", res)
        return res;
    }

}
