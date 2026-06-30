# Jellyfin — Your Own Netflix

Jellyfin streams your movies, TV shows, and music from your PCS to any device.

## Getting Started

1. Open **App Store** and install **Jellyfin**
2. Open Jellyfin and follow the setup wizard
3. Create an admin account

## Adding Your Media

Upload your files using the **File Manager**, then tell Jellyfin where to find them.

| What | Upload to | Jellyfin library type |
|------|----------|----------------------|
| Movies | `/DATA/Media/Movies/` | Movies |
| TV Shows | `/DATA/Media/TV/` | Shows |
| Music | `/DATA/Media/Music/` | Music |

After uploading, go to **Jellyfin Dashboard > Libraries > Scan** to pick up new files.

## File Naming

Jellyfin works best when files are organized:

```
Movies/
  Movie Name (2024)/
    Movie Name (2024).mkv

TV/
  Show Name/
    Season 01/
      S01E01.mkv
```

## Watching on Your Phone

- **iPhone**: Download **Swiftfin**
- **Android**: Download **Jellyfin**
- Enter your PCS URL and log in

## Family Accounts

1. Go to **Dashboard > Users**
2. Click **Add User**
3. Set a username, password, and which libraries they can see
