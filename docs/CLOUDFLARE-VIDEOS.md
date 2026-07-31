# Cloudflare + showcase videos (freezestack.com)

Videos felt smoother on Vercel-only DNS (xfreeze.com) but laggy through Cloudflare
when `cf-cache-status` was `REVALIDATED` / `MISS` on every request.

## Origin fix (in repo)

`website/vercel.json` sets long immutable cache for `/assets/videos/*` so the edge
can store full MP4s and serve range requests from cache.

## Cloudflare dashboard (required)

1. **Caching → Configuration**
   - Browser Cache TTL: Respect Existing Headers (or 1 month)
2. **Rules → Cache Rules** (or Page Rule):
   - If URI Path starts with `/assets/videos`
   - Then: Cache eligibility = Eligible for cache
   - Edge TTL: 1 month (or Respect origin)
   - Browser TTL: Respect origin
3. **Speed → Optimization**
   - Rocket Loader: **Off** (can break video and deferred scripts)
   - Mirage: **Off**
4. After deploy: purge cache for `/assets/videos/*` once so new encodes replace old files.

## Check

```bash
curl -sSI https://freezestack.com/assets/videos/before-after/add-makeup.mp4 | egrep -i 'cf-cache|cache-control|age|x-vercel'
```

Healthy after warm: `cf-cache-status: HIT`, not perpetual `REVALIDATED` with `x-vercel-cache: MISS`.
