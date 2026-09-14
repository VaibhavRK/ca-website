import type { KnowledgeItem } from './knowledge';

const REPO_OWNER = 'VaibhavRK';
const REPO_NAME = 'ca-website';
const FILE_PATH = 'src/data/knowledgeData.json';
const BRANCH = 'main';

const GITHUB_TOKEN_KEY = 'dsco_github_pat_session';

/**
 * Save GitHub Personal Access Token to sessionStorage (cleared when browser closes).
 * NEVER saved in localStorage, codebase, or environment variables.
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
 * Commit updated knowledgeData.json directly to GitHub repository via GitHub REST API.
 */
export async function commitKnowledgeToGitHub(
  items: KnowledgeItem[],
  providedToken?: string
): Promise<{ success: boolean; message: string }> {
  const token = providedToken || getGitHubToken();

  if (!token) {
    return {
      success: false,
      message: 'GitHub Personal Access Token is missing. Please enter your GitHub token in Sync Settings.'
    };
  }

  const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
  const formattedJson = JSON.stringify(items, null, 2);

  try {
    // Step 1: Fetch current file SHA from GitHub repository
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
      if (getResponse.status === 404) {
        return { success: false, message: `File not found on repository branch ${BRANCH}.` };
      }
      const errText = await getResponse.text();
      return { success: false, message: `Failed to fetch file SHA: ${errText}` };
    }

    const fileData = await getResponse.json();
    const currentSha = fileData.sha;

    // Step 2: Encode contents to Base64 (supporting Unicode)
    const encoder = new TextEncoder();
    const dataUint8 = encoder.encode(formattedJson);
    let binaryString = '';
    for (let i = 0; i < dataUint8.length; i++) {
      binaryString += String.fromCharCode(dataUint8[i]);
    }
    const base64Content = btoa(binaryString);

    // Step 3: Send PUT request to create a direct commit on GitHub repository
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
      // Store valid token in session if provided explicitly
      if (providedToken) {
        saveGitHubToken(providedToken);
      }
      return {
        success: true,
        message: 'Successfully committed knowledge updates directly to GitHub! Your site will auto-redeploy.'
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
