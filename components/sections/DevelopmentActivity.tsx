import { developmentContent } from '@/content/development'
import { SITE } from '@/lib/constants'
import {
  fetchGitHubActivity,
  formatCommitDate,
  formatRelativeUpdated,
  formatStatNumber,
  type GitHubActivityData,
} from '@/lib/github'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { LinkButton } from '@/components/ui/Button'
import { ContributionGraph } from '@/components/github/ContributionGraph'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'

export const revalidate = 3600

function GitHubStatsCard({ stats }: { stats: GitHubActivityData['stats'] }) {
  const rows = [
    { label: 'Public repositories', value: formatStatNumber(stats.publicRepos) },
    {
      label: 'Contributions (last year)',
      value: formatStatNumber(stats.totalContributions),
    },
    ...(stats.publicPullRequests !== null
      ? [
          {
            label: 'Public pull requests',
            value: formatStatNumber(stats.publicPullRequests),
          },
        ]
      : []),
  ]

  return (
    <div className="card-base rounded-xl p-5 sm:p-6 h-full">
      <h3 className="text-[11px] uppercase tracking-widest font-semibold text-ink-tertiary mb-5">
        {developmentContent.statsTitle}
      </h3>
      <dl className="flex flex-col gap-4">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 border-b border-border-subtle pb-4 last:border-b-0 last:pb-0"
          >
            <dt className="text-sm text-ink-secondary">{row.label}</dt>
            <dd className="font-display text-xl font-semibold text-ink-primary tabular-nums">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function RepoCard({ repo }: { repo: GitHubActivityData['repositories'][number] }) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'card-base card-interactive rounded-xl p-5 flex flex-col h-full',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
      )}
      aria-label={`Open ${repo.name} on GitHub (opens in a new tab)`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="text-sm font-semibold text-ink-primary tracking-tight">
          {repo.name}
        </h4>
        <Icon name="arrow-right" size={14} className="text-ink-tertiary shrink-0 mt-0.5" />
      </div>

      <p className="text-sm text-ink-secondary leading-relaxed mb-4 flex-1 line-clamp-2">
        {repo.description || 'No description provided.'}
      </p>

      <div className="flex items-center justify-between gap-3 text-xs text-ink-tertiary">
        {repo.language ? (
          <span className="inline-flex items-center gap-1.5 min-w-0">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: repo.language.color }}
              aria-hidden="true"
            />
            <span className="truncate">{repo.language.name}</span>
          </span>
        ) : (
          <span>—</span>
        )}
        <span className="shrink-0">{formatRelativeUpdated(repo.updatedAt)}</span>
      </div>
    </a>
  )
}

function CommitCard({ commit }: { commit: GitHubActivityData['commits'][number] }) {
  return (
    <a
      href={commit.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'card-base card-interactive rounded-xl p-4 flex flex-col gap-2 h-full',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent'
      )}
      aria-label={`View commit in ${commit.repositoryName} on GitHub (opens in a new tab)`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-accent truncate">
          {commit.repositoryName}
        </span>
        <span className="text-[11px] text-ink-tertiary shrink-0">
          {formatCommitDate(commit.committedDate)}
        </span>
      </div>
      <p className="text-sm text-ink-primary leading-snug line-clamp-2">
        {commit.message}
      </p>
    </a>
  )
}

function DevelopmentActivityError() {
  return (
    <section
      id="development"
      className="section-padding bg-base-card"
      aria-label="Development Activity"
    >
      <div className="container-portfolio">
        <SectionHeader
          eyebrow={developmentContent.eyebrow}
          title={developmentContent.errorTitle}
          description={developmentContent.errorDescription}
        />

        <LinkButton
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="lg"
          className="font-semibold"
          aria-label="View GitHub profile (opens in a new tab)"
        >
          {developmentContent.profileCta}
        </LinkButton>
      </div>
    </section>
  )
}

function DevelopmentActivityContent({ data }: { data: GitHubActivityData }) {
  return (
    <section
      id="development"
      className="section-padding bg-base-card"
      aria-label="Development Activity"
    >
      <div className="container-portfolio">
        <SectionHeader
          eyebrow={developmentContent.eyebrow}
          title={developmentContent.title}
          description={developmentContent.description}
        />

        <ScrollReveal>
          <ContributionGraph
            weeks={data.calendar.weeks}
            totalContributions={data.calendar.totalContributions}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 mb-8">
          <ScrollReveal delay={0.06}>
            <GitHubStatsCard stats={data.stats} />
          </ScrollReveal>

          <div className="lg:col-span-2">
            <ScrollReveal delay={0.1}>
              <h3 className="text-[11px] uppercase tracking-widest font-semibold text-ink-tertiary mb-4">
                {developmentContent.reposTitle}
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.repositories.map((repo, i) => (
                <ScrollReveal key={repo.name} delay={0.12 + i * 0.04}>
                  <RepoCard repo={repo} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        <ScrollReveal delay={0.18}>
          <h3 className="text-[11px] uppercase tracking-widest font-semibold text-ink-tertiary mb-4">
            {developmentContent.commitsTitle}
          </h3>
        </ScrollReveal>

        {data.commits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {data.commits.map((commit, i) => (
              <ScrollReveal key={`${commit.url}-${i}`} delay={0.2 + i * 0.03}>
                <CommitCard commit={commit} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-secondary mb-8">
            {developmentContent.commitsEmpty}
          </p>
        )}

        <ScrollReveal delay={0.24}>
          <LinkButton
            href={data.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            className="font-semibold"
            aria-label="View GitHub profile (opens in a new tab)"
          >
            {developmentContent.profileCta}
          </LinkButton>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default async function DevelopmentActivity() {
  const data = await fetchGitHubActivity()

  if (!data) {
    return <DevelopmentActivityError />
  }

  return <DevelopmentActivityContent data={data} />
}
