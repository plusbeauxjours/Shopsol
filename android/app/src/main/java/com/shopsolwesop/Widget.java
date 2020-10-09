package com.shopsolwesop;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.RemoteViews;

import org.json.JSONException;
import org.json.JSONObject;
/**
 * Implementation of App Widget functionality.
 */
public class Widget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
                                int appWidgetId) {

        CharSequence widgetText = context.getString(R.string.appwidget_text);
        try {
            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{\"text\":'no data'}");
            JSONObject appData = new JSONObject(appString);

            // Construct the RemoteViews object
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget);
            if(appData.getString("WIDGET_STATUS") != "0"){
                if(appData.getString("WIDGET_STATUS") == "1"){
                    // WIDGET_STATUS === 1
                    Intent intent = new Intent(context, MainActivity.class); //실행할 액티비티의 클래스
                    PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, 0);
                    views.setOnClickPendingIntent(R.id.appwidget_text, pendingIntent);
                    views.setTextViewText(R.id.appwidget_text, appData.getString("WIDGET_TEXT"));
                    appWidgetManager.updateAppWidget(appWidgetId, views);
                }else{
                    // WIDGET_STATUS === 2
                    if(appData.getString("WIDGET_STORE") == "0"){
                    // WIDGET_STATUS === 2 && WIDGET_STORE === 0
                    Intent intent = new Intent(context, MainActivity.class); //실행할 액티비티의 클래스
                    PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, 0);
                    views.setOnClickPendingIntent(R.id.appwidget_text, pendingIntent);
                    views.setTextViewText(R.id.appwidget_text, appData.getString("WIDGET_TEXT"));
                    appWidgetManager.updateAppWidget(appWidgetId, views);
                    }else{
                    // WIDGET_STATUS === 2 && WIDGET_STORE === 1
                    Intent intent = new Intent(context, MainActivity.class); //실행할 액티비티의 클래스
                    PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, 0);
                    views.setOnClickPendingIntent(R.id.appwidget_text, pendingIntent);
                    views.setTextViewText(R.id.appwidget_text, appData.getString("WIDGET_TEXT"));
                    appWidgetManager.updateAppWidget(appWidgetId, views);
                    }
                }
            }else{
                // WIDGET_STATUS === 0
                Intent intent = new Intent(context, MainActivity.class); //실행할 액티비티의 클래스
                PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, 0);
                views.setOnClickPendingIntent(R.id.appwidget_text, pendingIntent);
                views.setTextViewText(R.id.appwidget_text, appData.getString("WIDGET_TEXT"));
                appWidgetManager.updateAppWidget(appWidgetId, views);
            }
        }catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}