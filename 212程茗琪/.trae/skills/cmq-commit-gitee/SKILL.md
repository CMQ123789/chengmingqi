---
name: cmq-commit-gitee
description: 提交项目并推送到 Gitee 仓库 mmm.git。当用户要求提交项目、提交代码、commit、push、推送到 gitee、同步代码到远程仓库时使用。不用于推送到 gitee 以外的其他远程仓库。
---

# 提交项目（commit 并 push 到 Gitee mmm.git）

将本项目的变更提交到 Git 并推送到 Gitee 仓库。全程使用 Shell 工具执行命令。

## 仓库事实（勿重新推导）

- Git 仓库根：`C:\网站设计和3D可视化应用课\高级网页设计\xiaoli`（当前工作目录 `212程茗琪` 的上级目录），所有 git 命令用 `git -C` 指定该根目录执行
- 默认分支：`master`
- 已有远程 `origin` 指向 `https://gitee.com/neusoft_wangyao_jsj/xiaoli.git`，**本 skill 不改动 origin**，固定推送目标为 `https://gitee.com/neusoft_wangyao_jsj/mmm.git`
- 认证：Gitee 私人令牌**不写入本文件**（防止随仓库泄露）。令牌存放在本 skill 目录下的 `gitee_token.local`（已被 .gitignore 的 `*.local` 规则排除、不会入库），执行推送前先读取该文件取得 `GITEE_TOKEN`，以 `用户名:令牌` 形式内嵌在一次性推送 URL 中。**用户名必须是 `chengming_qi`**（实测该令牌配 `neusoft_wangyao_jsj`、`li-xingdaa`、`cheng` 等均报 The token username invalid，配 `chengming_qi` 或 `13020358823` 可通过）。若 `gitee_token.local` 不存在或令牌失效，向用户索取新令牌

## 执行步骤

1. **查看变更**（并行执行）：

   ```powershell
   git -C "C:\网站设计和3D可视化应用课\高级网页设计\xiaoli" status
   git -C "C:\网站设计和3D可视化应用课\高级网页设计\xiaoli" diff --stat
   git -C "C:\网站设计和3D可视化应用课\高级网页设计\xiaoli" log --oneline -5
   ```

2. **暂存**：默认 `git add -A`；若用户点名了文件，只加用户指定的文件。

3. **提交**：提交信息用简短中文说明本次变更的目的（1–2 句），通过 HEREDOC 传入：

   ```powershell
   git -C "C:\网站设计和3D可视化应用课\高级网页设计\xiaoli" commit -m @'
   提交信息第一行

   补充说明（可选）
   '@
   ```

   若没有任何变更（无未跟踪文件且无修改），不创建空提交，直接告知用户并结束。

4. **推送**（先从 `gitee_token.local` 读取 GITEE_TOKEN，将下述 URL 中的 `<GITEE_TOKEN>` 占位符替换为真实令牌后执行；当前分支推到同名远程分支）：

   ```powershell
   git -C "C:\网站设计和3D可视化应用课\高级网页设计\xiaoli" push https://chengming_qi:<GITEE_TOKEN>@gitee.com/neusoft_wangyao_jsj/mmm.git HEAD
   ```

5. **报告结果**：完成属实的 push 后，向用户报告 commit 短哈希、提交信息、推送的分支与目标仓库地址。

## 红线

- 禁止 `git push --force` / `--force-with-lease`，除非用户明确要求
- push 被拒绝（远端有新提交）时：先 `git fetch <同 URL>` 并向用户说明差异、询问处理方式，不要自行 rebase/merge 后强推
- 令牌只允许存在于 `gitee_token.local`（不入库）和一次性 push 命令中；禁止把带令牌的 URL 通过 `git remote add` / `git remote set-url` 持久化到 `.git/config`
- 仓库根包含 `212程茗琪/.trae/skills/` 与 `cmq_prompt.md`——**这些文件中禁止出现令牌明文**；用户提示词中的令牌记录为 `[REDACTED]` 占位符
- 不要跳过 git hooks，不要使用 `--no-verify`
