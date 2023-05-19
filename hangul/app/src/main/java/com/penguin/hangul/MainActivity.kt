package com.penguin.hangul

import NetworkConnectivityListener
import android.app.Activity
import android.app.AlertDialog
import android.content.ComponentName
import android.content.Context
import android.content.DialogInterface
import android.content.Intent
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.net.ConnectivityManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Handler
import android.provider.Settings
import android.util.Log
import android.view.View
import android.view.WindowManager
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.browser.customtabs.*
import androidx.lifecycle.Observer
import kotlin.math.sqrt

var customTabOpened: Boolean = false;
val baseUrl:String = "https://k8b206.p.ssafy.io"

class MainActivity : AppCompatActivity() {
    private var myWebView: WebView? = null
    val deviceInformation = DeviceInformation(this)
    private lateinit var networkConnectivityListener: NetworkConnectivityListener
    private var alertDialog: AlertDialog? = null
    private var isWaitingForReconnection = false
    private val handler = Handler()
    private val reconnectionRunnable = Runnable {
        showConnectionLostAlert()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        networkConnectivityListener = NetworkConnectivityListener(this)

        networkConnectivityListener.isConnected.observe(this, Observer { isConnected ->
            if (isConnected) {
                if (isWaitingForReconnection) {
                    handler.removeCallbacks(reconnectionRunnable)
                    hideConnectionLostAlert()
                    isWaitingForReconnection = false
                    Toast.makeText(this, "인터넷이 연결되었습니다", Toast.LENGTH_SHORT).show()
                }
            } else {
                if (!isWaitingForReconnection) {
                    showConnectionLostAlert()
                    isWaitingForReconnection = true
                }
                Toast.makeText(this, "인터넷 연결이 끊어졌습니다", Toast.LENGTH_SHORT).show()
            }
        })

        // 처음 앱 접속 시 인터넷 연결 확인
        val connectivityManager =
            getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val networkInfo = connectivityManager.activeNetworkInfo
        if (networkInfo != null && networkInfo.isConnected) {
            setContentView(R.layout.activity_main)
        } else {
            val builder = AlertDialog.Builder(this)
            builder.setCancelable(false)
            builder.setMessage("인터넷 연결이 없습니다")
            builder.setPositiveButton("종료") { _, _ ->
                finish()
            }
            alertDialog = builder.create()
            alertDialog?.show()
        }

        //액션바 제거
        val decorView = window.decorView
        val uiOptions = (View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_FULLSCREEN
                or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY)
        decorView.systemUiVisibility = uiOptions

        // 화면 상태 유지
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)


        myWebView = findViewById(R.id.myWebView)

        myWebView?.apply {
            webViewClient = WebViewClient()
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
        }

        val sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager;
        val accelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
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

