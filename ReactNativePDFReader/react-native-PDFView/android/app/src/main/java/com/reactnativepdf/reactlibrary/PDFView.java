package com.reactnativepdf.reactlibrary;

import android.view.View;

import com.facebook.react.uimanager.ThemedReactContext;

public class PDFView extends View {
    private ThemedReactContext context;
    public PDFView(ThemedReactContext context) {
        super(context);
        this.context = context;
    }
}
