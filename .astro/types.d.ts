declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]];

	export const image: () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodString;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	const entryMap: {
		"book": {
"1493.md": {
  id: "1493.md",
  slug: "1493",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"1q84.md": {
  id: "1q84.md",
  slug: "1q84",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"21-lessons.md": {
  id: "21-lessons.md",
  slug: "21-lessons",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"a-grief-observed.md": {
  id: "a-grief-observed.md",
  slug: "a-grief-observed",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"acceptance.md": {
  id: "acceptance.md",
  slug: "acceptance",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"accidental-billionaires.md": {
  id: "accidental-billionaires.md",
  slug: "accidental-billionaires",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"all-the-kings-men.md": {
  id: "all-the-kings-men.md",
  slug: "all-the-kings-men",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"all-the-presidents-men.md": {
  id: "all-the-presidents-men.md",
  slug: "all-the-presidents-men",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"american-prometheus.md": {
  id: "american-prometheus.md",
  slug: "american-prometheus",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"andromeda-strain.md": {
  id: "andromeda-strain.md",
  slug: "andromeda-strain",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"annihilation.md": {
  id: "annihilation.md",
  slug: "annihilation",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"anthem.md": {
  id: "anthem.md",
  slug: "anthem",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"art-of-looking-sideways.md": {
  id: "art-of-looking-sideways.md",
  slug: "art-of-looking-sideways",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"artemis.md": {
  id: "artemis.md",
  slug: "artemis",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"authority.md": {
  id: "authority.md",
  slug: "authority",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"axioms-end.md": {
  id: "axioms-end.md",
  slug: "axioms-end",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"bad-blood.md": {
  id: "bad-blood.md",
  slug: "bad-blood",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"bandwidth.md": {
  id: "bandwidth.md",
  slug: "bandwidth",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"based-on-a-true-story.md": {
  id: "based-on-a-true-story.md",
  slug: "based-on-a-true-story",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"being-mortal.md": {
  id: "being-mortal.md",
  slug: "being-mortal",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"blindsight.md": {
  id: "blindsight.md",
  slug: "blindsight",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"blood-meridian.md": {
  id: "blood-meridian.md",
  slug: "blood-meridian",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"bossypants.md": {
  id: "bossypants.md",
  slug: "bossypants",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"branding-in-five-and-a-half-steps.md": {
  id: "branding-in-five-and-a-half-steps.md",
  slug: "branding-in-five-and-a-half-steps",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"brave-new-world.md": {
  id: "brave-new-world.md",
  slug: "brave-new-world",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"build-brilliant-brands.md": {
  id: "build-brilliant-brands.md",
  slug: "build-brilliant-brands",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"colorless-tsukuru-tazaki.md": {
  id: "colorless-tsukuru-tazaki.md",
  slug: "colorless-tsukuru-tazaki",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"creative-quest.md": {
  id: "creative-quest.md",
  slug: "creative-quest",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"creative-selection.md": {
  id: "creative-selection.md",
  slug: "creative-selection",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"creative-superpowers.md": {
  id: "creative-superpowers.md",
  slug: "creative-superpowers",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"cryptonomicon.md": {
  id: "cryptonomicon.md",
  slug: "cryptonomicon",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"curious-case-of-benjamin-button.md": {
  id: "curious-case-of-benjamin-button.md",
  slug: "curious-case-of-benjamin-button",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"dance-of-the-possible.md": {
  id: "dance-of-the-possible.md",
  slug: "dance-of-the-possible",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"dark-intelligence.md": {
  id: "dark-intelligence.md",
  slug: "dark-intelligence",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"dark-matter-and-the-dinosaurs.md": {
  id: "dark-matter-and-the-dinosaurs.md",
  slug: "dark-matter-and-the-dinosaurs",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"dark-matter-and-trojan-horses.md": {
  id: "dark-matter-and-trojan-horses.md",
  slug: "dark-matter-and-trojan-horses",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"dark-matter.md": {
  id: "dark-matter.md",
  slug: "dark-matter",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"dark-money.md": {
  id: "dark-money.md",
  slug: "dark-money",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"dark-places.md": {
  id: "dark-places.md",
  slug: "dark-places",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"dawn-of-everything.md": {
  id: "dawn-of-everything.md",
  slug: "dawn-of-everything",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"disrupted.md": {
  id: "disrupted.md",
  slug: "disrupted",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"doing-justice.md": {
  id: "doing-justice.md",
  slug: "doing-justice",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"educated.md": {
  id: "educated.md",
  slug: "educated",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"empower.md": {
  id: "empower.md",
  slug: "empower",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"every-tools-a-hammer.md": {
  id: "every-tools-a-hammer.md",
  slug: "every-tools-a-hammer",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"exhalation.md": {
  id: "exhalation.md",
  slug: "exhalation",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"fifth-season.md": {
  id: "fifth-season.md",
  slug: "fifth-season",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"flow.md": {
  id: "flow.md",
  slug: "flow",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"foucaults-pendulum.md": {
  id: "foucaults-pendulum.md",
  slug: "foucaults-pendulum",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"four-thousand-weeks.md": {
  id: "four-thousand-weeks.md",
  slug: "four-thousand-weeks",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"great-gatsby.md": {
  id: "great-gatsby.md",
  slug: "great-gatsby",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"greenlights.md": {
  id: "greenlights.md",
  slug: "greenlights",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"gulp.md": {
  id: "gulp.md",
  slug: "gulp",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"hacking-independence.md": {
  id: "hacking-independence.md",
  slug: "hacking-independence",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"hatching-twittter.md": {
  id: "hatching-twittter.md",
  slug: "hatching-twittter",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"heavy.md": {
  id: "heavy.md",
  slug: "heavy",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"high-output-management.md": {
  id: "high-output-management.md",
  slug: "high-output-management",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"hollow-kingdom.md": {
  id: "hollow-kingdom.md",
  slug: "hollow-kingdom",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"how-google-works.md": {
  id: "how-google-works.md",
  slug: "how-google-works",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"how-high-we-go-in-the-dark.md": {
  id: "how-high-we-go-in-the-dark.md",
  slug: "how-high-we-go-in-the-dark",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"how-to-absurd-scientific-advice.md": {
  id: "how-to-absurd-scientific-advice.md",
  slug: "how-to-absurd-scientific-advice",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"how-to-be-an-artist.md": {
  id: "how-to-be-an-artist.md",
  slug: "how-to-be-an-artist",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"how-to-fail-at-almost-everything-and-still-win-big.md": {
  id: "how-to-fail-at-almost-everything-and-still-win-big.md",
  slug: "how-to-fail-at-almost-everything-and-still-win-big",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"how-to.md": {
  id: "how-to.md",
  slug: "how-to",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"hummingbird-salamander.md": {
  id: "hummingbird-salamander.md",
  slug: "hummingbird-salamander",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"idea-writers.md": {
  id: "idea-writers.md",
  slug: "idea-writers",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"incognito.md": {
  id: "incognito.md",
  slug: "incognito",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"influence.md": {
  id: "influence.md",
  slug: "influence",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"inspired.md": {
  id: "inspired.md",
  slug: "inspired",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"interstellar.md": {
  id: "interstellar.md",
  slug: "interstellar",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"invention-of-nature.md": {
  id: "invention-of-nature.md",
  slug: "invention-of-nature",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"invisible-life-of-addie-larue.md": {
  id: "invisible-life-of-addie-larue.md",
  slug: "invisible-life-of-addie-larue",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"junior.md": {
  id: "junior.md",
  slug: "junior",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"jurassic-park.md": {
  id: "jurassic-park.md",
  slug: "jurassic-park",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"kaiju-preservation-society.md": {
  id: "kaiju-preservation-society.md",
  slug: "kaiju-preservation-society",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"kitchen-confidential.md": {
  id: "kitchen-confidential.md",
  slug: "kitchen-confidential",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"klara-and-the-sun.md": {
  id: "klara-and-the-sun.md",
  slug: "klara-and-the-sun",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"mademoiselle-coco-chanel.md": {
  id: "mademoiselle-coco-chanel.md",
  slug: "mademoiselle-coco-chanel",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"ministry-for-the-future.md": {
  id: "ministry-for-the-future.md",
  slug: "ministry-for-the-future",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"misbehaving.md": {
  id: "misbehaving.md",
  slug: "misbehaving",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"mo-meta-blues.md": {
  id: "mo-meta-blues.md",
  slug: "mo-meta-blues",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"moneyland.md": {
  id: "moneyland.md",
  slug: "moneyland",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"moonwalking-with-einstein.md": {
  id: "moonwalking-with-einstein.md",
  slug: "moonwalking-with-einstein",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"my-sister-the-serial-killer.md": {
  id: "my-sister-the-serial-killer.md",
  slug: "my-sister-the-serial-killer",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"neuromancer.md": {
  id: "neuromancer.md",
  slug: "neuromancer",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"never-let-me-go.md": {
  id: "never-let-me-go.md",
  slug: "never-let-me-go",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"never-split-the-difference.md": {
  id: "never-split-the-difference.md",
  slug: "never-split-the-difference",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"norse-mythology.md": {
  id: "norse-mythology.md",
  slug: "norse-mythology",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"nothing-to-see-here.md": {
  id: "nothing-to-see-here.md",
  slug: "nothing-to-see-here",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"old-mans-war.md": {
  id: "old-mans-war.md",
  slug: "old-mans-war",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"once-upon-a-time-in-hollywood.md": {
  id: "once-upon-a-time-in-hollywood.md",
  slug: "once-upon-a-time-in-hollywood",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"other-minds.md": {
  id: "other-minds.md",
  slug: "other-minds",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"paid-attention.md": {
  id: "paid-attention.md",
  slug: "paid-attention",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"pandemic.md": {
  id: "pandemic.md",
  slug: "pandemic",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"passage-of-power.md": {
  id: "passage-of-power.md",
  slug: "passage-of-power",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"picture-this.md": {
  id: "picture-this.md",
  slug: "picture-this",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"popisho.md": {
  id: "popisho.md",
  slug: "popisho",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"power-of-now.md": {
  id: "power-of-now.md",
  slug: "power-of-now",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"premonition.md": {
  id: "premonition.md",
  slug: "premonition",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"pricing-design.md": {
  id: "pricing-design.md",
  slug: "pricing-design",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"race-matters.md": {
  id: "race-matters.md",
  slug: "race-matters",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"range.md": {
  id: "range.md",
  slug: "range",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"reinvention-in-middle-america.md": {
  id: "reinvention-in-middle-america.md",
  slug: "reinvention-in-middle-america",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"remains-of-the-day.md": {
  id: "remains-of-the-day.md",
  slug: "remains-of-the-day",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"rosemarys-baby.md": {
  id: "rosemarys-baby.md",
  slug: "rosemarys-baby",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"sapiens.md": {
  id: "sapiens.md",
  slug: "sapiens",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"say-nothing.md": {
  id: "say-nothing.md",
  slug: "say-nothing",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"sea-of-tranquility.md": {
  id: "sea-of-tranquility.md",
  slug: "sea-of-tranquility",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"seducing-strangers.md": {
  id: "seducing-strangers.md",
  slug: "seducing-strangers",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"seven-principles-of-making-marriage-work.md": {
  id: "seven-principles-of-making-marriage-work.md",
  slug: "seven-principles-of-making-marriage-work",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"seveneves.md": {
  id: "seveneves.md",
  slug: "seveneves",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"sharp-objects.md": {
  id: "sharp-objects.md",
  slug: "sharp-objects",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"shoe-dog.md": {
  id: "shoe-dog.md",
  slug: "shoe-dog",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"shortest-way-home.md": {
  id: "shortest-way-home.md",
  slug: "shortest-way-home",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"slaughterhouse-five.md": {
  id: "slaughterhouse-five.md",
  slug: "slaughterhouse-five",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"start-where-you-are.md": {
  id: "start-where-you-are.md",
  slug: "start-where-you-are",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"station-eleven.md": {
  id: "station-eleven.md",
  slug: "station-eleven",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"stolen-focus.md": {
  id: "stolen-focus.md",
  slug: "stolen-focus",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"super-sad-true-love-story.md": {
  id: "super-sad-true-love-story.md",
  slug: "super-sad-true-love-story",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"talking-to-strangers.md": {
  id: "talking-to-strangers.md",
  slug: "talking-to-strangers",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"technique-for-producing-ideas.md": {
  id: "technique-for-producing-ideas.md",
  slug: "technique-for-producing-ideas",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"ten-arguments-for-deleting-your-social-media-accounts-right-now.md": {
  id: "ten-arguments-for-deleting-your-social-media-accounts-right-now.md",
  slug: "ten-arguments-for-deleting-your-social-media-accounts-right-now",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-city-we-became.md": {
  id: "the-city-we-became.md",
  slug: "the-city-we-became",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-creative-act.md": {
  id: "the-creative-act.md",
  slug: "the-creative-act",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-fifth-risk.md": {
  id: "the-fifth-risk.md",
  slug: "the-fifth-risk",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-fire-next-time.md": {
  id: "the-fire-next-time.md",
  slug: "the-fire-next-time",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-goldfinch.md": {
  id: "the-goldfinch.md",
  slug: "the-goldfinch",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-good-father.md": {
  id: "the-good-father.md",
  slug: "the-good-father",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-graveyard-book.md": {
  id: "the-graveyard-book.md",
  slug: "the-graveyard-book",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-handmaids-tale.md": {
  id: "the-handmaids-tale.md",
  slug: "the-handmaids-tale",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-inevitable.md": {
  id: "the-inevitable.md",
  slug: "the-inevitable",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-jungle-book.md": {
  id: "the-jungle-book.md",
  slug: "the-jungle-book",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-man-in-the-high-castle.md": {
  id: "the-man-in-the-high-castle.md",
  slug: "the-man-in-the-high-castle",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-martian.md": {
  id: "the-martian.md",
  slug: "the-martian",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-mindbody-prescription.md": {
  id: "the-mindbody-prescription.md",
  slug: "the-mindbody-prescription",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-obstacle-is-the-way.md": {
  id: "the-obstacle-is-the-way.md",
  slug: "the-obstacle-is-the-way",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-outlier.md": {
  id: "the-outlier.md",
  slug: "the-outlier",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-overstory.md": {
  id: "the-overstory.md",
  slug: "the-overstory",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-power.md": {
  id: "the-power.md",
  slug: "the-power",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-righteous-mind.md": {
  id: "the-righteous-mind.md",
  slug: "the-righteous-mind",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-science-of-interstellar.md": {
  id: "the-science-of-interstellar.md",
  slug: "the-science-of-interstellar",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-spy-who-came-in-from-the-cold.md": {
  id: "the-spy-who-came-in-from-the-cold.md",
  slug: "the-spy-who-came-in-from-the-cold",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-topeka-school.md": {
  id: "the-topeka-school.md",
  slug: "the-topeka-school",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-wizard-and-the-prophet.md": {
  id: "the-wizard-and-the-prophet.md",
  slug: "the-wizard-and-the-prophet",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"the-women-could-fly.md": {
  id: "the-women-could-fly.md",
  slug: "the-women-could-fly",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"they-call-me-supermensch.md": {
  id: "they-call-me-supermensch.md",
  slug: "they-call-me-supermensch",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"think-again.md": {
  id: "think-again.md",
  slug: "think-again",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"this-is-how-they-tell-me-the-wrold-ends.md": {
  id: "this-is-how-they-tell-me-the-wrold-ends.md",
  slug: "this-is-how-they-tell-me-the-wrold-ends",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"time-travel-a-history.md": {
  id: "time-travel-a-history.md",
  slug: "time-travel-a-history",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"tokyo-vice.md": {
  id: "tokyo-vice.md",
  slug: "tokyo-vice",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"tomorrow-and-tomorrow-and-tomorrow.md": {
  id: "tomorrow-and-tomorrow-and-tomorrow.md",
  slug: "tomorrow-and-tomorrow-and-tomorrow",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"typhoid-mary.md": {
  id: "typhoid-mary.md",
  slug: "typhoid-mary",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"uncanny-valley.md": {
  id: "uncanny-valley.md",
  slug: "uncanny-valley",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"undoing-project.md": {
  id: "undoing-project.md",
  slug: "undoing-project",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"van-gogh-the-life.md": {
  id: "van-gogh-the-life.md",
  slug: "van-gogh-the-life",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"vicious.md": {
  id: "vicious.md",
  slug: "vicious",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"victoria-the-queen.md": {
  id: "victoria-the-queen.md",
  slug: "victoria-the-queen",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"we-need-to-talk.md": {
  id: "we-need-to-talk.md",
  slug: "we-need-to-talk",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"what-i-talk-about-when-i-talk-about-running.md": {
  id: "what-i-talk-about-when-i-talk-about-running.md",
  slug: "what-i-talk-about-when-i-talk-about-running",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"when-breath-becomes-air.md": {
  id: "when-breath-becomes-air.md",
  slug: "when-breath-becomes-air",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"when-things-fall-apart.md": {
  id: "when-things-fall-apart.md",
  slug: "when-things-fall-apart",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"working.md": {
  id: "working.md",
  slug: "working",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"writing-down-the-bones.md": {
  id: "writing-down-the-bones.md",
  slug: "writing-down-the-bones",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"xx.md": {
  id: "xx.md",
  slug: "xx",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"yearbook.md": {
  id: "yearbook.md",
  slug: "yearbook",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"zen-and-the-art-of-motorcycle-maintenance.md": {
  id: "zen-and-the-art-of-motorcycle-maintenance.md",
  slug: "zen-and-the-art-of-motorcycle-maintenance",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
"zone-one.md": {
  id: "zone-one.md",
  slug: "zone-one",
  body: string,
  collection: "book",
  data: InferEntrySchema<"book">
} & { render(): Render[".md"] },
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