                    if (accel > 12) {
                        onJumpDetected()
                    }
                }

                if (event.sensor.type == Sensor.TYPE_GRAVITY) {
                    val y = event.values[1]

                    if (y > 2.5) {
                        onMoveDetected(1)
                    } else if (y < -2.5) {
                        onMoveDetected(-1)
                    } else {
                        onMoveDetected(0)
                    }
                }
            }
        }

        myWebView?.addJavascriptInterface(
            MySensorManager(
                sensorManager,
                sensorEventListner,
                gravity
            ), "sleigh"
        )

        myWebView?.addJavascriptInterface(
            MySensorManager(
                sensorManager,
                sensorEventListner,
                accelerometer
            ), "jump"
        )

        myWebView?.addJavascriptInterface(
            WarningManager(
                this,
                deviceInformation.getDeviceId(),
                customTabsActivityResultLauncher
            ), "react_toast"
        )

        myWebView?.addJavascriptInterface(
            WarningManager(
                this,
                deviceInformation.getDeviceId(),
                customTabsActivityResultLauncher
            ), "google_login"
        )
        myWebView?.addJavascriptInterface(AppManager(this), "appManager")

        myWebView?.loadUrl(baseUrl)
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

    override fun onWindowFocusChanged(hasFocus: Boolean) {
        super.onWindowFocusChanged(hasFocus)
        if (hasFocus) {
            // 네비게이션 바 숨기기 유지
            window.decorView.systemUiVisibility = (
                    View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                            or View.SYSTEM_UI_FLAG_FULLSCREEN
                            or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                    )
        }
    }

    override fun onBackPressed() {
        if (customTabOpened) {
            val customTabsIntent = CustomTabsIntent.Builder().build()
            customTabsIntent.intent.action = Intent.ACTION_VIEW
            customTabsIntent.intent.data = Uri.parse("about:blank")
            customTabsIntent.intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
            this.startActivity(customTabsIntent.intent)
            customTabOpened = false
        } else {
            myWebView?.evaluateJavascript("javascript:window.backPress()", null)
        }
    }

    private fun showConnectionLostAlert() {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("인터넷 연결 끊김")
        builder.setMessage("인터넷 연결이 끊어졌습니다")
        builder.setCancelable(false)
        builder.setNegativeButton("대기") { _, _ ->
            // 대기 버튼 클릭 시 재연결 확인 알림을 표시
            handler.postDelayed(reconnectionRunnable, 10000)
        }

        builder.setPositiveButton("종료") { _, _ ->
            // 종료 버튼 클릭 시 앱 종료
            finish()
        }

        alertDialog = builder.create()
        alertDialog?.show()
    }

    private fun hideConnectionLostAlert() {
        alertDialog?.dismiss()
        alertDialog = null
    }

    override fun onStart() {
        super.onStart()
        // 네트워크 상태 변경 감지 콜백 등록
        networkConnectivityListener.registerNetworkCallback()
    }

    override fun onStop() {
        super.onStop()
        // 네트워크 상태 변경 감지 콜백 해제
        networkConnectivityListener.unregisterNetworkCallback()
    }

    override fun onDestroy() {
        super.onDestroy()
        // 대기 상태에서 액티비티가 종료되면 핸들러의 작업을 취소
        handler.removeCallbacks(reconnectionRunnable)
        alertDialog?.dismiss()
    }

    override fun onPause() {
        super.onPause()
        myWebView?.evaluateJavascript("javascript:window.soundPause()", null)
        myWebView?.onPause()
        myWebView?.pauseTimers()
    }

    override fun onResume() {
        super.onResume()
        myWebView?.evaluateJavascript("javascript:window.soundResume()", null)
        myWebView?.onResume()
        myWebView?.resumeTimers()
    }


    private val customTabsActivityResultLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
            if (result.resultCode == Activity.RESULT_CANCELED) {
                myWebView?.loadUrl(baseUrl)
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

class AppManager(private val activity: MainActivity) {
    @JavascriptInterface
    fun onCloseApp() {
        val builder: AlertDialog.Builder = AlertDialog.Builder(activity)
        builder.setMessage("종료하시겠습니까?")
        builder.setTitle("알림")
            .setCancelable(false)
            .setNegativeButton("네",
                DialogInterface.OnClickListener { dialog, i -> activity.finish() })
            .setPositiveButton("아니요",
                DialogInterface.OnClickListener { dialog, i -> dialog.cancel() })
        val alert: AlertDialog = builder.create()
        alert.setTitle("알림")
        alert.show()
    }
}

class MySensorManager(
    private val sensorManager: SensorManager,
    private val sensorEventListener: SensorEventListener,
    private val sensor: Sensor
) {
    @JavascriptInterface
    fun resumeSensor() {
        sensorManager.registerListener(
            sensorEventListener,
            sensor,
            SensorManager.SENSOR_DELAY_NORMAL
        );
    }

    @JavascriptInterface
    fun pauseSensor() {
        sensorManager.unregisterListener(sensorEventListener, sensor);
    }
}

class WarningManager(
    private val mContext: Context,
    private val device: String,
    private var customTabsActivityResultLauncher: ActivityResultLauncher<Intent>
) {

    @JavascriptInterface
    fun showToast(toast: String) {
        Toast.makeText(mContext, toast, Toast.LENGTH_LONG).show();
    }

    @JavascriptInterface
    fun sendDeviceID(): String {
        return device;
    }

    @JavascriptInterface
    fun googleLogin() {
        val url =
            "https://accounts.google.com/o/oauth2/auth?client_id=658207955186-n84qpvfhtdi82n6mfvbmh6v99aevulv7.apps.googleusercontent.com&redirect_uri=${baseUrl}/login/success&response_type=code&state=${device}&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
        val intentBuilder = CustomTabsIntent.Builder();
        val customTabsIntent = intentBuilder.build();
        customTabsIntent.intent.data = Uri.parse(url)

        customTabsActivityResultLauncher.launch(customTabsIntent.intent)
        customTabOpened = true;
    }

    @JavascriptInterface
    fun axiosCheck(res: String): String {
        return res;
    }

}


