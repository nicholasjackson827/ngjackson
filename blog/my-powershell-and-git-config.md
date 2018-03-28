---
path: /my-powershell-config
date: 2018-03-28T01:05:11.304Z
title: My PowerShell and Git Config
tags:
  - powershell
  - git
  - environment
  - tools
---
Most web developers today use Mac OS or Linux, but I'm part of the minority that use Windows for nearly all of my development. There are great resources out there for tools like [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh) or [fish shell](https://fishshell.com/), but there's not much about how to get similar functionality out of Windows. 

This will be a quick post with a bit of background on configuring PowerShell and include my current profile option. If you just want to see my `$PROFILE`, I've published it in [this gist](https://gist.github.com/nicholasjackson827/d049de3b4218f90c0b29bbb8fa124cf5).

## Configuring PowerShell

If you have a background in Linux or Mac OS, you probably know of a file called `.bash_profile` or `.bash_rc` which contains configuration such as aliases and custom functions. Fortunately, PowerShell has similar functionality with a file called the "Profile." 

There are [lots of locations for this file](https://blogs.technet.microsoft.com/heyscriptingguy/2012/05/21/understanding-the-six-powershell-profiles/). The easiest way to find the "Current User, Current Host" profile (the one you'll be editing most) is to open up a PowerShell console, type `$PROFILE`, and hit enter. You should get a path with the location of your default profile. To edit this file, you can simply type `notepad $PROFILE` to open it up in notepad. Feel free to substitute "notepad" with any other text editor you may prefer, like `subl` for [Sublime Text 3](https://www.sublimetext.com/3) (my editor of choice).

## Customizing the Prompt

By default, the prompt (the default part of the terminal before you type your command) just shows `PS>`, something like this:

![PowerShell default terminal](/assets/conemu64_2018-03-27_21-22-01.png)

Side note: wondering how I changed the colors? I'm using a "wrapper" application called [Con Emu](https://conemu.github.io/) which I highly recommend. 

So how do we change this to something more interesting? We edit a simple function in your PowerShell profile called `prompt`. Here's a sample `$PROFILE` file:

```powershell
function prompt {

  Write-Host (pwd).Path -n
  return "> "

}
```

This function calls `Write-Host` which writes to the console the output of the `pwd` command which prints the working directory. Then, it returns a `>` to prompt the user to start typing. This is nice, but we can do better!

Here's my current `prompt` function (minus the Git functionality):

```powershell
function prompt {

  # Get the current path, but format it a bit differently
  $CurrentPath = (pwd).Path
  $ShortPath = $CurrentPath.Replace($HOME, '~').Replace("\", "/")
  $ShortPath = $ShortPath -Replace '^[^:]+::', ''

  # Write out a blank space a neat character first 
  # and an open curly brace (in blue)
  Write-Host ''
  Write-Host "$([char]0x0A7) {" -n -f Blue

  # Write out the ShortPath we made 
  Write-Host $ShortPath -n  -f Blue
  
  # Close the curly brace and add new line
  Write-Host '}' -n -f Blue

  # Write out a double arrow as the prompt
  return "$([char]0xbb) "
}
```

As a few notes for the `Write-Host` function, `-n` means don't add a new line and `-f` means format the text with the certain color (blue in this case). 

This gets us quite far, to a point where our prompt looks something like this:

![PowerShell prompt with style](/assets/conemu64_2018-03-27_21-41-14.png)

Last but not least, let's add Git configuration. 

## Adding Git Info

Anywhere inside a project, it can be nice to know the status of where you are without having to type `git status` every 5 seconds. We can bake this into our prompt with a neat PowerShell module called [posh-git](https://github.com/dahlbyk/posh-git). Follow the installation guides on GitHub to get it installed. If you have PowerShell v5 or higher, it should be as simple as `Install-Module posh-git`. 

There's tons of great documentation and sample configuration on [their wiki page](https://github.com/dahlbyk/posh-git/wiki/Customizing-Your-PowerShell-Prompt), but to boil it down, I use a simple `$(Write-VcsStatus)` after I print the directory to get the Git status. The documentation tells you exactly what each symbol means, but here's an example:

![Pretty prompt with Git!](/assets/conemu64_2018-03-27_21-51-19.png)

Just by looking at this prompt, I can tell that I'm on branch `master`, I'm not ahead or behind any commits compared to remote, I've added one file, edited 2 files, removed zero files, and there are unstaged changes in the project (meaning I haven't added them). The symbols aren't as cryptic as they seem and can actually provide more info than `git status` can!

So that's how my prompt looks right now! I change it every so often and will try to update the gist as I update it locally. As always, let me know if you have any questions!
