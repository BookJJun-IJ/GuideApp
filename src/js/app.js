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
const APP_COUNT = "100+"; /* avoid hardcoding exact number across translations */

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
      new:{h:'What would you like to <span class="em">do</span>?', p:"Your cloud is ready. Pick a goal in plain words and we'll show you the few taps to get there. No tech knowledge needed.", kicker:"Get started", grid:"I want to…", hint:"Tap a goal", helpT:"Can't find what you're after?", helpP:"There are "+APP_COUNT+" apps in the store. Search it, or ask us, we read every message.", featured:true},
      comfortable:{h:'Your cloud, <span class="em">your call</span>.', p:"Choose what you want to run. Each goal gives you the app and the short path to a working setup.", kicker:"Set up", grid:"I want to set up…", hint:"Tap a goal", helpT:"Want the full catalogue?", helpP:"Browse "+APP_COUNT+" maintained open-source apps in the App Store.", featured:false},
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
      new:{h:'<span class="em">Que</span> voulez-vous faire ?', p:"Votre cloud est prêt. Choisissez un objectif en mots simples, et on vous montre les quelques étapes pour y arriver. Aucune compétence technique requise.", kicker:"Pour commencer", grid:"Je veux…", hint:"Touchez un objectif", helpT:"Vous ne trouvez pas ?", helpP:"Il y a "+APP_COUNT+" applis dans l'App Store. Cherchez, ou écrivez-nous : on lit chaque message.", featured:true},
      comfortable:{h:'Votre cloud, <span class="em">vos règles</span>.', p:"Choisissez ce que vous voulez installer. Chaque objectif vous donne l'appli et le chemin court vers une installation qui marche.", kicker:"Configurer", grid:"Je veux configurer…", hint:"Touchez un objectif", helpT:"Vous voulez tout le catalogue ?", helpP:"Parcourez "+APP_COUNT+" applis open source maintenues dans l'App Store.", featured:false},
      dev:{h:'Bienvenue. <span class="em">On déploie</span>.', p:"Le PCS tourne sous CasaOS sur Docker, NSL.SH gère le routage et le TLS. Choisissez un objectif, ou allez directement aux apps custom et au packaging.", kicker:"Tâches", grid:"Tâches courantes", hint:"Touchez une tâche", helpT:"Vous développez sur le PCS ?", helpP:"Apps Docker custom, SSH, MCPs et contribution à l'AppStore : tout vous est ouvert.", featured:false}
    },
    setup:{ new:["Créez votre identifiant","Personnalisez","Installez votre première appli"], comfortable:["Créez votre compte","Langue et widgets","Installez votre première appli"], dev:["Créez votre compte admin","Accès SSH","Installez ou packagez une appli"] },
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
        comfortable:{title:"Mettre en place des sauvegardes chiffrées",analogy:"Duplicati, planifié, hors site",payoff:"Des sauvegardes planifiées, chiffrées et hors site de vos données d'applis.",steps:["Installez <b>Duplicati</b>.","Pointez une tâche vers /DATA/AppData et choisissez une destination distante.","Planifiez-la, fixez la rétention, et ajoutez une seconde tâche hors site."]} },
      custom:{ dev:{title:"Installer une app custom",analogy:"N'importe quelle image Docker",payoff:"N'importe quelle image Docker, routée et TLS sur un sous-domaine.",steps:["Utilisez Custom Install dans l'App Store, ou déposez un fichier compose.","Accès SSH/terminal disponible, clé serveur sur demande.","Ajoutez les labels Caddy standards pour le routage et le TLS."]} },
      build:{ dev:{title:"Publier une app dans le Store",analogy:"Contribuer à l'AppStore",payoff:"Une app revue et publiée dans le Yundera AppStore.",steps:["Forkez le dépôt AppStore ; suivez CONTRIBUTING.md.","Ajoutez le compose + manifeste CasaOS, configurez les labels Caddy.","Choisissez auth native ou nginx-hash-lock, rédigez rationale.md, ouvrez une PR."]} }
    }
  },

  ko:{
    ui:{ brandName:"시작하기", brandSub:"나만의 클라우드 서버", showMe:"보기",
      seg:["처음이에요","해봤어요","개발자"], searchPh:"검색: 사진, 비밀번호, 마인크래프트…",
      setupLead:"시작 준비", quick:n=>n+"가지 남음", allDone:"준비 끝! 🎉",
      featTitle:"처음이라면, 사진부터 해보세요.", featSub:"제일 쉽고 2분이면 돼요.",
      moreBtn:"더 보기", emptyB:"검색 결과가 없어요",
      emptyP:"'사진', '영화', '웹사이트' 같은 쉬운 단어로 다시 검색하거나, App Store에서 직접 둘러보세요.",
      openStore:"App Store 열기", askTeam:"문의하기", stepsLabel:"이렇게 하면 돼요",
      min2:"약 2분이면 끝", safe:"뭘 잘못 눌러도 괜찮아요",
      openBrowser:"웹사이트처럼 브라우저에서 열면 돼요.",
      livesPre:"접속 주소: ", livesPost:" (보안 연결 적용)", replacesWord:"대신하는 서비스: ",
      installedPill:"이미 설치돼 있어요", onDock:"설치됨", maybeLater:"나중에 할게요",
      stuckPre:"진행이 안 되나요? ", stuckLink:"편하게 물어보세요.",
      cta:{ open:a=>a+" 열기", get:a=>a+" 설치하기", install:a=>a+" 설치하기" } },
    copy:{
      new:{h:'<span class="em">뭘</span> 해볼까요?', p:"클라우드가 준비됐어요. 하고 싶은 걸 고르면, 몇 번만 누르면 되는 방법을 알려드릴게요. 어려운 건 없어요.", kicker:"시작하기", grid:"이런 걸 하고 싶어요", hint:"골라보세요", helpT:"찾는 게 없나요?", helpP:"App Store에 "+APP_COUNT+"개 넘는 앱이 있어요. 검색하거나, 편하게 물어봐 주세요.", featured:true},
      comfortable:{h:'내 클라우드, <span class="em">내 맘대로</span>.', p:"직접 골라서 설치하세요. 각 목표마다 필요한 앱과 설정 방법을 한눈에 볼 수 있어요.", kicker:"설정", grid:"설정하고 싶은 것", hint:"골라보세요", helpT:"전체 앱 목록 보기", helpP:"App Store에서 "+APP_COUNT+"개 이상의 오픈소스 앱을 둘러보세요.", featured:false},
      dev:{h:'환영합니다. <span class="em">바로 시작하죠</span>.', p:"PCS는 Docker 위의 CasaOS로 동작하고, NSL.SH가 라우팅·TLS를 처리합니다. 원하는 작업을 고르거나, 바로 커스텀 앱·패키징으로 가세요.", kicker:"작업", grid:"자주 쓰는 작업", hint:"골라보세요", helpT:"PCS에서 개발하시나요?", helpP:"커스텀 Docker 앱, SSH, MCP, AppStore 기여 모두 가능합니다.", featured:false}
    },
    setup:{ new:["계정 만들기","내 취향에 맞게 꾸미기","첫 앱 설치해 보기"], comfortable:["계정 만들기","언어·위젯 설정","첫 앱 설치하기"], dev:["관리자 계정 만들기","SSH 접속 설정","앱 설치 또는 패키징"] },
    goals:{
      photos:{ new:{title:"내 사진, 안전하게 내 서버에",analogy:"나만의 Google Photos",payoff:"폰에 있는 사진을 전부 내 클라우드에 보관하세요. 남 눈에 안 보이고, 영원히 내 거예요.",steps:["App Store에서 <b>Immich</b>를 찾아 설치하세요.","Immich를 열고 계정을 만드세요.","폰에 Immich 앱을 깔고 코드를 스캔하면, 알아서 백업돼요."]},
        comfortable:{title:"내 사진 라이브러리 셀프호스팅",analogy:"Immich — 비공개 사진 백업",payoff:"원본 화질 그대로, 자동 백업되는 내 전용 사진 라이브러리.",steps:["App Store에서 <b>Immich</b> 설치 (자동 업데이트 켜짐).","사진 서브도메인에 로그인하세요.","모바일 앱 설치 → 서버 주소 입력 → 백그라운드 백업 켜기."]} },
      media:{ new:{title:"내 영화·드라마를 아무 화면에서",analogy:"나만의 Netflix",payoff:"내가 가진 영화·드라마를 집에 있는 아무 기기에서 바로 틀 수 있어요.",steps:["App Store에서 <b>Jellyfin</b>(또는 Plex)을 설치하세요.","파일 앱으로 영상을 넣어주세요.","TV, PC, 폰에서 열고 재생하면 끝."]},
        comfortable:{title:"미디어 서버 직접 운영하기",analogy:"Jellyfin · Plex",payoff:"모든 기기에서 스트리밍되는 Netflix 스타일 라이브러리.",steps:["<b>Jellyfin</b> 또는 <b>Plex</b> 설치.","/media/Movies, /media/TV에 파일 넣고 스캔.","아무 기기에서 로그인, 가족 계정 추가."]} },
      files:{ new:{title:"Google Drive·Dropbox 안 쓰고 파일 관리",analogy:"나만의 클라우드 드라이브",payoff:"내 파일을 한곳에 모아두고, 어디서든 열고, 링크로 공유할 수 있어요.",steps:["App Store에서 <b>Nextcloud</b>를 설치하세요.","파일을 올리거나 컴퓨터 폴더를 통째로 복사하세요.","공유할 땐 링크를 만들면 돼요. 비번도 걸 수 있어요."]},
        comfortable:{title:"파일·공유 셀프호스팅",analogy:"Nextcloud — 파일, 동기화, 공유",payoff:"PC 동기화, 만료 링크 공유까지 되는 내 전용 Drive.",steps:["<b>Nextcloud</b> 설치.","데스크톱·모바일 동기화 클라이언트를 내 서브도메인에 연결.","사용자 추가, 용량 제한, 만료 링크로 공유."]} },
      passwords:{ new:{title:"비밀번호, 한곳에서 안전하게",analogy:"나만의 비밀번호 금고",payoff:"비밀번호를 한군데 모아두고, 나만 열 수 있어요. 폰에서도 PC에서도.",steps:["App Store에서 <b>Vaultwarden</b>을 설치하세요.","마스터 비밀번호 하나만 정하세요 — 기억할 건 이것뿐.","Bitwarden 앱이나 브라우저 확장 프로그램을 깔면 자동으로 로그인을 채워줘요."]},
        comfortable:{title:"비밀번호 보관함 셀프호스팅",analogy:"Vaultwarden — Bitwarden 호환",payoff:"Bitwarden 공식 앱과 그대로 연동되는 내 전용 비밀번호 서버.",steps:["<b>Vaultwarden</b> 설치.","보관함 서브도메인에서 계정 생성.","Bitwarden 앱·확장 프로그램에서 서버 URL만 바꿔주면 끝."]} },
      games:{ new:{title:"친구들이랑 마크 서버 돌리기",analogy:"나만의 게임 서버",payoff:"내 서버에서 마인크래프트 월드를 열고, 친구들을 초대할 수 있어요.",steps:["App Store에서 <b>Minecraft</b> 앱을 설치하세요.","월드를 고르고 친구를 허용 목록에 추가하세요.","친구한테 주소를 보내면 게임에서 바로 들어와요."]},
        comfortable:{title:"마인크래프트 서버 운영하기",analogy:"Crafty Controller — 게임 관리 패널",payoff:"웹 패널에서 편하게 관리하는 마인크래프트 서버.",steps:["<b>Crafty Controller</b> 설치.","서버 인스턴스 생성 → 버전·메모리 선택 → 시작.","포트 열고, 주소 공유, 웹 패널에서 관리."]} },
      website:{ new:{title:"내 웹사이트 만들기",analogy:"나만의 홈페이지, 월 비용 0원",payoff:"월 요금 없이 나만의 웹사이트를 바로 온라인에 올릴 수 있어요.",steps:["App Store에서 <b>WordPress</b>를 설치하세요.","테마를 고르고 첫 페이지를 써보세요.","게시 버튼 누르면 바로 온라인에 올라가요."]},
        comfortable:{title:"웹사이트 셀프호스팅",analogy:"WordPress, Odoo, Silex",payoff:"호스팅 비용 없이 HTTPS로 바로 접속 가능한 내 CMS.",steps:["<b>WordPress</b> 설치 (비즈니스용 Odoo, 노코드 Silex도 가능).","테마·페이지·메뉴 설정.","서브도메인에 TLS 자동 적용. 커스텀 도메인 연결도 가능."]} },
      ai:{ new:{title:"남 몰래 AI 쓰기",analogy:"내 서버 안의 ChatGPT",payoff:"내 서버에서만 돌아가는 AI 챗봇. 대화 내용이 밖으로 나가지 않아요.",steps:["App Store에서 AI 카테고리를 열어보세요.","마음에 드는 AI 앱을 골라 설치하세요.","대화를 시작하면 돼요. 내 서버 안에서만 동작해요."]},
        comfortable:{title:"프라이빗 AI 도구 운영",analogy:"로컬 모델 · MCP 에이전트",payoff:"내 앱들과 연결돼서 작동하는 로컬 AI 모델과 MCP 에이전트.",steps:["로컬 모델 앱을 설치하거나, Claude API로 MCP 연결.","MCP가 여러 앱의 파일을 읽고 정리해 줘요.","더 큰 모델이 필요하면 서버 업그레이드를 문의하세요."]} },
      send:{ new:{title:"큰 파일 링크로 보내기",analogy:"나만의 WeTransfer",payoff:"용량 제한도, 광고도 없이, 내 서버에서 바로 대용량 파일을 보낼 수 있어요.",steps:["App Store에서 <b>PsiTransfer</b>를 설치하세요.","파일을 끌어다 놓으세요.","생성된 링크를 복사해서 보내면 끝."]},
        comfortable:{title:"파일 전송 셀프호스팅",analogy:"PsiTransfer — WeTransfer 대안",payoff:"내 서버에서 직접, 용량 무제한 비공개 파일 전송.",steps:["<b>PsiTransfer</b> 설치.","파일 드래그 앤 드롭 → 만료 기한 설정.","링크를 보내면, 다운로드는 내 서버에서 직접."]} },
      vpn:{ new:{title:"카페 와이파이도 안심하고 쓰기",analogy:"나만의 VPN",payoff:"폰이나 노트북에 내 전용 보안 터널을 만들어요. 어디서 접속해도 안전해요.",steps:["App Store에서 <b>WireGuard</b>(또는 OpenVPN)를 설치하세요.","내 기기용 연결을 하나 만드세요.","폰에서 QR 코드를 스캔하고 켜면, 바로 보호 시작."]},
        comfortable:{title:"내 VPN 직접 만들기",analogy:"WireGuard · OpenVPN",payoff:"내 클라우드에 안전하게 접속하고, 어디서든 보안 인터넷을 쓸 수 있어요.",steps:["<b>WireGuard</b> 또는 OpenVPN 설치.","기기마다 설정 파일 생성.","설정 가져오기 → 연결하면 내 네트워크 안으로."]} },
      convert:{ new:{title:"파일 형식 바꾸기",analogy:"나만의 파일 변환기",payoff:"사진·문서·영상을 다른 형식으로 바꿀 수 있어요. 이상한 사이트에 올릴 필요 없어요.",steps:["App Store에서 <b>ConvertX</b>를 설치하세요.","파일을 끌어다 놓으세요.","원하는 형식 고르고 다운로드."]},
        comfortable:{title:"파일 변환 셀프호스팅",analogy:"ConvertX — 1,000개 이상 형식",payoff:"1,000가지 넘는 형식을 서버 안에서 비공개로 변환.",steps:["<b>ConvertX</b> 설치.","변환 서브도메인에 파일 업로드.","일괄 변환 가능. 파일이 서버 밖으로 나가지 않아요."]} },
      backup:{ new:{title:"모든 데이터 자동 백업",analogy:"내 데이터 안전망",payoff:"자는 동안 알아서 백업이 돌아가요. 혹시 모를 상황에 대비하세요.",steps:["App Store에서 <b>Duplicati</b>를 설치하세요.","뭘 어디에 백업할지 정하세요 (예: Google Drive).","매일 밤 자동 실행되게 설정하면 끝."]},
        comfortable:{title:"암호화 백업 세팅",analogy:"Duplicati — 예약·오프사이트",payoff:"암호화된 백업이 예약 시간에 외부 저장소로 자동 전송.",steps:["<b>Duplicati</b> 설치.","/DATA/AppData 경로 → 원격 저장소 선택.","스케줄 설정, 보관 기간 지정, 오프사이트 백업 추가."]} },
      custom:{ dev:{title:"커스텀 앱 올리기",analogy:"아무 Docker 이미지나 가능",payoff:"원하는 Docker 이미지를 올리면, 서브도메인에서 TLS까지 자동으로.",steps:["App Store의 Custom Install을 쓰거나 compose 파일을 직접 올리세요.","SSH/터미널 접속 가능, 서버 키는 요청 시 발급.","Caddy 라벨만 붙이면 서브도메인으로 바로 접근 가능."]} },
      build:{ dev:{title:"AppStore에 앱 등록하기",analogy:"AppStore 기여",payoff:"내가 만든 앱을 Yundera AppStore에 올릴 수 있어요.",steps:["AppStore 레포를 fork하고 CONTRIBUTING.md를 읽으세요.","compose + CasaOS 매니페스트 작성, Caddy 라벨 설정 (필요하면 WebSocket 패스스루).","인증 방식 결정 → rationale.md 작성 → PR 제출."]} }
    }
  }
};

