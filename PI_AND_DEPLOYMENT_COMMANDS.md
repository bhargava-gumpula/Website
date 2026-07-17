# Pi & Deployment Commands

Quick reference for running and maintaining this website on the Raspberry Pi with Cloudflare Tunnel.

**Live site:** https://www.bhargava-gumpula.com  
**Project path on Pi:** `~/Work/Website`  
**Pi SSH:** `bhargavagumpula@10.0.0.16` (same Wi‑Fi/LAN as Pi; use SSH keys)

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

This Pi may have `http_proxy` set (pm2 can inherit `HTTP_PROXY=http://192.168.1.134:4000`). That breaks Google Calendar API calls (524 timeouts on `/api/calendar/slots`).

Add to `~/Work/Website/.env`:

```text
HTTP_PROXY=
HTTPS_PROXY=
http_proxy=
https_proxy=
NO_PROXY=googleapis.com,www.googleapis.com,127.0.0.1,localhost
```

Then restart:

```bash
pm2 restart website --update-env
```

The app also bypasses proxy in code for Google Calendar, but clearing pm2 env avoids other issues.

For local checks, always use:

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

## Testimonial moderation

Add these private values to `~/Work/Website/.env`:

```text
TESTIMONIALS_ADMIN_PASSWORD=choose-a-long-unique-password
TESTIMONIALS_ADMIN_SESSION_SECRET=generate-with-openssl-rand-base64-32
```

Generate the session secret:

```bash
openssl rand -base64 32
```

After changing them, run:

```bash
pm2 restart website --update-env
```

Review submissions at:

```text
https://www.bhargava-gumpula.com/admin/testimonials
```

Private submissions are stored at:

```text
~/Work/Website/data/testimonials.json
```

Back up this file with the other runtime data. It is intentionally excluded from Git.

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
| Pi SSH | `bhargavagumpula@10.0.0.16` |
| GitHub repo | https://github.com/bhargava-gumpula/Website |

Deploy over SSH from your Mac (SSH key auth; same network as Pi):

```bash
ssh bhargavagumpula@10.0.0.16 'cd ~/Work/Website && git pull && npm ci && npm run build:webpack && pm2 restart website'
```

Optional SSH shortcut — add to `~/.ssh/config` on your Mac:

```text
Host pi
    HostName 10.0.0.16
    User bhargavagumpula
    IdentityFile ~/.ssh/id_ed25519
```

Then: `ssh pi 'pm2 status'`

---

## Static IP for the Pi (recommended)

The Pi IP can change after reboot (DHCP). A fixed IP makes SSH and admin easier.  
**Note:** Your public website still works if the IP changes (Cloudflare Tunnel). Static IP is mainly for SSH/local access.

### Option A — Router DHCP reservation (recommended)

1. On the Pi, get MAC address:
   ```bash
   ip link show wlan0    # Wi‑Fi
   ip link show eth0     # Ethernet
   ```
   Look for `link/ether xx:xx:xx:xx:xx:xx`

2. Log into your router admin (often `http://10.0.0.1`).

3. Find **DHCP reservation**, **Address reservation**, or **Static lease**.

4. Reserve **`10.0.0.16`** (or your preferred address) for the Pi’s MAC address.

5. Reboot the Pi and confirm:
   ```bash
   hostname -I
   ```

No Pi config file changes needed; the router always assigns the same IP.

### Option B — Static IP on the Pi (`dhcpcd`)

Use only if you cannot use router reservations. Replace interface name if needed (`wlan0` or `eth0`).

```bash
sudo nano /etc/dhcpcd.conf
```

Add at the end (adjust gateway/DNS if your router differs):

```text
interface wlan0
static ip_address=10.0.0.16/24
static routers=10.0.0.1
static domain_name_servers=10.0.0.1 8.8.8.8
```

Apply:

```bash
sudo reboot
hostname -I    # should show 10.0.0.16
```

**Warning:** Pick an IP outside your router’s DHCP pool, or reserve the same IP in the router to avoid conflicts.
