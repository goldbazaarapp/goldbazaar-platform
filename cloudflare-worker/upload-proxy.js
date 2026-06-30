/**
 * GoldBazaar Upload Proxy — Cloudflare Worker
 *
 * Proxies GitHub Contents API calls so the token never appears in public HTML.
 * Token is stored as a Cloudflare Worker Secret (GITHUB_TOKEN).
 *
 * Handles:
 *   GET  /<path>  → check if file exists (returns SHA if yes)
 *   PUT  /<path>  → upload/overwrite file
 */

const GH_OWNER  = 'goldbazaarapp';
const GH_REPO   = 'goldbazaar-platform';
const ALLOWED_ORIGIN = 'https://goldbazaarapp.github.io';

export default {
  async fetch(request, env) {

    // ── CORS preflight ──────────────────────────────────────────
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',          // lock to ALLOWED_ORIGIN in production
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // ── Build GitHub API URL from Worker path ───────────────────
    const url  = new URL(request.url);
    const path = url.pathname.replace(/^\//, ''); // strip leading /

    if (!path) {
      return new Response(JSON.stringify({ error: 'No file path provided' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const ghUrl = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${path}`;

    // ── Forward request to GitHub API ───────────────────────────
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
