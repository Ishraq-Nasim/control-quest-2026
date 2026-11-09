# Control Quest 2026: Showcase Section

A one-page showcase of Control Quest 2026 (Unilever Bangladesh, Corporate Office) and Ishraq Nasim's part in organising it. Built with Next.js, TypeScript and Tailwind CSS, and deployed on Vercel.

This guide covers everything from first preview to adding photos later.

---

## What is in this folder

| Path | What it is |
|---|---|
| `components/control-quest/content.ts` | **All the words, numbers, icons and photo descriptions.** Edit this file to change text. |
| `components/control-quest/` | The section itself: layout, styles, motion. |
| `public/control-quest/bg.webp` | Hero background. |
| `public/control-quest/logo.webp` | Control Quest logo. |
| `public/control-quest/photos/` | Event photos. The gallery reads this folder automatically. |
| `app/page.tsx` | The page. It only renders the section. |

---

## 1. Preview it on your computer

Open a terminal in this folder and run:

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000. Stop it with `Ctrl + C`.

To check the real production version (what Vercel will serve):

```bash
npm run build
```

```bash
npm start
```

If `npm` or `git` is "not recognized", close the terminal and open a new one.

---

## 2. Put it on GitHub (once)

1. Sign in at https://github.com and click **New repository**.
2. Name it `control-quest-2026`. Leave README, .gitignore and license **unticked**. Click **Create repository**.
3. In this folder, run (replace `<you>` with your GitHub username):

```bash
git remote add origin https://github.com/<you>/control-quest-2026.git
```

```bash
git push -u origin main
```

A sign-in window may open the first time. Sign in to GitHub there.

If you see "remote origin already exists", skip the first command and just run `git push -u origin main`.

---

## 3. Put it online with Vercel (once)

1. Go to https://vercel.com and sign in with GitHub.
2. Click **Add New → Project**.
3. Find `control-quest-2026` and click **Import**.
4. Leave every setting as it is and click **Deploy**.
5. After about a minute you get a live link such as `control-quest-2026.vercel.app`. Share that link.

From now on, every `git push` updates the live site automatically.

Optional: in the Vercel project, **Settings → Domains** lets you add your own domain.

---

## 4. Make a change and publish it

After any edit (text, photos, anything):

```bash
git add -A
```

```bash
git commit -m "Describe the change"
```

```bash
git push
```

Vercel rebuilds and the live site updates in about a minute.

---

## 5. Change the words

Everything a visitor reads is in `components/control-quest/content.ts`.

- Titles stay in **Title Case** ("What Is Control Quest?").
- Body text stays in sentence case.
- **Day names and topic names are locked** to the official agenda. Do not rename or shorten them.
- Each title and label has an `icon` name next to it. Icon names come from `components/control-quest/icons.ts` (all from lucide.dev). To use a new icon, add it to the list in `icons.ts` first.

Confidentiality, for any new text:

- Corporate Office edition figures only. Never the Kalurghat Factory (KGF) edition.
- No dates or month. Use Day 1 to Day 5.
- No prize pool or money amounts.
- No invented numbers, quotes or results.

---

## 6. Photos

### How they appear

- **What Is Control Quest?** shows `01-case-clues.jpg`, drifting slowly as you scroll.
- **The Grand Finale** shows `02-teams-at-work.jpg`, opening out as it scrolls into view.
- **From The Event** shows every photo in the folder (up to 8) as a slow moving strip, with a Pause button and a full-size viewer.
- Visitors who turn off motion in their device settings see everything still.
- If the folder is empty, the "From The Event" section disappears completely.

### Add a photo

1. Put the file in `public/control-quest/photos/`. Use `.jpg`, `.png`, `.webp` or `.avif`.
2. Name it with a number first, for the order: `06-awards.jpg`, `07-room.jpg`.
3. In `content.ts`, under `gallery.alt`, add one line describing what is visible:

```ts
"06-awards.jpg": "Finalists receiving certificates on stage",
```

4. Publish (step 4).

### Replace a photo with a sharper copy

The current photos are 800px wide, which is a bit soft on large screens. To sharpen them, save the original phone photos with the **same file names** over the old ones, then publish. No code changes needed.

### Remove a photo

Delete the file, delete its line in `gallery.alt`, then publish.

If you remove `01-case-clues.jpg` or `02-teams-at-work.jpg`, that section simply shows no photo. To use a different photo there, change `about.photo` or `finale.photo` in `content.ts` to the new file name.

### Before adding any photo, check it shows

- no money amounts (prize boards, cheques). The amount on the champions' board in `04-champions.jpg` is already blurred.
- no dates or month on screens or banners.
- nothing from the KGF edition.

---

## 7. Moving it into a bigger website later

1. Copy `components/control-quest/` and `public/control-quest/` into the other Next.js project.
2. Install the one extra package there:

```bash
npm install lucide-react
```

3. Wherever the section should appear:

```tsx
import ControlQuestSection from "@/components/control-quest/ControlQuestSection";

<ControlQuestSection />
```

The section brings its own fonts, colours and styles, so it needs no other setup.

---

## 8. If something goes wrong

| Problem | Fix |
|---|---|
| `npm` or `git` not recognized | Close the terminal and open a new one. |
| `git push` asks for a password | Use the browser sign-in window, or sign in with GitHub Desktop once. |
| Vercel deploy fails | Open the failed deployment in Vercel, read the red lines in the build log, and run `npm run build` on your computer to see the same error. |
| A new photo doesn't appear | Check the file is directly inside `public/control-quest/photos/`, has a supported extension, and was committed and pushed. |
| Page looks old after pushing | Wait a minute, then refresh with `Ctrl + Shift + R`. |
