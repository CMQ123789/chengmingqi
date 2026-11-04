# AGENTS.md

Static personal course project (高级网页设计/3D 可视化). Plain HTML/CSS/JS with vendored assets; no package manager, build, test, lint, or dev server. Do not invent scripts.

## Layout / paths

- Work in this folder (`212程茗琪/`); `index.html` is the entry and is self-contained (inline CSS only, pulls the local `font/` icon font).
- The Git repo root is the parent `xiaoli/` (contains `.git`, `README*.md`, `.gitignore`, and a duplicate `img/`). Run `git -C "<repo root>" ...`.
- Paths contain Chinese characters; always quote them in PowerShell/bash.
- Files are UTF-8. Terminal output may look garbled on this machine; use the read/grep tools rather than trusting shell `cat`.

## Preview

- No dev server script. Run `python -m http.server` inside this folder, then open `http://localhost:8000/`.
- `2.html` needs internet (iconfont symbol JS from `at.alicdn.com`). Most other pages are offline-capable via `cdn/fontawesome/`, `cdn/lucide/`, and `font/iconfont.js`; keep using these local copies instead of remote CDNs.

## Pages / conventions

- `index.html`'s 课堂目录 is hand-maintained: 5 cards plus a "coming soon" card; card 05 links `./24002120212--程茗琪/index.html`.
- Showcase set: `iconfont-1.html` (local Font Awesome), `inconfont-2.html` (local Lucide SVG; filename is misspelled — reproduce it exactly in links), `iconfont-3.html`/`iconfont-4.html` (local iconfont). They link to each other but are NOT in the index catalog.
- Unreferenced legacy exercises exist (`data Type.html` — contains a space —, `js_boj_apply.html`, `obj005.html`, `font/event005.html`, `font/function_apply.html`, `font/JS_obj_fun005.html`). Don't assume every HTML file is part of the catalog.
- `font/` is mixed: `iconfont.*`, `demo.css`, `demo_index.html` are generated iconfont output (don't hand-edit); the other `font/*.html` files are hand-written JS exercises.
- New showcase pages follow the `cmq_` naming convention for CSS classes/IDs, JS functions, and `--cmq_*` custom properties.
- Every newly created HTML file must start with a header comment right after `<!DOCTYPE html>` containing author, creation date, model used, and the feature name, e.g.:

  ```html
  <!--
    作者：程茗琪
    建立时间：2026-11-04
    使用大模型：GLM-5.3-Flash
    功能名称：<本页功能，如 图标展示馆 / 移动端底部导航>
  -->
  ```

  Update the date when a page is substantially rebuilt; the model field records the model that authored the change.
- Every JS function gets a comment immediately above it stating its main functionality (one line `// 功能：...` for simple functions, or a `/** 参数/返回值 */` block for functions with non-obvious signatures). Apply this to existing functions when rewriting them, not retroactively to untouched code.
- `download/` is a stale copy of `css/` plus an empty `demo.css`; nothing references it.
- Duplicate UI folders: `24002120212--程茗琪/` is the one linked from index (legacy; images are named `%.jpg`, `&.jpg`, `+.jpg`, and Chinese names — `%.jpg` is an invalid URL). `24002120212cmq/` is a near-identical cleaned copy using ASCII image aliases plus extra iconfont files, but nothing links to it. Confirm which is canonical before editing; don't edit both blindly.

## Known CSS bugs (fix when touching)

- In `css/flexcss.css`, the parent class is misspelled `.siderbar` while `1.html` uses `.sidebar`; the companion rule `.sidebar div` never matches.
- `.page-main.case` and `.three-columns.column` are missing a descendant space, so `.case` sections and `.column` boxes are unstyled.
- `1.html` links `./css/flexcss.css` correctly (unlike older copies of this project).

## Git / submission

- Branch `master`; `origin` is `gitee.com/neusoft_wangyao_jsj/xiaoli.git`.
- The course skill `.trae/skills/cmq-commit-gitee/SKILL.md` pushes HEAD to **mmm.git**, not `origin`. A plain `git push` goes to xiaoli, so don't treat them as equivalent.
- `.trae/skills/github-auto-commit/SKILL.md` pushes HEAD to `git@github.com:CMQ123789/chengmingqi.git` over SSH (key already set up; SSH falls back to port 443). Its history contains the Gitee token files — confirm the GitHub repo is private (or user accepts exposure) before pushing.
- That skill file and `cmq_prompt.md` contain a Gitee token. Never print, copy, commit, or re-embed it; don't write it into `.git/config`; don't `git remote set-url`. Token username must be `chengming_qi`.
- Commit only when asked; messages are concise Chinese descriptions.
- `cmq_prompt.md` is a prompt log; the recorded rule is to append time/model/prompt there before running complex CSS/JS edits.
