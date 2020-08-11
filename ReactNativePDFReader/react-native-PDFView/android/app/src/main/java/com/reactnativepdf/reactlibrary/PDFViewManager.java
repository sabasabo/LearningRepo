package com.reactnativepdf.reactlibrary;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class PDFViewManager extends SimpleViewManager<PDFView> {
    private static final String REACT_CLASS = "PDFView";
    private PDFView pdfView = null;
    private Context context;

    public PDFViewManager(ReactApplicationContext context) {
        this.context = context;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected PDFView createViewInstance(ThemedReactContext context) {
        if (pdfView == null) {
            pdfView = new PDFView(context);
        }
        return pdfView;
    }
}
