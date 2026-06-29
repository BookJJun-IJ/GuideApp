# Troubleshooting

Common issues and how to resolve them.

## I Can't Access My PCS

### Check the URL

Make sure you're using the correct URL format:
- `https://appname-yourid.nsl.sh` — for normal access
- `https://appname-yourid-ip.sslip.io` — for large file uploads

### Browser Shows a Security Warning

This can happen when SSL certificates are being renewed. Try:

1. Wait 2-3 minutes and refresh the page
2. Try a different browser
3. Clear your browser cache

### Page Loads but Shows an Error

1. Go to your PCS dashboard
2. Check if the app is running (green status indicator)
3. If it's stopped, click **Start** to restart the app
4. If it keeps crashing, try reinstalling the app from the App Store

## An App Won't Start

1. Open the app tile on your dashboard
2. Check the app's logs for error messages
3. Try restarting the app
4. If the issue persists, uninstall and reinstall the app

> **Note:** Reinstalling an app usually preserves your data because data is stored in `/DATA/AppData/`.

## Uploads Are Failing

### File Too Large

The **nsl.sh** URL has an upload size limit. For large files:

1. Use the **sslip.io** URL instead
2. The sslip.io URL has no file size limit
3. You can find your sslip.io URL in **Settings > Network**

### Upload Seems Stuck

1. Check your internet connection
2. For very large files, uploads can take a while — be patient
3. Try uploading fewer files at once

## App Shows "502 Bad Gateway" or "504 Gateway Timeout"

This means the app is starting up or temporarily unavailable:

1. Wait 30 seconds and refresh
2. If it persists, restart the app from the dashboard
3. Check if your PCS has enough free storage (Settings > System Info)

## I Forgot My Password

### PCS Dashboard Password

Contact your PCS administrator or Yundera support to reset your dashboard password.

### App-Specific Passwords

Each app manages its own accounts. Check the app's documentation for password reset options. Some apps (like Immich) require admin access to reset user passwords.

## Storage Is Full

When your PCS runs out of storage:

1. Open **Settings > System Info** to check disk usage
2. Use the **File Manager** to find and delete large files
3. Remove unused apps from the App Store
4. Clear old media from `/DATA/Media/`

## An App Is Slow

1. Check your internet connection speed
2. Restart the app from the dashboard
3. Check **Settings > System Info** — if CPU or RAM is near 100%, you may have too many apps running
4. Consider uninstalling apps you don't use

## Media Not Showing in Jellyfin

1. Make sure files are in the correct folder (`/DATA/Media/Movies/`, `/DATA/Media/TV/`, or `/DATA/Media/Music/`)
2. Open Jellyfin **Dashboard > Libraries**
3. Click **Scan All Libraries**
4. Wait for the scan to complete
5. Check that file names follow the recommended format (see the [Jellyfin guide](guide.html?doc=apps/jellyfin))

## Photos Not Backing Up to Immich

1. Open the Immich mobile app
2. Go to **Settings > Backup**
3. Make sure backup is **enabled**
4. Check that the server URL is correct
5. Ensure you have a stable internet connection
6. Check that your PCS has free storage space

## Need More Help?

If you can't find a solution here:

1. Check the specific app's guide in the Guide app for more detailed instructions
2. Contact Yundera support for PCS hardware or connectivity issues