let mode = "new", lang = "en", expanded = false;
const $ = s => document.querySelector(s);
/* tint with fallback for browsers without color-mix() */
const TINT_FALLBACK = {"#ee2a7b":"#fde8f1", "#27aae1":"#e4f4fb"};
const tint = (hex) => {
  const fb = TINT_FALLBACK[hex] || "#f0f4f8";
  return CSS.supports && CSS.supports("background","color-mix(in srgb,red 50%,blue)")
    ? `color-mix(in srgb, ${hex} 13%, white)` : fb;
};
const UI = () => T[lang].ui;
const COPY = () => T[lang].copy[mode];
const SETUP = () => (T[lang].setup && T[lang].setup[mode]) || T.en.setup[mode];
const GTEXT = g => (T[lang].goals[g.id] && T[lang].goals[g.id][mode]) || T.en.goals[g.id][mode];

/* — goal-to-doc mapping for "Learn more" links — */
const DOC_MAP = {
  photos:"apps/immich", media:"apps/jellyfin", files:"file-manager",
  passwords:"apps/vaultwarden", games:"apps/minecraft", website:"apps/wordpress",
  ai:"apps/ai", send:"apps/psitransfer", vpn:"apps/wireguard",
  convert:"apps/convertx", backup:"apps/duplicati",
  custom:"getting-started", build:"getting-started"
};

