/* ===================================================================
   Start Here — Cedric Prototype + Guide Page
   =================================================================== */
(function () {
'use strict';

var DOCS_BASE = 'https://raw.githubusercontent.com/BookJJun-IJ/GuideApp/main/docs';

/* ===================================================================
   INDEX PAGE — embedded data, no fetch required
   =================================================================== */
if (document.getElementById('grid')) {

const ACCENT = { pink:"#ee2a7b", blue:"#27aae1" };
const CHK = '<svg viewBox="0 0 24 24" fill="none"><path d="m5 12 4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/* language-agnostic metadata */
const GOALS = [
  { id:"photos",   emoji:"📸", accent:"pink", common:true,  installed:true,  replaces:"Google Photos",      app:"Immich",     where:"photos.yourname.nsl.sh", cats:["photos","google","immich","pictures","backup","photo"] },
  { id:"media",    emoji:"🎬", accent:"blue", common:true,  installed:false, replaces:"Netflix",            app:"Jellyfin",   where:"watch.yourname.nsl.sh",  cats:["movies","tv","netflix","jellyfin","plex","stream","music","media","film"] },
  { id:"files",    emoji:"🗂️", accent:"blue", common:true,  installed:false, replaces:"Google Drive",       app:"Nextcloud",  where:"files.yourname.nsl.sh",  cats:["files","drive","dropbox","nextcloud","documents","share","cloud","storage","fichiers"] },
  { id:"passwords",emoji:"🔐", accent:"blue", common:true,  installed:false, replaces:"1Password or LastPass",app:"Vaultwarden",where:"vault.yourname.nsl.sh", cats:["password","passwords","vaultwarden","bitwarden","login","1password","lastpass","secure","vault","mot de passe"] },
  { id:"games",    emoji:"🎮", accent:"pink", common:true,  installed:false, replaces:null,                 app:"Minecraft",  where:"play.yourname.nsl.sh",   cats:["minecraft","game","server","crafty","terraria","multiplayer","games","jeu"] },
  { id:"website",  emoji:"🌐", accent:"blue", common:false, installed:false, replaces:"Wix or Squarespace", app:"WordPress",  where:"www.yourname.nsl.sh",    cats:["website","wordpress","blog","odoo","silex","site","web","domain"] },
  { id:"ai",       emoji:"🤖", accent:"pink", common:false, installed:false, replaces:"ChatGPT",            app:"an AI app",  where:"ai.yourname.nsl.sh",     cats:["ai","chatgpt","llama","mistral","deepseek","assistant","mcp","ia"], cta:{en:"Browse AI apps",fr:"Voir les apps d'IA",ko:"AI 앱 둘러보기"} },
  { id:"send",     emoji:"📤", accent:"blue", common:false, installed:false, replaces:"WeTransfer",         app:"PsiTransfer",where:"send.yourname.nsl.sh",   cats:["send","transfer","wetransfer","psitransfer","big file","large file","share","upload","link","envoyer"] },
  { id:"vpn",      emoji:"🛡️", accent:"pink", common:false, installed:false, replaces:"a paid VPN",         app:"WireGuard",  where:"vpn.yourname.nsl.sh",    cats:["vpn","wireguard","openvpn","private","secure","browse","tunnel","nordvpn","wifi"] },
  { id:"convert",  emoji:"🔄", accent:"pink", common:false, installed:false, replaces:"online converters",  app:"ConvertX",   where:"convert.yourname.nsl.sh",cats:["convert","converter","convertx","pdf","format","file","image","video","compress"] },
  { id:"backup",   emoji:"🛟", accent:"blue", common:false, installed:false, replaces:null,                 app:"Duplicati",  where:"backup.yourname.nsl.sh", cats:["backup","duplicati","safety","restore","copy","sauvegarde"] },
  { id:"custom",   emoji:"📦", accent:"blue", common:false, installed:false, devOnly:true, replaces:null,    app:"Custom Install", where:"app.yourname.nsl.sh", cats:["docker","compose","custom","container","ssh","terminal"], cta:{en:"Open Custom Install",fr:"Ouvrir Custom Install",ko:"커스텀 설치 열기"} },
  { id:"build",    emoji:"🛠️", accent:"pink", common:false, installed:false, devOnly:true, replaces:null,    app:"the repo",   where:"github.com/Yundera/AppStore", cats:["appstore","contribute","package","caddy","label","pr","build"], cta:{en:"Open the AppStore repo",fr:"Ouvrir le dépôt AppStore",ko:"AppStore 저장소 열기"} }
];

/* translations */
const T = {
  en:{
    ui:{ brandName:"Start Here", brandSub:"Your Personal Cloud Server", showMe:"Show me",
      seg:["First time","I've done this","Developer"], searchPh:"Search: photos, passwords, minecraft…",
      setupLead:"Get set up", quick:n=>n+" quick thing"+(n>1?"s":""), allDone:"All done 🎉",
      featTitle:"First time? Start with your photos.", featSub:"It's the easiest one, and takes about 2 minutes.",
      moreBtn:"Show more goals", emptyB:"No match for that yet",
      emptyP:"Try a simpler word like \u201cphotos\u201d, \u201cmovies\u201d or \u201cwebsite\u201d, or browse the App Store for the full catalogue.",
      openStore:"Open App Store", askTeam:"Ask the team", stepsLabel:"How to do it",
      min2:"About 2 minutes", safe:"You can't break anything",
      openBrowser:"You'll open it in your web browser, just like any website.",
      livesPre:"Lives at ", livesPost:", ready with HTTPS.", replacesWord:"Replaces ",
      installedPill:"Already on your cloud", onDock:"On your cloud", maybeLater:"Maybe later",
      stuckPre:"Stuck on a step? ", stuckLink:"Ask us, we'll help.",
      cta:{ open:a=>"Open "+a, get:a=>"Get "+a, install:a=>"Install "+a } },
    copy:{
      new:{h:'What would you like to <span class="em">do</span>?', p:"Your cloud is ready. Pick a goal in plain words and we'll show you the few taps to get there. No tech knowledge needed.", kicker:"Get started", grid:"I want to…", hint:"Tap a goal", helpT:"Can't find what you're after?", helpP:"There are 128 apps in the store. Search it, or ask us, we read every message.", featured:true},
      comfortable:{h:'Your cloud, <span class="em">your call</span>.', p:"Choose what you want to run. Each goal gives you the app and the short path to a working setup.", kicker:"Set up", grid:"I want to set up…", hint:"Tap a goal", helpT:"Want the full catalogue?", helpP:"Browse 128 maintained open-source apps in the App Store.", featured:false},
      dev:{h:'Welcome. Let\'s <span class="em">ship</span>.', p:"PCS runs CasaOS on Docker with NSL.SH handling routing and TLS. Pick a goal, or go straight to custom apps and packaging.", kicker:"Tasks", grid:"Common tasks", hint:"Tap a task", helpT:"Building on the PCS?", helpP:"Custom Docker apps, SSH, MCPs and AppStore contribution are all open to you.", featured:false}
    },
    setup:{ new:["Create your login","Make it yours","Install your first app"], comfortable:["Create your account","Set language & widgets","Install your first app"], dev:["Create admin account","Grab SSH access","Install or package an app"] },
    goals:{
      photos:{ new:{title:"Keep my photos somewhere private",analogy:"Your own Google Photos",payoff:"All your phone photos, saved on your own cloud. Private, and yours forever.",steps:["In the App Store, find <b>Immich</b> and tap Install.","Open Immich and create your account.","Add the Immich app to your phone, scan the code, and your photos back up on their own."]},
        comfortable:{title:"Self-host my photo library",analogy:"Immich, private photo backup",payoff:"A private, full-quality photo library with automatic phone backup.",steps:["Install <b>Immich</b> from the App Store (auto-updates on).","Sign in at your photos subdomain.","Add the mobile app, point it at your server, enable background backup."]},
        dev:{title:"Deploy Immich",analogy:"Immich, ML photo stack",payoff:"Immich with ML, Postgres and Redis wired by the manifest.",steps:["Install Immich; the manifest wires the ML, Postgres and Redis services for you.","TLS and the subdomain are provisioned via NSL.SH automatically.","Mobile app, server URL, background sync. Mount external libraries under /DATA if needed."]} },
      media:{ new:{title:"Watch my movies & shows anywhere",analogy:"Your own Netflix",payoff:"Your films and shows, ready to play on any screen in the house.",steps:["In the App Store, find <b>Jellyfin</b> (or Plex) and tap Install.","Add your videos using the Files app.","Open it on your TV, computer or phone and press play."]},
        comfortable:{title:"Stream my media library",analogy:"Jellyfin or Plex, your media server",payoff:"A Netflix-style library you control, streamable to every device.",steps:["Install <b>Jellyfin</b> or <b>Plex</b>.","Drop media into /media/Movies and /media/TV, then let it scan.","Sign in from any device; add users for the family."]},
        dev:{title:"Run Jellyfin / Plex",analogy:"Self-hosted media server",payoff:"Self-hosted media server with multi-user libraries.",steps:["Install Jellyfin or Plex; map your media volumes in the app config.","Point libraries at the mounted folders, trigger a scan.","For hardware transcode, request a GPU-capable server upgrade."]} },
      files:{ new:{title:"Replace Google Drive or Dropbox",analogy:"Your own cloud drive",payoff:"Your documents in one place you can open anywhere, and share with a link.",steps:["In the App Store, find <b>Nextcloud</b> and tap Install.","Upload your files, or copy a folder from your computer.","To send something, make a share link, add a password if you want."]},
        comfortable:{title:"Self-host files & sharing",analogy:"Nextcloud, files, sync, share",payoff:"Your own Drive with desktop sync and expiring share links.",steps:["Install <b>Nextcloud</b>.","Install the desktop or mobile sync client and connect to your subdomain.","Create users, set quotas, share with expiring links."]},
        dev:{title:"Deploy Nextcloud",analogy:"Nextcloud, Drive replacement",payoff:"Nextcloud with DB + app containers from the manifest.",steps:["Install Nextcloud (DB + app containers handled by the manifest).","Connect sync clients to the TLS subdomain.","Tune via config.php / occ from the terminal as needed."]} },
      passwords:{ new:{title:"Keep all my passwords safe",analogy:"Your own password keeper",payoff:"All your passwords in one safe place only you can open, on your phone and computer.",steps:["In the App Store, find <b>Vaultwarden</b> and tap Install.","Open it and create one main password (the only one you'll need to remember).","Add the Bitwarden app or browser add-on, it fills your logins for you."]},
        comfortable:{title:"Self-host my password vault",analogy:"Vaultwarden, Bitwarden-compatible",payoff:"A private Bitwarden server that works with all the official apps.",steps:["Install <b>Vaultwarden</b>.","Create your account at your vault subdomain.","Point the Bitwarden apps and browser extensions at your server URL."]},
        dev:{title:"Deploy Vaultwarden",analogy:"Vaultwarden, Bitwarden API in Rust",payoff:"Lightweight Bitwarden-compatible vault on your PCS.",steps:["Install Vaultwarden; TLS subdomain auto-provisioned.","Set the admin token via env to reach /admin.","Point official Bitwarden clients at the server URL."]} },
      games:{ new:{title:"Run a Minecraft server for friends",analogy:"Your own game server",payoff:"A Minecraft world your friends can join, running on your own server.",steps:["In the App Store, find the <b>Minecraft</b> app and tap Install.","Choose your world and add your friends to the list.","Give friends your address and they join from the game."]},
        comfortable:{title:"Host a Minecraft server",analogy:"Crafty Controller, game panel",payoff:"A managed Minecraft server with a web control panel.",steps:["Install <b>Crafty Controller</b>.","Create a server instance, pick the version and memory, start it.","Open the port, share host:port, manage from the web panel."]},
        dev:{title:"Game server panel",analogy:"Crafty Controller (multi-server)",payoff:"Multi-instance Java/Bedrock management with a web console.",steps:["Install Crafty; it manages multiple Java/Bedrock instances.","Configure JVM args and schedules in the panel.","Expose the game port; WebSocket console passthrough is pre-wired."]} },
      website:{ new:{title:"Put a website online",analogy:"Your own site, no monthly fees",payoff:"Your own website online, with no monthly fees.",steps:["In the App Store, find <b>WordPress</b> and tap Install.","Choose a look and write your first page.","Press publish, your site is online right away."]},
        comfortable:{title:"Host my own website",analogy:"WordPress, Odoo, Silex",payoff:"A self-hosted CMS on your domain with HTTPS, no hosting bill.",steps:["Install <b>WordPress</b> (or Odoo for business, Silex for no-code).","Set your theme, pages and menus.","Already served on your subdomain with TLS, point a custom domain if you want."]},
        dev:{title:"Host a CMS",analogy:"WordPress, Odoo, Silex",payoff:"CMS with provisioned DB; custom domain via CNAME + ACME.",steps:["Install the CMS; DB is provisioned by the manifest.","Custom domain via CNAME, ACME handles the cert.","Drop into the container for wp-cli / themes as needed."]} },
      ai:{ new:{title:"Use AI that stays private",analogy:"A ChatGPT that lives on your server",payoff:"A private AI you can chat with. Nothing you type ever leaves your server.",steps:["In the App Store, open the AI section.","Pick a private assistant and tap Install.","Start chatting, your messages stay on your server."]},
        comfortable:{title:"Run private AI tools",analogy:"Local models, agentic MCPs",payoff:"Local models and MCP agents that act across your own apps.",steps:["Install a local model app, or connect Claude via API for the MCPs.","The MCPs can read and sort files across your apps.","Contact us for a server upgrade if you want heavier local models."]},
        dev:{title:"Private AI & MCP",analogy:"MCP agents on your PCS",payoff:"MCP servers on the PCS linking files, browser and notes.",steps:["Local inference needs a GPU upgrade, ask the team.","MCP servers run on the PCS and link your apps (files, browser, notes).","Wire agentic flows via Claude API tokens or n8n."]} },
      send:{ new:{title:"Send a big file to someone",analogy:"Your own WeTransfer",payoff:"Send large files with a link, no size limit, no ads, and the link stays yours.",steps:["In the App Store, find <b>PsiTransfer</b> and tap Install.","Open it and drag your file into the box.","Copy the link it gives you and send it to anyone."]},
        comfortable:{title:"Self-host file transfers",analogy:"PsiTransfer, WeTransfer alternative",payoff:"Private, unlimited file transfers straight from your own server.",steps:["Install <b>PsiTransfer</b>.","Drag-drop files and set an expiry on the share.","Send the link, downloads come straight from your server."]},
        dev:{title:"Run PsiTransfer",analogy:"PsiTransfer, self-hosted transfers",payoff:"Self-hosted large-file transfer with expiry control.",steps:["Install PsiTransfer; TLS subdomain auto-provisioned.","Set max size / retention via env.","Front it on your subdomain for direct client downloads."]} },
      vpn:{ new:{title:"Browse privately on public Wi-Fi",analogy:"Your own VPN",payoff:"A private tunnel for your phone and laptop, so your connection stays yours on any network.",steps:["In the App Store, find <b>WireGuard</b> (or OpenVPN) and tap Install.","Open it and create a connection for your device.","Scan the code on your phone, switch it on, and you're protected."]},
        comfortable:{title:"Set up a personal VPN",analogy:"WireGuard, OpenVPN",payoff:"A self-hosted VPN to reach your cloud and browse securely anywhere.",steps:["Install <b>WireGuard</b> or OpenVPN.","Generate a config for each device.","Import the config, connect, you're on your own network."]},
        dev:{title:"Deploy a VPN",analogy:"WireGuard, encrypted tunnel",payoff:"WireGuard peers over the mesh.",steps:["Install WireGuard; add a peer per device.","Distribute configs / QR codes.","Tunnel UDP and TCP over the mesh via NSL.SH."]} },
      convert:{ new:{title:"Change a file into another type",analogy:"Your own file converter",payoff:"Turn a photo, document or video into another format, without uploading it to a random website.",steps:["In the App Store, find <b>ConvertX</b> and tap Install.","Open it and drop in your file.","Pick the format you want and download the result."]},
        comfortable:{title:"Self-host file conversion",analogy:"ConvertX, 1000+ formats",payoff:"Private conversion across 1000+ formats, nothing leaves your server.",steps:["Install <b>ConvertX</b>.","Upload files at your convert subdomain.","Batch-convert, everything stays local."]},
        dev:{title:"Run ConvertX",analogy:"ConvertX, format conversion",payoff:"Self-hosted converter supporting 1000+ formats.",steps:["Install ConvertX; TLS subdomain auto-provisioned.","Use the web UI, or call it from your own tools.","Mount a working dir under /DATA for large jobs."]} },
      backup:{ new:{title:"Keep a safe copy of everything",analogy:"A safety net for your stuff",payoff:"A second copy of everything, made automatically while you sleep.",steps:["In the App Store, find <b>Duplicati</b> and tap Install.","Choose what to save and where (like Google Drive).","Set it to run each night, it happens on its own."]},
        comfortable:{title:"Set up encrypted backups",analogy:"Duplicati, scheduled, off-site",payoff:"Scheduled, encrypted, off-site backups of your app data.",steps:["Install <b>Duplicati</b>.","Point a job at /DATA/AppData and pick a remote destination.","Schedule it, set retention, and add a second off-site job."]},
        dev:{title:"Backup strategy",analogy:"Duplicati / snapshots",payoff:"App-data backups plus full-image server snapshots.",steps:["Duplicati for app-data, off-site (SFTP/B2/Drive).","Combine with server snapshots for full-image recovery.","Multiple jobs, per-folder schedules, encrypted at rest and in transit."]} },
      custom:{ dev:{title:"Install a custom app",analogy:"Any Docker image",payoff:"Any Docker image, routed and TLS-terminated on a subdomain.",steps:["Use Custom Install in the App Store, or drop a compose file.","SSH/terminal access is available, server key on request.","Add the standard Caddy labels for routing and TLS and it's reachable on a subdomain."]} },
      build:{ dev:{title:"Package an app for the Store",analogy:"Contribute to the AppStore",payoff:"A reviewed app in the Yundera AppStore.",steps:["Fork the AppStore repo; follow CONTRIBUTING.md.","Add the compose + CasaOS manifest, set Caddy labels (WebSocket passthrough if needed).","Decide native auth vs nginx-hash-lock sidecar, write rationale.md, open a PR."]} }
    }
  },

  fr:{
    ui:{ brandName:"Commencer ici", brandSub:"Votre serveur cloud personnel", showMe:"Afficher",
      seg:["Première fois","Je connais déjà","Développeur"], searchPh:"Rechercher : photos, mots de passe, minecraft…",
      setupLead:"Pour démarrer", quick:n=>n+" chose"+(n>1?"s":"")+" à faire", allDone:"C'est fait 🎉",
      featTitle:"Première fois ? Commencez par vos photos.", featSub:"C'est le plus simple, et ça prend environ 2 minutes.",
      moreBtn:"Voir plus d'objectifs", emptyB:"Aucun résultat pour l'instant",
      emptyP:"Essayez un mot plus simple comme \u00ab photos \u00bb, \u00ab films \u00bb ou \u00ab site web \u00bb, ou parcourez l'App Store pour tout voir.",
      openStore:"Ouvrir l'App Store", askTeam:"Nous contacter", stepsLabel:"Comment faire",
      min2:"Environ 2 minutes", safe:"Vous ne risquez rien",
      openBrowser:"Vous l'ouvrirez dans votre navigateur, comme un site web.",
      livesPre:"Accessible sur ", livesPost:", déjà sécurisé en HTTPS.", replacesWord:"Remplace ",
      installedPill:"Déjà sur votre cloud", onDock:"Sur votre cloud", maybeLater:"Plus tard",
      stuckPre:"Bloqué à une étape ? ", stuckLink:"Écrivez-nous, on vous aide.",
      cta:{ open:a=>"Ouvrir "+a, get:a=>"Installer "+a, install:a=>"Installer "+a } },
    copy:{
      new:{h:'<span class="em">Que</span> voulez-vous faire ?', p:"Votre cloud est prêt. Choisissez un objectif en mots simples, et on vous montre les quelques étapes pour y arriver. Aucune compétence technique requise.", kicker:"Pour commencer", grid:"Je veux…", hint:"Touchez un objectif", helpT:"Vous ne trouvez pas ?", helpP:"Il y a 128 applis dans l'App Store. Cherchez, ou écrivez-nous : on lit chaque message.", featured:true},
      comfortable:{h:'Votre cloud, <span class="em">vos règles</span>.', p:"Choisissez ce que vous voulez installer. Chaque objectif vous donne l'appli et le chemin court vers une installation qui marche.", kicker:"Configurer", grid:"Je veux configurer…", hint:"Touchez un objectif", helpT:"Vous voulez tout le catalogue ?", helpP:"Parcourez 128 applis open source maintenues dans l'App Store.", featured:false},
      dev:{h:'Bienvenue. <span class="em">On déploie</span>.', p:"Le PCS tourne sous CasaOS sur Docker, NSL.SH gère le routage et le TLS. Choisissez un objectif, ou allez directement aux apps custom et au packaging.", kicker:"Tâches", grid:"Tâches courantes", hint:"Touchez une tâche", helpT:"Vous développez sur le PCS ?", helpP:"Apps Docker custom, SSH, MCPs et contribution à l'AppStore : tout vous est ouvert.", featured:false}
    },
    setup:{ new:["Créez votre identifiant","Personnalisez","Installez votre première appli"], comfortable:["Créez votre compte","Langue et widgets","Installez votre première appli"] },
    goals:{
      photos:{ new:{title:"Garder mes photos en privé",analogy:"Votre propre Google Photos",payoff:"Toutes les photos de votre téléphone, enregistrées sur votre cloud. Privées, et à vous pour toujours.",steps:["Dans l'App Store, trouvez <b>Immich</b> et appuyez sur Installer.","Ouvrez Immich et créez votre compte.","Installez l'appli Immich sur votre téléphone, scannez le code, et vos photos se sauvegardent toutes seules."]},
        comfortable:{title:"Héberger ma photothèque",analogy:"Immich, sauvegarde photo privée",payoff:"Une photothèque privée en pleine qualité, avec sauvegarde automatique du téléphone.",steps:["Installez <b>Immich</b> depuis l'App Store (mises à jour auto activées).","Connectez-vous sur votre sous-domaine photos.","Ajoutez l'appli mobile, pointez-la vers votre serveur, activez la sauvegarde en arrière-plan."]} },
      media:{ new:{title:"Regarder mes films et séries partout",analogy:"Votre propre Netflix",payoff:"Vos films et séries, prêts à jouer sur tous les écrans de la maison.",steps:["Dans l'App Store, trouvez <b>Jellyfin</b> (ou Plex) et appuyez sur Installer.","Ajoutez vos vidéos avec l'appli Fichiers.","Ouvrez-le sur votre TV, ordinateur ou téléphone, et lancez la lecture."]},
        comfortable:{title:"Diffuser ma médiathèque",analogy:"Jellyfin ou Plex, votre serveur média",payoff:"Une médiathèque façon Netflix que vous contrôlez, sur tous vos appareils.",steps:["Installez <b>Jellyfin</b> ou <b>Plex</b>.","Déposez vos médias dans /media/Movies et /media/TV, puis lancez l'analyse.","Connectez-vous depuis n'importe quel appareil ; ajoutez des comptes pour la famille."]} },
      files:{ new:{title:"Remplacer Google Drive ou Dropbox",analogy:"Votre propre espace cloud",payoff:"Vos documents au même endroit, accessibles partout, et partageables par lien.",steps:["Dans l'App Store, trouvez <b>Nextcloud</b> et appuyez sur Installer.","Envoyez vos fichiers, ou copiez un dossier depuis votre ordinateur.","Pour partager, créez un lien, avec un mot de passe si vous voulez."]},
        comfortable:{title:"Héberger mes fichiers et partages",analogy:"Nextcloud, fichiers, sync, partage",payoff:"Votre propre Drive avec sync sur ordinateur et liens de partage à expiration.",steps:["Installez <b>Nextcloud</b>.","Installez le client de synchro (ordinateur ou mobile) et connectez-le à votre sous-domaine.","Créez des comptes, fixez des quotas, partagez avec des liens qui expirent."]} },
      passwords:{ new:{title:"Garder tous mes mots de passe en sécurité",analogy:"Votre propre gestionnaire de mots de passe",payoff:"Tous vos mots de passe au même endroit, que vous seul pouvez ouvrir, sur téléphone et ordinateur.",steps:["Dans l'App Store, trouvez <b>Vaultwarden</b> et appuyez sur Installer.","Ouvrez-le et créez un mot de passe principal (le seul à retenir).","Ajoutez l'appli Bitwarden ou l'extension de navigateur, elle remplit vos connexions à votre place."]},
        comfortable:{title:"Héberger mon coffre de mots de passe",analogy:"Vaultwarden, compatible Bitwarden",payoff:"Un serveur Bitwarden privé qui marche avec toutes les applis officielles.",steps:["Installez <b>Vaultwarden</b>.","Créez votre compte sur votre sous-domaine coffre.","Pointez les applis et extensions Bitwarden vers l'URL de votre serveur."]} },
      games:{ new:{title:"Lancer un serveur Minecraft pour mes amis",analogy:"Votre propre serveur de jeu",payoff:"Un monde Minecraft où vos amis peuvent jouer, sur votre propre serveur.",steps:["Dans l'App Store, trouvez l'appli <b>Minecraft</b> et appuyez sur Installer.","Choisissez votre monde et ajoutez vos amis à la liste.","Donnez votre adresse à vos amis, ils rejoignent depuis le jeu."]},
        comfortable:{title:"Héberger un serveur Minecraft",analogy:"Crafty Controller, panneau de jeu",payoff:"Un serveur Minecraft géré avec un panneau de contrôle web.",steps:["Installez <b>Crafty Controller</b>.","Créez une instance de serveur, choisissez la version et la mémoire, démarrez.","Ouvrez le port, partagez hôte:port, gérez depuis le panneau web."]} },
      website:{ new:{title:"Mettre un site web en ligne",analogy:"Votre propre site, sans abonnement",payoff:"Votre site web en ligne, sans frais mensuels.",steps:["Dans l'App Store, trouvez <b>WordPress</b> et appuyez sur Installer.","Choisissez un thème et écrivez votre première page.","Appuyez sur Publier, votre site est en ligne tout de suite."]},
        comfortable:{title:"Héberger mon propre site",analogy:"WordPress, Odoo, Silex",payoff:"Un CMS auto-hébergé sur votre domaine en HTTPS, sans facture d'hébergement.",steps:["Installez <b>WordPress</b> (ou Odoo pour le pro, Silex pour le no-code).","Réglez votre thème, vos pages et vos menus.","Déjà servi sur votre sous-domaine en TLS, ajoutez un domaine perso si vous voulez."]} },
      ai:{ new:{title:"Utiliser une IA qui reste privée",analogy:"Un ChatGPT qui vit sur votre serveur",payoff:"Une IA privée avec qui discuter. Rien de ce que vous tapez ne quitte votre serveur.",steps:["Dans l'App Store, ouvrez la section IA.","Choisissez un assistant privé et appuyez sur Installer.","Commencez à discuter, vos messages restent sur votre serveur."]},
        comfortable:{title:"Faire tourner des outils d'IA privés",analogy:"Modèles locaux, MCP agentiques",payoff:"Des modèles locaux et des agents MCP qui agissent sur vos propres applis.",steps:["Installez une appli de modèle local, ou connectez Claude par API pour les MCP.","Les MCP peuvent lire et trier les fichiers de vos applis.","Contactez-nous pour une montée en gamme du serveur si vous voulez des modèles plus lourds."]} },
      send:{ new:{title:"Envoyer un gros fichier à quelqu'un",analogy:"Votre propre WeTransfer",payoff:"Envoyez de gros fichiers par lien, sans limite de taille, sans pub, et le lien reste à vous.",steps:["Dans l'App Store, trouvez <b>PsiTransfer</b> et appuyez sur Installer.","Ouvrez-le et glissez votre fichier dans la zone.","Copiez le lien obtenu et envoyez-le à qui vous voulez."]},
        comfortable:{title:"Héberger mes transferts de fichiers",analogy:"PsiTransfer, alternative à WeTransfer",payoff:"Des transferts privés et illimités directement depuis votre serveur.",steps:["Installez <b>PsiTransfer</b>.","Glissez-déposez vos fichiers et fixez une expiration au partage.","Envoyez le lien, les téléchargements viennent direct de votre serveur."]} },
      vpn:{ new:{title:"Naviguer en privé sur le Wi-Fi public",analogy:"Votre propre VPN",payoff:"Un tunnel privé pour votre téléphone et votre ordinateur, pour que votre connexion reste à vous sur n'importe quel réseau.",steps:["Dans l'App Store, trouvez <b>WireGuard</b> (ou OpenVPN) et appuyez sur Installer.","Ouvrez-le et créez une connexion pour votre appareil.","Scannez le code sur votre téléphone, activez-le, vous êtes protégé."]},
        comfortable:{title:"Mettre en place un VPN personnel",analogy:"WireGuard, OpenVPN",payoff:"Un VPN auto-hébergé pour accéder à votre cloud et naviguer en sécurité partout.",steps:["Installez <b>WireGuard</b> ou OpenVPN.","Générez une config pour chaque appareil.","Importez la config, connectez-vous, vous êtes sur votre propre réseau."]} },
      convert:{ new:{title:"Convertir un fichier dans un autre format",analogy:"Votre propre convertisseur de fichiers",payoff:"Transformez une photo, un document ou une vidéo dans un autre format, sans l'envoyer sur un site inconnu.",steps:["Dans l'App Store, trouvez <b>ConvertX</b> et appuyez sur Installer.","Ouvrez-le et déposez votre fichier.","Choisissez le format voulu et téléchargez le résultat."]},
        comfortable:{title:"Héberger la conversion de fichiers",analogy:"ConvertX, plus de 1000 formats",payoff:"Conversion privée pour plus de 1000 formats, rien ne quitte votre serveur.",steps:["Installez <b>ConvertX</b>.","Envoyez vos fichiers sur votre sous-domaine de conversion.","Convertissez par lots, tout reste en local."]} },
      backup:{ new:{title:"Garder une copie de sauvegarde de tout",analogy:"Un filet de sécurité pour vos données",payoff:"Une seconde copie de tout, faite automatiquement pendant votre sommeil.",steps:["Dans l'App Store, trouvez <b>Duplicati</b> et appuyez sur Installer.","Choisissez quoi sauvegarder et où (comme Google Drive).","Réglez-le pour tourner chaque nuit, ça se fait tout seul."]},
        comfortable:{title:"Mettre en place des sauvegardes chiffrées",analogy:"Duplicati, planifié, hors site",payoff:"Des sauvegardes planifiées, chiffrées et hors site de vos données d'applis.",steps:["Installez <b>Duplicati</b>.","Pointez une tâche vers /DATA/AppData et choisissez une destination distante.","Planifiez-la, fixez la rétention, et ajoutez une seconde tâche hors site."]} }
    }
  },

  ko:{
    ui:{ brandName:"시작하기", brandSub:"나만의 개인 클라우드 서버", showMe:"보기",
      seg:["처음이에요","해본 적 있어요","개발자"], searchPh:"검색: 사진, 비밀번호, 마인크래프트…",
      setupLead:"시작 준비", quick:n=>n+"가지 할 일", allDone:"모두 완료 🎉",
      featTitle:"처음이세요? 사진부터 시작해 보세요.", featSub:"가장 쉬운 작업이고, 약 2분이면 됩니다.",
      moreBtn:"목표 더 보기", emptyB:"아직 일치하는 항목이 없어요",
      emptyP:"'사진', '영화', '웹사이트'처럼 더 간단한 단어로 검색하거나, App Store에서 전체 목록을 둘러보세요.",
      openStore:"App Store 열기", askTeam:"문의하기", stepsLabel:"이렇게 하세요",
      min2:"약 2분", safe:"망가뜨릴 걱정 없어요",
      openBrowser:"웹사이트처럼 브라우저에서 바로 열 수 있어요.",
      livesPre:"주소: ", livesPost:" (HTTPS 보안 적용됨)", replacesWord:"대체: ",
      installedPill:"이미 설치됨", onDock:"설치됨", maybeLater:"나중에",
      stuckPre:"막히셨나요? ", stuckLink:"문의해 주세요, 도와드릴게요.",
      cta:{ open:a=>a+" 열기", get:a=>a+" 설치하기", install:a=>a+" 설치하기" } },
    copy:{
      new:{h:'<span class="em">무엇을</span> 하고 싶으세요?', p:"클라우드가 준비됐어요. 쉬운 말로 목표를 고르면, 거기까지 가는 몇 번의 단계를 알려드려요. 기술 지식은 필요 없어요.", kicker:"시작하기", grid:"하고 싶은 것", hint:"목표를 선택하세요", helpT:"찾는 게 없나요?", helpP:"App Store에 128개의 앱이 있어요. 검색하거나 문의해 주세요. 모든 메시지를 읽습니다.", featured:true},
      comfortable:{h:'당신의 클라우드, <span class="em">당신 마음대로</span>.', p:"설치할 것을 직접 고르세요. 각 목표마다 앱과 작동하는 설정까지의 짧은 경로를 알려드려요.", kicker:"설정", grid:"설정하고 싶은 것", hint:"목표를 선택하세요", helpT:"전체 목록을 보고 싶나요?", helpP:"App Store에서 관리되는 128개의 오픈소스 앱을 둘러보세요.", featured:false},
      dev:{h:'환영합니다. <span class="em">배포해 볼까요</span>.', p:"PCS는 Docker 위에서 CasaOS로 동작하고, NSL.SH가 라우팅과 TLS를 처리합니다. 목표를 고르거나, 커스텀 앱과 패키징으로 바로 가세요.", kicker:"작업", grid:"자주 하는 작업", hint:"작업을 선택하세요", helpT:"PCS 위에서 개발하시나요?", helpP:"커스텀 Docker 앱, SSH, MCP, AppStore 기여까지 모두 열려 있습니다.", featured:false}
    },
    setup:{ new:["로그인 만들기","나만의 공간 꾸미기","첫 앱 설치하기"], comfortable:["계정 만들기","언어와 위젯 설정","첫 앱 설치하기"] },
    goals:{
      photos:{ new:{title:"사진을 안전하게 보관하기",analogy:"나만의 Google Photos",payoff:"휴대폰 속 모든 사진을 내 클라우드에 저장하세요. 비공개로, 영원히 내 것입니다.",steps:["App Store에서 <b>Immich</b>를 찾아 설치를 누르세요.","Immich를 열고 계정을 만드세요.","휴대폰에 Immich 앱을 설치하고 코드를 스캔하면, 사진이 자동으로 백업됩니다."]},
        comfortable:{title:"사진 라이브러리 직접 호스팅",analogy:"Immich, 비공개 사진 백업",payoff:"원본 화질의 비공개 사진 라이브러리와 자동 휴대폰 백업.",steps:["App Store에서 <b>Immich</b>를 설치하세요(자동 업데이트 켜짐).","사진 서브도메인에서 로그인하세요.","모바일 앱을 추가하고 서버를 지정한 뒤 백그라운드 백업을 켜세요."]} },
      media:{ new:{title:"어디서나 내 영화와 드라마 보기",analogy:"나만의 Netflix",payoff:"내 영화와 드라마를 집 안 모든 화면에서 바로 재생하세요.",steps:["App Store에서 <b>Jellyfin</b>(또는 Plex)을 찾아 설치를 누르세요.","파일 앱으로 영상을 추가하세요.","TV, 컴퓨터, 휴대폰에서 열고 재생하세요."]},
        comfortable:{title:"미디어 라이브러리 스트리밍",analogy:"Jellyfin 또는 Plex, 나만의 미디어 서버",payoff:"직접 관리하는 Netflix 같은 라이브러리를 모든 기기에서.",steps:["<b>Jellyfin</b> 또는 <b>Plex</b>를 설치하세요.","/media/Movies와 /media/TV에 미디어를 넣고 스캔하세요.","아무 기기에서나 로그인하고, 가족 계정을 추가하세요."]} },
      files:{ new:{title:"Google Drive나 Dropbox 대신 쓰기",analogy:"나만의 클라우드 드라이브",payoff:"어디서나 열 수 있는 한 곳에 문서를 모으고, 링크로 공유하세요.",steps:["App Store에서 <b>Nextcloud</b>를 찾아 설치를 누르세요.","파일을 올리거나, 컴퓨터의 폴더를 복사하세요.","공유하려면 링크를 만드세요. 원하면 비밀번호도 걸 수 있어요."]},
        comfortable:{title:"파일과 공유 직접 호스팅",analogy:"Nextcloud, 파일, 동기화, 공유",payoff:"데스크톱 동기화와 만료되는 공유 링크가 있는 나만의 Drive.",steps:["<b>Nextcloud</b>를 설치하세요.","데스크톱 또는 모바일 동기화 클라이언트를 설치해 서브도메인에 연결하세요.","사용자를 만들고 용량을 정하고, 만료 링크로 공유하세요."]} },
      passwords:{ new:{title:"모든 비밀번호 안전하게 보관",analogy:"나만의 비밀번호 보관함",payoff:"나만 열 수 있는 한 곳에 모든 비밀번호를, 휴대폰과 컴퓨터에서.",steps:["App Store에서 <b>Vaultwarden</b>을 찾아 설치를 누르세요.","열고 마스터 비밀번호 하나만 만드세요(기억할 건 이것뿐이에요).","Bitwarden 앱이나 브라우저 확장을 추가하면 로그인을 자동으로 채워줘요."]},
        comfortable:{title:"비밀번호 보관함 직접 호스팅",analogy:"Vaultwarden, Bitwarden 호환",payoff:"공식 앱과 모두 호환되는 비공개 Bitwarden 서버.",steps:["<b>Vaultwarden</b>을 설치하세요.","보관함 서브도메인에서 계정을 만드세요.","Bitwarden 앱과 브라우저 확장을 서버 URL로 연결하세요."]} },
      games:{ new:{title:"친구들과 할 마인크래프트 서버 만들기",analogy:"나만의 게임 서버",payoff:"내 서버에서 돌아가는, 친구들이 들어올 수 있는 마인크래프트 월드.",steps:["App Store에서 <b>Minecraft</b> 앱을 찾아 설치를 누르세요.","월드를 고르고 친구들을 목록에 추가하세요.","친구들에게 주소를 알려주면 게임에서 바로 접속해요."]},
        comfortable:{title:"마인크래프트 서버 호스팅",analogy:"Crafty Controller, 게임 패널",payoff:"웹 제어판이 있는 관리형 마인크래프트 서버.",steps:["<b>Crafty Controller</b>를 설치하세요.","서버 인스턴스를 만들고 버전과 메모리를 골라 시작하세요.","포트를 열고 host:port를 공유한 뒤 웹 패널에서 관리하세요."]} },
      website:{ new:{title:"웹사이트 온라인에 올리기",analogy:"나만의 사이트, 월 요금 없음",payoff:"월 요금 없이, 나만의 웹사이트를 온라인에.",steps:["App Store에서 <b>WordPress</b>를 찾아 설치를 누르세요.","디자인을 고르고 첫 페이지를 쓰세요.","게시를 누르면 사이트가 바로 온라인에 올라가요."]},
        comfortable:{title:"내 웹사이트 직접 호스팅",analogy:"WordPress, Odoo, Silex",payoff:"호스팅 비용 없이, HTTPS로 내 도메인에서 돌아가는 셀프호스팅 CMS.",steps:["<b>WordPress</b>를 설치하세요(업무용은 Odoo, 노코드는 Silex).","테마, 페이지, 메뉴를 설정하세요.","이미 TLS로 서브도메인에서 제공돼요. 원하면 커스텀 도메인을 연결하세요."]} },
      ai:{ new:{title:"비공개로 AI 사용하기",analogy:"내 서버에 사는 ChatGPT",payoff:"대화할 수 있는 비공개 AI. 입력한 내용은 서버를 절대 떠나지 않아요.",steps:["App Store에서 AI 섹션을 여세요.","비공개 어시스턴트를 골라 설치를 누르세요.","대화를 시작하세요. 메시지는 서버 안에 머물러요."]},
        comfortable:{title:"비공개 AI 도구 실행",analogy:"로컬 모델, 에이전트형 MCP",payoff:"내 앱들을 넘나들며 작동하는 로컬 모델과 MCP 에이전트.",steps:["로컬 모델 앱을 설치하거나, MCP용으로 Claude를 API로 연결하세요.","MCP가 여러 앱의 파일을 읽고 정리할 수 있어요.","더 무거운 로컬 모델을 원하면 서버 업그레이드를 문의하세요."]} },
      send:{ new:{title:"큰 파일을 누군가에게 보내기",analogy:"나만의 WeTransfer",payoff:"용량 제한도 광고도 없이 링크로 큰 파일을 보내고, 링크는 내 것으로.",steps:["App Store에서 <b>PsiTransfer</b>를 찾아 설치를 누르세요.","열고 파일을 상자 안으로 끌어다 놓으세요.","받은 링크를 복사해 누구에게나 보내세요."]},
        comfortable:{title:"파일 전송 직접 호스팅",analogy:"PsiTransfer, WeTransfer 대안",payoff:"내 서버에서 바로, 비공개로 무제한 파일 전송.",steps:["<b>PsiTransfer</b>를 설치하세요.","파일을 끌어다 놓고 공유 만료 기한을 정하세요.","링크를 보내면 다운로드는 내 서버에서 바로 이뤄져요."]} },
      vpn:{ new:{title:"공용 와이파이에서 안전하게 인터넷 쓰기",analogy:"나만의 VPN",payoff:"휴대폰과 노트북을 위한 비공개 터널로, 어떤 네트워크에서도 내 연결은 내 것으로.",steps:["App Store에서 <b>WireGuard</b>(또는 OpenVPN)를 찾아 설치를 누르세요.","열고 내 기기용 연결을 만드세요.","휴대폰에서 코드를 스캔하고 켜면 보호돼요."]},
        comfortable:{title:"개인 VPN 설정",analogy:"WireGuard, OpenVPN",payoff:"내 클라우드에 접속하고 어디서나 안전하게 인터넷을 쓰는 셀프호스팅 VPN.",steps:["<b>WireGuard</b> 또는 OpenVPN을 설치하세요.","기기마다 설정 파일을 생성하세요.","설정을 가져와 연결하면 내 네트워크에 들어와요."]} },
      convert:{ new:{title:"파일을 다른 형식으로 바꾸기",analogy:"나만의 파일 변환기",payoff:"사진, 문서, 영상을 다른 형식으로, 낯선 웹사이트에 올리지 않고 변환하세요.",steps:["App Store에서 <b>ConvertX</b>를 찾아 설치를 누르세요.","열고 파일을 끌어다 놓으세요.","원하는 형식을 고르고 결과를 다운로드하세요."]},
        comfortable:{title:"파일 변환 직접 호스팅",analogy:"ConvertX, 1000개 이상 형식",payoff:"1000개 넘는 형식을 비공개로 변환, 무엇도 서버를 떠나지 않아요.",steps:["<b>ConvertX</b>를 설치하세요.","변환 서브도메인에 파일을 올리세요.","일괄 변환하세요. 모든 게 로컬에 남아요."]} },
      backup:{ new:{title:"모든 것을 안전하게 백업하기",analogy:"내 데이터의 안전망",payoff:"잠든 사이 자동으로 만들어지는, 모든 것의 두 번째 사본.",steps:["App Store에서 <b>Duplicati</b>를 찾아 설치를 누르세요.","무엇을 어디에 저장할지 고르세요(예: Google Drive).","매일 밤 실행되도록 설정하면 알아서 진행돼요."]},
        comfortable:{title:"암호화 백업 설정",analogy:"Duplicati, 예약, 오프사이트",payoff:"앱 데이터를 예약 시간에 암호화해 외부에 백업.",steps:["<b>Duplicati</b>를 설치하세요.","작업을 /DATA/AppData로 지정하고 원격 대상을 고르세요.","예약하고 보관 기간을 정한 뒤, 두 번째 오프사이트 작업을 추가하세요."]} }
    }
  }
};

let mode = "new", lang = "en", expanded = false;
const $ = s => document.querySelector(s);
const tint = (hex) => `color-mix(in srgb, ${hex} 13%, white)`;
const UI = () => T[lang].ui;
const COPY = () => T[lang].copy[mode];
const SETUP = () => (T[lang].setup && T[lang].setup[mode]) || T.en.setup[mode];
const GTEXT = g => (T[lang].goals[g.id] && T[lang].goals[g.id][mode]) || T.en.goals[g.id][mode];

function render(){
  const ui = UI(), c = COPY();
  $("#brandName").textContent = ui.brandName;
  $("#brandSub").textContent = ui.brandSub;
  $("#showMeLabel").textContent = ui.showMe;
  $("#segNew").textContent = ui.seg[0]; $("#segComf").textContent = ui.seg[1]; $("#segDev").textContent = ui.seg[2];
  $("#q").placeholder = ui.searchPh;
  $("#setupLead").textContent = ui.setupLead;
  $("#featTitle").textContent = ui.featTitle; $("#featSub").textContent = ui.featSub;
  $("#morebtn").textContent = ui.moreBtn;
  $("#emptyB").textContent = ui.emptyB; $("#emptyP").textContent = ui.emptyP;
  $("#openStoreBtn").textContent = ui.openStore; $("#askTeamBtn").textContent = ui.askTeam;
  $("#greetH").innerHTML = c.h; $("#greetP").textContent = c.p;
  $("#kicker").textContent = c.kicker; $("#gridTitle").textContent = c.grid;
  $("#gridHint").textContent = c.hint; $("#helpT").textContent = c.helpT; $("#helpP").textContent = c.helpP;
  $("#featured").style.display = c.featured ? "flex" : "none";
  document.documentElement.lang = lang;

  const ss = $("#setupSteps"); ss.innerHTML = "";
  SETUP().forEach((label,i)=>{
    const el = document.createElement("div");
    el.className = "chip"+(i===0?" done":"");
    el.innerHTML = `<span class="tick">${CHK}</span><span class="label">${label}</span>`;
    el.onclick = ()=>{ el.classList.toggle("done"); updateSetupCount(); };
    ss.appendChild(el);
  });
  updateSetupCount();

  const grid = $("#grid"); grid.innerHTML = "";
  GOALS.filter(g => GTEXT(g)).forEach(g=>{
    const v = GTEXT(g), a = ACCENT[g.accent];
    const t = document.createElement("button");
    t.className = "tile"; t.dataset.id = g.id;
    t.dataset.common = g.common ? "1" : "0";
    t.dataset.terms = (g.cats.join(" ")+" "+v.title+" "+v.analogy).toLowerCase();
    t.innerHTML = `
      ${g.installed ? `<span class="ondock">${CHK} ${UI().onDock}</span>` : ""}
      <div class="ic" style="background:${tint(a)}">${g.emoji}</div>
      <h3>${v.title}</h3>
      <div class="analogy"><i style="background:${a}"></i>${v.analogy}</div>`;
    t.onclick = ()=>openSheet(g);
    grid.appendChild(t);
  });
  filter();
}

function updateSetupCount(){
  const left = [...document.querySelectorAll("#setupSteps .chip")].filter(c=>!c.classList.contains("done")).length;
  $("#setupCount").textContent = left===0 ? UI().allDone : UI().quick(left);
}

function filter(){
  const term = $("#q").value.trim().toLowerCase();
  const collapsible = (mode !== "dev");
  let shown = 0, hiddenExtras = 0;
  document.querySelectorAll(".tile").forEach(t=>{
    const matches = !term || t.dataset.terms.includes(term);
    const isCommon = t.dataset.common === "1";
    let visible = matches;
    if(matches && term==="" && collapsible && !expanded && !isCommon){ visible=false; hiddenExtras++; }
    t.classList.toggle("hidden", !visible);
    if(visible) shown++;
  });
  $("#empty").classList.toggle("show", shown===0 && term!=="");
  $("#morewrap").classList.toggle("hide", !(term==="" && collapsible && !expanded && hiddenExtras>0));
}

function openSheet(g){
  const v = GTEXT(g), a = ACCENT[g.accent], ui = UI(), beginner = (mode==="new");
  const openBlock = beginner
    ? `<div class="m-open"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="color:${a}"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2"/><path d="M3 9h18" stroke="currentColor" stroke-width="2"/></svg>${ui.openBrowser}</div>`
    : `<div class="m-open"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="color:${a}"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>${ui.livesPre}<code>${g.where}</code>${ui.livesPost}</div>`;
  const badges = beginner
    ? `<div class="m-badges">
         <span class="badge"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>${ui.min2}</span>
         <span class="badge"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3l7 3v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>${ui.safe}</span>
       </div>` : "";
  const tags = `<div class="m-tags">
      ${g.replaces ? `<span class="replaces">${ui.replacesWord}${g.replaces}</span>` : ""}
      ${g.installed ? `<span class="installed">${CHK} ${ui.installedPill}</span>` : ""}
    </div>`;
  const ctaLabel = g.cta ? (g.cta[lang]||g.cta.en)
    : g.installed ? ui.cta.open(g.app)
    : (beginner ? ui.cta.get(g.app) : ui.cta.install(g.app));
  const cta = `<button class="btn btn-solid" onclick="alert('${g.installed?'→ launches':'→ App Store:'} ${g.app}')">${ctaLabel}</button>`;
  const stuck = `<div class="m-stuck">${ui.stuckPre}<button onclick="alert('→ contact / Discord')">${ui.stuckLink}</button></div>`;
  $("#sheet").innerHTML = `
    <div class="grab"></div>
    <div class="m-head">
      <div class="m-ic" style="background:${tint(a)}">${g.emoji}</div>
      <div><h2>${v.title}</h2>${(g.replaces||g.installed)?tags:""}</div>
    </div>
    <div class="m-payoff">${v.payoff}</div>
    ${badges}
    ${openBlock}
    <div class="m-stepslabel">${ui.stepsLabel}</div>
    <div class="m-steps">
      ${v.steps.map((s,i)=>`<div class="st"><div class="n" style="background:${tint(a)}">${i+1}</div><div class="tx">${s}</div></div>`).join("")}
    </div>
    ${stuck}
    <div class="m-cta">
      ${cta}
      <button class="btn btn-ghost" onclick="closeSheet()">${ui.maybeLater}</button>
    </div>`;
  $("#ovl").classList.add("show");
}
function closeSheet(){ $("#ovl").classList.remove("show"); }

$("#ovl").addEventListener("click", e=>{ if(e.target.id==="ovl") closeSheet(); });
document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeSheet(); });
$("#q").addEventListener("input", filter);
$("#morebtn").addEventListener("click", ()=>{ expanded=true; filter(); });
$("#featured").addEventListener("click", ()=> openSheet(GOALS.find(g=>g.id==="photos")) );
$("#seg").addEventListener("click", e=>{
  const b = e.target.closest("button"); if(!b) return;
  mode = b.dataset.a; expanded=false;
  document.querySelectorAll("#seg button").forEach(x=>x.classList.toggle("on", x===b));
  render();
});
$("#lang").addEventListener("click", e=>{
  const b = e.target.closest("button"); if(!b) return;
  lang = b.dataset.l; closeSheet();
  document.querySelectorAll("#lang button").forEach(x=>x.classList.toggle("on", x===b));
  render();
});

// expose closeSheet globally for inline onclick
window.closeSheet = closeSheet;

render();

} /* end index page */

