---
name: github-auto-commit
description: 提交项目并推送到 GitHub 仓库 CMQ123789/chengmingqi（SSH 公钥认证）。当用户要求提交到github、push到github、同步代码到github时使用。不用于 Gitee 提交（Gitee 用 cmq-commit-gitee）。
---

# 提交到 GitHub（commit 并 push 到 CMQ123789/chengmingqi）

将本项目的变更提交到 Git 并推送到 GitHub。全程使用 Shell 工具执行命令。

## 安全红线（每次执行前必读）

- 本仓库提交历史包含 `212程茗琪/cmq_prompt.md` 与 `212程茗琪/.trae/skills/cmq-commit-gitee/SKILL.md`，**其中含有 Gitee 私人令牌明文**。推送前必须先向用户确认 GitHub 仓库为私有、或用户明确接受公开风险；若仓库公开且用户未确认，停下来询问，不要直接推。

## 仓库事实（勿重新推导）

- Git 仓库根：`C:\网站设计和3D可视化应用课\高级网页设计\xiaoli`（当前工作目录 `212程茗琪` 的上级目录），所有 git 命令用 `git -C` 指定该根目录执行
- 默认分支：`master`
- 推送目标：`git@github.com:CMQ123789/chengmingqi.git`（SSH 方式，公钥已配置，账号 `CMQ123789`，实测 `ssh -T git@github.com` 返回认证成功）
- 本机 SSH 自动走 443 端口回退（ssh.github.com:443），属正常配置，不要改动 SSH 配置
- 已有远程 `origin` 指向 Gitee xiaoli.git，**不要改动 origin、不要添加持久化远程**，GitHub 地址只出现在一次性 push 命令里
- 与 Gitee 的 mmm.git 是两个独立目标，不要混用；Gitee 提交走 `.trae/skills/cmq-commit-gitee/SKILL.md`

## 执行步骤

1. **查看变更**（并行执行）：

   ```powershell
   git -C "C:\网站设计和3D可视化应用课\高级网页设计\xiaoli" status
   git -C "C:\网站设计和3D可视化应用课\高级网页设计\xiaoli" diff --stat
   git -C "C:\网站设计和3D可视化应用课\高级网页设计\xiaoli" log --oneline -5
   ```

2. **暂存**：默认 `git add -A`；若用户点名了文件，只加用户指定的文件。

3. **提交**：提交信息用简短中文说明本次变更的目的（1–2 句），通过 PowerShell here-string 传入：

   ```powershell
   git -C "C:\网站设计和3D可视化应用课\高级网页设计\xiaoli" commit -m @'
   提交信息第一行

   补充说明（可选）
   '@
   ```

   若没有任何变更，不创建空提交，直接告知用户并结束。

4. **推送**（当前分支推到同名远程分支）：

   ```powershell
   git -C "C:\网站设计和3D可视化应用课\高级网页设计\xiaoli" push git@github.com:CMQ123789/chengmingqi.git HEAD
   ```

5. **报告结果**：完成属实的 push 后，向用户报告 commit 短哈希、提交信息、推送的分支与目标仓库地址。

## 红线

- 禁止 `git push --force` / `--force-with-lease`，除非用户明确确认
- push 被拒绝（远端有新提交）时：先 `git fetch git@github.com:CMQ123789/chengmingqi.git master`，向用户说明差异并询问处理方式，不要自行 rebase/merge 后强推
- 不要跳过 git hooks，不要使用 `--no-verify`
- 路径含中文，命令中的路径必须加引号
