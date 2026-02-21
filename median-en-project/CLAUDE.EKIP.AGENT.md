# 🤖 CLAUDE EKİP AGENT SİSTEMİ - EXTENDED RULES

## 🎯 SİSTEM TANIMI

Bu dosya, **CLAUDE.md** ve **CLAUDE.EKIP.md** dosyalarındaki temel kurallara ek olarak, multi-agent ekosisteminin çalışma prensiplerini tanımlar.

---

## 🧠 MASTER ORCHESTRATOR ACTIVATION

### Otomatik Aktivasyon Kuralları

```typescript
interface AutoActivationRule {
  trigger: string;
  primaryAgent: AgentPath;
  supportAgents: AgentPath[];
  mode: 'sequential' | 'parallel' | 'consensus';
}

const ACTIVATION_RULES: AutoActivationRule[] = [
  {
    trigger: 'frontend|react|next.js|component|ui',
    primaryAgent: 'engineering/frontend-developer',
    supportAgents: ['design/ui-designer', 'testing/api-tester'],
    mode: 'parallel'
  },
  {
    trigger: 'backend|api|database|server',
    primaryAgent: 'engineering/backend-architect',
    supportAgents: ['testing/performance-benchmarker', 'engineering/devops-automator'],
    mode: 'sequential'
  },
  {
    trigger: 'ai|llm|machine learning|model',
    primaryAgent: 'engineering/ai-engineer',
    supportAgents: ['testing/tool-evaluator', 'product/trend-researcher'],
    mode: 'parallel'
  },
  {
    trigger: 'marketing|campaign|growth|seo',
    primaryAgent: 'marketing/growth-hacker',
    supportAgents: ['marketing/content-creator', 'design/visual-storyteller'],
    mode: 'consensus'
  },
  {
    trigger: 'design|ux|ui|brand',
    primaryAgent: 'design/ui-designer',
    supportAgents: ['design/ux-researcher', 'design/brand-guardian'],
    mode: 'consensus'
  }
];
```

---

## ⚡ ZERO TOLERANCE - AGENT EKOSİSTEM KURALLARI

### 1. ASLA YAPILMAMASI GEREKENLER

```yaml
❌ FORBIDDEN_ACTIONS:
  placeholder_code:
    - "// TODO: implement later"
    - "// Add your code here"
    - "// Coming soon"
    - "# Placeholder"

  incomplete_work:
    - Yarım bırakılmış fonksiyonlar
    - Mock/fake data (realistic generators hariç)
    - Eksik error handling
    - Unhandled edge cases

  poor_quality:
    - console.log debugging
    - Hardcoded credentials
    - any type (TypeScript)
    - Unoptimized queries
    - Memory leaks

  collaboration_failures:
    - Agent'lar arası kontekst kaybı
    - Duplicate work
    - Conflicting implementations
    - Missing handoff documentation
```

### 2. ZORUNLU UYGULAMALAR

```yaml
✅ MANDATORY_PRACTICES:
  code_quality:
    - Production-ready her satır
    - Type-safe everywhere
    - Comprehensive error handling
    - Performance-optimized
    - Security-hardened

  agent_collaboration:
    - Açık handoff protokolleri
    - Shared context maintenance
    - Conflict resolution mechanisms
    - Quality gate validations

  documentation:
    - Inline comments (ne, neden)
    - API documentation
    - Architecture decisions (ADR)
    - Agent collaboration logs

  testing:
    - Unit tests (>90% coverage)
    - Integration tests
    - E2E scenarios
    - Performance benchmarks
```

---

## 🔄 MULTI-AGENT WORKFLOW ENGINE

### Task Decomposition Protocol

```python
class TaskOrchestrator:
    """
    Kompleks görevleri agent'lara dağıtır ve koordine eder
    """

    def decompose(self, task: ComplexTask) -> List[AgentTask]:
        """
        Görevi atomic subtask'lara böl
        """
        subtasks = self.analyze_dependencies(task)
        return [
            AgentTask(
                id=uuid4(),
                agent=self.select_agent(subtask),
                priority=self.calculate_priority(subtask),
                dependencies=self.map_dependencies(subtask),
                acceptance_criteria=self.define_done(subtask),
                timeout=self.estimate_duration(subtask)
            )
            for subtask in subtasks
        ]

    async def execute_parallel(self, tasks: List[AgentTask]) -> Dict[str, Result]:
        """
        Bağımsız task'ları paralel çalıştır
        """
        independent_tasks = self.filter_independent(tasks)
        results = await asyncio.gather(*[
            self.execute_agent(task) for task in independent_tasks
        ], return_exceptions=True)

        return await self.resolve_dependencies(tasks, results)

    def validate_quality(self, result: Result) -> bool:
        """
        Quality gate kontrolü
        """
        checks = [
            self.check_production_ready(result),
            self.check_performance_sla(result),
            self.check_security_compliance(result),
            self.check_test_coverage(result),
            self.check_documentation(result)
        ]
        return all(checks)
```

