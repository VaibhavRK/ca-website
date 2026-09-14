// Vercel Serverless Function: Automatically commits knowledgeData.json using Vercel environment variable GITHUB_PAT
// Location: /api/commit-knowledge.js

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const token = process.env.GITHUB_PAT || process.env.GITHUB_TOKEN;
  const adminSecret = process.env.ADMIN_SECRET_KEY;

  if (!token) {
    return res.status(500).json({
      success: false,
      message: 'Vercel Environment Variable GITHUB_PAT is not set. Please add GITHUB_PAT in Vercel Project Settings.'
    });
  }

  // Optional Secret Key check if ADMIN_SECRET_KEY environment variable is defined
  if (adminSecret) {
    const providedKey = req.headers['x-admin-key'] || req.body?.adminKey;
    if (providedKey !== adminSecret) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid Admin Secret Key' });
    }
  }

  const { items } = req.body || {};
  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ success: false, message: 'Invalid payload: items array is required.' });
  }

  const REPO_OWNER = 'VaibhavRK';
  const REPO_NAME = 'ca-website';
  const FILE_PATH = 'src/data/knowledgeData.json';
  const BRANCH = 'main';
  const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

  try {
    // Step 1: Get file SHA from GitHub API
    const getRes = await fetch(`${apiUrl}?ref=${BRANCH}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Vercel-Serverless-AutoCommit'
      }
    });

    if (!getRes.ok) {
      const errText = await getRes.text();
      return res.status(getRes.status).json({
        success: false,
        message: `Failed to fetch file info from GitHub API: ${errText}`
      });
    }

    const fileData = await getRes.json();
    const currentSha = fileData.sha;

    // Step 2: Encode updated items to Base64
    const jsonString = JSON.stringify(items, null, 2);
    const base64Content = Buffer.from(jsonString, 'utf-8').toString('base64');

    // Step 3: Send PUT request to GitHub API to create a direct commit
    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'Vercel-Serverless-AutoCommit'
      },
      body: JSON.stringify({
        message: 'Update knowledgeData.json via Admin Panel [Vercel Serverless]',
        content: base64Content,
        sha: currentSha,
        branch: BRANCH
      })
    });

    if (putRes.ok) {
      return res.status(200).json({
        success: true,
        message: 'Successfully committed changes to GitHub repository via Vercel Serverless backend! Site is rebuilding.'
      });
    } else {
      const errData = await putRes.json().catch(() => ({}));
      return res.status(putRes.status).json({
        success: false,
        message: errData.message || `GitHub Commit Error (HTTP ${putRes.status})`
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || 'Server error while executing Vercel serverless commit.'
    });
  }
}
