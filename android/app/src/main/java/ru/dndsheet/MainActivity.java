package ru.dndsheet;
import android.content.res.Configuration;
import android.webkit.WebSettings;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    void syncDarkMode() {
        int nightModeFlags = getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
        WebSettings webSettings = this.bridge.getWebView().getSettings();

        String darkMode = " AndroidDarkMode";
        String userAgent = webSettings.getUserAgentString();
        if (nightModeFlags == Configuration.UI_MODE_NIGHT_YES) {
            if (!userAgent.contains(darkMode)) {
                userAgent = userAgent + darkMode;
                webSettings.setUserAgentString(userAgent);
            }
        } else {
            if (userAgent.contains(darkMode)) {
                userAgent = userAgent.replace(darkMode, "");
                webSettings.setUserAgentString(userAgent);
            }
        }
    }

    @Override
    public void onStart() {
        super.onStart();
        syncDarkMode();
    }

    @Override
    public void onResume() {
        super.onResume();
        syncDarkMode();
    }
}