/* — localStorage helpers for setup checklist — */
const SETUP_KEY = "starthere_setup";
function loadSetupState(){ try{ return JSON.parse(localStorage.getItem(SETUP_KEY))||{}; }catch(e){ return {}; } }
function saveSetupState(){
  const state = {};
  document.querySelectorAll("#setupSteps .chip").forEach((c,i)=>{ state[mode+"_"+lang+"_"+i] = c.classList.contains("done"); });
  localStorage.setItem(SETUP_KEY, JSON.stringify(Object.assign(loadSetupState(), state)));
}

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
  /* update featured icon to match the dynamically chosen goal */
  var featGoal = GOALS.find(g=>g.common && !g.installed) || GOALS.find(g=>g.id==="photos");
  if(featGoal) $("#featIcon").textContent = featGoal.emoji;
  document.documentElement.lang = lang;

  const ss = $("#setupSteps"); ss.innerHTML = "";
  const saved = loadSetupState();
  SETUP().forEach((label,i)=>{
    const key = mode+"_"+lang+"_"+i;
    const isDone = saved[key] !== undefined ? saved[key] : (i===0);
    const el = document.createElement("button");
    el.type = "button";
    el.className = "chip"+(isDone?" done":"");
    el.innerHTML = `<span class="tick">${CHK}</span><span class="label">${label}</span>`;
    el.addEventListener("click", ()=>{ el.classList.toggle("done"); updateSetupCount(); saveSetupState(); });
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
  /* reset expanded when search is cleared so "Show more" reappears */
  if(term==="" && expanded){ expanded=false; }
  const collapsible = (mode !== "dev");
  let shown = 0, hiddenExtras = 0;
  document.querySelectorAll(".tile").forEach(t=>{
    const matches = !term || t.dataset.terms.includes(term);
    const isCommon = t.dataset.common === "1";
    let visible = matches;
    /* when searching, show all matches regardless of common/expanded */
    if(term !== ""){ visible = matches; }
    else if(collapsible && !expanded && !isCommon){ visible=false; hiddenExtras++; }
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
  const docPath = DOC_MAP[g.id];
  const learnMore = docPath
    ? `<div class="m-learn"><a href="guide.html?doc=${docPath}">${{en:"Learn more →",fr:"En savoir plus →",ko:"자세히 보기 →"}[lang]||"Learn more →"}</a></div>`
    : "";
  $("#sheet").innerHTML = `
    <div class="grab"></div>
    <button class="m-close" aria-label="Close" data-action="close"><svg viewBox="0 0 24 24" fill="none"><path d="M18 6 6 18M6 6l12 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></button>
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
    <div class="m-stuck">${ui.stuckPre}<button data-action="stuck">${ui.stuckLink}</button></div>
    <div class="m-cta">
      <button class="btn btn-solid" data-action="cta">${ctaLabel}</button>
      <button class="btn btn-ghost" data-action="close">${ui.maybeLater}</button>
    </div>
    ${learnMore}`;
  /* bind events via delegation instead of inline onclick */
  $("#sheet").querySelectorAll("[data-action]").forEach(function(btn){
    btn.addEventListener("click", function(){
      var action = btn.dataset.action;
      if(action==="close") closeSheet();
      else if(action==="cta") alert((g.installed?"→ launches ":"→ App Store: ")+g.app);
      else if(action==="stuck") alert("→ contact / Discord");
    });
  });
  $("#ovl").classList.add("show");
  document.body.classList.add("sheet-open");
  /* focus the close button for keyboard users */
  const cls = $("#sheet .m-close"); if(cls) cls.focus();
}
function closeSheet(){
  $("#ovl").classList.remove("show");
  document.body.classList.remove("sheet-open");
}

$("#ovl").addEventListener("click", e=>{ if(e.target.id==="ovl") closeSheet(); });
document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeSheet(); });
$("#q").addEventListener("input", filter);
$("#morebtn").addEventListener("click", ()=>{ expanded=true; filter(); });
$("#featured").addEventListener("click", ()=>{
  /* find the best featured goal: first non-installed common goal, fallback to photos */
  const feat = GOALS.find(g=>g.common && !g.installed) || GOALS.find(g=>g.id==="photos");
  if(feat) openSheet(feat);
});
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

/* help footer button events */
$("#openStoreBtn").addEventListener("click", function(){ alert("→ opens the App Store"); });
$("#askTeamBtn").addEventListener("click", function(){ alert("→ opens contact / Discord"); });

render();

} /* end index page */

