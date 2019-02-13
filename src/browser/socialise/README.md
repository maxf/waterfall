* Waterfall

This is a proof of concept for an "instagram clone based on Mastodon".

Try it at https://maxf.github.io/waterfall/

The idea is to provide a UI that's different from the default Mastodon, in order
to emphasize the attached pictures and not so much the text.

We could do this by taking the mastodon source code and modifying the UI code,
but instead this is something completely separate: a single-page app that
doesn't have any backend, but talks to any mastodon instance via its API.

Therefore you can just copy 3 static files (`index.html`, `socialise.js`,
`main.css`, put them on a server somewhere and point them to any mastodon
instance.


This is far from being a finished product and probably won't ever be. So far it implements:

- user timeline display
- user login using OAuth
- own timeline
- shows: albums, starts, retoots
- lets you upload a photo

I expect auth and upload are the most complex parts to implement, so the rest should be relatively straightforward.
