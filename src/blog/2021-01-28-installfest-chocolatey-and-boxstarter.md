---
title: "Installfest: chocolatey and boxstarter"
date: 2021-01-28T18:44:00.00Z
contentKey: blog
---

Automate everything!

Things you have to do over and over (and with VMs, this means setting up your dev environment -- maybe as often as every morning workday) -- should be scripted, so you don't have to violate the DRY principle -- DON'T REPEAT YOURSELF.

'Scripting' means you need `powershell` (windows) or `bash` shell (Linux).  Both are important and both work on either platform.  You can run `powershell` on Linux, and `bash` on Windows, and often will.

Before we get to *unattended automation* -- installing software on 10s or 10,000s of machines, where you can't observe every one of them -- we should lay the foundations in our daily work.

For windows, that means using the `nuget` packaging system, `chocolatey` installer (a pun on 'chocolatey nougat' -- get it?), and sometimes `boxstarter` packages for building VMs from the ground up.  There are also more complex technologies that are used in 'Enterprise' settings, for example `chef`, which uses `Ruby` as a scripting language.

1. Make sure you can start a powershell 'administrative' shell

2. Install `chocolatey`:

https://chocolatey.org/install <- remember chocolatey.org so you can find the below install instructions when you actually need them!

Paste and go (you can either start an *Administrative* `PowershellISE` 'Integrated Scripting Environment' and paste it in the script portion, or just paste right at the command line):

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

This cruft will

- override your script execution policy (normally set to `Set-ExecutionPolicy RemoteSigned` which will insist that remote scripts be cryptographically signed.
- ensure that a security protocol (TLS 1.2 which is a successor to SSL) be followed
- `iex` is `Invoke-Expression` and runs what's in parens, which is create a Dot-Net object that can download an installer script from the given URL
- so, after the script is downloaded (as a 'string'), it will be execute -- SHA-ZAM!

Hey - check out that script.  Click here to read: https://chocolatey.org/install.ps1

BTW, this will place a handy copy of 7zip at `C:\ProgramData\chocolatey\tools\7z.exe` which can be used in your own scripting, if you are sure it's been downloaded.  No need to install WinZip or your favourite unzip utility.

3. Now that `chocolatey` is installed, you can install other things (always using an administrative powershell), using the `choco install` command or its abbreviation, `cinst`:

Go ahead -- give this a try.  Select 'Y' or 'A' (Yes to all) when prompted.

```
cinst notepadplusplus
cinst cmder
```

`cmder` is very important -- it gives you a commandline environment for `cmd` ('the DOS prompt' or 'The Windows command line interpreter' or 'the console'), and `bash` along with `git`, which is very important for development, and finally a place to run the `powershell`.

The utility is installed at `C:\Tools\Cmder` and you should make a shortcut on your desktop that will find the `.exe` application and launch it.  Have it open in your `HOME` directory (`c:\users\myusername`)

Feel free to search `chocolatey.org` for other packages of interest and install this way.  Under the covers, chocolatey uses the `nuget.exe` commandline facility, which is essential to `dotnet` development.  Let's install that too!

```
cinst nuget.commandline
```

You don't really need to do this at this time, but later on you will add this step to your 'installfest routine':

4. Install `boxstarter.org` -- some powershell scripts to aid further installation and the use of VMs:

```
cinst boxstarter
```
