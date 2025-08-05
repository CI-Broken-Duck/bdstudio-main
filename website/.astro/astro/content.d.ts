declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"build-startup-from-southeast-asia.md": {
	id: "build-startup-from-southeast-asia.md";
  slug: "build-startup-from-southeast-asia";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"fundraising-in-thailand-foreign-founder.md": {
	id: "fundraising-in-thailand-foreign-founder.md";
  slug: "fundraising-in-thailand-foreign-founder";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"google-cloud-accelerator-thailand.md": {
	id: "google-cloud-accelerator-thailand.md";
  slug: "google-cloud-accelerator-thailand";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"incorporating-a-tech-business-in-thailand.md": {
	id: "incorporating-a-tech-business-in-thailand.md";
  slug: "incorporating-a-tech-business-in-thailand";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"smart-visa-vs-dtv.md": {
	id: "smart-visa-vs-dtv.md";
  slug: "smart-visa-vs-dtv";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"thailand-internet-startup-speed-tech.md": {
	id: "thailand-internet-startup-speed-tech.md";
  slug: "thailand-internet-startup-speed-tech";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"why-chiang-mai-ai-startup.md": {
	id: "why-chiang-mai-ai-startup.md";
  slug: "why-chiang-mai-ai-startup";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"why-most-software-startups-shouldnt-raise-money.md": {
	id: "why-most-software-startups-shouldnt-raise-money.md";
  slug: "why-most-software-startups-shouldnt-raise-money";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"case-study": {
"llm-fine-tuning-vs-prompt-engineering.md": {
	id: "llm-fine-tuning-vs-prompt-engineering.md";
  slug: "llm-fine-tuning-vs-prompt-engineering";
  body: string;
  collection: "case-study";
  data: InferEntrySchema<"case-study">
} & { render(): Render[".md"] };
"smart-visa-thailand-guide.md": {
	id: "smart-visa-thailand-guide.md";
  slug: "smart-visa-thailand-guide";
  body: string;
  collection: "case-study";
  data: InferEntrySchema<"case-study">
} & { render(): Render[".md"] };
"tchaikovsky-abc-midi-generation.md": {
	id: "tchaikovsky-abc-midi-generation.md";
  slug: "tchaikovsky-abc-midi-generation";
  body: string;
  collection: "case-study";
  data: InferEntrySchema<"case-study">
} & { render(): Render[".md"] };
"thailand-ai-startup-funding.md": {
	id: "thailand-ai-startup-funding.md";
  slug: "thailand-ai-startup-funding";
  body: string;
  collection: "case-study";
  data: InferEntrySchema<"case-study">
} & { render(): Render[".md"] };
};
"company": {
"coming-soon-reactivid.md": {
	id: "coming-soon-reactivid.md";
  slug: "coming-soon-reactivid";
  body: string;
  collection: "company";
  data: InferEntrySchema<"company">
} & { render(): Render[".md"] };
"introducing-influent-space.md": {
	id: "introducing-influent-space.md";
  slug: "introducing-influent-space";
  body: string;
  collection: "company";
  data: InferEntrySchema<"company">
} & { render(): Render[".md"] };
"introducing-tchaikovsky.md": {
	id: "introducing-tchaikovsky.md";
  slug: "introducing-tchaikovsky";
  body: string;
  collection: "company";
  data: InferEntrySchema<"company">
} & { render(): Render[".md"] };
};
"external": {
"www.greenlightstudio.co.md": {
	id: "www.greenlightstudio.co.md";
  slug: "www.greenlightstudio.co";
  body: string;
  collection: "external";
  data: InferEntrySchema<"external">
} & { render(): Render[".md"] };
"www.influent.space.md": {
	id: "www.influent.space.md";
  slug: "www.influent.space";
  body: string;
  collection: "external";
  data: InferEntrySchema<"external">
} & { render(): Render[".md"] };
"www.reactivid.com.md": {
	id: "www.reactivid.com.md";
  slug: "www.reactivid.com";
  body: string;
  collection: "external";
  data: InferEntrySchema<"external">
} & { render(): Render[".md"] };
"www.tchaikovsky.cloud.md": {
	id: "www.tchaikovsky.cloud.md";
  slug: "www.tchaikovsky.cloud";
  body: string;
  collection: "external";
  data: InferEntrySchema<"external">
} & { render(): Render[".md"] };
};
"modules": {
"admin/activity-heatmap-for-admins.md": {
	id: "admin/activity-heatmap-for-admins.md";
  slug: "admin/activity-heatmap-for-admins";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/admin-notes-&-comments.md": {
	id: "admin/admin-notes-&-comments.md";
  slug: "admin/admin-notes--comments";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/admin-panel-shortcuts.md": {
	id: "admin/admin-panel-shortcuts.md";
  slug: "admin/admin-panel-shortcuts";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/admin-quick-actions-toolbar.md": {
	id: "admin/admin-quick-actions-toolbar.md";
  slug: "admin/admin-quick-actions-toolbar";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/content-staging-controls.md": {
	id: "admin/content-staging-controls.md";
  slug: "admin/content-staging-controls";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/custom-branding-controls.md": {
	id: "admin/custom-branding-controls.md";
  slug: "admin/custom-branding-controls";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/custom-domain-routing.md": {
	id: "admin/custom-domain-routing.md";
  slug: "admin/custom-domain-routing";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/data-import-export.md": {
	id: "admin/data-import-export.md";
  slug: "admin/data-import-export";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/database-query-interface.md": {
	id: "admin/database-query-interface.md";
  slug: "admin/database-query-interface";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/email-template-editor.md": {
	id: "admin/email-template-editor.md";
  slug: "admin/email-template-editor";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/endpoint-rate-limiter-config.md": {
	id: "admin/endpoint-rate-limiter-config.md";
  slug: "admin/endpoint-rate-limiter-config";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/environment-variable-manager.md": {
	id: "admin/environment-variable-manager.md";
  slug: "admin/environment-variable-manager";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/error-&-crash-reporter.md": {
	id: "admin/error-&-crash-reporter.md";
  slug: "admin/error--crash-reporter";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/event-log-viewer.md": {
	id: "admin/event-log-viewer.md";
  slug: "admin/event-log-viewer";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/exportable-audit-compliance-logs.md": {
	id: "admin/exportable-audit-compliance-logs.md";
  slug: "admin/exportable-audit-compliance-logs";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/feature-flag-manager.md": {
	id: "admin/feature-flag-manager.md";
  slug: "admin/feature-flag-manager";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/firebase-admin-tools.md": {
	id: "admin/firebase-admin-tools.md";
  slug: "admin/firebase-admin-tools";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/form-to-email-logic.md": {
	id: "admin/form-to-email-logic.md";
  slug: "admin/form-to-email-logic";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/localization-key-manager.md": {
	id: "admin/localization-key-manager.md";
  slug: "admin/localization-key-manager";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/maintenance-mode-toggle.md": {
	id: "admin/maintenance-mode-toggle.md";
  slug: "admin/maintenance-mode-toggle";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/multi-tenant-admin-switcher.md": {
	id: "admin/multi-tenant-admin-switcher.md";
  slug: "admin/multi-tenant-admin-switcher";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/real-time-system-usage-dashboard.md": {
	id: "admin/real-time-system-usage-dashboard.md";
  slug: "admin/real-time-system-usage-dashboard";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/rest-api-access-toolkit.md": {
	id: "admin/rest-api-access-toolkit.md";
  slug: "admin/rest-api-access-toolkit";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/role-&-permission-editor.md": {
	id: "admin/role-&-permission-editor.md";
  slug: "admin/role--permission-editor";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/saas-billing-dashboard.md": {
	id: "admin/saas-billing-dashboard.md";
  slug: "admin/saas-billing-dashboard";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/service-integration-checker.md": {
	id: "admin/service-integration-checker.md";
  slug: "admin/service-integration-checker";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/support-console-for-admins.md": {
	id: "admin/support-console-for-admins.md";
  slug: "admin/support-console-for-admins";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/system-backup-trigger.md": {
	id: "admin/system-backup-trigger.md";
  slug: "admin/system-backup-trigger";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/system-health-monitor.md": {
	id: "admin/system-health-monitor.md";
  slug: "admin/system-health-monitor";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/task-&-cron-scheduler-viewer.md": {
	id: "admin/task-&-cron-scheduler-viewer.md";
  slug: "admin/task--cron-scheduler-viewer";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/usage-quota-tracker.md": {
	id: "admin/usage-quota-tracker.md";
  slug: "admin/usage-quota-tracker";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/user-flagging-&-moderation-tools.md": {
	id: "admin/user-flagging-&-moderation-tools.md";
  slug: "admin/user-flagging--moderation-tools";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/version-control-history-log.md": {
	id: "admin/version-control-history-log.md";
  slug: "admin/version-control-history-log";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/webhook-integration-panel.md": {
	id: "admin/webhook-integration-panel.md";
  slug: "admin/webhook-integration-panel";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"admin/zapier-integration.md": {
	id: "admin/zapier-integration.md";
  slug: "admin/zapier-integration";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/ai-assessment-engine.md": {
	id: "ai/ai-assessment-engine.md";
  slug: "ai/ai-assessment-engine";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/ai-based-rubric-grader.md": {
	id: "ai/ai-based-rubric-grader.md";
  slug: "ai/ai-based-rubric-grader";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/ai-chat-assistant.md": {
	id: "ai/ai-chat-assistant.md";
  slug: "ai/ai-chat-assistant";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/ai-content-rewriter.md": {
	id: "ai/ai-content-rewriter.md";
  slug: "ai/ai-content-rewriter";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/ai-essay-scorer.md": {
	id: "ai/ai-essay-scorer.md";
  slug: "ai/ai-essay-scorer";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/ai-feedback-on-video-submissions.md": {
	id: "ai/ai-feedback-on-video-submissions.md";
  slug: "ai/ai-feedback-on-video-submissions";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/ai-powered-dashboard-widgets.md": {
	id: "ai/ai-powered-dashboard-widgets.md";
  slug: "ai/ai-powered-dashboard-widgets";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/ai-powered-flashcard-generator.md": {
	id: "ai/ai-powered-flashcard-generator.md";
  slug: "ai/ai-powered-flashcard-generator";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/ai-powered-image-generator.md": {
	id: "ai/ai-powered-image-generator.md";
  slug: "ai/ai-powered-image-generator";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/ai-reading-level-detector.md": {
	id: "ai/ai-reading-level-detector.md";
  slug: "ai/ai-reading-level-detector";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/ai-text-feedback-generator.md": {
	id: "ai/ai-text-feedback-generator.md";
  slug: "ai/ai-text-feedback-generator";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/ai-text-summarizer.md": {
	id: "ai/ai-text-summarizer.md";
  slug: "ai/ai-text-summarizer";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/ai-topic-classifier.md": {
	id: "ai/ai-topic-classifier.md";
  slug: "ai/ai-topic-classifier";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/ai-transcription-module.md": {
	id: "ai/ai-transcription-module.md";
  slug: "ai/ai-transcription-module";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/ai-translation-system.md": {
	id: "ai/ai-translation-system.md";
  slug: "ai/ai-translation-system";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/ai-voice-feedback-tool.md": {
	id: "ai/ai-voice-feedback-tool.md";
  slug: "ai/ai-voice-feedback-tool";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/auto-categorization-pipeline.md": {
	id: "ai/auto-categorization-pipeline.md";
  slug: "ai/auto-categorization-pipeline";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/automated-content-tagging.md": {
	id: "ai/automated-content-tagging.md";
  slug: "ai/automated-content-tagging";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/automated-report-generator.md": {
	id: "ai/automated-report-generator.md";
  slug: "ai/automated-report-generator";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/chat-history-semantic-search.md": {
	id: "ai/chat-history-semantic-search.md";
  slug: "ai/chat-history-semantic-search";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/concept-reinforcement-recommender.md": {
	id: "ai/concept-reinforcement-recommender.md";
  slug: "ai/concept-reinforcement-recommender";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/custom-embedding-generator.md": {
	id: "ai/custom-embedding-generator.md";
  slug: "ai/custom-embedding-generator";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/custom-model-deployment-service.md": {
	id: "ai/custom-model-deployment-service.md";
  slug: "ai/custom-model-deployment-service";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/custom-nlp-workflow-setup.md": {
	id: "ai/custom-nlp-workflow-setup.md";
  slug: "ai/custom-nlp-workflow-setup";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/data-driven-personalization-engine.md": {
	id: "ai/data-driven-personalization-engine.md";
  slug: "ai/data-driven-personalization-engine";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/diagram-describer-ai.md": {
	id: "ai/diagram-describer-ai.md";
  slug: "ai/diagram-describer-ai";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/document-q&a-engine.md": {
	id: "ai/document-q&a-engine.md";
  slug: "ai/document-qa-engine";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/dynamic-writing-prompter.md": {
	id: "ai/dynamic-writing-prompter.md";
  slug: "ai/dynamic-writing-prompter";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/interactive-ai-explainer-tool.md": {
	id: "ai/interactive-ai-explainer-tool.md";
  slug: "ai/interactive-ai-explainer-tool";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/keyword-highlighter-tool.md": {
	id: "ai/keyword-highlighter-tool.md";
  slug: "ai/keyword-highlighter-tool";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/language-polisher.md": {
	id: "ai/language-polisher.md";
  slug: "ai/language-polisher";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/learning-style-recognizer.md": {
	id: "ai/learning-style-recognizer.md";
  slug: "ai/learning-style-recognizer";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/model-selection-layer.md": {
	id: "ai/model-selection-layer.md";
  slug: "ai/model-selection-layer";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/multi-modal-ai-input-handler.md": {
	id: "ai/multi-modal-ai-input-handler.md";
  slug: "ai/multi-modal-ai-input-handler";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/pdf-ai-analyzer.md": {
	id: "ai/pdf-ai-analyzer.md";
  slug: "ai/pdf-ai-analyzer";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/plagiarism-detection-engine.md": {
	id: "ai/plagiarism-detection-engine.md";
  slug: "ai/plagiarism-detection-engine";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/prompt-library-manager.md": {
	id: "ai/prompt-library-manager.md";
  slug: "ai/prompt-library-manager";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/prompt-optimization-layer.md": {
	id: "ai/prompt-optimization-layer.md";
  slug: "ai/prompt-optimization-layer";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/question-generator.md": {
	id: "ai/question-generator.md";
  slug: "ai/question-generator";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/rubric-linked-ai-review-tool.md": {
	id: "ai/rubric-linked-ai-review-tool.md";
  slug: "ai/rubric-linked-ai-review-tool";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/script-generator.md": {
	id: "ai/script-generator.md";
  slug: "ai/script-generator";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/smart-answer-checker.md": {
	id: "ai/smart-answer-checker.md";
  slug: "ai/smart-answer-checker";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/speech-emotion-detector.md": {
	id: "ai/speech-emotion-detector.md";
  slug: "ai/speech-emotion-detector";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/speech-to-text-interface.md": {
	id: "ai/speech-to-text-interface.md";
  slug: "ai/speech-to-text-interface";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/structured-output-generator.md": {
	id: "ai/structured-output-generator.md";
  slug: "ai/structured-output-generator";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/study-plan-optimizer-(llm-powered).md": {
	id: "ai/study-plan-optimizer-(llm-powered).md";
  slug: "ai/study-plan-optimizer-llm-powered";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/text-to-speech-player.md": {
	id: "ai/text-to-speech-player.md";
  slug: "ai/text-to-speech-player";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/time-tuned-large-language-model-access.md": {
	id: "ai/time-tuned-large-language-model-access.md";
  slug: "ai/time-tuned-large-language-model-access";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/vector-database-integration.md": {
	id: "ai/vector-database-integration.md";
  slug: "ai/vector-database-integration";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"ai/voice-controlled-navigation-assistant.md": {
	id: "ai/voice-controlled-navigation-assistant.md";
  slug: "ai/voice-controlled-navigation-assistant";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"authentication/account-verification-workflow.md": {
	id: "authentication/account-verification-workflow.md";
  slug: "authentication/account-verification-workflow";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"authentication/email-&-password-sign-in.md": {
	id: "authentication/email-&-password-sign-in.md";
  slug: "authentication/email--password-sign-in";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"authentication/invite-only-registration-flow.md": {
	id: "authentication/invite-only-registration-flow.md";
  slug: "authentication/invite-only-registration-flow";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"authentication/ip-restriction-tools.md": {
	id: "authentication/ip-restriction-tools.md";
  slug: "authentication/ip-restriction-tools";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"authentication/login-activity-log.md": {
	id: "authentication/login-activity-log.md";
  slug: "authentication/login-activity-log";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"authentication/password-reset-system.md": {
	id: "authentication/password-reset-system.md";
  slug: "authentication/password-reset-system";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"authentication/role-based-access-control.md": {
	id: "authentication/role-based-access-control.md";
  slug: "authentication/role-based-access-control";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"authentication/social-login-options.md": {
	id: "authentication/social-login-options.md";
  slug: "authentication/social-login-options";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"authentication/two-factor-authentication.md": {
	id: "authentication/two-factor-authentication.md";
  slug: "authentication/two-factor-authentication";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"authentication/user-ban-&-suspension-controls.md": {
	id: "authentication/user-ban-&-suspension-controls.md";
  slug: "authentication/user-ban--suspension-controls";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/announcement-banner-system.md": {
	id: "communication/announcement-banner-system.md";
  slug: "communication/announcement-banner-system";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/attachment-support-in-chat.md": {
	id: "communication/attachment-support-in-chat.md";
  slug: "communication/attachment-support-in-chat";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/automated-reply-templates.md": {
	id: "communication/automated-reply-templates.md";
  slug: "communication/automated-reply-templates";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/broadcast-to-role-groups.md": {
	id: "communication/broadcast-to-role-groups.md";
  slug: "communication/broadcast-to-role-groups";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/communication-logs-dashboard.md": {
	id: "communication/communication-logs-dashboard.md";
  slug: "communication/communication-logs-dashboard";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/cross-device-sync.md": {
	id: "communication/cross-device-sync.md";
  slug: "communication/cross-device-sync";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/custom-notification-preferences.md": {
	id: "communication/custom-notification-preferences.md";
  slug: "communication/custom-notification-preferences";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/escalation-chain-for-unread-messages.md": {
	id: "communication/escalation-chain-for-unread-messages.md";
  slug: "communication/escalation-chain-for-unread-messages";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/inbox-management-module.md": {
	id: "communication/inbox-management-module.md";
  slug: "communication/inbox-management-module";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/message-scheduling-tool.md": {
	id: "communication/message-scheduling-tool.md";
  slug: "communication/message-scheduling-tool";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/message-search-&-filtering.md": {
	id: "communication/message-search-&-filtering.md";
  slug: "communication/message-search--filtering";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/moderation-controls.md": {
	id: "communication/moderation-controls.md";
  slug: "communication/moderation-controls";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/private-message-threads.md": {
	id: "communication/private-message-threads.md";
  slug: "communication/private-message-threads";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/read-receipts-&-delivery-status.md": {
	id: "communication/read-receipts-&-delivery-status.md";
  slug: "communication/read-receipts--delivery-status";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/realtime-status-presence.md": {
	id: "communication/realtime-status-presence.md";
  slug: "communication/realtime-status-presence";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/thread-tagging-&-labels.md": {
	id: "communication/thread-tagging-&-labels.md";
  slug: "communication/thread-tagging--labels";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/threaded-email-integration.md": {
	id: "communication/threaded-email-integration.md";
  slug: "communication/threaded-email-integration";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/typing-indicator-system.md": {
	id: "communication/typing-indicator-system.md";
  slug: "communication/typing-indicator-system";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/user-mention-system.md": {
	id: "communication/user-mention-system.md";
  slug: "communication/user-mention-system";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"communication/voice-message-integration.md": {
	id: "communication/voice-message-integration.md";
  slug: "communication/voice-message-integration";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"content/contact-page-integration.md": {
	id: "content/contact-page-integration.md";
  slug: "content/contact-page-integration";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"content/custom-cms-for-staff.md": {
	id: "content/custom-cms-for-staff.md";
  slug: "content/custom-cms-for-staff";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"content/form-builder-&-submission-handling.md": {
	id: "content/form-builder-&-submission-handling.md";
  slug: "content/form-builder--submission-handling";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"content/markdown-content-engine.md": {
	id: "content/markdown-content-engine.md";
  slug: "content/markdown-content-engine";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"content/marketing-website-framework.md": {
	id: "content/marketing-website-framework.md";
  slug: "content/marketing-website-framework";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"content/multilingual-routing.md": {
	id: "content/multilingual-routing.md";
  slug: "content/multilingual-routing";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"content/page-builder-tool.md": {
	id: "content/page-builder-tool.md";
  slug: "content/page-builder-tool";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"content/seo-meta-tag-manager.md": {
	id: "content/seo-meta-tag-manager.md";
  slug: "content/seo-meta-tag-manager";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"content/sitemap-&-robots.txt-generator.md": {
	id: "content/sitemap-&-robots.txt-generator.md";
  slug: "content/sitemap--robotstxt-generator";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"content/static-blog-system.md": {
	id: "content/static-blog-system.md";
  slug: "content/static-blog-system";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/activity-feed.md": {
	id: "core/activity-feed.md";
  slug: "core/activity-feed";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/api-key-manager.md": {
	id: "core/api-key-manager.md";
  slug: "core/api-key-manager";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/archived-session-viewer.md": {
	id: "core/archived-session-viewer.md";
  slug: "core/archived-session-viewer";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/assignment-submission-system.md": {
	id: "core/assignment-submission-system.md";
  slug: "core/assignment-submission-system";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/attendance-tracker.md": {
	id: "core/attendance-tracker.md";
  slug: "core/attendance-tracker";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/auto-save-&-draft-mode.md": {
	id: "core/auto-save-&-draft-mode.md";
  slug: "core/auto-save--draft-mode";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/badge-&-achievement-tracker.md": {
	id: "core/badge-&-achievement-tracker.md";
  slug: "core/badge--achievement-tracker";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/bulk-user-import.md": {
	id: "core/bulk-user-import.md";
  slug: "core/bulk-user-import";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/calendar-sync-module.md": {
	id: "core/calendar-sync-module.md";
  slug: "core/calendar-sync-module";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/certificate-generator.md": {
	id: "core/certificate-generator.md";
  slug: "core/certificate-generator";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/class-roster-tool.md": {
	id: "core/class-roster-tool.md";
  slug: "core/class-roster-tool";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/content-visibility-settings.md": {
	id: "core/content-visibility-settings.md";
  slug: "core/content-visibility-settings";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/course-builder.md": {
	id: "core/course-builder.md";
  slug: "core/course-builder";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/course-duplication-tool.md": {
	id: "core/course-duplication-tool.md";
  slug: "core/course-duplication-tool";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/cross-course-navigation.md": {
	id: "core/cross-course-navigation.md";
  slug: "core/cross-course-navigation";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/customizable-homepage.md": {
	id: "core/customizable-homepage.md";
  slug: "core/customizable-homepage";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/dark-mode-toggle.md": {
	id: "core/dark-mode-toggle.md";
  slug: "core/dark-mode-toggle";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/discussion-forums.md": {
	id: "core/discussion-forums.md";
  slug: "core/discussion-forums";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/document-annotation-tool.md": {
	id: "core/document-annotation-tool.md";
  slug: "core/document-annotation-tool";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/event-announcement-tool.md": {
	id: "core/event-announcement-tool.md";
  slug: "core/event-announcement-tool";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/file-upload-module.md": {
	id: "core/file-upload-module.md";
  slug: "core/file-upload-module";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/gradebook-system.md": {
	id: "core/gradebook-system.md";
  slug: "core/gradebook-system";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/interactive-exercises.md": {
	id: "core/interactive-exercises.md";
  slug: "core/interactive-exercises";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/language-localization-engine.md": {
	id: "core/language-localization-engine.md";
  slug: "core/language-localization-engine";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/learning-path-builder.md": {
	id: "core/learning-path-builder.md";
  slug: "core/learning-path-builder";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/lesson-scheduler.md": {
	id: "core/lesson-scheduler.md";
  slug: "core/lesson-scheduler";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/live-session-room-launcher.md": {
	id: "core/live-session-room-launcher.md";
  slug: "core/live-session-room-launcher";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/media-gallery.md": {
	id: "core/media-gallery.md";
  slug: "core/media-gallery";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/mobile-optimized-interface.md": {
	id: "core/mobile-optimized-interface.md";
  slug: "core/mobile-optimized-interface";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/multi-institution-support.md": {
	id: "core/multi-institution-support.md";
  slug: "core/multi-institution-support";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/notification-manager.md": {
	id: "core/notification-manager.md";
  slug: "core/notification-manager";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/onboarding-walkthrough.md": {
	id: "core/onboarding-walkthrough.md";
  slug: "core/onboarding-walkthrough";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/profile-manager.md": {
	id: "core/profile-manager.md";
  slug: "core/profile-manager";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/progress-analytics.md": {
	id: "core/progress-analytics.md";
  slug: "core/progress-analytics";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/quiz-builder.md": {
	id: "core/quiz-builder.md";
  slug: "core/quiz-builder";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/resource-locker.md": {
	id: "core/resource-locker.md";
  slug: "core/resource-locker";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/role-management-panel.md": {
	id: "core/role-management-panel.md";
  slug: "core/role-management-panel";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/sandbox-testing-environment.md": {
	id: "core/sandbox-testing-environment.md";
  slug: "core/sandbox-testing-environment";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/session-booking-system.md": {
	id: "core/session-booking-system.md";
  slug: "core/session-booking-system";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/support-ticket-submission.md": {
	id: "core/support-ticket-submission.md";
  slug: "core/support-ticket-submission";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/survey-&-feedback-tool.md": {
	id: "core/survey-&-feedback-tool.md";
  slug: "core/survey--feedback-tool";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/tagging-&-labeling-system.md": {
	id: "core/tagging-&-labeling-system.md";
  slug: "core/tagging--labeling-system";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/terms-&-consent-management.md": {
	id: "core/terms-&-consent-management.md";
  slug: "core/terms--consent-management";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/time-zone-normalizer.md": {
	id: "core/time-zone-normalizer.md";
  slug: "core/time-zone-normalizer";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"core/timetable-viewer.md": {
	id: "core/timetable-viewer.md";
  slug: "core/timetable-viewer";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/admin-billing-dashboard.md": {
	id: "payment/admin-billing-dashboard.md";
  slug: "payment/admin-billing-dashboard";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/api-access-for-billing-events.md": {
	id: "payment/api-access-for-billing-events.md";
  slug: "payment/api-access-for-billing-events";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/auto-billing-engine.md": {
	id: "payment/auto-billing-engine.md";
  slug: "payment/auto-billing-engine";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/billing-address-collection.md": {
	id: "payment/billing-address-collection.md";
  slug: "payment/billing-address-collection";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/chargeback-management-panel.md": {
	id: "payment/chargeback-management-panel.md";
  slug: "payment/chargeback-management-panel";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/coupon-code-system.md": {
	id: "payment/coupon-code-system.md";
  slug: "payment/coupon-code-system";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/custom-pricing-plans.md": {
	id: "payment/custom-pricing-plans.md";
  slug: "payment/custom-pricing-plans";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/failed-payment-retry-logic.md": {
	id: "payment/failed-payment-retry-logic.md";
  slug: "payment/failed-payment-retry-logic";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/gift-code-redemption.md": {
	id: "payment/gift-code-redemption.md";
  slug: "payment/gift-code-redemption";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/installment-payment-option.md": {
	id: "payment/installment-payment-option.md";
  slug: "payment/installment-payment-option";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/invoice-pdf-exporter.md": {
	id: "payment/invoice-pdf-exporter.md";
  slug: "payment/invoice-pdf-exporter";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/invoicing-system.md": {
	id: "payment/invoicing-system.md";
  slug: "payment/invoicing-system";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/manual-invoice-entry-(admin-only).md": {
	id: "payment/manual-invoice-entry-(admin-only).md";
  slug: "payment/manual-invoice-entry-admin-only";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/multiple-currency-support.md": {
	id: "payment/multiple-currency-support.md";
  slug: "payment/multiple-currency-support";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/one-time-purchase-checkout.md": {
	id: "payment/one-time-purchase-checkout.md";
  slug: "payment/one-time-purchase-checkout";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/payment-history-viewer.md": {
	id: "payment/payment-history-viewer.md";
  slug: "payment/payment-history-viewer";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/payment-reminder-system.md": {
	id: "payment/payment-reminder-system.md";
  slug: "payment/payment-reminder-system";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/paypal-integration.md": {
	id: "payment/paypal-integration.md";
  slug: "payment/paypal-integration";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/prepaid-credit-wallet.md": {
	id: "payment/prepaid-credit-wallet.md";
  slug: "payment/prepaid-credit-wallet";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/receipt-generation.md": {
	id: "payment/receipt-generation.md";
  slug: "payment/receipt-generation";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/refund-processing-workflow.md": {
	id: "payment/refund-processing-workflow.md";
  slug: "payment/refund-processing-workflow";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/revenue-reporting-tools.md": {
	id: "payment/revenue-reporting-tools.md";
  slug: "payment/revenue-reporting-tools";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/secure-payment-tokenization.md": {
	id: "payment/secure-payment-tokenization.md";
  slug: "payment/secure-payment-tokenization";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/stripe-integration.md": {
	id: "payment/stripe-integration.md";
  slug: "payment/stripe-integration";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/subscription-cancellation-survey.md": {
	id: "payment/subscription-cancellation-survey.md";
  slug: "payment/subscription-cancellation-survey";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/subscription-pause-&-resume.md": {
	id: "payment/subscription-pause-&-resume.md";
  slug: "payment/subscription-pause--resume";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/subscription-tier-manager.md": {
	id: "payment/subscription-tier-manager.md";
  slug: "payment/subscription-tier-manager";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/tax-calculation-module.md": {
	id: "payment/tax-calculation-module.md";
  slug: "payment/tax-calculation-module";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/trial-period-manager.md": {
	id: "payment/trial-period-manager.md";
  slug: "payment/trial-period-manager";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"payment/usage-based-billing-system.md": {
	id: "payment/usage-based-billing-system.md";
  slug: "payment/usage-based-billing-system";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"performance/completion-rate-charts.md": {
	id: "performance/completion-rate-charts.md";
  slug: "performance/completion-rate-charts";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"performance/conversion-funnel-tracking.md": {
	id: "performance/conversion-funnel-tracking.md";
  slug: "performance/conversion-funnel-tracking";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"performance/custom-export-to-csv.md": {
	id: "performance/custom-export-to-csv.md";
  slug: "performance/custom-export-to-csv";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"performance/daily-usage-reports.md": {
	id: "performance/daily-usage-reports.md";
  slug: "performance/daily-usage-reports";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"performance/feedback-collection-forms.md": {
	id: "performance/feedback-collection-forms.md";
  slug: "performance/feedback-collection-forms";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"performance/graph-&-chart-renderer.md": {
	id: "performance/graph-&-chart-renderer.md";
  slug: "performance/graph--chart-renderer";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"performance/heatmap-interaction-reports.md": {
	id: "performance/heatmap-interaction-reports.md";
  slug: "performance/heatmap-interaction-reports";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"performance/real-time-analytics-dashboard.md": {
	id: "performance/real-time-analytics-dashboard.md";
  slug: "performance/real-time-analytics-dashboard";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"performance/session-duration-metrics.md": {
	id: "performance/session-duration-metrics.md";
  slug: "performance/session-duration-metrics";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"performance/user-engagement-timeline.md": {
	id: "performance/user-engagement-timeline.md";
  slug: "performance/user-engagement-timeline";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"video/audio-file-manager.md": {
	id: "video/audio-file-manager.md";
  slug: "video/audio-file-manager";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"video/class-resource-locker.md": {
	id: "video/class-resource-locker.md";
  slug: "video/class-resource-locker";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"video/in-browser-video-call-module.md": {
	id: "video/in-browser-video-call-module.md";
  slug: "video/in-browser-video-call-module";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"video/media-upload-&-playback.md": {
	id: "video/media-upload-&-playback.md";
  slug: "video/media-upload--playback";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"video/presentation-slideshow-viewer.md": {
	id: "video/presentation-slideshow-viewer.md";
  slug: "video/presentation-slideshow-viewer";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"video/screen-share-support.md": {
	id: "video/screen-share-support.md";
  slug: "video/screen-share-support";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"video/session-recording-playback.md": {
	id: "video/session-recording-playback.md";
  slug: "video/session-recording-playback";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"video/shared-notepad-for-classes.md": {
	id: "video/shared-notepad-for-classes.md";
  slug: "video/shared-notepad-for-classes";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"video/video-hosting-integration.md": {
	id: "video/video-hosting-integration.md";
  slug: "video/video-hosting-integration";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
"video/whiteboard-sharing-tool.md": {
	id: "video/whiteboard-sharing-tool.md";
  slug: "video/whiteboard-sharing-tool";
  body: string;
  collection: "modules";
  data: InferEntrySchema<"modules">
} & { render(): Render[".md"] };
};
"press": {
"were-live-broken-duck-media.md": {
	id: "were-live-broken-duck-media.md";
  slug: "were-live-broken-duck-media";
  body: string;
  collection: "press";
  data: InferEntrySchema<"press">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