---

## 📊 AGENT CAPABILITY MATRIX

### Engineering Agents (6)
```yaml
frontend-developer:
  skills: [React, Next.js, TypeScript, Tailwind, Framer Motion]
  collaborates: [ui-designer, ux-researcher, api-tester]
  outputs: [Components, Pages, Hooks, Utils]

backend-architect:
  skills: [Python, FastAPI, Node.js, PostgreSQL, Redis]
  collaborates: [devops-automator, performance-benchmarker]
  outputs: [APIs, Database Schemas, Services]

ai-engineer:
  skills: [OpenAI, Anthropic, LangChain, Vector DBs, Fine-tuning]
  collaborates: [backend-architect, trend-researcher]
  outputs: [AI Pipelines, Models, Prompts]

mobile-developer:
  skills: [React Native, Swift, Kotlin, Flutter]
  collaborates: [ui-designer, backend-architect]
  outputs: [Mobile Apps, SDKs]

devops-automator:
  skills: [Docker, Kubernetes, CI/CD, Vercel, Azure]
  collaborates: [backend-architect, infrastructure-maintainer]
  outputs: [Deployment Scripts, Infrastructure as Code]

blockchain-builder:
  skills: [Solidity, Web3.js, Ethers.js, Smart Contracts]
  collaborates: [backend-architect, security-auditor]
  outputs: [Smart Contracts, DApps, Web3 Integrations]
```

### Product Agents (3)
```yaml
trend-researcher:
  skills: [Market Analysis, Competitive Intel, Tech Trends]
  collaborates: [growth-hacker, sprint-prioritizer]
  outputs: [Research Reports, Trend Analysis, Market Insights]

feedback-synthesizer:
  skills: [User Research, Sentiment Analysis, Pattern Recognition]
  collaborates: [ux-researcher, sprint-prioritizer]
  outputs: [User Insights, Feature Requests, Pain Points]

sprint-prioritizer:
  skills: [Backlog Management, RICE Scoring, OKRs]
  collaborates: [project-shipper, studio-producer]
  outputs: [Prioritized Backlog, Sprint Plans, Roadmaps]
```

### Marketing Agents (7)
```yaml
growth-hacker:
  skills: [Viral Growth, A/B Testing, Analytics, Funnels]
  collaborates: [all marketing agents]
  outputs: [Growth Strategies, Experiments, Campaigns]

content-creator:
  skills: [Copywriting, Storytelling, SEO, Content Strategy]
  collaborates: [visual-storyteller, brand-guardian]
  outputs: [Blog Posts, Landing Pages, Social Content]

social-media-manager:
  skills: [Multi-platform, Engagement, Trends, Analytics]
  collaborates: [content-creator, community-builder]
  outputs: [Social Posts, Campaigns, Analytics Reports]

email-campaign-designer:
  skills: [Email Marketing, Automation, Segmentation]
  collaborates: [content-creator, growth-hacker]
  outputs: [Email Sequences, Templates, A/B Tests]

seo-specialist:
  skills: [Technical SEO, Content Optimization, Link Building]
  collaborates: [content-creator, web-performance-optimizer]
  outputs: [SEO Audits, Optimization Plans, Content Briefs]

influencer-outreach-coordinator:
  skills: [Partnership Building, Negotiation, Campaign Management]
  collaborates: [social-media-manager, brand-guardian]
  outputs: [Partnership Strategies, Outreach Templates]

community-builder:
  skills: [Community Engagement, Discord/Slack, Events]
  collaborates: [social-media-manager, support-responder]
  outputs: [Community Guidelines, Engagement Strategies]
```

### Design Agents (5)
```yaml
ui-designer:
  skills: [Figma, CSS, Tailwind, Animation, Design Systems]
  collaborates: [frontend-developer, brand-guardian]
  outputs: [UI Designs, Components, Style Guides]

ux-researcher:
  skills: [User Testing, Journey Mapping, Heuristics, Analytics]
  collaborates: [ui-designer, feedback-synthesizer]
  outputs: [Research Reports, User Flows, Wireframes]

brand-guardian:
  skills: [Brand Identity, Voice/Tone, Guidelines, Consistency]
  collaborates: [all design agents, marketing agents]
  outputs: [Brand Guidelines, Assets, Templates]

visual-storyteller:
  skills: [Illustration, Motion Graphics, Video, Infographics]
  collaborates: [content-creator, ui-designer]
  outputs: [Illustrations, Animations, Visual Assets]

whimsy-injector:
  skills: [Micro-interactions, Easter Eggs, Delight, Playfulness]
  collaborates: [ui-designer, frontend-developer]
  outputs: [Delightful Experiences, Easter Eggs]
```

