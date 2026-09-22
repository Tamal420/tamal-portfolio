import { GITHUB_USERNAME } from '@/lib/constants'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContributionLevel =
  | 'NONE'
  | 'FIRST_QUARTILE'
  | 'SECOND_QUARTILE'
  | 'THIRD_QUARTILE'
  | 'FOURTH_QUARTILE'

export type ContributionDay = {
  date: string
  count: number
  level: ContributionLevel
}

export type GitHubRepository = {
  name: string
  description: string | null
  url: string
  updatedAt: string
  language: { name: string; color: string } | null
}

export type GitHubCommit = {
  message: string
  committedDate: string
  url: string
  repositoryName: string
}

export type GitHubStats = {
  publicRepos: number
  totalContributions: number
  publicPullRequests: number | null
}

export type GitHubActivityData = {
  profileUrl: string
  stats: GitHubStats
  calendar: {
    totalContributions: number
    weeks: ContributionDay[][]
  }
  repositories: GitHubRepository[]
  commits: GitHubCommit[]
}

type GraphQLResponse = {
  data?: {
    user?: {
      url: string
      repositories: {
        totalCount: number
        nodes: Array<{
          name: string
          description: string | null
          url: string
          updatedAt: string
          primaryLanguage: { name: string; color: string } | null
          defaultBranchRef: {
            target: {
              history?: {
                nodes: Array<{
                  message: string
                  committedDate: string
                  url: string
                  author: { user: { login: string } | null } | null
                }>
              }
            } | null
          } | null
        }>
      }
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number
          weeks: Array<{
            contributionDays: Array<{
              date: string
              contributionCount: number
              contributionLevel: ContributionLevel
            }>
          }>
        }
      }
    }
    search?: {
      issueCount: number
    } | null
  }
  errors?: Array<{ message: string }>
}

// ─── GraphQL query (repos, calendar, commits, PR count) ────────────────────────

const GITHUB_ACTIVITY_QUERY = `
  query GitHubActivity($login: String!) {
    user(login: $login) {
      url
      repositories(
        first: 8
        ownerAffiliations: OWNER
        privacy: PUBLIC
        isFork: false
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        nodes {
          name
          description
          url
          updatedAt
          primaryLanguage {
            name
            color
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 4) {
                  nodes {
                    message
                    committedDate
                    url
                    author {
                      user {
                        login
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
    search(query: "author:${GITHUB_USERNAME} type:pr is:public", type: ISSUE) {
      issueCount
    }
  }
`

// ─── Fetch ────────────────────────────────────────────────────────────────────

export async function fetchGitHubActivity(): Promise<GitHubActivityData | null> {
  const token = process.env.GITHUB_TOKEN

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github+json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        'User-Agent': 'tamal-portfolio',
      },
      body: JSON.stringify({
        query: GITHUB_ACTIVITY_QUERY,
        variables: { login: GITHUB_USERNAME },
      }),
      next: { revalidate: 3600 },
    })

    if (!response.ok) return null

    const json = (await response.json()) as GraphQLResponse
    if (json.errors?.length || !json.data?.user) return null

    const user = json.data.user
    const calendar = user.contributionsCollection.contributionCalendar

    const weeks: ContributionDay[][] = calendar.weeks.map((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: day.contributionLevel,
      }))
    )

    const repositories: GitHubRepository[] = user.repositories.nodes
      .slice(0, 4)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.url,
        updatedAt: repo.updatedAt,
        language: repo.primaryLanguage,
      }))

    const commits: GitHubCommit[] = user.repositories.nodes
      .flatMap((repo) => {
        const history = repo.defaultBranchRef?.target?.history?.nodes ?? []
        return history
          .filter((commit) => {
            const login = commit.author?.user?.login?.toLowerCase()
            if (!login) return true
            return login === GITHUB_USERNAME.toLowerCase()
          })
          .map((commit) => ({
            message: commit.message.split('\n')[0]?.trim() ?? commit.message,
            committedDate: commit.committedDate,
            url: commit.url,
            repositoryName: repo.name,
          }))
      })
      .sort(
        (a, b) =>
          new Date(b.committedDate).getTime() -
          new Date(a.committedDate).getTime()
      )
      .slice(0, 8)

    const prCount = json.data.search?.issueCount ?? null

    return {
      profileUrl: user.url,
      stats: {
        publicRepos: user.repositories.totalCount,
        totalContributions: calendar.totalContributions,
        publicPullRequests: prCount,
      },
      calendar: {
        totalContributions: calendar.totalContributions,
        weeks,
      },
      repositories,
      commits,
    }
  } catch {
    return null
  }
}

// ─── Formatters ───────────────────────────────────────────────────────────────

export function formatRelativeUpdated(isoDate: string): string {
  const updated = new Date(isoDate)
  const now = new Date()
  const diffMs = now.getTime() - updated.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) return 'Updated today'
  if (diffDays === 1) return 'Updated yesterday'
  if (diffDays < 30) return `Updated ${diffDays} days ago`
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return `Updated ${months} month${months === 1 ? '' : 's'} ago`
  }
  const years = Math.floor(diffDays / 365)
  return `Updated ${years} year${years === 1 ? '' : 's'} ago`
}

export function formatCommitDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatCalendarDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatStatNumber(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k+`
  return String(value)
}
