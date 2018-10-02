---
path: /dont-store-passwords
date: 2018-10-02T14:38:20.898Z
title: 'Best Way to Store Passwords: Don''t!'
tags:
  - passwords
  - security
  - oauth
  - identity management
---
There are [lots](https://www.owasp.org/index.php/Password_Storage_Cheat_Sheet), [and lots](https://blog.conviso.com.br/worst-and-best-practices-for-secure-password-storage/), [and lots](https://nakedsecurity.sophos.com/2013/11/20/serious-security-how-to-store-your-users-passwords-safely/) of articles on the web about how to safely store passwords in your application. And there's good reason for it: nearly every application needs some kind of authentication and there are plenty of wrong ways to handle it. However, one idea is under-represented in this arena, and that's *not managing passwords at all*. 

In this post, I'll first outline some alternatives, then explain 4 reasons why you should not manage your own passwords: less liability, less code to maintain, more simplicity in the logic, and a better end user experience. 

## Alternatives to Password Storage

The end goal of password management is authentication. Authentication is simply answering the question "Is this person who they say they are?" (see [this StackOverflow answer](https://stackoverflow.com/a/6556548/3251199) for a good distinction between authentication and authorization). Passwords are a simple way to authenticate a user, but there are plenty of other ways, too. 

### Option 1: OAuth

[OAuth](https://en.wikipedia.org/wiki/OAuth) is "an open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords." The OAuth standard is incredibly popular and is used by nearly all major tech companies such as Amazon, Google, Facebook, Microsoft, and Twitter. The beauty of OAuth is that it allows the authentication of a user without ever touching a password. 

How does OAuth work? At a very high level, you essentially set up a trust with a third party application that handles the authentication for you. This third party app sends you information about the user in the form of a token. Your application trusts this token (thanks to encryption) and uses it to verify who is accessing your application. I'll leave the technical details on implementation up to [the experts](https://developers.google.com/actions/identity/oauth2), but that's not required for this article. There's also a [long list of libraries](https://oauth.net/code/) for every popular language to help you get started. 

This also provides great end-user experience, but more on that later. 

### Option 2: SAML

[SAML](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language) (or the Security Assertion Markup Language) is "an open standard for exchanging authentication and authorization between parties, in particular, between an identity provider and a service provider." SAML is similar to OAuth at a high level in that tokens are exchanged between your application (the service provider) and a third party (the identity provider) that you trust so that you don't have to manage passwords. 

How does SAML differ from OAuth? [This article](https://www.ubisecure.com/uncategorized/difference-between-saml-and-oauth/) goes into much more detail, but in summary, OAuth excels at delegated access (like if you needed to post a tweet on someone's behalf) where SAML excels at authentication and provides some authorization capabilities as well. The article notes that SAML is more popular in enterprise SSO (single sign-on) environments, which is true, so if that applies to you, I'd highly recommend reaching for SAML over OAuth. 

### Option 3: Proprietary Solutions

There are plenty of companies out there trying to roll out their own alternatives to (or layers on top of) OAuth/SAML. Some examples include [Google Sign-In](https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin), [Google Firebase Auth](https://firebase.google.com/docs/auth/), [Log in with Twitter](https://developer.twitter.com/en/docs/twitter-for-websites/log-in-with-twitter/guides/browser-sign-in-flow), or [Amazon Cognito](https://aws.amazon.com/cognito/). If your application already heavily relies on one of these providers, they're all definitely worth a look. 

## Benefits to 
