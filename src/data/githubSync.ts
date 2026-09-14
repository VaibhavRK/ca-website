import type { KnowledgeItem } from './knowledge';

const REPO_OWNER = 'VaibhavRK';
const REPO_NAME = 'ca-website';
const FILE_PATH = 'src/data/knowledgeData.json';
const BRANCH = 'main';

const GITHUB_TOKEN_KEY = 'dsco_github_pat_session';

/**
 * Save GitHub Personal Access Token to sessionStorage (cleared when browser closes).
 */
export function saveGitHubToken(token: string): void {
  sessionStorage.setItem(GITHUB_TOKEN_KEY, token.trim());
}

/**
 * Retrieve GitHub token from session storage.
 */
export function getGitHubToken(): string | null {
  return sessionStorage.getItem(GITHUB_TOKEN_KEY);
}

/**
 * Remove GitHub token from session storage.
 */
export function clearGitHubToken(): void {
  sessionStorage.removeItem(GITHUB_TOKEN_KEY);
}

/**
 * Commit updated knowledgeData.json directly to GitHub repository.
 * 1. Tries Vercel Serverless API first (/api/commit-knowledge) using Vercel GITHUB_PAT env variable.
 * 2. If Vercel env variable is not set, falls back to direct browser session PAT token.
 */
export async function commitKnowledgeToGitHub(
  items: KnowledgeItem[],
  providedToken?: string
): Promise<{ success: boolean; message: string; method?: 'vercel' | 'pat' }> {

  // Strategy 1: Attempt Vercel Serverless Function backend commit first
  try {
    const vercelRes = await fetch('/api/commit-knowledge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items })
    });

    // If Vercel serverless function responded cleanly (200 OK)
    if (vercelRes.ok) {
      const data = await vercelRes.json();
      return {
        success: true,
        message: data.message || 'Auto-committed to GitHub via Vercel Backend environment variable!',
        method: 'vercel'
      };
    }

    // If serverless endpoint exists but env variable GITHUB_PAT is missing on Vercel
    if (vercelRes.status === 500) {
      const errData = await vercelRes.json().catch(() => ({}));
      if (errData.message && errData.message.includes('GITHUB_PAT')) {
        // Fallthrough to Session PAT or prompt setup guide
      }
    }
  } catch (e) {
    // Local dev or non-Vercel environment fallback
  }

  // Strategy 2: Fallback to session PAT Token (if entered by admin)
  const token = providedToken || getGitHubToken();

  if (!token) {
    return {
      success: false,
      message: 'Vercel GITHUB_PAT env variable is not set, and no Session PAT token was provided.'
    };
  }

  const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
  const formattedJson = JSON.stringify(items, null, 2);

  try {
    const getResponse = await fetch(`${apiUrl}?ref=${BRANCH}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!getResponse.ok) {
      if (getResponse.status === 401) {
        return { success: false, message: 'Invalid GitHub Token or authorization expired.' };
      }
      const errText = await getResponse.text();
      return { success: false, message: `Failed to fetch file info: ${errText}` };
    }

    const fileData = await getResponse.json();
    const currentSha = fileData.sha;

    const encoder = new TextEncoder();
    const dataUint8 = encoder.encode(formattedJson);
    let binaryString = '';
    for (let i = 0; i < dataUint8.length; i++) {
      binaryString += String.fromCharCode(dataUint8[i]);
    }
    const base64Content = btoa(binaryString);

    const putResponse = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Update knowledgeData.json via Admin Panel',
        content: base64Content,
        sha: currentSha,
        branch: BRANCH,
      }),
    });

    if (putResponse.ok) {
      if (providedToken) {
        saveGitHubToken(providedToken);
      }
      return {
        success: true,
        message: 'Successfully committed changes to GitHub repository!',
        method: 'pat'
      };
    } else {
      const errorJson = await putResponse.json().catch(() => ({}));
      return {
        success: false,
        message: errorJson.message || `GitHub Commit Error (HTTP ${putResponse.status})`
      };
    }
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Network error while contacting GitHub API.'
    };
  }
}
