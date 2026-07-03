/**
 * GoldBazaar Upload Proxy — Cloudflare Worker
 *
 * Proxies GitHub Contents API calls so the token never appears in public HTML.
 * Token is stored as a Cloudflare Worker Secret (GITHUB_TOKEN).
 *
 * Handles:
 *   GET  /<path>       → check if file exists (returns SHA if yes)
 *   PUT  /<path>       → upload/overwrite file
 *   POST /--purge--    → purge Cloudflare cache (uses CF_ZONE_ID + CF_API_TOKEN secrets)
 */

const GH_OWNER = 'goldbazaarapp';
const GH_REPO  = 'goldbazaar-platform';

export default {
  async fetch(request, env) {

    // ── CORS preflight ──────────────────────────────────────────
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url  = new URL(request.url);
    const path = url.pathname.replace(/^\//, '');

    // ── Cloudflare Cache Purge ──────────────────────────────────
    if (path === '--purge--' && request.method === 'POST') {
      const zoneId  = env.CF_ZONE_ID;
      const cfToken = env.CF_API_TOKEN;

      if (!zoneId || !cfToken) {
        return new Response(JSON.stringify({ success: false, error: 'CF_ZONE_ID or CF_API_TOKEN secret not set in Worker' }), {
          status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const purgeRes = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${cfToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ purge_everything: true }),
        }
      );

      const data = await purgeRes.text();
      return new Response(data, {
        status: purgeRes.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // ── GitHub Contents API proxy ───────────────────────────────
    if (!path) {
      return new Response(JSON.stringify({ error: 'No file path provided' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const ghUrl = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${path}`;

    const ghRes = await fetch(ghUrl, {
      method: request.method,
      headers: {
        'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'GoldBazaar-Upload-Proxy/1.0',
      },
      body: request.method === 'PUT' ? await request.text() : undefined,
    });

    const body = await ghRes.text();

    return new Response(body, {
      status: ghRes.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};