### Testing Agents (5)
```yaml
performance-benchmarker:
  skills: [Load Testing, Profiling, Optimization, Metrics]
  collaborates: [all engineering agents]
  outputs: [Performance Reports, Bottleneck Analysis]

api-tester:
  skills: [Postman, Integration Tests, Contract Testing]
  collaborates: [backend-architect, frontend-developer]
  outputs: [Test Suites, API Documentation]

test-results-analyzer:
  skills: [Test Analytics, Flaky Test Detection, Trends]
  collaborates: [all testing agents]
  outputs: [Test Reports, Quality Metrics]

user-behavior-simulator:
  skills: [E2E Testing, User Flows, Edge Cases]
  collaborates: [ux-researcher, frontend-developer]
  outputs: [E2E Test Suites, User Scenarios]

tool-evaluator:
  skills: [Tool Assessment, Stack Evaluation, ROI Analysis]
  collaborates: [all engineering agents]
  outputs: [Tool Recommendations, Comparison Reports]
```

### Project Management Agents (3)
```yaml
project-shipper:
  skills: [Delivery Management, Risk Mitigation, Stakeholders]
  collaborates: [studio-producer, sprint-prioritizer]
  outputs: [Delivery Plans, Risk Registers, Status Reports]

experiment-tracker:
  skills: [A/B Testing, Feature Flags, Experiment Design]
  collaborates: [growth-hacker, analytics-reporter]
  outputs: [Experiment Plans, Results Analysis]

studio-producer:
  skills: [Cross-team Coordination, Resource Allocation]
  collaborates: [all project management agents]
  outputs: [Production Schedules, Resource Plans]
```

### Studio Operations Agents (5)
```yaml
infrastructure-maintainer:
  skills: [System Monitoring, Incident Response, Maintenance]
  collaborates: [devops-automator, analytics-reporter]
  outputs: [Monitoring Dashboards, Runbooks]

support-responder:
  skills: [Customer Support, Issue Triage, Documentation]
  collaborates: [engineering agents, community-builder]
  outputs: [Support Responses, Knowledge Base Articles]

analytics-reporter:
  skills: [Data Analysis, Visualization, Insights, Dashboards]
  collaborates: [growth-hacker, product agents]
  outputs: [Analytics Reports, Dashboards, Insights]

finance-tracker:
  skills: [Budget Management, Cost Optimization, Forecasting]
  collaborates: [infrastructure-maintainer, studio-producer]
  outputs: [Budget Reports, Cost Analysis, Forecasts]

legal-compliance-checker:
  skills: [GDPR, HIPAA, Licensing, Terms, Privacy]
  collaborates: [backend-architect, support-responder]
  outputs: [Compliance Reports, Legal Reviews]
```

---

## 🔐 SECURITY & COMPLIANCE PROTOCOL

### Her Agent İçin Zorunlu Güvenlik Standartları

```typescript
const SECURITY_CHECKLIST = {
  authentication: {
    standard: 'JWT + Refresh Token Rotation',
    mfa: 'TOTP/WebAuthn support',
    session: 'Secure, HttpOnly, SameSite cookies'
  },

  authorization: {
    model: 'RBAC + ABAC hybrid',
    principle: 'Least Privilege',
    audit: 'All access logged'
  },

  inputValidation: {
    library: 'Zod schemas',
    sanitization: 'DOMPurify for HTML',
    sql: 'Parameterized queries only'
  },

  encryption: {
    atRest: 'AES-256-GCM',
    inTransit: 'TLS 1.3+',
    keys: 'Vault/KMS integration'
  },

  rateLimiting: {
    algorithm: 'Token bucket + sliding window',
    ddos: 'Cloudflare/WAF integration',
    api: 'Per-endpoint limits'
  },

  secrets: {
    storage: 'Never in code/repos',
    rotation: 'Automated, 90-day max',
    access: 'Vault with audit logs'
  },

  compliance: {
    hipaa: 'HIPAA-compliant if healthcare',
    gdpr: 'Data privacy by design',
    logging: 'Immutable audit trails'
  }
};
```

---

## 🎯 PERFORMANCE SLA TARGETS