/* ===================================================================
   GUIDE PAGE — markdown viewer (guide.html)
   =================================================================== */
if (document.getElementById('content')) {

  var content = document.getElementById('content');
  var params = new URLSearchParams(window.location.search);
  var doc = params.get('doc');

  /* validate doc param: allow only alphanumeric, hyphens, slashes, no ".." */
  var VALID_DOC = /^[a-zA-Z0-9][a-zA-Z0-9\-\/]*$/;

  if (!doc) {
    content.innerHTML = '<p class="error">No guide specified.</p>';
  } else if (!VALID_DOC.test(doc) || doc.indexOf('..') !== -1) {
    content.innerHTML = '<p class="error">Invalid guide path.</p>';
  } else {
    var url = DOCS_BASE + '/' + doc;
    if (!url.endsWith('.md')) url += '.md';

    /* configure marked to not allow raw HTML in markdown for safety */
    var markedOpts = { breaks: true };
    if (typeof marked.setOptions === 'function') {
      markedOpts.renderer = new marked.Renderer();
      /* strip any raw script/iframe/object tags from markdown output */
    }

    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error('Not found');
        return r.text();
      })
      .then(function (md) {
        var html = marked.parse(md, markedOpts);
        /* strip dangerous tags as a safety net */
        html = html.replace(/<(script|iframe|object|embed|form|input|textarea|meta|link|style)[\s>]/gi, '&lt;$1 ');
        content.innerHTML = html;
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
