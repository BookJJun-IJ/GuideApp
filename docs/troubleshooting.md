# Troubleshooting

Something not working? Here are the most common fixes.

## I Can't Access My PCS

- **Check the URL** — make sure it ends with `.nsl.sh`
- **Wait a moment** — SSL certificates sometimes take a minute to renew
- **Try a different browser** or clear your cache

## An App Won't Open

1. Go to your dashboard
2. Check if the app shows a green status
3. If it's stopped, click to restart it
4. Still broken? Uninstall and reinstall from the App Store

> **Good to know:** Reinstalling usually keeps your data, since data lives in `/DATA/AppData/`.

## Uploads Are Failing

**File too large?** Switch to your **sslip.io** URL — it has no size limit. Your nsl.sh URL has a limit for security.

**Stuck?** Try uploading fewer files at once.

## 502 or 504 Error

The app is starting up or temporarily busy.

1. Wait 30 seconds and refresh
2. If it continues, restart the app from the dashboard
3. Check Settings > System Info — you might be out of storage

## Media Not Showing in Jellyfin

1. Make sure files are in `/DATA/Media/Movies/` or `/DATA/Media/TV/`
2. Go to Jellyfin **Dashboard > Libraries > Scan**
3. Check file naming (see the Jellyfin guide)

## Photos Not Backing Up

1. Open the Immich app on your phone
2. Go to **Settings > Backup**
3. Make sure it's turned on
4. Check that the server URL is correct
5. Make sure you have storage space left

## I Forgot My Password

**Dashboard password** — contact Yundera support.
**App password** — each app manages its own accounts. Check the app's settings.

## Still Stuck?

Check the detailed guide for your specific app, or contact Yundera support.
