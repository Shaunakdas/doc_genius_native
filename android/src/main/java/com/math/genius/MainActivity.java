package com.math.genius;
import android.content.SharedPreferences;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
    public static final String LINK_PREFS = "LinkingPrefs";

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "connecpath";
    }
}
