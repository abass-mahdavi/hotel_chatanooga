from hotel_chattanooga import app, settings, models

if __name__ == '__main__':
    app.run(debug=bool(settings.SECURITY_SETTINGS.get("DEBUG_MODE")))
