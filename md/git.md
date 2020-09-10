# git使用



## git提交规则:

```
feat：新功能
fix：修复bug
doc：文档改变
style：代码格式改变
refactor：某个已有功能重构
perf：性能优化
test：增加测试
build：改变了build工具 如 grunt换成了 npm
revert：撤销上一次的commit
```

```
git init
```

仓库地址的情况

```
git remote -v 
git remote  add origin http://xxx.com
```

日常写代码用到的

```
0. git status
1. git add .
2. git commit -m "我做了什么事情"
:wq（merge代码时有时会出现提交日志提示，“:wq”意思为保存并退出）
3. git push
4. git pull  = git merge origin 同名分支
5. git branch branch_name (从当前分支新建一个branch_name的分支出来)
6. git checkout branch_name (切去我刚建的分支)
7. git merge origin_branch (挪人家的代码过来)
8. git log
9. git branch
10. git branch -D branch_name（删除分支）
```

可以更深研究的

```bash
git rebase (变基，可以了解一下)
git reset (回滚)
git reset --hard xxxx (回滚到某个commit)
git reflog (查看本地git做了啥)

# 注意：git reset参数
--soft 回退后a分支修改的代码被保留并标记为add的状态（git status 是绿色的状态）
--mixed 重置索引，但不重置工作树，更改后的文件标记为未提交（add）的状态。默认操作。
--hard 重置索引和工作树，并且a分支修改的所有文件和中间的提交，没提交的代码都被丢弃了。
--merge 和--hard类似，只不过如果在执行reset命令之前你有改动一些文件并且未提交，merge会保留你的这些修改，hard则不会。【注：如果你的这些修改add过或commit过，merge和hard都将删除你的提交】
--keep 和--hard类似，执行reset之前改动文件如果是a分支修改了的，会提示你修改了相同的文件，不能合并。如果不是a分支修改的文件，会移除缓存区。git status还是可以看到保持了这些修改。

git revert 后会多出一条commit，这里可进行回撤操作
git reset 直接把之前 commit 删掉，非 git reset --hard 的操作是不会删掉修改代码，如果远程已经有之前代码，需要强推 git push -f
```

平时可能会用到的

```
git fetch 
git fetch master_nonghang
git checkout master_nonghang
git merge master
git checkout master
git merge nong
git checkoout dbxxx
git checkout tencent
git merge dbxx
git checkout dbxx 
git merge tencent
git push origin dbxx
git fetch
git checkout dbxx 
git pull
git branch --set-upstream-to=origin/master master
```

打tag标签

```shell
# 列出已有的tag标签 可以通过-l命令过滤特定的tag
git tag
git tag -l "v1.3.*"
# 新建tag
git tag v1.0
# 还可以加上-a参数来创建一个带备注的tag，备注信息由-m指定。如果你未传入-m则创建过程系统会自动为你打开编辑器让你填写备注信息。
git tag -a tagName -m "my tag"
# git show命令可以查看tag的详细信息，包括commit号等。
git show tagName
# 给指定的某个commit号加tag
git tag -a v1.2 9fceb02 -m "my tag"
git tag -a v1.2 9fceb02
# 使用git push origin [tagName]推送单个分支。
git push origin [tagName]
# 推送本地所有tag，使用git push origin --tags
git push origin --tags
# 删除
git tag -d v0.1.2 
# 远程删除
git push origin :refs/tags/<tagName>

```





```
git config --global user.name "你的名字" 让你全部的Git仓库绑定你的名字
git config --global user.email "你的邮箱" 让你全部的Git仓库绑定你的邮箱
git init 初始化你的仓库
git add . 把工作区的文件全部提交到暂存区
git add ./<file>/ 把工作区的<file>文件提交到暂存区
git commit -m "xxx" 把暂存区的所有文件提交到仓库区，暂存区空空荡荡
git remote add origin https://github.com/name/name_cangku.git 把本地仓库与远程仓库连接起来
git push -u origin master 把仓库区的主分支master提交到远程仓库里
git push -u origin <其他分支> 把其他分支提交到远程仓库
git status查看当前仓库的状态
git diff 查看文件修改的具体内容
git log 显示从最近到最远的提交历史
git clone + 仓库地址下载克隆文件
git reset --hard + 版本号 回溯版本，版本号在commit的时候与master跟随在一起
git reflog 显示命令历史
git checkout -- <file> 撤销命令，用版本库里的文件替换掉工作区的文件。我觉得就像是Git世界的ctrl + z
git rm 删除版本库的文件
git branch 查看当前所有分支
git branch <分支名字> 创建分支
git checkout <分支名字> 切换到分支
git checkout -- <filePath> // 丢弃工作区某个文件的改动
git checkout -- . // 丢弃工作区所有文件的改动
git branch -d <分支名字> 删除分支,有可能会删除失败，因为Git会保护没有被合并的分支
git branch -D + <分支名字> 强行删除，丢弃没被合并的分支
git branch --set-upstream-to=<origin/branchname> 将本地分支关联到指定的远程分支
// 或者
git branch -u <origin/branchname>
git branch --unset-upstream [<origin/branchname>] 取消本地分支和远程分支的关联
git branch -vv 查看分支以及其关联的远程分支的详细信息
git log --graph 查看分支合并图
git merge <分支名字> 合并分支
git merge --no-ff <分支名字> 合并分支的时候禁用Fast forward模式,因为这个模式会丢失分支历史信息
git stash 当有其他任务插进来时，把当前工作现场“存储”起来,以后恢复后继续工作
git stash list 查看你刚刚“存放”起来的工作去哪里了
git stash apply 恢复却不删除stash内容
git stash drop 删除stash内容
git stash pop 恢复的同时把stash内容也删了
git stash clear 清空贮藏列
git remote 查看远程库的信息，会显示origin，远程仓库默认名称为origin
git remote -v 显示更详细的信息
git pull 把最新的提交从远程仓库中抓取下来，在本地合并,和git push相反
git rebase 把分叉的提交历史“整理”成一条直线，看上去更直观
git tag 查看所有标签，可以知道历史版本的tag
git tag <name> 打标签，默认为HEAD。比如git tag v1.0
git tag <tagName> <版本号> 把版本号打上标签，版本号就是commit时，跟在旁边的一串字母数字
git show <tagName> 查看标签信息
git tag -a <tagName> -m "<说明>" 创建带说明的标签。 -a指定标签名，-m指定说明文字
git tag -d <tagName> 删除标签
git push origin <tagname> 推送某个标签到远程
git push -u origin <branchname> // 推送到远程指定分支，并创建关联
git push -f // --force 的缩写 强制推送到远程分支
git push --force-with-lease 在他人推送了新的提交的情况下，强制推送会被拒绝
git push origin --tags 一次性推送全部尚未推送到远程的本地标签
git push origin :refs/tags/<tagname> 删除远程标签<tagname>
git push -d origin <branchname> 删除远程分支
// 或者
git push origin :branchname
git branch -m <branchname> [<targetBranch>] // 将目标分支 移动/重命名 到新分支	
git config --global color.ui true 让Git显示颜色，会让命令输出看起来更醒目
git add -f <file> 强制提交已忽略的的文件
git check-ignore -v <file> 检查为什么Git会忽略该文件
git fetch -p  // --prune(修剪)的缩写 获取远程仓库的新分支以及删除远程仓库已删除的分支（本地版本库中的分支）
git pull --rebase
git pull = git fetch + git merge // 拉取到本地版本库 + 合并到本地工作区
git pull --rebase = git fetch + git rebase // 拉取到本地版本库 + 工作区变基到最新版本库
```

