# Jellyfin — Media Server

Jellyfin is a self-hosted media server that lets you stream your movies, TV shows, and music from anywhere — like Netflix, but with your own content.

## Installing Jellyfin

1. Open the **App Store**
2. Search for **Jellyfin**
3. Click **Install**
4. Wait for the installation to complete

## First-Time Setup

1. Open Jellyfin from your dashboard
2. Follow the setup wizard:
   - Choose your language
   - Create an admin account
   - Add your media libraries (see below)
   - Configure remote access (leave defaults)
3. Click **Finish**

## Adding Media Libraries

Jellyfin scans specific folders for media. Your PCS has these pre-configured:

| Media Type | Folder | Content Type in Jellyfin |
|-----------|--------|--------------------------|
| Movies | `/DATA/Media/Movies/` | Movies |
| TV Shows | `/DATA/Media/TV/` | Shows |
| Music | `/DATA/Media/Music/` | Music |

To add a library:

1. Go to **Dashboard > Libraries**
2. Click **Add Media Library**
3. Choose the content type (Movies, Shows, Music)
4. Add the corresponding folder path
5. Click **OK** and wait for the scan to complete

## Organizing Your Media

### Movies

Place movie files in `/DATA/Media/Movies/`. Recommended structure:

```
/DATA/Media/Movies/
├── Movie Name (2024)/
│   └── Movie Name (2024).mkv
├── Another Movie (2023)/
│   └── Another Movie (2023).mp4
```

### TV Shows

Place TV show files in `/DATA/Media/TV/`. Recommended structure:

```
/DATA/Media/TV/
├── Show Name/
│   ├── Season 01/
│   │   ├── S01E01.mkv
│   │   └── S01E02.mkv
│   └── Season 02/
│       └── S02E01.mkv
```

### Music

Place music files in `/DATA/Media/Music/`:

```
/DATA/Media/Music/
├── Artist Name/
│   ├── Album Name/
│   │   ├── 01 - Track.flac
│   │   └── 02 - Track.flac
```

## Uploading Media

Use the **File Manager** to upload media files to the correct folders. After uploading:

1. Go to Jellyfin **Dashboard > Libraries**
2. Click the **Scan** button next to the library
3. New content will appear shortly

> **Tip:** For large video files, use the **sslip.io** URL in the File Manager — it has no upload size limit.

## Watching on Other Devices

### Phone / Tablet

- **iOS**: Download "Swiftfin" from the App Store
- **Android**: Download "Jellyfin" from Google Play
- Enter your PCS URL (e.g., `https://jellyfin-yourid.nsl.sh`)
- Log in with your Jellyfin account

### Smart TV

- **Android TV**: Install the Jellyfin app from Google Play
- **Other TVs**: Use the web browser on your TV to open the Jellyfin URL

### Desktop

- Open your browser and go to your Jellyfin URL
- Or download the [Jellyfin Media Player](https://jellyfin.org/downloads/) desktop app

## Creating Users

You can create accounts for family members:

1. Go to **Dashboard > Users**
2. Click **Add User**
3. Set a username and password
4. Choose which libraries they can access
5. Click **Save**