/* ===================================================================
   GUIDE PAGE — markdown viewer (guide.html)
   =================================================================== */
if (document.getElementById('content')) {

  var content = document.getElementById('content');
  var params = new URLSearchParams(window.location.search);
  var doc = params.get('doc');

  if (!doc) {
    content.innerHTML = '<p class="error">No guide specified.</p>';
  } else {
    var url = DOCS_BASE + '/' + doc;
    if (!url.endsWith('.md')) url += '.md';

    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error('Not found');
        return r.text();
      })
      .then(function (md) {
        content.innerHTML = marked.parse(md);
        buildTOC();
        updateTitle();
      })
      .catch(function () {
        content.innerHTML = '<p class="error">Could not load this guide. The page may not exist or you may be offline.</p>';
      });
  }

  function buildTOC() {
    var toc = document.getElementById('toc');
    if (!toc) return;
    var headings = document.querySelectorAll('.guide-content h2, .guide-content h3');
    if (headings.length === 0) {
      var sidebar = document.querySelector('.guide-sidebar');
      if (sidebar) sidebar.style.display = 'none';
      return;
    }
    var html = '';
    headings.forEach(function (h, i) {
      var id = 'heading-' + i;
      h.id = id;
      var cls = h.tagName === 'H3' ? ' class="toc-h3"' : '';
      html += '<a href="#' + id + '"' + cls + '>' + h.textContent + '</a>';
    });
    toc.innerHTML = html;
  }

  function updateTitle() {
    var h1 = document.querySelector('.guide-content h1');
    if (h1) document.title = h1.textContent + ' — Start Here';
  }

} /* end guide page */

})();
