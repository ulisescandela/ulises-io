---
title: "How the Internet Works When You Open a Website: DNS, HTTPS and the Browser"
sourceSlug: como-funciona-internet-al-abrir-una-web
category: Programming
date: '2026-10-10'
excerpt: "Follow a web page from URL and DNS to HTTPS, the server and browser rendering. Includes examples and a practical guide to finding loading errors."
published: true
translated: '2026-10-10'
---

You type an address, press Enter and a page appears. Between those actions, networks, servers and programs solve different problems. **Understanding how the Internet works when you open a website helps you diagnose errors and make better decisions when building applications.**

We will follow a visit to `https://example.com/productos?orden=precio`. You do not need server administration experience: start by understanding who does what. This is a typical loading journey; caches, existing connections and installed applications can skip some steps.

## The Internet and the web are different things

The Internet connects networks and carries data between devices. The web is one service built on that infrastructure: it publishes resources identified by addresses and exchanges them using HTTP. Email and other services also use the Internet without being web pages.

Think of a store: the network lets you reach it, the address identifies the destination and HTTP defines how to request a resource. The browser turns the response into an interface you can read and use. No single piece performs every task.

## A web page’s complete journey

| Step | Question it answers | Result |
| --- | --- | --- |
| URL | Which resource do I want? | Scheme, domain, path and parameters |
| DNS | Which address corresponds to the domain? | Records that help locate the destination |
| Connection | How do I exchange data with that destination? | A communication channel |
| TLS | How is HTTPS communication protected? | Encryption and server authentication |
| HTTP | What do I request and receive? | Request, status, headers and content |
| Browser | How is that content presented? | Document, styles, pixels and interaction |

These steps do not always happen in a strictly sequential order. A browser can download several resources while parsing the document and reuse one connection for many requests.

## 1. The URL identifies a resource

In our example, `https` is the scheme, `example.com` is the domain, `/productos` is the path and `orden=precio` is a query parameter. The application decides what that parameter means: its name alone does not make the server sort anything.

A fragment such as `#opiniones` is normally handled by the browser and is not sent in the HTTP request. That is why a link can take you to a section without requesting another page.

A path does not have to identify a physical file. A server can generate the response on demand, retrieve a previously prepared page or delegate work to another service.

## 2. DNS helps locate the domain

Names are convenient for people; networks need addresses. DNS distributes information about domains. A and AAAA records map names to IPv4 and IPv6 addresses; other record types serve different purposes.

You typically query a resolver, which may already have the answer cached. When it needs to look up an answer, it follows the DNS hierarchy to obtain information from authoritative servers. There is no single computer holding every domain on the Internet.

One domain can lead to multiple addresses and distributed infrastructure. Changing a DNS record does not update every cache immediately: the TTL affects how long an answer can be retained.

**If DNS fails, you have not yet received an error from your application.** Check the name, its records and the resolver before changing your form code or database.

## 3. The connection carries the data

Data travels in packets through networks and equipment that route it. Perceived speed depends on more than your connection’s advertised megabits: distance, congestion and packet loss matter too.

HTTP/1.1 and HTTP/2 commonly use TCP, which provides a reliable, ordered stream. HTTP/3 uses QUIC over UDP and incorporates TLS. Explaining every navigation as “TCP first, then TLS” therefore leaves out part of the modern web.

Browsers can reuse connections. Loading an image does not necessarily require repeating every setup step needed for the main document.

## 4. HTTPS protects communication with TLS

HTTPS uses TLS to protect data in transit and authenticate the server through certificates, among other functions. This makes it harder for an intermediary to read or alter the exchanged content.

**HTTPS does not prove that a business is honest or that an application has no vulnerabilities.** A fraudulent site can also have a valid certificate. Encryption protects the channel; user decisions and application security still matter.

An expired certificate or a mismatched hostname can trigger a warning before the page appears. Changing CSS will not fix it: check the certificate and destination configuration.

## 5. HTTP organizes requests and responses

The browser requests a resource. A typical read uses GET. Headers provide context, and the response includes a status code, headers and, where appropriate, a body.