```yaml
performance_requirements:
  api_response:
    p50: < 50ms
    p95: < 100ms
    p99: < 200ms

  database_queries:
    indexed: < 10ms
    complex: < 50ms
    cache_hit: < 1ms

  frontend_rendering:
    fcp: < 1s
    lcp: < 2.5s
    tti: < 3s
    cls: < 0.1

  bundle_size:
    initial: < 200KB gzipped
    lazy_chunks: < 100KB each
    vendor: < 500KB total

  lighthouse_scores:
    performance: 95+
    accessibility: 100
    best_practices: 100
    seo: 100

  availability:
    uptime: 99.9%
    mttd: < 5min
    mttr: < 30min
```

---

## 🔄 CONTINUOUS QUALITY GATES

### Her Commit/PR İçin Otomatik Kontroller

```yaml
pre_commit_checks:
  - TypeScript type checking
  - ESLint/Prettier formatting
  - Unit test suite (must pass)
  - No console.log statements
  - No hardcoded secrets
  - Bundle size within limits

pre_merge_checks:
  - All tests passing (unit + integration)
  - Code coverage > 90%
  - Performance benchmarks pass
  - Security scan (no high/critical)
  - Accessibility audit pass
  - Visual regression tests pass
  - API contract tests pass

pre_deploy_checks:
  - E2E test suite passing
  - Load test benchmarks pass
  - Database migration successful
  - Rollback plan documented
  - Monitoring alerts configured
  - Feature flags verified
```

---

## 📈 OBSERVABILITY & MONITORING

### Her Agent Output Tracking

```typescript
interface AgentTelemetry {
  metrics: {
    execution_time: number;
    tokens_used: number;
    error_rate: number;
    quality_score: number;
    collaboration_count: number;
  };

  traces: {
    agent_chain: AgentPath[];
    decision_points: DecisionLog[];
    handoffs: HandoffEvent[];
    conflicts: ConflictResolution[];
  };

  logs: {
    level: 'debug' | 'info' | 'warn' | 'error';
    message: string;
    context: Record<string, unknown>;
    timestamp: ISO8601;
  }[];
}
```

---

## 🚀 ACTIVATION EXAMPLES

### Single Agent Activation
```bash
# Frontend geliştirme
claude "frontend-developer agent ile Next.js dashboard komponenti oluştur"

# Backend API
claude "backend-architect agent ile FastAPI authentication endpoint'i yaz"

# AI/ML Pipeline
claude "ai-engineer agent ile multi-provider LLM orchestration sistemi kur"
```

### Multi-Agent Collaboration
```bash
# Full-stack feature
claude "ORCHESTRATOR: Login feature - frontend-developer, backend-architect, testing/api-tester paralel çalışsın"

# Marketing campaign
claude "growth-hacker, content-creator ve visual-storyteller koordineli launch campaign hazırlasın"

# Production deployment
claude "devops-automator, performance-benchmarker, infrastructure-maintainer deployment pipeline'ı çalıştırsın"
```

---

## 💡 CONTEXT PERSISTENCE

### Session Continuity Garantisi

```yaml
context_management:
  storage:
    - Project root: CLAUDE.md, CLAUDE.EKIP.md, CLAUDE.EKIP.AGENT.md
    - Agent definitions: .claude/agents/**/*.md
    - Session state: .claude/session-state.json (gitignored)

  auto_load:
    trigger: "Her yeni terminal session"
    files: [CLAUDE.md, CLAUDE.EKIP.md, CLAUDE.EKIP.AGENT.md]
    agents: "Lazy load on demand"

  persistence:
    decisions: "Logged to .claude/decisions.log"
    handoffs: "Tracked in .claude/agent-handoffs.log"
    quality_gates: "Recorded in .claude/quality-checks.log"
```

---

## ✅ FINAL CHECKLIST - Her Task İçin

```yaml
☐ Production-ready kod (no placeholders)
☐ Type-safe (TypeScript/Python type hints)
☐ Comprehensive error handling
☐ Performance-optimized
☐ Security-hardened
☐ Test coverage > 90%
☐ Documentation complete
☐ Agent collaboration logged
☐ Quality gates passed
☐ Deployment-ready
```

---

## 🎯 SUCCESS CRITERIA

Her agent output şu soruları geçmeli:

1. ✅ **Fortune 500 Test**: Bu kod Fortune 500 şirketinin production'ında çalışabilir mi?
2. ✅ **Scale Test**: 1M+ kullanıcıya scale eder mi?
3. ✅ **Security Audit**: Penetration test geçer mi?
4. ✅ **Performance SLA**: Tüm performance hedeflerini karşılar mı?
5. ✅ **Maintenance Test**: 6 ay sonra başka bir dev anlayıp devam edebilir mi?

---

*Bu dosya CLAUDE.md ve CLAUDE.EKIP.md ile birlikte her session'da otomatik yüklenir.*
*Tüm agent'lar bu kurallara %100 uyum sağlar. Hiçbir istisna yoktur.*
