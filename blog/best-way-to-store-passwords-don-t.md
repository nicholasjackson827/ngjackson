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

In this post, I'll first outline some alternatives, then explain 4 reasons why you should not manage your own passwords: reduced liability, less code to maintain, more simplicity in the logic, and a better end user experience. 

## Alternatives to Password Storage

The end goal of password management is authentication. Authentication is simply answering the question "Is this person who they say they are?" (not to be confused with authentication, see [this StackOverflow answer](https://stackoverflow.com/a/6556548/3251199) for a good distinction between authentication and authorization). Passwords are a simple way to authenticate a user, but there are plenty of other ways, too. 

### Option 1: OAuth

[OAuth](https://en.wikipedia.org/wiki/OAuth) is "an open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwords." The OAuth standard is incredibly popular and is used by nearly all major tech companies such as Amazon, Google, Facebook, Microsoft, and Twitter. The beauty of OAuth is that it allows an application to authenticate a user without ever touching a password. 

How does OAuth work? At a very high level, you essentially set up a trust with a third party application that handles the authentication for you. This third party app sends you information about the user in the form of a token. Your application trusts this token (thanks to encryption) and uses it to verify who is accessing your application. I'll leave the technical details on implementation up to [the experts](https://developers.google.com/actions/identity/oauth2), but that's not required for this article. There's also a [long list of libraries](https://oauth.net/code/) for every popular language to help you get started. 

This also provides great end-user experience, but more on that later. 

### Option 2: SAML

[SAML](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language) (or the Security Assertion Markup Language) is "an open standard for exchanging authentication and authorization between parties, in particular, between an identity provider and a service provider." SAML is similar to OAuth at a high level in that tokens are exchanged between your application (the service provider) and a third party (the identity provider) that you trust so that you don't have to manage passwords. 

How does SAML differ from OAuth? [This article](https://www.ubisecure.com/uncategorized/difference-between-saml-and-oauth/) goes into much more detail, but in summary, OAuth excels at delegated access (like if you need to perform an action on someone's behalf, like posting a tweet for someone) where SAML excels at authentication and provides some authorization capabilities as well. The article accurately notes that SAML is more popular and functional in enterprise SSO (single sign-on) environments, so if that applies to you, I'd highly recommend reaching for SAML over OAuth. 

### Option 3: Proprietary Solutions

There are plenty of companies out there trying to roll out their own alternatives to (or layers on top of) OAuth/SAML. Some examples include [Google Sign-In](https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin), [Google Firebase Auth](https://firebase.google.com/docs/auth/), [Log in with Twitter](https://developer.twitter.com/en/docs/twitter-for-websites/log-in-with-twitter/guides/browser-sign-in-flow), or [Amazon Cognito](https://aws.amazon.com/cognito/). If your application already heavily relies on one of these providers, they're definitely worth a look. 

## Benefits to Password-less Authentication

Now that we've discussed the *how*, let's discuss the *why*. Some benefits may be obvious, but some of them are not. Let's look at some of the benefits in detail: 

### Reduced Liability

The first and most obvious benefit to passwordless authentication is the reduced liability. No longer do you have to worry about ensuring your passwords are collected, transferred, and stored securely. You pass that liability onto someone else. 

A proper skeptic will be weary of passing liability onto another company. Admins who like to be fully in control would rather have that liability on themselves so they can control their own destiny. If that is you, I challenge you to think about the stakes for the company who you are passing your liability onto. If a company like Google has a breach or a bug that makes you vulnerable, you can be assured that Google will make it a top priority to fix the vulnerability as they have skin in the game too (and much more than you do, at that). Many of these companies utilize their own authentication services to provide functionality such as [Microsoft's Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) which utilizes OAuth to authenticate the user. This should ease even the most extreme skeptic.

### Less Code to Maintain

While there are plenty of libraries that help you with salting and hashing of passwords, there's still lots of wiring of pieces that needs to be done on an application by application basis. Code needs to be written to collect, validate, and handle user credentials in every application that uses passwords. But this is not the only code/logic that needs to be handled. What if a user forgets their password? A flow needs to be written to expire their old password, send a password reset email with a token, validate that token, and set a new password. What if a user wants to update their email or any other attributes on their profile? Flows must be written to handle these cases, too. 

If your application contains sensitive data (or you like to err on the safe side) and would like to implement multi-factor authentication (MFA), that includes a whole host of code/logic that needs to be written, even if you use a service like Twilio to send the text messages. However, if you use a service like Amazon Cognito, configuring MFA requires [no code at all.](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-mfa.html)

Sure, implementing OAuth will require some code/configuration, but libraries and tools make it *far* easier to add into your application. 

### Increased Simplicity

Developers who are familiar with the password flow may argue that it is more simple than something like OAuth, but to a new developer, it is hard to beat the simple and straight forward approach taken by OAuth. This simplicity is extended even further by services that hide much of this under the hood. Take this code snippet from the [Google Sign-In for web tutorial](https://developers.google.com/identity/sign-in/web/):

```html
<html lang="en">
  <head>
    <meta name="google-signin-scope" content="profile email">
    <meta name="google-signin-client_id" content="YOUR_CLIENT_ID.apps.googleusercontent.com">
    <script src="https://apis.google.com/js/platform.js" async defer></script>
  </head>
  <body>
    <div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
    <script>
      function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
      };
    </script>
  </body>
</html>
```

This is hard to beat when it comes to complex topic like web authentication. This provides more functionality than a password flow with less code. 

### Better User Experience

The first three benefits have been all developer related, but for those who care about the end user experience too, you're in luck! There's a whole host of benefits for the end user, too. 

#### One Less Password

For the vast majority of the population who doesn't use a password manager, it is a huge headache to remember different passwords for each application (that is, if they are following proper security best practices). By allowing the user to sign in to your application with their Google, Twitter, or Facebook password, that's one less password for the user to maintain. (And even if they do forget it, you don't have to handle the password reset flow!)

#### SSO-like Functionality

If you integrate with a provider that the user is most likely already logged into, there will be no need for the user to re-enter their credentials to log in to your application as the provider will just use their existing session. This will provide near-SSO functionality which is a beautiful thing. 

If you are in an enterprise environment (or not) and choose to go with SAML, you can get true SSO functionality across all of the applications you maintain, and many that you don't. Nearly all SaaS platforms provide SAML configuration with your SSO provider right out of the box. 

#### Better Conversion Rates

If your goal is to have users sign up for your product or create an account, any additional steps required by the end user hurt conversion rates. If your potential customer sees that they need to create an account to access your product, this will be a huge hurdle for them to overcome. Instead, if they are able to sign in with an account they already have, this can lead to an easier onboarding flow leading to a higher conversion ratio.

#### Increased Trust

Security-conscious users will be weary of handing off their email address and password (especially if they only use one password) to an unknown source as they have no idea what you do with their password once they log in. They are far more likely to trust a known source with their data, or even better yet, a source they already trust.

## Conclusion

Authentication flows without passwords aren't without their flaws, but the pros far outweigh the cons for both the developers and the end users. You should consider a password-less authentication flow for your next application. 

Leave a comment below with any questions, comments, or concerns!