| Status | Meaning | What to check |
| --- | --- | --- |
| 200 | The request succeeded | The content can still be wrong |
| 301 or 308 | Permanent redirect | Destination and redirect chains |
| 404 | Resource not found | Path, links and publication |
| 500 | Internal server error | Application logs and dependencies |
| 503 | Service unavailable | Capacity, maintenance or infrastructure |

These codes describe protocol outcomes. A blank screen can arrive with status 200 if the HTML loads but JavaScript fails afterward. A 404 can return a beautifully designed page explaining the error.

The server might respond from a cache, execute code or query a database. **A CDN can serve content through distributed infrastructure**, reduce the distance to users and save repeated work at the origin server. It does not eliminate every query or performance problem.

## 6. The browser turns the response into a page

HTML describes structure, CSS defines presentation and JavaScript can add behavior. The browser builds internal representations of the document and styles, calculates positions and draws the result.

HTML may also reference images, fonts and scripts. Those references trigger more requests, sometimes to other domains. An apparently simple page can depend on many resources.

A fast server does not guarantee a fast interface. Large images, expensive scripts or excessive main-thread work can delay both visible content and interaction. Measure performance at the server and in the browser.

## Caches: why the second visit can be different

A cache retains responses for reuse under applicable rules. Browsers, DNS resolvers and infrastructure such as CDNs have caches; they do not store the same things or invalidate them in the same way.

HTTP headers help control reuse. An updated resource can still look old if its policy allows a cached version to remain. Disabling caching in browser developer tools helps investigation, but does not automatically change what other users have stored.

When deploying an application, check how both the document and its resources are updated. Giving a changed file a new name distinguishes versions without requiring every cache to be cleared simultaneously.

## Exercise: inspect a real page load

Open your browser’s developer tools, select **Network** and reload a public page. Exact option names vary between browsers.

1. Find the document request and inspect its URL and status.
2. Open the headers: look for the content type and caching rules.
3. Examine timing information to distinguish waiting from downloading. Some steps may be absent when a connection was reused.
4. Count image, script and font requests. Identify which use other domains.
5. Compare a normal reload with one performed while caching is disabled and developer tools remain open.

Do not publish screenshots of headers containing cookies or tokens. The goal is to understand a page load, not share session credentials.

## Finding where a website fails

Start with the layer closest to the evidence. If the domain does not resolve, check DNS. If there is a certificate warning, check TLS. For a 404, verify the path and whether the resource exists. For a 500, investigate server logs.

If HTML arrives with status 200 but the interface stays blank, inspect JavaScript errors and later requests. If the page works slowly, separate server delay, file transfer and browser execution before replacing your tools.

Understanding these boundaries lets you describe a concrete problem: “the document request takes too long” is more useful than “the Internet is slow.”

## Frequently asked questions

### Are DNS and hosting the same thing?

No. DNS publishes information to locate a domain’s services. Hosting runs or stores what those services provide. They can be purchased together while remaining separate functions.

### Does every click reload the whole page?

Not necessarily. An application can update part of its interface and request more data, while a traditional link may navigate to another document. Watch Network to see what actually happens.

### Why does a website work on my computer but fail on my phone?

Network, DNS, cache, browser or code differences can be responsible. Compare the exact URL and error before blaming the device. A local server is not published on the Internet simply because it works on your computer.

### Do I need networking knowledge to start programming?

You can start without mastering networking. For web applications, understanding URLs, DNS, HTTPS and HTTP becomes useful quickly: they help you debug, publish and explain your work.

## What to learn next

Practice with a small page and explain its journey in your own words. Then build a project where you can describe the interface, request, server and response. For concrete ideas, explore these [portfolio projects](/en/portfolio-projects-that-strengthen-your-developer-resume).

## Sources for further reading

- [MDN: how browsers work](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work): navigation and rendering.
- [IETF, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110): HTTP semantics.
- [IETF, RFC 8446](https://www.rfc-editor.org/rfc/rfc8446): TLS 1.3.
- [IETF, RFC 9114](https://www.rfc-editor.org/rfc/rfc9114): HTTP/3.
- [ICANN: what ICANN does](https://www.icann.org/resources/pages/what-2012-02-25-en): domain and DNS context.
