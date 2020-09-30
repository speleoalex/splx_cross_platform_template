cd %~dp0
echo {"download": {"directory_upgrade": true,"extensions_to_open": "","prompt_for_download": true}} > chrome/Default/Preferences

start chrome.exe  --app-window-size=1024,768  --user-data-dir="%~dp0chrome" --app="file:%~dp0index.html"
