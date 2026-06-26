# Pi & Deployment Commands

Quick reference for running and maintaining this website on the Raspberry Pi with Cloudflare Tunnel.

**Live site:** https://www.bhargava-gumpula.com  
**Project path on Pi:** `~/Work/Website`

---

## Health check (run anytime)

```bash
pm2 status
curl -I --noproxy '*' http://127.0.0.1:3000
sudo systemctl status cloudflared
```

- `pm2` → `website` should be **online**
- `curl` → **HTTP/1.1 200 OK**
- `cloudflared` → **active (running)**

---

## After you push code changes (update the live site)

```bash
cd ~/Work/Website
git pull
npm ci
npm run build:webpack
pm2 restart website
```

Check logs if something looks wrong:

```bash
pm2 logs website --lines 30
```

---

## Start / stop / restart the website

```bash
pm2 start npm --name "website" -- start
pm2 stop website
pm2 restart website
pm2 delete website
pm2 logs website
pm2 status
```

Production requires a build first:

```bash
cd ~/Work/Website
npm run build:webpack
pm2 restart website
```

---

## pm2 — survive reboots

Run once (or again if apps disappear after reboot):

```bash
pm2 save
pm2 startup
```

Run the full `sudo ...` line that `pm2 startup` prints, then:

```bash
pm2 save
```

---

## Development on the Pi (testing only)

Do **not** run dev and pm2 at the same time (both use port 3000).

```bash
cd ~/Work/Website
npm run dev:webpack
```

Stop with **Ctrl+C** when done.

---

## Development on your Mac

```bash
cd /path/to/Website
npm install
npm run dev
```

Open http://localhost:3000

---

## Cloudflare Tunnel

Check tunnel service:

```bash
sudo systemctl status cloudflared
sudo systemctl restart cloudflared
sudo journalctl -u cloudflared -n 30 --no-pager
```

Tunnel points to: `http://localhost:3000`

Dashboard: https://one.dash.cloudflare.com → **Networks** → **Tunnels**

---

## curl on the Pi (proxy note)

This Pi may have `http_proxy` set. For local checks, always use:

```bash
curl -I --noproxy '*' http://127.0.0.1:3000
```

---

## Port 3000 already in use

```bash
pm2 stop website
pm2 delete website
sudo fuser -k 3000/tcp
pkill -f "next"
cd ~/Work/Website
pm2 start npm --name "website" -- start
```

---

## Node version (Pi uses nvm)

```bash
node -v          # want v18+ or v20+
npm list next    # want next@16.2.9
nvm use 20       # if needed
```

---

## Contact form submissions

Saved on the Pi at:

```text
~/Work/Website/data/contact-submissions.json
```

View recent submissions:

```bash
cat ~/Work/Website/data/contact-submissions.json
```

---

## Reboot test

```bash
sudo reboot
```

After ~2–5 minutes, SSH back in and run the **Health check** section above, then open https://www.bhargava-gumpula.com in a browser.

---

## Push changes from your Mac to GitHub

```bash
cd /path/to/Website
git add .
git commit -m "Describe your change"
git push
```

Then on the Pi, run **After you push code changes** above.

---

## Useful paths & URLs

| Item | Value |
|------|--------|
| Pi project | `~/Work/Website` |
| Public URL | https://www.bhargava-gumpula.com |
| Local site | http://127.0.0.1:3000 |
| GitHub repo | https://github.com/bhargava-gumpula/Website |
