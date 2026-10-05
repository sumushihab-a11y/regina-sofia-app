package it.reginasofia.preview;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import android.graphics.Color;

public class MainActivity extends Activity {
    private WebView webView;
    private static final String HOME = "file:///android_asset/www/index.html";

    @Override public void onCreate(Bundle state) {
        super.onCreate(state);
        webView = new WebView(this);
        setContentView(webView);
        webView.setBackgroundColor(Color.rgb(249,246,239));
        getWindow().setStatusBarColor(Color.rgb(114,46,50));
        getWindow().setNavigationBarColor(Color.rgb(249,246,239));
        if (android.os.Build.VERSION.SDK_INT >= 35) {
            webView.setOnApplyWindowInsetsListener((v, insets) -> {
                android.graphics.Insets bars = insets.getInsets(android.view.WindowInsets.Type.systemBars());
                v.setPadding(bars.left, bars.top, bars.right, bars.bottom);
                return insets;
            });
        }
        WebSettings s = webView.getSettings();
        s.setDomStorageEnabled(true);
        s.setJavaScriptEnabled(true); // necessario al sito statico; nessuna JavascriptInterface nativa
        s.setAllowFileAccess(true);   // necessario per file:///android_asset e risorse bundled
        s.setAllowContentAccess(false);
        s.setAllowFileAccessFromFileURLs(false);
        s.setAllowUniversalAccessFromFileURLs(false);
        s.setJavaScriptCanOpenWindowsAutomatically(false);
        webView.setWebViewClient(new WebViewClient() {
            private boolean route(Uri uri) {
                String scheme = uri.getScheme();
                if (scheme == null) return false;
                if (scheme.equals("http") || scheme.equals("https") || scheme.equals("tel") || scheme.equals("mailto")) {
                    try { startActivity(new Intent(Intent.ACTION_VIEW, uri)); } catch (ActivityNotFoundException ignored) { Toast.makeText(MainActivity.this, "Nessuna app disponibile per aprire questo collegamento.", Toast.LENGTH_LONG).show(); }
                    return true;
                }
                // Consenti soltanto navigazione file interna al bundle assets/www.
                if (scheme.equals("file")) return !uri.toString().startsWith("file:///android_asset/www/");
                return true;
            }
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) { return route(request.getUrl()); }
            @Override public boolean shouldOverrideUrlLoading(WebView view, String url) { return route(Uri.parse(url)); }
        });
        if (state == null) webView.loadUrl(HOME); else webView.restoreState(state);
    }

    @Override protected void onSaveInstanceState(Bundle out) { webView.saveState(out); super.onSaveInstanceState(out); }
    @Override public void onBackPressed() {
        webView.evaluateJavascript("(function(){var d=document.querySelector('dialog[open]');if(d){d.close();document.body.classList.remove('modal-open');return true;}return false;})()", handled -> {
            if (!"true".equals(handled)) {
                if (webView.canGoBack()) webView.goBack(); else finish();
            }
        });
    }
    @Override protected void onDestroy() { if (webView != null) webView.destroy(); super.onDestroy(); }
}
